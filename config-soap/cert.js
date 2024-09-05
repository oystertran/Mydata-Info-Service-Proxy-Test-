const product = require('../config/product.js');

function certSoap(services) {
    services.set(product.SERVICE.CERT.CHECK.IS_NAME_CHANGED,
        {
            method: 'isNameChanged', return: 'checkIfExistReturn', param_req: 'req', desc: 'CERT IS_NAME_CHANGED',
            purchase: false
        });

    services.set(product.SERVICE.CERT.CHECK.IS_COMPANY_CONVERTED,
        {
            method: 'isCompanyConverted', return: 'checkIfExistReturn', param_req: 'req', desc: 'CERT IS COMPANY CONVERTED',
            purchase: false
        });

    services.set(product.SERVICE.CERT.CHECK.IS_ACT_2016,
        {
            method: 'isAct2016', return: 'checkIfExistReturn', param_req: 'req', desc: 'CERT IS ACT 2016',
            purchase: false
        });


    services.set(product.SERVICE.CERT.CHECK.IS_COMP_CLBG,
        {
            method: 'getCertIncorp', return: 'getCertIncorpReturn', param_req: 'supplyCertIncorpReq', desc: 'CERT IS COMP CLBG',
            purchase: false
        });
}
exports.certSoap = certSoap;
