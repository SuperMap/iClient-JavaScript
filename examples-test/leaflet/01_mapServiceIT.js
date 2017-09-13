var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_01_mapService': function (browser) {
        var type = 'leaflet';
        var exampleName = '01_mapService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check element exist*/
        browser.waitForElementPresent('.leaflet-popup-content', 10000);
        /*check the info showing in leaflet-popup is equal to our expectation*/
        var mapInfo = '(map信息太多，只打印一部分)\n\n地图名："World"\n中心点:{ "x": 0, "y": 0 }\nBounds:{\ "top":\ 90,\ "left":\ -180,\ "bottom":\ -90,\ "leftBottom":\ {\ "x":\ -180,\ "y":\ -90\ },\ "right":\ 180,\ "rightTop":\ {\ "x":\ 180,\ "y":\ 90\ }\ }';
        browser.expect.element('.leaflet-popup-content').text.to.equal(mapInfo);
        browser.pause(1000);
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
