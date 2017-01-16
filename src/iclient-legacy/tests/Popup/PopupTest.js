module('Popup');
test("testPopup_constructor",function(){
    expect(6);
    var popup = new SuperMap.Popup("chicken",
        new SuperMap.LonLat(5,40),
        new SuperMap.Size(200,200),
        "example popup",
        true,
        null);
    equals(popup.CLASS_NAME,"SuperMap.Popup","CLASS_NAME");
    equals(popup.id,'chicken',"property:id");
    equals(popup.lonlat.lat,40,"property:lonlat");
    equals(popup.contentSize.h,200,"property:contentSize");
    equals(popup.contentSize.w,200,"property:contentSize");
    equals(popup.contentHTML,'example popup',"property:contentHTML");

    popup.destroy();

});
test("testPopup_constructordefault",function(){
    expect(1);
    var popup = new SuperMap.Popup();
    popup.closeOnMove = true;
    var isok = false;

    if(popup.id != null){
        isok = true;
    }
    ok(isok,"property:id");
    popup.destroy();

});
test("testPopup_destroy",function(){
    expect(1);
    var popup = new SuperMap.Popup("chicken",
        new SuperMap.LonLat(5,40),
        new SuperMap.Size(200,200),
        "example popup",
        true);

    popup.destroy();
    var isok = false;
    if(popup.id ==null && popup.lonlat == null && popup.size == null
    && popup.contentHTML == null && popup.backgroundColor == null && popup.opacity == null
    && popup.border == null && popup.map == null && popup.div == null && popup.autoSize == null
    && popup.minSize == null && popup.maxSize == null && popup.padding == null && popup.panMapIfOutOfView == null){
        isok = true;
    }
    ok(isok,"function:destroy");
});
test("testPopup_drawdefault",function(){
    expect(1);
    var popup = new SuperMap.Popup("chicken",
        new SuperMap.LonLat(5,40),
        new SuperMap.Size(200,200),
        "example popup",
        true,
        null);
    var div = popup.draw();
    var isok = false;
    if(div != null){
        isok = true;
    }
    ok(isok,"function:draw");
    popup.destroy();
});
test("testPopup_draw",function(){
    expect(1);
    var popup = new SuperMap.Popup("chicken",
        new SuperMap.LonLat(5,40),
        new SuperMap.Size(200,200),
        "example popup",
        true,
        null);
    var pixel = new SuperMap.Pixel(100,50);
    var div = popup.draw(pixel);
    var isok = false;
    if(div != null){
        isok = true;
    }
    ok(isok,"function:draw");
    popup.destroy();
});
test("testPopup_moveTo",function(){
    expect(2);
    var popup = new SuperMap.Popup("chicken",
        new SuperMap.LonLat(5,40),
        new SuperMap.Size(200,200),
        "example popup",
        true,
        null);
    var px = new SuperMap.Pixel(30,20);
    popup.moveTo(px);
    equals(popup.div.style.left,px.x + "px","function:moveTo");
    equals(popup.div.style.top,px.y + "px","function:moveTo");

    popup.destroy();
});
test("testPopup_visible",function(){
    expect(1);
    var popup = new SuperMap.Popup("chicken",
        new SuperMap.LonLat(5,40),
        new SuperMap.Size(200,200),
        "example popup",
        true,
        null);
    var isok = false;
    isok = popup.visible();
    ok(isok,"function:visible");
    popup.destroy();
});
test("testPopup_toggle",function(){
    expect(1);
    var popup = new SuperMap.Popup("chicken",
        new SuperMap.LonLat(5,40),
        new SuperMap.Size(200,200),
        "example popup",
        true,
        null);
    var isvisible = popup.visible();
    if(isvisible = true){
        popup.toggle();
        equals(popup.div.style.display,"none","function:toggle");
    }
    if(isvisible = false){
        popup.toggle();
        equals(popup.div.style.display,"","function:toggle");
    }
    popup.destroy();
});
test("testPopup_show",function(){
    expect(1);
    var popup = new SuperMap.Popup("chicken",
        new SuperMap.LonLat(5,40),
        new SuperMap.Size(200,200),
        "example popup",
        true,
        null);
    popup.show();
    equals(popup.div.style.display,"","function:show");
});
test("testPopup_hide",function(){
    expect(1);
    var popup = new SuperMap.Popup("chicken",
        new SuperMap.LonLat(5,40),
        new SuperMap.Size(200,200),
        "example popup",
        true,
        null);
    popup.hide();
    equals(popup.div.style.display,"none","function:show");
    popup.destroy();
});
test("testPopup_setBackgroundColor",function(){
    expect(1);
    var popup = new SuperMap.Popup("chicken",
        new SuperMap.LonLat(5,40),
        new SuperMap.Size(200,200),
        "example popup",
        true,
        null);
    var color = "#FFBBBB";
    popup.setBackgroundColor(color);
    equals(popup.backgroundColor,color,"function:setBackgroundColor");

    popup.destroy();
});
test("testPopup_setOpacity",function(){
    expect(1);
    var popup = new SuperMap.Popup("chicken",
        new SuperMap.LonLat(5,40),
        new SuperMap.Size(200,200),
        "example popup",
        true,
        null);
    var opacity = "0.6";
    popup.setOpacity(opacity);
    equals(popup.opacity,"0.6","function:setOpacity");

    popup.destroy();
});
test("testPopup_setBorder",function(){
    expect(1);
    var popup = new SuperMap.Popup("chicken",
        new SuperMap.LonLat(5,40),
        new SuperMap.Size(200,200),
        "example popup",
        true,
        null);
    var border = "solid";
    popup.setBorder(border);
    equals(popup.border,"solid","function:setOpacity");

    popup.destroy();
});
test("testPopup_contentHTML",function(){
    expect(1);
    var popup = new SuperMap.Popup("chicken",
        new SuperMap.LonLat(5,40),
        new SuperMap.Size(200,200),
        "example popup",
        true,
        null);
    var html = "supermp popup";
    popup.setContentHTML(html);
    equals(popup.contentHTML,"supermp popup","function:setOpacity");

    popup.destroy();
});
test("testPopup_getSafeContentSize",function(){
    expect(1);
    var popup = new SuperMap.Popup("chicken",
        new SuperMap.LonLat(5,40),
        new SuperMap.Size(200,200),
        "example popup",
        true,
        null);
    var size = new SuperMap.Size(60,30);
    var safecontentsize = popup.getSafeContentSize(size);
    var isok = true;
    if(safecontentsize.w < 60 && safecontentsize.h < 30 && safecontentsize.w >200 && safecontentsize > 200){
        isok = false;
    }
    ok(isok,"function:getSafeContentSize");
    popup.destroy();
});
test("testPopup_getContentDivPadding",function(){
    expect(1);
    var popup = new SuperMap.Popup("chicken",
        new SuperMap.LonLat(5,40),
        new SuperMap.Size(200,200),
        "example popup",
        true,
        null);
    var contentdivpadding = popup.getContentDivPadding();
    var isok = false;
    if(contentdivpadding != null){
        isok = true;
    }
    ok(isok,"function:getContentDivPadding");
    popup.destroy();
});