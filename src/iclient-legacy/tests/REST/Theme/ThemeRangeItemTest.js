module("ThemeRangeItem");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function() {
    expect(7);

    var themeRangeItem;
    themeRangeItem=new SuperMap.REST.ThemeRangeItem();

    ok(themeRangeItem != null, "not null" );
    equal(themeRangeItem.caption, null, "themeRangeItem.caption");
    equal(themeRangeItem.end, 0, "themeRangeItem.end");
    equal(themeRangeItem.start, 0, "themeRangeItem.start");
    equal(themeRangeItem.style.fillBackOpaque, false, "themeRangeItem.style.fillBackOpaque");
    equal(themeRangeItem.style.fillOpaqueRate, 100, "themeRangeItem.style.fillOpaqueRate");
    ok(themeRangeItem.visible == true, "themeRangeItem.visible");

});

//测试设置参数值的有效性以及destroy的有效性
test("TestConstructor", function() {
    expect(14);
    
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

    ok(themeRangeItem != null, "not null" );
    equal(themeRangeItem.caption, "test", "themeRangeItem.caption");
    equal(themeRangeItem.end, 2, "themeRangeItem.end");
    equal(themeRangeItem.start, 1, "themeRangeItem.start");
    equal(themeRangeItem.style.fillBackOpaque, true, "themeRangeItem.style.fillBackOpaque");
    equal(themeRangeItem.style.fillGradientAngle, 20, "themeRangeItem.style.fillGradientAngle");
    equal(themeRangeItem.style.fillOpaqueRate, 80, "themeRangeItem.style.fillOpaqueRate");
    ok(themeRangeItem.visible == false, "themeRangeItem.visible");

    themeRangeItem.destroy();
    ok(themeRangeItem != null, "not null" );
    equal(themeRangeItem.caption, null, "themeRangeItem.caption");
    equal(themeRangeItem.end, null, "themeRangeItem.end");
    equal(themeRangeItem.start, null, "themeRangeItem.start");
    equal(themeRangeItem.style, null, "themeRangeItem.style"); 
    equal(themeRangeItem.visible, null, "themeRangeItem.visible"); 

});


//使用部分参数构建对象时应该将其余参数置为默认值
test("TestDestructor0", function() {
   expect(8);

    var themeRangeItem;
    themeRangeItem=new SuperMap.REST.ThemeRangeItem({
        caption: "test",
        end: 2,
        style: new SuperMap.REST.ServerStyle({
            fillBackOpaque: true,
            fillGradientAngle: 20,
            fillOpaqueRate: 80
        })
    
    });

    ok(themeRangeItem != null, "not null" );
    equal(themeRangeItem.caption, "test", "themeRangeItem.caption");
    equal(themeRangeItem.end, 2, "themeRangeItem.end");
    equal(themeRangeItem.start, 0, "themeRangeItem.start");
    equal(themeRangeItem.style.fillBackOpaque, true, "themeRangeItem.style.fillBackOpaque");
    equal(themeRangeItem.style.fillGradientAngle, 20, "themeRangeItem.style.fillGradientAngle");
    equal(themeRangeItem.style.fillOpaqueRate, 80, "themeRangeItem.style.fillOpaqueRate");
    ok(themeRangeItem.visible == true, "themeRangeItem.visible");
});


