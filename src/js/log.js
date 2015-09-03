
var LOG = {
  LEVEL_DEBUG:  0,
  LEVEL_INFO:   1,
  LEVEL_NOTICE: 2,
  LEVEL_WARN:   3,
  LEVEL_ERROR:  4,
};

var LOG_TEXT = {
};

LOG_TEXT[LOG.LEVEL_DEBUG]  = 'debug';
LOG_TEXT[LOG.LEVEL_INFO]   = 'info';
LOG_TEXT[LOG.LEVEL_NOTICE] = 'notice';
LOG_TEXT[LOG.LEVEL_WARN]   = 'warn';
LOG_TEXT[LOG.LEVEL_ERROR]  = 'error';

var log = {
  start: time(),
  messages: [],
  log: function(level, message, data) {

    if(RELEASE_LEVEL == 'RELEASE') return;
    
    log.messages.push({
      time: time(),
      level: level,
      message: message,
      data: data
    });

    if(RELEASE_LEVEL == 'BETA') return;

    var elapsed = time() - log.start;
    console.log('[' + elapsed.toFixed(3) + 's] ' + LOG_TEXT[level].toUpperCase() + ': ' + message);
  },
  
  d: function(message, data) {
    log.log(LOG.LEVEL_DEBUG, message, data);
  },
  
  i: function(message, data) {
    log.log(LOG.LEVEL_INFO, message, data);
  },
  
  n: function(message, data) {
    log.log(LOG.LEVEL_NOTICE, message, data);
  },
  
  w: function(message, data) {
    log.log(LOG.LEVEL_WARN, message, data);
  },
  
  e: function(message, data) {
    log.log(LOG.LEVEL_ERROR, message, data);
  }
  
};
