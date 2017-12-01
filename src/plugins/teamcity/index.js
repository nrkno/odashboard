var moment = require('moment');

var TeamCityPlugin = (function () {

  var module = {};

  module.createTeamCityWidget = function (config) {
    return {
      plugin: 'teamcity',
      datasourceId: config.datasourceId,
      name: config.name,
      id: config.id,
      url: config.url,
      width: config.width,
      height: config.height,
      started: '',
      duration: '0 s',
      percent: '',
      status: 'Pending',
      'class': 'inProgress'
    };
  };
  
  module.updateWidget = function(build, widget) {
    if (build.state == 'running') {
      widget.status = 'In progress';
      widget.class = 'inProgress';
      widget.percent = '(' + build['running-info'].percentageComplete + '%)';
    } else {
      widget.percent = '';

      if (build.status == 'FAILURE') {
        widget.status = 'Failed';
        widget.class = 'failed';
      } else if (build.status == 'UNKNOWN' && build.statusText == 'Canceled'){
        widget.status = 'Canceled';
        widget.class = 'failed';
      } else {
        widget.status = 'Success';
        widget.class = 'success';        
      }
    }

    widget.started = this.getDateString(build.startDate);
    widget.duration = this.getDurationString(build);
  };

  module.getDurationString = function(build) {
    var duration;

    if (build.state == 'running') {
      duration = moment.duration(build['running-info'].elapsedSeconds, 'seconds');
    } else {
      var start = moment(build.startDate, 'YYYYMMDDTHHmmss');
      var end = moment(build.finishDate, 'YYYYMMDDTHHmmss');
      duration = moment.duration(end.diff(start));
    }

    var hours = duration.hours();
    var minutes = duration.minutes();
    var seconds = duration.seconds();

    if (hours > 0) {
      return hours + 'h ' + minutes + ' min ' + seconds + ' s';
    } else {
      return minutes + ' min ' + seconds + ' s';
    }
  };

  module.getDateString = function (timestamp) {
    var date = moment(timestamp, 'YYYYMMDDTHHmmss');
    if (date)
      return date.format('DD-MMM HH:mm:s');
    else
      return '.';
  };

  function parseMsg(msg, listenEvent, widget) {
    var data = JSON.parse(msg);
    var buildfound = false;
    _.each(data.builds, function (build) {
      if (build.buildTypeId == widget.id) {
        module.updateWidget(build, widget);
        buildfound = true;
      }
    });

    if (buildfound === false) {
      //console.log("Build " + widget.id + " not found in datasource");
    }
  }

  function setupListener(widget, socket) {
    var listenEvent = widget.plugin + '.' + widget.datasourceId;
    console.log('listening for ' + listenEvent);
    socket.on(listenEvent, function (msg) {
      parseMsg(msg, listenEvent, widget);
    });
  }

  module.createWidget = function (config, socket) {
    var widget = this.createTeamCityWidget(config);
    setupListener(widget, socket);
    return widget;
  };

  return module;

}());

module.exports = TeamCityPlugin;
