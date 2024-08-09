var commonTools = require('../base/commonTools');
module.exports = {
  after: function (browser) {
    browser.end();
  },
  leaflet_05_findMTSPPathsService: function (browser) {
    var type = 'leaflet';
    var exampleName = '05_findMTSPPathsService';
    commonTools.openExampleAndLoadMap(browser, type, exampleName);
    /*check elements exist*/
    browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane', 10000);
    browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane img', 10000);

    browser
      .waitForElementPresent('input[value="配送目标"]')
      .click('input[value="配送目标"]')
      .pause(500)
      .click('#map')
      .pause(500);
    browser.expect.elements('.leaflet-pane.leaflet-marker-pane img').count.to.equal(5);
    browser.click('input[value="提交"]');
    browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g path', 10000);
    browser.expect.elements('path').count.to.equal(1).before(5000);
    // browser.elements('css selector', '.leaflet-marker-icon', function (result) {
    //     this.assert.equal(result.value.length, 5, "expect Number of marker to be 5, actual is " + result.value.length);
    // });
    // browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
    // browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg', 10000);
    // browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g', 10000); 
    // browser.elements('css selector', 'path', function (result) {
    //     console.log('----Hope number findMTSPPathsService result to be 2, actual is '+ result.value.length)
    // })
    //测试版权点击的正确性
    //commonTools.verifyCopyrightOfLeaflet(browser);
    // browser.pause(1000);
    // browser.end();
  }
};
