"use strict";
var _ = require("browser-sync/lodash.custom");

var path = require("path");
var uiPlugin = require("./ui/record.plugin");
var firebaseStorage = require("./storages/firebase");

const PLUGIN_NAME  = "Record & Replay";

/**
 * Plugin name
 */
module.exports["plugin:name"] = PLUGIN_NAME

var cached = {};
module.exports.callbacks = {
    "service:running": function (bs, data) {
        console.log("Hello from the other side");
        
    },
    "client:events": function (bs, data) {
        console.log(data);
    },
    "client:connected": function (bs, data,z) {
        console.log(data);
    },
    "client:js": function (bs, data) {
        console.log(data);
    },
    "record:play": function (bs, data) {
        console.log("Record:Play triggered");
        var clients = bs.io.of(bs.options.getIn(["socket", "namespace"]));
        firebaseStorage.get(data).then(function (s) {
            console.log(s);
            var obj = s.val();
            var lastValue = undefined;
            var diff = 0;
            for (var k in obj) {
                lastValue = lastValue || k;
                var tempDiff = (k - lastValue);
                tempDiff = tempDiff > 20 ? tempDiff : 20;
                diff += tempDiff;
                lastValue = k;
                var val = obj[k];
                (function (val) {
                    setTimeout(function () {
                        clients.emit(val.event, val.data);
                    }, diff);
                })(val);
            }
            setTimeout(function () {
                clients.emit("browser:notify", "Replaying finished");
            }, diff);
        }).catch(console.log);
        clients.emit("browser:notify", "Replaying started");
    },
    "record:start": function (bs) {
        console.log("do start");
        bs.setOptionIn(["record","start"], true);
        var clients = bs.io.of(bs.options.getIn(["socket", "namespace"]));
        clients.emit("browser:notify", "Recording started");
        cached = {};
    },
    "record:stop": function (bs) {
        console.log("do stop");
         bs.setOptionIn(["record","start"], false);
        var clients = bs.io.of(bs.options.getIn(["socket", "namespace"]));
        clients.emit("browser:notify", "Recoring stopped");
        var recordingId = (new Date()).getTime();
        firebaseStorage.store(recordingId, cached);
    }

};
/**
 * @type {{plugin: Function, plugin:name: string, markup: string}}
 */
module.exports.plugin = function (opts, bs) {
    var ui = bs.ui;
    uiPlugin.plugin(ui, bs);

    // var admin = require("firebase-admin");
    // var serviceAccount = require("./firebase-config.json");
    // admin.initializeApp({
    //     credential: admin.credential.cert(serviceAccount),
    //     databaseURL: "https://browser-sync-record.firebaseio.com"
    // });

    var emitter = bs.emitter;
    _.each(exports.callbacks, function (func, event) {
        console.log(event);
        emitter.on(event, func.bind(this, bs));
    });
    

    var registerSocketForClientEvent = function (clientEvents, client) {
        _.each(clientEvents, function(event) {
            console.log(event);
            client.on(event, storeInCache.bind(null, event, bs));
        });
    };
    var storeInCache = function (event, bs, data) {
        console.log(bs.options.get('record') && bs.options.get('record').get('start'));
        if (bs.options.get('record') && bs.options.get('record').get('start')) {
            var timestamp = new Date().getTime();
            cached[timestamp] = {       //TODO
                event: event,
                data: data,
                timestamp: timestamp
            };
        }
    }
    // var storeFunction = function (event, data) {
    //     if (bs.options.get('record') && bs.options.get('record').get('start')) {
    //         if (!recordingId) {
    //             recordingId = 'rec-' + (new Date()).getTime();
    //         }
    //         var timestamp = (new Date()).getTime();
    //         admin.database().ref(recordingId + '/' + timestamp).set({       //TODO
    //             event: event,
    //             data: data,
    //             timestamp: timestamp
    //         });
    //     } else {
    //         recordingId = undefined;
    //     }
    // }
    var socket = bs.io.sockets;
    var clientEvents = bs.options.get("clientEvents").toJS();
    socket.on("connection", registerSocketForClientEvent.bind(null, clientEvents))

}
