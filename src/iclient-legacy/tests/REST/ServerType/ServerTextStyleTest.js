module("ServerTextStyle");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function() {
    expect(23);

    var serverTextStyle;
    serverTextStyle=new SuperMap.REST.ServerTextStyle();

    ok(serverTextStyle != null, "not null" );
    ok(serverTextStyle.align == SuperMap.REST.TextAlignment.BASELINECENTER, "serverTextStyle.align");
    equal(serverTextStyle.backColor.red, 255, "serverTextStyle.backColor.red");
    equal(serverTextStyle.backColor.green, 255, "serverTextStyle.backColor.green");
    equal(serverTextStyle.backColor.blue, 255, "serverTextStyle.backColor.blue");
    equal(serverTextStyle.foreColor.red, 0, "serverTextStyle.foreColor.red");
    equal(serverTextStyle.foreColor.green, 0, "serverTextStyle.foreColor.green");
    equal(serverTextStyle.foreColor.blue, 0, "serverTextStyle.foreColor.blue");
    ok(serverTextStyle.backOpaque == false, "serverTextStyle.backOpaque");
    ok(serverTextStyle.sizeFixed == true, "serverTextStyle.sizeFixed");
    equal(serverTextStyle.fontHeight, 6, "serverTextStyle.fontHeight"); 
    equal(serverTextStyle.fontWidth, 0, "serverTextStyle.fontWidth"); 
    equal(serverTextStyle.fontWeight, 400, "serverTextStyle.fontWeight"); 
    ok(serverTextStyle.fontName == "Times New Roman", "serverTextStyle.fontName");
    ok(serverTextStyle.bold == false, "serverTextStyle.bold");
    ok(serverTextStyle.italic == false, "serverTextStyle.italic");
    equal(serverTextStyle.italicAngle, 0, "serverTextStyle.italicAngle"); 
    ok(serverTextStyle.shadow == false, "serverTextStyle.shadow");
    ok(serverTextStyle.strikeout == false, "serverTextStyle.strikeout");
    ok(serverTextStyle.outline == false, "serverTextStyle.outline");
    equal(serverTextStyle.opaqueRate, 0, "serverTextStyle.opaqueRate"); 
    ok(serverTextStyle.underline == false, "serverTextStyle.underline");
    equal(serverTextStyle.rotation, 0.0, "serverTextStyle.rotation"); 

});

//测试设置参数值的有效性以及destroy的有效性
test("TestConstructor", function() {
    expect(42);

    var serverTextStyle;
    serverTextStyle=new SuperMap.REST.ServerTextStyle({
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
    });

    ok(serverTextStyle != null, "not null" );
    ok(serverTextStyle.align == SuperMap.REST.TextAlignment.TOPLEFT, "serverTextStyle.align");
    equal(serverTextStyle.backColor.red, 255, "serverTextStyle.backColor.red");
    equal(serverTextStyle.backColor.green, 0, "serverTextStyle.backColor.green");
    equal(serverTextStyle.backColor.blue, 255, "serverTextStyle.backColor.blue");
    equal(serverTextStyle.foreColor.red, 255, "serverTextStyle.foreColor.red");
    equal(serverTextStyle.foreColor.green, 255, "serverTextStyle.foreColor.green");
    equal(serverTextStyle.foreColor.blue, 0, "serverTextStyle.foreColor.blue");
    ok(serverTextStyle.backOpaque == true, "serverTextStyle.backOpaque");
    ok(serverTextStyle.sizeFixed == true, "serverTextStyle.sizeFixed");
    equal(serverTextStyle.fontHeight, 10, "serverTextStyle.fontHeight"); 
    equal(serverTextStyle.fontWidth, 10, "serverTextStyle.fontWidth"); 
    equal(serverTextStyle.fontWeight, 200, "serverTextStyle.fontWeight"); 
    ok(serverTextStyle.fontName == "Calibri", "serverTextStyle.fontName");
    ok(serverTextStyle.bold == true, "serverTextStyle.bold");
    ok(serverTextStyle.italic == true, "serverTextStyle.italic");
    equal(serverTextStyle.italicAngle, 30, "serverTextStyle.italicAngle"); 
    ok(serverTextStyle.shadow == true, "serverTextStyle.shadow");
    ok(serverTextStyle.strikeout == true, "serverTextStyle.strikeout");
    ok(serverTextStyle.outline == true, "serverTextStyle.outline");
    equal(serverTextStyle.opaqueRate, 50, "serverTextStyle.opaqueRate"); 
    ok(serverTextStyle.underline == true, "serverTextStyle.underline");
    equal(serverTextStyle.rotation, 30.0, "serverTextStyle.rotation"); 

    serverTextStyle.destroy();
    ok(serverTextStyle != null, "not null" );
    equal(serverTextStyle.align, null, "serverTextStyle.align");
    equal(serverTextStyle.backColor, null, "serverTextStyle.backColor");
    equal(serverTextStyle.foreColor, null, "serverTextStyle.foreColor");
    equal(serverTextStyle.backOpaque, null, "serverTextStyle.backOpaque");
    equal(serverTextStyle.sizeFixed, null, "serverTextStyle.sizeFixed");
    equal(serverTextStyle.fontHeight, null, "serverTextStyle.fontHeight"); 
    equal(serverTextStyle.fontWidth, null, "serverTextStyle.fontWidth"); 
    equal(serverTextStyle.fontWeight, null, "serverTextStyle.fontWeight"); 
    equal(serverTextStyle.fontName, null, "serverTextStyle.fontName"); 
    equal(serverTextStyle.bold, null, "serverTextStyle.bold"); 
    equal(serverTextStyle.italic, null, "serverTextStyle.italic"); 
    equal(serverTextStyle.italicAngle, null, "serverTextStyle.italicAngle"); 
    equal(serverTextStyle.shadow, null, "serverTextStyle.shadow"); 
    equal(serverTextStyle.strikeout, null, "serverTextStyle.strikeout"); 
    equal(serverTextStyle.outline, null, "serverTextStyle.outline"); 
    equal(serverTextStyle.opaqueRate, null, "serverTextStyle.opaqueRate"); 
    equal(serverTextStyle.underline, null, "serverTextStyle.underline"); 
    equal(serverTextStyle.rotation, null, "serverTextStyle.rotation"); 
});


//使用部分参数构建对象时应该将其余参数置为默认值
test("TestDestructor0", function() {
    expect(23);

    var serverTextStyle;
    serverTextStyle=new SuperMap.REST.ServerTextStyle({
        align: SuperMap.REST.TextAlignment.TOPRIGHT,
        backColor: new SuperMap.REST.ServerColor(255, 0, 255),
        foreColor: new SuperMap.REST.ServerColor(255, 255, 0),
        fontWeight: 200,
        fontName: "Calibri",
        bold: true,
        italic: true,
        shadow: true,
        strikeout: true,
        outline: true,
        opaqueRate: 50,
        rotation:30.0
    });

    ok(serverTextStyle != null, "not null" );
    ok(serverTextStyle.align == SuperMap.REST.TextAlignment.TOPRIGHT, "serverTextStyle.align");
    equal(serverTextStyle.backColor.red, 255, "serverTextStyle.backColor.red");
    equal(serverTextStyle.backColor.green, 0, "serverTextStyle.backColor.green");
    equal(serverTextStyle.backColor.blue, 255, "serverTextStyle.backColor.blue");
    equal(serverTextStyle.foreColor.red, 255, "serverTextStyle.foreColor.red");
    equal(serverTextStyle.foreColor.green, 255, "serverTextStyle.foreColor.green");
    equal(serverTextStyle.foreColor.blue, 0, "serverTextStyle.foreColor.blue");
    ok(serverTextStyle.backOpaque == false, "serverTextStyle.backOpaque");
    ok(serverTextStyle.sizeFixed == true, "serverTextStyle.sizeFixed");
    equal(serverTextStyle.fontHeight, 6, "serverTextStyle.fontHeight"); 
    equal(serverTextStyle.fontWidth, 0, "serverTextStyle.fontWidth"); 
    equal(serverTextStyle.fontWeight, 200, "serverTextStyle.fontWeight"); 
    ok(serverTextStyle.fontName == "Calibri", "serverTextStyle.fontName");
    ok(serverTextStyle.bold == true, "serverTextStyle.bold");
    ok(serverTextStyle.italic == true, "serverTextStyle.italic");
    equal(serverTextStyle.italicAngle, 0, "serverTextStyle.italicAngle"); 
    ok(serverTextStyle.shadow == true, "serverTextStyle.shadow");
    ok(serverTextStyle.strikeout == true, "serverTextStyle.strikeout");
    ok(serverTextStyle.outline == true, "serverTextStyle.outline");
    equal(serverTextStyle.opaqueRate, 50, "serverTextStyle.opaqueRate"); 
    ok(serverTextStyle.underline == false, "serverTextStyle.underline");
    equal(serverTextStyle.rotation, 30.0, "serverTextStyle.rotation"); 
});
