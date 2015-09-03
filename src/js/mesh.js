
var Mesh = Entity.extend({

  init: function() {
    this._super();

    this.type = 'mesh';

    this.vertices = [];
    this.normals  = [];
    
  },

  data_is_ready: function() {
    // TODO: add actual checks
    return true;
  },
  
  update_matrix: function() {
    this._super();
    
    if(this.fov_mode == Camera.FOV_MODE.FOCAL_LENGTH)
      this.fov = 2 * Math.atan(0.5 * this.sensor_height / this.focal_length);

    mat4.perspective(this.perspective, fov, this.canvas.aspect, this.near, this.far);
  },

});


Camera.FOV_MODE = {
  ANGULAR:      0,
  FOCAL_LENGTH: 1
};
