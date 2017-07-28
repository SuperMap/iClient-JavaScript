var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_02_getGridCellInfos': function (browser) {
        var type = 'leaflet';
        var exampleName = '02_getGridCellInfos';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.click('#map').pause(1000);
        browser.expect.element('.leaflet-pane.leaflet-marker-pane').to.be.present.before(3000);
        browser.expect.element('.leaflet-pane.leaflet-marker-pane img').to.be.present.before(3000);
        browser.expect.element('.leaflet-popup-content').to.be.present.before(3000);
        var popupContent1 = '栅格查询结果';
        var popupContent2 = 'column';
        var popupContent3 = 'row';
        var popupContent4 = 'value';
        browser.expect.element('.leaflet-popup-content').text.to.be.contain(popupContent1);
        browser.expect.element('.leaflet-popup-content').text.to.be.contain(popupContent2);
        browser.expect.element('.leaflet-popup-content').text.to.be.contain(popupContent3);
        browser.expect.element('.leaflet-popup-content').text.to.be.contain(popupContent4);
        browser.click('.leaflet-popup-close-button', function () {
            browser.expect.element('.leaflet-popup-content').to.not.be.present.before(2000);
        });
        browser.pause(1000);
        browser.end();
    }
};



