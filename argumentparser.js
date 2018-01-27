#!/usr/bin/env node

var ArgumentParser = require('argparse').ArgumentParser;
var parser = new ArgumentParser({
  addHelp: true,
  description: 'Odashboard'
});

parser.addArgument(
  ['-wc', '--widgetconfig'],
  {
    help: 'path to widget config file',
    required: false,
    defaultValue: './config/clientconfig.js'
  }
);

parser.addArgument(
  ['-dc', '--datasourceconfig'],
  {
    help: 'path to datasource config file',
    required: false,
    defaultValue: './config/serverconfig.js'
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