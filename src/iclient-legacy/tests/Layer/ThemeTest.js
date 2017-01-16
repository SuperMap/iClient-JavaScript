module("ThemeLayer");
var name = "Theme layer";

test("TestTheme_constructor",function () {
    expect(5);
    var themeLayer = new SuperMap.Layer.Theme(name);

    ok(themeLayer instanceof SuperMap.Layer.Theme, "layer instanceof SuperMap.Layer.Theme");
    equals(themeLayer.name, name , "the name of test");
    equals(themeLayer.CLASS_NAME, "SuperMap.Layer.Theme", "CLASS_NAME");
    equals(themeLayer.features.length,0, "default_features");
    equals(themeLayer.isBaseLayer,false, "default_isBaseLayer");
    themeLayer.destroy();
});

test("TestTheme_destroy", function () {
    expect(1);

    var themeLayer = new SuperMap.Layer.Theme(name);

    themeLayer.destroy();
    //SuperMap.Layer.Theme的destroy方法
    ok(themeLayer.name == null,"themeLayer使用destroy方法后，name为null");
});
