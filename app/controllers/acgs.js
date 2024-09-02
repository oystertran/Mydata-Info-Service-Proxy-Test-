const { httpResp } = require("../../lib/client-resp.js");
const processJob = require('../services/procjob.js');
const product = require("../../config/product.js");
const worker_proc = require('../redis/worker-proc.js');

exports.check = (req, res, next) => {
    req.local.body.compNo = req.params.compNo;
    req.local.info.product = product.SERVICE.ACGS.QUERY;
    next();
};

exports.info = (req, res, next) => {
    req.local.info.product = product.SERVICE.ACGS.INFO;
    next();
};

exports.doclist = (req, res, next) => {
    req.local.body.compNo = req.params.compNo;
    req.local.info.product = product.SERVICE.ACGS.DOCS;
    next();
};

exports.procRPC = (req, res) => {
	return worker_proc.proc(req.local)
		.then(data => res.json(data))
}

exports.procJob = (req, res) => {
    processJob().procJob(req.local)
        .then(data => httpResp(req, res).success(data))
        .catch(err => httpResp(req, res).stacktrace(err))
}