﻿import {ComputeWeightMatrixService} from '../../../src/common/iServer/ComputeWeightMatrixService';
import {ComputeWeightMatrixParameters} from '../../../src/common/iServer/ComputeWeightMatrixParameters';
import {TransportationAnalystParameter} from '../../../src/common/iServer/TransportationAnalystParameter';
import {FindPathParameters} from '../../../src/common/iServer/FindPathParameters';
import {TransportationAnalystResultSetting} from '../../../src/common/iServer/TransportationAnalystResultSetting';
import {Point} from '../../../src/common/commontypes/geometry/Point';

var url = GlobeParameter.networkAnalystURL;
var serviceFailedEventArgsSystem = null, serviceCompletedEventArgsSystem = null;
var initComputeWeightMatrixService_RegisterListener = () => {
    return new ComputeWeightMatrixService(url, options);
};
var ComputeWeightMatrixServiceCompleted = (getFeaturesEventArgs) => {
    serviceCompletedEventArgsSystem = getFeaturesEventArgs;
};
var ComputeWeightMatrixServiceFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var options = {
    eventListeners: {
        'processCompleted': ComputeWeightMatrixServiceCompleted,
        'processFailed': ComputeWeightMatrixServiceFailed
    }
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
        computeWeightMatrixService.processAsync(parameter);

        setTimeout(() => {
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
    it('processAsync_isAnalyzeById:null', (done) => {
        var computeWeightMatrixService = initComputeWeightMatrixService_RegisterListener();
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
        computeWeightMatrixService.processAsync(parameter);
        setTimeout(() => {
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
    it('processAsync_parametersWrong', (done) => {
        var computeWeightMatrixService = initComputeWeightMatrixService_RegisterListener();
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
        computeWeightMatrixService.processAsync(parameter);
        setTimeout(() => {
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
    it('processAsync:parametersNull', (done) => {
        var computeWeightMatrixService = initComputeWeightMatrixService_RegisterListener();
        computeWeightMatrixService.processAsync();

        setTimeout(() => {
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
        var computeWeightMatrixService = initComputeWeightMatrixService_RegisterListener();
        computeWeightMatrixService.processAsync(parameter);
        setTimeout(() => {
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
