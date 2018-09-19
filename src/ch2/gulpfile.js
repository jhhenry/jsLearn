const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const eslint = require("gulp-eslint");
//const concat = require("gulp-concat");

gulp.task("default", function () {

	gulp.src("es6/**/*.js")
		.pipe(sourcemaps.init())
		.pipe(babel())
	//.pipe(concat('all.js'))
		.pipe(sourcemaps.write("../maps"))
		.pipe(gulp.dest("dist"));
	gulp.src("public/es6/**/*.js")
		.pipe(babel())
		.pipe(gulp.dest("public/dist"));
});

gulp.task("eslint", function () {
	gulp.src(["es6/**/*.js", "public/es6/**/*.js"])
		.pipe(eslint())
		.pipe(eslint.format());
});