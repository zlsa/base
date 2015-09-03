
var Thing = Events.extend({
  
  init: function() {
    this._super();
    this.id = Thing._id++;
    this.name = '';

    this.assets = [];

    this.bind();
  },

  bind: function() {

  },

  get_name: function() {
    return this.name;
  },

});

Thing._id = 0;

/* STATUS */

var Status = Thing.extend({
  
  init: function() {
    this._super();

    this.type = 'status';
  },

  /* STATUS */

  set_status: function(status) {
    var old_status = this.status;

    if(this.status == status) return;

    this.status = status;
    
    log.d(this.type + ' #' + this.id + ' status changed from ' + this.status_string(old_status) + ' to ' +
          this.status_string(status));
    
    var data = {
      old_status: old_status,
      status: status
    };
    data[this.type] = this;
    this.fire('statuschange', data);
  },
  
  get_status: function() {
    return this.status;
  },

  status_string: function(status) {
    return this.status_root.status_string(status);
  }

});
