require('../../../src/common/iServer/FindTSPPathsService');

var serviceFailedEventArgsSystem = null;
var serviceSucceedEventArgsSystem = null;

//服务初始化时注册事件监听函数
var url = GlobeParameter.networkAnalystURL;
var options = {
    eventListeners: {
        'processFailed': findTSPPathServiceFailed,
        'processCompleted': findTSPPathServiceCompleted
    }
};
function initFindTSPPathService() {
    return new SuperMap.FindTSPPathsService(url, options);
}
function findTSPPathServiceCompleted(serviceSucceedEventArgs) {
    serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
}
function findTSPPathServiceFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}


describe('FindTSPPathsService', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //测试正常情况
    it('processAsync_default', function (done) {
        var nodeArray = [new SuperMap.Geometry.Point(5627.7550668827, -3627.4849836293),
            new SuperMap.Geometry.Point(5018.1469160422, -4638.5424045354),
            new SuperMap.Geometry.Point(6133.2837773358, -4645.9766502774)
        ];
        var resultSetting = new SuperMap.TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
        var analystParameter = new SuperMap.TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new SuperMap.FindTSPPathsParameters({
            isAnalyzeById: false,
            nodes: nodeArray,
            endNodeAssigned: false,
            parameter: analystParameter
        });
        var findTSPPathsService = initFindTSPPathService();
        findTSPPathsService.processAsync(parameter);
        setTimeout(function () {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result.tspPathList;
                expect(analystResult).not.toBeNull();
                expect(analystResult[0].edgeFeatures).not.toBeNull();
                expect(analystResult[0].edgeFeatures.type).toEqual("FeatureCollection");
                expect(analystResult[0].edgeFeatures.features).not.toBeNull();
                expect(analystResult[0].edgeFeatures.features.length).toBeGreaterThan(0);
                for (var i = 0; i < analystResult[0].edgeFeatures.features.length; i++) {
                    expect(analystResult[0].edgeFeatures.features[i].type).toBe("Feature");
                    expect(analystResult[0].edgeFeatures.features[i].geometry).not.toBeNull();
                    expect(analystResult[0].edgeFeatures.features[i].id).not.toBeNull();
                    expect(analystResult[0].edgeFeatures.features[i].properties).not.toBeNull();
                }
                expect(analystResult[0].edgeFeatures.features[0].id).toEqual(2886);
                expect(analystResult[0].edgeFeatures.features[0].geometry.type).toBe("LineString");
                expect(analystResult[0].edgeFeatures.features[0].geometry.coordinates.length).toBeGreaterThan(0);
                expect(analystResult[0].edgeFeatures.features[0].properties.ID).toEqual(2886);
                expect(analystResult[0].nodeFeatures).not.toBeNull();
                expect(analystResult[0].nodeFeatures.type).toEqual("FeatureCollection");
                expect(analystResult[0].nodeFeatures.features).not.toBeNull();
                expect(analystResult[0].nodeFeatures.features.length).toBeGreaterThan(0);
                for (var j = 0; j < analystResult[0].edgeFeatures.features.length; j++) {
                    expect(analystResult[0].nodeFeatures.features[j].type).toBe("Feature");
                    expect(analystResult[0].nodeFeatures.features[j].geometry).not.toBeNull();
                    expect(analystResult[0].nodeFeatures.features[j].id).not.toBeNull();
                    expect(analystResult[0].nodeFeatures.features[j].properties).not.toBeNull();
                }
                expect(analystResult[0].nodeFeatures.features[0].id).toEqual(3030);
                expect(analystResult[0].nodeFeatures.features[0].geometry.type).toBe("Point");
                expect(analystResult[0].nodeFeatures.features[0].geometry.coordinates.length).toBeGreaterThan(0);
                expect(analystResult[0].nodeFeatures.features[0].properties.ID).toEqual(3030);
                expect(analystResult[0].pathGuideItems).not.toBeNull();
                expect(analystResult[0].pathGuideItems.type).toBe("FeatureCollection");
                expect(analystResult[0].pathGuideItems.features.length).toBeGreaterThan(0);
                expect(analystResult[0].route).not.toBeNull();
                expect(analystResult[0].route.type).toBe("Feature");
                findTSPPathsService.destroy();
                expect(findTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindTSPPathsService_" + exception.name + ":" + exception.message);
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000)
    });

    //id为空
    it('processAsync_isAnalyzeById:null', function (done) {
        var nodeArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ];
        var resultSetting = new SuperMap.TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
        var analystParameter = new SuperMap.TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new SuperMap.FindTSPPathsParameters({
            isAnalyzeById: true,
            nodes: nodeArray,
            endNodeAssigned: false,
            parameter: analystParameter
        });
        var findTSPPathsService = initFindTSPPathService();
        findTSPPathsService.processAsync(parameter);
        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.type).toBe("processFailed");
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindTSPPathsService_" + exception.name + ":" + exception.message);
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000)
    });

    //参数错误
    it('processAsync_parameterWrong', function (done) {
        var nodeArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ];
        var resultSetting = new SuperMap.TransportationAnalystResultSetting({
            returnEdgeFeatures: false,
            returnEdgeGeometry: false,
            returnEdgeIDs: false,
            returnNodeFeatures: false,
            returnNodeGeometry: false,
            returnNodeIDs: false,
            returnPathGuides: false,
            returnRoutes: false
        });
        var analystParameter = new SuperMap.TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "TurnCost1"
        });
        var parameter = new SuperMap.FindTSPPathsParameters({
            isAnalyzeById: false,
            nodes: nodeArray,
            endNodeAssigned: false,
            parameter: analystParameter
        });
        var findTSPPathsService = initFindTSPPathService();
        findTSPPathsService.processAsync(parameter);
        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.type).toBe("processFailed");
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindTSPPathsService_" + exception.name + ":" + exception.message);
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000)
    });

    //参数为空
    it('processAsync_parameterNull', function (done) {
        var findTSPPathsService = initFindTSPPathService();
        findTSPPathsService.processAsync();
        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.type).toBe("processFailed");
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findTSPPathsService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindTSPPathsService_" + exception.name + ":" + exception.message);
                findTSPPathsService.destroy();
                done();
            }
        }, 2000)
    });

    //AnalyzeById_wrong
    it('processAsync_AnalyzeById_wrong', function (done) {
        var nodeArray = [new SuperMap.Geometry.Point(5627.7550668827, -3627.4849836293),
            new SuperMap.Geometry.Point(5018.1469160422, -4638.5424045354),
            new SuperMap.Geometry.Point(6133.2837773358, -4645.9766502774)
        ];
        var resultSetting = new SuperMap.TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
        var analystParameter = new SuperMap.TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new SuperMap.FindTSPPathsParameters({
            isAnalyzeById: "AnalyzeById",
            nodes: nodeArray,
            endNodeAssigned: false,
            parameter: analystParameter
        });
        var findTSPPathsService = initFindTSPPathService();
        findTSPPathsService.processAsync(parameter);
        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.type).toBe("processFailed");
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindTSPPathsService_" + exception.name + ":" + exception.message);
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000)
    })
});
