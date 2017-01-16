module("Framed");

test("FramedTest_constructor", function() {
    expect(21);

    var id = "framed",
        lonlat = new SuperMap.LonLat(0, 0),
        contentSize = new SuperMap.Size(20, 40),
        contentHTML = "ddd",
        anchor = null,
        closeBox = true,
        closeBoxCallback = null;
    var popup = new SuperMap.Popup.Framed(id, lonlat, contentSize, contentHTML, anchor,
        closeBox, closeBoxCallback);
    equal(popup.CLASS_NAME, "SuperMap.Popup.Framed", "popup_constructor");
    equal(popup.imageSrc, null, "popup_constructor");
    equal(popup.imageSize, null, "popup_constructor");
    equal(popup.isAlphaImage, false, "popup_constructor");
    equal(popup.positionBlocks, null, "popup_constructor");
    equal(popup.blocks, null, "popup_constructor");
    equal(popup.fixedRelativePosition, false, "popup_constructor");
    equal(popup.contentDiv.style.position, "absolute", "popup_constructor");
    equal(popup.contentDiv.style.zIndex, 1, "popup_constructor");
    equal(popup.closeDiv.style.zIndex, 1, "popup_constructor");
    equal(popup.groupDiv.style.position, "absolute", "popup_constructor");
    equal(popup.groupDiv.style.top, "0px", "popup_constructor");
    equal(popup.groupDiv.style.left, "0px", "popup_constructor");
    equal(popup.groupDiv.style.height, "100%", "popup_constructor");
    equal(popup.groupDiv.style.width, "100%", "popup_constructor");
    equal(popup.id, "framed", "popup_constructor");
    equal(popup.lonlat.lon, 0, "popup_constructor");
    equal(popup.lonlat.lat, 0, "popup_constructor");
    equal(popup.contentSize.w, 20, "popup_constructor");
    equal(popup.contentSize.h, 40, "popup_constructor");
    equal(popup.contentHTML, "ddd", "popup_constructor");
});

test("FramedTest_destroy", function() {
    expect(6);

    var id = "framed",
        lonlat = new SuperMap.LonLat(0, 0),
        contentSize = new SuperMap.Size(20, 40),
        contentHTML = "ddd",
        anchor = null,
        closeBox = true,
        closeBoxCallback = null;
    var popup = new SuperMap.Popup.Framed(id, lonlat, contentSize, contentHTML, anchor,
        closeBox, closeBoxCallback);
    popup.blocks = [];
    popup.destroy();
    equal(popup.imageSrc, null, "popup_constructor");
    equal(popup.imageSize, null, "popup_constructor");
    equal(popup.isAlphaImage, null, "popup_constructor");
    equal(popup.fixedRelativePosition, false, "popup_constructor");
    equal(popup.positionBlocks, null, "popup_constructor");
    equal(popup.blocks, null, "popup_constructor");
});

test("FramedTest_setSize", function() {
    expect(4);

    var id = "framed",
        lonlat = new SuperMap.LonLat(0, 0),
        contentSize = new SuperMap.Size(20, 40),
        contentHTML = "ddd",
        anchor = null,
        closeBox = true,
        closeBoxCallback = null;
    var popup = new SuperMap.Popup.Framed(id, lonlat, contentSize, contentHTML, anchor,
        closeBox, closeBoxCallback);
    popup.relativePosition = 0;
    popup.positionBlocks = [];
    var obj = {
        "padding": 5,
        "blocks": []
    };
    popup.positionBlocks.push(obj);
    var newSize = new SuperMap.Size(10, 30);
    popup.setSize(newSize);
    equal(popup.size.w, 42, "popup_setSize");
    equal(popup.size.h, 40, "popup_setSize");
    if(SuperMap.Browser.name == "msie") {
        equal(popup.contentSize.w, 30, "popup_setSize");
        equal(popup.contentSize.h, 50, "popup_setSize");
    } else {
        equal(popup.contentSize.w, 20, "popup_setSize");
        equal(popup.contentSize.h, 40, "popup_setSize");
    }
});

test("FramedTest_updateRelativePosition", function() {
    expect(3);

    var id = "framed",
        lonlat = new SuperMap.LonLat(0, 0),
        contentSize = new SuperMap.Size(20, 40),
        contentHTML = "ddd",
        anchor = null,
        closeBox = true,
        closeBoxCallback = null;
    var popup = new SuperMap.Popup.Framed(id, lonlat, contentSize, contentHTML, anchor,
        closeBox, closeBoxCallback);
    popup.relativePosition = 0;
    popup.positionBlocks = [];
    var obj = {
        "padding": 5,
        "blocks": []
    };
    popup.positionBlocks.push(obj);
    popup.updateRelativePosition();
    equal(popup.padding, 5, "popup_updateRelativePosition");
    equal(popup.closeDiv.style.right, "5px", "popup_updateRelativePosition");
    equal(popup.closeDiv.style.right, "5px", "popup_updateRelativePosition");
});

test("FramedTest_calculateNewPx", function() {
    expect(2);

    var id = "framed",
        lonlat = new SuperMap.LonLat(0, 0),
        contentSize = new SuperMap.Size(20, 40),
        contentHTML = "ddd",
        anchor = null,
        closeBox = true,
        closeBoxCallback = null;
    var popup = new SuperMap.Popup.Framed(id, lonlat, contentSize, contentHTML, anchor,
        closeBox, closeBoxCallback);
    popup.relativePosition = "ttt";
    popup.positionBlocks = [];
    popup.positionBlocks[popup.relativePosition] = {
        "offset": new SuperMap.Pixel(5, 5)
    };
    var px = new SuperMap.Pixel(10, 20);
    var newPx = popup.calculateNewPx(px);
    equal(newPx.x, 15, "popup.calculateNewPx");
    equal(newPx.y, -15, "popup.calculateNewPx");
});

test("FramedTest_createBlocks", function() {
    expect(7);

    var id = "framed",
        lonlat = new SuperMap.LonLat(0, 0),
        contentSize = new SuperMap.Size(20, 40),
        contentHTML = "ddd",
        anchor = null,
        closeBox = true,
        closeBoxCallback = null;
    var popup = new SuperMap.Popup.Framed(id, lonlat, contentSize, contentHTML, anchor,
        closeBox, closeBoxCallback);
    popup.relativePosition = 0;
    popup.positionBlocks = [];
    var array = ["0"];
    var obj = {
        "padding": 5,
        "blocks": array
    };
    popup.positionBlocks.push(obj);
    popup.createBlocks();
    equal(popup.groupDiv.childNodes.length, 3, "popup_creaeBlocks");
    equal(popup.groupDiv.childNodes[0].tagName, "DIV", "popup_creaeBlocks");
    equal(popup.groupDiv.childNodes[0].className, "smPopupContent", "popup_creaeBlocks");
    equal(popup.groupDiv.childNodes[1].tagName, "DIV", "popup_creaeBlocks");
    equal(popup.groupDiv.childNodes[1].className, "smPopupCloseBox", "popup_creaeBlocks");
    equal(popup.groupDiv.childNodes[2].tagName, "DIV", "popup_creaeBlocks");
    equal(popup.groupDiv.childNodes[2].className, "", "popup_creaeBlocks");
});

test("FramedTest_updateBlocks", function() {
    expect(2);

    var id = "framed",
        lonlat = new SuperMap.LonLat(0, 0),
        contentSize = new SuperMap.Size(20, 40),
        contentHTML = "ddd",
        anchor = null,
        closeBox = true,
        closeBoxCallback = null;
    var popup = new SuperMap.Popup.Framed(id, lonlat, contentSize, contentHTML, anchor,
        closeBox, closeBoxCallback);
    var arr = [{
        "size": {
            "w": 10,
            "h": 20
        },
        "anchor": {
            "left": null,
            "bottom": null,
            "right": null,
            "top": null
        },
        "position": {
            "x": 10,
            "y": 20
        }
    }];
    popup.blocks = [{
        "div": {
            "style": {
                "width": 10,
                "height": 10,
                "left": null,
                "bottom": null,
                "right": null,
                "top": null
            }
        },
        "image": {
            "style": {
                "left": 10,
                "top": 20
            }
        }
    }];
    popup.size = true;
    popup.padding = {
        "left": 10,
        "top": 20
    };
    popup.relativePosition = "ttt";
    popup.positionBlocks = [];
    popup.positionBlocks[popup.relativePosition] = {
        "offset": new SuperMap.Pixel(5, 5),
        "padding": 5,
        "blocks": arr
    };
    popup.updateBlocks();
    equal(popup.contentDiv.style.left, "10px", "popup_updateBlocks");
    equal(popup.contentDiv.style.top, "20px", "popup_updateBlocks");
});