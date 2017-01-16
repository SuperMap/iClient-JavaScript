//
//// *Created by Administrator on 2016/5/6.
//
//
//
module('Query');

var query = new SuperMap.Plot.Query();
var libID = 421;
var code = 10100;
var symbolLibManager,layer,plottingLayer,plotting,map;
test("testQuery_Constructor", function () {
    var className = query.CLASS_NAME;
    equal(className, "SuperMap.Plot.Query", "Property.CLASS_NAME");
});
asyncTest("testQuery_captureGObject", function () {
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL);
    plottingLayer = new SuperMap.Layer.PlottingLayer("标绘图层", GlobeParameter.plotUrl);
    layer.events.on({"layerInitialized": addLayer});
    plotting = SuperMap.Plotting.getInstance(map, GlobeParameter.plotUrl);
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        loadSymbolLib();
    }
    function loadSymbolLib() {
        symbolLibManager = plotting.symbolLibManager;
        symbolLibManager.events.on({"initializeCompleted": symbolLibInitializeCompleted});
        symbolLibManager.initializeAsync();
    }

    function symbolLibInitializeCompleted() {
        plotSymbol();
    }

    function plotSymbol() {
        var pts = [];
        var polygonPoints = [new SuperMap.Geometry.Point(200, 300)];
        plottingLayer.createSymbol(libID, code, polygonPoints);
        var polygonPoints1 = [new SuperMap.Geometry.Point(200, 100)];
        plottingLayer.createSymbol(libID, code, polygonPoints1);
        var polygonPoints2 = [new SuperMap.Geometry.Point(180, 150)];
        plottingLayer.createSymbol(libID, code, polygonPoints2);
        var polygonPoints3 = [new SuperMap.Geometry.Point(450, 320)];
        plottingLayer.createSymbol(libID, code, polygonPoints3);
        pts.push(polygonPoints, polygonPoints1, polygonPoints2, polygonPoints3);
    }

    setTimeout(function () {
        try{
            var queryGO = plotting.getQuery();
            var feature = plottingLayer.features[0];
            var components = feature.geometry.components;
            var x = components[0].components[0].x;
            var y =  components[0].components[0].y;
            var pt = new SuperMap.LonLat(x,y);
            var point =  plotting.map.getPixelFromLonLat(pt);
            var queryResult = queryGO.captureGObject(point);
            equal(true, true, "Function:captureGObject");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + excepion.message)
            start();
        } finally {
            //map.destroy();
        }

    }, 700);
});

asyncTest("testQuery_getGObjectsInPolygon", function () {
    var map = new SuperMap.Map("map");
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, {maxResolution: "auto"});
    var  plottingLayer = new SuperMap.Layer.PlottingLayer("标绘图层", GlobeParameter.plotUrl);
    layer.events.on({"layerInitialized": addLayer});
    var plotting = SuperMap.Plotting.getInstance(map, GlobeParameter.plotUrl);
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        loadSymbolLib();

        plotting.setMap(map);
    }

    function loadSymbolLib() {
         symbolLibManager = plotting.symbolLibManager;
         symbolLibManager.events.on({"initializeCompleted": symbolLibInitializeCompleted});
         symbolLibManager.initializeAsync();
    }

    function symbolLibInitializeCompleted() {
        plotSymbol();
    }

    function plotSymbol() {
        var polygonPoints = [new SuperMap.Geometry.Point(200, 150)];
        plottingLayer.createSymbol(libID, code, polygonPoints);
        var polygonPoints1 = [new SuperMap.Geometry.Point(200, 100)];
        plottingLayer.createSymbol(libID, code, polygonPoints1);
        var polygonPoints3 = [new SuperMap.Geometry.Point(180, 100)];
        plottingLayer.createSymbol(libID, code, polygonPoints3);
        var polygonPoints4 = [new SuperMap.Geometry.Point(450, 210)];
        plottingLayer.createSymbol(libID, code, polygonPoints4);
    }

    setTimeout(function () {
        var queryGO = plotting.getQuery();
        var point = [new SuperMap.Geometry.Point(0, 50), new SuperMap.Geometry.Point(0, 350), new SuperMap.Geometry.Point(300, 350), new SuperMap.Geometry.Point(300, 50),new SuperMap.Geometry.Point(0, 50)];
        var queryResult = queryGO.getGObjectsInPolygon(point, point.length);
        equal(queryResult.length>0, true, "Function:getGObjectsInPolygon");
        start();
        symbolLibManager.events.un({"initializeCompleted": symbolLibInitializeCompleted});
    }, 700);

});

asyncTest("testQuery_getGObjectsInCircle", function () {
      map = new SuperMap.Map("map");
     layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL/*, {maxResolution: "auto"}*/);
     plottingLayer = new SuperMap.Layer.PlottingLayer("标绘图层", GlobeParameter.plotUrl);
     layer.events.on({"layerInitialized": addLayer});
     plotting = SuperMap.Plotting.getInstance(map, GlobeParameter.plotUrl);

    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        loadSymbolLib();
    }

    function loadSymbolLib() {
        symbolLibManager = plotting.symbolLibManager;
        symbolLibManager.events.on({"initializeCompleted": symbolLibInitializeCompleted});
        symbolLibManager.initializeAsync();
    }

    function symbolLibInitializeCompleted() {
        var polygonPoints = [new SuperMap.Geometry.Point(200, 150)];
        plottingLayer.createSymbol(libID, code, polygonPoints);
        var polygonPoints1 = [new SuperMap.Geometry.Point(200, 100)];
        plottingLayer.createSymbol(libID, code, polygonPoints1);
        var polygonPoints3 = [new SuperMap.Geometry.Point(180, 150)];
        plottingLayer.createSymbol(libID, code, polygonPoints3);
        var polygonPoints4 = [new SuperMap.Geometry.Point(450, 200)];
        plottingLayer.createSymbol(libID, code, polygonPoints4);
    }

    setTimeout(function () {
        var queryGO = plotting.getQuery();
        var queryResult = queryGO.getGObjectsInCircle(200, 100, 150);
        equal(queryResult.length>0, true, "Function:getGObjectsInCircle");
        start();
    }, 200);
});

asyncTest("testQuery_getGObjectsInRect", function () {

    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL);
    plottingLayer = new SuperMap.Layer.PlottingLayer("标绘图层", GlobeParameter.plotUrl);
    layer.events.on({"layerInitialized": addLayer});
    plotting = SuperMap.Plotting.getInstance(map, GlobeParameter.plotUrl);
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        loadSymbolLib();
    }
    function loadSymbolLib() {
        symbolLibManager = plotting.symbolLibManager;
        symbolLibManager.events.on({"initializeCompleted": symbolLibInitializeCompleted});
        symbolLibManager.initializeAsync();
    }
    function symbolLibInitializeCompleted() {
        var polygonPoints = [new SuperMap.Geometry.Point(200, 300)];
        plottingLayer.createSymbol(libID, code, polygonPoints);
        var polygonPoints1 = [new SuperMap.Geometry.Point(120, 180)];
        plottingLayer.createSymbol(libID, code, polygonPoints1);
        var polygonPoints2 = [new SuperMap.Geometry.Point(230, 260)];
        plottingLayer.createSymbol(libID, code, polygonPoints2);
        var polygonPoints3 = [new SuperMap.Geometry.Point(450, 320)];
        plottingLayer.createSymbol(libID, code, polygonPoints3);
    }

    setTimeout(function () {
        var queryGO = plotting.getQuery();
        var queryResult = queryGO.getGObjectsInRect(100, 100, 300, 300);
        equal(queryResult.length>0, true, "Function:getGObjectsInRect");
        start();
        symbolLibManager.events.un({"initializeCompleted": symbolLibInitializeCompleted});
        plottingLayer.destroy();
        layer.destroy();
        map.destroy();
    }, 300);
});


