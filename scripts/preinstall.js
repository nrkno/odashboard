var fs = require('fs');

var clientPath = './config/clientconfig.js';
var clientTemplatePath = './config/clientconfig.template.js';
var serverPath = './config/serverconfig.js';
var serverTemplatePath = './config/serverconfig.template.js';

if (!fs.existsSync(clientPath)) {
  console.log('Could not find config/clientconfig.js. Generating from template.');
  fs.createReadStream(clientTemplatePath).pipe(fs.createWriteStream(clientPath));
}

if (!fs.existsSync(serverPath)) {
  console.log('Could not find config/serverconfig.js. Generating from template.');
  fs.createReadStream(serverTemplatePath).pipe(fs.createWriteStream(serverPath));
}
