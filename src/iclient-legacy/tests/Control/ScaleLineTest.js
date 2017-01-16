module("ScaleLine");

test("ScaleLineTest_constructor", function() {
    expect(10);
    var scaleLine = new SuperMap.Control.ScaleLine();
    equals(scaleLine.CLASS_NAME, "SuperMap.Control.ScaleLine", "scaleLine_constructor");
    equals(scaleLine.maxWidth, 100, "scaleLine_constructor");
    equals(scaleLine.isImperialUnits, true, "scaleLine_constructor");
    equals(scaleLine.topOutUnits, "km", "scaleLine_constructor");
    equals(scaleLine.topInUnits, "m", "scaleLine_constructor");
    equals(scaleLine.bottomOutUnits, "mi", "scaleLine_constructor");
    equals(scaleLine.bottomInUnits, "ft", "scaleLine_constructor");
    equals(scaleLine.eTop, null, "scaleLine_constructor");
    equals(scaleLine.eBottom, null, "scaleLine_constructor");
    equals(scaleLine.geodesic, false, "scaleLine_constructor");
});

test("ScaleLineTest_draw", function() {
    expect(9);
    var map = new SuperMap.Map("map");
    var scaleLine = new SuperMap.Control.ScaleLine();
    map.addControl(scaleLine);
    var div = scaleLine.draw();
    equals(scaleLine.eTop.className, "smControlScaleLineTop", "scaleLine_draw");
    equals(scaleLine.eTop.style.visibility, "visible", "scaleLine_draw");
    equals(scaleLine.eBottom.className, "smControlScaleLineBottom", "scaleLine_draw");
    equals(scaleLine.eBottom.style.visibility, "visible", "scaleLine_draw");
    equals(div.tagName, "DIV", "scaleLine_draw");
    equals(div.id.split("_")[0], "SuperMap.Control.ScaleLine", "scaleLine_draw");
    equals(div.className, "smControlScaleLine smControlNoSelect", "scaleLine_draw");

    scaleLine.topOutUnits = "";
    scaleLine.topInUnits = "";
    scaleLine.eTop = null;
    scaleLine.draw();
    equals(scaleLine.eTop.style.visibility, "hidden", "scaleLine_draw");

    scaleLine.bottomOutUnits = "";
    scaleLine.bottomInUnits = "";
    scaleLine.isImperialUnits = true;
    scaleLine.eTop = null;
    scaleLine.draw();
    equals(scaleLine.eBottom.style.visibility, "hidden", "scaleLine_draw");
});

test("ScaleLineTest_getBarLen", function() {
    var scaleLine = new SuperMap.Control.ScaleLine();
    var maxLen = 0.5;
    var len = scaleLine.getBarLen(maxLen);
    equals(len, 1, "scaleLine_getBarLen");
});

test("ScaleLineTest_update", function() {
    expect(16);
    var map = new SuperMap.Map("map");
    var scaleLine = new SuperMap.Control.ScaleLine();
    map.addControl(scaleLine);
    var options = {numZoomLevels: 12,useCanvas:false};
    var bounds= new SuperMap.Bounds(-180, -90, 180, 90);
    var layer = new SuperMap.Layer.Image(
        'World_Day',
        'images/Day.jpg',
        bounds ,
        options
    );
    map.addLayer(layer);
    map.zoomToMaxExtent();
    scaleLine.update();
    equals(scaleLine.eBottom.style.width, "51px", "scaleLine_update");
    equals(scaleLine.eBottom.innerHTML, "5000 英里", "scaleLine_update");
    equals(scaleLine.eTop.style.width, "64px", "scaleLine_update");
    equals(scaleLine.eTop.innerHTML, "10000 公里", "scaleLine_update");

    scaleLine.geodesic = true;
    scaleLine.update();
    equals(scaleLine.eBottom.style.width, "51px", "scaleLine_update");
    equals(scaleLine.eBottom.innerHTML, "5000 英里", "scaleLine_update");
    equals(scaleLine.eTop.style.width, "64px", "scaleLine_update");
    equals(scaleLine.eTop.innerHTML, "10000 公里", "scaleLine_update");

    scaleLine.eBottom.style.visibility = "hidden";
    scaleLine.eTop.style.visibility = "hidden";
    scaleLine.update();
    equals(scaleLine.eBottom.style.width, "51px", "scaleLine_update");
    equals(scaleLine.eBottom.innerHTML, "5000 英里", "scaleLine_update");
    equals(scaleLine.eTop.style.width, "64px", "scaleLine_update");
    equals(scaleLine.eTop.innerHTML, "10000 公里", "scaleLine_update");

    scaleLine.geodesic = false;
    scaleLine.update();
    equals(scaleLine.eBottom.style.width, "51px", "scaleLine_update");
    equals(scaleLine.eBottom.innerHTML, "5000 英里", "scaleLine_update");
    equals(scaleLine.eTop.style.width, "64px", "scaleLine_update");
    equals(scaleLine.eTop.innerHTML, "10000 公里", "scaleLine_update");
});