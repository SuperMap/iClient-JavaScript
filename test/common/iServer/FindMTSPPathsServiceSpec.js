﻿import {FindMTSPPathsService} from '../../../src/common/iServer/FindMTSPPathsService';
import {FindMTSPPathsParameters} from '../../../src/common/iServer/FindMTSPPathsParameters';
import {TransportationAnalystParameter} from '../../../src/common/iServer/TransportationAnalystParameter';
import {TransportationAnalystResultSetting} from '../../../src/common/iServer/TransportationAnalystResultSetting';
import {Point} from '../../../src/common/commontypes/geometry/Point';

var url = GlobeParameter.networkAnalystURL;
//服务初始化时注册事件监听函数
var serviceFailedEventArgsSystem = null, serviceSucceedEventArgsSystem = null;
var initFindMTSPathsService = () => {
    return new FindMTSPPathsService(url, options);
};
var findMTSPathsServiceCompleted = (serviceSucceedEventArgs) => {
    serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
};
var findMTSPathsServiceFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var options = {
    eventListeners: {
        'processFailed': findMTSPathsServiceFailed,
        'processCompleted': findMTSPathsServiceCompleted
    }
};

describe('FindMTSPPathsService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //基本测试
    it('processAsync:default', (done) => {
        var centerArray = [new Point(3000, -3000), new Point(3500, -2000)],
            nodeArray = [new Point(5600, -3600),
                new Point(5000, -4600),
                new Point(2000, -4600)
            ];
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new FindMTSPPathsParameters({
            isAnalyzeById: false,
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost: false

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);
        setTimeout(() => {
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
    it('processAsync_hasLeastTotalCost:true', (done) => {
        var centerArray = [new Point(3000, -3000), new Point(3500, -2000)];
        var nodeArray = [new Point(5600, -3600),
            new Point(5000, -4600),
            new Point(2000, -4600)
        ];
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new FindMTSPPathsParameters({
            isAnalyzeById: false,
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost: true

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);
        setTimeout(() => {
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
    it('processAsync_isAnalyzeById', (done) => {
        var centerArray = [2, 5, 7];
        var nodeArray = [1, 6, 21];
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new FindMTSPPathsParameters({
            isAnalyzeById: true,
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost: true

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);
        setTimeout(() => {
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
    it('processAsync_isAnalyzeById but Null', (done) => {
        var centerArray = [new Point(3000, -3000), new Point(3500, -2000)];
        var nodeArray = [new Point(5600, -3600),
            new Point(5000, -4600),
            new Point(2000, -4600)
        ];
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new FindMTSPPathsParameters({
            isAnalyzeById: true,
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost: true

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);
        setTimeout(() => {
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
    it('processAsync_parameterWrong', (done) => {
        var centerArray = [new Point(3000, -3000), new Point(3500, -2000)];
        var nodeArray = [new Point(5600, -3600),
            new Point(5000, -4600),
            new Point(2000, -4600)
        ];
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "TurnCost1"
        });
        var parameter = new FindMTSPPathsParameters({
            isAnalyzeById: false,
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost: true

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);
        setTimeout(() => {
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
    it('processAsync_parameterWrong', (done) => {
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync();

        setTimeout(() => {
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
    it('processAsync_AnalyzeById_null', (done) => {
        var centerArray = [new Point(3000, -3000), new Point(3500, -2000)],
            nodeArray = [new Point(5600, -3600),
                new Point(5000, -4600),
                new Point(2000, -4600)
            ];
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new FindMTSPPathsParameters({
            isAnalyzeById: "AnalyzeById",
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost: true

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);
        setTimeout(() => {
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


