module("LabelSymbolCell");

test("TestLabelSymbolCell_1",function(){
    var labelSymbolCell = new SuperMap.REST.LabelSymbolCell();
    ok(labelSymbolCell != null, "labelSymbolCell");
    ok(labelSymbolCell.style != null, "labelSymbolCell.style");
    ok(!labelSymbolCell.symbolIDField, "labelSymbolCell.symbolIDField");
    equal(labelSymbolCell.type, "SYMBOL", "labelSymbolCell.type");
});

test("TestLabelSymbolCell_2",function(){
    var style = new SuperMap.REST.ServerStyle({
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
    var labelSymbolCell = new SuperMap.REST.LabelSymbolCell({
        style: style,
        symbolIDField: "10010"
    });
    ok(labelSymbolCell != null, "labelSymbolCell");
    deepEqual(labelSymbolCell.style, style, "labelSymbolCell.style");
    equal(labelSymbolCell.symbolIDField, "10010", "labelSymbolCell.symbolIDField");
    
    labelSymbolCell.destroy();
    ok(labelSymbolCell.style == null, "labelSymbolCell.style");
    ok(labelSymbolCell.symbolIDField == null, "labelSymbolCell.symbolIDField");
});