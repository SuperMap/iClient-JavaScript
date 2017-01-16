module("GOIs");
test("testGOIs__constructordefault",5,function(){
    var goisCtrl=new SuperMap.Control.GOIs();
    equals(goisCtrl.layers,null,"Property:layers");
    equals(goisCtrl.tiledDynamicRESTLayer,null,"Property:tileDynamicRESTLayer");
    equals(goisCtrl.utfgridLayer,null,"Property:utfgridLayer");
    equals(goisCtrl.markerLayer,null,"Property:markerLayer");
    equals(goisCtrl.map,null,"Property:map");
    goisCtrl.destroy();
});

asyncTest("testGOIs__constructor",4,function(){
    var gois=new SuperMap.GOIs({
        "url":GlobeParameter.ChinaURL,
        "datasetName":"China_Town_P@China400",
        "style":new SuperMap.REST.ServerStyle({
            "markerSymbolID":72,
            "markerSize":4
        }),
        "pixcell":16
    });

    gois.events.on({
        "initialized":function(){
            try{
                var layers = gois.getLayers();
                var goisCtrl=new SuperMap.Control.GOIs(layers);
                start();
                equals(goisCtrl.layers.length,layers.length,"Property:layers_length");
                equals(goisCtrl.tiledDynamicRESTLayer.id,layers[0].id,"Property:tileDynamicRESTLayer_id");
                equals(goisCtrl.utfgridLayer.id,layers[1].id,"Property:utfgridLayer_id");
                equals(goisCtrl.markerLayer.id,layers[2].id,"Property:markerLayer_id");
                goisCtrl.destroy();
                gois.destroy();
            }catch(e){
                console.log(e);
            }
        }
    });

});

test("testGOIs_setLayers",function(){
    var goisCtrl=new SuperMap.Control.GOIs();
    var layer0=new SuperMap.Layer.TiledDynamicRESTLayer("name",GlobeParameter.ChinaURL);
    var layer1=new SuperMap.Layer.UTFGrid();
    layer1.__isPoi=true;
    var layer2=new SuperMap.Layer.Markers();
    goisCtrl.layers=[layer0,layer1,layer2];
    goisCtrl.setLayers();
    equals(goisCtrl.layers.length,3,"Property:layers_length");
    equals(goisCtrl.layers[0].id,layer0.id,"Property:layers[0]_id");
    equals(goisCtrl.layers[1].id,layer1.id,"Property:layers[1]_id");
    equals(goisCtrl.layers[2].id,layer2.id,"Property:layers[2]_id");
    goisCtrl.destroy();
    layer0.destroy();
    layer1.destroy();
    layer2.destroy();
});

test("testGOIs_createUTFGridControl",1,function(){
    var goisCtrl=new SuperMap.Control.GOIs();
    var layer=new SuperMap.Layer.UTFGrid();
    layer.__isPoi=true;
    goisCtrl.layers=[layer];
    goisCtrl.setLayers();
    goisCtrl.createUTFGridControl();
    ok(!!goisCtrl.utfgridControl,"Property:utfgridControl");
    goisCtrl.destroy();
    layer.destroy();
});

test("testGOIs_mouseOverUTFGrid_point",2,function(){
    var infoLookup=[{
        data: {
            NAME: "栗坪乡",
            SmID: "19758",
            SmUserID: "0",
            SmX: "1.22277994087191E7",
            SmY: "3236131.20947238"
        },
        id: "19758"}
    ],lonlat={
        lat: 3185951.7847308,
        lon: 12349890.677591
    },pixel={
        x: 1022,
        y: 401
    };
    var goisCtrl=new SuperMap.Control.GOIs();
    var layer=new SuperMap.Layer.Markers();
    goisCtrl.layers=[layer];
    goisCtrl.setLayers();
    goisCtrl.mouseOverUTFGrid_point(infoLookup,lonlat,pixel);
    var curHoverMarker=goisCtrl.curHoverMarker;
    var ll=curHoverMarker.getLonLat();
    equal(ll.lon,SuperMap.Util.toFloat(infoLookup[0].data.SmX),"Property:curHoverMarker_lonlat_lon");
    equal(ll.lat,SuperMap.Util.toFloat(infoLookup[0].data.SmY),"Property:curHoverMarker_lonlat_lat");
    goisCtrl.destroy();
    layer.destroy();
});

test("testGOIs_mouseOverUTFGrid_lineArea",2,function(){
    var infoLookup=[{
        data: {
            NAME: "栗坪乡",
            SmID: "19758",
            SmUserID: "0",
            SmX: "1.22277994087191E7",
            SmY: "3236131.20947238"
        },
        id: "19758"}
    ],lonlat={
        lat: 3185951.7847308,
        lon: 12349890.677591
    },pixel={
        x: 1022,
        y: 401
    };
    var goisCtrl=new SuperMap.Control.GOIs();
    var layer=new SuperMap.Layer.Markers();
    goisCtrl.layers=[layer];
    goisCtrl.setLayers();
    goisCtrl.mouseOverUTFGrid_lineArea(infoLookup,lonlat,pixel);
    var curHoverMarker=goisCtrl.curHoverMarker;
    var ll=curHoverMarker.getLonLat();
    equal(ll.lon,lonlat.lon,"Property:curHoverMarker_lonlat_lon");
    equal(ll.lat,lonlat.lat,"Property:curHoverMarker_lonlat_lat");
    goisCtrl.destroy();
    layer.destroy();
});

test("testGOIs_removeHoverMarker",1,function(){
    var infoLookup=[{
        data: {
            NAME: "栗坪乡",
            SmID: "19758",
            SmUserID: "0",
            SmX: "1.22277994087191E7",
            SmY: "3236131.20947238"
        },
        id: "19758"}
    ],lonlat={
        lat: 3185951.7847308,
        lon: 12349890.677591
    },pixel={
        x: 1022,
        y: 401
    };
    var goisCtrl=new SuperMap.Control.GOIs();
    var layer=new SuperMap.Layer.Markers();
    goisCtrl.layers=[layer];
    goisCtrl.setLayers();
    goisCtrl.mouseOverUTFGrid_point(infoLookup,lonlat,pixel);
    goisCtrl.removeHoverMarker();
    equal(goisCtrl.curHoverMarker,null,"Property:curHoverMarker");
    goisCtrl.destroy();
});

test("testGOIs_removeMarker",1,function(){
    var goisCtrl=new SuperMap.Control.GOIs();
    var layer=new SuperMap.Layer.Markers();
    var marker=new SuperMap.Marker(new SuperMap.LonLat(0, 0), new SuperMap.Icon())
    layer.addMarker(marker);
    goisCtrl.layers=[layer];
    goisCtrl.setLayers();
    goisCtrl.removeMarker(marker);
    equal(layer.markers.length,0,"Property:markerLayer_markers_length");
    goisCtrl.destroy();
    layer.destroy();
    marker.destroy();
});
test("testGOIs_activate",1, function () {
    var goisCtrl=new SuperMap.Control.GOIs();
    goisCtrl.activate();
    ok(goisCtrl.active,"Proerty:active");
    goisCtrl.destroy();
});
test("testGOIs_deactivate",1,function(){
    var goisCtrl=new SuperMap.Control.GOIs();
    goisCtrl.activate();
    goisCtrl.deactivate();
    ok(!goisCtrl.active,"Proerty:active");
    goisCtrl.destroy();
});
test("testGOIs_destroy",5,function(){
    var goisCtrl=new SuperMap.Control.GOIs();
    goisCtrl.destroy();
    equals(goisCtrl.layers,null,"Property:layers");
    equals(goisCtrl.tiledDynamicRESTLayer,null,"Property:tileDynamicRESTLayer");
    equals(goisCtrl.utfgridLayer,null,"Property:utfgridLayer");
    equals(goisCtrl.markerLayer,null,"Property:markerLayer");
    equals(goisCtrl.map,null,"Property:map");
});