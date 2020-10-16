const { series, src, dest } = require('gulp');

exports.default = function() {
  return src('src/**/*.js')
    .pipe(dest('dest/'))
}