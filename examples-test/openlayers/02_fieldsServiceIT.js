var commonTools = require('../base/commonTools');
module.exports={
    'openlayers_02_fieldsService':function (browser) {
        var type = 'openlayers';
        var exampleName = '02_fieldsService';
        commonTools.openExampleAndLoadMap(browser,type,exampleName);
        browser.waitForElementPresent('#popup-content',10000);
        var fieldsInfo='SmID, SmSdriW, SmSdriN, SmSdriE, SmSdriS, SmUserID, SmGeometrySize';
        browser.expect.element('#popup-content').text.to.equal(fieldsInfo);
        browser.pause(1000);
        browser.end();
    }
};