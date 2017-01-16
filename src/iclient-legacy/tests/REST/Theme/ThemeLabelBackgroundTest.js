module("ThemeLabelBackground");

test("TestThemeLabelBackground_1",function(){
    var themeLabelBackground = new SuperMap.REST.ThemeLabelBackground();
    ok(themeLabelBackground != null, "themeLabelBackground");
    ok(themeLabelBackground.backStyle != null, "themeLabelBackground.backStyle");
    equal(themeLabelBackground.labelBackShape, SuperMap.REST.LabelBackShape.NONE, "themeLabelBackground.labelBackShape");
});

test("TestThemeLabelBackground_2",function(){
    var backStyle = new SuperMap.REST.ServerStyle({
        fillBackColor: new SuperMap.REST.ServerColor(255, 0, 255),
        fillBackOpaque: true,
        fillForeColor: new SuperMap.REST.ServerColor(255, 255, 0),
        fillGradientMode: SuperMap.REST.FillGradientMode.LINEAR,
        fillGradientAngle: 30,
        fillGradientOffsetRatioX: 10,
        fillGradientOffsetRatioY: 10,
        fillOpaqueRate: 50,
        fillSymbolID: 2,
        lineColor: new SuperMap.REST.ServerColor(255, 0, 0),
        lineSymbolID: 2,
        lineWidth: 2,
        markerAngle: 30,
        markerSize: 2,
        markerSymbolID: 0
    });
    var themeLabelBackground = new SuperMap.REST.ThemeLabelBackground({
        backStyle: backStyle,
        labelBackShape: SuperMap.REST.LabelBackShape.RECT
    });
    ok(themeLabelBackground != null, "themeLabelBackground");
    deepEqual(themeLabelBackground.backStyle, backStyle, "themeLabelBackground.backStyle");
    equal(themeLabelBackground.labelBackShape, SuperMap.REST.LabelBackShape.RECT, "themeLabelBackground.labelBackShape");
    
    themeLabelBackground.destroy();
    ok(themeLabelBackground.backStyle == null, "themeLabelBackground.backStyle");
    ok(themeLabelBackground.labelBackShape == null, "themeLabelBackground.labelBackShape");
});