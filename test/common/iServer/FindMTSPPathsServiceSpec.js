import { FindMTSPPathsService } from '../../../src/common/iServer/FindMTSPPathsService';
import { FindMTSPPathsParameters } from '../../../src/common/iServer/FindMTSPPathsParameters';
import { TransportationAnalystParameter } from '../../../src/common/iServer/TransportationAnalystParameter';
import { TransportationAnalystResultSetting } from '../../../src/common/iServer/TransportationAnalystResultSetting';
import { Point } from '../../../src/common/commontypes/geometry/Point';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.networkAnalystURL;
//服务初始化时注册事件监听函数
var serviceFailedEventArgsSystem = null, serviceSucceedEventArgsSystem = null;
var initFindMTSPathsService = () => {
    return new FindMTSPPathsService(url);
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

    // 基本测试
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
        var findMTSPathsServiceCompleted = (serviceSucceedEventArgsSystem) => {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result.pathList;
                expect(analystResult).not.toBeNull();
                expect(analystResult[0].edgeFeatures).not.toBeNull();
                expect(analystResult[0].edgeFeatures.type).toEqual("FeatureCollection");
                expect(analystResult[0].edgeFeatures.features).not.toBeNull();
                expect(analystResult[0].edgeFeatures.features[0].type).toEqual("Feature");
                expect(analystResult[0].edgeFeatures.features[0].geometry).not.toBeNull();
                expect(analystResult[0].edgeFeatures.features[0].id).toEqual(4786);
                expect(analystResult[0].nodeFeatures).not.toBeNull();
                expect(analystResult[0].nodeFeatures.features[0].id).toEqual(1575);
                expect(analystResult[0].pathGuideItems).not.toBeNull();
                expect(analystResult[0].route).not.toBeNull();
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindMTSPPathsService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        };
        var findMTSPPathsService = initFindMTSPathsService();

        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/mtsppath");
            return Promise.resolve(new Response(JSON.stringify(findMTSPPathsResultJson)))
        });
        findMTSPPathsService.processAsync(parameter, findMTSPathsServiceCompleted);
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
        var findMTSPathsServiceCompleted = (serviceSucceedEventArgsSystem) => {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result.pathList;
                expect(analystResult).not.toBeNull();
                expect(analystResult[0].edgeFeatures).not.toBeNull();
                expect(analystResult[0].edgeFeatures.type).toEqual("FeatureCollection");
                expect(analystResult[0].edgeFeatures.features).not.toBeNull();
                expect(analystResult[0].edgeFeatures.features[0].type).toEqual("Feature");
                expect(analystResult[0].edgeFeatures.features[0].geometry).not.toBeNull();
                expect(analystResult[0].edgeFeatures.features[0].id).toEqual(4786);
                expect(analystResult[0].nodeFeatures).not.toBeNull();
                expect(analystResult[0].nodeFeatures.features[0].id).toEqual(1575);
                expect(analystResult[0].pathGuideItems).not.toBeNull();
                expect(analystResult[0].route).not.toBeNull();
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindMTSPPathsService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        };
        var findMTSPPathsService = initFindMTSPathsService();

        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/mtsppath");
            return Promise.resolve(new Response(JSON.stringify(findMTSPPathsResultJson)))
        });
        findMTSPPathsService.processAsync(parameter, findMTSPathsServiceCompleted);
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
        var findMTSPathsServiceCompleted = (serviceSucceedEventArgsSystem) => {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result.pathList;
                expect(analystResult).not.toBeNull();
                expect(analystResult[0].edgeFeatures).not.toBeNull();
                expect(analystResult[0].edgeFeatures.type).toEqual("FeatureCollection");
                expect(analystResult[0].edgeFeatures.features).not.toBeNull();
                expect(analystResult[0].edgeFeatures.features[0].type).toEqual("Feature");
                expect(analystResult[0].edgeFeatures.features[0].geometry).not.toBeNull();
                expect(analystResult[0].edgeFeatures.features[0].id).toEqual(4786);
                expect(analystResult[0].nodeFeatures).not.toBeNull();
                expect(analystResult[0].nodeFeatures.features[0].id).toEqual(1575);
                expect(analystResult[0].route).not.toBeNull();
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindMTSPPathsService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        };
        var findMTSPathsServiceFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var findMTSPPathsService = initFindMTSPathsService();


        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/mtsppath");
            return Promise.resolve(new Response(JSON.stringify(findMTSPPathsResultJson)))
        });
        findMTSPPathsService.processAsync(parameter, findMTSPathsServiceCompleted);
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

        var findMTSPathsServiceFailed = (serviceFailedEventArgsSystem) => {
            try {
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.formatErrorMsg).not.toBeNull();
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindMTSPPathsService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        };
        var findMTSPPathsService = initFindMTSPathsService();
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/mtsppath");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数centers 不是有效的JSON 字符串对象"}}`))
        });
        findMTSPPathsService.processAsync(parameter, findMTSPathsServiceFailed);
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

        var findMTSPathsServiceFailed = (serviceFailedEventArgsSystem) => {
            try {
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindMTSPPathsService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        };

        var findMTSPPathsService = initFindMTSPathsService();

        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/mtsppath");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"执行 findMTSPPath 操作时出错,原因是：权重字段TurnCost1不存在。"}}`))
        });
        findMTSPPathsService.processAsync(parameter, findMTSPathsServiceFailed);
    });

    //参数为空
    it('processAsync_parameterNULL', () => {
        var flag = false;
        var findMTSPathsServiceCompleted = (serviceSucceedEventArgs) => {
            flag = true
        };
        var findMTSPathsServiceFailed = (serviceFailedEventArgsSystem) => {
            flag = true
        };
        var findMTSPPathsService = initFindMTSPathsService();

        findMTSPPathsService.processAsync(findMTSPathsServiceCompleted);
        //不会发送任何请求，在processAsync直接return 了 so 应为false
        expect(flag).toBeFalsy;
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
        var findMTSPathsServiceCompleted = (serviceSucceedEventArgs) => {
            serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
        };
        var findMTSPathsServiceFailed = (serviceFailedEventArgsSystem) => {
            try {
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindMTSPPathsService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        };

        var findMTSPPathsService = initFindMTSPathsService();

        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/mtsppath");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"执行 findMTSPPath 操作时出错,原因是：parameter\\nNode或者Point的个数至少有一个大于0"}}`))
        });
        findMTSPPathsService.processAsync(parameter, findMTSPathsServiceFailed);
    })
});


