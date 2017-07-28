var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_01_layerService': function (browser) {
        var type = 'leaflet';
        var exampleName = '01_layerService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check element exist*/
        browser.expect.element('.leaflet-popup-content').to.be.present.before(3000);
        /*check the info showing in leaflet-popup is equal to our expectation*/
        var layerInfo = 'continent_T@World\nOcean_Label_1@World\nCapitals@World#3\nCapitals@World#2\nCapitals@World#1\nCountries@World#1\nChina_Boundary_nanhai@World\nChina_Boundary_1@World\nCountry_Label@World\nRivers@World\nChina_island_part@World\nLakes@World\nCountries@World#2\nCountries@World\nOceanL@World\ngl_latlong_1km_landcover@World';
        browser.expect.element('.leaflet-popup-content').text.to.equal(layerInfo);
        browser.pause(1000);
        browser.click('.leaflet-popup-close-button', function () {
            browser.expect.element('.leaflet-popup-content').to.not.be.present.before(2000);
        });
        browser.pause(1000);
        browser.end();
    }
};
