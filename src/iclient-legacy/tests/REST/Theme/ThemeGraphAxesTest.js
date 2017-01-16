module("ThemeGraphAxes")
//测试使用默认参数及destroy的有效性
test("ThemeGraphAxes_1",function(){
    expect(7);
    var themeGraphAxes = new SuperMap.REST.ThemeGraphAxes();
    
    ok(themeGraphAxes!=null, "null" );
    ok(!themeGraphAxes.axesDisplayed,"themeGraphAxes.axesDisplayed");
    ok(!themeGraphAxes.axesGridDisplayed,"themeGraphAxes.axesGridDisplayed");
    ok(!themeGraphAxes.axesTextDisplayed,"themeGraphAxes.axesTextDisplayed");

    themeGraphAxes.destroy();
    ok(themeGraphAxes.axesDisplayed == null, "themeGraphAxes.axesDisplayed");
    ok(themeGraphAxes.axesGridDisplayed == null, "themeGraphAxes.axesGridDisplayed");
    ok(themeGraphAxes.axesTextDisplayed == null, "themeGraphAxes.axesTextDisplayed");
});

//测试设置参数值的有效性
test("ThemeGraphAxes_2",function(){
    expect(6);
    var themeGraphAxes = new SuperMap.REST.ThemeGraphAxes({
        axesDisplayed: true,
        axesGridDisplayed: true, 
        axesTextDisplayed: false,
        axesColor: new SuperMap.REST.ServerStyle({
            fillBackOpaque: true,
            fillOpaqueRate: 80})
    });
    
    ok(themeGraphAxes!=null, "null" );
    ok(themeGraphAxes.axesDisplayed,"themeGraphAxes.axesDisplayed");
    ok(themeGraphAxes.axesGridDisplayed,"themeGraphAxes.axesGridDisplayed");
    ok(!themeGraphAxes.axesTextDisplayed,"themeGraphAxes.axesTextDisplayed");
    equal(themeGraphAxes.axesColor.fillBackOpaque, true,"themeGraphAxes.axesColor.fillBackOpaque");
    equal(themeGraphAxes.axesColor.fillOpaqueRate, 80,"themeGraphAxes.axesColor.fillOpaqueRate");
        
});

//使用部分参数构建对象时应该将其余参数置为默认值
test("ThemeGraphAxes_3",function(){
    expect(8);
    var themeGraphAxes = new SuperMap.REST.ThemeGraphAxes({
        axesTextDisplayed: true,
        axesTextStyle: new SuperMap.REST.ServerTextStyle({
            align: SuperMap.REST.TextAlignment.TOPLEFT,
            sizeFixed: false,
            italicAngle: 20
            })
    });
    ok(themeGraphAxes!=null, "null" );
    ok(!themeGraphAxes.axesDisplayed,"themeGraphAxes.axesDisplayed");
    ok(!themeGraphAxes.axesGridDisplayed,"themeGraphAxes.axesGridDisplayed");
    ok(themeGraphAxes.axesTextDisplayed,"themeGraphAxes.axesTextDisplayed");
    equal(themeGraphAxes.axesTextStyle.align, SuperMap.REST.TextAlignment.TOPLEFT,"themeGraphAxes.axesTextStyle");
    equal(themeGraphAxes.axesTextStyle.sizeFixed, false, "themeGraphAxes.axesTextStyle.sizeFixed");
    equal(themeGraphAxes.axesTextStyle.italicAngle, 20, "themeGraphAxes.axesTextStyle.italicAngle");
    themeGraphAxes.destroy();
    ok(themeGraphAxes.axesTextDisplayed == null, "themeGraphAxes.axesTextDisplayed");
});