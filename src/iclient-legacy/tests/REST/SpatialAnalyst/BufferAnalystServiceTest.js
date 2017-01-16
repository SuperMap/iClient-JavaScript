module("BufferAnalystService");
var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;

function initBufferAnalystService() {
    return new SuperMap.REST.BufferAnalystService(GlobeParameter.spatialAnalystURL, {eventListeners:{"processCompleted": analyzeCompleted,'processFailed': analyzeFailed}});
}

function analyzeFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

function analyzeCompleted(analyseEventArgs) {
    analystEventArgsSystem = analyseEventArgs;
}
//成功事件
asyncTest("TestBufferAnalyzeByDatasets_NotreturnContent", function () {
    expect(9);
    var bfServiceByDatasets = initBufferAnalystService();
    ok(bfServiceByDatasets != null, "not null");
    equal(bfServiceByDatasets.url, GlobeParameter.spatialAnalystURL, "url");
    var resultSetting = new SuperMap.REST.DataReturnOption({
        expectCount: 1000,
        dataset: null,
        dataReturnMode: SuperMap.REST.DataReturnMode.DATASET_ONLY,
        deleteExistResultDataset: true        
    });
    var dsBufferAnalystParameters = new SuperMap.REST.DatasetBufferAnalystParameters();
    dsBufferAnalystParameters.dataset = "Landuse_R@Jingjin";
    dsBufferAnalystParameters.filterQueryParameter.attributeFilter = "smid like 48";
    dsBufferAnalystParameters.bufferSetting.endType = SuperMap.REST.BufferEndType.ROUND;
    dsBufferAnalystParameters.bufferSetting.semicircleLineSegment = 5;
    dsBufferAnalystParameters.bufferSetting.leftDistance.value = 100;
    dsBufferAnalystParameters.resultSetting = resultSetting;

    bfServiceByDatasets.processAsync(dsBufferAnalystParameters);

    setTimeout(function () {
        try {
            var bfResult = bfServiceByDatasets.lastResult;
            ok(bfResult != null, "bfServiceByDatasets.lastResult");
            ok(analystEventArgsSystem != null,"bfServiceByDatasets.Succeed");
            
            bfServiceByDatasets.destroy();
            equal(bfServiceByDatasets.events, null, "bfServiceByDatasets.events");
            equal(bfServiceByDatasets.eventListeners , null, "bfServiceByDatasets.eventListeners");
            equal(bfServiceByDatasets.lastResult , null, "bfServiceByDatasets.lastResult");
            
            analystEventArgsSystem.destroy();
            ok(analystEventArgsSystem != null, "not null");
            equal(analystEventArgsSystem.result, null, "analystEventArgsSystem.result");
            start();
        } catch (exception) {
            ok(false, "exception occcurs,message is:" + exception.message)
            start();
        }
    }, 20000)
});
//成功事件
asyncTest("TestBufferAnalyzeByGeometry_NotreturnContent", function () {
    expect(7);
    var bfServiceByGeometry = initBufferAnalystService();
    ok(bfServiceByGeometry != null, "not null");
    equal(bfServiceByGeometry.url, GlobeParameter.spatialAnalystURL, "url");

    var sourceGeometry = new SuperMap.Geometry.Point(7884.79277012316, 5072.18865322196);

    var bufferSetting = new SuperMap.REST.BufferSetting();
    bufferSetting.endType = SuperMap.REST.BufferEndType.ROUND;
    bufferSetting.leftDistance.value = 300;
    bufferSetting.semicircleLineSegment = 5;

    var resultSetting = new SuperMap.REST.DataReturnOption({
        expectCount: 1000,
        dataset: "Landuse_R@Jingjin",
        dataReturnMode: SuperMap.REST.DataReturnMode.DATASET_ONLY,
        deleteExistResultDataset: false        
    });
    
    var geometryBufferAnalystParameters = new SuperMap.REST.GeometryBufferAnalystParameters();
    geometryBufferAnalystParameters.sourceGeometry = sourceGeometry;
    geometryBufferAnalystParameters.bufferSetting = bufferSetting;
    geometryBufferAnalystParameters.resultSetting = resultSetting;
    
    bfServiceByGeometry.processAsync(geometryBufferAnalystParameters);

    setTimeout(function () {
        try {
            var bfResult = bfServiceByGeometry.lastResult;
            ok(bfResult != null, "bfServiceByGeometry.lastResult");
            
            bfServiceByGeometry.destroy();
            equal(bfServiceByGeometry.events, null, "bfServiceByGeometry.events");
            equal(bfServiceByGeometry.eventListeners , null, "bfServiceByGeometry.eventListeners");
            equal(bfServiceByGeometry.lastResult , null, "bfServiceByGeometry.lastResult");
            
            ok(analystEventArgsSystem != null, "not null");
            start();
        } catch (exception) {
            //ok(false, "exception occcurs,message is:" + exception.message)
            start();
        }
    }, 10000)
});

//测试失败事件
asyncTest("TestBufferAnalyzeByGeometry_NotreturnContent", function () {
    expect(7);
    var bfServiceByGeometry = initBufferAnalystService();
    ok(bfServiceByGeometry != null, "not null");
    equal(bfServiceByGeometry.url, GlobeParameter.spatialAnalystURL, "url");

    var sourceGeometry = new SuperMap.Geometry.Point(7884.79277012316, 5072.18865322196);

    var bufferSetting = new SuperMap.REST.BufferSetting();
    bufferSetting.endType = SuperMap.REST.BufferEndType.ROUND;
    bufferSetting.leftDistance.value = -1;
    bufferSetting.semicircleLineSegment = 5;

    var resultSetting = new SuperMap.REST.DataReturnOption({
        expectCount: 1000,
        dataset: null,
        dataReturnMode: SuperMap.REST.DataReturnMode.DATASET_ONLY,
        deleteExistResultDataset: true        
    });
    var geometryBufferAnalystParameters = new SuperMap.REST.GeometryBufferAnalystParameters();
    geometryBufferAnalystParameters.sourceGeometry = sourceGeometry;
    geometryBufferAnalystParameters.bufferSetting = bufferSetting;
    geometryBufferAnalystParameters.resultSetting = resultSetting;
    
    bfServiceByGeometry.processAsync(geometryBufferAnalystParameters);

    setTimeout(function () {
        try {
            var bfResult = bfServiceByGeometry.lastResult;
            ok(serviceFailedEventArgsSystem != null, "bfServiceByGeometry.Failed");
            
            bfServiceByGeometry.destroy();
            equal(bfServiceByGeometry.events, null, "bfServiceByGeometry.events");
            equal(bfServiceByGeometry.eventListeners , null, "bfServiceByGeometry.eventListeners");
            equal(bfServiceByGeometry.lastResult , null, "bfServiceByGeometry.lastResult");
            
            ok(analystEventArgsSystem != null, "not null");
            start();
        } catch (exception) {
            //ok(false, "exception occcurs,message is:" + exception.message)
            start();
        }
    }, 10000)
});