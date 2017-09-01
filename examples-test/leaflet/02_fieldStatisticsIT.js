var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_02_fieldStatistics': function (browser) {
        var type = 'leaflet';
        var exampleName = '02_fieldStatistics';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check element exist*/
        browser.expect.element('.resultInfo.leaflet-control').to.be.present.before(10000);
        browser.expect.element('#trafficRes').to.be.present.before(10000);
        browser.expect.element('.table.table-bordered tbody tr td').to.be.present.before(10000);
        browser.pause(1000);
        browser.end();
    }
};
