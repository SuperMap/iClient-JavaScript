module('GroupObject');

asyncTest("testGroupObject_Constructor", function () {
    var libID1 = 22, code1 = 1003, locationPoints1 = [new SuperMap.Geometry.Point(20, 10),new SuperMap.Geometry.Point(40, 10)];
    var libID2 = 421, code2 = 10100, locationPoints2 = [new SuperMap.Geometry.Point(20, 10)];
    var libID3 = 421, code3 = 9, locationPoints3 = [new SuperMap.Geometry.Point(40, 10)];
    var subObjects = [];
    var centerLonLat;
    var map, layer, plottingLayer, plottingEdit,symbol1,symbol2,symbol3, groupObject;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        map.addControls([plottingEdit]);
        symbol1 = plottingLayer.createSymbol(libID1, code1, locationPoints1);
        symbol2 = plottingLayer.createSymbol(libID2, code2, locationPoints2);
        symbol3 = plottingLayer.createSymbol(libID3, code3, locationPoints3);

    }

    function createSymbolSuccess(evt) {
        if(evt.feature.geometry.symbolType === SuperMap.Plot.SymbolType.GROUPOBJECT){
            groupObject = evt.feature.geometry;
        } else {
            subObjects.push(evt.feature);
            if(subObjects.length === 3){
                plottingLayer.createGroupObject(subObjects);
                plottingEdit.activate();
            }
        }
    }

    setTimeout(function () {
        try{
            equal(groupObject.CLASS_NAME, "SuperMap.Geometry.GroupObject", "function:CLASS_NAME");
            equal(groupObject.libID, 0, "function:libID");
            equal(groupObject.code, 1000, "function:code");
            equal(groupObject.symbolType, SuperMap.Plot.SymbolType.GROUPOBJECT, "function:symbolType");
            equal(groupObject.symbolName, "ZHDX", "function:symbolName");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 400);
});

asyncTest("testGroupObject_Destroy", function () {
    var libID1 = 22, code1 = 1003, locationPoints1 = [new SuperMap.Geometry.Point(20, 10),new SuperMap.Geometry.Point(40, 10)];
    var libID2 = 421, code2 = 10100, locationPoints2 = [new SuperMap.Geometry.Point(20, 10)];
    var libID3 = 421, code3 = 9, locationPoints3 = [new SuperMap.Geometry.Point(40, 10)];
    var subObjects = [];
    var centerLonLat;
    var map, layer, plottingLayer, plottingEdit,symbol1,symbol2,symbol3, groupObject;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        map.addControls([plottingEdit]);
        symbol1 = plottingLayer.createSymbol(libID1, code1, locationPoints1);
        symbol2 = plottingLayer.createSymbol(libID2, code2, locationPoints2);
        symbol3 = plottingLayer.createSymbol(libID3, code3, locationPoints3);

    }

    function createSymbolSuccess(evt) {
        if(evt.feature.geometry.symbolType === SuperMap.Plot.SymbolType.GROUPOBJECT){
            groupObject = evt.feature.geometry;
            centerLonLat = groupObject.getBounds().getCenterLonLat();
        } else {
            subObjects.push(evt.feature);
            if(subObjects.length === 3){
                plottingLayer.createGroupObject(subObjects);
                plottingEdit.activate();
            }
        }
    }

    setTimeout(function () {
        try{
            groupObject.destroy();
            ok(groupObject !== null, "groupObject not null");
            equal(groupObject.features, null, "function:Destroy");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 400);


});

asyncTest("testGroupObject_setRotate", function () {
    var libID1 = 22, code1 = 1003, locationPoints1 = [new SuperMap.Geometry.Point(20, 10),new SuperMap.Geometry.Point(40, 10)];
    var libID2 = 421, code2 = 10100, locationPoints2 = [new SuperMap.Geometry.Point(20, 10)];
    var libID3 = 421, code3 = 9, locationPoints3 = [new SuperMap.Geometry.Point(40, 10)];
    var subObjects = [];
    var centerLonLat;
    var map, layer, plottingLayer, plottingEdit,symbol1,symbol2,symbol3, groupObject;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        map.addControls([plottingEdit]);
        symbol1 = plottingLayer.createSymbol(libID1, code1, locationPoints1);
        symbol2 = plottingLayer.createSymbol(libID2, code2, locationPoints2);
        symbol3 = plottingLayer.createSymbol(libID3, code3, locationPoints3);

    }

    function createSymbolSuccess(evt) {
        if(evt.feature.geometry.symbolType === SuperMap.Plot.SymbolType.GROUPOBJECT){
            groupObject = evt.feature.geometry;
            centerLonLat = groupObject.getBounds().getCenterLonLat();
        } else {
            subObjects.push(evt.feature);
            if(subObjects.length === 3){
                plottingLayer.createGroupObject(subObjects);
                plottingEdit.activate();
            }
        }
    }

    setTimeout(function () {
        try{
            var rotateValue=30;
            groupObject.anchorPoint=new SuperMap.Geometry.Point(centerLonLat.lon, centerLonLat.lat);
            groupObject.setRotate(rotateValue);
            equal(rotateValue, groupObject.getRotate(), "function:setRotate");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 400);

});

asyncTest("testGroupObject_setScale", function () {
    var libID1 = 22, code1 = 1003, locationPoints1 = [new SuperMap.Geometry.Point(20, 10),new SuperMap.Geometry.Point(40, 10)];
    var libID2 = 421, code2 = 10100, locationPoints2 = [new SuperMap.Geometry.Point(20, 10)];
    var libID3 = 421, code3 = 9, locationPoints3 = [new SuperMap.Geometry.Point(40, 10)];
    var subObjects = [];
    var centerLonLat;
    var map, layer, plottingLayer, plottingEdit,symbol1,symbol2,symbol3, groupObject;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        map.addControls([plottingEdit]);
        symbol1 = plottingLayer.createSymbol(libID1, code1, locationPoints1);
        symbol2 = plottingLayer.createSymbol(libID2, code2, locationPoints2);
        symbol3 = plottingLayer.createSymbol(libID3, code3, locationPoints3);

    }

    function createSymbolSuccess(evt) {
        if(evt.feature.geometry.symbolType === SuperMap.Plot.SymbolType.GROUPOBJECT){
            groupObject = evt.feature.geometry;
            centerLonLat = groupObject.getBounds().getCenterLonLat();
        } else {
            subObjects.push(evt.feature);
            if(subObjects.length === 3){
                plottingLayer.createGroupObject(subObjects);
                plottingEdit.activate();
            }
        }
    }

    setTimeout(function () {
        try{
            groupObject.anchorPoint=new SuperMap.Geometry.Point(centerLonLat.lon, centerLonLat.lat);
            var scaleValue=3;
            groupObject.setScale(scaleValue);
            equal(scaleValue, groupObject.getScale(), "function:setScale");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        } finally {
            map.destroy();
        }

    }, 400);

});


