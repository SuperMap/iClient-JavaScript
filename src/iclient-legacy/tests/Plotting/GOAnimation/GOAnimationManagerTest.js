module('GOAniamtionManager');

test("testGOAniamtionManager_Constructor", function () {
    expect(1);
    var goAnimationManager=new SuperMap.Plot.GOAniamtionManager();
    equal(goAnimationManager.CLASS_NAME, "SuperMap.Plot.GOAniamtionManager", "function:CLASS_NAME");
});

asyncTest("testGOAniamtionManager_Destroy", function () {
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
        dotSymbol = evt.feature;
    }
    setTimeout(function () {
        try{
            var goAnimationManager=new SuperMap.Plot.GOAniamtionManager();
            goAnimationManager.setMap(map);
            goAnimationManager.createGOAnimation(SuperMap.Plot.GOAniamtionType.ANIMATION_SHOW,"显隐动画",dotSymbol);
            goAnimationManager.destroy();
            equal(goAnimationManager.goAnimatons, null, "function:goAnimatons");
            equal(goAnimationManager.goAnimationLayer, null, "function:goAnimationLayer");
            equal(goAnimationManager.map, null, "function:map");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        }
    }, 400);
});
test("testGOAniamtionManager_setMap", function () {
    expect(1);
    var goAnimationManager=new SuperMap.Plot.GOAniamtionManager();
    var map = new SuperMap.Map("map");
    equal(goAnimationManager.setMap(map), true, "function:setMap");
});

asyncTest("testGOAniamtionManager_createGOAnimation", function () {
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
        dotSymbol = evt.feature;
    }
    setTimeout(function () {
        try{
            var goAnimationManager=new SuperMap.Plot.GOAniamtionManager();
            goAnimationManager.setMap(map);
            var goAnimation=goAnimationManager.createGOAnimation(SuperMap.Plot.GOAniamtionType.ANIMATION_SHOW,"显隐动画",dotSymbol);
            ok(goAnimation !== null, "function:createGOAnimation");
            equal(goAnimation.name, "显隐动画", "function:createGOAnimation");
            equal(goAnimation.animationGOFeature.geometry.libID, 421, "function:createGOAnimation");
            equal(goAnimation.animationGOFeature.geometry.code, 10200, "function:createGOAnimation");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        }
    }, 400);
});

asyncTest("testGOAniamtionManager_findGOAnimationByName", function () {
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
        dotSymbol = evt.feature;
    }
    setTimeout(function () {
        try{
            var goAnimationManager=new SuperMap.Plot.GOAniamtionManager();
            goAnimationManager.setMap(map);
            var creatGoAnimation1=goAnimationManager.createGOAnimation(SuperMap.Plot.GOAniamtionType.ANIMATION_SCALE,"比例动画",dotSymbol);
            var creatGoAnimation2=goAnimationManager.createGOAnimation(SuperMap.Plot.GOAniamtionType.ANIMATION_SHOW,"显隐动画",dotSymbol);
            goAnimationManager.goAnimatons=[creatGoAnimation1,creatGoAnimation2];
            var goAnimation1=goAnimationManager.findGOAnimationByName("比例动画");
            ok(goAnimation1 !== null, "function:findGOAnimationByName");
            equal(goAnimation1.name, creatGoAnimation1.name, "function:findGOAnimationByName");
            var goAnimation2=goAnimationManager.findGOAnimationByName("测试动画");
            ok(goAnimation2 === null, "function:findGOAnimationByName");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        }
    }, 400);
});

asyncTest("testGOAniamtionManager_removeGOAnimationByName", function () {
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
        dotSymbol = evt.feature;
    }
    setTimeout(function () {
        try{
            var goAnimationManager=new SuperMap.Plot.GOAniamtionManager();
            goAnimationManager.setMap(map);
            var creatGoAnimation1=goAnimationManager.createGOAnimation(SuperMap.Plot.GOAniamtionType.ANIMATION_SCALE,"比例动画",dotSymbol);
            var creatGoAnimation2=goAnimationManager.createGOAnimation(SuperMap.Plot.GOAniamtionType.ANIMATION_SHOW,"显隐动画",dotSymbol);
            goAnimationManager.goAnimatons=[creatGoAnimation1,creatGoAnimation2];
            var flag1=goAnimationManager.removeGOAnimationByName("比例动画");
            var flag2=goAnimationManager.removeGOAnimationByName("测试删除动画");
            ok(flag1 === true, "function:removeGOAnimationByName 删除动画成功");
            ok(flag2 === false, "function:removeGOAnimationByName 删除动画失败");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        }
    }, 400);
});

asyncTest("testGOAniamtionManager_removeGOAnimation", function () {
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
        dotSymbol = evt.feature;
    }
    setTimeout(function () {
        try{
            var goAnimationManager=new SuperMap.Plot.GOAniamtionManager();
            goAnimationManager.setMap(map);
            var creatGoAnimation1=goAnimationManager.createGOAnimation(SuperMap.Plot.GOAniamtionType.ANIMATION_SCALE,"比例动画",dotSymbol);
            var creatGoAnimation2=goAnimationManager.createGOAnimation(SuperMap.Plot.GOAniamtionType.ANIMATION_SHOW,"显隐动画",dotSymbol);
            goAnimationManager.goAnimatons=[creatGoAnimation1,creatGoAnimation2];
            var flag1=goAnimationManager.removeGOAnimation(creatGoAnimation1);
            ok(flag1 === true, "function:removeGOAnimation 删除动画成功");
            equal(creatGoAnimation1.animationGOFeature, null, "function:removeGOAnimation");
            equal(creatGoAnimation1.name, null, "function:removeGOAnimation");
            equal(creatGoAnimation1.animationState, 0, "function:removeGOAnimation");
            equal(creatGoAnimation1.plottingLayer, null, "function:removeGOAnimation");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        }
    }, 400);
});


asyncTest("testGOAniamtionManager_excute", function () {
    var libID = 421, code2 = 10200, locationPoints = [new SuperMap.Geometry.Point(20, 30)];
    var map, layer, plottingLayer, dotSymbol;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    var plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        dotSymbol = plottingLayer.createSymbol(libID, code2, locationPoints);
    }
    function createSymbolSuccess(evt) {
        dotSymbol = evt.feature;
    }
    setTimeout(function () {
        try{
            var goAnimationManager=new SuperMap.Plot.GOAniamtionManager();
            goAnimationManager.setMap(map);
            var creatGoAnimation1=goAnimationManager.createGOAnimation(SuperMap.Plot.GOAniamtionType.ANIMATION_SCALE,"比例动画",dotSymbol);
            creatGoAnimation1.play();
            var flag=goAnimationManager.excute();
            ok(flag === true, "function:excute");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        }
    }, 400);
});


asyncTest("testGOAniamtionManager_play", function () {
    var libID = 421, code2 = 10200, locationPoints = [new SuperMap.Geometry.Point(20, 30)];
    var map, layer, plottingLayer, dotSymbol;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    var plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        dotSymbol = plottingLayer.createSymbol(libID, code2, locationPoints);
    }
    function createSymbolSuccess(evt) {
        dotSymbol = evt.feature;
    }
    setTimeout(function () {
        try{
            var goAnimationManager=new SuperMap.Plot.GOAniamtionManager();
            goAnimationManager.setMap(map);
            var creatGoAnimation1=goAnimationManager.createGOAnimation(SuperMap.Plot.GOAniamtionType.ANIMATION_SCALE,"比例动画",dotSymbol);
            goAnimationManager.play();
            equal(creatGoAnimation1.animationState, 1, "function:play");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        }
    }, 400);
});


asyncTest("testGOAniamtionManager_stop", function () {
    var libID = 421, code2 = 10200, locationPoints = [new SuperMap.Geometry.Point(20, 30)];
    var map, layer, plottingLayer, dotSymbol;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    var plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        dotSymbol = plottingLayer.createSymbol(libID, code2, locationPoints);
    }
    function createSymbolSuccess(evt) {
        dotSymbol = evt.feature;
    }
    setTimeout(function () {
        try{
            var goAnimationManager=new SuperMap.Plot.GOAniamtionManager();
            goAnimationManager.setMap(map);
            var creatGoAnimation1=goAnimationManager.createGOAnimation(SuperMap.Plot.GOAniamtionType.ANIMATION_SCALE,"比例动画",dotSymbol);
            goAnimationManager.play();
            goAnimationManager.stop();
            equal(creatGoAnimation1.animationState, 3, "function:stop");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        }
    }, 400);
});

asyncTest("testGOAniamtionManager_pause", function () {
    var libID = 421, code2 = 10200, locationPoints = [new SuperMap.Geometry.Point(20, 30)];
    var map, layer, plottingLayer, dotSymbol;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    var plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        dotSymbol = plottingLayer.createSymbol(libID, code2, locationPoints);
    }
    function createSymbolSuccess(evt) {
        dotSymbol = evt.feature;
    }
    setTimeout(function () {
        try{
            var goAnimationManager=new SuperMap.Plot.GOAniamtionManager();
            goAnimationManager.setMap(map);
            var creatGoAnimation1=goAnimationManager.createGOAnimation(SuperMap.Plot.GOAniamtionType.ANIMATION_SCALE,"比例动画",dotSymbol);
            goAnimationManager.play();
            goAnimationManager.pause();
            equal(creatGoAnimation1.animationState, 2, "function:pause");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        }
    }, 400);
});

asyncTest("testGOAniamtionManager_reset", function () {
    var libID = 421, code2 = 10200, locationPoints = [new SuperMap.Geometry.Point(20, 30)];
    var map, layer, plottingLayer, dotSymbol;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    var plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        dotSymbol = plottingLayer.createSymbol(libID, code2, locationPoints);
    }
    function createSymbolSuccess(evt) {
        dotSymbol = evt.feature;
    }
    setTimeout(function () {
        try{
            var goAnimationManager=new SuperMap.Plot.GOAniamtionManager();
            goAnimationManager.setMap(map);
            var creatGoAnimation1=goAnimationManager.createGOAnimation(SuperMap.Plot.GOAniamtionType.ANIMATION_SCALE,"比例动画",dotSymbol);
            goAnimationManager.play();
            goAnimationManager.reset();
            equal(creatGoAnimation1.animationState, 4, "function:reset");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        }
    }, 400);
});


asyncTest("testGOAniamtionManager_createGOAnimationByType", function () {
    var libID = 421, code2 = 10200, locationPoints = [new SuperMap.Geometry.Point(20, 30)];
    var map, layer, plottingLayer, dotSymbol;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});
    var plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        dotSymbol = plottingLayer.createSymbol(libID, code2, locationPoints);
    }
    function createSymbolSuccess(evt) {
        dotSymbol = evt.feature;
    }
    setTimeout(function () {
        try{
            var goAnimationManager=new SuperMap.Plot.GOAniamtionManager();
            goAnimationManager.setMap(map);
            var creatGoAnimation=goAnimationManager.createGOAnimationByType(SuperMap.Plot.GOAniamtionType.ANIMATION_SCALE,"比例动画");
            equal(creatGoAnimation.name, "比例动画", "function:createGOAnimationByType");
            start();
        } catch(exception){
            ok(false, "exception occcurs,message is:" + exception.message);
            start();
        }
    }, 400);
});





