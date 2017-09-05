var commonTools = require('../base/commonTools');
module.exports = {
    'openlayers_03_themeGridUnique': function (browser) {
        var type = 'openlayers';
        var exampleName = '03_themeGridUnique';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        browser.pause(20000);
        commonTools.cmpTestTileWithStdTile(browser, type, exampleName, -20, 240, 128, 128);
        browser.end();
    }
};