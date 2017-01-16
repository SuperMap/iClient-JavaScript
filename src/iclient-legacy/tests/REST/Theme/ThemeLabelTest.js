module("ThemeLabel");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function() {
    expect(19);
    var themeLabel;
    themeLabel = new SuperMap.REST.ThemeLabel();

    ok(themeLabel != null, "not null");
    equal(themeLabel.CLASS_NAME, "SuperMap.REST.ThemeLabel", "themeLabel.CLASS_NAME");
    equal(themeLabel.alongLine.CLASS_NAME, "SuperMap.REST.ThemeLabelAlongLine", "themeLabel.alongLine");
    equal(themeLabel.background.CLASS_NAME, "SuperMap.REST.ThemeLabelBackground", "themeLabel.background");
    equal(themeLabel.flow.CLASS_NAME, "SuperMap.REST.ThemeFlow", "themeLabel.flow");
    equal(themeLabel.items, null, "themeLabel.items");
    equal(themeLabel.uniqueItems, null, "themeLabel.uniqueItems");
    equal(themeLabel.labelExpression, null, "themeLabel.labelExpression");
    equal(themeLabel.labelOverLengthMode, SuperMap.REST.LabelOverLengthMode.NONE, "themeLabel.labelOverLengthMode");
    equal(themeLabel.matrixCells, null, "themeLabel.matrixCells");
    equal(themeLabel.maxLabelLength, 256, "themeLabel.maxLabelLength");
    equal(themeLabel.numericPrecision, 0, "themeLabel.numericPrecision");
    equal(themeLabel.offset.CLASS_NAME, "SuperMap.REST.ThemeOffset", "themeLabel.offset");
    equal(themeLabel.overlapAvoided, true, "themeLabel.overlapAvoided");
    equal(themeLabel.rangeExpression, null, "themeLabel.rangeExpression");
    equal(themeLabel.uniqueExpression, null, "themeLabel.uniqueExpression");
    equal(themeLabel.smallGeometryLabeled, false, "themeLabel.smallGeometryLabeled");
    equal(themeLabel.items, null, "themeLabel.items");
    equal(themeLabel.text.CLASS_NAME, "SuperMap.REST.ThemeLabelText", "themeLabel.text");
});

//测试设置参数值的有效性
test("TestConstructor", function() {
    expect(7);
    var themeLabelItem;
    themeLabelItem=new SuperMap.REST.ThemeLabelItem({
        unique: "黑龙江省",
        style: new SuperMap.REST.ServerStyle({
            fillBackOpaque: true,
            fillGradientAngle: 20,
            fillOpaqueRate: 80
        }),
        visible: false

    });

    var themeLabel;
    themeLabel=new SuperMap.REST.ThemeLabel({
        items:new Array(themeLabelItem),
        labelExpression: "test",
    });

    ok(themeLabel != null, "not null" );
    equal(themeLabel.items[0].unique, "黑龙江省", "themeLabel.items");
    equal(themeLabel.items[0].style.fillBackOpaque, true, "themeLabel.items");
    equal(themeLabel.items[0].style.fillGradientAngle, 20, "themeLabel.items");
    equal(themeLabel.items[0].style.fillOpaqueRate, 80, "themeLabel.items");
    equal(themeLabel.items[0].visible, false, "themeLabel.items");
    equal(themeLabel.labelExpression, "test", "themeLabel.labelExpression");
});

test("TestDestroy", function() {
    expect(3);
    var themeLabelItem;
    themeLabelItem=new SuperMap.REST.ThemeLabelItem({
        unique: "黑龙江省",
        style: new SuperMap.REST.ServerStyle({
            fillBackOpaque: true,
            fillGradientAngle: 20,
            fillOpaqueRate: 80
        }),
        visible: false

    });

    var themeLabel;
    themeLabel=new SuperMap.REST.ThemeLabel({
        items:new Array(themeLabelItem),
        labelExpression: "test",
    });

    themeLabel.destroy();
    ok(themeLabel != null, "not null" );
    equal(themeLabel.items, null, "themeLabel.items");
    equal(themeLabel.labelExpression, null, "themeLabel.labelExpression");
});

test("TestToJSON", function() {
    expect(2);
    var themeLabel;
    themeLabel = new SuperMap.REST.ThemeLabel();
    var themeLabelObj = themeLabel.toJSON();
    ok(typeof themeLabelObj, String, "toJSON");
    equal(eval('(' + themeLabelObj + ')').toString(), themeLabel.toString(), "toJSON");
});

test("TestToServerJSONObject", function() {
    expect(2);
    var themeLabel;
    themeLabel = new SuperMap.REST.ThemeLabel();
    var themeLabelJSON = themeLabel.toServerJSONObject();
    ok(typeof themeLabelJSON, Object, "toServerJSONObject");
    equal(themeLabelJSON.toString(), themeLabel.toString(), "toServerJSONObject");
});
