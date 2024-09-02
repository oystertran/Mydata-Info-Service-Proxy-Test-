const redis_cnfg = require('../../config/ap.config.json')[process.env.NODE_ENV || 'DEVT'];

var redis = require('redis'),
    client = redis.createClient(redis_cnfg.REDIS_CNFG);

client.on('connect', function(){
    console.log('INFO: REDIS client connected.', redis_cnfg.REDIS_CNFG);
});

client.on('error', function(err) {
    console.log('ERRO: Redis error:', err.message);
});

module.exports = client;