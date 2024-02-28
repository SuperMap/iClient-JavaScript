var commonTools = require('../base/commonTools');
module.exports = {
    after: function(browser){
        browser.end();
    },
    'openlayers_01_tiledMapLayer4326': function (browser) {
        // browser.windowMaximize();
        browser.resizeWindow(1200, 800);
        var type = 'openlayers';
        var exampleName = '01_tiledMapLayer4326';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        //测试过程中截取地图瓦片, 和已有的标准瓦片进行对比
        //运行一次得到基准图片
        commonTools.getStdTile(browser, type, exampleName, 0, 0, 256, 256);
        commonTools.cmpTestTileWithStdTile(browser, type, exampleName, 0, 0, 256, 256);
        // browser.end();
    }
};