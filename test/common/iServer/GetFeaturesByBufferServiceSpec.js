﻿import {GetFeaturesByBufferService} from '../../../src/common/iServer/GetFeaturesByBufferService';
import {GetFeaturesByBufferParameters} from '../../../src/common/iServer/GetFeaturesByBufferParameters';
import {Point} from '../../../src/common/commontypes/geometry/Point';

var dataServiceURL = GlobeParameter.dataServiceURL;
var serviceFailedEventArgsSystem = null;
var getFeaturesEventArgsSystem = null;
var initGetFeaturesByBufferService = () => {
    return new GetFeaturesByBufferService(dataServiceURL, options);
};
var getFeaturesByBufferFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var getFeaturesByBufferCompleted = (getFeaturesEventArgs) => {
    getFeaturesEventArgsSystem = getFeaturesEventArgs;
};
var options = {
    eventListeners: {
        processCompleted: getFeaturesByBufferCompleted,
        processFailed: getFeaturesByBufferFailed
    }
};

describe('GetFeaturesByBufferService', () => {
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
        var geometry = new Point(7.25, 18.75);
        var getFeaturesByBufferParameters = new GetFeaturesByBufferParameters({
            datasetNames: ["World:Capitals"],
            bufferDistance: 30,
            attributeFilter: "SMID>0",
            geometry: geometry,
            returnContent: false
        });
        var getFeaturesByBufferService = initGetFeaturesByBufferService();
        getFeaturesByBufferService.processAsync(getFeaturesByBufferParameters);
        setTimeout(() => {
            try {
                var getFeaturesResult = getFeaturesEventArgsSystem.result;
                expect(getFeaturesByBufferService).not.toBeNull();
                expect(getFeaturesResult).not.toBeNull();
                expect(getFeaturesResult.newResourceID).not.toBeNull();
                expect(getFeaturesResult.newResourceLocation).not.toBeNull();
                getFeaturesByBufferService.destroy();
                expect(getFeaturesByBufferService.EVENT_TYPES).toBeNull();
                expect(getFeaturesByBufferService.events).toBeNull();
                expect(getFeaturesByBufferService.eventListeners).toBeNull();
                expect(getFeaturesByBufferService.returnContent).toBeNull();
                expect(getFeaturesByBufferService.fromIndex).toBeNull();
                expect(getFeaturesByBufferService.toIndex).toBeNull();
                getFeaturesByBufferParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetFeaturesByBufferService_" + exception.name + ":" + exception.message);
                getFeaturesByBufferService.destroy();
                getFeaturesByBufferParameters.destroy();
                done();
            }
        }, 2000);
    });

    //直接返回查询结果
    it('processAsync_returnContent:true', (done) => {
        var geometry = new Point(7.25, 18.75);
        var getFeaturesByBufferParameters = new GetFeaturesByBufferParameters({
            datasetNames: ["World:Capitals"],
            bufferDistance: 30,
            attributeFilter: "SMID>0",
            geometry: geometry,
            fromIndex: 0,
            toIndex: 19,
            returnContent: true
        });
        var getFeaturesByBufferService = initGetFeaturesByBufferService();
        getFeaturesByBufferService.processAsync(getFeaturesByBufferParameters);
        setTimeout(() => {
            try {
                var getFeaturesResult = getFeaturesEventArgsSystem.result.features;
                expect(getFeaturesByBufferService).not.toBeNull();
                expect(getFeaturesResult).not.toBeNull();
                //返回结果中featureCount一直表示总的结果数，实际返回数目通过features数据个数来判断
                // equal(getFeaturesResult.featureCount,20,"getFeaturesResult.featureCount");
                //equal(getFeaturesResult.features.length, 20, "getFeaturesByBufferService.features.length");
                expect(getFeaturesResult.type).toBe("FeatureCollection");
                expect(getFeaturesResult.features).not.toBeNull();
                expect(getFeaturesResult.features[0].type).toBe("Feature");
                getFeaturesByBufferService.destroy();
                expect(getFeaturesByBufferService.EVENT_TYPES).toBeNull();
                expect(getFeaturesByBufferService.events).toBeNull();
                expect(getFeaturesByBufferService.eventListeners).toBeNull();
                expect(getFeaturesByBufferService.returnContent).toBeNull();
                expect(getFeaturesByBufferService.fromIndex).toBeNull();
                expect(getFeaturesByBufferService.toIndex).toBeNull();
                getFeaturesByBufferParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetFeaturesByBufferService_" + exception.name + ":" + exception.message);
                getFeaturesByBufferService.destroy();
                getFeaturesByBufferParameters.destroy();
                done();
            }
        }, 2000);
    });

    //测试没有传入参数时的情况
    it('processAsync_noParams', (done) => {
        var getFeaturesByBufferParameters = new GetFeaturesByBufferParameters({
            datasetNames: ["World:Capitals"],
            bufferDistance: 30,
            attributeFilter: "SMID>0",
            //geometry:new Point(7.25,18.75)，
            fields: ["SMID"],
            fromIndex: 0,
            toIndex: 19,
            returnContent: true
        });
        var getFeaturesByBufferService = initGetFeaturesByBufferService();
        getFeaturesByBufferService.processAsync(getFeaturesByBufferParameters);
        setTimeout(() => {
            try {
                expect(getFeaturesByBufferService).not.toBeNull();
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                getFeaturesByBufferService.destroy();
                getFeaturesByBufferParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetFeaturesByBufferService_" + exception.name + ":" + exception.message);
                getFeaturesByBufferService.destroy();
                getFeaturesByBufferParameters.destroy();
                done();
            }
        }, 2000);
    });

    //测试目标图层不存在
    it('processAsync_LayerNotExist', (done) => {
        var geometry = new Point(7.25, 18.75);
        var getFeaturesByBufferParameters = new GetFeaturesByBufferParameters({
            datasetNames: ["World:Capitalss"],
            bufferDistance: 30,
            attributeFilter: "SMID>0",
            geometry: geometry,
            fromIndex: 0,
            toIndex: 19,
            returnContent: true
        });
        var getFeaturesByBufferService = initGetFeaturesByBufferService();
        getFeaturesByBufferService.processAsync(getFeaturesByBufferParameters);
        setTimeout(() => {
            try {
                expect(getFeaturesByBufferService).not.toBeNull();
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                // expect(serviceFailedEventArgsSystem.error.errorMsg).toEqual("getFeatureByBuffer方法中传入的参数为空");
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                getFeaturesByBufferService.destroy();
                getFeaturesByBufferParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetFeaturesByBufferService_" + exception.name + ":" + exception.message);
                getFeaturesByBufferService.destroy();
                getFeaturesByBufferParameters.destroy();
                done();
            }
        }, 2000);
    });
});
