var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_01_overlayTiledMapLayer': function (browser) {
        var type = 'leaflet';
        var exampleName = '01_overlayTiledMapLayer';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        //commonTools.getStdTile(browser, type, exampleName, 256, 256);
        commonTools.cmpTestTileWithStdTile(browser, type, exampleName, 256, 256);
        browser.end();
    }
};

