var commonTools = require('../base/commonTools');
module.exports={
    'openlayers_01_mapService':function(browser){
        var type='openlayers';
        var exampleName='01_mapService';
        commonTools.openExampleAndLoadMap(browser,type,exampleName);
        //test
        browser.waitForElementPresent('#popup-content',10000);
        var mapInfo = '(map信息太多，只打印一部分)\n\n地图名："World"\n中心点:{ "x": 0, "y": 0 }\nBounds:{ "top": 90, "left": -180, "bottom": -90, "leftBottom": { "x": -180, "y": -90 }, "right": 180, "rightTop": { "x": 180, "y": 90 } }';
        browser.expect.element('#popup-content').text.to.equal(mapInfo);
        browser.pause(1000);
        browser.end();
    }
};