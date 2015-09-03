
var Entity = Status.extend({

  init: function() {
    this._super();

    this.root_status = Entity;
    this.type = 'entity';

    this.position = vec3.create();
    this.rotation = quat.create();
    this.matrix   = mat4.create();

    this.status = Entity.STATUS.WAITING;
  },

  data_is_ready: function() {
    // TODO: separate empty class or just use entity directly?
    log.e('do not use Entity directly');
    return true;
  },
  
  get_status: function() {
    if(this.scene && this.canvas && this.data_is_ready()) {
      this.set_status(Entity.STATUS_READY);
    }
    return this._super();
  },

  set_scene: function(scene) {
    this.scene = scene;
    this.canvas = scene.canvas;
  },

  /* matrix stuff */
  update_matrix: function() {
    mat4.fromRotationTranslation(this.matrix, this.rotation, this.position);
  }
  
});

Entity.STATUS = {
  WAITING: 0,
  READY:   1,
};

// waiting: not ready yet
// ready:   ready to go

Entity.STATUS_STRING = {};

Entity.STATUS_STRING[Entity.STATUS.WAITING] = 'waiting';
Entity.STATUS_STRING[Entity.STATUS.READY]   = 'ready';
