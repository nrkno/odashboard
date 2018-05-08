var fs = require('fs');

var clientPath = './config/widgets.js';
var clientTemplatePath = './config/widgets.template.js';
var serverPath = './config/dataSources.js';
var serverTemplatePath = './config/dataSources.template.js';

if (!fs.existsSync(clientPath)) {
  console.log('Could not find config/widgets.js. Generating from template.');
  fs.createReadStream(clientTemplatePath).pipe(fs.createWriteStream(clientPath));
}

if (!fs.existsSync(serverPath)) {
  console.log('Could not find config/dataSources.js. Generating from template.');
  fs.createReadStream(serverTemplatePath).pipe(fs.createWriteStream(serverPath));
}
