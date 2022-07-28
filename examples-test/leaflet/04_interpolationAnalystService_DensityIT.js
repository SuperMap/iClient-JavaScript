var commonTools = require('../base/commonTools');
var request = require('request');
require('../base/ExampleTestGlobeParameter');

module.exports = {
  '@disabled': true,
  after: function (browser) {
    //删除测试中产生的数据集
    browser.pause(1000, function () {
      var exampleTestResult = 'Density_Result';
      request.delete(GlobeParameter.dataspatialAnalystURL + exampleTestResult);
    });
    browser.end();
  },

  leaflet_04_interpolationAnalystService_Density: function (browser) {
    var type = 'leaflet';
    var exampleName = '04_interpolationAnalystService_Density';
    commonTools.openExampleAndLoadMap(browser, type, exampleName);
    /*check elements exist*/
    browser.waitForElementPresent('.leaflet-pane.leaflet-map-pane', 10000);
    browser.waitForElementPresent('.leaflet-pane.leaflet-tile-pane', 10000);
    browser.waitForElementPresent('.leaflet-layer', 10000);
    browser.pause(20000);
    browser.elements('css selector', '.leaflet-layer', function (result) {
      if (result.value.length < 2) {
        browser.pause(10000);
        browser.elements('css selector', '.leaflet-layer', function (result) {
          browser.assert.equal(
            result.value.length,
            2,
            'expect Number of leaflet-layer to be 2, actual is ' + result.value.length
          );
        });
        browser.assert.equal(
          result.value.length,
          2,
          'expect Number of leaflet-layer to be 2, actual is ' + result.value.length
        );
      }
    });
    browser.elements('css selector', '.leaflet-tile-container', function (result) {
      if (result.value.length < 2) {
        browser.pause(10000);
        browser.elements('css selector', '.leaflet-layer', function (result) {
          browser.assert.equal(
            result.value.length,
            2,
            'expect Number of leaflet-tile-container to be 2, actual is ' + result.value.length
          );
        });
        browser.assert.equal(
          result.value.length,
          2,
          'expect Number of leaflet-tile-container to be 2, actual is ' + result.value.length
        );
      }

      browser.assert.equal(
        result.value.length,
        2,
        'expect Number of leaflet-tile-container to be 2, actual is ' + result.value.length
      );
    });
    //测试版权点击的正确性
    //commonTools.verifyCopyrightOfLeaflet(browser);
  }
};
