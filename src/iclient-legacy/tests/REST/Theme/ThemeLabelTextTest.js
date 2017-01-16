module("ThemeLabelText");

test("TestThemeLabelText_1",function(){
    var themeLabelText = new SuperMap.REST.ThemeLabelText();
    ok(themeLabelText != null, "themeLabelText");
    equal(themeLabelText.maxTextHeight, 0, "themeLabelText.maxTextHeight");
    equal(themeLabelText.maxTextWidth, 0, "themeLabelText.maxTextWidth");
    equal(themeLabelText.minTextHeight, 0, "themeLabelText.minTextHeight");
    equal(themeLabelText.minTextWidth, 0, "themeLabelText.minTextWidth");
    ok(themeLabelText.uniformMixedStyle == null, "themeLabelText.uniformMixedStyle");
    ok(themeLabelText.uniformStyle != null, "themeLabelText.uniformStyle");
    
    themeLabelText.destroy();
    ok(themeLabelText.maxTextHeight == null, "themeLabelText.maxTextHeight");
    ok(themeLabelText.maxTextWidth == null, "themeLabelText.maxTextWidth");
    ok(themeLabelText.minTextHeight == null, "themeLabelText.minTextHeight");
    ok(themeLabelText.minTextWidth == null, "themeLabelText.minTextWidth");
    ok(themeLabelText.uniformMixedStyle == null, "themeLabelText.uniformMixedStyle");
    ok(themeLabelText.uniformStyle == null, "themeLabelText.uniformStyle");
});

test("TestThemeLabelText_2",function(){
    var themeLabelText = new SuperMap.REST.ThemeLabelText({
        maxTextHeight: 20,
        maxTextWidth: 30,
        minTextHeight: 2,
        minTextWidth: 5
    });
    equal(themeLabelText.maxTextHeight, 20, "themeLabelText.maxTextHeight");
    equal(themeLabelText.maxTextWidth, 30, "themeLabelText.maxTextWidth");
    equal(themeLabelText.minTextHeight, 2, "themeLabelText.minTextHeight");
    equal(themeLabelText.minTextWidth, 5, "themeLabelText.minTextWidth");
    ok(themeLabelText.uniformMixedStyle == null, "themeLabelText.uniformMixedStyle");
    ok(themeLabelText.uniformStyle != null, "themeLabelText.uniformStyle");
    
    themeLabelText.destroy();
    ok(themeLabelText.maxTextHeight == null, "themeLabelText.maxTextHeight");
    ok(themeLabelText.maxTextWidth == null, "themeLabelText.maxTextWidth");
    ok(themeLabelText.minTextHeight == null, "themeLabelText.minTextHeight");
    ok(themeLabelText.minTextWidth == null, "themeLabelText.minTextWidth");
    ok(themeLabelText.uniformMixedStyle == null, "themeLabelText.uniformMixedStyle");
    ok(themeLabelText.uniformStyle == null, "themeLabelText.uniformStyle");
});

test("TestThemeLabelText_3",function(){
    var uniformMixedStyle = new SuperMap.REST.LabelMixedTextStyle({
        separator: "_",
        separatorEnabled: true
    });
    var uniformStyle = new SuperMap.REST.ServerTextStyle();
    var themeLabelText = new SuperMap.REST.ThemeLabelText({
        maxTextHeight: 20,
        maxTextWidth: 30,
        minTextHeight: 2,
        minTextWidth: 5,
        uniformMixedStyle: uniformMixedStyle,
        uniformStyle: uniformStyle
    });
    equal(themeLabelText.maxTextHeight, 20, "themeLabelText.maxTextHeight");
    equal(themeLabelText.maxTextWidth, 30, "themeLabelText.maxTextWidth");
    equal(themeLabelText.minTextHeight, 2, "themeLabelText.minTextHeight");
    equal(themeLabelText.minTextWidth, 5, "themeLabelText.minTextWidth");
    ok(themeLabelText.uniformMixedStyle != null, "themeLabelText.uniformMixedStyle");    
    deepEqual(themeLabelText.uniformMixedStyle, uniformMixedStyle, "themeLabelText.uniformMixedStyle");
    ok(themeLabelText.uniformStyle != null, "themeLabelText.uniformStyle");
    deepEqual(themeLabelText.uniformStyle, uniformStyle, "themeLabelText.uniformStyle");
    themeLabelText.destroy();
    ok(themeLabelText.maxTextHeight == null, "themeLabelText.maxTextHeight");
    ok(themeLabelText.maxTextWidth == null, "themeLabelText.maxTextWidth");
    ok(themeLabelText.minTextHeight == null, "themeLabelText.minTextHeight");
    ok(themeLabelText.minTextWidth == null, "themeLabelText.minTextWidth");
    ok(themeLabelText.uniformMixedStyle == null, "themeLabelText.uniformMixedStyle");
    ok(themeLabelText.uniformStyle == null, "themeLabelText.uniformStyle");
});