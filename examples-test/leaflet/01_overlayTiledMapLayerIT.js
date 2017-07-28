var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_01_overlayTiledMapLayer': function (browser) {
        var type = 'leaflet';
        var exampleName = '01_overlayTiledMapLayer';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        commonTools.cmpTestTileWithStdTile(browser, type, exampleName, 200, 256, 300, 300);
        browser.end();
    }
};

