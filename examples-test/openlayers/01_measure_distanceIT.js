var commonTools = require('../base/commonTools');
module.exports = {
    'openlayers_01_measure_distance': function (browser) {
        var type = 'openlayers';
        var exampleName = '01_measure_distance';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        browser.click('#map', function () {
            browser.pause(500);
            browser.moveTo(null, 100, 0).mouseButtonClick();
            browser.moveTo(null, 0, 0).mouseButtonClick(function () {
                browser.waitForElementPresent('#msg_container', 10000);
                browser.expect.element('#msg_container').text.to.be.contain('米');
            });
            browser.pause(1000);
            browser.click('.close', function () {
                browser.waitForElementNotPresent('#msg_container', 10000);
            })
        });
        browser.pause(1000);
        browser.end();
    }
};




