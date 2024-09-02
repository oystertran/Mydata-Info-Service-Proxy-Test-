// var java = require('java');
// var path = require('path');

const show = (req, res) => {

    // constant value
    const success = (data) => {
        console.log('RESP:', req.local.reqid, req.local.reqrefno, req.local.service.desc, data.successCode);
        res.json(data)
    }

    const stacktrace = (err) => {
        let msg = sysErrorMessage(err);
        let sys_err_message = (err.message === undefined ? err : err.message);
        let err_msg = { errorMsg: msg, successCode: '11', sysErrorMsg: sys_err_message, source: '10021' };
        console.log('ERRO:', req.local.reqid, req.local.reqrefno, err);

        res.status(500).json(err_msg)
    }

    return {
        success,
        stacktrace
    };
}
module.exports.show = show;

function sysErrorMessage(error) {

    switch (error.code) {
        case "ESOCKETTIMEDOUT":
            msg = 'request has expired';
            break;
        case "ENOTFOUND":
            msg = 'Service Unavailable';
            break;
        default:
            msg = 'Internal error';
    }
    return msg;
}