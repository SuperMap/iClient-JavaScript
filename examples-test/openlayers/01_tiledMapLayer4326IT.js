var commonTools = require('../base/commonTools');
module.exports = {
    'openlayers_01_tiledMapLayer4326': function (browser) {
        browser.windowMaximize();
        var type = 'openlayers';
        var exampleName = '01_tiledMapLayer4326';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        //测试过程中截取地图瓦片, 和已有的标准瓦片进行对比
        commonTools.cmpTestTileWithStdTile(browser, type, exampleName, 0, 0, 256, 256);
        browser.end();
    }
};