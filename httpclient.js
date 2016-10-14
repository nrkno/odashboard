var request = require('request'),
  ntlm = require('httpntlm'),
  util = require('util');

function get(url, auth, headers, timeout) {
  if(auth === undefined || auth === 'none') {
    return getNoAuth(url, headers, timeout);
  } else  if (auth.type === 'ntlm') {
    return getNtlm(url, auth.options.username, auth.options.password,
      auth.options.domain, auth.options.workstation);
  } else if (auth.type === 'basic') {
    return getBasicAuth(url, headers, timeout, auth.options.username, auth.options.password);
  } else if (auth.type === 'apiKey') {
    return getWithApiKey(url, headers, timeout, auth.options.key, auth.options.headerName);
  } else {
    return new Promise(function (resolve, reject) {
      reject(Error('Authentication method not supported, no request is fired'));
    });
  }
}

function getWithApiKey(url, headers, timeout, apiKey, headerName) {
  return new Promise(function (resolve, reject) {
    headers[headerName] = apiKey;
    request({
      url: url,
      timeout: timeout,
      headers: headers
    }, function(error, response, body) {
      if (error) {
        if (error.code === 'ETIMEDOUT') {
          reject(Error('Timeout for ' + url));
        } else {
          reject(Error(error));
        }
      } else {
        resolve({
          response: response,
          body: body
        });
      }
    });
  });
}

function getNoAuth(url, headers, timeout) {
  return new Promise(function (resolve, reject) {
    request({
      url: url,
      timeout: timeout,
      headers: headers
    }, function (error, response, body) {

      if (error || (response.statusCode < 200 || response.statusCode > 300)) {
        if (error && error.statusCode === 'ETIMEDOUT') {
          console.log(util.format('Timeout connecting to %s', url));
        } else if (error && error.statusCode) {
          console.log(util.format('Error connection to %s : %s : %s', url, response.statusCode, error));
        } else if (error) {
          console.log(util.format('Error connection to %s : %s', url, error));
        } else {
          console.log(util.format('Unable to get data url %s : %s', url, response));
        }
        reject(undefined);
      } else {
        resolve({
          response: response,
          body: body
        });
      }
    });
  });
}

function getNtlm(url, username, password, domain, workstation) {

  var opts = {
    url: url,
    username: username,
    password: password,
    domain: domain,
    workstation: workstation
  };

  return new Promise(function (resolve, reject) {
    ntlm.get(opts, function (err, response) {
      if (err) {
        reject(Error(err));
      } else {
        if (response.statusCode == 401) {
          reject(Error('Not authenicated.'));
        } else {
          resolve({
            response: response,
            body: response.body
          });
        }
      }
    });
  });
}

function getBasicAuth(url, headers, timeout, username, password) {
  return new Promise(function (resolve, reject) {
    request({
      url: url,
      timeout: timeout,
      'auth': {
        'user': username,
        'pass': password,
        'sendImmediately': false
      },
      headers: headers
    }, function(error, response, body) {
      if (error) {
        if (error.code === 'ETIMEDOUT') {
          reject(Error('Timeout for ' + url));
        } else {
          reject(Error(error));
        }
      } else {
        resolve({
          response: response,
          body: body
        });
      }
    });
  });
}

var exports = module.exports = {};
exports.get = get;
