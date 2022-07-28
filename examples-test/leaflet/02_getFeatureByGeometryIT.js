var commonTools = require('../base/commonTools');
module.exports = {
  after: function (browser) {
    console.log('Closing down...');
    browser.end();
  },
  leaflet_02_getFeatureByGeometry: function (browser) {
    var type = 'leaflet';
    var exampleName = '02_getFeatureByGeometry';
    commonTools.openExampleAndLoadMap(browser, type, exampleName);
    /*check elements exist*/
    browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
    browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane canvas', 10000);
    browser.waitForElementPresent('.leaflet-popup-content', 10000);
    var popupContent = '空间查询模式：INTERSECT';
    browser.expect.element('.leaflet-popup-content').text.to.be.contain(popupContent);
    browser.click('.leaflet-popup-close-button', function () {
      browser.waitForElementNotPresent('.leaflet-popup-content', 10000);
    });
    browser
      .pause(1000)
      .moveTo(null, 40, -40)
      .pause(500)
      .mouseButtonClick()
      .waitForElementPresent('.leaflet-popup-content-wrapper', 10000)
      .waitForElementPresent('.leaflet-popup-content', 10000)
      .expect.element('.leaflet-popup-content')
      .text.to.be.contain('国家：刚果（金）');
    browser.click('.leaflet-popup-close-button').waitForElementNotPresent('.leaflet-popup-content', 10000);

    // browser.moveTo(null,-40,40, function () {
    //     browser.pause(1000);
    //     browser.mouseButtonClick(function () {
    //         browser.waitForElementPresent('.leaflet-popup-content-wrapper', 10000);
    //         browser.waitForElementPresent('.leaflet-popup-content', 10000);
    //         // 线上站点
    //         // var queryInfo = "国家：安哥拉";
    //         var queryInfo = "国家：刚果（金）";
    //         browser.expect.element('.leaflet-popup-content').text.to.be.contain(queryInfo);
    //     });
    //     browser.pause(1000);
    //     browser.click('.leaflet-popup-close-button', function () {
    //         browser.waitForElementNotPresent('.leaflet-popup-content', 10000);
    //     });
    //测试版权点击的正确性
    //commonTools.verifyCopyrightOfLeaflet(browser);
    // browser.pause(1000);
    // browser.end();
    // });
  }
};
