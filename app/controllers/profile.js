const { httpResp } = require("../../lib/client-resp.js");
const processJob = require('../services/procjob.js');
const product = require("../../config/product.js");
const worker_proc = require('../redis/worker-proc.js');

exports.biz = (req, res, next) => {
    req.local.body.compNo = req.params.compNo;
    req.local.info.product = product.SERVICE.PROFILE.BUSINESS;
    next();
};

exports.comp = (req, res, next) => {
    req.local.body.compNo = req.params.compNo;
    req.local.info.product = product.SERVICE.PROFILE.COMPANY;
    next();
};

exports.procRPC = (req, res) => {
	return worker_proc.proc(req.local)
		.then(data => res.json(data))
}