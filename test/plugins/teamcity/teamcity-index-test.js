var assert = require('assert');
var TeamCityPlugin = require('../../../src/plugins/teamcity/index');
var fs = require('fs');
var path = require('path');

function getTestWidget(name, id) {
  return {
    plugin: 'teamcity',
    datasourceId: 'datasourceId',
    name: name,
    id: id,
    url: 'https://www.nrk.no/',
    started: '',
    duration: '0 s',
    percent: '',
    status: 'Success',
    'class': 'inProgress'
  };
}

describe('TeamCity Plugin', function() {

  describe('createTeamCityWidget()', function() {
    it('should return valid team city widget', function() {

      var configWidget = {
        plugin: 'teamcity',
        datasourceId: 'teamcity_1',
        id: 'a-teamcity-build-id',
        name: 'Build'
      };

      var widget = TeamCityPlugin.createTeamCityWidget(configWidget);

      assert(widget.plugin === 'teamcity');
      assert(widget.datasourceId === configWidget.datasourceId);
      assert(widget.id === configWidget.id);
      assert(widget.name === configWidget.name);

      assert(widget.started != undefined);
      assert(widget.duration  != undefined);
      assert(widget.percent  != undefined);
      assert(widget.status  != undefined);
      assert(widget.class  != undefined);
    });
  });

  describe('updateBuildBlock', function() {

    var failedBuild, runningBuild, successfullBuild;

    before(function() {
      var failedBuildDir = path.join(__dirname, 'resources/failedBuild.json');
      var runningBuildDir = path.join(__dirname, 'resources/runningBuild.json');
      var successfullBuildDir = path.join(__dirname, 'resources/successfullBuild.json');

      failedBuild = JSON.parse(fs.readFileSync(failedBuildDir, 'utf8'));
      runningBuild = JSON.parse(fs.readFileSync(runningBuildDir, 'utf8'));
      successfullBuild = JSON.parse(fs.readFileSync(successfullBuildDir, 'utf8'));
    });

    it('should update widget on failed build', function() {
      var name = 'Build';
      var id = 'MyBuild';
      var widget = getTestWidget(name, id);
      TeamCityPlugin.updateWidget(failedBuild, widget);
      assert(widget.status === 'Failed');
      assert(widget.percent === '');
    });

    it('should update buildBlock on successfull build', function() {
      var name = 'Build';
      var id = 'MyBuild';
      var widget = getTestWidget(name, id);
      TeamCityPlugin.updateWidget(successfullBuild, widget);
      assert(widget.status === 'Success');
      assert(widget.percent === '');
    });

    it('should update buildBlock on running build', function() {
      var name = 'Build';
      var id = 'MyBuild';
      var widget = getTestWidget(name, id);
      TeamCityPlugin.updateWidget(runningBuild, widget);
      assert(widget.status === 'In progress');
      assert(widget.percent === '(13%)');
    });

    it('should set started and duration on build', function() {
      var name = 'Build';
      var id = 'MyBuild';
      var widget = getTestWidget(name, id);
      TeamCityPlugin.updateWidget(failedBuild, widget);
      var expectedDuration = '5 min 19 s';
      var expectedStarted = '13-Oct 15:45:51';
      assert(widget.duration === expectedDuration);
      assert(widget.started === expectedStarted);
    });
  });

  describe('getDateString', function() {

    before(function() {
      var successfullBuildDir = path.join(__dirname, 'resources/successfullBuild.json');
      successfullBuild = JSON.parse(fs.readFileSync(successfullBuildDir, 'utf8'));
    });

    it('should return correct datestring', function() {
      var timestamp = successfullBuild.startDate;
      var dateString = TeamCityPlugin.getDateString(timestamp);
      var expectedDatestring = '13-Oct 12:00:11';
      assert(dateString === expectedDatestring);
    });
  });

  describe('getDurationString', function() {

    before(function() {
      var successfullBuildDir = path.join(__dirname, 'resources/successfullBuild.json');
      var runningBuildDir = path.join(__dirname, 'resources/runningBuild.json');
      runningBuild = JSON.parse(fs.readFileSync(runningBuildDir, 'utf8'));
      successfullBuild = JSON.parse(fs.readFileSync(successfullBuildDir, 'utf8'));
    });

    it('should return correct duration string for running builds', function() {
      var expectedDurationString = '1 min 16 s';
      var durationString = TeamCityPlugin.getDurationString(runningBuild);
      assert(durationString === expectedDurationString);
    });

    it('should return correct duration string for successfull builds', function() {
      var expectedDurationString = '28 min 8 s';
      var durationString = TeamCityPlugin.getDurationString(successfullBuild);
      assert(durationString === expectedDurationString);
    });
  });

});
