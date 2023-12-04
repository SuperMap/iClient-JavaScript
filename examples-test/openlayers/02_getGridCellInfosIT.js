var commonTools = require('../base/commonTools');
module.exports = {
  after: function (browser) {
    browser.end();
  },
  'openlayers_02_getGridCellInfos': function (browser) {
    var type = 'openlayers';
    var exampleName = '02_getGridCellInfos';
    commonTools.openExampleAndLoadMap(browser, type, exampleName);
    browser
      .waitForElementPresent('#drawPoint')
      .click('#drawPoint')
      .click('#map')
      .click('#collapseOne .button-group button')
      .waitForElementVisible('#tableContainerAll .table-container')
      .expect.element('#tableContainerAll tbody tr td:nth-child(5)')
      .text.to.equal('{"red":25,"green":38,"blue":0,"alpha":255}');
    // browser.end();
  }
};