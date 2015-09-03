
var Scene = Status.extend({

  init: function(canvas) {
    this._super();

    if(!canvas) {
      log.e('expected Canvas as argument to Scene');
    }

    this.root_status = Scene;
    this.type = 'scene';

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
