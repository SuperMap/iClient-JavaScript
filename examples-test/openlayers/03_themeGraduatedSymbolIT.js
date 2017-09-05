var commonTools = require('../base/commonTools');
module.exports = {
    'openlayers_03_themeGraduatedSymbol': function (browser) {
        var type = 'openlayers';
        var exampleName = '03_themeGraduatedSymbol';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        commonTools.cmpTestTileWithStdTile(browser, type, exampleName, -80, 140, 256, 256);
        browser.end();
    }
};