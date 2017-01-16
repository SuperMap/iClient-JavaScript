module('Plotting');

test("testPlotting_Constructor", function () {
    var plotting = SuperMap.Plotting.getInstance(null, null);
    equal(plotting.CLASS_NAME, "SuperMap.Plotting", "SuperMap.Plotting");
    ok(plotting.defaultStyle !== null, "plotting.defaultStyle");
    ok(plotting.sitDataManager !== null, "plotting.sitDataManager");
    ok(plotting.editor !== null, "plotting.editor");
    ok(plotting.query !== null, "plotting.query");
    ok(plotting.symbolLibManager !== null, "plotting.symbolLibManager");

    plotting.destroy();
    g_Plotting = null;
});

test("testPlotting_Destory", function () {
    var plotting = SuperMap.Plotting.getInstance(null, null);
    equal(plotting.CLASS_NAME, "SuperMap.Plotting", "SuperMap.Plotting");

    plotting.destroy();
    ok(plotting !== null, "plotting not null");
    ok(plotting.defaultStyle === null, "plotting.defaultStyle");
    ok(plotting.sitDataManager === null, "plotting.sitDataManager");
    ok(plotting.editor === null, "plotting.editor");
    ok(plotting.query === null, "plotting.query");
    ok(plotting.symbolLibManager === null, "plotting.symbolLibManager");
    g_Plotting = null;
});

test("testPlotting_getDefaultStyle", function () {
    var plotting = SuperMap.Plotting.getInstance();
    plottingStyle = plotting.getDefaultStyle();
    var defaultStyle = new SuperMap.Plot.DefualtStyle();
    deepEqual(plottingStyle, defaultStyle, "defaultStyle");
    plotting.destroy();
    g_Plotting = null;
});

test("testPlotting_getSitDataManager", function () {
    var plotting = SuperMap.Plotting.getInstance();
    getSitDataManager = plotting.getSitDataManager();
    equal(getSitDataManager.CLASS_NAME, "SuperMap.Plot.SitDataManager", "SuperMap.Plot.SitDataManager");
    plotting.destroy();
    g_Plotting = null;
});

test("testPlotting_getEditor", function () {
    var plotting = SuperMap.Plotting.getInstance();
    plottingStyle = plotting.getEditor();
    equal(plottingStyle.CLASS_NAME, "SuperMap.Plot.Editor", "SuperMap.Plot.Editor");
    plotting.destroy();
    g_Plotting = null;
});

test("testPlotting_getQuery", function () {
    var plotting = SuperMap.Plotting.getInstance();
    getQuery = plotting.getQuery();
    equal(getQuery.CLASS_NAME, "SuperMap.Plot.Query", "SuperMap.Plot.Query");
    plotting.destroy();
    g_Plotting = null;
});

test("testPlotting_setClientID", function () {
    var clientID = "test";
    var plotting = SuperMap.Plotting.getInstance();
    getclientID = plotting.setClientID(clientID);
    setClientID = plotting.getClientID();
    equal(setClientID, "test", "test");
    plotting.destroy();
    g_Plotting = null;
});

test("testPlotting_getInstance", function () {
    var plotting = SuperMap.Plotting.getInstance();
    equal(plotting.CLASS_NAME, "SuperMap.Plotting", "SuperMap.Plotting");
    plotting.destroy();
    g_Plotting = null;
});