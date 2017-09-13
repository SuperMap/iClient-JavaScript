var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_01_measure_area': function (browser) {
        var type = 'leaflet';
        var exampleName = '01_measure_area';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check element exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane canvas', 10000);
        browser.waitForElementPresent('.leaflet-popup-content', 10000);
        /*check the info showing in leaflet-popup is equal to our expectation*/
        var areaInfo = '面积：\ 3323393352194.927\ 平方米';
        browser.expect.element('.leaflet-popup-content').text.to.equal(areaInfo);
        browser.click('.leaflet-popup-close-button', function () {
            browser.pause(1000);
            browser.waitForElementNotPresent('.leaflet-popup-content', 10000);
        });
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        browser.pause(1000);
        browser.end();
    }
};
