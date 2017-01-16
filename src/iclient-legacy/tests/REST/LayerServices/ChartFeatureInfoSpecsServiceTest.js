module("ChartFeatureInfoSpecsService");

test("TestDefaultConstructor", function () {
    var url = "http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图";
    var chartFeatureInfoSpecsService = new SuperMap.REST.ChartFeatureInfoSpecsService(url);

    ok(chartFeatureInfoSpecsService != null, "not null");
    equal(chartFeatureInfoSpecsService.EVENT_TYPES[1], "processFailed", "chartFeatureInfoSpecsService.EVENT_TYPES");
    ok(chartFeatureInfoSpecsService.events != null, "chartFeatureInfoSpecsService.events");
    ok(chartFeatureInfoSpecsService.eventListeners == null, "chartFeatureInfoSpecsService.eventListeners");
    ok(chartFeatureInfoSpecsService.result == null, "chartFeatureInfoSpecsService.result");
});

test("TestConstructor_Destructor", function () {
    var url = "http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图";
    var chartFeatureInfoSpecsService = new SuperMap.REST.ChartFeatureInfoSpecsService(url);

    //这里注意提供的url与服务器位于同一个域
    ok(chartFeatureInfoSpecsService.isInTheSameDomain, "chartFeatureInfoSpecsService.isInTheSameDomain");
    ok(chartFeatureInfoSpecsService.events != null, "chartFeatureInfoSpecsService.events");

    chartFeatureInfoSpecsService.destroy();

    ok(chartFeatureInfoSpecsService != null, "not null");
    equal(chartFeatureInfoSpecsService.EVENT_TYPES[1], "processFailed", "chartFeatureInfoSpecsService.EVENT_TYPES");
    ok(chartFeatureInfoSpecsService.events == null, "chartFeatureInfoSpecsService.events");
    ok(chartFeatureInfoSpecsService.eventListeners == null, "chartFeatureInfoSpecsService.eventListeners");
    ok(chartFeatureInfoSpecsService.result == null, "chartFeatureInfoSpecsService.result");
});


test("TestProcessAsync", function () {
    var url = "http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图";
    var chartFeatureInfoSpecsService = new SuperMap.REST.ChartFeatureInfoSpecsService(url);
    chartFeatureInfoSpecsService.events.on({
        "processCompleted":processCompleted,
        "processFailed":processFailed
    });
    chartFeatureInfoSpecsService.processAsync();
});

function processCompleted(queryEventArgs) {
    //通过下面的方式可以解析返回的结果，进而查询到服务端支持的所有海图物标信息
//    var result = queryEventArgs.originResult; //queryEventArgs服务端返回的对象
//    var chartFeatureInfoSp = new SuperMap.REST.ChartFeatureInfoSpecsResult();
//    var chartFeatureInfoSpecsResult = chartFeatureInfoSp.fromJson(result);
//    console.log(chartFeatureInfoSpecsResult.chartFeatureInfoSpecs);
}

function processFailed(e) {
//    console.log(e.error.errorMsg);
}