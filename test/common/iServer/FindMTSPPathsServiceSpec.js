require('../../../src/common/iServer/FindMTSPPathsService');

var serviceFailedEventArgsSystem = null;
var serviceSucceedEventArgsSystem = null;

//服务初始化时注册事件监听函数
var url = GlobeParameter.networkAnalystURL;
;
var options = {
    eventListeners: {
        'processFailed': findMTSPathsServiceFailed,
        'processCompleted': findMTSPathsServiceCompleted
    }
};
function initFindMTSPathsService() {
    return new SuperMap.FindMTSPPathsService(url, options);
}
function findMTSPathsServiceCompleted(serviceSucceedEventArgs) {
    serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
}
function findMTSPathsServiceFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}


describe('testFindMTSPPathsService_processAsync', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //基本测试
    it('basicTest', function (done) {
        var centerArray = [new SuperMap.Geometry.Point(3000, -3000), new SuperMap.Geometry.Point(3500, -2000)],
            nodeArray = [new SuperMap.Geometry.Point(5600, -3600),
                new SuperMap.Geometry.Point(5000, -4600),
                new SuperMap.Geometry.Point(2000, -4600)
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
        var parameter = new SuperMap.FindMTSPPathsParameters({
            isAnalyzeById: false,
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost: false

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);

        setTimeout(function () {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result.pathList;
                expect(analystResult).not.toBeNull();
                expect(analystResult[0].edgeFeatures).not.toBeNull();
                expect(analystResult[0].edgeFeatures.type).toEqual("FeatureCollection");
                expect(analystResult[0].edgeFeatures.features).not.toBeNull();
                expect(analystResult[0].edgeFeatures.features[0].type).toEqual("Feature");
                expect(analystResult[0].edgeFeatures.features[0].geometry).not.toBeNull();
                expect(analystResult[0].edgeFeatures.features[0].properties.ID).toEqual(4664);
                expect(analystResult[0].nodeFeatures).not.toBeNull();
                expect(analystResult[0].nodeFeatures.features[0].properties.ID).toEqual(2128);
                expect(analystResult[0].pathGuideItems).not.toBeNull();
                expect(analystResult[0].route).not.toBeNull();
                findMTSPPathsService.destroy();
                expect(findMTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findMTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindMTSPPathsService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000)
    });

    //测试hasLeastTotalCost为true
    it('hasLeastTotalCost:true', function (done) {
        var centerArray = [new SuperMap.Geometry.Point(3000, -3000), new SuperMap.Geometry.Point(3500, -2000)];
        var nodeArray = [new SuperMap.Geometry.Point(5600, -3600),
            new SuperMap.Geometry.Point(5000, -4600),
            new SuperMap.Geometry.Point(2000, -4600)
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
        var parameter = new SuperMap.FindMTSPPathsParameters({
            isAnalyzeById: false,
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost: true

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);

        setTimeout(function () {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result.pathList;
                expect(analystResult).not.toBeNull();
                expect(analystResult[0].edgeFeatures).not.toBeNull();
                expect(analystResult[0].edgeFeatures.type).toEqual("FeatureCollection");
                expect(analystResult[0].edgeFeatures.features).not.toBeNull();
                expect(analystResult[0].edgeFeatures.features[0].type).toEqual("Feature");
                expect(analystResult[0].edgeFeatures.features[0].geometry).not.toBeNull();
                expect(analystResult[0].edgeFeatures.features[0].properties.ID).toEqual(4664);
                expect(analystResult[0].nodeFeatures).not.toBeNull();
                expect(analystResult[0].nodeFeatures.features[0].properties.ID).toEqual(2128);
                expect(analystResult[0].pathGuideItems).not.toBeNull();
                expect(analystResult[0].route).not.toBeNull();
                findMTSPPathsService.destroy();
                expect(findMTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findMTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindMTSPPathsService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000);
    });

    //测试传入参数为id
    it('isAnalyzeById', function (done) {
        var centerArray = [2, 5, 7];
        var nodeArray = [1, 6, 21];
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
        var parameter = new SuperMap.FindMTSPPathsParameters({
            isAnalyzeById: true,
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost: true

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);

        setTimeout(function () {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result.pathList;

                expect(analystResult).not.toBeNull();
                expect(analystResult[0].edgeFeatures).not.toBeNull();
                expect(analystResult[0].edgeFeatures.type).toEqual("FeatureCollection");
                expect(analystResult[0].edgeFeatures.features).not.toBeNull();
                expect(analystResult[0].edgeFeatures.features[0].type).toEqual("Feature");
                expect(analystResult[0].edgeFeatures.features[0].geometry).not.toBeNull();
                expect(analystResult[0].edgeFeatures.features[0].properties.ID).toEqual(8366);
                expect(analystResult[0].nodeFeatures).not.toBeNull();
                expect(analystResult[0].nodeFeatures.features[0].properties.ID).toEqual(2);
                expect(analystResult[0].route).not.toBeNull();

                findMTSPPathsService.destroy();
                expect(findMTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findMTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindMTSPPathsService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000)
    });

    //测试传入参数为id，但是传入为空
    it('isAnalyzeById but null', function (done) {
        var centerArray = [new SuperMap.Geometry.Point(3000, -3000), new SuperMap.Geometry.Point(3500, -2000)];
        var nodeArray = [new SuperMap.Geometry.Point(5600, -3600),
            new SuperMap.Geometry.Point(5000, -4600),
            new SuperMap.Geometry.Point(2000, -4600)
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
        var parameter = new SuperMap.FindMTSPPathsParameters({
            isAnalyzeById: true,
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost: true

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);

        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.formatErrorMsg).not.toBeNull();
                findMTSPPathsService.destroy();
                expect(findMTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findMTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindMTSPPathsService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000)
    });

    //参数错误
    it('parameterWrong', function (done) {
        var centerArray = [new SuperMap.Geometry.Point(3000, -3000), new SuperMap.Geometry.Point(3500, -2000)];
        var nodeArray = [new SuperMap.Geometry.Point(5600, -3600),
            new SuperMap.Geometry.Point(5000, -4600),
            new SuperMap.Geometry.Point(2000, -4600)
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
            weightFieldName: "TurnCost1"
        });
        var parameter = new SuperMap.FindMTSPPathsParameters({
            isAnalyzeById: false,
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost: true

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);

        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                findMTSPPathsService.destroy();
                expect(findMTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findMTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindMTSPPathsService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000)
    });

    //参数为空
    it('parameterWrong', function (done) {
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync();

        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                findMTSPPathsService.destroy();
                expect(findMTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findMTSPPathsService.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindMTSPPathsService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                done();
            }
        }, 2000)
    });

    //错误的isAnalyzeById
    it('AnalyzeById_null', function (done) {
        var centerArray = [new SuperMap.Geometry.Point(3000, -3000), new SuperMap.Geometry.Point(3500, -2000)],
            nodeArray = [new SuperMap.Geometry.Point(5600, -3600),
                new SuperMap.Geometry.Point(5000, -4600),
                new SuperMap.Geometry.Point(2000, -4600)
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
        var parameter = new SuperMap.FindMTSPPathsParameters({
            isAnalyzeById: "AnalyzeById",
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost: true

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);

        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                findMTSPPathsService.destroy();
                expect(findMTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findMTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindMTSPPathsService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000)
    })
});


