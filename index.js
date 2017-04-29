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
var funcs = function (bs, eventManager) {
        console.log("there is a click");
    };
var plugin = function (opts, bs, clientEvents, d)  {
    console.log(bs.io);
    console.log(clientEvents);
    console.log(d);
    var emitter = bs.emitter;
    var socket = bs.io.sockets;
    var clientEvents = bs.options.get("clientEvents").toJS();
    console.log(clientEvents);
    console.log(socket);
     _.each(emitterCallbacks, function (func, event) {
        emitter.on(event, func.bind(this, bs));
    });
     _.each(clientEvents, function (event) {
         console.log(event);
        socket.on(event, funcs.bind(this, bs));
    });
    return undefined;
};


module.exports = {
  "plugin:name": "my-bs-plugin",
  "plugin": plugin
};
