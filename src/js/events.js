
var Events = Class.extend({
  init: function() {
    this.events = {};
  },

  on: function(event, callback, data) {
    if(!(event in this.events)) {
      this.events[event] = [];
    }

    this.events[event].push({
      callback: callback,
      data: data
    });
    
  },

  off: function(event, callback) {
    if(!(event in this.events)) {
      return false;
    }

    var e = this.events[event];
    
    for(var i=0; i<e.length; i++) {
      if(e[i].callback == callback) {
        this.events[event].splice(i, 1);
        return true;
      }
    }

    return false;
  },

  fire: function(event, data) {

    if(typeof event == typeof []) {
      for(var i=0; i<event.length; i++) {
        this.fire(event[i], data);
      }
      return;
    }

    if(!(event in this.events)) {
      return false;
    }

    var e = this.events[event];

    for(var i=0; i<e.length; i++) {
      if(e[i].callback) {
        if(e[i].callback(data, e[i].data) == false) {
          log.d('event ' + event + ' cancelled');
          break;
        }
      }
    }

    return true;
  }
  
});
