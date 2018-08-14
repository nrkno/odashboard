
var httpclient = require('../../../../httpclient');
var request = require('request'),
  util = require('util'),
  assert = require('assert'),
  _ = require('lodash'),
  moment = require('moment');

var TeamCitySource = function() {
  var source = {};

  source.validate = function(datasource) {
    assert(datasource.source === 'teamcity',
      util.format('Datasource.source should be \'teamcity\' for datasource with id = %s.\n%s', datasource.id, JSON.stringify(datasource)));
    assert(datasource.config.url !== undefined,
      util.format('Datasource.config.url is missing for datasource with id = %s.\n%s', datasource.id, JSON.stringify(datasource)));
  };

  source.refresh = function(datasource, callback) {
    var eventId = `${datasource.plugin}.${datasource.id}`;
    var buildPath = 'builds/?';
    var runningLocators = Object.assign({running: 'true'}, datasource.config.locators);
    var allBuildsLocators = Object.assign({defaultFilter: 'false'}, datasource.config.locators);
  
    var gettingRunningBuilds = teamCityRequest(datasource, buildPath, runningLocators);
    var gettingBuilds = teamCityRequest(datasource, buildPath, allBuildsLocators);
  
    
    Promise.all([gettingRunningBuilds, gettingBuilds]).then(function (results) {
      var runningBuilds = JSON.parse(results[0]);
      var builds = JSON.parse(results[1]);      
      var lastBuilds = findLastBuilds(runningBuilds, builds);
    
      requestDetailedBuildData(datasource, lastBuilds)
        .then(function (data) {
          
          var odashboardBuildMsg = transformToOdashoardBuildMsg(data);
          callback(odashboardBuildMsg);
        })
        .catch(function (error) {
          console.log(error);
        });
    }).catch(function(error) {
      console.log('omg!' + error);
    });
  };

  function teamCityRequest(datasource, path, locators) {
    var locatorQueryParam = buildLocatorQueryParam(locators);
  
    var gettingTeamCityData = new Promise(function (resolve, reject) {
      var requrl = `${datasource.config.url}app/rest/${path}${locatorQueryParam}`;
      var headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
  
      httpclient.get(requrl, datasource.auth, headers, datasource.timeout)
        .then(function (result) {
          resolve(result.body);
        })
        .catch(function (error) {
          console.log(util.format('TeamCity datasource error: %s: %s', datasource.id, error));
          reject(error);
        });
    });
  
    return gettingTeamCityData;
  }

  function buildLocatorQueryParam(locators){
    if(!locators) return '';
  
    var locatorString = Object.keys(locators).reduce(function(acc, key){
      return acc.concat([`${key}:${locators[key]}`]);
    }, []);
    return `locator=${locatorString.join(',')}`;
  }

  function findLastBuilds(runningBuilds, builds) {
    var allBuilds = [];
  
    if (runningBuilds.count > 0) {
      allBuilds = runningBuilds.build.concat(builds.build);
    } else {
      allBuilds = builds.build;
    }
  
    var buildTypeIds = _.uniqBy(allBuilds, function (v) { return v.buildTypeId; }).map(function (v) { return v.buildTypeId; });
    latestBuilds = [];
    _.each(buildTypeIds, function (buildTypeId) {
      var thisBuilds = _.filter(allBuilds, function (v) { return v.buildTypeId == buildTypeId; });
      var latestBuild = _.max(thisBuilds, function (v) { return v.id; });
      latestBuilds.push(latestBuild);
    });
  
    return latestBuilds;
  }

  function requestDetailedBuildData(datasource, builds) {
    return new Promise(function (resolve, reject){
      var detailedBuildRequests = _.map(builds, function (build) {
        var url = 'builds/id:' + build.id;
        return teamCityRequest(datasource, url);
      });
  
      Promise.all(detailedBuildRequests).then(function (detailedBuilds) {
        var res = JSON.stringify({
          result: 'success',
          builds: detailedBuilds.map(function (build) { return JSON.parse(build); })
        });
        resolve(res);
      });
    });
  }
  function transformToOdashoardBuildMsg(data) {
    var jsonData = JSON.parse(data);
    var odashboardBuildMsg = {};
    odashboardBuildMsg.builds = _.map(jsonData.builds, function(build) {
      var percent, status, duration;
      if (build.state === 'running') {
        percent = build['running-info'].percentageComplete;
        status = 'running';
        duration = moment.duration({
          seconds: build['running-info'].elapsedSeconds
        }).toISOString();
      } else {
        if (build.status == 'FAILURE') {
          status = 'failed';
        } else if (build.status == 'UNKNOWN' && build.statusText.indexOf('Cancel') !== -1) {
          status = 'canceled';
        } else {
          status = 'success';
        }
        percent = 0;
        var start = moment(build.startDate, 'YYYYMMDDTHHmmss');
        var end = moment(build.finishDate, 'YYYYMMDDTHHmmss');
        var diff = moment.duration(end.diff(start));
        duration = diff.toISOString();
      }
      
      var lastCommiter = '';
      if (build.lastChanges && build.lastChanges.change) {
        lastCommiter = build.lastChanges.change[0].username;
      }
      var odashboardBuild = {
        buildTypeId: build.buildTypeId,
        state: status,
        startDate: build.startDate,
        finishDate: build.finishDate,
        duration: duration,
        percent: percent,
        lastCommiter: lastCommiter
      };
      return odashboardBuild;
    });
    return odashboardBuildMsg;
  }

  return source;
};

module.exports = TeamCitySource;