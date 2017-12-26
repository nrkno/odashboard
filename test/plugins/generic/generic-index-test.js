var assert = require('assert');
var Chart = require('chart.js');
var GenericPlugin = require('../../../src/plugins/generic/index');

describe('Generic Plugin', function() {
  
  describe('createWidgetInstance', function() {
    
    it('should return valid string widget', function() {
      var config = {
        plugin: 'generic',
        widgetType: 'string',
        datasourceId: 'MyDatasource',
        displayName: 'Something',
        fieldName: 'foo'
      };
      
      var widget = GenericPlugin.createWidgetInstance(config);
      assert(widget.widgetType === 'string');
      assert(widget.plugin === 'generic');
      assert(widget.datasourceId === config.datasourceId);
      assert(widget.fieldName === config.fieldName);
      assert(widget.update !== undefined);
    });

    it('should return valid number widget', function() {
      var config = {
        plugin: 'generic',
        widgetType: 'number',
        datasourceId: 'MyDatasource',
        displayName: 'Something',
        fieldName: 'foo'
      };
      
      var widget = GenericPlugin.createWidgetInstance(config);
      assert(widget.widgetType === 'number');
      assert(widget.plugin === 'generic');
      assert(widget.datasourceId === config.datasourceId);
      assert(widget.fieldName === config.fieldName);
      assert(widget.update !== undefined);
    });
    
    it('should return valid checkmark widget', function() {
      var config = {
        plugin: 'generic',
        widgetType: 'checkmark',
        datasourceId: 'MyDatasource',
        displayName: 'Something',
        fieldName: 'foo'
      };
      
      var widget = GenericPlugin.createWidgetInstance(config);
      assert(widget.widgetType === 'checkmark');
      assert(widget.plugin === 'generic');
      assert(widget.datasourceId === config.datasourceId);
      assert(widget.fieldName === config.fieldName);
      assert(widget.update !== undefined);
    });

    it('should return valid timestamp widget', function() {
      var config = {
        plugin: 'generic',
        widgetType: 'timestamp',
        datasourceId: 'MyDatasource',
        displayName: 'Something',
        fieldName: 'foo'
      };
      
      var widget = GenericPlugin.createWidgetInstance(config);
      assert(widget.widgetType === 'timestamp');
      assert(widget.plugin === 'generic');
      assert(widget.datasourceId === config.datasourceId);
      assert(widget.fieldName === config.fieldName);
      assert(widget.update !== undefined);
    });   

    it('should return valid queue widget', function() {
      var config = {
        plugin: 'generic',
        widgetType: 'queue',
        datasourceId: 'MyDatasource',
        displayName: 'Something',
        fieldName: 'foo'
      };
      
      var widget = GenericPlugin.createWidgetInstance(config);
      assert(widget.widgetType === 'queue');
      assert(widget.plugin === 'generic');
      assert(widget.datasourceId === config.datasourceId);
      assert(widget.fieldName === config.fieldName);
      assert(widget.update !== undefined);
    });

    it('should return valid piechart widget', function() {
      var config = {
        plugin: 'generic',
        widgetType: 'piechart',
        datasourceId: 'myChartDatasource',
        width: '320px',
        height: '320px',
        options: {
          displayName: 'Animal Frequency',
          valueField: 'info history animalFrequency',
          labelField: 'info history animalNames'
        }
      };
      
      var widget = GenericPlugin.createWidgetInstance(config, undefined);
      assert(widget.widgetType === 'piechart');
      assert(widget.plugin === 'generic');
      assert(widget.datasourceId === config.datasourceId);
      assert(widget.valueField === config.options.valueField);
      assert(widget.labelField === config.options.labelField);
      assert(widget.update !== undefined);
    });

    it('should return valid linechart widget', function() {
      var config = {
        plugin: 'generic',
        widgetType: 'linechart',
        datasourceId: 'myChartDatasource',
        width: '320px',
        height: '320px',
        fieldName: 'info history animalFrequency',
        options: {
          displayName: 'Animal Frequency',
          labelField: 'info history animalNames'
        }
      };
      
      var widget = GenericPlugin.createWidgetInstance(config, Chart);
      assert(widget.widgetType === 'linechart');
      assert(widget.plugin === 'generic');
      assert(widget.datasourceId === config.datasourceId);
      assert(widget.fieldName === config.fieldName);
      assert(widget.update !== undefined);      
    });

    it('should create string widget given unknown widgetType', function() {
      var config = {
        plugin: 'generic',
        widgetType: 'unknown',
        datasourceId: 'MyDatasource',
        displayName: 'Something',
        fieldName: 'foo'
      };
      var widget = GenericPlugin.createWidgetInstance(config);
      assert(widget.widgetType === 'string');
    });
  });

  describe('parseMsg', function() {
    

    var TestWidget = function(config) {
      var widget = {
        fieldName: config.fieldName,
        value: 0,
        timestamp: ''
      };
        
      widget.update = function(value) {
        widget.value = value;
      };

      widget.transform = function(obj) { return obj; };      
    
      return widget;
    };

    it('should update widget with value from fieldName', function() {
      var config = {
        fieldName: 'a nested fieldname'
      };
      var w = new TestWidget(config);

      var msg = {
        a: {
          nested: {
            fieldname: 10
          }
        }
      };

      GenericPlugin.parseMsg(JSON.stringify(msg), w);
      assert(w.value === 10);
    });
  });
});

