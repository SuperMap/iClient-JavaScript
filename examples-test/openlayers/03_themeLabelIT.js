var commonTools = require('../base/commonTools');
module.exports = {
    'openlayers_03_themeLabel':function (browser) {
        var type = 'openlayers';
        var exampleName = '03_themeLabel';
        commonTools.openExampleAndLoadMap(browser,type,exampleName);
        browser.pause(1000);
        commonTools.cmpTestTileWithStdTile(browser,type,exampleName,0,150,128,128);
        browser.end();
    }
};