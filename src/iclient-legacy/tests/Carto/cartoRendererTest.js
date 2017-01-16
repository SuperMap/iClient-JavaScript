module("cartoRenderer");

test("TestCartoRenderer_Constructor", function() {
    expect(8);

    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        hitCanvas = document.createElement("canvas"),
        hitContext = canvas.getContext("2d"),
        options = {};
    var carto = new SuperMap.CartoRenderer(context, hitContext, options);

    equal(carto.CLASS_NAME, "SuperMap.CartoRenderer", "CartoRenderer_Constructor");
    ok(carto.context != null, "CartoRenderer_Constructor");
    ok(carto.hitContext != null, "CartoRenderer_Constructor");
    equal(carto.symbolizer, null, "CartoRenderer_Constructor");
    equal(carto.layer, null, "CartoRenderer_Constructor");
    equal( typeof carto.pointImagesInfo, "object", "CartoRenderer_Constructor");
    equal(carto.imagesBackup.length, 0, "CartoRenderer_Constructor");
    equal(carto.tempImage, null, "CartoRenderer_Constructor");
});

test("TestCartoRenderer_Destroy", function() {
    expect(4);

    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        hitCanvas = document.createElement("canvas"),
        hitContext = canvas.getContext("2d"),
        options = {};
    var carto = new SuperMap.CartoRenderer(context, hitContext, options);
    carto.destroy();

    equal(carto.context, null, "CartoRenderer_Destroy");
    equal(carto.symbolizer, null, "CartoRenderer_Destroy");
    equal(carto.pointImagesInfo, null, "CartoRenderer_Destroy");
    equal(carto.imagesBackup, null, "CartoRenderer_Destroy");
});

test("TestCartoRenderer_Support", function() {
    expect(1);

    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        hitCanvas = document.createElement("canvas"),
        hitContext = canvas.getContext("2d"),
        options = {};
    var carto = new SuperMap.CartoRenderer(context, hitContext, options);
    var isSupport = carto.supported();

    equal(isSupport, !!canvas.getContext, "CartoRenderer_Support");
});

test("TestCartoRenderer_ApplyStyle", function() {
    expect(2);

    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        hitCanvas = document.createElement("canvas"),
        hitContext = canvas.getContext("2d"),
        options = {};
    var carto = new SuperMap.CartoRenderer(context, hitContext, options);

    var can = document.createElement("canvas"), 
        ctx = canvas.getContext("2d"),
        style = {
            fillStyle: "#ababab",
            lineWidth: 5
        };

    carto.applyStyle(ctx, style);

    for(var st in style){
        equal(ctx[st], style[st], "CartoRenderer_ApplyStyle");
    }
});

test("TestCartoRenderer_DrawFeature", function() {
    expect(1);

    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        hitCanvas = document.createElement("canvas"),
        hitContext = canvas.getContext("2d"),
        options = {};
    var carto = new SuperMap.CartoRenderer(context, hitContext, options);

    var geo = new SuperMap.Geometry.Point(50, 50),
        feature = new SuperMap.Feature.Vector(geo),
        style = new SuperMap.Style(),
        layerType = "POINT";
    feature.layerIndex = 10;
    geo.type = "POINT";
    geo.points = [50, 50];

    var rendered = carto.drawFeature(feature, style, layerType);

    equal(rendered, true, "CartoRenderer_DrawFeature");
});

test("TestCartoRenderer_DrawGeometry", function() {
    expect(1);

    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        hitCanvas = document.createElement("canvas"),
        hitContext = canvas.getContext("2d"),
        options = {};
    var carto = new SuperMap.CartoRenderer(context, hitContext, options);

    var can = document.createElement("canvas"), 
        ctx = canvas.getContext("2d"),
        hitCan = document.createElement("canvas"), 
        hitCtx = canvas.getContext("2d"),
        geometry = new SuperMap.Geometry.Point(50, 50),
        style = new SuperMap.Style(),
        hitColor = carto.featureIdToHex("SuperMap.Feature.Vector_14", 10),
        attributs = {},
        layerType = "THEME";

    geometry.type = "TEXT";
    var drawed = carto.drawGeometry(ctx, hitCtx, geometry, style, hitColor, attributs, layerType);

    var geometry0 = new SuperMap.Geometry.MultiPoint([
        new SuperMap.Geometry.Point(50, 50),
        new SuperMap.Geometry.Point(100, 50),
        new SuperMap.Geometry.Point(10, 100)
    ]);
    geometry0.type = "POINT";
    geometry0.parts = [];
    var drawed = carto.drawGeometry(ctx, hitCtx, geometry0, style, hitColor, attributs, layerType);

    layerType = "";
    var geometry1 = new SuperMap.Geometry.LineString([
        new SuperMap.Geometry.Point(50, 50),
        new SuperMap.Geometry.Point(100, 50)
    ]);
    geometry1.type = "LINE";
    geometry1.parts = geometry1.components;
    geometry1.points = geometry1.components;
    var drawed = carto.drawGeometry(ctx, hitCtx, geometry1, style, hitColor, attributs, layerType);
    
    var geometry2 = new SuperMap.Geometry.Polygon([
        new SuperMap.Geometry.LinearRing([
            new SuperMap.Geometry.Point(50, 50),
            new SuperMap.Geometry.Point(100, 50),
            new SuperMap.Geometry.Point(10, 100)
        ])
    ]);
    geometry2.type = "REGION";
    geometry2.parts = geometry2.components;
    geometry2.points = geometry2.components;   
    var drawed = carto.drawGeometry(ctx, hitCtx, geometry2, style, hitColor, attributs, layerType); 

    equal(drawed, true, "CartoRenderer_DrawGeometry");
});

test("TestCartoRenderer_DrawText", function() {
    expect(4);

    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        hitCanvas = document.createElement("canvas"),
        hitContext = canvas.getContext("2d"),
        options = {};
    var carto = new SuperMap.CartoRenderer(context, hitContext, options);

    var can = document.createElement("canvas"), 
        ctx = canvas.getContext("2d"),
        hitCan = document.createElement("canvas"), 
        hitCtx = canvas.getContext("2d"),
        geometry = new SuperMap.Geometry.Point(50, 50),
        style = new SuperMap.Style(),
        attributes = {};

    geometry.texts = ["DDDDD", "EEEEEE"];
    geometry.parts = [1];
    geometry.points = [
        new SuperMap.Geometry.Point(50, 50),
        new SuperMap.Geometry.Point(100, 50),
        new SuperMap.Geometry.Point(10, 100),
        new SuperMap.Geometry.Point(100, 100)
    ]; 
    style.textName = "AAAAA";
    style.bold = true;
    style.rotation = 30;
    style.haloRadius = 5;
    style.backColor = "#ABABAB";
    style.foreColor = "#FFFFFF";
    style.textHeight = 10;
    style.fontWeight = 700;

    var drawed = carto.drawText(ctx, hitCtx, geometry, style, attributes);

    equal(drawed, true, "CartoRenderer_DrawText");
    equal(style.fontWeight, 700, "CartoRenderer_DrawText");
    equal(ctx.strokeStyle, "#000000", "CartoRenderer_DrawText");
    equal(ctx.fillStyle, "#000000", "CartoRenderer_DrawText");
});

test("TestCartoRenderer_DrawPoint", function() {
    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        hitCanvas = document.createElement("canvas"),
        hitContext = canvas.getContext("2d"),
        options = {};
    var carto = new SuperMap.CartoRenderer(context, hitContext, options);

    var can = document.createElement("canvas"), 
        ctx = canvas.getContext("2d"),
        hitCan = document.createElement("canvas"), 
        hitCtx = canvas.getContext("2d"),
        geometry = {
            points: [
                new SuperMap.Geometry.Point(50, 50),
                new SuperMap.Geometry.Point(50, 50)
                ]
        },
        style = new SuperMap.Style();

    var drawed = carto.drawPoint(ctx, hitCtx, geometry, style);

    equal(drawed, true, "CartoRenderer_DrawText");
    equal(ctx.lineWidth, 1, "CartoRenderer_DrawText");
    equal(ctx.strokeStyle, "#cc3333", "CartoRenderer_DrawText");
    equal(ctx.fillStyle, "#ffcc00", "CartoRenderer_DrawText");
});

test("TestCartoRenderer_DrawImagePoint", function() {
    expect(5);

    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        hitCanvas = document.createElement("canvas"),
        hitContext = canvas.getContext("2d"),
        options = {};
    var carto = new SuperMap.CartoRenderer(context, hitContext, options);

    var can = document.createElement("canvas"), 
        ctx = canvas.getContext("2d"),
        hitCan = document.createElement("canvas"), 
        hitCtx = canvas.getContext("2d"),
        style = new SuperMap.Style(),
        x = 50, y = 50;
    
    style.pointFile = "Images/Day.jpg";
    style.imageSmoothingEnabled = null;
    carto.layer = {
        map: {
            getZoom: function() {
                return 5;
            }
        }
    };
    carto.drawImagePoint(ctx, hitCtx, style, x, y);

    equal(ctx.globalAlpha, 1, "CartoRenderer_DrawImagePoint");
    equal(ctx.globalCompositeOperation, "source-over", "CartoRenderer_DrawImagePoint");

    style.pointFile = "Images/Day.png";
    carto.drawImagePoint(ctx, hitCtx, style, x, y);
    equal(ctx.lineWidth, 1, "CartoRenderer_DrawImagePoint");
    equal(ctx.strokeStyle, "#000000", "CartoRenderer_DrawImagePoint");
    equal(ctx.fillStyle, "#000000", "CartoRenderer_DrawImagePoint");
});

test("TestCartoRenderer_DrawVectorPoint", function() {
    expect(0);

    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        hitCanvas = document.createElement("canvas"),
        hitContext = canvas.getContext("2d"),
        options = {};
    var carto = new SuperMap.CartoRenderer(context, hitContext, options);

    var can = document.createElement("canvas"), 
        ctx = canvas.getContext("2d"),
        W = 100, H = 50, x = 50, y = 50;

    carto.drawVectorPoint(ctx, W, H, x, y);
});

test("TestCartoRenderer_DrawLine", function() {
    expect(12);

    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        hitCanvas = document.createElement("canvas"),
        hitContext = canvas.getContext("2d"),
        options = {};
    var carto = new SuperMap.CartoRenderer(context, hitContext, options);

    var can = document.createElement("canvas"), 
        ctx = canvas.getContext("2d"),
        hitCan = document.createElement("canvas"), 
        hitCtx = canvas.getContext("2d"),
        geometry = new SuperMap.Geometry.LineString([
            new SuperMap.Geometry.Point(50, 50),
            new SuperMap.Geometry.Point(100, 50)
        ]),
        style = new SuperMap.Style(),
        isRegion = true;

    style.offset = {
        x: 0,
        y: 0
    };
    style.lineDashOffset = 0;
    geometry.points = geometry.components;
    geometry.parts = [2, 2];   
    var drawed = carto.drawLine(ctx, hitCtx, geometry, style, isRegion);

    equal(style.offset.x, 0, "CartoRenderer_DrawLine");
    equal(style.offset.y, 0, "CartoRenderer_DrawLine");
    equal(hitCtx.globalCompositeOperation, "xor", "CartoRenderer_DrawLine");
    equal(ctx.globalCompositeOperation, "xor", "CartoRenderer_DrawLine");
    equal(drawed, true, "CartoRenderer_DrawLine");

    style.lineDasharray = [1, 2, 1];
    style.strokeOpacity = 0.5;
    style.fillOpacity = 0.8;
    style.lineOpacity = 0.2;
    var drawed1 = carto.drawLine(ctx, hitCtx, geometry, style, isRegion);

    //equal(ctx.lineDashOffset, 0, "CartoRenderer_DrawLine");
    equal(drawed1, true, "CartoRenderer_DrawLine");

    ctx.setLineDash = false;
    isRegion = false;
    var drawed2 = carto.drawLine(ctx, hitCtx, geometry, style, isRegion);

    equal(style.offset.x, 0, "CartoRenderer_DrawLine");
    equal(style.offset.y, 0, "CartoRenderer_DrawLine");
    equal(hitCtx.globalCompositeOperation, "xor", "CartoRenderer_DrawLine");
    equal(ctx.globalCompositeOperation, "xor", "CartoRenderer_DrawLine");
    equal(ctx.globalAlpha, 0.5, "CartoRenderer_DrawLine");
    equal(drawed2, true, "CartoRenderer_DrawLine");
});

test("TestCartoRenderer_DrawDotedLine", function() {
    expect(1);

    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        hitCanvas = document.createElement("canvas"),
        hitContext = canvas.getContext("2d"),
        options = {};
    var carto = new SuperMap.CartoRenderer(context, hitContext, options);

    var can = document.createElement("canvas"), 
        ctx = canvas.getContext("2d"),
        hitCan = document.createElement("canvas"), 
        hitCtx = canvas.getContext("2d"),
        points = [
            new SuperMap.Geometry.Point(50, 50),
            new SuperMap.Geometry.Point(100, 50),
            new SuperMap.Geometry.Point(100, 100)
        ],
        startIndex = 0,
        length = 2,
        style = new SuperMap.Style(),
        isRegion = true,
        noLine = false;

    style.fillOpacity = 0.5;
    style.strokeOpacity = 0.8;
    style.offset = {};

    carto.drawDotedLine(ctx, hitCtx, points, startIndex, length, style, isRegion, noLine);

    equal(ctx.globalAlpha, 0.5, "CartoRenderer_DrawDotedLine");
});