
var AssetWaiter = Status.extend({

  init: function() {
    this._super();

    this.status_root = Asset;
    this.type = 'assetwaiter';
    
    this.status = Asset.STATUS.WAITING;

    this.assets = [];

    this.append.apply(this, arguments);
    
  },

  /* ASSETWAITER STUFF */
  
  asset_status_change: function(data) {
    if(data.status >= Asset.STATUS.FINISHED) {
      if(this.is_done()) {
        log.i('done loading');
        this.set_status(Asset.STATUS.FINISHED);
      }
    }
    
    this.update_status();
  },
  
  append: function(asset) {
    
    if(arguments.length > 1) {
      for(var i=0; i<arguments.length; i++) {
        this.append(arguments[i]);
      }
      return;
    }
    
    if(this.assets.indexOf(asset) >= 0) {
      log.w('attempted to append existing asset');
      return false;
    }

    asset.on('statuschange', this.asset_status_change.bind(this));
    
    this.assets.push(asset);

    return null;
  },

  update_status: function() {
    for(var i=0; i<this.assets.length; i++) {
      if(this.assets[i].get_status() <= Asset.STATUS.LOADING)
        this.set_status(Asset.STATUS.LOADING);
    }
  },

  is_done: function() {

    var done = true;
    
    for(var i=0; i<this.assets.length; i++) {
      var asset = this.assets[i];
      if(asset.get_status() < Asset.STATUS.FINISHED) {
        done = false;
      }
      if(asset.get_status() <= Asset.STATUS.LOADING) {
        this.set_status(Asset.STATUS.LOADING);
      }
    }

    return done;

  }


});
