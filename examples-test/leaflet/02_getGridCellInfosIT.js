var commonTools = require('../base/commonTools');
module.exports = {
  after: function (browser) {
    console.log('Closing down...');
    browser.end();
  },
  'leaflet_02_getGridCellInfos': function (browser) {
    var type = 'leaflet';
    var exampleName = '02_getGridCellInfos';
    commonTools.openExampleAndLoadMap(browser, type, exampleName);
    /*check elements exist*/
    browser
      .waitForElementVisible('.leaflet-draw-draw-marker')
      .click('.leaflet-draw-draw-marker')
      .click('#map')
      .click('.panel-group.sidebar-config-wrap .btn-primary')
      .waitForElementVisible('#tableContainerAll .table-container')
      .expect.element('#tableContainerAll tbody tr td:nth-child(5)')
      .text.to.equal('{"red":25,"green":38,"blue":0,"alpha":255}');

    //测试版权点击的正确性
    //commonTools.verifyCopyrightOfLeaflet(browser);
    // browser.pause(1000);
    // browser.end();
  }
};