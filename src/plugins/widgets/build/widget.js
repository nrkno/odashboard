var moment = require('moment');

var BuildWidget = function(config) {

  var widget = {
    plugin: 'generic',
    widgetType: 'build',
    datasourceId: config.datasourceId,
    name: config.name,
    id: config.id,
    displayStyle: getDisplayStyle(config),
    url: config.url,
    width: getWidth(config),
    height: config.height,
    started: '',
    duration: '0 s',
    percent: '',
    status: '...',
    'class': 'inProgress' 
  };

  function getDisplayStyle(config) {
    if (config.options && config.options.displayStyle !== undefined) {
      return config.options.displayStyle;
    } else {
      return 'standard';
    }
  }

  function getWidth(config) {
    if (config.options && config.options.displayStyle === 'small') {
      return '10%';
    } else {
      return config.width;
    }
  }

  widget.update = function(data) {
    _.each(data.builds, function (build) {
      if (build.buildTypeId == widget.id) {
        if (widget.displayStyle === 'small') {
          updateSmallWidget(build);
        } else {
          updateBuildWidget(build);
        }
      }
    });
  };

  function updateSmallWidget(build) {
    if (build.state == 'running') {
      widget.status = '...';
      widget.class = 'inProgress';
      widget.percent = '(' + build.percent + '%)';
    } else {
      widget.percent = '';
      if (build.state == 'failed') {
        widget.status = ':(';
        widget.class = 'failed';        
      } else if (build.status == 'canceled') {
        widget.status = ':|';
        widget.class = 'failed';
      } else {
        widget.status = ':)';
        widget.class = 'success';         
      }
    }

    widget.started = getDateString(build.startDate, true);
    widget.duration = getDurationString(build.duration, true);
  }

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

  function getDurationString(durationString, short) {
    var duration = moment.duration(durationString);
    var hours = duration.hours();
    var minutes = duration.minutes();
    var seconds = duration.seconds();
    
    if (hours > 0 && short) {
      return hours + 'h ' + minutes + 'm ' + seconds + 's';
    } else if (short) {
      return minutes + 'm ' + seconds + 's';
    } else if (hours > 0) {
      return hours + 'h ' + minutes + ' min ' + seconds + ' s';
    } else {
      return minutes + ' min ' + seconds + ' s';
    }
  }

  function getDateString(timestamp, short) {
    var date = moment(timestamp, 'YYYYMMDDTHHmmss');
    if (date && short)
      return date.format('HH:mm');
    else if (date)
      return date.format('DD-MMM HH:mm');
    else 
      return '.';
  }

  return widget;
};

module.exports = BuildWidget;