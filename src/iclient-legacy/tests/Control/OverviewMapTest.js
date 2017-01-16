module("OverviewMap");

//数据
var yu_url = "http://localhost:8090/iserver/services/map-china400/rest/maps/China";

test("testOverviewMap_constructor",1, function () {
    var overviewMap = new SuperMap.Control.OverviewMap();
    equals(overviewMap.CLASS_NAME,"SuperMap.Control.OverviewMap","OverviewMap CLASS_NAME");
});

test("testOverviewMap_setMap",1, function () {
    var map =new SuperMap.Map("map");
    var overviewMap = new SuperMap.Control.OverviewMap();
    overviewMap.setMap(map);
    ok(overviewMap.map instanceof SuperMap.Map,"after setMap" );
    overviewMap.destroy();
    map.destroy();
});

test("testOverviewMap_draw",1,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var overviewMap = new SuperMap.Control.OverviewMap();
    map.addControl(overviewMap);
    equals(overviewMap.draw().tagName,"DIV","return the div");
    overviewMap.destroy();
    map.destroy();
});

test("testOverviewMap_movoTo",2,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var overviewMap = new SuperMap.Control.OverviewMap();
    map.addControl(overviewMap);
    overviewMap.moveTo(new SuperMap.Pixel(100,100));
    equals(overviewMap.div.style.left,"100px","overviewMap.div.style.left");
    equals(overviewMap.div.style.top,"100px","overviewMap.div.style.top");
    overviewMap.destroy();
    map.destroy();
});

test("testOverviewMap_activate",2,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var overviewMap = new SuperMap.Control.OverviewMap();
    map.addControl(overviewMap);
    //情况1
    overviewMap.active = true;
    ok(!overviewMap.activate(),"Overview activate");
    //情况2
    overviewMap.active = false;
    ok(overviewMap.activate(),"Overview activate");
    overviewMap.destroy();
    map.destroy();
});

test("testOverviewMap_deactivate",2,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var overviewMap = new SuperMap.Control.OverviewMap();
    map.addControl(overviewMap);
    //情况1
    overviewMap.active = true;
    ok(overviewMap.deactivate(),"Overview deactivate");
    //情况2
    overviewMap.active = false;
    ok(!overviewMap.deactivate(),"Overview deactivate");
    overviewMap.destroy();
    map.destroy();
});

test("testOverviewMap_updataLayers",2,function (){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.isBaseLayer = true;
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var overviewMap = new SuperMap.Control.OverviewMap();
    map.addControl(overviewMap);
    //情况1
    ok(!overviewMap.updateLayers(),"updateLayers");
    //情况2
    var vector = new SuperMap.Layer.Vector();
    overviewMap.layers.push(vector);
    map.addLayer(vector);
    overviewMap.updateLayers();
    ok(overviewMap.layers[0] instanceof SuperMap.Layer.Vector,"this layers[0] is instanceof SuperMap.Layer.Vector")
    overviewMap.destroy();
    map.destroy();
});

test("testOverviewMap_destory",1,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var overviewMap = new SuperMap.Control.OverviewMap();
    map.addControl(overviewMap);
    overviewMap.destroy();
    equals(overviewMap.element,null,"the element of OverviewMap");
    overviewMap.destroy();
    map.destroy();
});

test("testOverviewMap_draw",2, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var overviewMap = new SuperMap.Control.OverviewMap();
    map.addControl(overviewMap);
    //情况1 return else div
    equals(overviewMap.draw().tagName,"DIV","return else div");
    //情况2 map.baselayer 存在
    var layer2 = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url);
    map.addLayer(layer2);
    equals(overviewMap.draw().tagName,"DIV","return the div Object");
    overviewMap.destroy();
    map.destroy();
});

test("testOverviewMap_maximizeControl",1,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var layer2 = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url);
    map.addLayer(layer2);
    var overviewMap = new SuperMap.Control.OverviewMap();
    map.addControl(overviewMap);
    overviewMap.maximizeControl();
    equals(overviewMap.element.style.display,'',"the element style display");
    overviewMap.destroy();
    map.destroy();
});

test("testOverviewMap_minimizeControl",1,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var layer2 = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url);
    map.addLayer(layer2);
    var overviewMap = new SuperMap.Control.OverviewMap();
    map.addControl(overviewMap);
    overviewMap.maximizeControl();
    equals(overviewMap.element.style.display,'',"the element style display");
    overviewMap.destroy();
    map.destroy();
});

test("testOverviewMap_showToggle",4, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var layer2 = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url);
    map.addLayer(layer2);
    var overviewMap = new SuperMap.Control.OverviewMap();
    map.addControl(overviewMap);
    overviewMap.showToggle(false);
    equals(overviewMap.maximizeDiv.style.display,'none',"OverviewMap maximizeControl");
    equals(overviewMap.minimizeDiv.style.display,'',"OverviewMap maximizeControl");
    overviewMap.showToggle(true);
    equals(overviewMap.maximizeDiv.style.display,'',"OverviewMap maximizeControl");
    equals(overviewMap.minimizeDiv.style.display,'none',"OverviewMap maximizeControl");
    overviewMap.destroy();
    map.destroy();
});

test("testOverviewMap_update",2,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.isBaseLayer = true;
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var layer2 = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url);
    map.addLayer(layer2);
    var overviewMap = new SuperMap.Control.OverviewMap();
    map.addControl(overviewMap);
    overviewMap.maximized = false;
    overviewMap.update();
    ok(!overviewMap.maximized,"the maximized is true");
    equals(overviewMap.element.style.display,'none',"the display of element style");
    overviewMap.destroy();
    map.destroy();
});

test("testOverviewMap_getRectBoundsFromMapBounds",4,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    map.addLayer(layer);
    map.setCenter(new SuperMap.LonLat(0,0),1);
    var overviewMap = new SuperMap.Control.OverviewMap();
    map.addControl(overviewMap);
    var bounds = overviewMap.getRectBoundsFromMapBounds(new SuperMap.Bounds(-20,-20,20,20));
    equals(bounds.left,62,"bounds left");
    equals(bounds.bottom,118,"bounds bottom");
    equals(bounds.right,118,"bounds right");
    equals(bounds.top,62,"bounds top");
    overviewMap.destroy();
    map.destroy();
});

test("testOverviewMap_getLonLatFromOverviewPx",2,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    map.addLayer(layer);
    map.setCenter(new SuperMap.LonLat(0,0),1);
    var overviewMap = new SuperMap.Control.OverviewMap();
    map.addControl(overviewMap);
    var lonlat = overviewMap.getLonLatFromOverviewPx(new SuperMap.Pixel(20,20));
    equals(lonlat.lon,-50.4,"lonlat lon");
    equals(lonlat.lat,50.4,"lonlat lon");
    overviewMap.destroy();
    map.destroy();
});

test("testOverviewMap_getOverviewPxFromLonLat",2,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    map.addLayer(layer);
    map.setCenter(new SuperMap.LonLat(0,0),1);
    var overviewMap = new SuperMap.Control.OverviewMap();
    map.addControl(overviewMap);
    var xy =  overviewMap.getOverviewPxFromLonLat(new SuperMap.LonLat(1,1));
    equals(xy.x,91,"the object x");
    equals(xy.y,89,"the object y");
    overviewMap.destroy();
    map.destroy();
});

