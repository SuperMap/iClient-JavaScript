var commonTools = require('../base/commonTools');
module.exports = {
  after: function (browser) {
    console.log('Closing down...');
    browser.end();
  },
  leaflet_03_themeRange: async function (browser) {
    var type = 'leaflet';
    var exampleName = '03_themeRange';
    commonTools.openExampleAndLoadMap(browser, type, exampleName);
    /*check elements exist*/
    browser.waitForElementPresent('.leaflet-pane.leaflet-map-pane', 10000);
    browser.waitForElementPresent('.leaflet-pane.leaflet-tile-pane', 10000);
    browser.waitForElementPresent('.leaflet-layer', 10000);
    browser.pause(1000);
    var result = await browser.elements('css selector', '.leaflet-layer');
    console.log('----Hope number of leaflet-layer to be 2, actual is', result.length);
    for (i = 0; i < 2; i++) {
      if (result.length > 1) {
        break;
      } else {
        console.log('refresh:', i);
        browser.refresh();
        browser.waitForElementPresent('body', 5000);
        browser.waitForElementPresent('#map', 5000);
        browser.waitForElementPresent('.leaflet-layer', 10000);
        browser.pause(10000);
        var result = await browser.elements('css selector', '.leaflet-layer');
        console.log('----Hope number of leaflet-layer to be 2, actual is', result.length);
      }
    }
    browser.elements('css selector', '.leaflet-tile-container', function (result) {
      console.log('----Hope number of leaflet-tile-container to be 2, actual is ' + result.value.length);
    });
    browser.expect.element('.leaflet-layer:nth-child(2)').to.be.visible.before(10000);
    browser.expect
      .element('.leaflet-pane .leaflet-layer:nth-child(2) .leaflet-tile-container')
      .to.be.visible.before(10000);
    //测试版权点击的正确性
    //commonTools.verifyCopyrightOfLeaflet(browser);
    // browser.pause(1000);
    // browser.end();
  }
};
