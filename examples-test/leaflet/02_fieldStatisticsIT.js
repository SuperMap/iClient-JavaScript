var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_02_fieldStatistics': function (browser) {
        var type = 'leaflet';
        var exampleName = '02_fieldStatistics';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check element exist*/
        browser.waitForElementPresent('.resultInfo.leaflet-control', 10000);
        browser.waitForElementPresent('#trafficRes', 10000);
        browser.waitForElementPresent('.table.table-bordered tbody tr td', 10000);
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        browser.pause(1000);
        browser.end();
    }
};
