module("ThiessenAnalystService");
var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;

function initThiessenAnalystService() {
    return new SuperMap.REST.ThiessenAnalystService(GlobeParameter.spatialAnalystURL_Changchun, {eventListeners:{"processCompleted": analyzeCompleted,'processFailed': analyzeFailed}});
}

function analyzeFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

function analyzeCompleted(analyseEventArgs) {
    analystEventArgsSystem = analyseEventArgs;
}
//成功事件
asyncTest("TestThiessenAnalyzeByDatasets", function () {
    expect(10);
    var tsServiceByDatasets = initThiessenAnalystService();
    ok(tsServiceByDatasets != null, "not null");
    equal(tsServiceByDatasets.url, GlobeParameter.spatialAnalystURL_Changchun, "url");
   
	var dsThiessenAnalystParameters = new SuperMap.REST.DatasetThiessenAnalystParameters({
		dataset: "Park@Changchun",
		filterQueryParameter: new SuperMap.REST.FilterParameter({attributeFilter: "SMID < 5"})
	});

    tsServiceByDatasets.processAsync(dsThiessenAnalystParameters);

    setTimeout(function () {
        try {
            var tsResult = tsServiceByDatasets.lastResult;
            ok(tsResult != null, "tsServiceByDatasets.lastResult");
            ok(analystEventArgsSystem != null,"tsServiceByDatasets.Succeed");
			equal(tsResult.regions.length, 4, "tsResult.regions.length");
            
            tsServiceByDatasets.destroy();
            equal(tsServiceByDatasets.events, null, "tsServiceByDatasets.events");
            equal(tsServiceByDatasets.eventListeners , null, "tsServiceByDatasets.eventListeners");
            equal(tsServiceByDatasets.lastResult , null, "tsServiceByDatasets.lastResult");
            
            analystEventArgsSystem.destroy();
            ok(analystEventArgsSystem != null, "not null");
            equal(analystEventArgsSystem.result, null, "analystEventArgsSystem.result");
			start();
        } catch (exception) {
            ok(false, "exception occcurs,message is:" + exception.message)
			start();
        }
    }, 10000)
});
//成功事件
asyncTest("TestThiessenAnalyzeByGeometry", function () {
    expect(8);
    var tsServiceByGeometry = initThiessenAnalystService();
    ok(tsServiceByGeometry != null, "not null");
    equal(tsServiceByGeometry.url, GlobeParameter.spatialAnalystURL_Changchun, "url");

	var points = [new SuperMap.Geometry.Point(21.35414430430097,91.59340881700358),
				new SuperMap.Geometry.Point(20.50760752363726,0.6802641290663991),
				new SuperMap.Geometry.Point(28.208029226321006,92.81799910814934),
				new SuperMap.Geometry.Point(23.986958756157428,95.21525547430991),
				new SuperMap.Geometry.Point(30.762395431757028,0.29794739028268236),
				new SuperMap.Geometry.Point(20.607496079935604,77.0461900744243)];
    var geoThiessenAnalystParameters = new SuperMap.REST.GeometryThiessenAnalystParameters({
		points: points
	});
    tsServiceByGeometry.processAsync(geoThiessenAnalystParameters);

    setTimeout(function () {
        try {
            var tsResult = tsServiceByGeometry.lastResult;
            ok(tsResult != null, "tsServiceByGeometry.lastResult");
			equal(tsResult.regions.length, 6, "tsResult.regions.length");
            
            tsServiceByGeometry.destroy();
            equal(tsServiceByGeometry.events, null, "tsServiceByGeometry.events");
            equal(tsServiceByGeometry.eventListeners , null, "tsServiceByGeometry.eventListeners");
            equal(tsServiceByGeometry.lastResult , null, "tsServiceByGeometry.lastResult");
            
            ok(analystEventArgsSystem != null, "not null");
			start();
        } catch (exception) {
			start();
        }
    }, 10000)
});

//测试失败事件
asyncTest("TestThiessenAnalyzeByGeometry_failed", function () {
    expect(8);
    var tsServiceByGeometry = initThiessenAnalystService();
    ok(tsServiceByGeometry != null, "not null");
    equal(tsServiceByGeometry.url, GlobeParameter.spatialAnalystURL_Changchun, "url");

    var geoThiessenAnalystParameters = new SuperMap.REST.GeometryThiessenAnalystParameters();
    
    tsServiceByGeometry.processAsync(geoThiessenAnalystParameters);

    setTimeout(function () {
        try {
            var tsResult = tsServiceByGeometry.lastResult;
			ok(tsResult == null, "tsResult == null");
            ok(serviceFailedEventArgsSystem != null, "tsServiceByGeometry.Failed");
			equal(serviceFailedEventArgsSystem.error.errorMsg, "参数 points 错误：不能为空。", 
				"tsServiceByGeometry.Failed");
            
            tsServiceByGeometry.destroy();
            equal(tsServiceByGeometry.events, null, "tsServiceByGeometry.events");
            equal(tsServiceByGeometry.eventListeners , null, "tsServiceByGeometry.eventListeners");
            equal(tsServiceByGeometry.lastResult , null, "tsServiceByGeometry.lastResult");
			start();
        } catch (exception) {
			start();
        }
    }, 10000)
});

//测试失败事件
asyncTest("TestThiessenAnalyzeByDataset_failed", function () {
    expect(8);
    var tsServiceByDataset = initThiessenAnalystService();
    ok(tsServiceByDataset != null, "not null");
    equal(tsServiceByDataset.url, GlobeParameter.spatialAnalystURL_Changchun, "url");

    var dsThiessenAnalystParameters = new SuperMap.REST.DatasetThiessenAnalystParameters({
		dataset: 'test'
	});
    
    tsServiceByDataset.processAsync(dsThiessenAnalystParameters);

    setTimeout(function () {
        try {
            var tsResult = tsServiceByDataset.lastResult;
			ok(tsResult == null, "tsResult = null");
            ok(serviceFailedEventArgsSystem != null, "tsServiceByDataset.Failed");
			equal(serviceFailedEventArgsSystem.error.errorMsg, "数据集test不存在", 
				"tsServiceByDataset.Failed");
            
            tsServiceByDataset.destroy();
            equal(tsServiceByDataset.events, null, "tsServiceByDataset.events");
            equal(tsServiceByDataset.eventListeners , null, "tsServiceByDataset.eventListeners");
            equal(tsServiceByDataset.lastResult , null, "tsServiceByDataset.lastResult");
			start();
        } catch (exception) {
			start();
        }
    }, 10000)
});