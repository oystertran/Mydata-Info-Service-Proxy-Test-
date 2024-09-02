const Queue = require('bull');

const bullQueue = () => {
    const newQueue = (redis_cnfg) => {
        return new Queue(process.env.QUEUE_ENV, redis_cnfg, { maxStalledCount: 0 });

    }

    const eventQueue = (queue) => {
        queue
            .on('completed', (job, result) => {
                // trace comp profile
                if (job.data.info.product === 'compProfile' ) {
                    let mwResp = JSON.parse(JSON.stringify(result));
                    console.log('TRCE:', job.data.info.reqid, mwResp.rocCompanyInfo.companyNo, mwResp.rocCompanyInfo.companyName);
                }
                // trace comp profile
                
                console.log(`QSUC: ${job.data.info.reqid} ${job.data.info.product} job completed ${job.id}`);
            })

            .on('failed', function (job, err) {
                // A job failed with reason `err`!
                console.log(`QFIL: ${job.data.info.reqid} ${job.data.info.product} ${queue.name} ${job.id} message: ${err.message}`);
            })

            .on('error', function (error) {
                console.log(`QERR: ${error.message}`);
            });
    }

    return {
        newQueue,
        eventQueue
    };
}
module.exports = bullQueue;