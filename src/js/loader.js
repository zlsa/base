
var Loader = Thing.extend({
  
  init: function(settings) {
    this._super();

    this.settings = {
      max_concurrent: 4,
      url_check: true
    };

    for(var i in settings) {
      this.settings[i] = settings[i];
    }

    this.concurrent = 0;

    this.assets = [];

    this.status = Loader.STATUS.WAITING;
  },

  /* STATUS */

  set_status: function(status) {
    var old_status = this.status;

    this.status = status;
    
    log.d('loader #' + this.id + ' status changed from ' + Loader.status_string(old_status) + ' to ' + Loader.status_string(status));
    
    this.fire('statuschange', { asset: this,
                                old_status: old_status,
                                status: status });
  },
  
  get_status: function() {
    return this.status;
  },

  /* GET STATUS */

  get_asset_by_url: function(url) {
    // TODO: handle relative paths in URL (possibly a url_simply function?)
    for(var i=0; i<this.assets.length; i++) {
      if(this.assets[i].url == url) return this.assets[i];
    }
    return null;
  },

  append: function(asset) {
    if(this.assets.indexOf(asset) >= 0) {
      log.w('attempted to append existing asset');
      return false;
    }

    if(this.settings.url_check) {
      var a = this.get_asset_by_url(asset.url);
      if(a) {
        log.w('settings.url_check == true and url "' + asset.url + '" matched');
        return asset;
      }
    }

    asset.on('statuschange', this.asset_status_change.bind(this));
    
    this.assets.push(asset);

    this.kick();
    return null;
  },

  asset_status_change: function(data) {
    if(data.status >= Asset.STATUS.FINISHED) {
      if(this.kick() == 0) {
        log.i('done loading');
        this.set_status(Loader.STATUS.FINISHED);
      }
    }
  },

  kick: function() {
    this.concurrent = 0;
    
    var new_assets = 0;
    
    for(var i=0; i<this.assets.length && this.concurrent <= this.settings.max_concurrent; i++) {
      var asset = this.assets[i];
      if(asset.get_status() == Asset.STATUS.WAITING) {
        asset.start();
        new_assets += 1;
        this.concurrent += 1;
      }
    }

    if(new_assets) {
      this.fire('assetchanged', {
        loader: this,
        new_assets: new_assets
      });

      this.set_status(Loader.STATUS.LOADING);
    }

    return new_assets;
  }
  
});

Loader.STATUS = {
  WAITING: 0,
  LOADING: 1,
  FINISHED: 2,
};

Loader.STATUS_STRING = {};

Loader.STATUS_STRING[Loader.STATUS.WAITING] = 'waiting';
Loader.STATUS_STRING[Loader.STATUS.LOADING] = 'loading';
Loader.STATUS_STRING[Loader.STATUS.FINISHED] = 'finished';

Loader.status_string = function(status) {
  return Loader.STATUS_STRING[status];
};
