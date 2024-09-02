const ssm_operation = require('../../config/serv.cnfg.json');
const app_cnfg = require('../../config/ap.config.json');
const soap_wsdl = require('../../lib/soap-wsdl.js');
const mw_svcs = require('../../config/svcs.config.js');
const { random } = require('../services/random.js')
const utils = require('../../lib/utils.js');
// const soap_client = require('../../lib/strong-client.js');
// const soap_client = require('../../lib/soap-clientasync.js');
const soap_client = require('../../lib/soap-client.js');
const processJob = require('./procjob.js');

const services = () => {

    const set_service = (q_data, data) => {
        // console.log('DBUG: q_data:', q_data, 'data:', data);
        console.log('INFO:', q_data.info.reqid, 'token:', data.token);

        return new Promise((resolve, reject) => {
            let svcs = mw_svcs.soap_ops.get(q_data.info.product);

            if (!svcs)
                // reject(new Error('missing product info.'));
                reject(new Error(handleSysError('missing product info.')));
            else {
                setServicesProp(svcs, q_data, data);
                resolve(svcs);
            }
        })
    }

    const get_ssmmw_token = (q_data) => {
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
            client.getPromise('https://authstg.mydata-ssm.com.my/auth/getToken?user=MYDATA')
                .then((data) => {
                    if (data.response.statusCode !== 200)
                        throw new Error('not availabe');

                    resolve(data.data);
                })
                .catch((err) => {
                    console.log('ERRO:', err.code, err.message);
                    reject(new Error('mcs services is unavailable.'));
                })
        })
        // let token_q_data = {
        //     info: {
        //         reqid: q_data.info.reqid, qname: process.env.NODE_ENV + '-SSMMW-AUTH-ssmtoken',
        //         timeout: 1000
        //     },
        //     query: { env: process.env.NODE_ENV, user: q_data.body.agencyId }
        // };

        // return processJob().procJob(token_q_data);
    }

    const invoke = (service) => {
        return soap_client().invoke(service)
            .then(data => soap_deserialize(data))
        
        function soap_deserialize([result, service]) {
            return deserialization(result, service);
        }
    }

    return {
        invoke,
        set_service,
        get_ssmmw_token
    };
}

// ================================================ global fn ===========================================

function handleSysError(message) {
    return app_cnfg.APP_PORT + ':' + message;
}

function setServicesProp(svcs, q_data, data) {
    const cust_req_date = utils().dateTimeZone(new Date().toISOString());

    svcs.methodAsync = svcs.method + 'Async';
    svcs.url = soap_wsdl().file();
    svcs.opts = soap_wsdl().opts;
    svcs.reqid = q_data.info.reqid;
    svcs.timeout = (svcs.purchase ? app_cnfg.SSMMW_TIMEOUT.PAID : app_cnfg.SSMMW_TIMEOUT.FREE);

    if (svcs.type)
        q_data.body.type = svcs.type;

    if (svcs.tableId)
        q_data.body.tableId = svcs.tableId;

    if (!svcs.purchase)
        q_data.body.reqRefNo = random().issue_Uuid_ReferenceNo('FOC', 7);

    delete q_data.body.productname;
    svcs.soap_req = {};
    svcs.soap_req[svcs.param_req] = q_data.body;

    svcs.soap_env = {
        header: {
            "customerId": q_data.body.agencyId, 'customerReferenceNo': q_data.body.reqRefNo || '',
            "customerRequestDate": cust_req_date.toISOString()
        },
        request: svcs.soap_req
    };
    svcs.token = data.token;
}

function deserialization(data, service) {

    if (!data || !data[0].response)
        throw new Error('no response data available');

    let result = data[0].response[service.return] || data[0].response;

    function isObject(a) {
        return (!!a) && (a.constructor === Object);
    };

    function isArray(a) {
        return (!!a) && (a.constructor === Array);
    };

    // if (result.successCode === '00' && result.errorMsg === '') {
    if (result.successCode === '00') {

        let obj = Object.keys(result).filter((k) => result[k] != null).reduce((a, k) => ({ ...a, [k]: result[k] }), {});
        delete obj.sAttrib;

        Object.keys(obj).forEach(key => {
            let first_lvl = obj[key];
            let first_lvl_isObj = isObject(first_lvl);

            if (first_lvl.hasOwnProperty('sVal'))
                obj[key] = first_lvl.sVal;

            if (first_lvl_isObj && first_lvl.hasOwnProperty(key)) {
                obj[key] = first_lvl[key];
            }

            if (first_lvl_isObj) {
                Object.keys(first_lvl).forEach(key => {
                    let prop = first_lvl[key];

                    if (isObject(prop) && prop.hasOwnProperty(key)) {
                        first_lvl[key] = first_lvl[key][key];
                    }

                    if (isObject(prop) && prop.hasOwnProperty('sAttrib'))
                        first_lvl[key] = prop.sVal;

                    // second
                    let second_lvl = first_lvl[key];
                    let second_lvl_isObj = isObject(second_lvl);
                    let second_lvl_isArr = isArray(second_lvl);

                    if (second_lvl_isObj || second_lvl_isArr) {
                        Object.keys(second_lvl).forEach(key => {
                            let prop = second_lvl[key];

                            if (isObject(prop) && prop.hasOwnProperty('sAttrib'))
                                second_lvl[key] = prop.sVal;

                            // third
                            let third_lvl = second_lvl[key];
                            let third_lvl_isObj = isObject(third_lvl);

                            if (third_lvl_isObj) {
                                Object.keys(third_lvl).forEach(key => {
                                    let prop = third_lvl[key];

                                    if (isObject(prop) && prop.hasOwnProperty('sAttrib'))
                                        third_lvl[key] = prop.sVal;

                                    // forth

                                });
                            }
                        });
                    }
                });
            }
        });

        if (service.desc === 'COMPANY PROFILE')
            console.log('TRCE:', service.reqid, 'soap-client compProfile:', result.rocCompanyInfo.companyNo, result.rocCompanyInfo.companyName);

        console.log('RESP:', service.reqid, 'deserialize soap:', service.method, result.successCode);
        return obj;

    } else {
        // ssmmw still resp but with error
        if (result.errorMsg === 'No Data')
            result.successCode = '11';
        else {
            console.log('ERRO:', service.reqid, 'custRefNo', service.soap_env.header.customerReferenceNo, 'SSMMW RESP:', result);
            // result.errorMsg = 'SSMMW service unavailable';
            throw new Error(result.errorMsg);
        }
        return result;
    }
}

module.exports = services;