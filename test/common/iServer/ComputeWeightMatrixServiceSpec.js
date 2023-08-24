import { ComputeWeightMatrixService } from '../../../src/common/iServer/ComputeWeightMatrixService';
import { ComputeWeightMatrixParameters } from '../../../src/common/iServer/ComputeWeightMatrixParameters';
import { TransportationAnalystParameter } from '../../../src/common/iServer/TransportationAnalystParameter';
import { FindPathParameters } from '../../../src/common/iServer/FindPathParameters';
import { TransportationAnalystResultSetting } from '../../../src/common/iServer/TransportationAnalystResultSetting';
import { Point } from '../../../src/common/commontypes/geometry/Point';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
var url = GlobeParameter.networkAnalystURL;
var serviceFailedEventArgsSystem = null, serviceCompletedEventArgsSystem = null;
var initComputeWeightMatrixService_RegisterListener = () => {
    return new ComputeWeightMatrixService(url);
};


describe('ComputeWeightMatrixService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('processAsync_return:true', (done) => {
        var ComputeWeightMatrixServiceCompleted = (getFeaturesEventArgs) => {
            serviceCompletedEventArgsSystem = getFeaturesEventArgs;
            try {
                expect(computeWeightMatrixService).not.toBeNull();
                expect(serviceCompletedEventArgsSystem.result).not.toBeNull();
                expect(serviceCompletedEventArgsSystem.result[0][0]).toEqual(0);
                expect(serviceCompletedEventArgsSystem.result[0][1]).toEqual(53);
                expect(serviceCompletedEventArgsSystem.result[1][0]).toEqual(53);
                expect(serviceCompletedEventArgsSystem.result[1][1]).toEqual(0);
                computeWeightMatrixService.destroy();
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
        };
        var computeWeightMatrixService = initComputeWeightMatrixService_RegisterListener();

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
        var parameter = new ComputeWeightMatrixParameters({
            isAnalyzeById: false,
            nodes: nodeArray,
            parameter: analystParameter
        });

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url + "/weightmatrix");
            expect(params.nodes.length).toBe(83);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`[[0,53],[53,0]]`));
        });

        computeWeightMatrixService.processAsync(parameter, ComputeWeightMatrixServiceCompleted);
    });

    //id为空
    it('processAsync_isAnalyzeById:null', (done) => {
        var ComputeWeightMatrixServiceFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
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
        };

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
        var parameter = new ComputeWeightMatrixParameters({
            isAnalyzeById: true,
            nodes: nodeArray,
            parameter: analystParameter
        });

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url + "/weightmatrix");
            expect(params.nodes.length).toBe(33);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数nodes 不是有效的JSON 字符串对象"}}`));
        });
        var computeWeightMatrixService = initComputeWeightMatrixService_RegisterListener();
        computeWeightMatrixService.processAsync(parameter, ComputeWeightMatrixServiceFailed);
    });

    //参数错误
    it('processAsync_parametersWrong', () => {
        var flag = false;
        var ComputeWeightMatrixServiceCompleted = (getFeaturesEventArgs) => {
            flag = true;
        };

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
            parameter: analystParameter
        });
        var computeWeightMatrixService = initComputeWeightMatrixService_RegisterListener();
        computeWeightMatrixService.processAsync(parameter, ComputeWeightMatrixServiceCompleted);
        expect(flag).toBeFalsy;
    });

    //测试参数为空时的健壮性
    it('processAsync:parametersNull', () => {
        var flag = false;
        var ComputeWeightMatrixServiceCompleted = (getFeaturesEventArgs) => {
            flag = true;
        };
        var ComputeWeightMatrixServiceFailed = (serviceFailedEventArgsSystem) => {
            flag = true;
        };

        var computeWeightMatrixService = initComputeWeightMatrixService_RegisterListener();
        computeWeightMatrixService.processAsync(ComputeWeightMatrixServiceCompleted);
        expect(flag).toBeFalsy;
    });

    it('processAsync_isAnalyzeByIdInvalid', (done) => {
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
        var parameter = new ComputeWeightMatrixParameters({
            isAnalyzeById: 2,
            nodes: nodeArray,
            parameter: analystParameter
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url + "/weightmatrix");
            expect(params).not.toBeNull();
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"执行 findWeightMatrix 操作时出错,原因是：parameter\\nNode或者Point的个数至少有一个大于0 "}}`));
        });
        var ComputeWeightMatrixServiceCompleted = (getFeaturesEventArgs) => {
            serviceCompletedEventArgsSystem = getFeaturesEventArgs;
        };
        var ComputeWeightMatrixServiceFailed = (serviceFailedEventArgsSystem) => {
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
        };
        var computeWeightMatrixService = initComputeWeightMatrixService_RegisterListener();
        computeWeightMatrixService.processAsync(parameter, ComputeWeightMatrixServiceFailed);
    })
});
