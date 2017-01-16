module("TiledVectorLayer");

test("testTiledVectorLayerTest_constructorDefault",function(){
    var layer=new SuperMap.Layer.TiledVectorLayer("layer",GlobeParameter.ChinaURL);
    ok(layer instanceof SuperMap.Layer.TiledVectorLayer,"classType:TiledVicetorLayer");
    equals(layer.CLASS_NAME,"SuperMap.Layer.TiledVectorLayer","Property:CLASS_NAME");
    var cartocss="@color:#123;";
    layer.setCartoCSS(cartocss);
    equals(layer.getClientCartoCSS(),cartocss,"Method:getClientCartoCSS");
    equals(layer.useLocalStorage,false,"Property:useLocalStorage");
    layer.destroy();
});
test("testTiledVectorLayerTest_constructor",function(){
    var cartoCss0="@width:2;",cartoCss1="@color:#123;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer=new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    ok(layer.useLocalStorage,"Property:useLocalStorage");
    equals(layer.tileClass,SuperMap.Tile.VectorImage,"Property:tileClass");
    equals(layer.name,param.name,"Property:layerName");
    var newName="China400";
    layer.setName(newName);
    equals(layer.name,newName,"Method:setName");
    var cartoCss_get=layer.getClientCartoCSS();
    equals(cartoCss_get,cartoCss0,"Method:getClientCartoCSS");
    layer.setCartoCSS(cartoCss1);
    cartoCss_get=layer.getClientCartoCSS();
    equals(cartoCss_get,cartoCss1,"Method:setCartoCSS");

    layer.destroy();
});
test("testTiledVectorLayerTest_getClientCartoCSS",function(){
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer=new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    layer.events.on({"layerInitialized": addLayer});function addLayer(){
          map.addLayers([layer]);
          var center = new SuperMap.LonLat(0,0);
          map.setCenter(center, 1);
    }
    var carto = layer.getClientCartoCSS();
    equals(carto,cartoCss0,"function:getClientCartoCSS");
    layer.destroy();
});
test("testTiledVectorLayerTest_calculateResolutionsLeveldefault",function()
{
    expect(1);
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer=new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    var resolution = [];
    var scl = layer.calculateResolutionsLevel(resolution);
    equal(scl,0,"function:calculateResolutionsLevel:测试resolution为空是否为零");

    layer.destroy();
});
test("testTiledVectorLayerTest_destroy",function()
{
    expect(1);
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer=new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    layer.destroy();
    var isok = false;
    if(layer.viewBounds == null && layer.viewer == null && layer.scale == null
    && layer.hightlightFeatureInfoes == null && layer.cartoShaders == null && layer.layersInfo == null
    && layer.cartoCss == null && layer.fillImages == null && layer.layerEditor == null && layer.DEFAULT_PARAMS == null
    && layer.memoryTile == null && layer.memoryKeys == null && layer.bufferTileCount == null){
        isok = true;
    }
    ok(isok,"function:destroy");
});
test("testTiledVectorLayerTest_clone",function(){
    expect(3);
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer=new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var layer01=layer.clone();

    equals(layer01.useLocalStorage,layer.useLocalStorage,"Property:useLocalStorage");
    equals(layer01.tileClass,layer.tileClass,"Property:tileClass");
    equals(layer01.name,layer.name,"Property:name");

    layer.destroy();
    layer01.destroy();
});
test("testTiledVectorLayerTest_clean",function()
{
    expect(1);
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer=new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    layer.clean();
    var isok = false;
    if(layer.resolutions == null && layer.scales == null){
        isok = true;
    }
    ok(isok,"function:clean");
    layer.destroy();
});
test("testTiledVectorLayerTest_initGriddedTiles",function()
{
    expect(1);
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer = new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    var bounds = new SuperMap.Bounds(-180,-90,180,90);
    layer.initGriddedTiles(bounds);
    var isok = false;
    if(layer.lenRow == layer.grid.length){
        isok = true;
    }
    ok(isok,"function:initGriddedTiles");

    layer.destroy();
});
test("testTiledVectorLayerTest_getURL",function()
{
    expect(1);
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer = new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    var bounds = new SuperMap.Bounds(-180,-90,180,90);
    var tileurl = layer.getURL(bounds);
    var isok = false;
    if(tileurl != null){
        isok = true;
    }
    ok(isok,"function:getURL");

    layer.destroy();
});
test("testTiledVectorLayerTest_getXYZ",function()
{
    expect(1);
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer = new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    var bounds = new SuperMap.Bounds(-180,-90,180,90);
    var tilexyz = layer.getXYZ(bounds);
    var isok = false;
    if(tilexyz.x != null && tilexyz.y != null && tilexyz.z != null){
        isok = true;
    }
    ok(isok,"function:getXYZ");

    layer.destroy();
});
test("testTiledVectorLayerTest_addMemoryTile",function()
{
    expect(1);
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer = new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    var bounds = new SuperMap.Bounds(-180,-90,180,90);
    var tileFeature = layer.getMemoryTile(bounds);
    var key = layer.getXYZ(bounds);
    layer.addMemoryTile(bounds,tileFeature,key);
    var isok = false;
    if(layer.memoryTile != []){
        isok = true;
    }
    ok(isok,"function:addMemoryTile");

    layer.destroy();
});
test("testTiledVectorLayerTest_getTileUrl",function()
{
    expect(1);
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer = new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    var bounds = new SuperMap.Bounds(-180,-90,180,90);
    var xyz = layer.getXYZ(bounds);
    var url = layer.getTileUrl(xyz);
    var isok = false;
    if(url != null){
        isok = true;
    }
    ok(isok,"function:getTileUrl");

    layer.destroy();
    map.destroy();
});
test("testTiledVectorLayerTest_getFullRequestString",function()
{
    expect(1);
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer = new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    var newparams = {transparent: true, redirect: true};
    var bounds = new SuperMap.Bounds(-180,-90,180,90);
    var xyz = layer.getXYZ(bounds);
    var alturl = layer.getTileUrl(xyz);
    var requeststring = layer.getFullRequestString(newparams,alturl);
    var isok = false;
    if(requeststring != null){
        isok = true;
    }
    ok(isok,"function:getFullRequestString");
    layer.destroy();
    map.destroy();
});
test("testTiledVectorLayerTest_mergeNewParams",function()
{
    expect(1);
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer = new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    var newparams = {transparent: true, redirect: true};
    var isok = layer.mergeNewParams(newparams);
    ok(isok,"function:mergeNewParams");

    layer.destroy();
    map.destroy();
});
test("testTiledVectorLayerTest_addTile",function()
{
    expect(1);
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer = new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    var bounds = new SuperMap.Bounds(-180,-90,180,90);
    var position = new SuperMap.LonLat(30,45);
    var tile = layer.addTile(bounds,position);
    var isok = false;
    if(tile != null){
        isok = true;
    }
    ok(isok,"function:addTile");
    layer.destroy();
    map.destroy();
});
test("testTiledVectorLayerTest_getFeaturedefault",function()
{
    expect(3);
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer = new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    var pixel = new SuperMap.Pixel();
    var i = pixel.x;
    var j = pixel.y;
    var featureinfoes = layer.getFeature(i,j);
    equal(featureinfoes.length,0,"");
    equal(featureinfoes.xy.x,i,"");
    equal(featureinfoes.xy.y,j,"");

    layer.destroy();
    map.destroy();
});
asyncTest("testTiledVectorLayerTest_layersInfo",3,function(){
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:"@c:#123;"}
    };
    var layer=new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    layer.events.on({"layerInitialized": function() {
        setTimeout(function(){
            ok(layer.layersInfo,"Property:layersInfo");
            ok(layer.layersInfo["World_Division_pl@China"],"Property:layersInfo detail");
            ok(layer.getServerCartoCSS(),'ServerCartoCss');
            start();
        },3000);
    }});

});

test("testTiledVectorLayerTest_destructor",function(){
    var layer=new SuperMap.Layer.TiledVectorLayer("layer",GlobeParameter.ChinaURL);
    layer.destroy();
    equals(layer.map,null,"Property:map");
    equals(layer.name,null,"Property:name");
    equals(layer.layersInfo,null,"Property:layersInfo");
    equals(layer.cartoCss,null,"Property:cartoCss");
    equals(layer.fillImages,null,"Property:fillImages");
});
test("testTiledVectorLayerTest_unHightlightFeatures",function()
{
    expect(1);
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer = new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    layer.unHightlightFeatures();
    var isok = false;
    if(layer.hightlightFeatureInfoes == null){
        isok = true;
    }
    ok(isok,"function:unHightlightFeatures");
    layer.destroy();
    map.destroy();
});
test("testTiledVectorLayerTest_resolutionsFromScales",function()
{
    expect(1);
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer = new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    var scales = [2.54,3.54];
    var resolutions = layer.resolutionsFromScales(scales);
    var isok = false;
    if(resolutions != null){
        isok = true;
    }
    ok(isok,"function:resolutionsFromScales");
    layer.destroy();
    map.destroy();
});
test("testTiledVectorLayerTest_calculateResolutions",function()
{
    expect(1);
    var cartoCss0="@width:2;";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCss0}
    };
    var layer = new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    var props = {maxResolution: "auto",
        nullnumZoomLevels: 16,
        minScale: 1.6901635716026555e-9,
        maxScale:  0.000027691639957137904};
    var resolutions = layer.calculateResolutions(props);
    var isok = false;
    if(resolutions != null){
        isok = true;
    }
    ok(isok,"function:calculateResolutions");
    layer.destroy();
    map.destroy();
});
test("testTiledVectorLayerTest_SetCartoCSS_1",function(){
    cartoCssStr=document.getElementById("cartocssStr");
    var cartoCss=cartoCssStr.value;
    var layer=new SuperMap.Layer.TiledVectorLayer("layer",GlobeParameter.ChinaURL,{cacheEnabled:true},{useLocalStorage:true,cartoCss:cartoCss});
    layer.setCartoCSS(cartoCss);
    equals(layer.getClientCartoCSS(),cartoCss,"Method:getClientCartoCSS");
    layer.destroy();
});

test("testTiledVectorLayerTest_SetCartoCSS_2",function(){
    var layer=new SuperMap.Layer.TiledVectorLayer("layer",GlobeParameter.ChinaURL,{cacheEnabled:true},{useLocalStorage:true,cartoCss:""});
    layer.setCartoCSS("");
    equals(layer.getClientCartoCSS(),"","Method:getClientCartoCSS");
    layer.destroy();
});