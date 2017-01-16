module("ThemeFlow");

test("TestThemeFlow_1",function(){
    var themeFlow = new SuperMap.REST.ThemeFlow();
    
    ok(themeFlow!=null, "null");
    ok(!themeFlow.flowEnabled,"themeFlow.flowEnabled");
    ok(!themeFlow.leaderLineDisplayed,"themeFlow.leaderLineDisplayed");
    ok(themeFlow.leaderLineStyle != null,"themeFlow.leaderLineStyle");
    themeFlow.destroy();
    ok(themeFlow.flowEnabled === null, "themeFlow.flowEnabled");
    ok(themeFlow.leaderLineDisplayed === null, "themeFlow.leaderLineDisplayed");
    ok(themeFlow.leaderLineStyle === null, "themeFlow.leaderLineStyle");
});

test("TestThemeFlow_2",function(){
    var serverStyle = new SuperMap.REST.ServerStyle();
    var themeFlow = new SuperMap.REST.ThemeFlow({flowEnabled: true,leaderLineDisplayed: true, leaderLineStyle: serverStyle});
    
    ok(themeFlow!=null, "null");
    ok(themeFlow.flowEnabled,"themeFlow.flowEnabled");
    ok(themeFlow.leaderLineDisplayed,"themeFlow.leaderLineDisplayed");
    ok(themeFlow.leaderLineStyle !== null,"themeFlow.leaderLineStyle");
    
    themeFlow.destroy();
    ok(themeFlow.flowEnabled === null, "themeFlow.flowEnabled");
    ok(themeFlow.leaderLineDisplayed === null, "themeFlow.leaderLineDisplayed");
    ok(themeFlow.leaderLineStyle === null, "themeFlow.leaderLineStyle");
});