var commonTools = require("../base/commonTools");
module.exports = {
    'openlayers_01_layerService': function (browser) {
        var type = 'openlayers';
        var exampleName = '01_layerService';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        browser.waitForElementPresent('#popup-content',10000);
        var layerInfo = 'continent_T@World\nOcean_Label_1@World\nCapitals@World#3\nCapitals@World#2\nCapitals@World#1\nCountries@World#1\nChina_Boundary_nanhai@World\nChina_Boundary_1@World\nCountry_Label@World\nRivers@World\nChina_island_part@World\nLakes@World\nCountries@World#2\nCountries@World\nOceanL@World\ngl_latlong_1km_landcover@World';
        browser.expect.element('#popup-content').text.to.equal(layerInfo);
        browser.pause(1000);
        browser.end();
    }
};