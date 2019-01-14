import {GetFeaturesByBufferService} from '../../../src/common/iServer/GetFeaturesByBufferService';
import {GetFeaturesByBufferParameters} from '../../../src/common/iServer/GetFeaturesByBufferParameters';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var dataServiceURL = GlobeParameter.dataServiceURL;
var serviceFailedEventArgsSystem = null;
var getFeaturesEventArgsSystem = null;
var initGetFeaturesByBufferService = (getFeaturesByBufferCompleted,getFeaturesByBufferFailed) => {
    return new GetFeaturesByBufferService(dataServiceURL, {
        eventListeners: {
            processCompleted: getFeaturesByBufferCompleted,
            processFailed: getFeaturesByBufferFailed
        }
    });
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
        var getFeaturesByBufferFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var getFeaturesByBufferCompleted = (getFeaturesEventArgsSystem) => {
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
        };
 
        var getFeaturesByBufferService = initGetFeaturesByBufferService(getFeaturesByBufferCompleted,getFeaturesByBufferFailed);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(dataServiceURL + "/featureResults.json?");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.datasetNames[0]).toBe("World:Capitals");
            expect(paramsObj.attributeFilter).toBe("SMID%26gt;0");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"f701028a2b7144b19b582f55c1902b18_e87f7f6517184df480c54e43dbe283df","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/f701028a2b7144b19b582f55c1902b18_e87f7f6517184df480c54e43dbe283df.json"}`));
        });
        getFeaturesByBufferService.processAsync(getFeaturesByBufferParameters);
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
        var getFeaturesByBufferFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var getFeaturesByBufferCompleted = (getFeaturesEventArgsSystem) => {
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
        };
 
        var getFeaturesByBufferService = initGetFeaturesByBufferService(getFeaturesByBufferCompleted,getFeaturesByBufferFailed);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(dataServiceURL + "/featureResults.json?returnContent=true&fromIndex=0&toIndex=19");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.datasetNames[0]).toBe("World:Capitals");
            expect(paramsObj.attributeFilter).toBe("SMID%26gt;0");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesByBufferService.processAsync(getFeaturesByBufferParameters);
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
        var getFeaturesByBufferFailed = (serviceFailedEventArgsSystem) => {
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
        };
        var getFeaturesByBufferCompleted = (getFeaturesEventArgs) => {
            getFeaturesEventArgsSystem = getFeaturesEventArgs;
        };

        var getFeaturesByBufferService = initGetFeaturesByBufferService(getFeaturesByBufferCompleted,getFeaturesByBufferFailed);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(dataServiceURL + "/featureResults.json?returnContent=true&fromIndex=0&toIndex=19");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.datasetNames[0]).toBe("World:Capitals");
            expect(paramsObj.attributeFilter).toBe("SMID%26gt;0");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"getFeatureByBuffer方法中传入的参数为空"}}`));
        });
        getFeaturesByBufferService.processAsync(getFeaturesByBufferParameters);
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
        var getFeaturesByBufferFailed = (serviceFailedEventArgsSystem) => {
            try {
                expect(getFeaturesByBufferService).not.toBeNull();
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toEqual("getFeature方法中数据集名Capitalss不存在");
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
        };
        var getFeaturesByBufferCompleted = (getFeaturesEventArgs) => {
            getFeaturesEventArgsSystem = getFeaturesEventArgs;
        };

        var getFeaturesByBufferService = initGetFeaturesByBufferService(getFeaturesByBufferCompleted,getFeaturesByBufferFailed);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(dataServiceURL + "/featureResults.json?returnContent=true&fromIndex=0&toIndex=19");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.datasetNames[0]).toBe("World:Capitalss");
            expect(paramsObj.attributeFilter).toBe("SMID%26gt;0");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"getFeature方法中数据集名Capitalss不存在"}}`));
        });
        getFeaturesByBufferService.processAsync(getFeaturesByBufferParameters);
    });
});
