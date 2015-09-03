
var Camera = Entity.extend({

  init: function() {
    this._super();

    this.type = 'camera';

    this.projection = mat4.create();

    this.projection_mode = Camera.PROJECTION.PERSPECTIVE;

    // perspective
    this.fov_mode      = Camera.FOV_MODE.ANGULAR;
    this.fov           = 45;
    this.focal_length  = 35; // same units as sensor_height
    this.sensor_height = 34; // vertical size

    // orthographic
    this.ortho_size    = 1;

    this.near          = 0.01;
    this.far           = 100000;

  },

  data_is_ready: function() {
    return true;
  },
  
  update_matrix: function() {
    this._super();
    
    if(this.projection_mode == Camera.PROJECTION.PERSPECTIVE) {
      if(this.fov_mode == Camera.FOV_MODE.FOCAL_LENGTH)
        this.fov = 2 * Math.atan(0.5 * this.sensor_height / this.focal_length);
      mat4.perspective(this.projection, fov, this.canvas.aspect, this.near, this.far);
    } else {
      var half_vertical   = this.ortho_size * 0.5;
      var half_horizontal = half_vertical * this.canvas.aspect;
      mat4.ortho(this.projection, -half_horizontal, half_horizontal, -half_vertical, half_vertical, this.near, this.far);
    }
    
  }

});

Camera.PROJECTION = {
  ORTHOGRAPHIC: 0,
  PERSPECTIVE:  1,
};

Camera.FOV_MODE = {
  ANGULAR:      0,
  FOCAL_LENGTH: 1
};
