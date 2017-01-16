module("ChartQueryService")

test("TestDefaultConstructor", function () {
    var url = "http://192.168.168.35:8090/iserver/services/map-ChartW/rest/maps/海图";
    var chartQueryService = new SuperMap.REST.ChartQueryService(url);
    ok(chartQueryService != null, "not null");
    equal(chartQueryService.EVENT_TYPES[1], "processFailed", "chartQueryService.EVENT_TYPES");
    ok(chartQueryService.events != null, "chartQueryService.events");
    ok(chartQueryService.eventListeners == null, "chartQueryService.eventListeners");
    ok(chartQueryService.lastResult == null, "chartQueryService.lastResult");
    ok(chartQueryService.returnContent == null, "chartQueryService.returnContent");
});


test("TestConstructor_Destructor", function () {
    var url = "http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图";
    var chartQueryService = new SuperMap.REST.ChartQueryService(url);

    //这里注意提供的url与服务器位于同一个域
    //ok(chartQueryService.isInTheSameDomain, "chartQueryService.isInTheSameDomain");
    ok(chartQueryService.events != null, "chartQueryService.events");

    chartQueryService.destroy();

    ok(chartQueryService != null, "not null");
    ok(chartQueryService.EVENT_TYPES == null, "processFailed", "chartQueryService.EVENT_TYPES");
    ok(chartQueryService.events == null, "chartQueryService.events");
    ok(chartQueryService.eventListeners == null, "chartQueryService.eventListeners");
    ok(chartQueryService.lastResult == null, "chartQueryService.lastResult");
    ok(chartQueryService.returnContent == null, "chartQueryService.returnContent");

});

test("TestProcessAsync", function () {
    var url = "http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图";
    var nameArray=["GB4X0000_52000"];
    var chartQueryFilterParameter = new SuperMap.REST.ChartQueryFilterParameter({
        isQueryPoint:true,
        isQueryLine:true,
        isQueryRegion:true,
        attributeFilter:"SMID < 10",
        chartFeatureInfoSpecCode:1
    });

    var chartQueryParameters = new SuperMap.REST.ChartQueryParameters({
        queryMode:"ChartAttributeQuery",
        chartLayerNames:nameArray,
        returnContent:true,
        chartQueryFilterParameters:[chartQueryFilterParameter]
    });

    var chartQueryService = new SuperMap.REST.ChartQueryService(url);



    chartQueryService.processAsync(chartQueryParameters);
});


