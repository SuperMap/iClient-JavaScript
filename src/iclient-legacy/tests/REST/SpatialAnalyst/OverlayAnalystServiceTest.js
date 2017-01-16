module("OverlayAnalystService");
var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;

function initOverlayAnalystService() {
    var overlayService = new SuperMap.REST.OverlayAnalystService(GlobeParameter.spatialAnalystURL);
    return overlayService;
}

//不直接返回查询结果
asyncTest("TestOverlayAnalyzeByDatasets_DataSet_NotreturnContent", function () {
    var overlayServiceByDatasets = initOverlayAnalystService();
    ok(overlayServiceByDatasets != null, "not null");
    equal(overlayServiceByDatasets.url, GlobeParameter.spatialAnalystURL, "url");
    var dsOverlayAnalystParameters = new SuperMap.REST.DatasetOverlayAnalystParameters();
    dsOverlayAnalystParameters.sourceDataset = "Landuse_R@Jingjin";
    dsOverlayAnalystParameters.operateDataset = "Lake_R@Jingjin";
    dsOverlayAnalystParameters.operation = SuperMap.REST.OverlayOperationType.UPDATE;

    overlayServiceByDatasets.processAsync(dsOverlayAnalystParameters);
    overlayServiceByDatasets.events.on({"processCompleted":function(args){
        var overlayResult = overlayServiceByDatasets.lastResult;
        ok(overlayResult != null, "overlayServiceByDatasets.lastResult");
        overlayServiceByDatasets.destroy();
        ok(args!=null, "overlayServiceByDatasets.OverlayAnalystEventArgs");
        start();
    },"processFailed":function(){
        overlayServiceByDatasets.destroy();
        start();
    }});
});

asyncTest("TestOverlayAnalyzeByDatasets_DataSet_failed", function () {
    var overlayServiceByDatasets = initOverlayAnalystService();
    ok(overlayServiceByDatasets != null, "not null");
    equal(overlayServiceByDatasets.url, GlobeParameter.spatialAnalystURL, "url");
    var dsOverlayAnalystParameters = new SuperMap.REST.DatasetOverlayAnalystParameters();
    dsOverlayAnalystParameters.sourceDataset = "Landu@Jingjin";
    dsOverlayAnalystParameters.operateDataset = "Lake_R@Jingjin";
    dsOverlayAnalystParameters.operation = SuperMap.REST.OverlayOperationType.UPDATE;

    overlayServiceByDatasets.processAsync(dsOverlayAnalystParameters);

    overlayServiceByDatasets.events.on({"processCompleted":function(args){
        overlayServiceByDatasets.destroy();
        start();
    },"processFailed":function(args){
        var overlayResult = overlayServiceByDatasets.lastResult;
        ok(overlayResult == null, "overlayResult.lastResult");
        equal(args.error.errorMsg,"数据集Landu@Jingjin不存在","serviceFailedEventArgsSystem.error.errorMsg");
        overlayServiceByDatasets.destroy();
        start();
    }});
});

asyncTest("TestOverlayAnalyzeByDatasets_Geometry", function () {
    var overlayServiceByDatasets = initOverlayAnalystService();
    ok(overlayServiceByDatasets != null, "not null");
    equal(overlayServiceByDatasets.url, GlobeParameter.spatialAnalystURL, "url");
    
    var points = [new SuperMap.Geometry.Point(47.9909960608, 382.4873382105),
                  new SuperMap.Geometry.Point(47.9909960608, 437.8615644344),
                  new SuperMap.Geometry.Point(170.3545301069, 437.8615644344),
                  new SuperMap.Geometry.Point(170.3545301069, 382.4873382105)];
    var sourceGeometry = new SuperMap.Geometry.LineString(points);

    var points1 = [new SuperMap.Geometry.Point(111.4687675858, 353.8548114800),
                   new SuperMap.Geometry.Point(111.4687675858, 408.1485649972),
                   new SuperMap.Geometry.Point(208.9814293754, 408.1485649972),
                   new SuperMap.Geometry.Point(208.9814293754, 353.8548114800)];
    var operateGeometry = new SuperMap.Geometry.Polygon(new SuperMap.Geometry.LinearRing(points1));
    
    var geOverlayAnalystParameters = new SuperMap.REST.GeometryOverlayAnalystParameters();
    geOverlayAnalystParameters.sourceGeometry = sourceGeometry;
    geOverlayAnalystParameters.operateGeometry = operateGeometry;
    geOverlayAnalystParameters.operation = SuperMap.REST.OverlayOperationType.CLIP;

    overlayServiceByDatasets.processAsync(geOverlayAnalystParameters);

    overlayServiceByDatasets.events.on({"processCompleted":function(args){
        var overlayResult = overlayServiceByDatasets.lastResult;
        ok(overlayResult != null, "overlayServiceByDatasets.lastResult");
        overlayServiceByDatasets.destroy();
        ok(args!=null, "overlayServiceByDatasets.OverlayAnalystEventArgs");
        start();
    },"processFailed":function(){
        overlayServiceByDatasets.destroy();
        start();
    }});
});