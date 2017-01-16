module("ChangeTilesVersion");

//不传参
test("TestChangeTilesVersion_constructor", function() {
    expect(23);

    var changeTV = new SuperMap.Control.ChangeTilesVersion();
    equal(changeTV.CLASS_NAME, "SuperMap.Control.ChangeTilesVersion", "ChangeTilesVersion_constructor");
    equal(changeTV.body, null, "ChangeTilesVersion_constructor");
    equal(changeTV.infDiv, null, "ChangeTilesVersion_constructor");
    equal(changeTV.layer, null, "ChangeTilesVersion_constructor");
    equal(changeTV.infWidth, 50, "ChangeTilesVersion_constructor");
    equal(changeTV.cHeight, 29, "ChangeTilesVersion_constructor");
    equal(changeTV.btnWidth, 32, "ChangeTilesVersion_constructor");
    equal(changeTV.slider, null, "ChangeTilesVersion_constructor");
    equal(changeTV.sliderHeight, 7, "ChangeTilesVersion_constructor");
    equal(changeTV.sliderBar, null, "ChangeTilesVersion_constructor");
    equal(changeTV.sliderBarHeight, 20, "ChangeTilesVersion_constructor");
    equal(changeTV.sliderBarWidth, 18, "ChangeTilesVersion_constructor");
    ok(typeof changeTV.changeElements, Array, "ChangeTilesVersion_constructor");
    ok(typeof changeTV.elementLefts, Array, "ChangeTilesVersion_constructor");
    equal(changeTV.enable, false, "ChangeTilesVersion_constructor");
    equal(changeTV.showSlider, true, "ChangeTilesVersion_constructor");
    equal(changeTV.sliderBarEvents, null, "ChangeTilesVersion_constructor");
    equal(changeTV.sliderWidth, 160, "ChangeTilesVersion_constructor");
    equal(changeTV.tileWidth, null, "ChangeTilesVersion_constructor");
    equal(changeTV.popInfDiv, null, "ChangeTilesVersion_constructor");
    equal(changeTV.defaultPosition.CLASS_NAME, "SuperMap.Pixel", "ChangeTilesVersion_constructor");
    equal(changeTV.defaultPosition.x, 120, "ChangeTilesVersion_constructor");
    equal(changeTV.defaultPosition.y, 60, "ChangeTilesVersion_constructor");
});

//传参
test("TestChangeTilesVersion_constructor", function() {
    expect(2);

    var changeTV = new SuperMap.Control.ChangeTilesVersion({
        name: "tilesVersion",
        title: "TV"
    });
    equal(changeTV.name, "tilesVersion", "ChangeTilesVersion_constructor");
    equal(changeTV.title, "TV", "ChangeTilesVersion_constructor");
});

test("TestChangeTilesVersion_destroy", function() {
    expect(19);

    var map = new SuperMap.Map("map");
        changeTV = new SuperMap.Control.ChangeTilesVersion();
    map.addControl(changeTV);
    changeTV.destroy();
    equal(changeTV.CLASS_NAME, "SuperMap.Control.ChangeTilesVersion", "ChangeTilesVersion_destroy");
    equal(changeTV.body, null, "ChangeTilesVersion_destroy");
    equal(changeTV.infDiv, null, "ChangeTilesVersion_destroy");
    equal(changeTV.layer, null, "ChangeTilesVersion_destroy");
    equal(changeTV.infWidth, null, "ChangeTilesVersion_destroy");
    equal(changeTV.cHeight, null, "ChangeTilesVersion_destroy");
    equal(changeTV.btnWidth, null, "ChangeTilesVersion_destroy");
    equal(changeTV.slider, null, "ChangeTilesVersion_destroy");
    equal(changeTV.sliderHeight, null, "ChangeTilesVersion_destroy");
    equal(changeTV.sliderBar, null, "ChangeTilesVersion_destroy");
    equal(changeTV.sliderBarHeight, null, "ChangeTilesVersion_destroy");
    equal(changeTV.changeElements, null, "ChangeTilesVersion_destroy");
    equal(changeTV.elementLefts, null, "ChangeTilesVersion_destroy");
    equal(changeTV.enable, null, "ChangeTilesVersion_destroy");
    equal(changeTV.showSlider, null, "ChangeTilesVersion_destroy");
    equal(changeTV.sliderBarEvents, null, "ChangeTilesVersion_destroy");
    equal(changeTV.sliderWidth, null, "ChangeTilesVersion_destroy");
    equal(changeTV.tileWidth, null, "ChangeTilesVersion_destroy");
    equal(changeTV.popInfDiv, null, "ChangeTilesVersion_destroy");
});

test("TestChangeTilesVersion_setLayer", function() {
    expect(3);

    var map = new SuperMap.Map("map");
    changeTV = new SuperMap.Control.ChangeTilesVersion();
    map.addControl(changeTV);
    var urls = [GlobeParameter.mapServiceURL + "World Map1",GlobeParameter.mapServiceURL + "World Map2"],
        layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", urls, {transparent: true, cacheEnabled: true}, {maxResolution:"auto"});
    changeTV.setLayer(layer);
    equal(changeTV.enable, false, "changeTilesVersion_setLayer");
    equal(changeTV.layer.toString(), layer.toString(), "changeTilesVersion_setLayer");
    equal(layer.TilesVersionControl.toString(), changeTV.toString(), "changeTilesVersion_setLayer");
});

test("TestChangeTilesVersion_setTileWidth", function() {
    expect(2);

    var options = {
            viewBounds: new SuperMap.Bounds(84.30460372171433, 15.704362017314319, 108.04279582068568, 39.442554116285685),
            viewer: new SuperMap.Size(256,256),
            scale: 2.563206512274041E-8,
            units: "degree"
        },
        dpi = 95.99999999998124,
        url = GlobeParameter.mapServiceURL + "World Map",
        name = "TiledDynamicRESTLayer",
        map = new SuperMap.Map('map'),
        layer = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, {}, options);
    map.addLayer(layer);
    var changeTV1 = new SuperMap.Control.ChangeTilesVersion();
    map.addControl(changeTV);
    changeTV.setTileWidth();
    equal(changeTV.enable, false, "changeTilesVersion_setTileWidth");
    equal(changeTV.tileWidth, null, "changeTilesVersion_setTileWidth");
});

test("TestChangeTilesVersion_draw", function() {
    expect(9);

    var changeTV = new SuperMap.Control.ChangeTilesVersion();
    var div = changeTV.draw();
    equal(changeTV.observed, true, "ChangeTilesVersion_draw");
    equal(changeTV.tilesVersionReduceLink.tagName, "DIV", "ChangeTiesVersion_draw");
    equal(changeTV.tilesVersionReduceLink.className, "smButton", "ChangeTiesVersion_draw");
    equal(changeTV.tilesVersionCenterLink.tagName, "DIV", "ChangeTiesVersion_draw");
    equal(changeTV.tilesVersionAddLink.tagName, "DIV", "ChangeTiesVersion_draw");
    equal(changeTV.tilesVersionAddLink.className, "smButton", "ChangeTiesVersion_draw");
    equal(div.tagName, "DIV", "ChangeTilesVersion_draw");
    equal(div.className, "smControlChangeTilesVersion smControlNoSelect", "ChangeTilesVersion_draw");
    equal(div.id.split("_")[0], "SuperMap.Control.ChangeTilesVersion", "ChangeTilesVersion_draw");
});

test("TestChangeTilesVersion_getOrCreateLinks", function() {
    expect(6);

    var changeTV = new SuperMap.Control.ChangeTilesVersion();
    var div = document.createElement("div");
    var links = changeTV.getOrCreateLinks(div);
    equal(links.tilesVersionReduce.tagName, "DIV", "changeTilesVersion_getOrCreateLinks");
    equal(links.tilesVersionReduce.className, "smButton", "changeTilesVersion_getOrCreateLinks");
    equal(links.tilesVersionCenter.tagName, "DIV", "changeTilesVersion_getOrCreateLinks");
    equal(links.tilesVersionAdd.tagName, "DIV", "changeTilesVersion_getOrCreateLinks");
    equal(links.tilesVersionAdd.className, "smButton", "changeTilesVersion_getOrCreateLinks");
    equal(changeTV.body.tagName, "DIV", "ChangeTilesVersion_getOrCreateLinks");
});

test("TestChangeTilesVersion_createBtn", function() {
    expect(6);

    var changeTV = new SuperMap.Control.ChangeTilesVersion();
    var p = document.createElement("div"),
        m = "tilesversion-bcg-add.png",
        i = 0;
    var btn = changeTV.createBtn(p, m, i);
    var reg = /tilesversion-bcg-add\.png/;
    equal(btn.tagName, "DIV", "ChangeTilesVersion_createBtn");
    equal(btn.style.position, "absolute", "ChangeTilesVersion_createBtn");
    equal(btn.style.width, "32px", "ChangeTilesVersion_createBtn");
    equal(btn.style.height, "29px", "ChangeTilesVersion_createBtn");
    equal(btn.style.cursor, "pointer", "ChangeTilesVersion_createBtn");
    equal(reg.test(btn.style.backgroundImage), true, "ChangeTilesVersion_createBtn");
});

test("TestChangeTilesVersion_createCenter", function() {
    expect(10);

    var changeTV = new SuperMap.Control.ChangeTilesVersion();
    var p = document.createElement("div");
    var reg = /tilesversion-bcg-center\.png/;
    changeTV.showSlider = false;
    var div = changeTV.createCenter(p);
    equal(div.tagName, "DIV", "ChangeTilesVersion_createCenter");
    equal(div.style.position, "absolute", "ChangeTilesVersion_createCenter");
    equal(div.style.width, "50px", "ChangeTilesVersion_createCenter");
    equal(div.style.height, "29px", "ChangeTilesVersion_createCenter");
    equal(reg.test(div.style.backgroundImage), true, "ChangeTilesVersion_createCenter");

    changeTV.showSlider = true;
    var div1 = changeTV.createCenter(p);
    equal(div1.tagName, "DIV", "ChangeTilesVersion_createCenter");
    equal(div1.style.position, "absolute", "ChangeTilesVersion_createCenter");
    equal(div1.style.width, "178px", "ChangeTilesVersion_createCenter");
    equal(div1.style.height, "29px", "ChangeTilesVersion_createCenter");
    equal(reg.test(div1.style.backgroundImage), true, "ChangeTilesVersion_createCenter");
});

test("TestChangeTilesVersions_createSlider", function() {
    expect(15);

    var changeTV = new SuperMap.Control.ChangeTilesVersion();
    var p = document.createElement("div");
    var reg = /tilesversion-bcg-slider2\.png/,
        reg1 = /tileservision-bcg-sliderbar\.png/;
    changeTV.createSlider(p);
    equal(changeTV.slider.tagName, "DIV", "ChangeTilesVersion_createSlider");
    equal(changeTV.slider.style.position, "absolute", "ChangeTilesVersion_createSlider");
    equal(changeTV.slider.style.width, "", "ChangeTilesVersion_createSlider");
    equal(changeTV.slider.style.height, "6px", "ChangeTilesVersion_createSlider");
    equal(changeTV.slider.style.cursor, "pointer", "ChangeTilesVersion_createSlider");
    equal(reg.test(changeTV.slider.style.backgroundImage), true, "ChangeTilesVersion_createSlider");

    equal(changeTV.sliderBar.tagName, "DIV", "ChangeTilesVersion_createSlider");
    equal(changeTV.sliderBar.style.position, "absolute", "ChangeTilesVersion_createSlider");
    equal(changeTV.sliderBar.style.width, "18px", "ChangeTilesVersion_createSlider");
    equal(changeTV.sliderBar.style.height, "20px", "ChangeTilesVersion_createSlider");
    equal(changeTV.sliderBar.style.cursor, "pointer", "ChangeTilesVersion_createSlider");
    equal(reg1.test(changeTV.sliderBar.style.backgroundImage), true, "ChangeTilesVersion_createSlider");

    equal(changeTV.sliderBarDragStartX, 161, "ChangeTilesVersion_createSlider");
    equal(changeTV.sliderBarEvents.CLASS_NAME, "SuperMap.Events", "ChangeTilesVersion_createSlider");
    equal(changeTV.domEvents.CLASS_NAME, "SuperMap.Events", "ChangeTilesVersion_createSlider");
});

test("TestChangeTilesVersions_createInf", function() {
    expect(4);

    var changeTV = new SuperMap.Control.ChangeTilesVersion();
    var p = document.createElement("div");
    changeTV.createInf(p);
    equal(changeTV.infDiv.tagName, "DIV", "ChangeTilesVersion_createInf");
    equal(changeTV.infDiv.style.margin, "5px", "ChangeTilesVersion_createInf");
    equal(changeTV.infDiv.style.textAlign, "center", "ChangeTilesVersion_createInf");
    equal(changeTV.infDiv.toString(), p.childNodes[0].toString(), "ChangeTilesVersion_createInf");
});

test("TestChangeTilesVersion_createPopInf", function() {
    expect(4);

    var changeTV = new SuperMap.Control.ChangeTilesVersion();
    var p = document.createElement("div");
    changeTV.createPopInf(p);
    equal(changeTV.infDiv.tagName, "DIV", "ChangeTilesVersion_createInf");
    equal(changeTV.infDiv.className, "smNoSelect", "ChangeTilesVersion_createInf");
    equal(changeTV.infDiv.style.margin, "2px", "ChangeTilesVersion_createInf");
    equal(changeTV.infDiv.style.textAlign, "center", "ChangeTilesVersion_createInf");
});

test("TestChangeTilesVersion_createElementWidthStyle", function() {
    expect(9);

    var changeTV = new SuperMap.Control.ChangeTilesVersion();
    var type = "button",
        position = "absolute",
        top = 5,
        left = 5,
        height = 10,
        width = 20,
        background = "#00FF00",
        imgSrc = "111.png",
        cursor = "pointer";
    var reg = /111\.png/;
    var btn = changeTV.createElementWithStyle(false, type, position, top, left, height, width, background, imgSrc, cursor);
    equal(btn, null, "ChangeTilesVersion_createElementWidthStyle");

    var element = document.createElement("div");
    var btn1 = changeTV.createElementWithStyle(element, type, position, top, left, height, width, background, false, cursor);
    equal(btn1.style.position, position, "ChangeTilesVersion_createElementWidthStyle");
    equal(btn1.style.top, top + "px", "ChangeTilesVersion_createElementWidthStyle");
    equal(btn1.style.left, left + "px", "ChangeTilesVersion_createElementWidthStyle");
    equal(btn1.style.height, height + "px", "ChangeTilesVersion_createElementWidthStyle");
    equal(btn1.style.width, width + "px", "ChangeTilesVersion_createElementWidthStyle");
    equal(btn1.style.background, "rgb(0, 255, 0)", "ChangeTilesVersion_createElementWidthStyle");
    equal(btn1.style.cursor, cursor, "ChangeTilesVersion_createElementWidthStyle");

    var btn2 = changeTV.createElementWithStyle(element, type, position, top, left, height, width, background, imgSrc, cursor);
    equal(reg.test(btn2.style.background), true, "ChangeTilesVersion_createElementWidthStyle");
});

test("TestChangeTilesVersion_sliderDown", function() {
    var changeTV = new SuperMap.Control.ChangeTilesVersion();
    changeTV.draw();
    var evt = {
        which: 1,
        button: 1,
        offsetX: 10
    }
    changeTV.enable = true;
    changeTV.sliderDown(evt);
    equal(changeTV.sliderMouseDown, true, "ChangeTilesVersion_sliderDown");
    equal(changeTV.offset, 10, "ChangeTilesVersion_sliderDown")
});

test("TestChangeTilesVersion_changElementsStyle", function() {
    var changeTV = new SuperMap.Control.ChangeTilesVersion();
    var value = 10;
    changeTV.draw();
    changeTV.changElementsStyle(value)
    for(var i = 0; i < changeTV.changeElements.length; i++){
        equal(changeTV.changeElements[i].style.left,  value + changeTV.elementLefts[i] + "px", "ChangeTilesVersion_changElementsStyle")
    }
});

test("TestChangeTilesVersion_handleEventResult", function() {
    expect(1);

    var options = {
            viewBounds: new SuperMap.Bounds(84.30460372171433, 15.704362017314319, 108.04279582068568, 39.442554116285685),
            viewer: new SuperMap.Size(256,256),
            scale: 2.563206512274041E-8,
            units: "degree"
        },
        dpi = 95.99999999998124,
        url = GlobeParameter.mapServiceURL + "World Map",
        name = "TiledDynamicRESTLayer",
        map = new SuperMap.Map('map'),
        layer = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, {}, options);
    map.addLayer(layer);
    var changeTV = new SuperMap.Control.ChangeTilesVersion();
    map.addControl(changeTV);
    var type = 2;
    changeTV.enable = true;
    changeTV.handleEventResult(type);
    equal(changeTV.popInfDiv.style.display, "block", "TilesVersion_handleEventResult");
});

test("TestChangeTilesVersion_setInf", function() {
    expect(1);

    var changeTV = new SuperMap.Control.ChangeTilesVersion();
    changeTV.draw();
    var desc = "Version1.0";
    changeTV.setInf(desc);
    equal(changeTV.infDiv.innerHTML, desc, "ChangeTilesVersion_setInf");
});

test("TestChangeTilesVersion_getPressedButton", function() {
    expect(2);

    var changeTV = new SuperMap.Control.ChangeTilesVersion();
    var element = document.createElement("button");
    var btn = changeTV.getPressedButton(element);
    equal(btn, null, "ChangeTilesVersion_setInf");

    element.setAttribute("class", "smButton");
    var btn1 = changeTV.getPressedButton(element);
    equal(btn1, btn1, "ChangeTilesVersion_setInf");
});