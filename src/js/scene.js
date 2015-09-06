
var Scene = Status.extend({

  init: function(canvas) {
    this._super();

    if(!canvas) {
      log.e('expected Canvas as argument to Scene');
    }

    this.root_status = Scene;
    this.type = 'scene';

    this.buffers  = []; // used for render optimization
    this.entities = [];

    this.canvas = canvas;

    this.camera = null;

    this.status = Scene.STATUS.NO_CANVAS;
  },

  append: function(entity) {
    this.entities.push(entity);
    entity.set_scene(this);
    if(this.camera == null && entity.type == 'camera') {
      this.camera = entity;
    }
  },
  
  init_gl: function() {
    var gl = this.gl;
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.DEPTH_TEST);
  },

  clear: function() {
    var gl = this.gl;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  },

  draw: function(scene) {
    var gl = this.gl;
    this.clear();

    this.camera.update();

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  }
  
  
});

Scene.STATUS = {
  NO_CANVAS: 0,
  READY:     1,
};

// no_canvas: no canvas yet
// ready:     ready to go

Scene.STATUS_STRING = {};

Scene.STATUS_STRING[Scene.STATUS.NO_CANVAS] = 'no_canvas';
Scene.STATUS_STRING[Scene.STATUS.READY]     = 'ready';
