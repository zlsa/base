
var RELEASE_LEVEL = 'DEBUG';

// VERIFY:  all logging, all error checking
// DEBUG:   all logging, less error checking
// BETA:    no logging, less error checking
// RELEASE: no logging at all (not saved into array), less error checking

/* LOADER */

var loader = new Loader();

/* 3D specific */
var canvas = new Canvas();
var scene = new Scene(canvas);
var camera = new Camera();

/* main */

function main() {
  $(window).resize(resize);
  tick();

  var foo = new JSONAsset('/foo.json');
  var bar = new JSONAsset('/bar.json');

  var aw = new AssetWaiter(foo, bar);
  
  loader.append(foo, bar);

  loader.on('statuschange', function() {
    if(loader.get_status() == Loader.STATUS.FINISHED) {
      tick();
    }
  });

  $(window).resize(resize);

  resize();

}

function resize() {
  canvas.resize([$(window).width(), $(window).height()]);
}

function tick() {
  scene.render();
  requestAnimationFrame(tick);
}


$(document).ready(main);
