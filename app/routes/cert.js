const cert = require('../controllers/cert.js');

function CERT_ROUTER(router) {
    var self = this;
    self.handleRoutes(router);
}

CERT_ROUTER.prototype.handleRoutes = function (router) {   
    //create a get request to 
    router.get("/cert/isAct2016/:compNo", cert.isAct2016, cert.procRPC);

}

module.exports = CERT_ROUTER;