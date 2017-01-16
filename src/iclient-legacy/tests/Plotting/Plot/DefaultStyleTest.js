module("DefualtStyle");

test("testDefualtStyle_Constructor", function () {
    var defaultStyle = new SuperMap.Plot.DefualtStyle();

    equal(defaultStyle.CLASS_NAME, "SuperMap.Plot.DefualtStyle", "Property.CLASS_NAME");
    equal(defaultStyle.lineColor, "#ff0000", "Property.lineColor");
    equal(defaultStyle.lineWidth, 2, "Property.lineWidth");
    equal(defaultStyle.dotSymbolSize, 40, "Property.dotSymbolSize");
    equal(defaultStyle.lineType, "solid", "Property.lineType");
    equal(defaultStyle.defaultFlag, true, "Property.defaultFlag");

    defaultStyle.destroy();
});

test("testDefualtStyle_Destroy", function () {
    var defaultStyle = new SuperMap.Plot.DefualtStyle();

    equal(defaultStyle.CLASS_NAME, "SuperMap.Plot.DefualtStyle", "Property.CLASS_NAME");

    defaultStyle.destroy();
    ok(defaultStyle !== null, "not null");
    ok(defaultStyle.lineColor === null,"defaultStyle.lineColor");
    ok(defaultStyle.lineWidth === null,"defaultStyle.lineWidth");
    ok(defaultStyle.dotSymbolSize === null,"defaultStyle.dotSymbolSize");
    ok(defaultStyle.lineType === null,"defaultStyle.lineType");
    ok(defaultStyle.defaultFlag === null,"defaultStyle.defaultFlag");
});

//test("testDefualtStyle_set_get", function () {
//    var defaultStyle = new SuperMap.Plot.DefualtStyle();
//
//    defaultStyle.setLineType("solid");
//    equal(defaultStyle.getLineType(), "solid", "Function:getLineType");
//
//    defaultStyle.setLineWidth(50);
//    equal(defaultStyle.getLineWidth(), 50, "Function:getLineWidth");
//
//    defaultStyle.setLineColor("#0000FF");
//    equal(defaultStyle.getLineColor(), "#0000FF", "Function:getLineColor");
//
//    defaultStyle.setSymbolWidth(40);
//    equal(defaultStyle.getSymbolWidth(), 40, "Function:getWidth");
//
//    defaultStyle.setSymbolHeight(70);
//    equal(defaultStyle.getSymbolHeight(), 70, "Function:getHeight");
//
//    defaultStyle.setTableWidth(100);
//    equal(defaultStyle.getTableWidth(), 100, "Function:getTableWidth");
//
//    defaultStyle.setTableHeight(200);
//    equal(defaultStyle.getTableHeight(), 200, "Function:getTableHeight");
//
//    defaultStyle.setDefaultFlag(true);
//    equal(defaultStyle.getDefaultFlag(), true, "Function:getDefaultFlag");
//
//    defaultStyle.destroy();
//});