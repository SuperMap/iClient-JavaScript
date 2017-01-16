module("ThemeRange");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function() {
    expect(6);

    var themeRange;
    themeRange=new SuperMap.REST.ThemeRange();

    ok(themeRange != null, "not null" );
    equal(themeRange.items, null, "themeRange.items");
    equal(themeRange.rangeExpression, null, "themeRange.rangeExpression");
    equal(themeRange.rangeMode, SuperMap.REST.RangeMode.EQUALINTERVAL, "themeRange.rangeMode");
    equal(themeRange.rangeParameter, 0, "themeRange.rangeParameter");
    equal(themeRange.colorGradientType, SuperMap.REST.ColorGradientType.YELLOW_RED, "themeRange.colorGradientType");

});

//测试设置参数值的有效性以及destroy的有效性
test("TestConstructor", function() {
    expect(16);
    
    var themeRangeItem;
    themeRangeItem=new SuperMap.REST.ThemeRangeItem({
        caption: "test",
        end: 2,
        start: 1,
        style: new SuperMap.REST.ServerStyle({
            fillBackOpaque: true,
            fillGradientAngle: 20,
            fillOpaqueRate: 80
        }),
        visible: false
    
    });

    var themeRange;
    themeRange=new SuperMap.REST.ThemeRange({
        items:new Array(themeRangeItem),
        rangeExpression: "test",
        rangeMode: SuperMap.REST.RangeMode.SQUAREROOT,
        rangeParameter: 10,
        colorGradientType: SuperMap.REST.ColorGradientType.BLUE_RED
    });

    ok(themeRange != null, "not null" );
    equal(themeRange.items[0].caption, "test", "themeRange.items");
    equal(themeRange.items[0].end, 2, "themeRange.items");
    equal(themeRange.items[0].start, 1, "themeRange.items");
    equal(themeRange.items[0].style.fillOpaqueRate, 80, "themeRange.items");
    equal(themeRange.items[0].visible, false, "themeRange.items");
    equal(themeRange.rangeExpression, "test", "themeRange.rangeExpression");
    equal(themeRange.rangeMode, SuperMap.REST.RangeMode.SQUAREROOT, "themeRange.rangeMode");
    equal(themeRange.rangeParameter, 10, "themeRange.rangeParameter");
    equal(themeRange.colorGradientType, SuperMap.REST.ColorGradientType.BLUE_RED, "themeRange.colorGradientType");

    themeRange.destroy();
    ok(themeRange != null, "not null" );
    equal(themeRange.items, null, "themeRange.items");
    equal(themeRange.rangeExpression, null, "themeRange.end");
    equal(themeRange.rangeMode, null, "themeRange.start");
    equal(themeRange.rangeParameter, null, "themeRange.style"); 
    equal(themeRange.colorGradientType, null, "themeRange.colorGradientType");

});


//使用部分参数构建对象时应该将其余参数置为默认值
test("TestDestructor0", function() {
   expect(6);

    var themeRange;
    themeRange=new SuperMap.REST.ThemeRange({
        items:new Array(),
        rangeExpression: "test",
        rangeMode: SuperMap.REST.RangeMode.SQUAREROOT,
        rangeParameter: 10
    });

    ok(themeRange != null, "not null" );
    equal(themeRange.items.length, 0, "themeRange.items");
    equal(themeRange.rangeExpression, "test", "themeRange.rangeExpression");
    equal(themeRange.rangeMode, SuperMap.REST.RangeMode.SQUAREROOT, "themeRange.rangeMode");
    equal(themeRange.rangeParameter, 10, "themeRange.rangeParameter");
	equal(themeRange.colorGradientType, SuperMap.REST.ColorGradientType.YELLOW_RED, "themeRange.colorGradientType");
});


