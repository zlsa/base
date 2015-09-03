
var Camera = Entity.extend({

  init: function() {
    this._super();

    this.type = 'camera';

    this.perspective = mat4.create();

    this.fov_mode      = Camera.FOV_MODE.ANGULAR;
    this.fov           = 45;
    this.focal_length  = 35; // in mm
    this.sensor_height = 34; // vertical size
    
    this.near          = 0.01;
    this.far           = 100000;

  },

  data_is_ready: function() {
    return true;
  },
  
  update_matrix: function() {
    this._super();
    
    if(this.fov_mode == Camera.FOV_MODE.FOCAL_LENGTH)
      this.fov = 2 * Math.atan(0.5 * this.sensor_height / this.focal_length);

    mat4.perspective(this.perspective, fov, this.canvas.aspect, this.near, this.far);
  }

});


Camera.FOV_MODE = {
  ANGULAR:      0,
  FOCAL_LENGTH: 1
};
