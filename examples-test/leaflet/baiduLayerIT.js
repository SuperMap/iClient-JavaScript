var commonTools = require('../base/commonTools');
module.exports = {
    after: function(browser){
        browser.end();
    },
    'leaflet_baiduLayer': function (browser) {
        browser.windowMaximize();
        var type = 'leaflet';
        var exampleName = 'baiduLayer';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        //测试过程中截取地图瓦片, 和已有的标准瓦片进行对比
        commonTools.cmpTestTileWithStdTile(browser, type, exampleName, 0, 0, 128, 128);
        ////验证版权跳转正确性
        ////iClient logo
        //browser.useXpath().click('//*[@id="map"]/div[2]/div[4]/div[1]/a');
        //browser.pause(1000);
        //browser.windowHandles(function (result) {
        //    browser.switchWindow(result.value[1]);
        //    browser.assert.urlEquals('https://iclient.supermap.io/');
        //    browser.closeWindow();
        //    browser.switchWindow(result.value[0]);
        //    browser.pause(1000);
        //});
        ////SuperMap iClient
        //browser.useXpath().click('//*[@id="map"]/div[2]/div[4]/div[2]/span/a');
        //browser.pause(1000);
        //browser.windowHandles(function (result) {
        //    browser.switchWindow(result.value[1]);
        //    browser.assert.urlEquals('https://iclient.supermap.io/');
        //    browser.closeWindow();
        //});
        // browser.pause(1000);
        // browser.end();
    }
};

