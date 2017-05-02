"use strict";
var _ = require("browser-sync/lodash.custom");

var admin = require("firebase-admin");
var serviceAccount = require("./firebase-config.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://browser-sync-record.firebaseio.com"
});

// module.exports.callbacks = {
//     "service:running": function (bs, data) {
//         console.log("Hello from the other side");
//     }
// }

// /**
//  * Plugin interface for BrowserSync
//  * @param {EventEmitter} emitter
//  * @param {BrowserSync} bs
//  * @returns {Object}
//  */
// module.exports.plugin = function (emitter, bs) {
//     console.log(bs);
//     console.log("Test");
//      _.each(exports.callbacks, function (func, event) {
//         emitter.on(event, func.bind(this, bs));
//     });
//     return undefined;
// };
////////////////////////////////////////////////////////////////////////////////////
/**
 * Plugin interface for BrowserSync
 */

var emitterCallbacks = {
    "service:running": function (bs, data) {
        console.log("Hello from the other side");
    },
    "client:events": function (bs, data) {
        console.log(data);
    },
    "client:connected": function (bs, data) {
        console.log(data);
    },
    "client:js": function (bs, data) {
        console.log(data);
    },
    "record:play": function (bs, data) {
        console.log("Record:Play triggered");
        var clients = bs.io.of(bs.options.getIn(["socket", "namespace"]));
        //TOOD fetch data from firebase first!
        // clients.emit(e.event, e.data);
        var ref = admin.database().ref(data);
        ref.on('value', function (s) {
            var obj = s.val();
            var diff = 0;
            for (var k in obj) {

                var val = obj[k];
                (function (val) {
                    setTimeout(function () {
                        console.log(val);
                        clients.emit(val.event, val.data);
                    }, 200);
                })(val);
            }
        });
    }
};

// var cached = [];

// var handleClientEvent = function (event, client, data) {
//     console.log("there is a " + event + " from " + client);
//     console.log(data);
//     cached.push({
//         event: event,
//         data: data
//     });
//
// };

var plugin = function (opts, bs) {
    var emitter = bs.emitter;
    // var socket = bs.io.sockets;
    // socket.on("connection", handleConnection);
    /**
     * Handle each new connection
     * @param {Object} client
     */
    // function handleConnection(client) {
    //     var clientEvents = bs.options.get("clientEvents").toJS();
    //     console.log(clientEvents);
    //     _.each(clientEvents, function (event) {
    //         console.log(event);
    //         client.on(event, handleClientEvent.bind(null, event, client));
    //     });
    //     var i = 0;
    //     _.each(cached, function (e) {
    //         i++;
    //         console.log(e.event);
    //         setTimeout(function () {
    //             client.emit(e.event, e.data);
    //         }, i * 10);
    //
    //     });
    //
    // }

    _.each(emitterCallbacks, function (func, event) {
        emitter.on(event, func.bind(this, bs));
    });

    return undefined;
};

module.exports = {
    "plugin:name": "my-bs-plugin",
    "plugin": plugin
};

console.log("My BS Plugin got invoked");