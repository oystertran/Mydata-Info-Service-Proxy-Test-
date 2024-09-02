// console.log('CACHE-MW:LOADED');
// const app_cnfg = require('./../config/ap.config.json');
// const redis_cnfg = require('./../config/ap.config.json')[process.env.NODE_ENV || 'DEVT'];

// console.log('redis_cnfg.REDIS_CNFG1:', redis_cnfg.REDIS_CNFG);
// var redis = require('redis'),
//     client = redis.createClient(redis_cnfg.REDIS_CNFG);

// client.on('connect', function(){
//     console.log('INFO: Redis client connected.', redis_cnfg.REDIS_CNFG);
// });

// client.on('error', function(err) {
//     console.log('ERRO: Redis error:', err.message);
// });

const redis_mw = (key, client) => {
    // let key = process.env.NODE_ENV + key;

    const getCache = () => {
        return new Promise((resolve, reject) => {

            console.log('client.connect:', client.connected);
            if (client.connected) {
                client.get(key, function (err, reply) {
                    if (getItemRedisCache) {
                        if (reply) {
                            console.log('INFO: rediskey found using cache:', key);
                            if (key.indexOf('/image/download/') > 0)
                                resolve (reply);
                            else 
                                resolve (JSON.parse(reply));
                        } else
                            reject (err);
                    } else
                        reject (err);
                });
            } else
                reject (err);
        });
    }

    const setCache = (resp) => {
        if (!utils.chkVar().isUndefined(key)) {
            client.get(key, function (err, reply) {
                if (reply)
                    console.log('INFO: key already exists in redis:', key);
                else {
                    client.set(key, resp, function (err) {
                        if (err) console.log(key, err);
                        else console.log('INFO: saved redis key:', key);
                    });
                    client.expire(key, app_cnfg.REDIS_TTL);
                }
            });
        }
    }

    return {
        getCache,
        setCache
    };
}
module.exports.redis_mw = redis_mw;