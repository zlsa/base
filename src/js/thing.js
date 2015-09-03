
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
