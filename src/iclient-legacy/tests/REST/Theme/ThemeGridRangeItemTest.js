module("ThemeGridRangeItem");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function() {
    expect(8);

    var themeGridRangeItem;
    themeGridRangeItem=new SuperMap.REST.ThemeGridRangeItem();

    ok(themeGridRangeItem != null, "not null" );
    equal(themeGridRangeItem.caption, null, "themeGridRangeItem.caption");
    equal(themeGridRangeItem.end, 0, "themeGridRangeItem.end");
    equal(themeGridRangeItem.start, 0, "themeGridRangeItem.start");
    equal(themeGridRangeItem.color.red,255,"themeGridRangeItem.color.red");
    equal(themeGridRangeItem.color.green, 0, "themeGridRangeItem.color.green");
    equal(themeGridRangeItem.color.blue, 0, "themeGridRangeItem.color.blue");
    ok(themeGridRangeItem.visible == true, "themeGridRangeItem.visible");

});

//测试设置参数值的有效性以及destroy的有效性
test("TestConstructor", function() {
    expect(14);
    
    var themeGridRangeItem;
    themeGridRangeItem=new SuperMap.REST.ThemeGridRangeItem({
        caption: "test",
        end: 2,
        start: 1,
        color: new SuperMap.REST.ServerColor(230,14,27),
        visible: false
    
    });

    ok(themeGridRangeItem != null, "not null" );
    equal(themeGridRangeItem.caption, "test", "themeGridRangeItem.caption");
    equal(themeGridRangeItem.end, 2, "themeGridRangeItem.end");
    equal(themeGridRangeItem.start, 1, "themeGridRangeItem.start");
    equal(themeGridRangeItem.color.red, 230, "themeGridRangeItem.color.red");
    equal(themeGridRangeItem.color.green, 14, "themeGridRangeItem.color.green");
    equal(themeGridRangeItem.color.blue, 27, "themeGridRangeItem.color.blue");
    ok(themeGridRangeItem.visible == false, "themeGridRangeItem.visible");

    themeGridRangeItem.destroy();
    ok(themeGridRangeItem != null, "not null" );
    equal(themeGridRangeItem.caption, null, "themeGridRangeItem.caption");
    equal(themeGridRangeItem.end, null, "themeGridRangeItem.end");
    equal(themeGridRangeItem.start, null, "themeGridRangeItem.start");
    equal(themeGridRangeItem.color, null, "themeGridRangeItem.color");
    equal(themeGridRangeItem.visible, null, "themeGridRangeItem.visible");

});


//使用部分参数构建对象时应该将其余参数置为默认值
test("TestDestructor0", function() {
   expect(8);

    var themeGridRangeItem;
    themeGridRangeItem=new SuperMap.REST.ThemeGridRangeItem({
        caption: "test",
        end: 2
    
    });

    ok(themeGridRangeItem != null, "not null" );
    equal(themeGridRangeItem.caption, "test", "themeGridRangeItem.caption");
    equal(themeGridRangeItem.end, 2, "themeGridRangeItem.end");
    equal(themeGridRangeItem.start, 0, "themeGridRangeItem.start");
    equal(themeGridRangeItem.color.red,255,"themeGridRangeItem.color.red");
    equal(themeGridRangeItem.color.green, 0, "themeGridRangeItem.color.green");
    equal(themeGridRangeItem.color.blue, 0, "themeGridRangeItem.color.blue");
    ok(themeGridRangeItem.visible == true, "themeGridRangeItem.visible");
});


