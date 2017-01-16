module("ThemeLabelItem");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function() {
    var themeLabelItem = new SuperMap.REST.ThemeLabelItem();

    ok(themeLabelItem != null, "not null" );
    equal(themeLabelItem.caption, null, "themeLabelItem.caption");
    equal(themeLabelItem.end, 0, "themeLabelItem.end");
    equal(themeLabelItem.start, 0, "themeLabelItem.start");
    ok(themeLabelItem.style != null, "themeLabelItem.style");
    
    ok(themeLabelItem.visible == true, "themeLabelItem.visible");

});

//测试设置参数值的有效性以及destroy的有效性
test("TestConstructor", function() {
    var themeLabelItem;
    themeLabelItem=new SuperMap.REST.ThemeLabelItem({
        caption: "test",
        end: 2,
        start: 1,
        visible: false
    });

    ok(themeLabelItem != null, "not null" );
    equal(themeLabelItem.caption, "test", "themeLabelItem.caption");
    equal(themeLabelItem.end, 2, "themeLabelItem.end");
    equal(themeLabelItem.start, 1, "themeLabelItem.start");
    ok(themeLabelItem.style != null, "themeLabelItem.style");
    ok(themeLabelItem.visible == false, "themeLabelItem.visible");

    themeLabelItem.destroy();
    ok(themeLabelItem != null, "not null" );
    equal(themeLabelItem.caption, null, "themeLabelItem.caption");
    equal(themeLabelItem.end, null, "themeLabelItem.end");
    equal(themeLabelItem.start, null, "themeLabelItem.start");
    equal(themeLabelItem.style, null, "themeLabelItem.style"); 
    equal(themeLabelItem.visible, null, "themeLabelItem.visible"); 

});


//使用部分参数构建对象时应该将其余参数置为默认值
test("TestDestructor0", function() {
    var style = new SuperMap.REST.ServerTextStyle({
        align: SuperMap.REST.TextAlignment.TOPLEFT,
        backColor: new SuperMap.REST.ServerColor(255, 0, 255),
        foreColor: new SuperMap.REST.ServerColor(255, 255, 0),
        backOpaque: true,
        sizeFixed: true,
        fontHeight: 10,
        fontWidth: 10,
        fontWeight: 200,
        fontName: "Calibri",
        bold: true,
        italic: true,
        italicAngle: 30,
        shadow: true,
        strikeout: true,
        outline: true,
        opaqueRate: 50,
        underline: true,
        rotation:30.0
    });;
    var themeLabelItem=new SuperMap.REST.ThemeLabelItem({
        caption: "test",
        end: 2,
        style: style
    });

    ok(themeLabelItem != null, "not null" );
    equal(themeLabelItem.caption, "test", "themeLabelItem.caption");
    equal(themeLabelItem.end, 2, "themeLabelItem.end");
    equal(themeLabelItem.start, 0, "themeLabelItem.start");
    ok(themeLabelItem.style != null, "themeLabelItem.style");
    deepEqual(themeLabelItem.style, style, "themeLabelItem.start");
    ok(themeLabelItem.visible == true, "themeLabelItem.visible");
});