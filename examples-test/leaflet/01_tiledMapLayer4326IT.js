var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_01_tiledMapLayer4326': function (browser) {
        var type = 'leaflet';
        var exampleName = '01_tiledMapLayer4326';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        commonTools.cmpTestTileWithStdTile(browser, type, exampleName, 256, 256, 256, 256);
        browser.end();
    }
};
