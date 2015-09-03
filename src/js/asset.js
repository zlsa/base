
var Asset = Thing.extend({

  init: function(url) {
    this._super();

    this.status = Asset.STATUS.WAITING;

    this.url = url;
  },

  /* STATUS */

  set_status: function(status) {
    var old_status = this.status;

    this.status = status;
    
    log.d('asset #' + this.id + ' status changed from ' + Asset.status_string(old_status) + ' to ' + Asset.status_string(status));
    
    this.fire('statuschange', { asset: this,
                                old_status: old_status,
                                status: status });
  },
  
  get_status: function() {
    return this.status;
  },

  /* ASSET STUFF */

  start: function() {
    if(this.get_status() >= Asset.STATUS.FINISHED) {
      log.w('asset #' + this.id + ' start() called but status is already ' + Asset.status_string(this.get_status()));
      return;
    }
    
    this.set_status(Asset.STATUS.LOADING);
    this.get();
    
  },
  
  get: function() {
    log.w('do not directly use Assets (' + this.id + ')');
    this.set_status(Asset.STATUS.BROKEN);
  },

  /* FINISHED STUFF */

  failed: function() {
    this.finished(Asset.STATUS.FAILED);
  },
  
  success: function() {
    this.finished(Asset.STATUS.SUCCESS);
  },

  finished: function(status) {
    this.set_status(status);

    this.fire([Asset.status_string(status), 'finished'], {
      asset: this,
      status: status
    });
  }
  
});

Asset.STATUS = {
  WAITING:  0,
  LOADING:  1,
  FINISHED: 2,
  BROKEN:   3,
  FAILED:   4,
  SUCCESS:  5,
};

// waiting:  start() not yet called
// loading:  start() called, request not finished yet
// finished: anything above this means that start() has been called and should not be called again
// broken:   no request sent for some reason
// failed:   request did not succeed but was sent
// success:  do I really have to tell you?

Asset.STATUS_STRING = {};

Asset.STATUS_STRING[Asset.STATUS.WAITING]  = 'waiting';
Asset.STATUS_STRING[Asset.STATUS.LOADING]  = 'loading';
Asset.STATUS_STRING[Asset.STATUS.FINISHED] = 'finished';
Asset.STATUS_STRING[Asset.STATUS.BROKEN]   = 'broken';
Asset.STATUS_STRING[Asset.STATUS.FAILED]   = 'failed';
Asset.STATUS_STRING[Asset.STATUS.SUCCESS]  = 'success';

Asset.status_string = function(status) {
  return Asset.STATUS_STRING[status];
};

// TEXT ASSET

var TextAsset = Asset.extend({
  
  get: function() {
    var asset = this;
    
    this.request = new XMLHttpRequest();
    
    this.request.addEventListener('load', function() {
      if(this.status != 200) {
        asset.failed.call(asset);
        return;
      }

      asset.content = this.responseText;

      asset.success.call(asset);
    });
    
    this.request.open('get', this.url, true);
    this.request.send();
    
    this.fire('get', { asset: this });
  }
});

// JSON ASSET

var JSONAsset = TextAsset.extend({

  bind: function() {
    this._super();

    var asset = this;

    this.on('statuschange', function(data) {
      if(data.status == Asset.STATUS.SUCCESS) {
        asset.content = JSON.parse(asset.content);
      }
    });
  }
});

