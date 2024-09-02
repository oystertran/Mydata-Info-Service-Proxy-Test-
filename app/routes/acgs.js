
const acgs = require('../controllers/acgs.js');

function ACGS_ROUTER(router) {
    var self = this;
    self.handleRoutes(router);
}

ACGS_ROUTER.prototype.handleRoutes = function (router) {    

    router.get("/acgs/query/:compNo/:chkDigit", acgs.check, acgs.procRPC);

    router.get("/acgs/docs/:compNo", acgs.doclist, acgs.procRPC);
    
    router.post("/acgs/info", acgs.info, acgs.procJob);
}

module.exports = ACGS_ROUTER;