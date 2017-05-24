var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprites', function(){
    var sprites = gulp.src('./src/icon/*.png')
        .pipe(spritesmith({
            padding:20,
            retinaSrcFilter:['./src/icon/*@2x.png'],
            cssName:'sprites.scss',
            imgName:'sprites.png',
            retinaImgName: 'sprites@2x.png',
            imgPath:'../img/sprites.png',
            retinaImgPath:'../img/sprites@2x.png'
        }))
    sprites.img.pipe(gulp.dest('./src/img'));
    sprites.css.pipe(gulp.dest('./src/style'));
    return sprites;
})