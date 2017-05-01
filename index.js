 "use strict";
var _ = require("browser-sync/lodash.custom");
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
    "client:events": function (bs, data){
        console.log(data);
    },
    "client:connected": function (bs, data) {
        console.log(data);
    },
    "client:js": function (bs, data) {
        console.log(data);
    }
}
var socketCallbacks = {
    "click" : function (bs, eventManager) {
        console.log("there is a click");
    }
}
var cached = [];
var funcs = function (bs, eventManager) {
        console.log("there is a click");
    };
var handleClientEvent = function(event, client, data) {
    console.log("there is a "+event+" from "+client);
    console.log(data);
    cached.push({
        event: event,
        data: data
    });

}
var plugin = function (opts, bs)  {
    var emitter = bs.emitter;
    var socket = bs.io.sockets;
    socket.on("connection", handleConnection);
    /**
     * Handle each new connection
     * @param {Object} client
     */
    function handleConnection (client) {
        var clientEvents = bs.options.get("clientEvents").toJS();
        console.log(clientEvents);
        _.each(clientEvents, function (event) {
            console.log(event);
            client.on(event, handleClientEvent.bind(null, event, client));
        });
        var i = 0;
        _.each(cached, function(e){
            i++;
            console.log(e.event);
            setTimeout(function(){
                client.emit(e.event, e.data);
            }, i*10);
            
        });
        
    }
     _.each(emitterCallbacks, function (func, event) {
        emitter.on(event, func.bind(this, bs));
    });
     
    return undefined;
};

module.exports = {
  "plugin:name": "my-bs-plugin",
  "plugin": plugin
};
