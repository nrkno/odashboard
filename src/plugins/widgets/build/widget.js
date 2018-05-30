var moment = require('moment');

var BuildWidget = function(config) {

  var widget = {
    plugin: 'generic',
    widgetType: 'build',
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

  widget.update = function(data) {
    _.each(data.builds, function (build) {
      if (build.buildTypeId == widget.id) {
        updateBuildWidget(build);
      }
    });
  };

  function updateBuildWidget(build) {
    if (build.state == 'running') {
      widget.status = 'In progress';
      widget.class = 'inProgress';
      widget.percent = '(' + build.percent + '%)';
    } else {
      widget.percent = '';
      if (build.state == 'failed') {
        widget.status = 'Failed';
        widget.class = 'failed';        
      } else if (build.status == 'canceled') {
        widget.status = 'Canceled';
        widget.class = 'failed';
      } else {
        widget.status = 'Success';
        widget.class = 'success';         
      }
    }

    widget.started = getDateString(build.startDate);
    widget.duration = getDurationString(build.duration);
  }

  function getDurationString(durationString) {
    var duration = moment.duration(durationString);
    var hours = duration.hours();
    var minutes = duration.minutes();
    var seconds = duration.seconds();
    
    if (hours > 0) {
      return hours + 'h ' + minutes + ' min ' + seconds + ' s';
    } else {
      return minutes + ' min ' + seconds + ' s';
    }
  }

  function getDateString(timestamp) {
    var date = moment(timestamp, 'YYYYMMDDTHHmmss');
    if (date)
      return date.format('DD-MMM HH:mm:s');
    else
      return '.';
  }

  return widget;
};

module.exports = BuildWidget;