module('GeoGraphicObject');

asyncTest("testGeoGraphicObject_Constructor", function () {
    var map, layer, geoGraphicObject;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    var plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);

    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
    }

    //对接iserver中的服务
    var getSymbolInfo = new SuperMap.REST.GetSymbolInfoService(GlobeParameter.plotUrl);
    getSymbolInfo.events.on({
        "processCompleted": getCompleted,
        "processFailed": getFailed,
        scope: this
    });
    var inputPoints = [new SuperMap.Geometry.Point(40, 35)];
    var getSymbolInfoParams = new SuperMap.REST.GetSymbolInfoParameters();
    getSymbolInfoParams.libID = 421;
    getSymbolInfoParams.code = 10100;
    getSymbolInfoParams.inputPoints = inputPoints;
    getSymbolInfo.processAsync(getSymbolInfoParams);


    function getCompleted(result) {
        geoGraphicObject = SuperMap.Geometry.PlottingGeometry.createGeometry(421, 10100, null, {symbolData: result.originResult, layer: plottingLayer});
    }

    function getFailed() {
        return null;
    }

    setTimeout(function () {
        try{
            equal(geoGraphicObject.CLASS_NAME, "SuperMap.Geometry.DotSymbol", "DotSymbol.CLASS_NAME");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 500);
});

asyncTest("testGeoGraphicObject_getTextContent", function () {
    var map, layer, geoGraphicObject;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    var plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);

    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
    }

    //对接iserver中的服务
    var getSymbolInfo = new SuperMap.REST.GetSymbolInfoService(GlobeParameter.plotUrl);
    getSymbolInfo.events.on({
        "processCompleted": getCompleted,
        "processFailed": getFailed,
        scope: this
    });
    var inputPoints = [new SuperMap.Geometry.Point(40, 35)];
    var getSymbolInfoParams = new SuperMap.REST.GetSymbolInfoParameters();
    getSymbolInfoParams.libID = 421;
    getSymbolInfoParams.code = 10100;
    getSymbolInfoParams.inputPoints = inputPoints;
    getSymbolInfo.processAsync(getSymbolInfoParams);


    function getCompleted(result) {
        geoGraphicObject = SuperMap.Geometry.PlottingGeometry.createGeometry(421, 10100, null, {symbolData: result.originResult, layer: plottingLayer});
        geoGraphicObject.setTextContent("注记内容");
    }

    function getFailed() {
        return null;
    }

    setTimeout(function () {
        try{
            var textContent = geoGraphicObject.getTextContent();
            equal(textContent, "注记内容", "Function.getTextContent");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 500);
});

asyncTest("testGeoGraphicObject_clone", function () {
    var map, layer, geoGraphicObject;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    var plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);

    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
    }

    //对接iserver中的服务
    var getSymbolInfo = new SuperMap.REST.GetSymbolInfoService(GlobeParameter.plotUrl);
    getSymbolInfo.events.on({
        "processCompleted": getCompleted,
        "processFailed": getFailed,
        scope: this
    });
    var inputPoints = [new SuperMap.Geometry.Point(40, 35)];
    var getSymbolInfoParams = new SuperMap.REST.GetSymbolInfoParameters();
    getSymbolInfoParams.libID = 421;
    getSymbolInfoParams.code = 10100;
    getSymbolInfoParams.inputPoints = inputPoints;
    getSymbolInfo.processAsync(getSymbolInfoParams);


    function getCompleted(result) {
        geoGraphicObject = SuperMap.Geometry.PlottingGeometry.createGeometry(421, 10100, null, {symbolData: result.originResult, layer: plottingLayer});
    }

    function getFailed() {
        return null;
    }

    setTimeout(function () {
        try{
            var geometry = geoGraphicObject.clone();
            equal(geometry.CLASS_NAME, "SuperMap.Geometry.DotSymbol", "Function.clone");
            equal(geometry.libID, 421, "Function.clone");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 500);
});

asyncTest("testGeoGraphicObject_Destroy", function () {
    var map, layer, geoGraphicObject;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    var plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);

    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
    }

    //对接iserver中的服务
    var getSymbolInfo = new SuperMap.REST.GetSymbolInfoService(GlobeParameter.plotUrl);
    getSymbolInfo.events.on({
        "processCompleted": getCompleted,
        "processFailed": getFailed,
        scope: this
    });
    var inputPoints = [new SuperMap.Geometry.Point(40, 35)];
    var getSymbolInfoParams = new SuperMap.REST.GetSymbolInfoParameters();
    getSymbolInfoParams.libID = 421;
    getSymbolInfoParams.code = 10100;
    getSymbolInfoParams.inputPoints = inputPoints;
    getSymbolInfo.processAsync(getSymbolInfoParams);


    function getCompleted(result) {
        geoGraphicObject = SuperMap.Geometry.PlottingGeometry.createGeometry(421, 10100, null, {symbolData: result.originResult, layer: plottingLayer});
    }

    function getFailed() {
        return null;
    }

    setTimeout(function () {
        try{
            geoGraphicObject.destroy();
            ok(geoGraphicObject !== null, "geoGraphicObject not null");
            ok(geoGraphicObject.map === null, "geoGraphicObject.map is null");
            ok(geoGraphicObject.symbolData === null, "geoGraphicObject.symbolData is null");
            ok(geoGraphicObject.libID === null, "geoGraphicObject.libID is null");
            ok(geoGraphicObject.code === null, "geoGraphicObject.code is null");
            ok(geoGraphicObject.minEditPts === null, "geoGraphicObject.minEditPts is null");
            ok(geoGraphicObject.maxEditPts === null, "geoGraphicObject.maxEditPts is null");
            ok(geoGraphicObject.surroundLineType === null, "geoGraphicObject.surroundLineType is null");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        }
    }, 500);
});













