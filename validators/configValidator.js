var clientConfigValidator = require('./clientConfigValidator');
var serverConfigValidator = require('./serverConfigValidator');

function validate(){
  try {
    serverConfigValidator.validateServerConfig();
    clientConfigValidator.validateClientConfig();
  } catch (e) {
    console.log('Failed to validate configs:');
    console.log('--' + e.message);
    process.exit();
  }

}

var exports = module.exports = {};
exports.validate = validate;
