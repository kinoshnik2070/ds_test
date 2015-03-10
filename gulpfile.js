var gulp = require('gulp'),
    jslint = require("gulp-jslint"),
    spritesmith = require("gulp.spritesmith");


gulp.task("jslint", function () {
    gulp.src([
        "script/*.js",
        "script/gui/*.js",
        "script/store/*.js",
        "script/page/*.js"
    ]).pipe(jslint({
        global: ["ds", "$", "doT", "document", "window"],
        nomen: true,
        plusplus: true,
        sub: true
    }));
});

