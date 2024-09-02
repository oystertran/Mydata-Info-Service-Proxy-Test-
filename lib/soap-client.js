// const soap = require('soap-as-promised');
const soap = require('soap');

const soap_client = () => {
    const invoke = (service) => {
        // var http = require('http');
        // http.globalAgent.keepAlive = true;
        var https = require('https');

        // return new Promise((resolve, reject) => {
            console.log('INFO:', service.reqid, 'INVOKE', service.desc, 'T/O:', service.timeout, JSON.stringify(service.soap_env.request));
            let soap_service = {
                reqid: service.reqid, soap_env: service.soap_env, timeout: service.timeout,
                methodAsync: service.methodAsync, method: service.method, desc: service.desc, token: service.token, timeout: service.timeout,
                return: service.return
            };

            return soap.createClientAsync(service.url, service.opts)
            // return soap.createClientAsync(service.url, service.opts)
                .then((client) => {
                    client.addHttpHeader('Authorization', soap_service.token);
                    client.addSoapHeader('connection', 'keep-alive');
                    // console.log('soap client:', client);
                    // const options = { timeout: 70000, connection: 'keep-alive', forever: true }; #1
                    const options = { timeout: 70000, httpsAgent: new https.Agent({ keepAlive: true, keepAliveMsecs: 1000 }) };
                    const option1 = {
                        timeout: 70000,
                        requestConfig: {
                            noDelay: true, //Enable/disable the Nagle algorithm 
                            keepAlive: true, //Enable/disable keep-alive functionalityidle socket. 
                            keepAliveDelay: 100 //and optionally set the initial delay before the first keepalive probe is sent 
                        },
                    }
                    return client[soap_service.methodAsync](soap_service.soap_env, { timeout: service.timeout, httpsAgent: new https.Agent({ keepAlive: true, keepAliveMsecs: 15000 }) });
                    // return client[soap_service.methodAsync](soap_service.soap_env, options);
                })
                .then((data) => {
                    return ([data, soap_service]);
                })
                // .then(data => {
                //     let result = JSON.parse(JSON.stringify(data[0]));
                //     if (service.type === 'INFOPROFILE') {
                //         console.log('data resp:', service.reqid, result.header.customerReferenceNo, 'cust req dt:', result.header.customerRequestDate,
                //                     'req timestamp:', result.header.requestTimestamp, 'res timestamp:', result.header.requestTimestamp);

                //         console.log('req custrefno:', curr_soap.soap_env.header.customerReferenceNo, result.header.customerReferenceNo, 
                //                                       JSON.stringify(result.request));

                //         if (curr_soap.soap_env.header.customerReferenceNo !== result.header.customerReferenceNo)
                //             throw new Error('referenceno not match');
                //     }
                //     resolve(data);
                // })
                .catch(err => {
                    console.log('ERRO: SSMMW call:', soap_service.reqid, 'code:', err.code || 0, 'message:', err.message);
                    if (err.code === 'ESOCKETTIMEDOUT' || err.code === 'ETIMEDOUT' || err.code === 'ECONNABORTED')
                        throw new Error('Request has expired');
                    else if (err.code === 'ENOTFOUND')
                        throw new Error('SSM service unavailable');
                    else
                        throw new Error('Internal Server Error');
                })
        // })
    }

    return {
        invoke
    };
}

module.exports = soap_client;