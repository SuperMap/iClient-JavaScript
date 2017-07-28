var commonTools = require('../base/commonTools');
module.exports = {
    'initialization': function (browser) {
        browser.pause(5000, function () {
            commonTools.deleteFolders('./examples-test/output');
            console.log('initialize operation : delete temp output resources');
        });
        browser.end();
    }
};