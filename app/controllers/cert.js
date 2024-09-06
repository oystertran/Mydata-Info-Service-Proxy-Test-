const { httpResp } = require("../../lib/client-resp.js");
const processJob = require('../services/procjob.js');
const product = require("../../config/product.js");
const worker_proc = require('../redis/worker-proc.js');


exports.isAct2016 = (req, res, next) => {
    req.local.body = {...req.body, ...{ "companyNo": req.params.compNo }};
    req.local.info.product = product.SERVICE.CERT.CHECK.IS_ACT_2016;
    next();
};


exports.procRPC = (req, res) => {
	return worker_proc.proc(req.local)
		.then(data => res.json(data))
}