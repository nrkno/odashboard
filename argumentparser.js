var ArgumentParser = require('argparse').ArgumentParser;


/**
 * @returns {{ widgetconfig: string, datasourceconfig: string, port?: number }}
 */
module.exports = function () {
  var parser = new ArgumentParser({
    addHelp: true,
    description: 'Odashboard',
    usage: 'odashboard --widgetconfig <config file> --datasourceconfig <config file>'
  });
  
  parser.addArgument(
    ['-w', '--widgetconfig'],
    {
      required: false,
      defaultValue: './config/widgets.js',
      metavar: '<path to widget config>'
    }
  );
  
  parser.addArgument(
    ['-d', '--datasourceconfig'],
    {
      required: false,
      defaultValue: './config/dataSources.js',
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