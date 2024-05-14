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
    /*check element exist*/
    // browser.waitForElementPresent('.leaflet-popup-content', 10000);
    /*check the info showing in leaflet-popup is equal to our expectation*/
    browser.elements('css selector', '.panel.panel-primary', function (result) {
      console.log('----Hope number of panel to be 2, actual is ' + result.value.length);
    });
    browser.waitForElementVisible('#mapLegend>div');
    browser.expect.elements('#layersList label').count.to.equal(9);
    browser.click('.panel.panel-primary #layersList input');
    browser.click('.btn.btn-default');
    browser.waitForElementVisible('#mapLegend>div');
    browser.pause(1000);
    browser.expect.elements('#mapLegend>div').count.to.equal(4);
    browser.expect.element('#mapLegend div:nth-child(1)').text.to.equal('CoordsysLabel@Jingjin');
    browser.expect.element('#mapLegend div:nth-child(3)').text.to.equal('Landuse_R@Jingjin#1');
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
