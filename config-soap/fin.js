const product = require("../config/product.js");

function finSoap(services) {
  services.set(product.SERVICE.FINCOMP.YEAR, {
    method: "getInfoFinancialYear",
    return: "getInfoFinancialYearReturn",
    param_req: "supplyFinancialReq",
    desc: "FINANCIAL YEAR",
    purchase: false,
  });
  services.set(product.SERVICE.FINCOMP.INFO, {
    method: "getInfoFinancial",
    return: "getInfoFinancialReturn",
    param_req: "supplyFinancialReq",
    desc: "FINANCIAL INFO",
    purchase: true,
    type: "INFOFINHISTY",
  });

  services.set(product.SERVICE.FINCOMP.FIN02, {
    method: "getInfoFin2",
    return: "getInfoFin2Return",
    param_req: "supplyFin2Req",
    desc: "FINANCIAL INFO 2",
    purchase: true,
    type: "INFOFINHISTY",
  });

  services.set(product.SERVICE.FINCOMP.FIN03, {
    method: "getInfoFin3",
    return: "getInfoFin3Return",
    param_req: "supplyFin3Req",
    desc: "FINANCIAL INFO 3",
    purchase: true,
    type: "INFOFINHISTY",
  });

  services.set(product.SERVICE.FINCOMP.FIN05, {
    method: "getInfoFin5",
    return: "getInfoFin5Return",
    param_req: "supplyFin5Req",
    desc: "FINANCIAL INFO 5",
    purchase: true,
    type: "INFOFINHISTY",
  });

  services.set(product.SERVICE.FINCOMP.FIN10, {
    method: "getInfoFin10",
    return: "getInfoFin10Return",
    param_req: "supplyFin10Req",
    desc: "FINANCIAL INFO 10",
    purchase: true,
    type: "INFOFINHISTY",
  });

  return services;
}
exports.finSoap = finSoap;
