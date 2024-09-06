const product = require('../config/product.js');

function certSoap(services) {

    services.set(product.SERVICE.CERT.CHECK.IS_ACT_2016,
        {
            method: 'isAct2016', return: 'checkIfExistReturn', param_req: 'req', desc: 'CERT IS ACT 2016',
            purchase: false
        });

}
exports.certSoap = certSoap;
