// 引入 gulp
const gulp = require('gulp');

// 引入组件
const jshint = require('gulp-jshint');
const htmlhint = require('gulp-htmlhint');
const less = require('gulp-less');
const concat = require('gulp-concat');
const jsmin = require('gulp-uglify');
const cssmin = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const fileinclude = require('gulp-file-include');
const inject = require('gulp-inject'); //html中插入js/css
const sourcemaps = require('gulp-sourcemaps');
const htmlbeautify = require('gulp-html-beautify');
const htmlminify = require("gulp-html-minify");
const spritesmith = require("gulp.spritesmith");
const spriter = require("gulp-css-spriter");
const watch = require("gulp-watch");
const cache = require("gulp-cache");
const autoprefixer = require("gulp-autoprefixer");

// 检查脚本
gulp.task('jshint', function() {
    gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
//检查html
gulp.task('htmlhint', function() {
    gulp.src('./src/*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.reporter());
});
// 编译Less
gulp.task('less', function() {
    gulp.src('./src/css/*.less')
        .pipe(cache(less()))
        .pipe(gulp.dest('./src/css'));
});
//补全前缀+压缩css
gulp.task('cssmin', function() {
    gulp.src('./src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 4 versions']
                //cascade: true, //是否美化属性值 默认：true 像这样：
                //remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'));
});
//include公共文件
gulp.task('fileinclude', ['less', 'cssmin', 'scripts'], function() {
    gulp.src('./src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(fileinclude({
            prefix: '<!--IEhack@',
            suffix:'-->',
            basepath: '@file',
            indent: true
        }))
        .pipe(inject(gulp.src(['./src/css/normalize.css', './src/css/bootstrapStyle.css', './src/css/Style.css','./src/css/jquery.fileupload.css'], { reda: false }), { starttag: '<!-- inject:base:{{ext}} -->', relative: true }))
        .pipe(inject(gulp.src(['./src/js/MSG.js', './src/js/lib/jquery.js'], { reda: false }), { starttag: '<!-- inject:base:{{ext}} -->', relative: true }))
        .pipe(gulp.dest('dist'));
});
//格式化html
gulp.task('htmlbeautify', function() {
    gulp.src('./src/*.html')
        .pipe(htmlbeautify())
        .pipe(gulp.dest('dist'));
});
//压缩简化html
gulp.task('htmlminify', function() {
    gulp.src('./src/*.html')
        .pipe(htmlminify())
        .pipe(gulp.dest('dist'));
});
//压缩图片文件
gulp.task('imagemin', function() {
    gulp.src('./src/images/*')
        .pipe(watch('./images/*'))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});
//合成雪碧图
gulp.task('spritesmith', function() {
    gulp.src('./src/images/*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }))
        .pipe(gulp.dest('dist/images'));
});
//CSS合成雪碧图
gulp.task('CSSspriter', function() {
    gulp.src('./src/css/less.css')
        .pipe(spriter({
            'spriteSheet': './dist/images/spritesheet.png',
            'pathToSpriteSheetFromCSS': '../images/spritesheet.png',
            'padding': 20
        }))
        .pipe(gulp.dest('dist/css'));
});
// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./src/js/*.js')
        //.pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'))
        //.pipe(rename('all.min.js'))
        .pipe(jsmin())
        .pipe(gulp.dest('./dist/js'));
    gulp.src('./src/js/lib/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('./dist/js/lib'));
});

// 默认任务
gulp.task('default', function() {
    gulp.run('jshint', 'fileinclude', 'imagemin');

    // 监听文件变化
    gulp.watch('./src/js/*.js', function() {
        gulp.run('jshint', 'scripts');
    });
    gulp.watch('./src/css/*.less', function() {
        gulp.run('less');
    });
    gulp.watch('./src/css/*.css', function() {
        gulp.run('cssmin');
    });
    gulp.watch(['./src/*.html', './src/include/*.html'], function() {
        gulp.run('htmlminify', 'fileinclude', 'htmlbeautify'); //html文件必须先压缩再执行include引入
    });
});
