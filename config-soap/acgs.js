const product = require('../config/product.js');

function acgsSoap(services) {
    services.set(product.SERVICE.ACGS.QUERY,
        {
            method: 'getInfoAcgsQuery', return: 'getInfoAcgsQueryReturn', param_req: 'acgsQueryReq', desc: 'ACGS QUERY',
            purchase: false
        });
    services.set(product.SERVICE.ACGS.INFO,
        {
            method: 'getInfoAcgs', return: 'getInfoAcgsReturn', param_req: 'acgsReq', desc: 'ACGS INFO',
            purchase: true
        });
    services.set(product.SERVICE.ACGS.DOCS,
        {
            method: 'getLatestDocument', return: 'getLatestDocumentReturn', param_req: 'latestDocumentReq', desc: 'ACGS DOCS',
            purchase: false
        });
    return services;
}
exports.acgsSoap = acgsSoap;
