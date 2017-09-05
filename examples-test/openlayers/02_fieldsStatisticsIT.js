var commonTools = require('../base/commonTools');
module.exports={
    'openlayers_02_fieldStatistics':function (browser) {
        var type = 'openlayers';
        var exampleName = '02_fieldStatistics';
        commonTools.openExampleAndLoadMap(browser,type,exampleName);
        browser.waitForElementPresent('#popup-content',10000);
        browser.waitForElementPresent('.table.table-bordered tbody tr td',10000);
        browser.pause(1000);
        browser.end();
    }
};