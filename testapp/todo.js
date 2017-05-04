"use strict";

var browserSync = require("browser-sync");
var config = {
    proxy: "http://getbootstrap.com/javascript/",
    //files: ["app/css/*.css"]
    minify: false,
    "plugins": [ "browser-sync-record-replay" ]
};

browserSync.init(config, function (err, bs) {
    // Full access to Browsersync object here
    console.log(bs.getOption("urls"));
});


