const redis_cnfg = require('../../config/redis.config.json')[process.env.NODE_ENV || 'DEVT'];
const Queue = require('bull');

const processJob = () => {

    const isAlive = () => {
        const options = {
            requestConfig: {
                timeout: 2000, // 120000 request timeout in milliseconds 
                noDelay: true, //Enable/disable the Nagle algorithm 
                keepAlive: true, //Enable/disable keep-alive functionalityidle socket. 
                keepAliveDelay: 100 //and optionally set the initial delay before the first keepalive probe is sent 
            },
            responseConfig: {
                timeout: 2000 // 120000 response timeout 
            }
        };

        let client = require('node-rest-client-promise').Client(options);

        return new Promise((resolve, reject) => {
            client.getPromise('http://localhost:20040/ssminfoservices/echo')
                .then((data) => {
                    if (data.response.statusCode !== 200)
                        throw new Error('not availabe');

                    resolve(data);
                })
                .catch((err) => {
                    console.log('ERRO:', err.code, err.message);
                    reject(new Error('mcs services is unavailable.'));
                })
        })
    }

    function procJob(q_data) {
        try {
            return new Promise(async (resolve, reject) => {
                return await sendQueue(q_data, resolve, reject);
            })
        } catch (err) {
            console.log(`Caught by try/catch ${err}`);
            Promise.reject(err.message);
        }
    }

    return {
        isAlive,
        procJob
    };
}
module.exports = processJob;

async function sendQueue(q_data, resolve, reject) {

    try {
        const queue = new Queue(q_data.info.qname, redis_cnfg.REDIS_CNFG);
        const jobOpt = setJobOptions(q_data);
        const job = await queue.add(q_data, jobOpt);
        console.log('SEND:', q_data.info.reqid, 'proc job:', q_data); //, setJobOptions());

        job.finished()
            .then(data => {
                // if (data.successCode === '11')
                //     throw new Error(data.errorMsg);
                resolve(data);
            })
            .catch(err => {
                console.log('ERRO:procjob.sendQueue:job:', q_data.info.reqid, q_data.info.qname, job.id, err);
                reject(new Error(err.message));
            })
            .finally(() => queue.close());
    } catch (err) {
        console.log('ERRO:procjob.sendQueue:', err.code, err);
        reject(err);
    }
}

function setJobOptions(q_data) {
    const retryOpt = { attempts: 3, backoff: { type: 'fixed', delay: 2000 } };
    const fixedOpt = { timeout: q_data.info.timeout, removeOnComplete: 20, removeOnFail: 5 };

    if (q_data.info.retry)
        return { ...fixedOpt, ...retryOpt };

    return fixedOpt;
}