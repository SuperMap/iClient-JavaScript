﻿import {FindPathService} from '../../../src/common/iServer/FindPathService';
import {FindPathParameters} from '../../../src/common/iServer/FindPathParameters';
import {TransportationAnalystParameter} from '../../../src/common/iServer/TransportationAnalystParameter';
import {TransportationAnalystResultSetting} from '../../../src/common/iServer/TransportationAnalystResultSetting';
import {Point} from '../../../src/common/commontypes/geometry/Point';

var url = GlobeParameter.networkAnalystURL;
//服务初始化时注册事件监听函数
var serviceFailedEventArgsSystem = null, serviceSucceedEventArgsSystem = null;

var initFindPathService = () => {
    return new FindPathService(url, options);
};
var findPathServiceCompleted = (serviceSucceedEventArgs) => {
    serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
};
var findPathServiceFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var options = {
    eventListeners: {
        'processFailed': findPathServiceFailed,
        'processCompleted': findPathServiceCompleted
    }
};

describe('FindPathService', () => {
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
        var nodeArray = [new Point(119.6100397551, -122.6278394459),
            new Point(171.9035599945, -113.2491141857)
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
        var parameter = new FindPathParameters({
            isAnalyzeById: false,
            nodes: nodeArray,
            hasLeastEdgeCount: false,
            parameter: analystParameter
        });
        var findPathService = initFindPathService();
        findPathService.processAsync(parameter);
        setTimeout(() => {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result.pathList;
                expect(analystResult).not.toBeNull();
                expect(analystResult[0].edgeFeatures).not.toBeNull();
                expect(analystResult[0].edgeFeatures.type).toEqual("FeatureCollection");
                expect(analystResult[0].edgeFeatures.features).not.toBeNull();
                expect(analystResult[0].edgeFeatures.features[0].type).toEqual("Feature");
                expect(analystResult[0].edgeFeatures.features[0].geometry).not.toBeNull();
                expect(analystResult[0].edgeFeatures.features[0].properties.ID).toEqual(8367);
                expect(analystResult[0].nodeFeatures).not.toBeNull();
                expect(analystResult[0].nodeFeatures.features[0].properties.ID).toEqual(2);
                expect(analystResult[0].pathGuideItems).not.toBeNull();
                expect(analystResult[0].route).not.toBeNull();
                findPathService.destroy();
                expect(findPathService.EVENT_TYPES).toBeNull();
                expect(findPathService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindPathService_" + exception.name + ":" + exception.message);
                findPathService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000);
    });

    //设置返回信息的有效性
    it('processAsync_returnInformationInvalid', (done) => {
        var nodeArray = [new Point(119.6100397551, -122.6278394459),
            new Point(171.9035599945, -113.2491141857)
        ];
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: false,
            returnEdgeGeometry: false,
            returnEdgeIDs: false,
            returnNodeFeatures: false,
            returnNodeGeometry: false,
            returnNodeIDs: false,
            returnPathGuides: false,
            returnRoutes: false
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new FindPathParameters({
            isAnalyzeById: false,
            nodes: nodeArray,
            hasLeastEdgeCount: true,
            parameter: analystParameter
        });
        var findPathService = initFindPathService();
        findPathService.processAsync(parameter);
        setTimeout(() => {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result.pathList;
                expect(analystResult != null).toBeTruthy();
                expect(analystResult[0].edgeFeatures == null).toBeTruthy();
                expect(analystResult[0].nodeFeatures == null).toBeTruthy();
                expect(analystResult[0].pathGuideItems == null).toBeTruthy();
                expect(analystResult[0].route == null).toBeTruthy();
                findPathService.destroy();
                expect(findPathService.EVENT_TYPES).toBeNull();
                expect(findPathService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindPathService_" + exception.name + ":" + exception.message);
                findPathService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000)
    });

    //id为空
    it('processAsync_isAnalyzeById but Null', (done) => {
        var nodeArray = [new Point(119.6100397551, -122.6278394459),
            new Point(171.9035599945, -113.2491141857)
        ];
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: false,
            returnEdgeGeometry: false,
            returnEdgeIDs: false,
            returnNodeFeatures: false,
            returnNodeGeometry: false,
            returnNodeIDs: false,
            returnPathGuides: false,
            returnRoutes: false
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new FindPathParameters({
            isAnalyzeById: true,
            nodes: nodeArray,
            hasLeastEdgeCount: true,
            parameter: analystParameter
        });
        var findPathService = initFindPathService();
        findPathService.processAsync(parameter);
        setTimeout(() => {
            try {
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findPathService.destroy();
                expect(findPathService.EVENT_TYPES).toBeNull();
                expect(findPathService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindPathService_" + exception.name + ":" + exception.message);
                findPathService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000)
    });

    //参数错误
    it('processAsync_parameterWrong', (done) => {
        var nodeArray = [new Point(119.6100397551, -122.6278394459),
            new Point(171.9035599945, -113.2491141857)
        ];
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: false,
            returnEdgeGeometry: false,
            returnEdgeIDs: false,
            returnNodeFeatures: false,
            returnNodeGeometry: false,
            returnNodeIDs: false,
            returnPathGuides: false,
            returnRoutes: false
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "TurnCost1"
        });
        var parameter = new FindPathParameters({
            isAnalyzeById: false,
            nodes: nodeArray,
            hasLeastEdgeCount: true,
            parameter: analystParameter
        });
        var findPathService = initFindPathService();
        findPathService.processAsync(parameter);
        setTimeout(() => {
            try {
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                findPathService.destroy();
                expect(findPathService.EVENT_TYPES).toBeNull();
                expect(findPathService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindPathService_" + exception.name + ":" + exception.message);
                findPathService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000)
    });

    //参数为空
    it('processAsync_parameterNull', (done) => {
        var findPathService = initFindPathService();
        findPathService.processAsync();
        setTimeout(() => {
            try {
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findPathService.destroy();
                expect(findPathService.EVENT_TYPES).toBeNull();
                expect(findPathService.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindPathService_" + exception.name + ":" + exception.message);
                findPathService.destroy();
                done();
            }
        }, 2000)
    });

    //AnalyzeById_null
    it('AnalyzeById_null', (done) => {
        var nodeArray = [new Point(119.6100397551, -122.6278394459),
            new Point(171.9035599945, -113.2491141857)
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
        var parameter = new FindPathParameters({
            isAnalyzeById: "AnalyzeById",
            nodes: nodeArray,
            hasLeastEdgeCount: false,
            parameter: analystParameter
        });
        var findPathService = initFindPathService();
        findPathService.processAsync(parameter);
        setTimeout(() => {
            try {
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg !== null).toBeTruthy();
                findPathService.destroy();
                expect(findPathService.EVENT_TYPES).toBeNull();
                expect(findPathService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindPathService_" + exception.name + ":" + exception.message);
                findPathService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000)
    });
});

