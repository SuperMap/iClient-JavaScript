module("LabelMixedTextStyle");

test("TestLabelMixedTextStyle_1",function(){
    var labelMixedTextStyle = new SuperMap.REST.LabelMixedTextStyle();
    ok(labelMixedTextStyle != null, "labelMixedTextStyle");
    ok(labelMixedTextStyle.defaultStyle != null, "labelMixedTextStyle.defaultStyle");
    ok(labelMixedTextStyle.separator == null, "labelMixedTextStyle.separator");
    ok(!labelMixedTextStyle.separatorEnabled, "labelMixedTextStyle.separatorEnabled");
    ok(labelMixedTextStyle.splitIndexes == null, "labelMixedTextStyle.splitIndexes");
    ok(labelMixedTextStyle.styles == null, "labelMixedTextStyle.styles");
    labelMixedTextStyle.destroy();
    ok(labelMixedTextStyle.defaultStyle == null, "labelMixedTextStyle.defaultStyle");
    ok(labelMixedTextStyle.separator == null, "labelMixedTextStyle.separator");
    ok(labelMixedTextStyle.separatorEnabled == null, "labelMixedTextStyle.separatorEnabled");
    ok(labelMixedTextStyle.splitIndexes == null, "labelMixedTextStyle.splitIndexes");
    ok(labelMixedTextStyle.styles == null, "labelMixedTextStyle.styles");
});

test("TestLabelMixedTextStyle_2",function(){
    var labelMixedTextStyle = new SuperMap.REST.LabelMixedTextStyle({
        separator: "_",
        separatorEnabled: true
    });
    ok(labelMixedTextStyle != null, "labelMixedTextStyle");
    ok(labelMixedTextStyle.defaultStyle != null, "labelMixedTextStyle.defaultStyle");
    equal(labelMixedTextStyle.separator, "_", "labelMixedTextStyle.separator");
    ok(labelMixedTextStyle.separatorEnabled, "labelMixedTextStyle.separatorEnabled");
    ok(labelMixedTextStyle.splitIndexes == null, "labelMixedTextStyle.splitIndexes");
    ok(labelMixedTextStyle.styles == null, "labelMixedTextStyle.styles");
    
    labelMixedTextStyle.destroy();
    ok(labelMixedTextStyle.defaultStyle == null, "labelMixedTextStyle.defaultStyle");
    ok(labelMixedTextStyle.separator == null, "labelMixedTextStyle.separator");
    ok(labelMixedTextStyle.separatorEnabled == null, "labelMixedTextStyle.separatorEnabled");
    ok(labelMixedTextStyle.splitIndexes == null, "labelMixedTextStyle.splitIndexes");
    ok(labelMixedTextStyle.styles == null, "labelMixedTextStyle.styles");
});

test("TestLabelMixedTextStyle_3",function(){
    var style1 = new SuperMap.REST.ServerStyle({
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
    var style2 = new SuperMap.REST.ServerStyle({
        fillBackColor: new SuperMap.REST.ServerColor(0, 0, 255),
        fillBackOpaque: true,
        fillForeColor: new SuperMap.REST.ServerColor(255, 0, 0),
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
        markerSize: 3,
        markerSymbolID: 0
    });
    var labelMixedTextStyle = new SuperMap.REST.LabelMixedTextStyle({
        splitIndexes: new Array(2, 4),
        styles: new Array(style1, style2),
    });
    ok(labelMixedTextStyle != null, "labelMixedTextStyle");
    ok(labelMixedTextStyle.defaultStyle != null, "labelMixedTextStyle.defaultStyle");
    ok(labelMixedTextStyle.separator == null, "labelMixedTextStyle.separator");
    ok(!labelMixedTextStyle.separatorEnabled, "labelMixedTextStyle.separatorEnabled");
    ok(labelMixedTextStyle.splitIndexes != null, "labelMixedTextStyle.splitIndexes.length");
    equal(labelMixedTextStyle.splitIndexes.length, 2, "labelMixedTextStyle.splitIndexes");
    ok(labelMixedTextStyle.styles != null, "labelMixedTextStyle.styles");
    deepEqual(labelMixedTextStyle.styles[0], style1, "labelMixedTextStyle.styles[0]");
    deepEqual(labelMixedTextStyle.styles[1], style2, "labelMixedTextStyle.styles[1]");
    
    labelMixedTextStyle.destroy();
    ok(labelMixedTextStyle.defaultStyle == null, "labelMixedTextStyle.defaultStyle");
    ok(labelMixedTextStyle.separator == null, "labelMixedTextStyle.separator");
    ok(labelMixedTextStyle.separatorEnabled == null, "labelMixedTextStyle.separatorEnabled");
    ok(labelMixedTextStyle.splitIndexes == null, "labelMixedTextStyle.splitIndexes");
    ok(labelMixedTextStyle.styles == null, "labelMixedTextStyle.styles");
});