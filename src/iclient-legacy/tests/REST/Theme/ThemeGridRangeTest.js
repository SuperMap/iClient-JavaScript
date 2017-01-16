module("ThemeGridRange");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function() {
    expect(6);

    var themeGridRange;
    themeGridRange=new SuperMap.REST.ThemeGridRange();

    ok(themeGridRange != null, "not null" );
    equal(themeGridRange.items, null, "themeGridRange.items");
    equal(themeGridRange.reverseColor, false, "themeGridRange.reverseColor");
    equal(themeGridRange.rangeMode, SuperMap.REST.RangeMode.EQUALINTERVAL, "themeGridRange.rangeMode");
    equal(themeGridRange.rangeParameter, 0, "themeGridRange.rangeParameter");
    equal(themeGridRange.colorGradientType, SuperMap.REST.ColorGradientType.YELLOW_RED, "themeGridRange.colorGradientType");

});

//测试设置参数值的有效性以及destroy的有效性
test("TestConstructor", function() {
    expect(16);
    
    var themeGridRangeItem;
    themeGridRangeItem=new SuperMap.REST.ThemeGridRangeItem({
        caption: "test",
        end: 2,
        start: 1,
        color: new SuperMap.REST.ServerColor(213,24,27),
        visible: false
    
    });

    var themeGridRange;
    themeGridRange=new SuperMap.REST.ThemeGridRange({
        items:new Array(themeGridRangeItem),
        reverseColor: true,
        rangeMode: SuperMap.REST.RangeMode.SQUAREROOT,
        rangeParameter: 10,
        colorGradientType: SuperMap.REST.ColorGradientType.BLUE_RED
    });

    ok(themeGridRange != null, "not null" );
    equal(themeGridRange.items[0].caption, "test", "themeGridRange.items[0].caption");
    equal(themeGridRange.items[0].end, 2, "themeGridRange.items[0].end");
    equal(themeGridRange.items[0].start, 1, "themeGridRange.items[0].start");
    equal(themeGridRange.items[0].color.red, 213, "themeGridRange.items[0].red");
    equal(themeGridRange.items[0].visible, false, "themeGridRange.items[0].visible");
    equal(themeGridRange.reverseColor, true, "themeGridRange.reverseColor");
    equal(themeGridRange.rangeMode, SuperMap.REST.RangeMode.SQUAREROOT, "themeGridRange.rangeMode");
    equal(themeGridRange.rangeParameter, 10, "themeGridRange.rangeParameter");
    equal(themeGridRange.colorGradientType, SuperMap.REST.ColorGradientType.BLUE_RED, "themeGridRange.colorGradientType");

    themeGridRange.destroy();
    ok(themeGridRange != null, "not null" );
    equal(themeGridRange.items, null, "themeGridRange.items");
    equal(themeGridRange.reverseColor, null, "themeGridRange.reverseColor");
    equal(themeGridRange.rangeMode, null, "themeGridRange.rangeMode");
    equal(themeGridRange.rangeParameter, null, "themeGridRange.rangeParameter");
    equal(themeGridRange.colorGradientType, null, "themeGridRange.colorGradientType");

});


//使用部分参数构建对象时应该将其余参数置为默认值
test("TestDestructor0", function() {
   expect(6);

    var themeGridRange;
    themeGridRange=new SuperMap.REST.ThemeGridRange({
        reverseColor: true,
        rangeMode: SuperMap.REST.RangeMode.SQUAREROOT,
        rangeParameter: 10
    });

    ok(themeGridRange != null, "not null" );
    equal(themeGridRange.items,null, "themeGridRange.items");
    equal(themeGridRange.reverseColor, true, "themeGridRange.rangeExpression");
    equal(themeGridRange.rangeMode, SuperMap.REST.RangeMode.SQUAREROOT, "themeGridRange.rangeMode");
    equal(themeGridRange.rangeParameter, 10, "themeGridRange.rangeParameter");
	equal(themeGridRange.colorGradientType, SuperMap.REST.ColorGradientType.YELLOW_RED, "themeGridRange.colorGradientType");
});


