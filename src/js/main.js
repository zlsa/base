
var TYPE = 'DEBUG';

// VERIFY:  all logging, all error checking
// DEBUG:   all logging, less error checking
// RELEASE: no logging, less error checking

var loader = new Loader();

$(document).ready(function() {
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

});

function resize() {

}

function tick() {
  requestAnimationFrame(tick);
}
