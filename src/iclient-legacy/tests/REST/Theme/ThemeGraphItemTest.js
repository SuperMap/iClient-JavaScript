module("ThemeGraphItem")
//测试使用默认参数的有效性
test("ThemeGraphItem_1",function(){
    expect(6);
    var themeGraphItem = new SuperMap.REST.ThemeGraphItem();
    
    ok(themeGraphItem!=null, "null" );
    equal(themeGraphItem.caption, null, "themeGraphItem.caption");
    equal(themeGraphItem.graphExpression, null, "themeGraphItem.GraphExpression");
    equal(themeGraphItem.memoryDoubleValues, null, "themeGraphItem.memoryDoubleValues");
    equal(themeGraphItem.uniformStyle.fillBackOpaque, false, "themeGraphItem.uniformStyle.fillBackOpaque");
    equal(themeGraphItem.uniformStyle.lineWidth, 1, "themeGraphItem.uniformStyle.lineWidth");
    
});

//测试设置参数值的有效性以及destroy的有效性
test("ThemeGraphItem_2",function(){
    expect(12);
    var themeGraphItem = new SuperMap.REST.ThemeGraphItem({
        caption: "test",
        graphExpression: 5,
        memoryDoubleValues:2,
        uniformStyle: new SuperMap.REST.ServerStyle({
            fillBackOpaque: true,
            fillGradientAngle: 20,
            fillOpaqueRate: 80
        })
    });
    
    ok(themeGraphItem!=null, "null");
    equal(themeGraphItem.caption, "test", "themeGraphItem.caption");
    equal(themeGraphItem.graphExpression, 5, "themeGraphItem.graphExpression");
    equal(themeGraphItem.memoryDoubleValues, 2, "themeGraphItem.memoryDoubleValues");
    equal(themeGraphItem.uniformStyle.fillBackOpaque, true, "themeGraphItem.uniformStyle.fillBackOpaque");
    equal(themeGraphItem.uniformStyle.fillGradientAngle, 20, "themeGraphItem.uniformStyle.fillGradientAngle");
    equal(themeGraphItem.uniformStyle.fillOpaqueRate, 80, "themeGraphItem.uniformStyle.fillOpaqueRate");

    themeGraphItem.destroy();
    ok(themeGraphItem!=null, "null");
    equal(themeGraphItem.caption, null, "themeGraphItem.caption");
    equal(themeGraphItem.graphExpression, null, "themeGraphItem.graghExpression");
    equal(themeGraphItem.memoryDoubleValues, null, "themeGraphItem.memoryDoubleValues");
    equal(themeGraphItem.uniformStyle, null, "themeGraphItem.uniformStyle");        
    
});

//使用部分参数构建对象时应该将其余参数置为默认值
test("ThemeGraphItem_3",function(){
    expect(7);
    var themeGraphItem = new SuperMap.REST.ThemeGraphItem({
        caption: "test",
        uniformStyle: new SuperMap.REST.ServerStyle({
            fillBackOpaque: true,
            fillGradientAngle: 20,
            fillOpaqueRate: 80
        })       
    });
    ok(themeGraphItem!=null, "null");
    equal(themeGraphItem.caption, "test", "themeGraphItem.caption");
    equal(themeGraphItem.graphExpression, null, "themeGraphItem.graphExpression");
    equal(themeGraphItem.memoryDoubleValues, null, "themeGraphItem.memoryDoubleValues");
    equal(themeGraphItem.uniformStyle.fillBackOpaque, true, "themeGraphItem.uniformStyle.fillBackOpaque");
    equal(themeGraphItem.uniformStyle.fillGradientAngle, 20, "themeGraphItem.uniformStyle.fillGradientAngle");
    equal(themeGraphItem.uniformStyle.fillOpaqueRate, 80, "themeGraphItem.uniformStyle.fillOpaqueRate");
        
});