var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_02_fieldsService': function (browser) {
        var type = 'leaflet';
        var exampleName = '02_fieldsService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check element exist*/
        browser.expect.element('.leaflet-popup-content').to.be.present.before(10000);
        /*check the info showing in leaflet-popup is equal to our expectation*/
        var fieldsInfo = 'SmID,\ SmSdriW,\ SmSdriN,\ SmSdriE,\ SmSdriS,\ SmUserID,\ SmGeometrySize';
        browser.expect.element('.leaflet-popup-content').text.to.equal(fieldsInfo);
        browser.pause(1000);
        browser.click('.leaflet-popup-close-button', function () {
            browser.pause(1000);
            browser.expect.element('.leaflet-popup-content').to.not.be.present.before(10000);
        });
        browser.pause(1000);
        browser.end();
    }
};
