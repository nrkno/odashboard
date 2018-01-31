#!/usr/bin/env node

var ArgumentParser = require('argparse').ArgumentParser;
var parser = new ArgumentParser({
  addHelp: true,
  description: 'Odashboard',
  usage: 'odashboard --widgetconfig <config file> --datasourceconfig <config file>'
});

parser.addArgument(
  ['--widgetconfig'],
  {
    required: false,
    defaultValue: './config/clientconfig.js',
    metavar: '<path to widget config>'
  }
);

parser.addArgument(
  ['--datasourceconfig'],
  {
    required: false,
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

module.exports = parser;