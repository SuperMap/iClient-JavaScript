module("UTFGrid");
var name = "UTFGrid Name";
var ChinaURL = GlobeParameter.ChinaURL;
test("TestUTFGrid_Constructor", function () {
    expect(6);
    var layer = new SuperMap.Layer.UTFGrid("utfgrid", ChinaURL,
        {
            layerName: "China_Road_L@China400",
            utfTileSize: 256,
            pixcell: 4
        },
        {
            utfgridResolution: 8
        });
    ok(layer instanceof SuperMap.Layer.UTFGrid, "utfgrid instance");
    equal(layer.name, "utfgrid", "layer name");
    //内部会把Options中属性部分进行连接，形成新的url，发送给服务器
    equal(layer.url, ChinaURL+"/utfGrid.json?scale=${z}&x=${x}&y=${y}&_cache=false&width=256&height=256&pixCell=4&layerNames=['China_Road_L@China400']", "layer url");
    equal( layer.utfgridResolution, 8, "layer utfgridResolution");
    layer.destroy();
    equal(layer.name, null, "layer name");
    equal(layer.url, null, "layer url");
});

test("UTFGrid_Clone",function(){
    expect(5);
    var layer = new SuperMap.Layer.UTFGrid("utfgrid", ChinaURL,
        {
            layerName: "China_Road_L@China400",
            utfTileSize: 256,
            pixcell: 4
        },
        {
            utfgridResolution: 8
        });
    var clone = layer.clone();
    ok(clone instanceof SuperMap.Layer.UTFGrid, "utfgrid instance");
    equal(clone.url, ChinaURL+"/utfGrid.json?scale=${z}&x=${x}&y=${y}&_cache=false&width=256&height=256&pixCell=4&layerNames=['China_Road_L@China400']", "layer url");
    equal(clone.utfgridResolution, 8, "layer utfgridResolution");
    clone.destroy();
    equal(clone.name, null, "layer name");
    equal(clone.url, null, "layer url");
});

test("TestUTFGrid_Token", function () {
    expect(4);
    var token="UZFukINeIZEcmkpnYHY9F-6J1Oy2gprR1WEWnbQDVnp7DqF-VJuU4BwOJnKNBm3HtGQdJcrNd9HklyXfV2-rMA..";
    SuperMap.Credential.CREDENTIAL = new SuperMap.Credential(token);
    var layer = new SuperMap.Layer.UTFGrid("utfgrid", "http://localhost:8090/iserver/services/map-China400_JS/rest/maps/China",
        {
            layerName: "China_Road_L@China400",
            utfTileSize: 256,
            pixcell: 4
        },
        {
            utfgridResolution: 8
        });

    ok(layer instanceof SuperMap.Layer.UTFGrid, "utfgrid instance");
    //内部会把Options中属性部分进行连接，形成新的url，发送给服务器
    equal(layer.url, "http://localhost:8090/iserver/services/map-China400_JS/rest/maps/China/utfGrid.json?scale=${z}&x=${x}&y=${y}&_cache=false&width=256&height=256&pixCell=4&layerNames=['China_Road_L@China400']&token="+token, "layer url");
    layer.destroy();
    equal(layer.name, null, "layer name");
    equal(layer.url, null, "layer url");
});

asyncTest("TestUTFGrid_Mapscales", function () {

	SuperMap.Credential.CREDENTIAL = null;
        layer = new SuperMap.Layer.UTFGrid("utfgrid", ChinaURL,
        {
            layerName: "China_Province_R@China400",
            utfTileSize: 256,
            pixcell: 8
        },
        {
            utfgridResolution: 8
        }),
    baseLayer = new SuperMap.Layer.TiledDynamicRESTLayer("China", ChinaURL, {transparent: true}, {useCanvas: true});
    baseLayer.events.on({"layerInitialized":function(){
        var map = new SuperMap.Map("map",{projection:"EPSG:3857"});
        map.scales=[1/591658710.9];
        map.addLayers([baseLayer,layer]);
        var center = new SuperMap.LonLat(11733502.481499, 4614406.969325);
        map.setCenter(center);
        setTimeout(function() {
            try{
                ok(layer instanceof SuperMap.Layer.UTFGrid, "utfgrid instance");
                var featureInfo= layer.getFeatureInfo(new SuperMap.LonLat(10011529.10801,4770950.00356));
                if(featureInfo != null) {
                    equal(featureInfo.id,'', "feature.id is ''");
                    equal(featureInfo.data,undefined, "feature.data is undefined");
                }
                start();
            }
            catch(excepion){
                ok(false, "exception occcurs,message is:"+excepion.message);
                start();
            }
        },6000);
    }});





});