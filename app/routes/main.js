const app_cnfg = require('./../../config/ap.config.json');
const { random } = require('../../app/services/random.js');

function MAIN_ROUTER(router) {
    var self = this;
    self.handleRoutes(router);
}

MAIN_ROUTER.prototype.handleRoutes = function (router) {
    // var redis_mw = require('./../../lib/cache-mw.js');

    router.use(function (req, res, next) {
        // set agencyId (rpc)
        req.body.agencyId = app_cnfg.APP_AGENCY;

        req.local = {};
        req.local.info = setQueueInfo(req);
        req.local.body = req.body;

        console.log('REQS:', req.local.info.reqid, 'reqrefno:', req.local.info.reqrefno || 'FOC', req.originalUrl, 'body:', JSON.stringify(req.body));
        next();
    });
}

module.exports = MAIN_ROUTER;

function setQueueInfo(req) {
    let data = { reqid: random().issue_Uuid_AlphaN(8), reqrefno: req.body.reqRefNo || '', qname: process.env.QUEUE_ENV };
    
    return data;
}