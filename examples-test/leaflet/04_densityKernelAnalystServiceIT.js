var commonTools = require('../base/commonTools');
var request = require('request');
require('../base/ExampleTestGlobeParameter');
// 核密度分析
module.exports = {
  '@disabled': true,
  after: function (browser) {
    //删除测试中产生的数据集
    browser.pause(1000, function () {
      var exampleTestResult = 'KernelDensity_Result';
      request.delete(GlobeParameter.datachangchunURL + exampleTestResult);
    });
    browser.end();
  },
  leaflet_04_densityKernelAnalystService: function (browser) {
    var type = 'leaflet';
    var exampleName = '04_densityKernelAnalystService';
    commonTools.openExampleAndLoadMap(browser, type, exampleName);
    /*check elements exist*/
    browser.waitForElementPresent('.leaflet-pane.leaflet-map-pane', 10000);
    browser.waitForElementPresent('.leaflet-pane.leaflet-tile-pane', 10000);
    browser.waitForElementPresent('.leaflet-layer', 10000);
    // browser.pause(10000);
    browser.waitForElementPresent('.leaflet-layer:nth-child(2)', 10000);
    browser.elements('css selector', '.leaflet-layer', function (result) {
      browser.assert.equal(
        result.value.length,
        2,
        'expect Number of leaflet-layer to be 2, actual is ' + result.value.length
      );
    });
    browser.elements('css selector', '.leaflet-tile-container', function (result) {
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
