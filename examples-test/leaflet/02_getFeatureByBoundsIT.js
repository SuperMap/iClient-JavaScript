var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_02_getFeatureByBounds': function (browser) {
        var type = 'leaflet';
        var exampleName = '02_getFeatureByBounds';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.expect.element('.leaflet-pane.leaflet-marker-pane').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-marker-pane img').to.be.present.before(10000);
        browser.expect.element('.leaflet-pane.leaflet-popup-pane').to.be.present.before(10000);
        /*choose a feature to click*/
        browser.useXpath().click('//*[@id="map"]/div[1]/div[4]/img[2]');
        browser.pause(1000);
        /*expect leaflet-popup exist and the content is equal to our expection*/
        browser.expect.element('//*[@id="map"]/div[1]/div[6]/div/div[1]/div').to.be.present.before(10000);
        var featureInfo = '首都';
        browser.expect.element('//*[@id="map"]/div[1]/div[6]/div/div[1]/div').text.to.be.contain(featureInfo);
        browser.useXpath().click('//*[@id="map"]/div[1]/div[6]/div/a');
        browser.pause(1000);
        browser.end();
    }
};



