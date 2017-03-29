// 引入 gulp
const gulp = require('gulp');

// 引入组件
const jshint = require('gulp-jshint');
const less = require('gulp-less');
const concat = require('gulp-concat');
const jsmin = require('gulp-uglify');
const cssmin = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const fileinclude = require('gulp-file-include');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const htmlbeautify = require('gulp-html-beautify');
const htmlminify = require("gulp-html-minify");

// 检查脚本
gulp.task('jshint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// 编译Less
gulp.task('less', function() {
    gulp.src('./css/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'));
    gulp.src('./css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'));
});
//include公共文件
gulp.task('fileinclude', function() {
    gulp.src('./*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
});
//格式化html
gulp.task('htmlbeautify', function() {
    gulp.src('./*.html')
        .pipe(htmlbeautify())
        .pipe(gulp.dest('dist'));
});
//压缩简化html
gulp.task('htmlminify', function() {
    gulp.src('./*.html')
        .pipe(htmlminify())
        .pipe(gulp.dest('dist'));
});
//压缩图片文件
gulp.task('imagemin', function() {
    gulp.src('./images/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('./images'))
        .pipe(gulp.dest('dist/images'));
});
// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        //.pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'))
        //.pipe(rename('all.min.js'))
        .pipe(jsmin())
        .pipe(gulp.dest('./dist/js'));
    gulp.src('./js/lib/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('./dist/js/lib'));
});

// 默认任务
gulp.task('default', function() {
    gulp.run('jshint', 'less', 'scripts', 'fileinclude');

    // 监听文件变化
    gulp.watch('./js/*.js', function() {
        gulp.run('jshint', 'scripts');
    });
    gulp.watch('./css/*.less', function() {
        gulp.run('less');
    });
    gulp.watch('./*.html', function() {
        gulp.run('htmlminify', 'fileinclude', 'htmlbeautify'); //html文件必须先压缩再执行include引入
    });
});
