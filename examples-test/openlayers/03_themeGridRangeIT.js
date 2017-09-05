var commonTools = require('../base/commonTools');
module.exports = {
    'openlayers_03_themeGridRange': function (browser) {
        var type = 'openlayers';
        var exampleName = '03_themeGridRange';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        browser.pause(2000);
        commonTools.cmpTestTileWithStdTile(browser, type, exampleName, -20, 180, 128, 128);
        browser.end();
    }
};