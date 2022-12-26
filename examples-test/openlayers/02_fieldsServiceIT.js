var commonTools = require('../base/commonTools');
module.exports={
    after: function(browser){
        browser.end();
    },
    'openlayers_02_fieldsService':function (browser) {
        var type = 'openlayers';
        var exampleName = '02_fieldsService';
        commonTools.openExampleAndLoadMap(browser,type,exampleName);
        browser.waitForElementPresent('#popup-content',10000);
        // var fieldsInfo='SmID, SmSdriW, SmSdriN, SmSdriE, SmSdriS, SmUserID, SmGeometrySize';
        var fieldsInfo='SmID'
        browser.expect.element('#popup-content').text.to.contain(fieldsInfo);
        // browser.pause(1000);
        // browser.end();
    }
};