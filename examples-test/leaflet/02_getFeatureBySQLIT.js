var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_02_getFeatureBySQL': function (browser) {
        var type = 'leaflet';
        var exampleName = '02_getFeatureBySQL';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane canvas', 10000);
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        browser.pause(1000);
        browser.end();
    }
};



