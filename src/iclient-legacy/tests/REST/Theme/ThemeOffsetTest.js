module("ThemeOffset")

//测试使用默认参数值得有效性
test("ThemeOffset0", function(){
    var themeOffset = new SuperMap.REST.ThemeOffset();
    
    ok(themeOffset !== null,"themeOffset");
    equal(themeOffset.offsetFixed, false, "themeOffset.offsetFixed");
    equal(themeOffset.offsetX, "0.0", "themeOffset.offsetX");
    equal(themeOffset.offsetY, "0.0", "themeOffset.offsetX");
    
    themeOffset.destroy();
    ok(themeOffset !== null, "themeOffset");
    ok(themeOffset.offsetFixed === null, "themeOffset.offsetFixed");
    equal(themeOffset.offsetX, null, "themeOffset.offsetX");
    equal(themeOffset.offsetY, null, "themeOffset.offsetY");
})

//设置参数的有效性
test("ThemeOffset1", function(){
    var themeOffset = new SuperMap.REST.ThemeOffset({
        offsetFixed: true,
        offsetX: "2.0",
        offsetY: "3.0"
    });
    
    ok(themeOffset !== null,"themeOffset");
    ok(themeOffset.offsetFixed == true, "themeOffset.offsetFixed");
    equal(themeOffset.offsetX, "2.0", "themeOffset.offsetX");
    equal(themeOffset.offsetY, "3.0", "themeOffset.offsetY");
    
    themeOffset.destroy();
    ok(themeOffset !== null, "themeOffset");
    ok(themeOffset.offsetFixed === null, "themeOffset.offsetFixed");
    equal(themeOffset.offsetX, null, "themeOffset.offsetX");
    equal(themeOffset.offsetY, null, "themeOffset.offsetY");
})