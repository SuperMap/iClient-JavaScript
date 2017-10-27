var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_iPortalWebmap': function (browser) {
        var type = 'leaflet';
        var exampleName = 'iPortalWebmap';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-layer', 10000);
        browser.waitForElementPresent('.leaflet-tile-container.leaflet-zoom-animated', 10000);
        browser.waitForElementPresent('.leaflet-tile-container.leaflet-zoom-animated img', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-marker-pane img', 10000);
        browser.pause(1000);
        browser.elements('class name', 'leaflet-layer', function (result) {
            this.assert.equal(result.value.length, 2, "expect Number of leaflet-layer to be 2, actual is " + result.value.length);
        });
        browser.elements('class name', 'leaflet-tile-container', function (result) {
            this.assert.equal(result.value.length, 2, "expect Number of leaflet-tile-container to be 2, actual is " + result.value.length);
        });
        browser.elements('class name', 'leaflet-marker-icon', function (result) {
            this.assert.ok(result.value.length > 0, "expect Number of marker to be greater than 0, actual is " + result.value.length);
        });
        browser.useXpath().click('//*[@id="map"]/div[1]/div[4]/img[22]', function () {
            this.waitForElementPresent('//*[@id="map"]/div[1]/div[6]/div/div[1]/div', 10000);
            var popupInfo = '届';
            browser.expect.element('//*[@id="map"]/div[1]/div[6]/div/div[1]/div').text.to.be.contain(popupInfo);
        });
        ////验证版权跳转正确性
        ////iClient logo
        //browser.useXpath().click('//*[@id="map"]/div[2]/div[4]/div[1]/a');
        //browser.pause(1000);
        //browser.windowHandles(function (result) {
        //    browser.switchWindow(result.value[1]);
        //    browser.assert.urlEquals('http://iclient.supermap.io/');
        //    browser.closeWindow();
        //    browser.switchWindow(result.value[0]);
        //    browser.pause(1000);
        //});
        ////天地图
        //browser.useXpath().click('//*[@id="map"]/div[2]/div[4]/div[2]/a[2]');
        //browser.pause(1000);
        //browser.windowHandles(function (result) {
        //    browser.switchWindow(result.value[1]);
        //    browser.assert.urlEquals('http://www.tianditu.com/');
        //    browser.closeWindow();
        //    browser.switchWindow(result.value[0]);
        //    browser.pause(1000);
        //});
        ////SuperMap iClient
        //browser.useXpath().click('//*[@id="map"]/div[2]/div[4]/div[2]/span/a');
        //browser.pause(1000);
        //browser.windowHandles(function (result) {
        //    browser.switchWindow(result.value[1]);
        //    browser.assert.urlEquals('http://iclient.supermap.io/');
        //    browser.closeWindow();
        //});
        browser.pause(1000);
        browser.end();
    }
};