var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_addressMatchService': function (browser) {
        var type = 'leaflet';
        var exampleName = 'addressMatchService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*判断初始交互控件*/
        browser.waitForElementPresent('.panel-body', 10000);
        /*在正向匹配服务中输入值，并判断结果*/
        browser.setValue('#address', '公司');
        browser.setValue('#filters', '北京');
        browser.setValue('#fromIndex', 0);
        browser.setValue('#toIndex', 10);
        browser.setValue('#maxReturn', -1);
        browser.setValue('#prjCoordSys', '{epsgcode:4326}');
        browser.pause(1000);
        browser.click('#codeBtn', function () {
            browser.pause(2000);
            browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane', 10000);
            browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane img', 10000);
            browser.elements('class name', 'leaflet-marker-icon', function (result) {
                browser.assert.equal(result.value.length, 10, "expect query result of '正向匹配' to be 10, actual is " + result.value.length);
            });
            browser.pause(1000);
            browser.click('.leaflet-marker-icon', function () {
                browser.pause(1000);
                browser.waitForElementPresent('.leaflet-popup.leaflet-zoom-animated', 10000);
                browser.expect.element('.leaflet-popup-content').text.to.contain('地址');
                browser.expect.element('.leaflet-popup-content').text.to.contain('坐标');
                browser.expect.element('.leaflet-popup-content').text.to.contain('匹配度');
                browser.expect.element('.leaflet-popup-content').text.to.contain('过滤字段');
            })
        });
        browser.pause(1000);
        /*在反向匹配服务中输入值，并判断结果*/
        browser.refresh();
        browser.click('#geodecode');
        browser.pause(1000);
        browser.setValue('#xCoord', '116.3518541194752');
        browser.setValue('#yCoord', '40.00097839595237');
        browser.setValue('#filters2', '北京市');
        browser.setValue('#fromIndex2', 0);
        browser.setValue('#toIndex2', 1);
        browser.setValue('#maxReturn2', -1);
        browser.setValue('#geoDecodingRadius', -1);
        browser.setValue('#prjCoordSys2', '{epsgcode:4326}');
        browser.pause(1000);
        browser.click('#decodeBtn', function () {
            browser.pause(2000);
            browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane', 20000);
            browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane img', 20000);
            browser.elements('class name', 'leaflet-marker-icon', function (result) {
                browser.assert.equal(result.value.length, 1, "expect query result of '反向匹配' to be 1, actual is " + result.value.length);
            });
            browser.pause(1000);
            browser.click('.leaflet-marker-icon', function () {
                browser.pause(1000);
                browser.waitForElementPresent('.leaflet-popup.leaflet-zoom-animated', 20000);
                browser.expect.element('.leaflet-popup-content').text.to.contain('地址');
                browser.expect.element('.leaflet-popup-content').text.to.contain('坐标');
                browser.expect.element('.leaflet-popup-content').text.to.contain('过滤字段');
            })
        });
        //测试版权点击的正确性
        //commonTools.verifyCopyrightOfLeaflet(browser);
        browser.pause(1000);
        browser.end();
    }
};