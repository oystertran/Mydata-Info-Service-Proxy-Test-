let common = require('../lib/common.js');

const httpResp = (req, res) => {
    const _local = req.local;

    // constant value
    const success = (data) => {
        // let method = (_local.service ? _local.service.method : 'WKER');
        console.log('CRES:', _local.info.reqid, _local.info.product, _local.info.reqrefno || 'NO-REF', '00');
        res.json(data);
    }

    const stacktrace = (err) => {

        // let err_msg = { message: 'Internal Error 20040', data: {} };
        // // if (type === common.INTERNAL) {
        // //     // let msg = internalErrorMsg(err);
        // //     err_msg = { message: err.message, data: {} };
        // // } else {
        // //     err_msg = { message: (err.message || err), data: {} };
        // // }
        // console.log('NINA:', _local.info.reqid, err.message);
        // console.log('RESP:', _local.info.reqid, err_msg);
        let a = { errorMsg: err.message, successCode: 11 };
        res.json(a);
    }

    return {
        success,
        stacktrace
    };
}
module.exports.httpResp = httpResp;

function internalErrorMsg(error) {

    switch (error.code) {
        case "ESOCKETTIMEDOUT":
            msg = 'request has expired';
            break;
        case "TimeoutError":
            msg = 'Request timeout';
            break;
        default:
            msg = 'Internal error';
    }
    return msg;
}