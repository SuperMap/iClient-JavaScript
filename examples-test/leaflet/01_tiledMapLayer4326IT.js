var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_01_tiledMapLayer4326': function (browser) {
        var type = 'leaflet';
        var exampleName = '01_tiledMapLayer4326';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        //测试过程中截取地图瓦片, 和已有的标准瓦片进行对比
        commonTools.cmpTestTileWithStdTile(browser, type, exampleName, 256, 256);
        browser.end();
    }
};
