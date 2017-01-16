module('Canvas2');

var containerID = "Canvas2";
var layer = null;
function initContainer() {
    layer = new SuperMap.Layer.Vector("vector");
    var container = document.createElement("div");
    container.setAttribute("id", containerID);
    document.body.appendChild(container);
}

test("Canvas2Test_Constructor", function() {
    expect(21);

    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);

    equal(canvas2.CLASS_NAME, "SuperMap.Renderer.Canvas2", "Canvas2_Constructor");
    equal(canvas2.hitDetection, true, "Canvas2_Constructor");
    equal(canvas2.hitOverflow, 0, "Canvas2_Constructor");
    equal(canvas2.root.tagName, "CANVAS", "Canvas2_Constructor");
    ok(canvas2.canvas != null, "Canvas2_Constructor");
    equal(typeof canvas2.features, "object", "Canvas2_Constructor");
    equal(canvas2.pendingRedraw, false, "Canvas2_Constructor");
    equal(typeof canvas2.cachedSymbolBounds, "object", "Canvas2_Constructor");
    equal(canvas2.backCanvas.tagName, "CANVAS", "Canvas2_Constructor");
    ok(canvas2.backCanvasContext != null, "Canvas2_Constructor");
    equal(canvas2.lastBounds, null, "Canvas2_Constructor");
    equal(canvas2.backCanvasPosition, null, "Canvas2_Constructor");
    equal(canvas2.hitCanvasBack.tagName, "CANVAS", "Canvas2_Constructor");
    ok(canvas2.hitContextBack != null, "Canvas2_Constructor");
    equal(canvas2.featuresIds.length, 0, "Canvas2_Constructor");
    equal(typeof canvas2.selectFeatures, "object", "Canvas2_Constructor");
    equal(canvas2.transitionObj.CLASS_NAME, "SuperMap.Animal2", "Canvas2_Constructor");
    equal(canvas2.externalGraphicCount, null, "Canvas2_Constructor");
    equal(canvas2.labelMap, null, "Canvas2_Constructor");
    equal(canvas2.polygonCanvas.tagName, "CANVAS", "Canvas2_Constructor");
    ok(canvas2.polygonContext != null, "Canvas2_Constructor");
});

test("Canvas2Test_SetExtent", function() {
    expect(5);

    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);
    canvas2.size = new SuperMap.Size(1000, 700);
    canvas2.map = new SuperMap.Map("map");

    var resolutionChanged = true,
        extent = new SuperMap.Bounds(0, 150, 100, 0);
    var result = canvas2.setExtent(extent, resolutionChanged);

    equal(canvas2.lastBounds.left, 0, "Canvas2_setExtent");
    equal(canvas2.lastBounds.top, 0, "Canvas2_setExtent");
    equal(canvas2.lastBounds.right, 100, "Canvas2_setExtent");
    equal(canvas2.lastBounds.bottom, 150, "Canvas2_setExtent");
    equal(result, false, "Canvas2_setExtent");
});

test("Canvas2Test_setResolution", function() {
    expect(1);

    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);

    canvas2.setResolution(0.0000025);

    equal(canvas2.resolution, 0.0000025, "Canvas2_setResolution"); 
});

test("Canvas2Test_RestoreCanvas", function() {
    expect(2);

    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);
    canvas2.size = new SuperMap.Size(1000, 700);
    canvas2.container.style.left = "100px";
    canvas2.container.style.top = "100px";

    canvas2.restoreCanvas();
    equal(canvas2.backCanvasPosition.x, 100, "Canvas2_RestoreCanvas");
    equal(canvas2.backCanvasPosition.y, 100, "Canvas2_RestoreCanvas");
});

test("Canvas2Test_ResetCanvas", function() {
    expect(0);

    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);
    canvas2.size = new SuperMap.Size(1000, 700);

    canvas2.resetCanvas();
});

test("Canvas2Test_EraseGeometry", function() {
    expect(1);

    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);
    canvas2.map = new SuperMap.Map("map");
    canvas2.setExtent(new SuperMap.Bounds(0, 0, 500, 500));
    canvas2.size = new SuperMap.Size(1000, 700);
    canvas2.container.style.left = "100px";
    canvas2.container.style.top = "100px";

    var geo = new SuperMap.Geometry.Point(50, 50),
        feature = new SuperMap.Feature.Vector(geo);
    canvas2.layer = layer;
    canvas2.layer.addFeatures([feature]);
    canvas2.features[feature.id] = [feature, new SuperMap.Style()];
    canvas2.selectFeatures[feature.id] = [feature, new SuperMap.Style()];

    window.startRow = 0;
    window.endRow = 0;
    window.startCol = 0;
    window.endCol = 0;    

    canvas2.eraseGeometry(feature.geometry.clone(), feature.id);

    equal(canvas2.canvas.globalCompositeOperation, "source-over", "Canvas2_EraseGeometry");
});

test("Canvas2Test_CalculateFeatureDx", function() {
    expect(1);

    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);
    canvas2.map = new SuperMap.Map("map");
    canvas2.setExtent(new SuperMap.Bounds(0, 0, 500, 500));

    var bounds = new SuperMap.Bounds(0, 0, 50, 50),
        worldBounds = new SuperMap.Bounds(-180, -90, 90, 180);
    
    canvas2.calculateFeatureDx(bounds, worldBounds);

    equal(canvas2.featureDx, -270, "canvas2_CalculateFeatureDx");
});

test("Canvas2Test_Supported", function() {
    expect(1);

    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);

    var canvas = document.createElement("canvas");

    var isSupported = canvas2.supported();

    equal(isSupported, !!canvas.getContext, "Canvas2_Supported");
});

test("Canvas2Test_SetSize", function() {
    expect(16);

    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);
    var size = new SuperMap.Size(100, 500);

    canvas2.setSize(size);

    equal(canvas2.size.w, 100, "Canvas2_SetSize");
    equal(canvas2.size.h, 500, "Canvas2_SetSize");
    equal(canvas2.root.style.width, "100px", "Canvas2_SetSize");
    equal(canvas2.root.style.height, "500px", "Canvas2_SetSize");
    equal(canvas2.backCanvas.width, 100, "Canvas2_SetSize");
    equal(canvas2.backCanvas.height, 500, "Canvas2_SetSize");
    equal(canvas2.backCanvas.style.width, "100px", "Canvas2_SetSize");
    equal(canvas2.backCanvas.style.height, "500px", "Canvas2_SetSize");
    equal(canvas2.hitCanvasBack.width, 100, "Canvas2_SetSize");
    equal(canvas2.hitCanvasBack.height, 500, "Canvas2_SetSize");
    equal(canvas2.hitCanvasBack.style.width, "100px", "Canvas2_SetSize");
    equal(canvas2.hitCanvasBack.style.height, "500px", "Canvas2_SetSize");
    equal(canvas2.polygonCanvas.width, 100, "Canvas2_SetSize");
    equal(canvas2.polygonCanvas.height, 500, "Canvas2_SetSize");
    equal(canvas2.polygonCanvas.style.width, "100px", "Canvas2_SetSize");
    equal(canvas2.polygonCanvas.style.height, "500px", "Canvas2_SetSize");
});

test("Canvas2Test_GetPointBounds", function() {
    expect(12);

    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);

    var geo = new SuperMap.Geometry.Point(50, 50),
        feature = new SuperMap.Feature.Vector(geo),
        style = new SuperMap.Style(),
        resolution = 0.0000025;

    style.externalGraphic = false;
    var bounds = canvas2.getPointBounds(feature, style, resolution);
    equal(bounds.left, 50, "Canvas2_GetPointBounds");
    equal(bounds.top, 50, "Canvas2_GetPointBounds");
    equal(bounds.right, 50, "Canvas2_GetPointBounds");
    equal(bounds.bottom, 50, "Canvas2_GetPointBounds");

    style.externalGraphic = true;
    style.rotation = 30;
    style.graphicWidth = 5;
    style.graphicHeight = 5;
    var bounds1 = canvas2.getPointBounds(feature, style, resolution);
    equal(bounds1.left, 49.999991462341, "Canvas2_GetPointBounds");
    equal(bounds1.top, 50.000008537659, "Canvas2_GetPointBounds");
    equal(bounds1.right, 50.000008537659, "Canvas2_GetPointBounds");
    equal(bounds1.bottom, 49.999991462341, "Canvas2_GetPointBounds");

    style.rotation = 0;
    var bounds2 = canvas2.getPointBounds(feature, style, resolution);
    equal(bounds2.left, 49.99999375, "Canvas2_GetPointBounds");
    equal(bounds2.top, 50.00000625, "Canvas2_GetPointBounds");
    equal(bounds2.right, 50.00000625, "Canvas2_GetPointBounds");
    equal(bounds2.bottom, 49.99999375, "Canvas2_GetPointBounds");
});

test("Canvas2Test_DrawFeature", function() {
    expect(2);

    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);
    canvas2.map = new SuperMap.Map("map");
    canvas2.setExtent(new SuperMap.Bounds(0, 0, 500, 500));
    canvas2.setSize(new SuperMap.Size(100, 500));
    canvas2.backCanvasPosition = new SuperMap.Pixel(0, 0);

    var geo = new SuperMap.Geometry.Point(50, 50),
        feature = new SuperMap.Feature.Vector(geo),
        style = new SuperMap.Style(),
        option = {};

    var rendered = canvas2.drawFeature(feature, style, option);

    equal(rendered, false, "Canvas2_DrawFeature");
    equal(canvas2.pendingRedraw, false, "Canvas2_DrawFeature");
});

test("Canvas2Test_SetCanvasStyle", function() {
    expect(10);

    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);

    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        type = "fill",
        style = new SuperMap.Style();

    canvas2.setCanvasStyle(context, type, style);
    equal(context.globalAlpha, 1, "Canvas2_SetCanvasStyle");
    equal(context.fillStyle, "#000000", "Canvas2_SetCanvasStyle");

    type = "stroke";
    canvas2.setCanvasStyle(context, type, style);
    equal(context.globalAlpha, 1, "Canvas2_SetCanvasStyle");
    equal(context.lineCap, "butt", "Canvas2_SetCanvasStyle");
    equal(context.strokeStyle, "#000000", "Canvas2_SetCanvasStyle");
    equal(context.lineWidth, 1, "Canvas2_SetCanvasStyle");

    type = "clear";
    canvas2.setCanvasStyle(context, type, style);
    equal(context.globalAlpha, 1, "Canvas2_SetCanvasStyle");
    equal(context.fillStyle, "#ffffff", "Canvas2_SetCanvasStyle");

    type = "";
    canvas2.setCanvasStyle(context, type, style);
    equal(context.globalAlpha, 1, "Canvas2_SetCanvasStyle");
    equal(context.lineWidth, 1, "Canvas2_SetCanvasStyle");
});

test("Canvas2Test_SetHitContextStyle", function() {
    expect(7);

    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);

    var type = "fill",
        featureId = "SuperMap.Feature.Vector_20",
        symbolizer = new SuperMap.Symbolizer();

    canvas2.setHitContextStyle(type, featureId, symbolizer);
    equal(canvas2.hitContext.globalAlpha, 1.0, "Canvas2_setHitContextStyle");
    equal(canvas2.hitContext.fillStyle, "#000015", "Canvas2_setHitContextStyle");

    type = "stroke";
    canvas2.setHitContextStyle(type, featureId, symbolizer);
    equal(canvas2.hitContext.globalAlpha, 1.0, "Canvas2_setHitContextStyle");
    equal(canvas2.hitContext.fillStyle, "#000015", "Canvas2_setHitContextStyle");
    equal(canvas2.hitContext.lineWidth, 1, "Canvas2_setHitContextStyle");

    type = "";
    canvas2.setHitContextStyle(type, featureId, symbolizer);
    equal(canvas2.hitContext.globalAlpha, 1, "Canvas2_setHitContextStyle");
    equal(canvas2.hitContext.lineWidth, 1, "Canvas2_setHitContextStyle");
});

test("Canvas2Test_FeatureIdToHex", function() {
    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);
    var featureId = featureId = "SuperMap.Feature.Vector_17777216";

    var hex = canvas2.featureIdToHex(featureId);

    equal(hex, "#0f4242", "Canvas2_FeatureIdToHex");
});

test("Canvas2Test_DrawGeometry", function() {
    expect(1);

    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);
    canvas2.map = new SuperMap.Map("map");
    canvas2.map.getResolution = function() {
        return "0.00000025";
    }
    canvas2.extent = new SuperMap.Bounds(-180, -90, 180, 90);

    var geometry  = new SuperMap.Geometry.MultiPoint([
            new SuperMap.Geometry.Point(0, 0),
            new SuperMap.Geometry.Point(50, 50)
        ]),
        style = new SuperMap.Style(),
        feature = new SuperMap.Feature.Vector(geometry);
    style.fillOpacity = 0.5;
    canvas2.selectFeatures[feature.id] = [feature, style];
    canvas2.features[feature.id] = [feature, style];

    canvas2.drawGeometry(geometry, style, feature.id);

    var geometry1 = new SuperMap.Geometry.LinearRing([
        new SuperMap.Geometry.Point(0, 0),
        new SuperMap.Geometry.Point(50, 50),
        new SuperMap.Geometry.Point(100, 50)
    ]);
    var feature1 = new SuperMap.Feature.Vector(geometry1);
    canvas2.selectFeatures[feature1.id] = [feature1, style];
    canvas2.features[feature1.id] = [feature1, style];
    canvas2.drawGeometry(geometry1, style, feature1.id);

    var geometry2 = new SuperMap.Geometry.LineString([
        new SuperMap.Geometry.Point(0, 0),
        new SuperMap.Geometry.Point(50, 50),
        new SuperMap.Geometry.Point(100, 50)
    ]);
    var feature2 = new SuperMap.Feature.Vector(geometry2);
    canvas2.selectFeatures[feature2.id] = [feature2, style];
    canvas2.features[feature2.id] = [feature2, style];
    canvas2.drawGeometry(geometry2, style, feature2.id);
    
    var geometry3 = new SuperMap.Geometry.Polygon([
        new SuperMap.Geometry.LinearRing([
            new SuperMap.Geometry.Point(0, 0),
            new SuperMap.Geometry.Point(50, 50),
            new SuperMap.Geometry.Point(100, 50)
        ])
    ]); 
    var feature3 = new SuperMap.Feature.Vector(geometry3);
    canvas2.selectFeatures[feature3.id] = [feature3, style];
    canvas2.features[feature3.id] = [feature3, style];
    canvas2.drawGeometry(geometry3, style, feature3.id);

    equal(style.fillOpacity, 0.5, "Canvas2_DrawGeometry");

    var geometry4 = new SuperMap.Geometry.Rectangle([
            new SuperMap.Geometry.Point(0, 0),
            new SuperMap.Geometry.Point(50, 50),
            new SuperMap.Geometry.Point(100, 50),
            new SuperMap.Geometry.Point(500, 50)
    ]); 
    var feature4 = new SuperMap.Feature.Vector(geometry4);
    canvas2.selectFeatures[feature4.id] = [feature4, style];
    canvas2.features[feature4.id] = [feature4, style];
    canvas2.drawGeometry(geometry4, style, feature4.id);
});

test("Canvas2Test_DrawExternalGraphic", function() {
    expect(1);

    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);

    var geometry = new SuperMap.Geometry.Point(50, 50),
        style = new SuperMap.Style();
    var feature = new SuperMap.Feature.Vector(geometry),
        featureId = feature.id;
    style.graphicTitle = "img";
    style.graphicWidth = 10;
    style.graphicHeight = 10;
    style.rotation = "30";
    style.externalGraphicSource = new Image();

    canvas2.selectFeatures[featureId] = [feature, style];
    canvas2.externalGraphicCount = 0;
    canvas2.map = new SuperMap.Map("map");
    canvas2.map.getResolution = function() {
        return "0.00000025";
    }
    canvas2.extent = new SuperMap.Bounds(-180, -90, 180, 90);

    canvas2.drawExternalGraphic(geometry, style, featureId);

    equal(canvas2.externalGraphicCount, 0, "Canvas2_DrawExternalGraphic");
});

test("Canvas2Test_DrawPoint", function() {
    expect(1);

    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);

    var geometry = new SuperMap.Geometry.Point(50, 50),
        style = new SuperMap.Style();
    var feature = new SuperMap.Feature.Vector(geometry),
        featureId = feature.id;

    style.graphic = true;
    style.stroke = "butt";
    style.fill = "#FFFFFF";
    style.pointRadius = 5;

    canvas2.map = new SuperMap.Map("map");
    canvas2.map.getResolution = function() {
        return "0.00000025";
    }
    canvas2.extent = new SuperMap.Bounds(-180, -90, 180, 90);

    canvas2.drawPoint(geometry, style, featureId);

    equal(canvas2.canvas.lineCap, style.stroke, "Canvas2_DrawPoint");
});

test("Canvas2Test_DrawNamedSymbol", function() {
    initContainer();
    var canvas2 = new SuperMap.Renderer.Canvas2(containerID, "", layer);

    var geometry = new SuperMap.Geometry.Point(50, 50),
        style = new SuperMap.Style();
    var feature = new SuperMap.Feature.Vector(geometry),
        featureId = feature.id;
    
    style.graphicName = "star";
    style.rotation = 30;
    style.pointRadius = 2;
    style.strokeWidth = 2;
    style.fill = "#FFFFFF";
    style.stroke = "butt";

    canvas2.cachedSymbolBounds = {};
    canvas2.map = new SuperMap.Map("map");
    canvas2.map.getResolution = function() {
        return "0.00000025";
    }
    canvas2.extent = new SuperMap.Bounds(-180, -90, 180, 90);


    canvas2.drawNamedSymbol(geometry, style, featureId);

    equal(canvas2.canvas.lineCap, "round", "Canvas2_DrawNamedSymbol");
    equal(canvas2.canvas.lineJoin, "round", "Canvas2_DrawNamedSymbol");
    equal(canvas2.hitContext.lineCap, "round", "Canvas2_DrawNamedSymbol");
    equal(canvas2.hitContext.lineJoin, "round", "Canvas2_DrawNamedSymbol");
    equal(canvas2.cachedSymbolBounds[style.graphicName].left, 231, "Canvas2_DrawNamedSymbol");
    equal(canvas2.cachedSymbolBounds[style.graphicName].top, 301, "Canvas2_DrawNamedSymbol");
    equal(canvas2.cachedSymbolBounds[style.graphicName].right, 469, "Canvas2_DrawNamedSymbol");
    equal(canvas2.cachedSymbolBounds[style.graphicName].bottom, 75, "Canvas2_DrawNamedSymbol");
    equal(style.strokeWidth, 2, "Canvas2_DrawNamedSymbol");   
});
