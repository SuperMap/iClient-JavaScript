var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_01_tiledMapLayer3857': function (browser) {
        var type = 'leaflet';
        var exampleName = '01_tiledMapLayer3857';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        commonTools.cmpTestTileWithStdTile(browser, type, exampleName, 256, 256, 256, 256);
        browser.end();
    }
};

