const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');
const ts_project= ts.createProject('tsconfig.json');

gulp.task('clean', function () {
  return gulp
    .src('lib', { read: false, allowEmpty: true })
    .pipe(clean('lib'));
});

gulp.task('tsc', () => {
  return ts_project
    .src()
    .pipe(ts({
      lib: ['es2015'],
      declaration: true
    }))
    .pipe(gulp.dest('lib'))
});

gulp.task('default'
  , gulp.series(
    gulp.parallel('clean'),
    gulp.parallel('tsc'),
  )
)
