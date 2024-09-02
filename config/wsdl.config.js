let wsdl = new Map();

wsdl.set( 'LOCAL', { SSMInfoWsdlFile: 'devt-ssm-mw-infoservice.wsdl' });
wsdl.set( 'DEVT', { SSMInfoWsdlFile: 'stag-ssm-mw-infoservice.wsdl' });
wsdl.set( 'STAG', { SSMInfoWsdlFile: 'stag-ssm-mw-infoservice.wsdl' });
wsdl.set( 'PROD', { SSMInfoWsdlFile: 'prod-ssm-mw-infoservice.wsdl' });
wsdl.set( 'RELS', { SSMInfoWsdlFile: 'prod-ssm-mw-infoservice.wsdl' });

const ssmmwsdl = {};
ssmmwsdl.file = wsdl;

module.exports = ssmmwsdl;