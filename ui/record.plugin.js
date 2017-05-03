var path = require("path");

module.exports = {
    plugin: function (ui, bs) {
        console.log('here');
        // console.log(ui.pluginManager);
        // console.log(ui.pluginManager.hooks.page([{
        //     path: "/record",
        //     title: PLUGIN_NAME,
        //     template: "record.html",
        //     controller: "RecordController",
        //     order: 4,
        //     icon: "bug"
        // }]));
        //ui.noCache     = noCachePlugin.init(ui, bs);
        //ui.compression = compression.init(ui, bs);

        ui.listen("record", {
            "start": function(data){
                bs.events.emit("record:start");
            },
            "stop": function(data) {
                bs.events.emit("record:stop");
            },
            "play": function(data) {
                console.log("Do replay "+ data.recordId);
                bs.events.emit("record:play", data.recordId);
            }
        });
    },
    // opts: {
    //     "hooks": {
    //         "markup": fileContent("record.html"),
    //         "templates": [getPath("record.html")],
    //         "client:js": [fileContent("record.client.js")],
    //         "page": {
    //                 "path": "/record",
    //                 "title": "Record Replay",
    //                 "template": "record.html",
    //                 "controller": "RecordController",
    //                 "order": 4,
    //                 "icon": "bug"
    //         }
    //     }   
    // }
}


/**
 * @param filepath
 * @returns {*}
 */
function getPath (filepath) {
    return require("path").join(__dirname, filepath);
}

/**
 * @param filepath
 * @returns {*}
 */
function fileContent (filepath) {
    return require("fs").readFileSync(getPath(filepath), "utf-8");
}