var commonTools = require('../base/commonTools');
module.exports = {
    'openlayers_01_tiledMapLayerOverlapped': function (browser) {
        var type = 'openlayers';
        var exampleName = '01_tiledMapLayerOverlapped';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        commonTools.cmpTestTileWithStdTile(browser, type, exampleName, -50, 180, 256, 256);
        browser.end();
    }
};