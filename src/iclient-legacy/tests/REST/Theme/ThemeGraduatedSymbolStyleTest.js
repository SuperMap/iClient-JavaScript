module("ThemeGraduatedSymbolStyle");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function() {
    var themeGraduatedSymbolStyle = new SuperMap.REST.ThemeGraduatedSymbolStyle();
    ok(themeGraduatedSymbolStyle != null, "themeGraduatedSymbolStyle != null");
    
    var themeGraduatedSymbol = new SuperMap.REST.ThemeGraduatedSymbol();
    ok(themeGraduatedSymbol != null, "themeGraduatedSymbol != null");
    
});
