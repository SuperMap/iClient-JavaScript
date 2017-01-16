module("Zoom");

test("TestZoom_Constructor", function() {
    expect(4);
    var zoom = new SuperMap.Control.Zoom();
    equals(zoom.defaultPosition.CLASS_NAME, "SuperMap.Pixel", "Zoom_Constructor");
    equals(zoom.zoomInClassName, "smControlZoomIn", "Zoom_Constructor");
    equals(zoom.zoomOutClassName, "smControlZoomOut", "Zoom_Constructor");
    equals(zoom.body, null, "Zoom_Constructor");
});

test("TestZoom_draw", function() {
    expect(8);
    var map = new SuperMap.Map("map");
    var zoom = new SuperMap.Control.Zoom();
    map.addControl(zoom);
    zoom.observed = false;
    var div = zoom.draw();
    equals(zoom.observed, true, "Zoom_draw");
    equals(zoom.zoomInLink.tagName, "DIV", "Zoom_draw");
    equals(zoom.zoomInLink.className, "smControlZoomIn smButton", "Zoom_draw");
    equals(zoom.zoomOutLink.tagName, "DIV", "Zoom_draw");
    equals(zoom.zoomOutLink.className, "smControlZoomOut smButton", "Zoom_draw");
    equals(div.tagName, "DIV", "Zoom_draw");
    equals(div.id.split("_")[0], "SuperMap.Control.Zoom", "Zoom_draw");
    equals(div.className, "smControlZoom smControlNoSelect", "Zoom_draw");
});

test("ZoomTest_getOrCreateLinks", function() {
    expect(4);
    var map = new SuperMap.Map("map");
    var zoom = new SuperMap.Control.Zoom();
    map.addControl(zoom);
    var links = zoom.getOrCreateLinks();
    equals(links.zoomIn.tagName, "DIV", "Zoom_draw");
    equals(links.zoomIn.className, "smControlZoomIn smButton", "Zoom_getOrCreateLinks");
    equals(links.zoomOut.tagName, "DIV", "Zoom_draw");
    equals(links.zoomOut.className, "smControlZoomOut smButton", "Zoom_getOrCreateLinks");
});

test("ZoomTest_createBtn", function() {
    expect(4);
    var zoom = new SuperMap.Control.Zoom();
    var p = document.createElement("div");
    var m = "zoom-minus-mini.png";
    var c = "smZoom";
    var img = new Image();
    var s = SuperMap.Util.getImagesLocation() +"controlSkinWhite/"+ m;
    img.src = s;
    var btn = zoom.createBtn(p, m, c);
    equals(btn.tagName, "DIV", "Zoom_createBtn");
    equals(btn.className, "smZoom", "Zoom_createBtn");
    equals(btn.childNodes[0].tagName, "IMG", "Zoom_createBtn");
    equals(btn.childNodes[0].src, img.src, "Zoom_createBtn");
});

test("ZoomTest_onZoomClick", function() {
    expect(2);
    var map = new SuperMap.Map("map");
    var zoom = new SuperMap.Control.Zoom();
    map.addControl(zoom);
    var options = {numZoomLevels: 12,useCanvas:false};
    var bounds= new SuperMap.Bounds(-180, -90, 180, 90);
    var layer = new SuperMap.Layer.Image(
        'World_Day',
        'images/Day.jpg',
        bounds ,
        options
    );
    map.addLayer(layer);
    map.setCenter(new SuperMap.LonLat(0, 0), 5);

    var zoomLevel = map.getZoom();
    var evt = {
        buttonElement: zoom.zoomInLink
    };
    zoom.onZoomClick(evt);
    equals(map.getZoom(), ++zoomLevel, "Zoom_onZoomClick");

    var evt = {
        buttonElement: zoom.zoomOutLink
    };
    zoom.onZoomClick(evt);
    equals(map.getZoom(), --zoomLevel, "Zoom_onZoomClick");
});

test("ZoomTest_getPressedButton", function() {
    expect(2);
    var zoom = new SuperMap.Control.Zoom();
    var button = document.createElement("div");
    var getedButton = zoom.getPressedButton(button);
    equals(getedButton, undefined, "Zoom_getPressedButton");

    SuperMap.Element.addClass(button, "smButton");
    var getedButton = zoom.getPressedButton(button);
    equals(getedButton, button, "Zoom_getPressedButton");
});

test("ZoomTest_destroy", function() {
    expect(3);
    var map = new SuperMap.Map("map");
    var zoom = new SuperMap.Control.Zoom();
    map.addControl(zoom);
    zoom.destroy();
    equals(zoom.zoomInLink, undefined, "Zoom_destroy");
    equals(zoom.zoomOutLink, undefined, "Zoom_destroy");
    equals(zoom.body, null, "Zoom_destroy");
});