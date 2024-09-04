const product = require('../config/product.js');

function profileSoap(services) {
    services.set(product.SERVICE.PROFILE.BUSINESS,
        {
            method: 'getBizProfile', return: 'getBizProfileReturn', param_req: 'supplyBizReq', desc: 'BUSINESS PROFILE',
            purchase: false
        });
    services.set(product.SERVICE.PROFILE.COMPANY,
        {
            method: 'getCompProfile', return: 'getCompProfileReturn', param_req: 'supplyCompReq', desc: 'COMPANY PROFILE',
            purchase: false
        });
    
    return services;
}
exports.profileSoap = profileSoap;