module("WMTSLayer");
var name = "wmts name";

test("TestWMTS_mapGetScale_Icl638", function () {
    //icl638
    expect(1);

    var url =  GlobeParameter.mapServiceURL;
    var map = new SuperMap.Map("map");

    //wmts或许所需要的matrixID信息
    var matrixIds = [];
    for (var i=0; i<22; ++i) {
        matrixIds[i] = {identifier:i};
    };
    //当前图层的分辨率数组信息,和matrixIds一样，需要用户从wmts服务获取并明确设置,resolutions数组和matrixIds数组长度相同
    var resolutions = [1.25764139776733,0.628820698883665,0.251528279553466,
        0.125764139776733,0.0628820698883665,0.0251528279553466,
        0.0125764139776733,0.00628820698883665,0.00251528279553466,
        0.00125764139776733,0.000628820698883665,0.000251528279553466,
        0.000125764139776733,0.0000628820698883665,0.0000251528279553466,
        0.0000125764139776733, 0.00000628820698883665,0.00000251528279553466,
        0.00000125764139776733,0.000000628820698883665,0.000000251528279553466];
    //新建图层
    var layer = new SuperMap.Layer.WMTS({name: "World",
        url: url,
        layer: "World",
        style: "default",
        matrixSet: "GlobalCRS84Scale_World",
        format: "image/png",
        resolutions:resolutions,
        matrixIds:matrixIds,
        opacity: 1,
        requestEncoding:"KVP"});

    //图层添加并显示指定级别
    map.addLayers([layer]);
    map.setCenter(new SuperMap.LonLat(0, 0), 2);

    var scale = map.getScale();
    ok(scale<1,"scale取倒数");

    map.removeLayer(layer);
    layer.destroy();
    map.destroy();
});

