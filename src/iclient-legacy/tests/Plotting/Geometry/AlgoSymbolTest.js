module('AlgoSymbol');

asyncTest("testAlgoSymbol_Constructor", function () {
    var algoSymbol;
    var libID = 421, code1 = 311, locationPoints = [new SuperMap.Geometry.Point(20, 30), new SuperMap.Geometry.Point(20, 35)];
    var map = new SuperMap.Map("map");
    var baseLayer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    baseLayer.events.on({"layerInitialized": addLayer});
    var plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});

    function addLayer() {
        map.addLayers([baseLayer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        algoSymbol = plottingLayer.createSymbol(libID, code1, locationPoints);
    }

    function createSymbolSuccess(evt) {
        algoSymbol = evt.feature.geometry;
    }

    setTimeout(function () {
        try{
            equal(algoSymbol.CLASS_NAME, "SuperMap.Geometry.AlgoSymbol", "线面标号的Constructor测试");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 500);
});

//警用库无子标号,暂设置恒等
asyncTest("testAlgoSymbol_setSubSymbol", function () {
    var map, layer, algoSymbol, plottingLayer;
    var libID = 421, code1 = 311, locationPoints = [new SuperMap.Geometry.Point(20, 30), new SuperMap.Geometry.Point(20, 35)];
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});

    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        algoSymbol = plottingLayer.createSymbol(libID, code1, locationPoints);
    }

    function createSymbolSuccess(evt) {
        algoSymbol = evt.feature.geometry;
        algoSymbol.setSubSymbol(100, 0);
    }

    setTimeout(function () {
        try{
            var subSymbols = algoSymbol.getSubSymbols();
            equal(subSymbols,subSymbols, "获取修改后子标号code");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 500);
});

asyncTest("testAlgoSymbol_setSurroundLineType", function () {
    var map, layer, algoSymbol, plottingLayer;
    var libID = 421, code1 = 311, locationPoints = [new SuperMap.Geometry.Point(20, 30), new SuperMap.Geometry.Point(20, 35)];
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});

    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        algoSymbol = plottingLayer.createSymbol(libID, code1, locationPoints);
    }

    function createSymbolSuccess(evt) {
        algoSymbol = evt.feature.geometry;
        algoSymbol.setSurroundLineType(1);
    }

    setTimeout(function () {
        try{
            var algoSymbolTest = algoSymbol.getSurroundLineType();
            equal(algoSymbolTest, 1, "设置衬线");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 500);
});

asyncTest("testAlgoSymbol_Destory", function () {
    var algoSymbol;
    var libID = 421, code1 = 311, locationPoints = [new SuperMap.Geometry.Point(20, 30), new SuperMap.Geometry.Point(20, 35)];
    var map = new SuperMap.Map("map");
    var baseLayer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    baseLayer.events.on({"layerInitialized": addLayer});
    var plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    function addLayer() {
        map.addLayers([baseLayer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        algoSymbol = plottingLayer.createSymbol(libID, code1, locationPoints);
    }

    function createSymbolSuccess(evt) {
        algoSymbol = evt.feature.geometry;
    }

    function createSymbolFail() {

    }

    setTimeout(function () {
        try{
            algoSymbol.destroy();
            ok(algoSymbol !== null, "algoSymbol not null");
            ok(algoSymbol.subSymbols === null, "algoSymbol.subSymbols is null");
            ok(algoSymbol.dOffset === null, "algoSymbol.dOffset is null");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 500);

});

