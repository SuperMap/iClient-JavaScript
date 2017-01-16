module("LayerSwitcher");

//数据
var yu_url = "http://localhost:8090/iserver/services/map-china400/rest/maps/China";

test("testLayerSwitcher_constructor",1,function(){
    var layerSwitcher = new SuperMap.Control.LayerSwitcher();
    equals(layerSwitcher.CLASS_NAME,"SuperMap.Control.LayerSwitcher","Property:CLASS_NAME");
});

test("testLayerSwitcher_destory",2,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var layerSwitcher = new SuperMap.Control.LayerSwitcher();
    map.addControl(layerSwitcher);
    layerSwitcher.destroy();
    equals(layerSwitcher.baseLayersDiv.innerHTML,'',"this div is null");
    equals(layerSwitcher.dataLayers.length,0,"this data is null");
    map.destroy();
});

test("testLayerSwitcher_setMap",1,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var layerSwitcher = new SuperMap.Control.LayerSwitcher();
    layerSwitcher.setMap(map);
    ok(layerSwitcher.map instanceof SuperMap.Map,"after LayerSwitcher setMap" );
    map.destroy();
});

test("testLayerSwitcher_draw",1,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var layerSwitcher = new SuperMap.Control.LayerSwitcher();
    map.addControl(layerSwitcher);
    equals(layerSwitcher.draw().tagName,"DIV","LayerSwitcher draw");
    layerSwitcher.destroy();
    map.destroy();
});

test("testLayerSwitcher_checkRedraw",2,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var layerSwitcher = new SuperMap.Control.LayerSwitcher();
    map.addControl(layerSwitcher);
    //情况1
    ok(layerSwitcher.checkRedraw(),"layerSwitcher checkRedraw");
    var vectorLayer = new SuperMap.Layer.Vector();
    map.addLayer(vectorLayer);
    layerSwitcher.map.layers.length = 0;
    //情况2
    ok(layerSwitcher.checkRedraw(),"layerSwitcher checkRedraw");
    layerSwitcher.destroy();
    map.destroy();
});

test("testLayerSwitcher_redraw",1,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var layerSwitcher = new SuperMap.Control.LayerSwitcher();
    map.addControl(layerSwitcher);
    equals(layerSwitcher.redraw().tagName,"DIV","LayerSwitcher redraw");
    layerSwitcher.destroy();
    map.destroy();
});

test("testLayerSwitcher_updateMap",1, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var layerSwitcher = new SuperMap.Control.LayerSwitcher();
    map.addControl(layerSwitcher);
    var vectorLayer = new SuperMap.Layer.Vector();
    vectorLayer.isBaseLayer = true;
    map.addLayer(vectorLayer);
    layerSwitcher.updateMap();
    equals(layerSwitcher.baseLayers.length,1,"LayerSwitcher updataMap");
    layerSwitcher.destroy();
    map.destroy();
});

test("testLayerSwitcher_maximizeControl",3, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var layerSwitcher = new SuperMap.Control.LayerSwitcher();
    map.addControl(layerSwitcher);
    layerSwitcher.maximizeControl(null);
    equals(layerSwitcher.div.style.width,"","this.div.style.width");
    equals(layerSwitcher.div.style.height,"","this.div.style.height");
    equals(layerSwitcher.div.style.borderWidth,"3px","this.div.style.borderWidth");
    layerSwitcher.destroy();
    map.destroy();
});

test("testLayerSwitcher_minnimizeControl",3, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var layerSwitcher = new SuperMap.Control.LayerSwitcher();
    map.addControl(layerSwitcher);
    layerSwitcher.minimizeControl(null);
    equals(layerSwitcher.div.style.width,"0px","this.div.style.width");
    equals(layerSwitcher.div.style.height,"0px","this.div.style.height");
    equals(layerSwitcher.div.style.borderWidth,"0px","this.div.style.borderWidth");
    layerSwitcher.destroy();
    map.destroy();
});

test("testLayerSwitcher_showControls",6,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var layerSwitcher = new SuperMap.Control.LayerSwitcher();
    map.addControl(layerSwitcher);
    //情况1
    layerSwitcher.showControls(true);
    equals(layerSwitcher.maximizeDiv.style.display,"","maximizeDiv.style.display");
    equals(layerSwitcher.minimizeDiv.style.display,"none","maximizeDiv.style.display");
    equals(layerSwitcher.layersDiv.style.display,"none","maximizeDiv.style.display");
    //情况1
    layerSwitcher.showControls(false);
    equals(layerSwitcher.maximizeDiv.style.display,"none","maximizeDiv.style.display");
    equals(layerSwitcher.minimizeDiv.style.display,"","maximizeDiv.style.display");
    equals(layerSwitcher.layersDiv.style.display,"","maximizeDiv.style.display");

    layerSwitcher.destroy();
    map.destroy();
});

//test("LayerSwitcher_loadContents",0,function(){
//    var map = new SuperMap.Map('map');
//    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",url,null,{maxResolution:"auto"});
//    layer.events.on({"layerInitialized":addLayer});
//    function addLayer(){
//        map.addLayer(layer);
//        map.setCenter(new SuperMap.LonLat(0,0),1);
//    }
//    var layerSwitcher = new SuperMap.Control.LayerSwitcher();
//    map.addControl(layerSwitcher);
//
//
//
//    layerSwitcher.destroy();
//    map.destroy();
//});