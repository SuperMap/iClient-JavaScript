import {GetFeaturesByGeometryService} from '../../../src/common/iServer/GetFeaturesByGeometryService';
import {GetFeaturesByGeometryParameters} from '../../../src/common/iServer/GetFeaturesByGeometryParameters';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {SpatialQueryMode} from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(dataServiceURL + "/featureResults.json?");
            expect(params).toContain("'spatialQueryMode':\"INTERSECT\"");
            expect(params).toContain("'datasetNames':[\"World:Countries\"]");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"f701028a2b7144b19b582f55c1902b18_c0db05f011374ee08849a46d9e968d3d","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/f701028a2b7144b19b582f55c1902b18_c0db05f011374ee08849a46d9e968d3d.json"}`));
        });
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(dataServiceURL + "/featureResults.json?returnContent=true");
            expect(params).toContain("'spatialQueryMode':\"INTERSECT\"");
            expect(params).toContain("'datasetNames':[\"World:Countries\"]");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(dataServiceURL + "/featureResults.json?returnContent=true");
            expect(params).toContain("'spatialQueryMode':\"INTERSECT\"");
            expect(params).toContain("'datasetNames':[\"World:Countries\"]");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"features":[],"featureUriList":[],"totalCount":0,"featureCount":0}`));
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(dataServiceURL + "/featureResults.json?");
            expect(params).toContain("'spatialQueryMode':\"CONTAIN\"");
            expect(params).toContain("'datasetNames':[\"World:Capitals\"]");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"getFeatureByBuffer方法中传入的参数为空"}}`));
        });
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(dataServiceURL + "/featureResults.json?");
            expect(params).toContain("'spatialQueryMode':\"INTERSECT\"");
            expect(params).toContain("'datasetNames':[\"World:CountriesNotExsit\"]");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"getFeature方法中数据集名CountriesNotExsit不存在"}}`));
        });
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
