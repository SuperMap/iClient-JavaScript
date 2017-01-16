module("SetLayersInfoService");
var setLayersInfoEvtArgs = null;
var setLayersInfoFaildEvtArgs = null;
function initSetLayersInfoService(url) {
    return new SuperMap.REST.SetLayersInfoService(url, {
        eventListeners: {
            processCompleted: setLayersInfoCompleted,
            processFailed: setLayersInfoFailed
        }
    });
}

function setLayersInfoCompleted(result) {
    setLayersInfoEvtArgs = result;
}
function setLayersInfoFailed(result) {
    setLayersInfoFaildEvtArgs = result;
}
test("SetLayersInfoEventArgs_destroy", function() {
    expect(4);
    var service = initSetLayersInfoService(GlobeParameter.vectorURL);
    
    ok(service !== null, "not null");
    service.destroy();
    ok(service.events === null, "service.events");
    ok(service.eventListeners === null,"service.eventListeners");
    ok(service.lastResult === null, "service.lastResult");
});

asyncTest("SetLayersInfoService_createLayer", function(){
    expect(5);
    var service = initSetLayersInfoService(GlobeParameter.WorldURL);
    var layerInfo = {"symbolScalable":false, "visible":true, "symbolScale":0, "caption":null, "type":"UGC", "completeLineSymbolDisplayed":false, "opaqueRate":100, "bounds":{"rightTop":{"y":90, "x":180}, "leftBottom":{"y":-90, "x":-180}, "bottom":-90, "left":-180, "right":180, "top":90}, "minScale":0, "subLayers":{"layers":[{"symbolScalable":false, "visible":true, "theme":{"colorGradientType":null, "uniqueExpression":"COLOR_MAP", "items":[{"unique":"1", "style":{"fillBackOpaque":true, "lineWidth":0.1, "fillBackColor":{"red":255, "blue":255, "green":255}, "fillForeColor":{"red":241, "blue":243, "green":242}, "markerAngle":0, "markerSize":2.4, "fillGradientOffsetRatioX":0, "fillGradientOffsetRatioY":0, "lineColor":{"red":128, "blue":128, "green":128}, "fillOpaqueRate":100, "fillGradientMode":"NONE", "fillSymbolID":0, "fillGradientAngle":0, "markerSymbolID":0, "lineSymbolID":5}, "visible":true, "caption":"1"}, {"unique":"2", "style":{"fillBackOpaque":true, "lineWidth":0.1, "fillBackColor":{"red":255, "blue":255, "green":255}, "fillForeColor":{"red":253, "blue":255, "green":255}, "markerAngle":0, "markerSize":2.4, "fillGradientOffsetRatioX":0, "fillGradientOffsetRatioY":0, "lineColor":{"red":128, "blue":128, "green":128}, "fillOpaqueRate":100, "fillGradientMode":"NONE", "fillSymbolID":0, "fillGradientAngle":0, "markerSymbolID":0, "lineSymbolID":5}, "visible":true, "caption":"2"}, {"unique":"3", "style":{"fillBackOpaque":true, "lineWidth":0.1, "fillBackColor":{"red":255, "blue":255, "green":255}, "fillForeColor":{"red":247, "blue":243, "green":251}, "markerAngle":0, "markerSize":2.4, "fillGradientOffsetRatioX":0, "fillGradientOffsetRatioY":0, "lineColor":{"red":128, "blue":128, "green":128}, "fillOpaqueRate":100, "fillGradientMode":"NONE", "fillSymbolID":0, "fillGradientAngle":0, "markerSymbolID":0, "lineSymbolID":5}, "visible":true, "caption":"3"}, {"unique":"4", "style":{"fillBackOpaque":true, "lineWidth":0.1, "fillBackColor":{"red":255, "blue":255, "green":255}, "fillForeColor":{"red":249, "blue":249, "green":244}, "markerAngle":0, "markerSize":2.4, "fillGradientOffsetRatioX":0, "fillGradientOffsetRatioY":0, "lineColor":{"red":128, "blue":128, "green":128}, "fillOpaqueRate":100, "fillGradientMode":"NONE", "fillSymbolID":0, "fillGradientAngle":0, "markerSymbolID":0, "lineSymbolID":5}, "visible":true, "caption":"4"}], "memoryData":null, "type":"UNIQUE", "defaultStyle":{"fillBackOpaque":true, "lineWidth":0.1, "fillBackColor":{"red":255, "blue":255, "green":255}, "fillForeColor":{"red":189, "blue":255, "green":235}, "markerAngle":0, "markerSize":2.4, "fillGradientOffsetRatioX":0, "fillGradientOffsetRatioY":0, "lineColor":{"red":0, "blue":0, "green":0}, "fillOpaqueRate":100, "fillGradientMode":"NONE", "fillSymbolID":0, "fillGradientAngle":0, "markerSymbolID":0, "lineSymbolID":0}}, "symbolScale":0, "caption":"Countries@World#2", "type":"UGC", "representationField":"", "joinItems":null, "ugcLayerType":"THEME", "completeLineSymbolDisplayed":false, "opaqueRate":100, "bounds":{"rightTop":{"y":83.62359619140626, "x":180}, "leftBottom":{"y":-90, "x":-180}, "bottom":-90, "left":-180, "right":180, "top":83.62359619140626}, "minScale":0, "subLayers":{}, "displayFilter":"", "description":"", "name":"Countries@World#2", "displayOrderBy":null, "datasetInfo":{"bounds":{"rightTop":{"y":83.62359619140626, "x":180}, "leftBottom":{"y":-90, "x":-180}, "bottom":-90, "left":-180, "right":180, "top":83.62359619140626}, "recordCount":0, "isFileCache":false, "tableName":null, "description":null, "name":"Countries", "prjCoordSys":null, "isReadOnly":false, "charset":null, "encodeType":null, "dataSourceName":"World", "type":"REGION"}, "minVisibleGeometrySize":0.4, "maxScale":0, "queryable":false, "themeElementPosition":null}]}, "description":"", "name":"World", "minVisibleGeometrySize":0, "maxScale":0, "queryable":false};
    service.processAsync(layerInfo);
    
    setTimeout(function() {
        try{
            var res = service.lastResult;
            ok(res !== null,"service.lastResult");
            ok(setLayersInfoEvtArgs !== null,"setLayersInfoEvtArgs");
            equal(res.succeed, true,"res.succeed");
            ok(res.newResourceID != null,"res.newResourceID");
            ok(res.newResourceLocation != null,"res.newResourceLocation");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
            }
    },6000);
});
