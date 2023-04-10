var commonTools = require('../base/commonTools');
module.exports = {
    after:function(browser){
        console.log('Closing down...');
        browser.end();
      },
    'leaflet_02_fieldsService': function (browser) {
        var type = 'leaflet';
        var exampleName = '02_fieldsService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check element exist*/
        browser.waitForElementPresent('.leaflet-popup-content', 10000);
        /*check the info showing in leaflet-popup is equal to our expectation*/
        // 线上站点
        // var fieldsInfo = 'SmID,\ SmSdriW,\ SmSdriN,\ SmSdriE,\ SmSdriS,\ SmUserID,\ SmGeometrySize';
        var fieldsInfo = 'SmID';
        browser.expect.element('.leaflet-popup-content').text.to.contain(fieldsInfo);
        browser.click('.leaflet-popup-close-button', function () {
            browser.waitForElementNotPresent('.leaflet-popup-content', 10000);
        });
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        // browser.pause(1000);
        // browser.end();
    }
};
