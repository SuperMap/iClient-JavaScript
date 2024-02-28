var commonTools = require('../base/commonTools');
module.exports = {
    after:function(browser){
        console.log('Closing down...');
        browser.end();
      },
    'leaflet_02_getFeatureByBounds': function (browser) {
        var type = 'leaflet';
        var exampleName = '02_getFeatureByBounds';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane canvas', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane img', 10000);
        /*choose a feature to click*/
        browser.click('.leaflet-marker-icon');
        /*expect leaflet-popup exist and the content is equal to our expection*/
        browser.waitForElementPresent('.leaflet-popup-content', 10000);
        var featureInfo = '首都';
        browser.expect.element('.leaflet-popup-content').text.to.be.contain(featureInfo);
        browser.click('.leaflet-popup-close-button', function () {
            browser.waitForElementNotPresent('.leaflet-popup-content', 10000);
        });
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        // browser.pause(1000);
        // browser.end();
    }
};



