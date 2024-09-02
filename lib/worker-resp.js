const message = (q_data) => {

    const success = (data) => {
        console.log('WRES:', q_data.req.id, q_data.req.reqrefno, q_data.service.method, '00');
        // done(null, { message: '', data: data });
        // done(null, data);
        return Promise.resolve(data);

    }

    const error = (err) => {
        // let _msg = 'Internal Error 20040';
        // if (err.name === 'Error') { // error handled
        //     //  _msg = 'whoopsie. ' + err.message;
        //     _msg = 'Internal Error';
        // } else {
        //     if (err.errors) {
        //         const _err_obj = {};
        //         err.errors.map(er => {
        //             _err_obj[er.path] = er.message;
        //             _err_obj['field'] = er.path;
        //             _err_obj['type'] = er.type;
        //         })

        //         if (_err_obj.type === 'unique violation')
        //             _msg = 'whoopsie. ' + _err_obj['field'] + ' is already being used.'
        //     }

        //     // if (err_obj.hasOwnProperty('email'))
        //     //     _msg = 'email is already being used.'
        // }

        // console.log('ERRO:', q_data.req.reqid, q_data.req.module, err.stack);
        // const data = { errorMsg: err.message, successCode: 11 };
        // // return Promise.reject(new Error('oh no'));
        // return Promise.reject(err);
        // done(data);
        console.log('ERRO: worker-resp:', q_data.info.reqid, q_data.info.reqrefno, err);

        const data = { successCode: 11, errorMsg: err.message, source: process.env.APP_NAME };
        return (data);
    }

    return {
        success,
        error
    };
}
module.exports = message;