﻿import {GetFeaturesByGeometryService} from '../../../src/common/iServer/GetFeaturesByGeometryService';
import {GetFeaturesByGeometryParameters} from '../../../src/common/iServer/GetFeaturesByGeometryParameters';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {SpatialQueryMode} from '../../../src/common/REST';

var dataServiceURL = GlobeParameter.dataServiceURL;
var serviceFailedEventArgsSystem = null;
var getFeatureEventArgsSystem = null;
var initGetFeaturesByGeometryService = () => {
    return new GetFeaturesByGeometryService(dataServiceURL, options);
};
var getFeaturesByGeometryFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var getFeaturesByGeometryCompleted = (getFeaturesEventArgs) => {
    getFeatureEventArgsSystem = getFeaturesEventArgs;
};
var options = {
    eventListeners: {
        processCompleted: getFeaturesByGeometryCompleted,
        processFailed: getFeaturesByGeometryFailed
    }
};

describe('GetFeaturesByGeometryService', () => {
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
        var point = new Point(112, 36);
        var getFeaturesByGeometryParameters = new GetFeaturesByGeometryParameters({
            returnContent: false,
            datasetNames: ["World:Countries"],
            fields: ["SMID"],
            fromIndex: 0,
            toIndex: -1,
            spatialQueryMode: SpatialQueryMode.INTERSECT,
            geometry: point
        });
        var getFeaturesByGeometryService = initGetFeaturesByGeometryService();
        getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);
        setTimeout(() => {
            try {
                var getFeaturesResult = getFeatureEventArgsSystem.result;
                expect(getFeaturesByGeometryService).not.toBeNull();
                expect(getFeaturesResult).not.toBeNull();
                expect(getFeaturesResult.newResourceID).not.toBeNull();
                expect(getFeaturesResult.newResourceLocation).not.toBeNull();
                getFeaturesByGeometryService.destroy();
                expect(getFeaturesByGeometryService.EVENT_TYPES).toBeNull();
                expect(getFeaturesByGeometryService.events).toBeNull();
                expect(getFeaturesByGeometryService.eventListeners).toBeNull();
                expect(getFeaturesByGeometryService.returnContent).toBeNull();
                getFeaturesByGeometryParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetFeaturesByGeometryService_" + exception.name + ":" + exception.message);
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            }
        }, 4000);
    });

    //直接返回结果情况
    it('processAsync_returnContent:true', (done) => {
        var getFeaturesByGeometryService = initGetFeaturesByGeometryService();
        var point = new Point(112, 36);
        var getFeaturesByGeometryParameters = new GetFeaturesByGeometryParameters({
            datasetNames: ["World:Countries"],
            toIndex: -1,
            spatialQueryMode: SpatialQueryMode.INTERSECT,
            geometry: point
        });
        getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);
        setTimeout(() => {
            try {
                var getFeaturesResult = getFeatureEventArgsSystem.result.features;
                expect(getFeaturesByGeometryService).not.toBeNull();
                expect(getFeaturesResult).not.toBeNull();
                expect(getFeaturesResult.type).toBe("FeatureCollection");
                expect(getFeaturesResult.features).not.toBeNull();
                expect(getFeaturesResult.features[0].type).toBe("Feature");
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetFeaturesByGeometryService_" + exception.name + ":" + exception.message);
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            }
        }, 4000);
    });

    //具有attributeFilter直接返回结果情况
    it('processAsync_returnContent_withAttributeFilter', (done) => {
        var getFeaturesByGeometryService = initGetFeaturesByGeometryService();
        var point = new Point(112, 36);
        var getFeaturesByGeometryParameters = new GetFeaturesByGeometryParameters({
            datasetNames: ["World:Countries"],
            toIndex: -1,
            attributeFilter: "SMID<100",
            spatialQueryMode: SpatialQueryMode.INTERSECT,
            geometry: point
        });
        getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);
        setTimeout(() => {
            try {
                var getFeaturesResult = getFeatureEventArgsSystem.result.features;
                expect(getFeaturesByGeometryService).not.toBeNull();
                expect(getFeaturesResult).not.toBeNull();
                expect(getFeaturesResult.type).toBe("FeatureCollection");
                expect(getFeaturesResult.features.length).toEqual(0);
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetFeaturesByGeometryService_" + exception.name + ":" + exception.message);
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            }
        }, 4000);
    });

    //测试没有传入参数时的情况
    it('processAsync_noParams', (done) => {
        var getFeaturesByGeometryParameters = new GetFeaturesByGeometryParameters({
            returnContent: false,
            datasetNames: ["World:Capitals"],
            toIndex: -1,
            spatialQueryMode: SpatialQueryMode.CONTAIN
        });
        var getFeaturesByGeometryService = initGetFeaturesByGeometryService();
        getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);
        setTimeout(() => {
            try {
                expect(getFeaturesByGeometryService).not.toBeNull();
                expect(serviceFailedEventArgsSystem.result).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetFeaturesByGeometryService_" + exception.name + ":" + exception.message);
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            }
        }, 4000);
    });

    //查询目标图层不存在情况
    it('processAsync_LayerNotExist', (done) => {
        var point = new Point(112, 36);
        var getFeaturesByGeometryParameters = new GetFeaturesByGeometryParameters({
            returnContent: false,
            datasetNames: ["World:CountriesNotExsit"],
            toIndex: -1,
            spatialQueryMode: SpatialQueryMode.INTERSECT,
            geometry: point
        });
        var getFeaturesByGeometryService = initGetFeaturesByGeometryService();
        getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);
        setTimeout(() => {
            try {
                expect(getFeaturesByGeometryService).not.toBeNull();
                expect(serviceFailedEventArgsSystem.result).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetFeaturesByGeometryService_" + exception.name + ":" + exception.message);
                getFeaturesByGeometryService.destroy();
                getFeaturesByGeometryParameters.destroy();
                done();
            }
        }, 4000);
    });
});
