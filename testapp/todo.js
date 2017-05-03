"use strict";

var browserSync = require("browser-sync");
var config = {
    proxy: "http://todomvc.com/examples/backbone/",
    // proxy: 'https://www.w3schools.com/angular/tryit.asp?filename=try_ng_todo_app',
    //files: ["app/css/*.css"]
    minify: false,
    "plugins": [ "my-bs-plugin" ]
};

browserSync.init(config, function (err, bs) {
    // Full access to Browsersync object here
    console.log(bs.getOption("urls"));
});


