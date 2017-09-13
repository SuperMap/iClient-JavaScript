var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_06_trafficTransferAnalystService': function (browser) {
        var type = 'leaflet';
        var exampleName = '06_trafficTransferAnalystService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*判断初始marker*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane img', 10000);
        browser.pause(1000);
        browser.elements('class name', 'leaflet-marker-icon', function (result) {
            browser.assert.equal(result.value.length, 2, "expect Number of initial marker to be 2, actual is " + result.value.length);
        });
        /*判断初始popup*/
        browser.elements('class name', 'leaflet-tooltip-top', function (result) {
            browser.assert.equal(result.value.length, 2, "expect Number of initial tooltip to be 2, actual is " + result.value.length);
        });
        /*判断初始path*/
        browser.waitForElementPresent('.leaflet-tooltip.leaflet-zoom-animated.leaflet-tooltip-top', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-overlay-pane svg g path', 10000);
        browser.elements('tag name', 'path', function (result) {
            browser.assert.equal(result.value.length, 1, "expect Number of trafficTransferAnalystService initial path to be 1, actual is " + result.value.length);
        });
        /*判断初始交互控件*/
        browser.waitForElementPresent('.panel.panel-primary.leaflet-control', 10000);
        /*单击'9路'，判断path是否有变化*/
        browser.useXpath().click('//*[@id="trafficRes"]/tr[2]/td[2]/a[1]', function () {
            browser.pause(1500);
            browser.elements('tag name', 'path', function (result) {
                browser.assert.equal(result.value.length, 2, "expect Number of trafficTransferAnalystService path after click '9路' to be 2, actual is " + result.value.length);
            });
        });
        browser.pause(1000);
        /*选择方案2中的'抚松路'，判断marker是否有变化*/
        browser.useXpath().click('//*[@id="transferSolution-1"]');
        browser.pause(1500);
        browser.useXpath().click('//*[@id="trafficRes"]/tr[3]/td[2]/a[2]', function () {
            browser.pause(1500);
            browser.elements('class name', 'leaflet-marker-icon', function (result) {
                browser.assert.equal(result.value.length, 3, "expect Number of marker after click '抚松路' in '方案2' to be 3, actual is " + result.value.length);
            });
        });
        browser.pause(1000);
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        browser.pause(1000);
        browser.end();
    }
};