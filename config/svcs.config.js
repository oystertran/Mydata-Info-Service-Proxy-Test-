// const { profileSoap } = require('../config-soap/profile.js');
// const { chargesSoap } = require('../config-soap/charges.js');
// const { entitySoap } = require('../config-soap/entity.js');
const { acgsSoap } = require("../config-soap/acgs.js");
const { finSoap } = require("../config-soap/fin.js");
// const { certSoap } = require('../config-soap/cert.js');
// const { financialSoap } = require('../config-soap/financial.js');
// const { particularSoap } = require('../config-soap/particular.js');
// const { businessSoap } = require('../config-soap/business.js');

let services = new Map();

acgsSoap(services);
finSoap(services);
// chargesSoap(services);
// certSoap(services);
// entitySoap(services);
// profileSoap(services);
// financialSoap(services);
// particularSoap(services);
// businessSoap(services);

// // cert
// services.set(product.SERVICE.CERT.CHECK.IS_NAME_CHANGED,
//     {
//         method: 'isNameChanged', return: 'checkIfExistReturn', param_req: 'req', desc: 'CERT IS_NAME_CHANGED',
//         purchase: false
//     });

// services.set(product.SERVICE.CERT.CHECK.IS_COMPANY_CONVERTED,
//     {
//         method: 'isCompanyConverted', return: 'checkIfExistReturn', param_req: 'req', desc: 'CERT IS COMPANY CONVERTED',
//         purchase: false
//     });

// services.set(product.SERVICE.CERT.CHECK.IS_ACT_2016,
//     {
//         method: 'isAct2016', return: 'checkIfExistReturn', param_req: 'req', desc: 'CERT IS ACT 2016',
//         purchase: false
//     });

// services.set(product.SERVICE.CERT.CHECK.IS_ACT_2016,
//     {
//         method: 'isAct2016', return: 'checkIfExistReturn', param_req: 'req', desc: 'CERT IS ACT 2016',
//         purchase: false
//     });

// services.set(product.SERVICE.CERT.CHECK.IS_COMP_CLBG,
//     {
//         method: 'getCertIncorp', return: 'getCertIncorpReturn', param_req: 'supplyCertIncorpReq', desc: 'CERT IS COMP CLBG',
//         purchase: false
//     });

// services.set(product.SERVICE.CERT.PURC.CERT_INCORP,
//     {
//         method: 'getCertIncorp', return: 'getCertIncorpReturn', param_req: 'supplyCertIncorpReq', desc: 'CERT INCORP',
//         purchase: true
//     });

// services.set(product.SERVICE.CERT.PURC.CERT_INCORP_CTC,
//     {
//         method: 'getCertIncorpCtc', return: 'getCertIncorpCtcReturn', param_req: 'supplyCertIncorpCtcReq', desc: 'CERT INCORP CTC',
//         purchase: true
//     });

// services.set(product.SERVICE.CERT.PURC.CERT_COMPNAMECHG,
//     {
//         method: 'getInfoCompNameChg', return: 'getInfoIncorpReturn', param_req: 'supplyIncorpReq', desc: 'CERT COMPNAMECHG',
//         purchase: true
//     });

// services.set(product.SERVICE.CERT.PURC.CERT_COMPNAMECHGCTC,
//     {
//         method: 'getInfoCompNameChgCtc', return: 'getInfoIncorpReturn', param_req: 'supplyCertIncorpCtcReq', desc: 'CERT COMPNAMECHG CTC',
//         purchase: true
//     });

// services.set(product.SERVICE.CERT.PURC.CERT_CONVERSION,
//     {
//         method: 'getCertConversion', return: 'getCertConversionReturn', param_req: 'supplyCertConversionReq', desc: 'CERT CONVERSION',
//         purchase: true
//     });

// services.set(product.SERVICE.CERT.PURC.CERT_CONVERSIONTC,
//     {
//         method: 'getCertConversionCtc', return: 'getCertConversionCtcReturn', param_req: 'supplyCertConversionCtcReq', desc: 'CERT CONVERSION CTC',
//         purchase: true
//     });

// services.set(product.SERVICE.CERT.INCORP_STS,
//     {
//         method: 'getInfoIncorp', return: 'getInfoIncorpReturn', param_req: 'supplyIncorpReq', desc: 'INCORP STATUS',
//         purchase: false
//     });
// // cert

// // financial
// services.set(product.SERVICE.FINCOMP.YEAR,
//     {
//         method: 'getInfoFinancialYear', return: 'getInfoFinancialYearReturn', param_req: 'supplyFinancialReq', desc: 'FINANCIAL YEAR',
//         purchase: false
//     });
// services.set(product.SERVICE.FINCOMP.INFO,
//     {
//         method: 'getInfoFinancial', return: 'getInfoFinancialReturn', param_req: 'supplyFinancialReq', desc: 'FINANCIAL INFO',
//         purchase: true, type: 'INFOFINHISTY'
//     });
// services.set(product.SERVICE.FINCOMP.INFO_CTC,
//     {
//         method: 'getInfoFinancialCtc', return: 'getInfoFinancialCtcReturn', param_req: 'supplyFinancialReq', desc: 'FINANCIAL INFO CTC',
//         purchase: true
//     });
// services.set(product.SERVICE.FINCOMP.FIN02,
//     {
//         method: 'getInfoFin2', return: 'getInfoFin2Return', param_req: 'supplyFin2Req', desc: 'FINANCIAL INFO 2',
//         purchase: true, type: 'INFOFINHISTY'
//     });
// services.set(product.SERVICE.FINCOMP.FIN03,
//     {
//         method: 'getInfoFin3', return: 'getInfoFin3Return', param_req: 'supplyFin3Req', desc: 'FINANCIAL INFO 3',
//         purchase: true, type: 'INFOFINHISTY'
//     });
// services.set(product.SERVICE.FINCOMP.FIN05,
//     {
//         method: 'getInfoFin5', return: 'getInfoFin5Return', param_req: 'supplyFin5Req', desc: 'FINANCIAL INFO 5',
//         purchase: true, type: 'INFOFINHISTY'
//     });
// services.set(product.SERVICE.FINCOMP.FIN10,
//     {
//         method: 'getInfoFin10', return: 'getInfoFin10Return', param_req: 'supplyFin10Req', desc: 'FINANCIAL INFO 10',
//         purchase: true, type: 'INFOFINHISTY'
//     });
// // financial

const ssmmw = {};
ssmmw.soap_ops = services;

module.exports = ssmmw;
