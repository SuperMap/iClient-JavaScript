module("ThemeGraphText")
//测试使用默认参数的有效性
test("ThemeGraphText_1",function(){
    expect(3);
    var themeGraphText = new SuperMap.REST.ThemeGraphText();
    
    ok(themeGraphText!=null, "null" );
    equal(themeGraphText.graphTextDisplayed, false, "themeGraphText.graphTextDisplayed");
    equal(themeGraphText.graphTextFormat, SuperMap.REST.ThemeGraphTextFormat.CAPTION, "themeGraphText.graphTextFormat");
    
});

//测试设置参数值的有效性以及destroy的有效性
test("ThemeGraphText_2",function(){
    expect(10);
    var themeGraphText = new SuperMap.REST.ThemeGraphText({
      graphTextDisplayed: true,
      graphTextFormat: SuperMap.REST.ThemeGraphTextFormat.VALUE,
      graphTextStyle: new SuperMap.REST.ServerTextStyle({
          align: SuperMap.REST.TextAlignment.TOPLEFT,
          sizeFixed: false,
          italicAngle: 20
        })
    });
    
    ok(themeGraphText!=null, "null");
    equal(themeGraphText.graphTextDisplayed, true, "themeGraphText.graphTextDisplayed");
    equal(themeGraphText.graphTextFormat, SuperMap.REST.ThemeGraphTextFormat.VALUE, "themeGraphText.graphTextFormat");  
    equal(themeGraphText.graphTextStyle.align, SuperMap.REST.TextAlignment.TOPLEFT,"themeGraphText.graphTextStyle.align");
    equal(themeGraphText.graphTextStyle.sizeFixed, false, "themeGraphText.graphTextStyle.sizeFixed");
    equal(themeGraphText.graphTextStyle.italicAngle, 20, "themeGraphText.graphTextStyle.italicAngle");
    themeGraphText.destroy();
    ok(themeGraphText!=null, "null");
    equal(themeGraphText.graphTextDisplayed, null, "themeGraphText.graphTextDisplayed");
    equal(themeGraphText.graphTextFormat, null, "themeGraphText.graphTextFormat");  
    equal(themeGraphText.graphTextStyle, null,"themeGraphText.graphTextStyle");
             
});

//使用部分参数构建对象时应该将其余参数置为默认值
test("ThemeGraphText_3",function(){
    expect(6);
    var themeGraphText = new SuperMap.REST.ThemeGraphText({
        graphTextStyle: new SuperMap.REST.ServerTextStyle({
            align: SuperMap.REST.TextAlignment.TOPLEFT,
            sizeFixed: false,
            italicAngle: 20
        })      
    });

    ok(themeGraphText!=null, "null");
    equal(themeGraphText.graphTextDisplayed, false, "themeGraphText.graphTextDisplayed");
    equal(themeGraphText.graphTextFormat, SuperMap.REST.ThemeGraphTextFormat.CAPTION, "themeGraphText.graphTextFormat");  
    equal(themeGraphText.graphTextStyle.align, SuperMap.REST.TextAlignment.TOPLEFT,"themeGraphText.graphTextStyle.align");
    equal(themeGraphText.graphTextStyle.sizeFixed, false, "themeGraphText.graphTextStyle.sizeFixed");
    equal(themeGraphText.graphTextStyle.italicAngle, 20, "themeGraphText.graphTextStyle.italicAngle");
        
});

