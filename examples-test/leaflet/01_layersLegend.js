var commonTools = require('../base/commonTools');
module.exports = {
  after: function (browser) {
    console.log('Closing down...');
    browser.end();
  },
  leaflet_01_layersLegend: function (browser) {
    var type = 'leaflet';
    var exampleName = '01_layersLegend';
    commonTools.openExampleAndLoadMap(browser, type, exampleName);
    browser.expect.elements('.panel.panel-primary').count.to.equal(2).before(5000);
    browser.waitForElementVisible('#mapLegend>div');
    browser.waitForElementVisible('#layersList label');
    browser.expect.elements('#layersList label').count.to.equal(9);
    browser.expect.elements('#mapLegend>div').count.to.equal(2);
    browser.expect.element('#mapLegend div:nth-child(1)').text.to.equal('Landuse_R@Jingjin#1');
    browser.expect
      .elements(
        'img[src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAa0lEQVR4XmNgoAWYsXz3f0IYXQ9WAFOMC4DkInMbwBhdLwogxiAYwGsY3QyCeQsZo5sBBtgMErETgWN0QLRB6JrR+UQbhA4oNohir8EANkNAgGSDcAGSDaKai6hmEC5AP4PQswE+jG4GxQAAXHqikucMHGcAAAAASUVORK5CYII="]'
      )
      .count.to.equal(0);
    //测试版权点击的正确性
    //commonTools.verifyCopyrightOfLeaflet(browser);
    // browser.pause(1000);
    // browser.end();
  }
};
