require('../../../src/common/iServer/ComputeWeightMatrixService');
require('../../../src/common/commontypes/geometry/Point');
var serviceFailedEventArgsSystem = null;
//服务初始化时注册事件监听函数
var url = GlobeParameter.networkAnalystURL;
var options = {
    eventListeners: {
        'processCompleted': ComputeWeightMatrixServiceCompleted,
        'processFailed': ComputeWeightMatrixServiceFailed
    }
};

function initComputeWeightMatrixService_RegisterListener() {
    return new SuperMap.ComputeWeightMatrixService(url, options);
}

function ComputeWeightMatrixServiceCompleted(getFeaturesEventArgs) {
    serviceCompletedEventArgsSystem = getFeaturesEventArgs;
}

function ComputeWeightMatrixServiceFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

describe('testComputeWeightMatrixService_processAsync', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('return_true', function (done) {
        var computeWeightMatrixService = initComputeWeightMatrixService_RegisterListener();
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
        var parameter = new SuperMap.ComputeWeightMatrixParameters({
            isAnalyzeById: false,
            nodes: nodeArray,
            parameter: analystParameter
        });
        computeWeightMatrixService.processAsync(parameter);

        setTimeout(function () {
            try {
                expect(computeWeightMatrixService).not.toBeNull();
                expect(serviceCompletedEventArgsSystem.result).not.toBeNull();
                /*  expect(serviceCompletedEventArgsSystem.result[0][0]).toEqual(0);
                  expect(serviceCompletedEventArgsSystem.result[0][1]).toEqual(53);
                  expect(serviceCompletedEventArgsSystem.result[1][0]).toEqual(53);
                  expect(serviceCompletedEventArgsSystem.result[1][1]).toEqual(0);*/
                computeWeightMatrixService.destroy();
                expect(computeWeightMatrixService.EVENT_TYPES).toBeNull();
                expect(computeWeightMatrixService.events).toBeNull();
                expect(computeWeightMatrixService.isAnalyzeById == null).toBeTruthy();
                expect(computeWeightMatrixService.nodes == null).toBeTruthy();
                expect(computeWeightMatrixService.parameter == null).toBeTruthy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ComputeWeightMatrixService_" + exception.name + ":" + exception.message);
                computeWeightMatrixService.destroy();
                parameter.destroy();
                done();
            }
        }, 4000);
    });

    //id为空
    it('isAnalyzeById', function (done) {
        var computeWeightMatrixService = initComputeWeightMatrixService_RegisterListener();
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
            weightFieldName: "length"
        });
        var parameter = new SuperMap.ComputeWeightMatrixParameters({
            isAnalyzeById: true,
            nodes: nodeArray,
            parameter: analystParameter
        });
        computeWeightMatrixService.processAsync(parameter);

        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.error.erroeMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                computeWeightMatrixService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ComputeWeightMatrixService_" + exception.name + ":" + exception.message);
                computeWeightMatrixService.destroy();
                parameter.destroy();
                done();
            }
        }, 4000)
    });

    //参数错误
    it('parameterWrong', function (done) {
        var computeWeightMatrixService = initComputeWeightMatrixService_RegisterListener();
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
        var parameter = new SuperMap.FindPathParameters({
            isAnalyzeById: false,
            nodes: nodeArray,
            parameter: analystParameter
        });
        computeWeightMatrixService.processAsync(parameter);

        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                computeWeightMatrixService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ComputeWeightMatrixService_" + exception.name + ":" + exception.message);
                computeWeightMatrixService.destroy();
                parameter.destroy();
                done();
            }
        }, 4000)
    });

    //测试参数为空时的健壮性
    it('parameterNull', function (done) {
        var computeWeightMatrixService = initComputeWeightMatrixService_RegisterListener();
        computeWeightMatrixService.processAsync();

        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                computeWeightMatrixService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ComputeWeightMatrixService_" + exception.name + ":" + exception.message);
                computeWeightMatrixService.destroy();
                done();
            }
        }, 4000)
    });

    it('isAnalyzeByIdInvalid', function (done) {
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
        var parameter = new SuperMap.ComputeWeightMatrixParameters({
            isAnalyzeById: 2,
            nodes: nodeArray,
            parameter: analystParameter
        });
        computeWeightMatrixService = initComputeWeightMatrixService_RegisterListener();
        computeWeightMatrixService.processAsync(parameter);

        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                computeWeightMatrixService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ComputeWeightMatrixService_" + exception.name + ":" + exception.message);
                computeWeightMatrixService.destroy();
                parameter.destroy();
                done();
            }
        }, 4000)
    })
});
