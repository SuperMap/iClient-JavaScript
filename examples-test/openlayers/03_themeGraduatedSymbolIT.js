var commonTools = require('../base/commonTools');
module.exports = {
    'openlayers_03_themeGraduatedSymbol': function (browser) {
        // browser.windowMaximize();
        browser.resizeWindow(1200, 800);
        var type = 'openlayers';
        var exampleName = '03_themeGraduatedSymbol';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        //运行一次得到基准图片
        // commonTools.getStdTile(browser, type, exampleName, 0, 0, 256, 256);
        //测试过程中截取地图瓦片, 和已有的标准瓦片进行对比
        commonTools.cmpTestTileWithStdTile(browser, type, exampleName, 0, 0, 256, 256);
        browser.end();
    }
};