
var Canvas = Status.extend({

  init: function(canvasx) {
    this._super();

    this.root_type = Canvas;
    this.type = 'canvas';

    this.status = Canvas.STATUS.WAITING;

    this.canvas = document.createElement('canvas');

    this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    
    if(!this.gl) {
      this.set_status(Canvas.STATUS.UNSUPPORTED);
      log.e('webgl not supported!');
    }

    this.size = [1, 1];
    this.aspect = 1;
    
  },

  get_element: function() {
    return this.canvas;
  },

  resize: function(size) {
    var old_size = this.size;

    this.size = [size[0], size[1]];

    this.aspect = size[0] / size[1];
    
    this.canvas.width  = size[0];
    this.canvas.height = size[1]
    
    this.gl.viewportWidth  = this.canvas.width;
    this.gl.viewportHeight = this.canvas.height;

    this.fire('resized', {
      canvas: this,
      old_size: old_size,
      size: this.size
    });

  }

});

Canvas.STATUS = {
  WAITING:     0,
  UNSUPPORTED: 1,
  READY:       2,
};

// waiting:     has not been created yet
// unsupported: no webgl support
// ready:       ready to go

Canvas.STATUS_STRING = {};

Canvas.STATUS_STRING[Canvas.STATUS.WAITING]     = 'waiting';
Canvas.STATUS_STRING[Canvas.STATUS.UNSUPPORTED] = 'unsupported';
Canvas.STATUS_STRING[Canvas.STATUS.READY]       = 'ready';
