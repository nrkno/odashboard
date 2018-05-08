var ArgumentParser = require('argparse').ArgumentParser;


/**
 * @param {boolean=} requireConfig
 * @returns {{ widgetconfig: string, datasourceconfig: string, port?: number }}
 */
module.exports = function (requireConfig = false) {
  var parser = new ArgumentParser({
    addHelp: true,
    description: 'Odashboard',
    usage: 'odashboard --widgetconfig <config file> --datasourceconfig <config file>'
  });
  
  parser.addArgument(
    ['-w', '--widgetconfig'],
    {
      required: requireConfig,
      defaultValue: './config/clientconfig.js',
      metavar: '<path to widget config>'
    }
  );
  
  parser.addArgument(
    ['-d', '--datasourceconfig'],
    {
      required: requireConfig,
      defaultValue: './config/serverconfig.js',
      metavar: '<path to datasource config>'
    }
  );
  
  parser.addArgument(
    ['-p', '--port'],
    {
      help: 'port number',
      required: false,
      defaultValue: 3000
    }
  );

  return parser.parseArgs();
};