module("ColorPicker");

test("ColorPicker_constructorDefault", function () {
    expect(20);
    var colorPicker = new SuperMap.Tool.ColorPicker();
    ok(colorPicker instanceof SuperMap.Tool.ColorPicker, "colorPicker  instanceof  SuperMap.Tool.ColorPicker");
    same(colorPicker.pickerBox, [0, 120, 240, 0], "Property:pickerBox");
    same(colorPicker.pickerABoxIn, [10, 110, 190, 10], "Property:pickerABoxIn");
    same(colorPicker.pickerABoxOut, [0, 120, 200, 0], "Property:pickerABoxOut");
    same(colorPicker.pickerBBoxIn, [210, 110, 230, 10], "Property:pickerBBoxIn");
    same(colorPicker.pickerBBoxOut, [200, 120, 240, 0], "Property:pickerBBoxOut");
    same(colorPicker.pickerACrossPosition, {x: 10, y: 10}, "Property:pickerACrossPosition");
    same(colorPicker.pickerBArrowsPosition, {x: 203, y: 10}, "Property:pickerBArrowsPosition");
    same(colorPicker.pickerACurrentRGBA, [255, 0, 0, 255], "Property:pickerACurrentRGBA");
    equals(colorPicker.pickerDiv.tagName, document.createElement("Div").tagName, "Property:pickerDiv");
    equals(colorPicker.pickerCvs.tagName, document.createElement("canvas").tagName, "Property:pickerCvs");
    equals(colorPicker.pickerCtx.tagName, colorPicker.pickerCvs.getContext("2d").tagName, "Property:pickerCtx");
    equals(colorPicker.pickerCvsForPointer.tagName, document.createElement("canvas").tagName, "Property:pickerCvsForPointer");
    equals(colorPicker.pickerCvsForPointerrCtx.tagName, colorPicker.pickerCvsForPointer.getContext("2d").tagName, "Property:pickerCvsForPointerrCtx");
    equals(colorPicker.CLASS_NAME, "SuperMap.Tool.ColorPicker", "Property:CLASS_NAME");
    equals(colorPicker.pickerBArrowY, 10, "Property:pickerBArrowY");
    equals(colorPicker.targetDom, null, "Property:targetDom");
    equals(colorPicker.isAutoHide, true, "Property:isAutoHide");
    equals(colorPicker.isMouseDowning, false, "Property:isMouseDowning");
    ok(colorPicker.onChange != null, "Property:onChange");
});

test("test_ColorPicker_destroy", function () {
    expect(14);
    var colorPicker = new SuperMap.Tool.ColorPicker();
    colorPicker.destroy();
    ok(colorPicker.pickerDiv == null, "Property:pickerDiv");
    ok(colorPicker.pickerCvs == null, "Property:pickerCvs");
    ok(colorPicker.pickerCvsForPointer == null, "Property:pickerCvsForPointer");
    ok(colorPicker.pickerCtx == null, "Property:pickerCtx");
    ok(colorPicker.pickerCvsForPointerrCtx == null, "Property:pickerCvsForPointerrCtx");
    ok(colorPicker.pickerBox == null, "Property:pickerBox");
    ok(colorPicker.pickerABoxIn == null, "Property:pickerABoxIn");
    ok(colorPicker.pickerABoxOut == null, "Property:pickerABoxOut");
    ok(colorPicker.pickerBBoxIn == null, "Property:pickerBBoxIn");
    ok(colorPicker.pickerBBoxOut == null, "Property:pickerBBoxOut");
    ok(colorPicker.pickerBArrowY == null, "Property:pickerBArrowY");
    ok(colorPicker.pickerACurrentRGBA == null, "Property:pickerACurrentRGBA");
    ok(colorPicker.isMouseDowning == null, "Property:isMouseDowning");
    ok(colorPicker.onChange == null, "Property:onChange");
});

test("test_ColorPicker_getColorPositionInPickerA", function () {
    expect(2);
    var colorPicker = new SuperMap.Tool.ColorPicker();
    ok(colorPicker.getColorPositionInPickerA([10, 110, 190, 10]) != null, "Function:getColorPositionInPickerA");
    ok(!colorPicker.getColorPositionInPickerA([11, 111, 191, 11]), "Function:getColorPositionInPickerA");
});

test("test_ColorPicker_getColorPositionInPickerB", function () {
    expect(2);
    var colorPicker = new SuperMap.Tool.ColorPicker();
    ok(colorPicker.getColorPositionInPickerB([210, 110, 230, 10]) != null, "Function:getColorPositionInPickerA");
    ok(!colorPicker.getColorPositionInPickerB([211, 111, 231, 11]), "Function:getColorPositionInPickerB");
});

test("test_ColorPicker_reset", function () {
    expect(2);
    var colorPicker = new SuperMap.Tool.ColorPicker();
    colorPicker.pickerDiv.style.display === "none"
    colorPicker.reset(210, 110, null);
    equals(colorPicker.pickerDiv.style.display, "block", "Function:reset");
    colorPicker.pickerDiv.style.display = "block";
    colorPicker.reset(210, 110, null);
    equals(colorPicker.pickerDiv.style.display, "none", "Function:reset");
});