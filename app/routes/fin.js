const fin = require("../controllers/fin.js");

function FIN_ROUTER(router) {
  var self = this;
  self.handleRoutes(router);
}

FIN_ROUTER.prototype.handleRoutes = function (router) {
  router.get("/fin/year/:compNo", fin.year, fin.procRPC);

  router.post("/getFinInfo", fin.info, fin.procJob);

  router.post("/getFinYearInfo", fin.finYearInfo, fin.procJob);
};

module.exports = FIN_ROUTER;
