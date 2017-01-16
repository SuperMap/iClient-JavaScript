module("CartoLayer");

var feature0 = {
    "id":1,
    "searchValues":"",
    "attributes":{
        "SmUserID":"0",
        "SmID":"1",
        "SmArea":"1.6060069623493825E15",
        "SmPerimeter":"1.6030006674231339E8",
        "featureID":1},
    "geometry":{
        "cutEdges":null,
        "coordinateType":null,
        "parts":[5],
        "points":[0,258,258,258,258,0,0,0,0,258],
        "type":"REGION"
    },
    "style":{
        "strokeStyle":"rgba(0,0,0,0)",
        "lineWidth":1,
        "lineCap":"butt",
        "lineJoin":"round",
        "miterLimit":10,
        "lineDashOffset":0,
        "lineOpacity":1,
        "lineDasharray":[],
        "fillStyle":"rgba(145, 185, 234, 1)",
        "polygonOpacity":1,
        "offsetX":0,
        "offsetY":0,
        "globalAlpha":1,
        "globalCompositeOperation":"source-over",
        "imageSmoothingEnabled":true,
        "offset":{"x":0,"y":0}
    },
    "layerIndex":0
},feature1 = {
    "id":4,
    "searchValues":"",
    "attributes":{"SmUserID":"0","SmID":"4","SmArea":"7.168490366110804E11","SmPerimeter":"1.645230095809228E7","featureID":4},
    "geometry":{
        "cutEdges":null,
        "coordinateType":null,
        "parts":[9,3,3,3,3,4,3,3,3,4,5,3,59,3,4,4,3],
        "points":[246,162,244,163,245,164,246,164,246,163,247,164,248,164,247,161,246,162,250,164,249,164,250,164,250,166,250,166,250,166,246,156,246,157,246,156,249,160,249,161,249,160,247,158,248,158,247,159,247,158,254,172,254,172,254,172,247,160,247,161,247,160,248,159,247,160,248,159,254,147,254,149,254,148,254,147,247,155,248,156,247,157,246,156,247,155,246,156,245,155,246,156,252,152,250,155,253,155,253,156,252,158,251,159,252,159,251,159,252,159,254,160,254,163,256,164,256,165,255,165,256,166,256,167,258,167,258,169,257,170,258,171,256,172,251,172,251,173,249,173,249,174,248,173,250,171,252,171,253,170,251,171,249,170,250,168,250,167,249,167,250,166,252,166,252,165,252,164,251,164,251,163,252,162,249,163,249,160,250,160,249,159,248,160,249,159,248,161,249,157,248,158,247,158,248,158,247,158,248,157,248,155,249,155,248,154,249,153,252,152,255,147,254,147,255,147,247,153,246,155,246,154,247,153,252,151,252,152,251,152,252,151,255,146,255,147,255,146],
        "type":"REGION"
    },
    "style":{
        "strokeStyle":"rgba(0,0,0,0)",
        "lineWidth":1,
        "lineCap":"butt",
        "lineJoin":"round",
        "miterLimit":10,
        "lineDashOffset":0,
        "lineOpacity":1,
        "lineDasharray":[],
        "fillStyle":"rgba(245, 243, 240, 1)",
        "polygonOpacity":1,
        "offsetX":0,
        "offsetY":0,
        "globalAlpha":1,
        "globalCompositeOperation":"source-over",
        "imageSmoothingEnabled":true,
        "offset":{"x":0,"y":0}
    },
    "layerIndex":1
};

test("testCartoLayer_constructorDefault",function(){
    var cartoLayer=new SuperMap.CartoLayer();
    equals(cartoLayer.tile,null,"Property:tile");
    equals(cartoLayer.layerName,null,"Property:layerName");
    equals(cartoLayer.id,null,"Property:id");
    equals(cartoLayer.className,null,"Property:className");
    equals(cartoLayer.index,0,"Property:index");
    cartoLayer.destroy();
});

test("testCartoLayer_constructor",function(){
    var layerName="CartoLayer@Carto";
    var nLayerName=layerName.replace(/[@#]/gi,"___");
    var cartoLayer=new SuperMap.CartoLayer(layerName,null,{});
    equals(cartoLayer.tile,null,"Property:tile");
    equals(cartoLayer.layerName,layerName,"Property:layerName");
    equals(cartoLayer.id,nLayerName,"Property:id");
    equals(cartoLayer.className,nLayerName,"Property:className");
    equals(cartoLayer.index,0,"Property:index");
});

test("testCartoLayer_equals", function () {
    expect(1);
    var layerName = "CartoLayer@Carto";
    var cartoLayer = new SuperMap.CartoLayer(layerName, null, {});
    var layerName1 = "CartoLayer";
    var cartoLayer1 = new SuperMap.CartoLayer(layerName1, null, {});
    var equal = cartoLayer.equals(cartoLayer1);
    ok(!equal, "function:equals")
});

test("testCartoLayer_setIndex", function () {
    var layerName = "CartoLayer@Carto";
    var cartoLayer = new SuperMap.CartoLayer(layerName, null, {});
    cartoLayer.setIndex(4);
    equals(cartoLayer.index, 4, "function:setIndex");
});

test("testCartoLayer_getFeatureById", function () {
    var layerName = "CartoLayer@Carto";
    var cartoLayer = new SuperMap.CartoLayer(layerName, null, {});
    cartoLayer.addFeature(feature0);
    cartoLayer.addFeatures([feature1]);
    var featureA = cartoLayer.getFeatureById(1);
    var featureB = cartoLayer.getFeatureById(5);
    equals(featureA, feature0, "function:getFeatureById");
    equals(featureB, null, "function:getFeatureById");
});


test("testCartoLayer_addFeature",function(){
    var layerName="CartoLayer@Carto";
    var cartoLayer=new SuperMap.CartoLayer(layerName,null,{});
    equals(cartoLayer.features[0],null,"before addFeature Proerty:features");
    cartoLayer.addFeature(feature0);
    equals(cartoLayer.features[0],feature0,"after addFeature Proerty:features");
    cartoLayer.addFeatures([feature1]);
    equals(cartoLayer.features[1],feature1,"after addFeatures Property:features");
});


test("testCartoLayer_getDefaultStyle",function(){
    var layerName="CartoLayer@Carto";
    var style;
    var cartoLayer=new SuperMap.CartoLayer(layerName,null,{});
    style = {strokeStyle:"#fff"};
    cartoLayer.getDefaultStyle(style,'TEXT');
    equals(style.textBaseline,'center',"getDefaultStyle_text");
    style = {strokeStyle:"#fff"};
    cartoLayer.getDefaultStyle(style,'POINT');
    equals(style.fillStyle,'#fc0',"getDefaultStyle_point");
    style = {strokeStyle:"#fff"};
    cartoLayer.getDefaultStyle(style,'LINE');
    equals(style.strokeStyle,'rgba(0,0,0,0)',"getDefaultStyle_line");
    style = {strokeStyle:"#fff"};
    cartoLayer.getDefaultStyle(style,'REGION');
    equals(style.fillStyle,'rgba(0,0,0,0)',"getDefaultStyle_region");
});
test('testCartoLayer_getFeatureInfo',function(){
    var canvas = document.createElement('canvas');
    canvas.setAttribute('height','10px');
    canvas.setAttribute('width','10px');
    var context = canvas.getContext('2d');
    var cartoLayer=new SuperMap.CartoLayer('layerName',null,{
        hitContext:context
    });
    cartoLayer.addFeature(feature0);
    var layerIndex = 0;
    var cartoRender = new SuperMap.CartoRenderer();
    var hitColor=cartoRender.featureIdToHex(feature0.id,layerIndex);
    context.fillStyle = hitColor;
    context.moveTo(0,0);
    context.lineTo(2,0);
    context.lineTo(2,2);
    context.lineTo(0,2);
    context.closePath();
    context.fill();
    var featureInfo = cartoLayer.getFeatureInfo(1,1);
    equals(featureInfo.cartoLayer,cartoLayer,'cartoLayer');
    equals(featureInfo.feature,feature0,'cartoLayer');
});
test('testCartoLayer_addSymbolizer',function(){
    var cartoLayer=new SuperMap.CartoLayer('layerName',null,{});
    var symbol=new SuperMap.CartoSymbolizer(cartoLayer,null,null,
        {
            shader: null,
            useLayerInfo: true,
            layer:null,
            context:null,
            hitContext:null,
            cartoRenderer:null
        });
    cartoLayer.addSymbolizer(symbol);
    var cartoSymbol = cartoLayer.symbolizers.default[0];
    equals(cartoSymbol.cartoLayer.id,cartoLayer.id,'symbol.cartoLayer.id');
});
test('testCartoLayer_drawValidSymbolizers',function(){
    var map = new SuperMap.Map("map", {controls: [
                new SuperMap.Control.ScaleLine(),
                new SuperMap.Control.Zoom(),
                new SuperMap.Control.Navigation({
                    dragPanOptions: {
                        enableKinetic: true
                    }
                })]
            });
    var cartoCssStr="@color:#123;#layerName{line-width:1;}";
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
        options:{useLocalStorage:true,cartoCss:cartoCssStr}
    };
    var layer=new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    map.addLayer(layer);
    var cartoCss=new SuperMap.CartoCSS(cartoCssStr);
    var cartoLayer=new SuperMap.CartoLayer('layerName',null,{layer:layer});
    var canvas = document.createElement('canvas');
    canvas.setAttribute('height','10px');
    canvas.setAttribute('width','10px');
    var context = canvas.getContext('2d');
    var hitCanvas = document.createElement('canvas');
    hitCanvas.setAttribute('height','10px');
    hitCanvas.setAttribute('width','10px');
    var hitContext = hitCanvas.getContext('2d');
    var zoom = 7,
        scale = 0.0009729994647350198,
        style = {},
        symbolizer =new SuperMap.CartoSymbolizer(cartoLayer,null,null,
        {
            shader: cartoCss.shaders[0],
            useLayerInfo: false,
            layer:layer,
            context:context,
            hitContext:hitContext,
            cartoRenderer:null
        }),
        upperAttributes = {
        "SMUSERID":"0",
        "SMID":"1",
        "SMAREA":"1.6060069623493825E15",
        "SMPERIMETER":"1.6030006674231339E8",
        "FEATUREID":1
    },
        feature = feature0,
        type = 'REGION',
        fromServer=false;
    cartoLayer.addFeature(feature0);
    cartoLayer.drawValidSymbolizers([symbolizer],'default');
});
test('testCartoLayer_getDefaultStyle',function(){
    var cartoLayer=new SuperMap.CartoLayer('layerName',null,{});
    var style = {};
    var type = 'POINT';
    var defaultStyle = {
        pointFile:"",

        /*expand*/
        pointRadius:3,
        pointHaloRadius:1,
        pointHaloColor:"#c33",
        offsetX:0,
        offsetY:0,
        fillStyle:"#fc0",

        globalAlpha:1,
        globalCompositeOperation:"source-over",
        imageSmoothingEnabled:true
    };
    cartoLayer.getDefaultStyle(style,type);
    equals(style.pointFile,defaultStyle.pointFile,'pointFile');
    equals(style.pointRadius,defaultStyle.pointRadius,'pointRadius');
    equals(style.pointHaloRadius,defaultStyle.pointHaloRadius,'pointHaloRadius');
    equals(style.pointHaloColor,defaultStyle.pointHaloColor,'pointHaloColor');
    equals(style.offsetX,defaultStyle.offsetX,'offsetX');
    equals(style.offsetY,defaultStyle.offsetY,'offsetY');
    equals(style.fillStyle,defaultStyle.fillStyle,'fillStyle');
    equals(style.globalAlpha,defaultStyle.globalAlpha,'globalAlpha');
    equals(style.globalCompositeOperation,defaultStyle.globalCompositeOperation,'globalCompositeOperation');
    equals(style.imageSmoothingEnabled,defaultStyle.imageSmoothingEnabled,'imageSmoothingEnabled');
});

test('testCartoLayer_getValidStyleFromCarto',function(){
    var cartoCssStr="@color:#123;#layerName{line-width:1;}";
    var cartoCss=new SuperMap.CartoCSS(cartoCssStr);
    var cartoLayer=new SuperMap.CartoLayer('layerName',null,{});
    var zoom = 7,
        scale = 0.0009729994647350198,
        style = {},
        symbolizer =new SuperMap.CartoSymbolizer(cartoLayer,null,null,
        {
            shader: cartoCss.shaders[0],
            useLayerInfo: true,
            layer:null,
            context:null,
            hitContext:null,
            cartoRenderer:null
        }),
        upperAttributes = {
        "SMUSERID":"0",
        "SMID":"1",
        "SMAREA":"1.6060069623493825E15",
        "SMPERIMETER":"1.6030006674231339E8",
        "FEATUREID":1
    },
        feature = feature0,
        type = 'REGION',
        fromServer=false;
    cartoLayer.getValidStyleFromCarto(zoom,scale,style,symbolizer,upperAttributes, feature,type,fromServer);
    equals(style.lineWidth,1,'getValidStyleFromCarto_lineWidth');
});

test('testCartoLayer_getValidStyleFromLayerInfo',function(){
    var shader = {"fillBackOpaque":true,"lineWidth":0.1,"fillBackColor":{"red":255,"blue":255,"green":255,"alpha":255},"markerWidth":0,"markerAngle":0,"fillForeColor":{"red":13,"blue":143,"green":80,"alpha":255},"markerSize":0,"fillGradientOffsetRatioX":0,"fillGradientOffsetRatioY":0,"lineColor":{"red":0,"blue":0,"green":0,"alpha":255},"fillOpaqueRate":100,"markerHeight":0,"fillGradientMode":"NONE","fillSymbolID":0,"fillGradientAngle":0,"markerSymbolID":100,"lineSymbolID":0};
    var style = {};
    var feature = {"id":249,"searchValues":"东北电力设计院电力设备厂","attributes":{"SmX":"6132.352555","SmY":"-5333.811483","name":"东北电力设计院电力设备厂","SmUserID":"0","SmID":"249","Y":"-5333.811483","X":"6132.352555"},"geometry":{"cutEdges":null,"coordinateType":null,"parts":[1],"points":[102,211],"type":"POINT"},"style":{"pointFile":"","pointRadius":3,"pointHaloRadius":1,"pointHaloColor":"#c33","offsetX":0,"offsetY":0,"fillStyle":"#fc0","globalAlpha":1,"globalCompositeOperation":"source-over","imageSmoothingEnabled":true},"default":{"pointFile":"http://localhost:8090/iserver/services/map-changchun/rest/maps/长春市区图/symbol.png?transparent=true&resourceType=SYMBOLMARKER&picWidth=0&picHeight=0&style=%7B%22fillBackOpaque%22%3Atrue%2C%22lineWidth%22%3A0.1%2C%22fillBackColor%22%3A%7B%22red%22%3A255%2C%22blue%22%3A255%2C%22green%22%3A255%2C%22alpha%22%3A255%7D%2C%22markerWidth%22%3A0%2C%22markerAngle%22%3A0%2C%22fillForeColor%22%3A%7B%22red%22%3A13%2C%22blue%22%3A143%2C%22green%22%3A80%2C%22alpha%22%3A255%7D%2C%22markerSize%22%3A0%2C%22fillGradientOffsetRatioX%22%3A0%2C%22fillGradientOffsetRatioY%22%3A0%2C%22lineColor%22%3A%7B%22red%22%3A0%2C%22blue%22%3A0%2C%22green%22%3A0%2C%22alpha%22%3A255%7D%2C%22fillOpaqueRate%22%3A100%2C%22markerHeight%22%3A0%2C%22fillGradientMode%22%3A%22NONE%22%2C%22fillSymbolID%22%3A0%2C%22fillGradientAngle%22%3A0%2C%22markerSymbolID%22%3A100%2C%22lineSymbolID%22%3A0%7D","pointRadius":3,"pointHaloRadius":1,"pointHaloColor":"#c33","offsetX":0,"offsetY":0,"fillStyle":"#fc0","globalAlpha":1,"globalCompositeOperation":"source-over","imageSmoothingEnabled":true},"layerIndex":2};
    var type = 'POINT';
    var cartoLayer=new SuperMap.CartoLayer('layerName',null,{});
    cartoLayer.getValidStyleFromLayerInfo(style,{shader:shader,feature:type});
    equals(style.lineWidth,0.94488,'lineWidth');
});

test("testCartoLayer_destructor",function(){
    var cartoLayer=new SuperMap.CartoLayer();
    cartoLayer.destroy();
    equals(cartoLayer.tile,null,"Property:tile");
    equals(cartoLayer.layerName,null,"Property:layerName");
    equals(cartoLayer.id,null,"Property:id");
    equals(cartoLayer.className,null,"Property:className");
    equals(cartoLayer.index,null,"Property:index");
});