module("VML");

test("VMLTest_Constructor", function() {
    expect(4);

    var vml = new SuperMap.Renderer.VML();
    var symbolCache = {};
    equal(vml.CLASS_NAME, "SuperMap.Renderer.VML", "VML_Constructor");
    equal(vml.xmlns, "urn:schemas-microsoft-com:vml", "VML_Constructor");
    equal(vml.offset, null, "VML_Constructor");
    equal(vml.symbolCache.toString(), symbolCache.toString(), "VML_Constructor");
});

test("VMLTest_Supported", function() {
    expect(1);

    var vml = new SuperMap.Renderer.VML();
    equal(vml.supported(), !!document.namespaces, "VML_Supported");
});

test("VMLTest_SetExtent", function() {
    expect(12);

    var vml = new SuperMap.Renderer.VML(),
        extent = new SuperMap.Bounds(10, 10, 500, 500),
        resolutionChanged = true;
    var name="Image",
        url="Images/Day.jpg",
        bounds= new SuperMap.Bounds(-180, -90, 180, 90),
        layer=new SuperMap.Layer.Image(name,url,bounds);
    layer.isBaseLayer = true;
    var map = new SuperMap.Map("map");
    map.addLayer(layer);
    vml.map = map;
    vml.size = {
        w: 1000,
        h: 600
    };
    vml.root = {
        coordorigin: "",
        style: {
            flip: ""
        }
    };
    vml.vectorRoot = {
        coordorigin: ""
    };
    vml.textRoot = {
        coordorigin: ""
    };
    var isSucceed = vml.setExtent(extent, resolutionChanged);
    equal(isSucceed, true, "VML_SetExtent");
    equal(vml.root.style.flip, "y", "VML_SetExtent");
    equal(vml.root.coordorigin, "0 0", "VML_SetExtent");
    equal(vml.root.coordsize, "1000 600", "VML_SetExtent");
    equal(vml.vectorRoot.coordsize, "1000 600", "VML_SetExtent");
    equal(vml.textRoot.coordsize, "1000 600", "VML_SetExtent");

    var resolutionChanged1 = false;
    vml.offset = {
        "x": 10,
        "y": 10
    };
    var isSucceed1 = vml.setExtent(extent, resolutionChanged1);
    equal(isSucceed1, true, "VML_SetExtent");
    equal(vml.root.style.flip, "y", "VML_SetExtent");
    equal(vml.root.coordorigin, "-3 -254", "VML_SetExtent");
    equal(vml.root.coordsize, "1000 600", "VML_SetExtent");
    equal(vml.vectorRoot.coordsize, "1000 600", "VML_SetExtent");
    equal(vml.textRoot.coordsize, "1000 600", "VML_SetExtent");
});

test("VMLTest_SetSize", function() {
    expect(12);

    var vml = new SuperMap.Renderer.VML(),
        size = new SuperMap.Size(100, 500);
    vml.root = {
        coordorigin: "",
        style: {
            flip: "",
            width: ""
        }
    };
    vml.vectorRoot = {
        coordorigin: "",
        style: {
            flip: "",
            width: ""
        }
    };
    vml.textRoot = {
        coordorigin: "",
        style: {
            flip: "",
            width: ""
        }
    };
    vml.rendererRoot = {
        style: {
            flip: "",
            width: ""
        }
    };
    vml.setSize(size);
    equal(vml.size.CLASS_NAME, "SuperMap.Size", "VML_SetSize");
    equal(vml.size.w, 100, "VML_SetSize");
    equal(vml.size.h, 500, "VML_SetSize");
    equal(vml.resolution, null, "VML_SetSize");
    equal(vml.rendererRoot.style.width, "100px", "VML_SetSize");
    equal(vml.rendererRoot.style.height, "500px", "VML_SetSize");
    equal(vml.root.style.width, "100px", "VML_SetSize");
    equal(vml.root.style.height, "500px", "VML_SetSize");
    equal(vml.vectorRoot.style.width, "100px", "VML_SetSize");
    equal(vml.vectorRoot.style.height, "500px", "VML_SetSize");
    equal(vml.textRoot.style.width, "100px", "VML_SetSize");
    equal(vml.textRoot.style.height, "500px", "VML_SetSize");
});

test("VMLTest_GetNodeType", function() {
    expect(8);

    var vml = new SuperMap.Renderer.VML();
    var points=[
        new SuperMap.Geometry.Point(0,29.4),
        new SuperMap.Geometry.Point(-50,39.4),
        new SuperMap.Geometry.Point(-30,19.4),
        new SuperMap.Geometry.Point(100,49.4)
    ];
    var geomerty =  new SuperMap.Geometry.LineString(points),
        style = "";
    var nodeType = vml.getNodeType(geomerty, style);
    equal(nodeType, "olv:shape", "VML_GetNodeType");

    geomerty =  new SuperMap.Geometry.LinearRing(points);
    nodeType = vml.getNodeType(geomerty, style);
    equal(nodeType, "olv:shape", "VML_GetNodeType");

    geomerty =  new SuperMap.Geometry.Curve(points);
    nodeType = vml.getNodeType(geomerty, style);
    equal(nodeType, "olv:shape", "VML_GetNodeType");

    geomerty =  new SuperMap.Geometry.Polygon(points);
    nodeType = vml.getNodeType(geomerty, style);
    equal(nodeType, "olv:shape", "VML_GetNodeType");

    geomerty =  new SuperMap.Geometry.Point(10, 20);
    nodeType = vml.getNodeType(geomerty, style);
    equal(nodeType, "olv:oval", "VML_GetNodeType");

    geomerty =  new SuperMap.Geometry.Point(10, 20);
    style = {
        "externalGraphic": true
    };
    nodeType = vml.getNodeType(geomerty, style);
    equal(nodeType, "olv:rect", "VML_GetNodeType");

    geomerty =  new SuperMap.Geometry.Point(10, 20);
    style = {
        "graphicName": "123456"
    };
    nodeType = vml.getNodeType(geomerty, style);
    equal(nodeType, "olv:shape", "VML_GetNodeType");

    geomerty =  new SuperMap.Geometry.Rectangle(10, 20);
    nodeType = vml.getNodeType(geomerty, style);
    equal(nodeType, "olv:rect", "VML_GetNodeType");
});

test("VMLTest_SetStyle", function() {
    expect(16);

    var vml = new SuperMap.Renderer.VML();
    var node = {
        "_geometryClass": "SuperMap.Geometry.Point",
        "style": {
            "left": "",
            "top": "",
            "width": "",
            "height": "",
            "flip": ""
        },
        "path": "",
        "coordorigin": "",
        "coordsize": "",
        "stroked": "",
        "_rotation": 30,
        "fillColor": "",
        "filled": "",
        "title": ""
        },
        style = {
            "cursor": "123",
            "externalGraphic": "111",
            "fillGradientMode": "LINEAR",
            "graphicTitle": "VML",
            "graphicWidth": 100,
            "graphicHeight": 500,
            "rotation": 60,
            "fillColor2": "",
            "graphicOpacity": 0.5
        },
        options = {
            "isStroked": false,
            "isFilled": false,
            "fillColor": ""
        },
        geometry =  new SuperMap.Geometry.Point(10, 20);
    node.getElementsByTagName = function() {
        return {
            "length": 0
        };
    };
    node.appendChild = function () {

    };
    var name="Image",
        url="Images/Day.jpg",
        bounds= new SuperMap.Bounds(-180, -90, 180, 90),
        layer=new SuperMap.Layer.Image(name,url,bounds);
    layer.isBaseLayer = true;
    var map = new SuperMap.Map("map");
    map.addLayer(layer);
    vml.map = map;
    vml.offset = {
        "x": 20,
        "y": 50
    };
    vml.setStyle(node, style, options, geometry);
    equal(node.style.left, "-254px", "VML_SetStyle");
    equal(node.style.top, "-367px", "VML_SetStyle");
    equal(node.style.width, "100px", "VML_SetStyle");
    equal(node.style.height, "500px", "VML_SetStyle");
    equal(node.style.flip, "y", "VML_SetStyle");
    equal(node._rotation, 60, "VML_SetStyle");
    equal(node.fillColor, "", "VML_SetStyle");
    equal(node.filled, "", "VML_SetStyle");
    equal(node.title, "VML", "VML_SetStyle");
    equal(node.style.cursor, "123", "VML_SetStyle");

    style.graphicName = "star";
    style.externalGraphic = false;
    vml.container = document.createElement("div");
    vml.container.setAttribute("id", "root");
    vml.setStyle(node, style, options, geometry);
    equal(node.style.flip, "y", "VML_SetStyle");
    equal(node.path, "m 350 75 l 379 161 469 161 397 215 423 301 350 250 277 301 303 215 231 161 321 161 350 75 x e", "VML_SetStyle");
    equal(node.coordorigin, "231,69", "VML_SetStyle");
    equal(node.coordsize, "238,238", "VML_SetStyle");
    equal(node.stroked, false, "VML_SetStyle");
    equal(node._rotation, 60, "VML_SetStyle");
});

test("VMLTest_GraphicRotate", function() {
    expect(4);

    var vml = new SuperMap.Renderer.VML();
    var node = {
            "_geometryClass": "SuperMap.Geometry.Point",
            "style": {
                "left": "20",
                "top": "40",
                "width": "",
                "height": "",
                "flip": ""
            },
            "path": "",
            "coordorigin": "",
            "coordsize": "",
            "stroked": "",
            "_rotation": 30,
            "fillColor": "",
            "filled": "",
            "title": ""
        },
        style = {
            "cursor": "123",
            "externalGraphic": "111",
            "fillGradientMode": "LINEAR",
            "graphicTitle": "VML",
            "graphicWidth": 100,
            "graphicHeight": 500,
            "rotation": 60,
            "fillColor2": "",
            "graphicOpacity": 0.5
        },
        xOffset = 10,
        yOffset = 20;
    node.appendChild = function () {

    };
    vml.graphicRotate(node, xOffset, yOffset, style);
    equal(node.style.left, "-435px", "VML_GraphicRotate");
    equal(node.style.top, "41px", "VML_GraphicRotate");
    equal(node.style.width, "100px", "VML_GraphicRotate");
    equal(node.style.height, "500px", "VML_GraphicRotate");
});

test("VMLTest_PostDraw", function() {
    expect(3);

    var vml = new SuperMap.Renderer.VML();
    var node = {
        "fillcolor": "#FFFFFF",
        "strokecolor": "#000000",
        "_style": {
            "fillColor": "none",
            "strokeColor": "none"
        },
        "style": {
            "visibility": ""
        }
    };
    vml.postDraw(node);
    equal(node.style.visibility, "visible", "VML_PostDraw");
    equal(node.fillcolor, "none", "VML_PostDraw");
    equal(node.strokecolor, "none", "VML_PostDraw");
});

test("VMLTest_SetNodeDimension", function() {
    expect(6);

    var vml = new SuperMap.Renderer.VML();
    var geometry = new SuperMap.Geometry.Point(20, 40);
    var node = {
        "style": {
            "left": "",
            "top": "",
            "width": "",
            "height": ""
        },
        "coordorign": "",
        "coordsize": ""
    };
    var name="Image",
        url="Images/Day.jpg",
        bounds= new SuperMap.Bounds(-180, -90, 180, 90),
        layer=new SuperMap.Layer.Image(name,url,bounds);
    layer.isBaseLayer = true;
    var map = new SuperMap.Map("map");
    map.addLayer(layer);
    vml.map = map;
    vml.offset = {
        "x": 10,
        "y": 20
    };
    vml.setNodeDimension(node, geometry);
    equal(node.style.left, "4px", "VML_SetNodeDimension");
    equal(node.style.top, "8px", "VML_SetNodeDimension");
    equal(node.style.width, "0px", "VML_SetNodeDimension");
    equal(node.style.height, "0px", "VML_SetNodeDimension");
    equal(node.coordorigin, "4 8", "VML_SetNodeDimension");
    equal(node.coordsize, "0 0", "VML_SetNodeDimension");
});

test("VMLTest_DashStyle", function() {
    expect(6);

    var vml = new SuperMap.Renderer.VML();
    var style = {
        "strokeDashstyle": "solid"
    };
    equal(vml.dashStyle(style), style.strokeDashstyle, "VML_DashStyle");

    style.strokeDashstyle = "[1, 2, 3, 4]";
    equal(vml.dashStyle(style), "solid", "VML_DashStyle");

    style.strokeDashstyle = "[1, 2,3]";
    equal(vml.dashStyle(style), "dashdot", "VML_DashStyle");

    style.strokeDashstyle = "2,1";
    equal(vml.dashStyle(style), "longdash", "VML_DashStyle");

    style.strokeDashstyle = "1,4";
    equal(vml.dashStyle(style), "dash", "VML_DashStyle");

    style.strokeDashstyle = "2,1,3,4";
    equal(vml.dashStyle(style), "longdashdot", "VML_DashStyle");
});

test("VMLTest_CreateNode", function() {
    expect(4);

    var vml = new SuperMap.Renderer.VML();
    var type = "olv:shape",
        id = "VML";
    var node = vml.createNode(type, id);
    equal(node.nodeName, "OLV:SHAPE", "VML_CreateNode");
    equal(node.id, id, "VML_CreateNode");
    equal(node.unselectable, "on", "VML_CreateNode");
    equal(node.onselectstart, SuperMap.Function.False, "VML_CreateNode");
});

test("VML_NodeTypeCompare", function() {
    expect(2);

    var vml = new SuperMap.Renderer.VML();
    var node = {
        "nodeName": "olv:shape"
    };
    var type = "olv:rect";
    var isSame = vml.nodeTypeCompare(node, type);
    equal(isSame, false, "VML_NodeTypeCompare");

    type = "olv:shape";
    var isSame1 = vml.nodeTypeCompare(node, type);
    equal(isSame1, true, "VML_NodeTypeCompare");
});

test("VML_DrawCircle", function() {
    expect(4);

    var vml = new SuperMap.Renderer.VML();
    var geometry = new SuperMap.Geometry.Point(10, 20);
    var node = vml.createNode("olv:shape", "VML");
    var radius = 4;
    var name="Image",
        url="Images/Day.jpg",
        bounds= new SuperMap.Bounds(-180, -90, 180, 90),
        layer=new SuperMap.Layer.Image(name,url,bounds);
    layer.isBaseLayer = true;
    var map = new SuperMap.Map("map");
    map.addLayer(layer);
    vml.map = map;
    vml.offset = {
        "x": 10,
        "y": 20
    };
    vml.drawCircle(node, geometry, radius);
    equal(node.style.left, "-6px", "VML_DrawCicle");
    equal(node.style.top, "-9px", "VML_DrawCicle");
    equal(node.style.width, "8px", "VML_DrawCicle");
    equal(node.style.height, "8px", "VML_DrawCicle");
});

test("VML_DrawLine", function() {
    expect(2);

    var vml = new SuperMap.Renderer.VML();
    var geometry = new SuperMap.Geometry.LineString(
        new SuperMap.Geometry.Point(10, 20),
        new SuperMap.Geometry.Point(100, 200)
    );
    var node = vml.createNode("olv:shape", "VML");
    var closeLine = true;
    var name="Image",
        url="Images/Day.jpg",
        bounds= new SuperMap.Bounds(-180, -90, 180, 90),
        layer=new SuperMap.Layer.Image(name,url,bounds);
    layer.isBaseLayer = true;
    var map = new SuperMap.Map("map");
    map.addLayer(layer);
    vml.map = map;
    vml.offset = {
        "x": 10,
        "y": 20
    };
    vml.drawLine(node, geometry, closeLine);
    equal(node.path, "m -2,-5 l  x e", "VML_DrawLine");

    closeLine = false;
    vml.drawLine(node, geometry, closeLine);
    equal(node.path, "m -2,-5 l  e", "VML_DrawLine");
});

test("VML_DrawPolygon", function() {
    expect(1);

    var vml = new SuperMap.Renderer.VML();
    var points=[
            new SuperMap.Geometry.Point(-120,54.142),
            new SuperMap.Geometry.Point(-110,40),
            new SuperMap.Geometry.Point(-120,25.857),
            new SuperMap.Geometry.Point(-140,25.857),
            new SuperMap.Geometry.Point(-150,40),
            new SuperMap.Geometry.Point(-140,54.142)

        ],
        linearRings = new SuperMap.Geometry.LinearRing(points),
        geometry = new SuperMap.Geometry.Polygon([linearRings]);
    var node = vml.createNode("olv:shape", "VML");
    var name="Image",
        url="Images/Day.jpg",
        bounds= new SuperMap.Bounds(-180, -90, 180, 90),
        layer=new SuperMap.Layer.Image(name,url,bounds);
    layer.isBaseLayer = true;
    var map = new SuperMap.Map("map");
    map.addLayer(layer);
    vml.map = map;
    vml.offset = {
        "x": 10,
        "y": 20
    };
    vml.drawPolygon(node, geometry);
    equal(node.path, "m -95,18 l -88,8 -95,-1 -109,-1 -116,8 -109,18 -95,18 x e", "VML_DrawPolygon");
});

test("VML_DrawRectangle", function() {
    expect(4);

    var vml = new SuperMap.Renderer.VML();
    var geometry = new SuperMap.Geometry.Point(10, 20);
    var node = vml.createNode("olv:shape", "VML");
    var name="Image",
        url="Images/Day.jpg",
        bounds= new SuperMap.Bounds(-180, -90, 180, 90),
        layer=new SuperMap.Layer.Image(name,url,bounds);
    layer.isBaseLayer = true;
    var map = new SuperMap.Map("map");
    map.addLayer(layer);
    vml.map = map;
    vml.offset = {
        "x": 10,
        "y": 20
    };
    vml.drawRectangle(node, geometry);
    equal(node.style.left, "-2px", "VML_DrawRectangle");
    equal(node.style.top, "-5px", "VML_DrawRectangle");
    equal(node.style.width, "0px", "VML_DrawRectangle");
    equal(node.style.height, "0px", "VML_DrawRectangle");
});

test("VML_DrawText", function() {
    expect(19);

    var vml = new SuperMap.Renderer.VML();
    var featureId = "text";
    var style = {
        "label": "AAAAA",
        "cursor": "pointer",
        "fontColor": "#FFFFFF",
        "fontOpacity": 0.5,
        "fontFamily": "Aria",
        "fontSize": "14px",
        "fontWeight": "bold",
        "fontStyle": "none",
        "labelSelect": true,
        "labelAlign": "cm"
    };
    var location = new SuperMap.Pixel(10, 20);
    vml.container = document.createElement("div");
    vml.container.setAttribute("id", "root");
    vml.root = vml.createRoot("root");
    vml.textRoot = vml.createRoot("textRoot");
    var name="Image",
        url="Images/Day.jpg",
        bounds= new SuperMap.Bounds(-180, -90, 180, 90),
        layer=new SuperMap.Layer.Image(name,url,bounds);
    layer.isBaseLayer = true;
    var map = new SuperMap.Map("map");
    map.addLayer(layer);
    vml.map = map;
    vml.offset = {
        "x": 10,
        "y": 20
    };
    vml.LABEL_ID_SUFFIX = "createLabel";
    vml.drawText(featureId, style, location);
    var label = vml.textRoot.childNodes[0];
    var textBox = label.childNodes[0];
    equal(vml.textRoot.tagName, "OLV:GROUP", "VML_DrawText");
    equal(label.tagName, "OLV:RECT", "VML_DrawText");
    equal(textBox.tagName, "OLV:TEXTBOX", "VML_DrawText");
    equal(label.style.left, "-3px", "VML_DrawText");
    equal(label.style.top, "-5px", "VML_DrawText");
    equal(label.style.flip, "y", "VML_DrawText");
    equal(label._featureId, "text", "VML_DrawText");
    equal(textBox.innerText, "AAAAA", "VML_DrawText");
    equal(textBox.style.cursor, "pointer", "VML_DrawText");
    equal(textBox.style.color, "rgb(255, 255, 255)", "VML_DrawText");
    equal(textBox.style.filter, "", "VML_DrawText");
    equal(textBox.style.fontFamily, "Aria", "VML_DrawText");
    equal(textBox.style.fontWeight, "bold", "VML_DrawText");
    equal(textBox.style.fontSize, "14px", "VML_DrawText");
    equal(textBox.style.fontStyle, "", "VML_DrawText");
    equal(textBox._featureId, "text", "VML_DrawText");
    equal(textBox._geometry.x, 10, "VML_DrawText");
    equal(textBox._geometry.y, 20, "VML_DrawText");
    equal(textBox._geometryClass, "SuperMap.Pixel", "VML_DrawText");
});

test("VMLTest_DrawSurface", function() {
    expect(1);

    var vml = new SuperMap.Renderer.VML();
    var points=[
            new SuperMap.Geometry.Point(-120,54.142),
            new SuperMap.Geometry.Point(-110,40),
            new SuperMap.Geometry.Point(-120,25.857),
            new SuperMap.Geometry.Point(-140,25.857),
            new SuperMap.Geometry.Point(-150,40),
            new SuperMap.Geometry.Point(-140,54.142)

        ],
        linearRings = new SuperMap.Geometry.LinearRing(points),
        geometry = new SuperMap.Geometry.Polygon([linearRings]);
    var node = vml.createNode("olv:shape", "VML");
    var name="Image",
        url="Images/Day.jpg",
        bounds= new SuperMap.Bounds(-180, -90, 180, 90),
        layer=new SuperMap.Layer.Image(name,url,bounds);
    layer.isBaseLayer = true;
    var map = new SuperMap.Map("map");
    map.addLayer(layer);
    vml.map = map;
    vml.offset = {
        "x": 10,
        "y": 20
    };
    var node1 = vml.drawSurface(node, geometry);
    equal(node1.path, "m 0,0 x e", "VML_DrawSurface");
});

test("VMLTest_ImportSymbol", function() {
    expect(5);

    var vml = new SuperMap.Renderer.VML();
    var graphicName = "star";
    vml.container = document.createElement("div");
    vml.container.setAttribute("id", "root");
    var cache = vml.importSymbol(graphicName);
    equal(cache.path, "m 350 75 l 379 161 469 161 397 215 423 301 350 250 277 301 303 215 231 161 321 161 350 75 x e", "VML_ImportSymbol");
    equal(cache.size, 238, "VML_ImportSymbol");
    equal(cache.left, 231, "VML_ImportSymbol");
    equal(cache.bottom, 69, "VML_ImportSymbol");
    equal(vml.symbolCache, cache.toString(), "VML_ImportSymbol");
});