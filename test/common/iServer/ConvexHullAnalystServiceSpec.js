import {ConvexHullAnalystService} from '../../../src/common/iServer/ConvexHullAnalystService';
import {ConvexHullAnalystParameters} from '../../../src/common/iServer/ConvexHullAnalystParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';


var serviceFailedEventArgsSystem = null,analystEventArgsSystem = null;
var initConvexHullAnalystService = (url) => {
    return new ConvexHullAnalystService(url);
};

describe('ConvexHullAnalystService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('headers', () => {
        let myHeaders = new Headers();
        var convexHullAnalystService = new ConvexHullAnalystService(GlobeParameter.spatialAnalystURL, { headers: myHeaders });
        expect(convexHullAnalystService).not.toBeNull();
        expect(convexHullAnalystService.headers).not.toBeNull();
        convexHullAnalystService.destroy();
    });
    
    it('crossOrigin', () => {
        var convexHullAnalystService = new ConvexHullAnalystService(GlobeParameter.spatialAnalystURL, { crossOrigin: false });
        expect(convexHullAnalystService).not.toBeNull();
        expect(convexHullAnalystService.crossOrigin).toBeFalsy();
        convexHullAnalystService.destroy();
    });

    //成功事件
    it('processAsync_success', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var analyzeFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var analyzeCompleted = (analyseEventArgs) => {
            analystEventArgsSystem = analyseEventArgs;
            try {
                var result = analystEventArgsSystem.result;
                expect(result).not.toBeNull();
                convexHullAnalystService.destroy();
                convexHullAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ConvexHullAnalystService" + exception.name + ":" + exception.message);
                convexHullAnalystService.destroy();
                convexHullAnalystParameters.destroy();
                done();
            }
        };
        var convexHullAnalystService = initConvexHullAnalystService(spatialAnalystURL);
        var convexHullAnalystParameters = new ConvexHullAnalystParameters({
            model:{
                "type":"GEOMODEL3D", 
                "modelUrl":"http://supermapiserver:8090/SampleData/AirPlane.s3m", 
                "position":{"x":120.2, "y":40.2, "z":10}
            }
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/geometry/3d/convexhull?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.model.type).toBe('GEOMODEL3D');
            return Promise.resolve(new Response(`{"streamBytes":null,"volume":0,"dataContent":null,"succeed":false,"position":null,"message":"can not download file."}`));
        });
        convexHullAnalystService.processAsync(convexHullAnalystParameters, analyzeCompleted);
    });

    //失败事件
    it('processAsync_fail', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var analyzeFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("用于叠加的Geometry数组中索引为0的元素错误。Geometry为null。");
                convexHullAnalystService.destroy();
                convexHullAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThiessenAnalystService_" + exception.name + ":" + exception.message);
                convexHullAnalystService.destroy();
                convexHullAnalystParameters.destroy();
                done();
            }
        };
        var analyzeCompleted = (analyseEventArgs) => {
            analystEventArgsSystem = analyseEventArgs;
        };
        var convexHullAnalystService = initConvexHullAnalystService(spatialAnalystURL);
        var convexHullAnalystParameters = new ConvexHullAnalystParameters({});
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/geometry/3d/convexhull?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.model).toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"用于叠加的Geometry数组中索引为0的元素错误。Geometry为null。"}}`));
        });
        convexHullAnalystService.processAsync(convexHullAnalystParameters, analyzeFailed);
    });

});