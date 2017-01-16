module("FramedCloud");

test("FramedCloudTest_constructor", function() {
    expect(26);

    var id = "framed",
        lonlat = new SuperMap.LonLat(0, 0),
        contentSize = new SuperMap.Size(20, 40),
        contentHTML = "ddd",
        anchor = null,
        closeBox = true,
        closeBoxCallback = null;
    var positionBlocks = {
        "tl": {
            'offset': new SuperMap.Pixel(44, -32),//44, 0
                'padding': new SuperMap.Bounds(0, 0, 0, -2),//0, 32, 0, 1
                'blocks': [
                { // top-left
                    size: new SuperMap.Size('auto', 'auto'),
                    anchor: new SuperMap.Bounds(0, 51, 22, 0),
                    position: new SuperMap.Pixel(0, 0)
                },
                { //top-right
                    size: new SuperMap.Size(22, 'auto'),
                    anchor: new SuperMap.Bounds(null, 50, 0, 0),
                    position: new SuperMap.Pixel(-1238, 0)
                },
                { //bottom-left
                    size: new SuperMap.Size('auto', 19),
                    anchor: new SuperMap.Bounds(0, 0, 22, null),//0, 32, 22, null
                    position: new SuperMap.Pixel(0, -631)
                },
                { //bottom-right
                    size: new SuperMap.Size(22, 18),
                    anchor: new SuperMap.Bounds(null, 0, 0, null),//null, 32, 0, null
                    position: new SuperMap.Pixel(-1238, -632)
                },
                { // stem
                    size: new SuperMap.Size(29, 35),//81, 35
                    anchor: new SuperMap.Bounds(null, -27, 44, null),//null, 0, 0, null
                    position: new SuperMap.Pixel(-4, -683)//0, -688
                }
            ]
        },
        "tr": {
            'offset': new SuperMap.Pixel(-45, -32),//-45, 0
                'padding': new SuperMap.Bounds(0, 0, 0, -1),//0, 32, 0, 1
                'blocks': [
                { // top-left
                    size: new SuperMap.Size('auto', 'auto'),
                    anchor: new SuperMap.Bounds(0, 51, 22, 0),//0, 51, 22, 0
                    position: new SuperMap.Pixel(0, 0)
                },
                { //top-right
                    size: new SuperMap.Size(22, 'auto'),
                    anchor: new SuperMap.Bounds(null, 50, 0, 0),//null, 50, 0, 0
                    position: new SuperMap.Pixel(-1238, 0)
                },
                { //bottom-left
                    size: new SuperMap.Size('auto', 19),
                    anchor: new SuperMap.Bounds(0, 0, 22, null),//0, 32, 22, null
                    position: new SuperMap.Pixel(0, -631)
                },
                { //bottom-right
                    size: new SuperMap.Size(22, 19),
                    anchor: new SuperMap.Bounds(null, 0, 0, null),//null, 32, 0, null
                    position: new SuperMap.Pixel(-1238, -631)
                },
                { // stem
                    size: new SuperMap.Size(29, 35),//81, 35
                    anchor: new SuperMap.Bounds(43, -27, null, null),//0, 0, null, null
                    position: new SuperMap.Pixel(-263, -682)//-215, -687
                }
            ]
        },
        "bl": {
            'offset': new SuperMap.Pixel(45, 32),//45, 0
                'padding': new SuperMap.Bounds(0, 1, 0, 0),//0, 1, 0, 32
                'blocks': [
                { // top-left
                    size: new SuperMap.Size('auto','auto'),
                    anchor: new SuperMap.Bounds(0, 53, 22, 0),//0, 21, 22, 32
                    position: new SuperMap.Pixel(0, 0)
                },
                { //top-right
                    size: new SuperMap.Size(22, 'auto'),
                    anchor: new SuperMap.Bounds(null, 53, 0, 0),//null, 21, 0, 32
                    position: new SuperMap.Pixel(-1238, 0)
                },
                { //bottom-left
                    size: new SuperMap.Size('auto', 21),
                    anchor: new SuperMap.Bounds(0, 0, 22, null),
                    position: new SuperMap.Pixel(0, -629)
                },
                { //bottom-right
                    size: new SuperMap.Size(22, 21),
                    anchor: new SuperMap.Bounds(null, 0, 0, null),
                    position: new SuperMap.Pixel(-1238, -629)
                },
                { // stem
                    size: new SuperMap.Size(29, 33),//81, 33
                    anchor: new SuperMap.Bounds(null, null, 43, -27),//null, null, 0, 0
                    position: new SuperMap.Pixel(-106, -679)//-101, -674
                }
            ]
        },
        "br": {
            'offset': new SuperMap.Pixel(-44, 32),//-44, 0
                'padding': new SuperMap.Bounds(0, 1, 0, 0),//0, 1, 0, 32
                'blocks': [
                { // top-left
                    size: new SuperMap.Size('auto', 'auto'),
                    anchor: new SuperMap.Bounds(0, 53, 22, 0),//0, 21, 22, 32
                    position: new SuperMap.Pixel(0, 0)
                },
                { //top-right
                    size: new SuperMap.Size(22, 'auto'),
                    anchor: new SuperMap.Bounds(null, 53, 0, 0),//null, 21, 0, 32
                    position: new SuperMap.Pixel(-1238, 0)
                },
                { //bottom-left
                    size: new SuperMap.Size('auto', 21),
                    anchor: new SuperMap.Bounds(0, 0, 22, null),
                    position: new SuperMap.Pixel(0, -629)
                },
                { //bottom-right
                    size: new SuperMap.Size(22, 21),
                    anchor: new SuperMap.Bounds(null, 0, 0, null),
                    position: new SuperMap.Pixel(-1238, -629)
                },
                { // stem
                    size: new SuperMap.Size(29, 33),//81, 33
                    anchor: new SuperMap.Bounds(45, null, null, -28),//0, null, null, 0
                    position: new SuperMap.Pixel(-359, -678)//-311, -674
                }
            ]
        }
    };
    var imageSrc = SuperMap.Util.getImagesLocation() + 'cloud-popup-relative.png';
    var popup = new SuperMap.Popup.FramedCloud(id, lonlat, contentSize, contentHTML, anchor,
        closeBox, closeBoxCallback);
    equal(popup.CLASS_NAME, "SuperMap.Popup.FramedCloud", "popup_constructor");
    equal(popup.contentDisplayClass, "smFramedCloudPopupContent", "popup_constructor");
    equal(popup.autoSize, true, "popup_constructor");
    equal(popup.contentDiv.className, popup.contentDisplayClass, "popup_constructor");
    equal(popup.panMapIfOutOfView, true, "popup_constructor");
    equal(popup.imageSrc, imageSrc, "popup_constructor");
    equal(popup.imageSize.CLASS_NAME, "SuperMap.Size", "popup_constructor");
    equal(popup.imageSize.w, 1276, "popup_constructor");
    equal(popup.imageSize.h, 736, "popup_constructor");
    equal(popup.isAlphaImage, false, "popup_constructor");
    equal(popup.fixedRelativePosition, false, "popup_constructor");
    equal(popup.positionBlocks.toString(), positionBlocks.toString(), "popup_constructor");
    equal(popup.minSize.CLASS_NAME, "SuperMap.Size", "popup_constructor");
    equal(popup.minSize.w, 105, "popup_constructor");
    equal(popup.minSize.h, 30, "popup_constructor");
    equal(popup.maxSize.CLASS_NAME, "SuperMap.Size", "popup_constructor");
    equal(popup.maxSize.w, 1200, "popup_constructor");
    equal(popup.maxSize.h, 660, "popup_constructor");
    equal(popup.shadowDiv, null, "popup_constructor");
    equal(popup.isShowShadow, true, "popup_constructor");
    equal(popup.id, "framed", "popup_constructor");
    equal(popup.lonlat.lon, 0, "popup_constructor");
    equal(popup.lonlat.lat, 0, "popup_constructor");
    equal(popup.contentSize.w, 20, "popup_constructor");
    equal(popup.contentSize.h, 40, "popup_constructor");
    equal(popup.contentHTML, "ddd", "popup_constructor");
});

test("FramedCloudTest_createShadowFromPopup", function() {
    expect(16);

    var id = "framed",
        lonlat = new SuperMap.LonLat(0, 0),
        contentSize = null,
        contentHTML = "ddd",
        anchor = null,
        closeBox = true,
        closeBoxCallback = null;
    var popup = new SuperMap.Popup.FramedCloud(id, lonlat, contentSize, contentHTML, anchor,
        closeBox, closeBoxCallback);
    var x = 10,
        y = 20,
        width = 100,
        height = 50,
        reg = /SuperMapShadowDiv/;
    var div = popup.createShadowFromPopup(x, y, width, height),
        divCorner = div.childNodes[0],
        imgCorner = divCorner.childNodes[0];
    equal(div.tagName, "DIV", "popup.createShadowFromPopup");
    equal(reg.test(div.id), true, "popup.createShadowFromPopup");
    equal(divCorner.tagName, "DIV", "popup.createShadowFromPopup");
    equal(divCorner.style.index, 1, "popup.createShadowFromPopup");
    equal(divCorner.style.overflow, "hidden", "popup.createShadowFromPopup");
    equal(divCorner.style.zIndex, 1, "popup.createShadowFromPopup");
    equal(divCorner.style.position, "absolute", "popup.createShadowFromPopup");
    equal(divCorner.style.left, "0px", "popup.createShadowFromPopup");
    equal(divCorner.style.top, "0px", "popup.createShadowFromPopup");
    equal(divCorner.style.width, "33px", "popup.createShadowFromPopup");
    equal(divCorner.style.height, "10px", "popup.createShadowFromPopup");
    equal(imgCorner.style.position, "absolute", "popup.createShadowFromPopup");
    equal(imgCorner.style.left, "-305px", "popup.createShadowFromPopup");
    equal(imgCorner.style.top, "0px", "popup.createShadowFromPopup");
    equal(imgCorner.style.width, "1187px", "popup.createShadowFromPopup");
    equal(imgCorner.style.height, "331px", "popup.createShadowFromPopup");
});

test("FramedCloud_hide", function() {
    expect(3);

    var id = "framed",
        lonlat = new SuperMap.LonLat(0, 0),
        contentSize = null,
        contentHTML = "ddd",
        anchor = null,
        closeBox = true,
        closeBoxCallback = null;
    var popup = new SuperMap.Popup.FramedCloud(id, lonlat, contentSize, contentHTML, anchor,
        closeBox, closeBoxCallback);
    popup.shadowDiv = document.createElement("div");
    popup.div = document.createElement("div");
    popup.hide();
    equal(popup.isShowShadow, false, "popup.hide");
    equal(popup.shadowDiv.style.display, "none", "popup.hide");
    equal(popup.div.style.display, "none", "popup.hide");
});