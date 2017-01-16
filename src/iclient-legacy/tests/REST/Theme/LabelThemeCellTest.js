module("LabelThemeCell");

test("TestLabelThemeCell_1",function(){
    var labelThemeCell = new SuperMap.REST.LabelThemeCell();
    ok(labelThemeCell != null, "labelThemeCell");
    ok(labelThemeCell.themeLabel != null, "labelThemeCell.themeLabel");
});

test("TestLabelThemeCell_2",function(){
    var themeLabel = new SuperMap.REST.ThemeLabel();
    var labelThemeCell = new SuperMap.REST.LabelThemeCell({
        themeLabel: themeLabel
    });
    ok(labelThemeCell != null, "labelThemeCell");
    deepEqual(labelThemeCell.themeLabel, themeLabel, "labelThemeCell.themeLabel");
    equal(labelThemeCell.type, "THEME", "labelThemeCell.type");
    
    labelThemeCell.destroy();
    ok(labelThemeCell.themeLabel == null, "labelThemeCell.themeLabel");
});