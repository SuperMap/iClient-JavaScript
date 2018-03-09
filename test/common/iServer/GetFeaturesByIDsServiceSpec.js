﻿import {GetFeaturesByIDsService} from '../../../src/common/iServer/GetFeaturesByIDsService';
import {GetFeaturesByIDsParameters} from '../../../src/common/iServer/GetFeaturesByIDsParameters';

var dataServiceURL = GlobeParameter.dataServiceURL;
var serviceFailedEventArgsSystem = null;
var getFeatureEventArgsSystem = null;
var getFeaturesByIDsFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var getFeaturesByIDsCompleted = (getFeaturesEventArgs) => {
    getFeatureEventArgsSystem = getFeaturesEventArgs;
};
var options = {
    eventListeners: {
        processCompleted: getFeaturesByIDsCompleted,
        processFailed: getFeaturesByIDsFailed
    }
};
var initGetFeaturesByIDsService = () => {
    return new GetFeaturesByIDsService(dataServiceURL, options);
};

describe('GetFeaturesByIDsService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //不直接返回查询结果
    it('processAsync_returnContent:false', (done) => {
        var getFeaturesByIDsService = initGetFeaturesByIDsService();
        var getFeaturesByIDsParameters = new GetFeaturesByIDsParameters({
            returnContent: false,
            datasetNames: ["World:Capitals"],
            fromIndex: 0,
            fields: ["SMID"],
            toIndex: -1,
            IDs: [1, 2, 3]
        });
        getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters);
        setTimeout(() => {
            try {
                var getFeaturesResult = getFeatureEventArgsSystem.result;
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(getFeaturesResult).not.toBeNull();
                expect(getFeaturesResult.newResourceID).not.toBeNull();
                expect(getFeaturesResult.newResourceLocation).not.toBeNull();
                getFeaturesByIDsService.destroy();
                expect(getFeaturesByIDsService.EVENT_TYPES).toBeNull();
                expect(getFeaturesByIDsService.events).toBeNull();
                expect(getFeaturesByIDsService.eventListeners).toBeNull();
                expect(getFeaturesByIDsService.returnContent).toBeNull();
                getFeaturesByIDsParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetFeaturesByIDsService_" + exception.name + ":" + exception.message);
                getFeaturesByIDsService.destroy();
                getFeaturesByIDsParameters.destroy();
                done();
            }
        }, 2000);
    });

    it('processAsync_returnContent:true', (done) => {
        var getFeaturesByIDsService = initGetFeaturesByIDsService();
        var getFeaturesByIDsParameters = new GetFeaturesByIDsParameters({
            returnContent: true,
            datasetNames: ["World:Capitals"],
            fromIndex: 0,
            toIndex: -1,
            IDs: [1, 2, 3]
        });
        getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters);
        setTimeout(() => {
            try {
                var getFeaturesResult = getFeatureEventArgsSystem.result.features;
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(getFeaturesResult).not.toBeNull();
                expect(getFeaturesResult.type).toBe("FeatureCollection");
                expect(getFeaturesResult.features).not.toBeNull();
                expect(getFeaturesResult.features[0].type).toBe("Feature");
                getFeaturesByIDsService.destroy();
                getFeaturesByIDsParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetFeaturesByIDsService_" + exception.name + ":" + exception.message);
                getFeaturesByIDsService.destroy();
                getFeaturesByIDsParameters.destroy();
                done();
            }
        }, 2000)
    });

    //测试没有传入参数时的情况
    it('processAsync_noParams', (done) => {
        var getFeaturesByIDsService = initGetFeaturesByIDsService();
        var getFeaturesByIDsParameters = new GetFeaturesByIDsParameters({
            IDs: []
        });
        getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters);
        setTimeout(() => {
            try {
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(serviceFailedEventArgsSystem.result).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                getFeaturesByIDsService.destroy();
                getFeaturesByIDsParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetFeaturesByIDsService_" + exception.name + ":" + exception.message);
                getFeaturesByIDsService.destroy();
                getFeaturesByIDsParameters.destroy();
                done();
            }
        }, 2000)
    });

    //查询目标图层不存在情况
    it('processAsync_LayerNotExist', (done) => {
        var getFeaturesByIDsService = initGetFeaturesByIDsService();
        var getFeaturesByIDsParameters = new GetFeaturesByIDsParameters({
            returnContent: false,
            datasetNames: ["World:CapitalsNotExsit"],
            fromIndex: 0,
            toIndex: -1,
            IDs: [1, 2, 3]
        });
        getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters);
        setTimeout(() => {
            try {
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(serviceFailedEventArgsSystem.result).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                getFeaturesByIDsService.destroy();
                getFeaturesByIDsParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetFeaturesByIDsService_" + exception.name + ":" + exception.message);
                getFeaturesByIDsService.destroy();
                getFeaturesByIDsParameters.destroy();
                done();
            }
        }, 2000)
    })
});

