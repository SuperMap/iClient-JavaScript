var commonTools = require('../base/commonTools');
module.exports = {
  after:function(browser){
    console.log('Closing down...');
    browser.end();
  },
  'components_labeltheme_vue': function (browser) {
    var type = 'component';
    var exampleName = 'components_labeltheme_vue';
    commonTools.openExampleAndLoadMap(browser, type, exampleName);
    /*check element exist*/
    browser.waitForElementPresent('.themeLayer', 10000);
    browser.waitForElementPresent('.mapboxgl-canvas', 10000);
    browser.expect.element('.mapboxgl-canvas').to.have.css('position').which.equals('absolute');
    browser.expect.element('.mapboxgl-canvas').to.have.css('left').which.equals('0px');
    browser.expect.element('.mapboxgl-canvas').to.have.css('top').which.equals('0px');
  }
};
