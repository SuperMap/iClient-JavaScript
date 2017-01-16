module("ThemeLabelAlongLine");

test("TestThemeLabelAlongLine_1",function(){
    var themeLabelAlongLine = new SuperMap.REST.ThemeLabelAlongLine();
    ok(themeLabelAlongLine != null, "themeLabelAlongLine");
    equal(themeLabelAlongLine.alongLineDirection, SuperMap.REST.AlongLineDirection.LB_TO_RT, "themeLabelAlongLine.alongLineDirection");
    ok(!themeLabelAlongLine.angleFixed, "themeLabelAlongLine.angleFixed");
    ok(themeLabelAlongLine.isAlongLine, "themeLabelAlongLine.isAlongLine");
    ok(!themeLabelAlongLine.isLabelRepeated, "themeLabelAlongLine.isLabelRepeated");
    equal(themeLabelAlongLine.labelRepeatInterval, 0, "themeLabelAlongLine.labelRepeatInterval");
    ok(!themeLabelAlongLine.repeatedLabelAvoided, "themeLabelAlongLine.repeatedLabelAvoided");
    ok(!themeLabelAlongLine.repeatIntervalFixed, "themeLabelAlongLine.repeatIntervalFixed");
    
    themeLabelAlongLine.destroy();
    ok(themeLabelAlongLine.alongLineDirection == null, "themeLabelAlongLine.alongLineDirection");
    ok(themeLabelAlongLine.angleFixed == null, "themeLabelAlongLine.angleFixed");
    ok(themeLabelAlongLine.isAlongLine == null, "themeLabelAlongLine.isAlongLine");
    ok(themeLabelAlongLine.isLabelRepeated == null, "themeLabelAlongLine.isLabelRepeated");
    ok(themeLabelAlongLine.labelRepeatInterval == null, "themeLabelAlongLine.labelRepeatInterval");
    ok(themeLabelAlongLine.repeatedLabelAvoided == null, "themeLabelAlongLine.repeatedLabelAvoided");
    ok(themeLabelAlongLine.repeatIntervalFixed == null, "themeLabelAlongLine.repeatIntervalFixed");
});

test("TestThemeLabelAlongLine_2",function(){
    var themeLabelAlongLine = new SuperMap.REST.ThemeLabelAlongLine({
        angleFixed: false,
        isAlongLine: true,
        labelRepeatInterval: 2        
    });
    ok(themeLabelAlongLine != null, "themeLabelAlongLine");
    equal(themeLabelAlongLine.alongLineDirection, SuperMap.REST.AlongLineDirection.LB_TO_RT, "themeLabelAlongLine.alongLineDirection");
    ok(!themeLabelAlongLine.angleFixed, "themeLabelAlongLine.angleFixed");
    ok(themeLabelAlongLine.isAlongLine, "themeLabelAlongLine.isAlongLine");
    equal(themeLabelAlongLine.labelRepeatInterval, 2, "themeLabelAlongLine.labelRepeatInterval");
    ok(!themeLabelAlongLine.repeatedLabelAvoided, "themeLabelAlongLine.repeatedLabelAvoided");
    ok(!themeLabelAlongLine.repeatIntervalFixed, "themeLabelAlongLine.repeatIntervalFixed");
    
    themeLabelAlongLine.destroy();
    ok(themeLabelAlongLine.alongLineDirection == null, "themeLabelAlongLine.alongLineDirection");
    ok(themeLabelAlongLine.angleFixed == null, "themeLabelAlongLine.angleFixed");
    ok(themeLabelAlongLine.isAlongLine == null, "themeLabelAlongLine.isAlongLine");
    ok(themeLabelAlongLine.labelRepeatInterval == null, "themeLabelAlongLine.labelRepeatInterval");
    ok(themeLabelAlongLine.repeatedLabelAvoided == null, "themeLabelAlongLine.repeatedLabelAvoided");
    ok(themeLabelAlongLine.repeatIntervalFixed == null, "themeLabelAlongLine.repeatIntervalFixed");
});