const url_svcs = require('../config/wsdl.config.js');
var https = require('https');

const wsdl = () => {

    const opts = {
        connection: 'keep-alive',
        AxiosRequestConfig: { httpsAgent: new https.Agent({ keepAlive: true, keepAliveMsecs: 15000 })
        },
        attributesKey: 'sAttrib',
        valueKey: 'sVal',
    
        customDeserializer: {
            // this function will be used to any date found in soap responses
            dateTime: function (text, context) {
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
    }

    const file = () => {
        const soap_file = url_svcs.file.get(process.env.NODE_ENV);
        const path = require('path');

        const dirPath = path.join(__dirname, '/../');
        return dirPath + 'wsdl/' + soap_file.SSMInfoWsdlFile;
    }

    return {
        opts,
        file
    };
}

module.exports = wsdl;