var zip = require("gulp-zip");
var gulp = require('gulp');

gulp.task("deploy", function () {
    return gulp.src(["**"])
        .pipe(zip("deploy.zip"))
        .pipe(gulp.dest("./"));
});

const fs = require('fs');

gulp.task('default', function () {
    //do no(ta)thing
    console.log("Executing Gulp default task !!");
});
