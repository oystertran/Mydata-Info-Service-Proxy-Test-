const soap = require('strong-soap').soap;

const soap_client = () => {
    const invoke = (service) => {

        console.log('INFO:', service.reqid, 'SSMMW call:', service.desc, service.timeout, 'ms', JSON.stringify(service.soap_env.request));
        let soap_service = {
            reqid: service.reqid, soap_env: service.soap_env, timeout: service.timeout,
            methodAsync: service.methodAsync, method: service.method, desc: service.desc, token: service.token, timeout: service.timeout,
            return: service.return
        };

        var wsdlOptions = {
            attributesKey: 'sAttrib',
            valueKey: 'sVal',

            customDeserializer: {
                // this function will be used to any date found in soap responses
                dateTime: function (text, context) {
                    console.log('strong:', text);
                    let dt = new Date(text);
                    text = dt.getTime();
        
                    return text;
                },
        
                long: function (text, context) {
                    text = Number(text);
                    return text;
                },
        
                decimal: function (text, context) {
                    text = Number(text);
                    return text;
                }
            }
        };

        return new Promise((resolve, reject) => {
            soap.createClient(service.url, wsdlOptions, function (err, client) {
                var header = { Authorization: soap_service.token };
                client[soap_service.method](soap_service.soap_env, function (err, result, envelope) {
                    if (!result.response)
                        reject(new Error('No data returned'));

                    if (soap_service.method === 'getLatestDocument')
                        console.log('data:', result.response[soap_service.return].documentList.documentList);

                    console.log('gg:', soap_service.return, soap_service.soap_env, result, result.response[soap_service.return]);
                    resolve(result.response[soap_service.return]);
                }, { timeout: soap_service.timeout }, header);
            });
            // soap.createClient(service.url, wsdlOptions)
            //     .then(client => {
            //         client.addHttpHeader('Authorization', soap_service.token);

            //         return client[soap_service.method](soap_service.soap_env);
            //     })
            // })
            // .then((data) => {
            //     resolve([data, soap_service]);
            // })
            // .catch(err => {
            //     console.log('ERRO: SSMMW call:', soap_service.reqid, err.code || 'SYS-ERR', err);
            //     if (err.code === 'ESOCKETTIMEDOUT' || err.code === 'ETIMEDOUT')
            //         reject(new Error('Request has expired'));
            //     else if (err.code === 'ECONNRESET' || err.code === 'SYS-ERR')
            //         reject(new Error('SSM service unavailable'));
            //     else
            //         reject(new Error(err.message));
            // })
        // }).catch(err => {
        //     console.log('ERRO: SSMMW call:', soap_service.reqid, err.code || 'SYS-ERR', err);
        //     if (err.code === 'ESOCKETTIMEDOUT' || err.code === 'ETIMEDOUT')
        //         reject(new Error('Request has expired'));
        //     else if (err.code === 'ECONNRESET' || err.code === 'SYS-ERR')
        //         reject(new Error('SSM service unavailable'));
        //     else
        //         reject(new Error(err.message));
        // });
    })
}

    return {
        invoke
    };
}

module.exports = soap_client;