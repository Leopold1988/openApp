var gulp = require('gulp');

var server = require('gulp-server-livereload');

//设置目录
var paths = {
  scripts: 'src/js/',
  images: 'src/img/',
  css: 'src/css/',
  html: 'src/html/',
  build: 'dist/'
};

var os = require('os'),
  iptable = {},
  ifaces = os.networkInterfaces();
for (var dev in ifaces) {
  ifaces[dev].forEach(function(details, alias) {
    if (details.family == 'IPv4') {
      iptable[dev + (alias ? ':' + alias : '')] = details.address;
    }
  });
}

gulp.task('connect', function() {
  gulp.src('./')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      host: iptable["en0:1"],
      port: 8001,
      open: true
    }));
});