const { httpResp } = require("../../lib/client-resp.js");
const processJob = require("../services/procjob.js");
const product = require("../../config/product.js");
const worker_proc = require("../redis/worker-proc.js");

exports.year = (req, res, next) => {
  req.body.coNo = req.params.compNo;
  req.local.info.product = product.SERVICE.FINCOMP.YEAR;
  next();
};

exports.info = (req, res, next) => {
  req.local.info.product = product.SERVICE.FINCOMP.INFO;
  next();
};

exports.finYearInfo = (req, res, next) => {
  const yearsMap = {
    // 0: product.SERVICE.FINCOMP.FIN00,
    2: product.SERVICE.FINCOMP.FIN02,
    3: product.SERVICE.FINCOMP.FIN03,
    5: product.SERVICE.FINCOMP.FIN05,
    10: product.SERVICE.FINCOMP.FIN10,
  };

  const year = req.body.Year;

  if (yearsMap.hasOwnProperty(year)) {
    req.local.info.product = yearsMap[year];
  }

  delete req.body.userId;

  next();
};

exports.procRPC = (req, res) => {
  return worker_proc.proc(req.local).then((data) => res.json(data));
};

exports.procJob = (req, res) => {
  processJob()
    .procJob(req.local)
    .then((data) => httpResp(req, res).success(data))
    .catch((err) => httpResp(req, res).stacktrace(err));
};
