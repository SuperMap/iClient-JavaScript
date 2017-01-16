module("ThemeGraphSize")
//测试使用默认参数的有效性
test("ThemeGraphSize_1",function(){
    expect(3);
    var themeGraphSize = new SuperMap.REST.ThemeGraphSize();
    
    ok(themeGraphSize!=null, "null" );
    equal(themeGraphSize.maxGraphSize, 0, "themeGraphSize.maxGraphSize");
    equal(themeGraphSize.minGraphSize, 0, "themeGraphSize.minGraphSize");       
});

//测试设置参数值的有效性以及destroy的有效性
test("ThemeGraphSize_2",function(){
    expect(6);
    var themeGraphSize = new SuperMap.REST.ThemeGraphSize({
      maxGraphSize: 100,
      minGraphSize: 10
    });
    
    ok(themeGraphSize!=null, "null");
    equal(themeGraphSize.maxGraphSize, 100, "themeGraphSize.maxGraphSize");
    equal(themeGraphSize.minGraphSize, 10, "themeGraphSize.minGraphSize");  

    themeGraphSize.destroy();
    ok(themeGraphSize!=null, "null");
    equal(themeGraphSize.maxGraphSize, null, "themeGraphSize.maxGraphSize");
    equal(themeGraphSize.minGraphSize, null, "themeGraphSize.minGraphSize");         
    
});

