var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
  	uglify = require('gulp-uglify'),
  	buffer = require('vinyl-buffer')

  	// css
var stylus = require('gulp-stylus')
  	minify = require('gulp-minify-css')
  	nib = require('nib')




var entry = ['./app/js/app.js', './app/js/lib/unslider.js'] //Scripts de entrada
var args = watchify.args
args.debug = false //Genera el sourcemap para debuguear
args.fullPaths = false //Evita el uso de paths absolutos 

gulp.task('js:watch', function() {
  var w = watchify(browserify(entry, args))
  w.on('update', function (file){
    console.log('file modified, rebuilding: ', file)
    var bdle = createBundle(w)
    console.log('rebuild finished')
    return bdle
  })
  return createBundle(w)
})

gulp.task('js', function() {
  var w = watchify(browserify(entry, args))
  console.log('rebuild finished')
  return createPublishJS(w)
})

function createPublishJS(b){
    console.log('Now createBundle uglify ...')
    return b.bundle()
        .pipe(source('bundle.js')) //Nombre del bundle final
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./js')) //Directorio de destino
}


function createBundle(b){
    console.log('Now createBundle normal...')
    return b.bundle()
        .pipe(source('bundle.js')) //Nombre del bundle final
        .pipe(gulp.dest('./js')) //Directorio de destino
}


/*   --  -- -- --- -- -- --- -- -- --- -- -- --- -- -- --- -- -- ---  */


/*
 * CSS 
 */
gulp.task('styl', function styl () {
  console.log('Now create Styl CSS ...')
  return gulp.src('./app/css/stylus/style.styl') // entry point de styl
    .pipe(stylus({ use: nib() })) //inicializo stylus con nib como plugin
    .pipe(minify())
    .pipe(gulp.dest('./css'))
  console.log('Done Styl CSS ...')
})

gulp.task('styl:watch', function() {
  return gulp.watch(['./app/css/stylus/style.styl'], ['styl'])
})

gulp.task('default', ['js:watch', 'styl:watch'])
