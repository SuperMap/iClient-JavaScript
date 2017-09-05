var commonTools = require('../base/commonTools');
module.exports = {
    'openlayers_03_themeGraph': function (browser) {
        var type = 'openlayers';
        var exampleName = '03_themeGraph';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        commonTools.cmpTestTileWithStdTile(browser, type, exampleName, -50, 150, 256, 256);
        browser.end();
    }
};