var widgetConfigValidatior = require('./widgetConfigValidator');
var datasourceConfigValidator = require('./datasourceConfigValidator');

function validate(appConfig, widgetconfig, datasourceconfig){
  try {
    datasourceConfigValidator.validateDatasourceConfig(datasourceconfig);
    widgetConfigValidatior.validateWidgetConfig(appConfig, widgetconfig);
  } catch (e) {
    console.log('Failed to validate configs:');
    console.log('--' + e.message);
    process.exit();
  }
}

var exports = module.exports = {};
exports.validate = validate;
