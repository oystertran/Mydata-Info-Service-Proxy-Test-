const app_cnfg = require('../../config/ap.config.json');
const redis_cnfg = require('../../config/redis.config.json')[process.env.NODE_ENV || 'DEVT'];
const queue = require('../../lib/worker-queu.js');
const worker_proc = require('./worker-proc.js');
const product = require('../../config/product.js');
const utils = require('../../lib/utils.js');

module.exports = function workerInitialize() {

    try {
        const { infoQ } = QueueInit();
        QueueProcessInit(info, infoQ);

    } catch (error) {
        console.log("ERRO: setting up [QUEUE] [WORKER],", error);
    }

    function info(infoQ) {
        infoQ.empty();
        for (const status of ['active', 'completed', 'delayed', 'failed', 'wait']) {
            // for (const status of ['failed', 'wait']) {
            infoQ.clean(0, status);
        }

        infoQ.process(app_cnfg.APP_WORKER, (job) => {
            showWorkerInfo(job);
            job.data.body.agencyId = app_cnfg.APP_AGENCY;
            setProductService(job, info);

            return worker_proc.proc(job.data);
        });

        queue().eventQueue(infoQ);
    }
}

// ======================================= private function ==============================================
function QueueInit() {
    const infoQ = queue().newQueue(redis_cnfg.REDIS_CNFG);

    return { infoQ };
}

function QueueProcessInit(info, infoQ) {
    info(infoQ);
}

function showWorkerInfo(job) {
    console.log('WORK:', job.data.info.reqid, 'job id:', job.id, 'data:', JSON.stringify(job.data));
}

function setProductService(job) {

    if (job.data.info.product === product.SERVICE.ENTITY.REG_NEW_FORMAT) {
        job.data.body.formatType = (job.data.body.regNo.length >= 12 ? 'NEW' : 'OLD');
    }

    if (job.data.info.product === product.SERVICE.ACGS.QUERY || job.data.info.product === product.SERVICE.ACGS.INFO) {
        // const cust_req_date = utils().dateTimeZone(new Date().toISOString());
        // const dateApplyAcgs = utils().dateTimeZone(new Date('2023-01-01').toISOString());
        const dateApplyAcgs = utils().dateTimeZone(new Date().toISOString());
        job.data.body.dtApplyAcgs = dateApplyAcgs.toISOString();
    }

    // particular
    if (Object.keys(product.SERVICE.PARTICULAR).find(key => product.SERVICE.PARTICULAR[key] === job.data.info.product)) {
        if (job.data.info.product === product.SERVICE.PARTICULAR.ADDRESS) {
            job.data.body.fromDate = utils().dateTimeZone('1900-01-01').toISOString();
        }

        // if (job.data.info.product === product.SERVICE.PARTICULAR.COSEC)
        //     job.data.body.designation = 'S';

        // job.data.body.tableId = "ROCINFO";
    }
    // particular

    // financial
    if (job.data.info.product === product.SERVICE.FINCOMP.FIN00) {
        switch (job.data.body.year) {
            case 2:
                job.data.info.product = product.SERVICE.FINCOMP.FIN02;
                break;
            case 3:
                job.data.info.product = product.SERVICE.FINCOMP.FIN03;
                break;
            case 5:
                job.data.info.product = product.SERVICE.FINCOMP.FIN05;
                break;
            case 10:
                job.data.info.product = product.SERVICE.FINCOMP.FIN10;
                break;
            // default:
            //     msg = 'Internal error';
        }
    }

    if (job.data.body.isCertified === 'true')
        job.data.info.product = job.data.info.product + 'CTC';
}