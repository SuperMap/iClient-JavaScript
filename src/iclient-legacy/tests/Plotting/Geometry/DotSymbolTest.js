module('DotSymbol');

asyncTest("testDotSymbol_Constructor", function () {
    var libID = 421, code2 = 10200, locationPoints = [new SuperMap.Geometry.Point(20, 30)];
    var map, layer, plottingLayer, dotSymbol;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});

    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);

        dotSymbol = plottingLayer.createSymbol(libID, code2, locationPoints);
    }

    function createSymbolSuccess(evt) {
        dotSymbol = evt.feature.geometry;
    }

    setTimeout(function () {
        try{
            equal(dotSymbol.CLASS_NAME, "SuperMap.Geometry.DotSymbol", "DotSymbol.CLASS_NAME");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 400);
});

asyncTest("testDotSymbol_Destroy", function () {
    var libID = 421, code2 = 10200, locationPoints = [new SuperMap.Geometry.Point(20, 30)];
    var map, layer, plottingLayer, dotSymbol;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);

        dotSymbol = plottingLayer.createSymbol(libID, code2, locationPoints);
    }

    function createSymbolSuccess(evt) {
        dotSymbol = evt.feature.geometry;
    }

    function createSymbolFail() {

    }

    setTimeout(function () {
        try{
            dotSymbol.destroy();
            ok(dotSymbol !== null, "dotSymbol not null");
            ok(dotSymbol.textPosition === null, "dotSymbol.annotationPosition is null");
            ok(dotSymbol.symbolRank === null, "dotSymbol.symbolRank is null");
            ok(dotSymbol.negativeImage === null, "dotSymbol.negativeImage is null");
            ok(dotSymbol.annotationIndex === -1, "dotSymbol.annotationIndex is -1");
            ok(dotSymbol.symbolSizeInLib === null, "dotSymbol.symbolSizeInLib is null");
            ok(dotSymbol.symbolSize === null, "dotSymbol.symbolSize is null");
            ok(dotSymbol.middleMarkBounds === null, "dotSymbol.middleMarkBounds is null");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 400);
});




asyncTest("testDotSymbol_setRotate", function () {
    var libID = 421, code2 = 10200, locationPoints = [new SuperMap.Geometry.Point(20, 30)];
    var map, layer, dotSymbol, plottingLayer;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        dotSymbol = plottingLayer.createSymbol(libID, code2, locationPoints);
    }

    function createSymbolSuccess(evt) {
        dotSymbol = evt.feature.geometry;
        dotSymbol.setRotate(100);
    }

    setTimeout(function () {
        try{
            var setRotateTest = dotSymbol.getRotate();
            equal(setRotateTest, 100, "Function.getRotate");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 400);
});

asyncTest("testDotSymbol_setScale", 1, function () {
    var libID = 421, code2 = 10200, locationPoints = [new SuperMap.Geometry.Point(20, 30)];
    var map, layer, dotSymbol, plottingLayer;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);

        dotSymbol = plottingLayer.createSymbol(libID, code2, locationPoints);
    }

    function createSymbolSuccess(evt) {
        dotSymbol = evt.feature.geometry;
        dotSymbol.setScale(0.5);
    }

    setTimeout(function () {
        try{
            var setScaleTest = dotSymbol.getScale();
            equal(setScaleTest, 0.5, "Function.getScale");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 400);
});

asyncTest("testDotSymbol_setTextContent", 1, function () {
    var libID = 421, code2 = 10200, locationPoints = [new SuperMap.Geometry.Point(20, 30)];
    var map, layer, dotSymbol, plottingLayer;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        dotSymbol = plottingLayer.createSymbol(libID, code2, locationPoints);
    }

    function createSymbolSuccess(evt) {
        dotSymbol = evt.feature.geometry;
        dotSymbol.setTextContent("setTextContentTest");
    }

    setTimeout(function () {
        try{
            var setTextContentTest = dotSymbol.getTextContent();
            equal(setTextContentTest, "setTextContentTest", "Function.setTextContent");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 400);
});

asyncTest("testDotSymbol_setSymbolRank", 1, function () {
    var libID = 421, code2 = 10200, locationPoints = [new SuperMap.Geometry.Point(20, 30)];
    var map, layer, dotSymbol, plottingLayer;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});

    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        dotSymbol = plottingLayer.createSymbol(libID, code2, locationPoints);
    }

    function createSymbolSuccess(evt) {
        dotSymbol = evt.feature.geometry;
        dotSymbol.setSymbolRank(0);
    }

    setTimeout(function () {
        try{
            var setSymbolRankTest = dotSymbol.getSymbolRank();
            equal(setSymbolRankTest, 0, "Function.setSymbolRank");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 400);
});

asyncTest("testDotSymbol_setNegativeImage", 1, function () {
    var libID = 421, code2 = 10200, locationPoints = [new SuperMap.Geometry.Point(20, 30)];
    var map, layer, dotSymbol, plottingLayer;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});

    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        dotSymbol = plottingLayer.createSymbol(libID, code2, locationPoints);
    }

    function createSymbolSuccess(evt) {
        dotSymbol = evt.feature.geometry;
        dotSymbol.setNegativeImage(false);
    }

    setTimeout(function () {
        try{
            var setNegativeImageTest = dotSymbol.getNegativeImage();
            equal(setNegativeImageTest, false, "Function.setNegativeImage");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 400);
});

asyncTest("testDotSymbol_setTextPosition", function () {
    var libID = 421, code2 = 10200, locationPoints = [new SuperMap.Geometry.Point(20, 30)];
    var map, layer, dotSymbol, plottingLayer;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});

    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        dotSymbol = plottingLayer.createSymbol(libID, code2, locationPoints);
    }

    function createSymbolSuccess(evt) {
        dotSymbol = evt.feature.geometry;
        dotSymbol.setTextPosition(10);
    }

    setTimeout(function () {
        try{
            var setTextPosition = dotSymbol.getTextPosition();
            equal(setTextPosition, 10, "Function.setTextPosition");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 400);
});

asyncTest("testDotSymbol_setSymbolSize", function () {
    var libID = 421, code2 = 10200, locationPoints = [new SuperMap.Geometry.Point(20, 30)];
    var map, layer, dotSymbol, plottingLayer;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        dotSymbol = plottingLayer.createSymbol(libID, code2, locationPoints);
    }

    function createSymbolSuccess(evt) {
        dotSymbol = evt.feature.geometry;
        dotSymbol.setSymbolSize(38,66);
    }

    function createSymbolFail() {

    }

    setTimeout(function () {
        try{
            equal(dotSymbol.getSymbolSize().w, 38, "Function.getSymbolSize width ");
            equal(dotSymbol.getSymbolSize().h, 66, "Function.getSymbolSize height ");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 400);
});

asyncTest("testDotSymbol_setSurroundLineType", function () {
    var libID = 421, code2 = 10200, locationPoints = [new SuperMap.Geometry.Point(20, 30)];
    var map, layer, dotSymbol, plottingLayer;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        dotSymbol = plottingLayer.createSymbol(libID, code2, locationPoints);
    }

    function createSymbolSuccess(evt) {
        dotSymbol = evt.feature.geometry;
        dotSymbol.setSurroundLineType(1);
    }

    function createSymbolFail() {

    }

    setTimeout(function () {
        try{
            equal(dotSymbol.getSurroundLineType(), 1, "Function.setSurroundLineType ");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 400);
});



