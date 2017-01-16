module("RankSymbolLayer-ctl");
var name = "RankSymbol Layer";

test("TestRankSymbol_constructor",function(){
    expect(4);
    var themeLayer = new SuperMap.Layer.RankSymbol(name,"Circle");

    ok(themeLayer instanceof SuperMap.Layer.RankSymbol,"layer instanceof SuperMap.Layer.RankSymbol");
    equals(themeLayer.name,name,"the name of test");
    equals(themeLayer.CLASS_NAME,"SuperMap.Layer.RankSymbol","CLASS_NAME");
    equals(themeLayer.symbolType,"Circle","symbolType");
    themeLayer.destroy();
});
test("TestRankSymbol_destroy",function(){
    expect(3);
    var themeLayer = new SuperMap.Layer.RankSymbol(name,"Circle");
    themeLayer.themeField = "xyz";
    themeLayer.symbolSetting ={ codomain: [0,1]};

    themeLayer.destroy();
    equals(themeLayer.symbolSetting,null,"after destroy");
    equals(themeLayer.themeField,null,"after destroy");
    equals(themeLayer.symbolType,null,"after destroy");
});
test("TestRankSymbol_setSymbolType",function(){
    expect(3);
    var themeLayer = new SuperMap.Layer.RankSymbol(name,"Circle");
    equals(themeLayer.symbolType,"Circle","Test symbolType");
    themeLayer.symbolType = "test";
    equals(themeLayer.symbolType,"test","Test symbolType");
    themeLayer.setSymbolType("Circle");
    equals(themeLayer.symbolType,"Circle","Test symbolType");
    themeLayer.destroy();
});
test("TestRankSymbol_createThematicFeature",function(){
    expect(2);
    var themeLayer = new SuperMap.Layer.RankSymbol(name,"Circle");
    themeLayer.themeField = "xyz";
    var point = new SuperMap.Geometry.Point(114,45);
    var attrs = {};attrs.xyz = 11;
    var pointFeature = new SuperMap.Feature.Vector(point,attrs);
    var result = themeLayer.createThematicFeature(pointFeature);
    //情况一 return thematicFeature
    equals(result.CLASS_NAME,"SuperMap.Feature.Theme.Circle","test createThematicFeature");

    //情况二 return false
    themeLayer.setSymbolType("Test");
    var result = themeLayer.createThematicFeature(pointFeature);
    ok(!result,"return false");
    themeLayer.destroy();
});