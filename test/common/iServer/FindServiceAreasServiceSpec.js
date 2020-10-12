import { FindServiceAreasService } from '../../../src/common/iServer/FindServiceAreasService';
import { FindServiceAreasParameters } from '../../../src/common/iServer/FindServiceAreasParameters';
import { TransportationAnalystParameter } from '../../../src/common/iServer/TransportationAnalystParameter';
import { TransportationAnalystResultSetting } from '../../../src/common/iServer/TransportationAnalystResultSetting';
import { Point } from '../../../src/common/commontypes/geometry/Point';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.networkAnalystURL;
//服务初始化时注册事件监听函数
var serviceFailedEventArgsSystem = null, serviceSucceedEventArgsSystem = null;
var initFindServiceAreasService = () => {
    return new FindServiceAreasService(url, options);
};
var findServiceAreasServiceCompleted = (serviceSucceedEventArgs) => {
    serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
};
var findServiceAreasServiceFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var options = {
    eventListeners: {
        'processFailed': findServiceAreasServiceFailed,
        'processCompleted': findServiceAreasServiceCompleted
    }
};

describe('FindServiceAreasService', () => {
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
        var centerArray = [new Point(119.6100397551, -122.6278394459),
        new Point(171.9035599945, -113.2491141857)
        ];
        var weightArray = [1, 2];
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
        var parameter = new FindServiceAreasParameters({
            isAnalyzeById: false,
            centers: centerArray,
            weights: weightArray,
            isCenterMutuallyExclusive: false,
            isFromCenter: false,
            parameter: analystParameter
        });
        var findServiceAreasServiceCompleted = (serviceSucceedEventArgsSystem) => {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(analystResult.serviceAreaList != null).toBeTruthy();
                expect(analystResult.serviceAreaList[0].edgeFeatures != null).toBeTruthy();
                expect(analystResult.serviceAreaList[0].edgeIDs[0]).toEqual(48);
                expect(analystResult.serviceAreaList[0].nodeFeatures != null).toBeTruthy();
                expect(analystResult.serviceAreaList[0].routes != null).toBeTruthy();
                expect(analystResult.serviceAreaList[0].serviceRegion != null).toBeTruthy();
                findServiceAreasService.destroy();
                expect(findServiceAreasService.EVENT_TYPES).toBeNull();
                expect(findServiceAreasService.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindServiceAreasService_" + exception.name + ":" + exception.message);
                findServiceAreasService.destroy();
                done();
            }
        };
        var findServiceAreasServiceFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var options = {
            eventListeners: {
                'processFailed': findServiceAreasServiceFailed,
                'processCompleted': findServiceAreasServiceCompleted
            }
        };
        var findServiceAreasService = new FindServiceAreasService(url, options);
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/servicearea");
            return Promise.resolve(new Response(JSON.stringify(findServiceAreasResultJson)))
        });
        findServiceAreasService.processAsync(parameter);
    });

    //设置返回信息的有效性
    it('processAsync_returnInformationInvalid', (done) => {
        var centerArray = [new Point(119.6100397551, -122.6278394459),
        new Point(171.9035599945, -113.2491141857)
        ];
        var weightArray = [1, 2];
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
        var parameter = new FindServiceAreasParameters({
            isAnalyzeById: false,
            centers: centerArray,
            weights: weightArray,
            isCenterMutuallyExclusive: false,
            isFromCenter: false,
            parameter: analystParameter
        });
        var findServiceAreasServiceCompleted = (serviceSucceedEventArgsSystem) => {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(analystResult.serviceAreaList).not.toBeNull();
                expect(analystResult.serviceAreaList[0].edgeFeatures).not.toBeNull();
                expect(analystResult.serviceAreaList[0].edgeIDs.length).toEqual(2);
                expect(analystResult.serviceAreaList[0].nodeFeatures).not.toBeNull();
                expect(analystResult.serviceAreaList[0].nodeIDs.length).toEqual(2);
                expect(analystResult.serviceAreaList[0].routes).not.toBeNull();
                expect(analystResult.serviceAreaList[0].serviceRegion).not.toBeNull();
                findServiceAreasService.destroy();
                expect(findServiceAreasService.EVENT_TYPES).toBeNull();
                expect(findServiceAreasService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindServiceAreasService_" + exception.name + ":" + exception.message);
                findServiceAreasService.destroy();
                parameter.destroy();
                done();
            }
        };
        var findServiceAreasServiceFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var options = {
            eventListeners: {
                'processFailed': findServiceAreasServiceFailed,
                'processCompleted': findServiceAreasServiceCompleted
            }
        };
        var findServiceAreasService = new FindServiceAreasService(url, options);;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/servicearea");
            return Promise.resolve(new Response(JSON.stringify(findServiceAreasResultJson)))
        });
        findServiceAreasService.processAsync(parameter);
    });

    //id为空
    it('processAsync_isAnalystById', (done) => {
        var centerArray = [new Point(119.6100397551, -122.6278394459),
        new Point(171.9035599945, -113.2491141857)
        ];
        var weightArray = [1, 2];
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
        var parameter = new FindServiceAreasParameters({
            isAnalyzeById: true,
            centers: centerArray,
            weights: weightArray,
            isCenterMutuallyExclusive: false,
            isFromCenter: false,
            parameter: analystParameter
        });
        var findServiceAreasServiceCompleted = (serviceSucceedEventArgs) => {
            serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
        };
        var findServiceAreasServiceFailed = (serviceFailedEventArgsSystem) => {
            try {
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findServiceAreasService.destroy();
                expect(findServiceAreasService.EVENT_TYPES).toBeNull();
                expect(findServiceAreasService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindServiceAreasService_" + exception.name + ":" + exception.message);
                findServiceAreasService.destroy();
                parameter.destroy();
                done();
            }
        };
        var options = {
            eventListeners: {
                'processFailed': findServiceAreasServiceFailed,
                'processCompleted': findServiceAreasServiceCompleted
            }
        };
        var findServiceAreasService = new FindServiceAreasService(url, options);;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/servicearea");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数centers 不是有效的JSON 字符串对象"}}`))
        });
        findServiceAreasService.processAsync(parameter);
    });

    //参数错误
    it('processAsync_paramsWrong', (done) => {
        var centerArray = [new Point(119.6100397551, -122.6278394459),
        new Point(171.9035599945, -113.2491141857)
        ];
        var weightArray = [1, 2];
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
        var parameter = new FindServiceAreasParameters({
            isAnalyzeById: false,
            centers: centerArray,
            weights: weightArray,
            isCenterMutuallyExclusive: false,
            isFromCenter: false,
            parameter: analystParameter
        });
        var findServiceAreasServiceCompleted = (serviceSucceedEventArgs) => {
            serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
        };
        var findServiceAreasServiceFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var options = {
            eventListeners: {
                'processFailed': findServiceAreasServiceFailed,
                'processCompleted': findServiceAreasServiceCompleted
            }
        };
        var findServiceAreasServiceCompleted = (serviceSucceedEventArgs) => {
            serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
        };
        var findServiceAreasServiceFailed = (serviceFailedEventArgsSystem) => {
            try {
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findServiceAreasService.destroy();
                expect(findServiceAreasService.EVENT_TYPES).toBeNull();
                expect(findServiceAreasService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindServiceAreasService_" + exception.name + ":" + exception.message);
                findServiceAreasService.destroy();
                parameter.destroy();
                done();
            }
        };
        var options = {
            eventListeners: {
                'processFailed': findServiceAreasServiceFailed,
                'processCompleted': findServiceAreasServiceCompleted
            }
        };
        var findServiceAreasService = new FindServiceAreasService(url, options);;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/servicearea");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"执行 findServiceAreas 操作时出错,原因是：权重字段TurnCost1不存在。"}}`))
        });
        findServiceAreasService.processAsync(parameter);
    });

    //参数为空
    it('processAsync_parameterNull', () => {
        var flag = false;
        var findServiceAreasServiceCompleted = (serviceSucceedEventArgs) => {
            flag = true;
        };
        var findServiceAreasServiceFailed = (serviceFailedEventArgsSystem) => {
            flag = true;
        }
        var findServiceAreasService = new FindServiceAreasService(url, options);
        findServiceAreasService.processAsync();
        expect(flag).toBeFalsy;
    });

    //AnalyzeById_null
    it('processAsync_AnalyzeById_wrong', (done) => {
        var centerArray = [new Point(119.6100397551, -122.6278394459),
        new Point(171.9035599945, -113.2491141857)
        ];
        var weightArray = [1, 2];
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
        var parameter = new FindServiceAreasParameters({
            isAnalyzeById: "AnalyzeById",
            centers: centerArray,
            weights: weightArray,
            isCenterMutuallyExclusive: false,
            isFromCenter: false,
            parameter: analystParameter
        });
        var findServiceAreasServiceCompleted = (serviceSucceedEventArgs) => {
            serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
        };
        var findServiceAreasServiceFailed = (serviceFailedEventArgsSystem) => {
            try {
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findServiceAreasService.destroy();
                expect(findServiceAreasService.EVENT_TYPES).toBeNull();
                expect(findServiceAreasService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindServiceAreasService_" + exception.name + ":" + exception.message);
                findServiceAreasService.destroy();
                parameter.destroy();
                done();
            }
        };
        var options = {
            eventListeners: {
                'processFailed': findServiceAreasServiceFailed,
                'processCompleted': findServiceAreasServiceCompleted
            }
        };
        var findServiceAreasService = new FindServiceAreasService(url, options);;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/servicearea");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"执行 findServiceAreas 操作时出错,原因是：权重字段TurnCost1不存在。"}}`))
        });
        findServiceAreasService.processAsync(parameter);
    })
});
