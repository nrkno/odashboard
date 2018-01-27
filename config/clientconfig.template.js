var row1 = {
  title: 'Row1',
  widgets: [
    {
      plugin: 'generic',
      widgetType: 'number',
      datasourceId: '1',
      displayName: 'A number on a dashboard',
      fieldName: 'number'
    },
    {
      plugin: 'generic',
      widgetType: 'linechart',
      datasourceId: '1',
      width: '420px',
      height: '210px',
      fieldName: 'number',
      options: {
        chartLabel: 'Numbers',
        timeSeriesLength: 30
      }
    },
    {
      plugin: 'generic',
      widgetType: 'checkmark',
      datasourceId: 'mannen',
      displayName: 'Har mannen falt?',
      fieldName: 'falt_ned'
    }
  ]
};

var row2 = {
  title: 'Iframe',
  widgets: [{
    plugin: 'iframe',
    datasourceId: '',
    displayName: 'title',
    src: 'http://demos.littleworkshop.fr/infinitown',
    width: 600,
    height: 400
  }]
};

var row3 = {
  title: 'This',
  widgets: [
    {
      plugin: 'generic',
      datasourceId: '1',
      widgetType: 'number',
      displayName: 'A big number on a dashboard',
      fieldName: 'bigNumber'
    },
    {
      plugin: 'generic',
      datasourceId: '1',
      widgetType: 'piechart',
      width: '320px',
      height: '320px',
      options: {
        displayName: 'Animals',
        valueField: 'piechart dataset',
        labelField: 'piechart labels'
      }
    }
  ]
};

var widgetConfig = {
  title: 'Odashboard 1.0',
  tabs: [
    [row1, row2],
    [row3]
  ]
};

module.exports = widgetConfig;
