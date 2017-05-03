const PLUGIN_NAME  = "Record & Replay";

/**
 * @type {{plugin: Function, plugin:name: string, markup: string}}
 */
module.exports = {
    /**
     * @param ui
     * @param bs
     */
    "plugin": function (ui, bs) {

        //ui.noCache     = noCachePlugin.init(ui, bs);
        //ui.compression = compression.init(ui, bs);

        ui.listen("record", {
            "start": function(data){
                console.log("Do start record");
                bs.setOptionIn(["record","start"], true);
            },
            "stop": function(data) {
                bs.setOptionIn(["record","start"], false);
            },
            "play": function(data) {
                console.log("Do replay");
                bs.events.emit("record:play");
            }
        });

    },
    /**
     * Hooks
     */
    "hooks": {
        "markup": fileContent("record.html"),
        "client:js": fileContent("/record.client.js"),
        "templates": [],
        "page": {
            path: "/record",
            title: PLUGIN_NAME,
            template: "record.html",
            controller: "RecordController",
            order: 4,
            icon: "bug"
        }
    },
    /**
     * Plugin name
     */
    "plugin:name": PLUGIN_NAME
};

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