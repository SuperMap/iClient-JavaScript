import {QueryByBoundsService} from '../../../src/common/iServer/QueryByBoundsService';
import {QueryByBoundsParameters} from '../../../src/common/iServer/QueryByBoundsParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {Bounds} from '../../../src/common/commontypes/Bounds';
import {GeometryType} from '../../../src/common/REST';
import {QueryOption} from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var serviceFailedEventArgsSystem = null, serviceCompletedEventArgsSystem = null;
var initQueryByBoundsService = (url) => {
    return new QueryByBoundsService(url);
};
describe('QueryByBoundsService_processAsync', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceFailedEventArgsSystem = null;
        serviceCompletedEventArgsSystem = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('headers', () => {
      let myHeaders = new Headers();
      var queryByBoundsService = new QueryByBoundsService(GlobeParameter.mapServiceURL + "World Map", { headers: myHeaders });
      expect(queryByBoundsService).not.toBeNull();
      expect(queryByBoundsService.headers).not.toBeNull();
      queryByBoundsService.destroy();
    });
    
    it('crossOrigin', () => {
        var queryByBoundsService = new QueryByBoundsService(GlobeParameter.mapServiceURL + "World Map", { crossOrigin: false });
        expect(queryByBoundsService).not.toBeNull();
        expect(queryByBoundsService.crossOrigin).toBeFalsy();
        queryByBoundsService.destroy();
    });

    it('constructor, destroy', () => {
        var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
        var queryByBoundsService = initQueryByBoundsService(worldMapURL);
        expect(queryByBoundsService).not.toBeNull();
        expect(queryByBoundsService.url).toEqual(worldMapURL + "/queryResults");
        queryByBoundsService.destroy();
        expect(queryByBoundsService.returnContent).toBeNull();
    });

    it('success:processAsync', (done) => {
        var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
        var QueryByBoundsFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var QueryByBoundsCompleted = (serviceCompletedEventArgs) => {
            serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
            try {
                var queryResult = serviceCompletedEventArgsSystem.result.recordsets[0].features;
                expect(queryResult).not.toBeNull();
                expect(queryResult.type).toBe("FeatureCollection");
                expect(queryResult.features.length).toEqual(1);
                queryByBoundsService.destroy();
                expect(queryByBoundsService.returnContent).toBeNull();
                queryByBoundsParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByBoundsService_" + exception.name + ":" + exception.message);
                queryByBoundsService.destroy();
                queryByBoundsParameters.destroy();
                done();
            }
        };
        var queryByBoundsService = initQueryByBoundsService(worldMapURL);
        var queryByBoundsParameters = new QueryByBoundsParameters({
            customParams: null,
            expectCount: 100,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams: new Array(new FilterParameter({
                attributeFilter: "SmID<21",
                name: "Countries@World",
            })),
            returnContent: true,
            bounds: new Bounds(0, 0, 100, 100)
        });
        queryByBoundsParameters.startRecord = 0;
        queryByBoundsParameters.holdTime = 10;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryMode).toBe("BoundsQuery");
            expect(paramsObj.queryParameters.queryParams[0].name).toBe("Countries@World");
            expect(paramsObj.queryParameters.queryParams[0].attributeFilter).toBe("SmID%26lt;21");
            return Promise.resolve(new Response(JSON.stringify(queryResultJson)));
        });
        queryByBoundsService.processAsync(queryByBoundsParameters, QueryByBoundsCompleted);
    });

    it('processAsync_customsResult', (done) => {
        var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
        var QueryByBoundsCompleted = (serviceCompletedEventArgs) => {
            serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
            try {
                var queryResult = serviceCompletedEventArgsSystem.result;
                expect(queryResult).not.toBeNull();
                expect(queryResult.succeed).toBeTruthy();
                expect(queryResult.newResourceLocation).not.toBeNull();
                expect(queryResult.newResourceLocation.length).toBeGreaterThan(0);
                expect(queryResult.newResourceID).not.toBeNull();
                expect(queryResult.customResult).not.toBeNull();
                expect(queryResult.customResult.bottom).toEqual(0.32300103608403674);
                expect(queryResult.customResult.left).toEqual(1.2015454003744992);
                queryByBoundsService.destroy();
                queryByBoundsParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByBoundsService_" + exception.name + ":" + exception.message);
                queryByBoundsService.destroy();
                queryByBoundsParameters.destroy();
                done();
            }
        };
        var queryByBoundsService = initQueryByBoundsService(worldMapURL);
        var queryByBoundsParameters = new QueryByBoundsParameters({
            customParams: null,
            expectCount: 100,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams: new Array(new FilterParameter({
                attributeFilter: "SmID<3",
                name: "Countries@World",
            })),
            returnContent: false,
            bounds: new Bounds(0, 0, 100, 100)
        });
        queryByBoundsParameters.startRecord = 0;
        queryByBoundsParameters.holdTime = 10;
        queryByBoundsParameters.returnCustomResult = true;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults?returnCustomResult=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryMode).toBe("BoundsQuery");
            expect(paramsObj.queryParameters.queryParams[0].name).toBe("Countries@World");
            expect(paramsObj.queryParameters.queryParams[0].attributeFilter).toBe("SmID%26lt;3");
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_74e108f826bb45e2be52a31c6d448486","succeed":true,"customResult":{"top":37.95041694606847,"left":1.2015454003744992,"bottom":0.32300103608403674,"leftBottom":{"x":1.2015454003744992,"y":0.32300103608403674},"right":58.588002445423115,"rightTop":{"x":58.588002445423115,"y":37.95041694606847}},"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World Map/queryResults/c01d29d8d41743adb673cd1cecda6ed0_74e108f826bb45e2be52a31c6d448486.json"}`));
        });
        queryByBoundsService.processAsync(queryByBoundsParameters, QueryByBoundsCompleted);
    });

    //查询参数为空
    it('fail:processAsync', (done) => {
        var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
        var QueryByBoundsFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                queryByBoundsService.destroy();
                queryByBoundsParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByBoundsService_" + exception.name + ":" + exception.message);
                queryByBoundsService.destroy();
                queryByBoundsParameters.destroy();
                done();
            }
        };
        var QueryByBoundsCompleted = (serviceCompletedEventArgs) => {
            serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
        };
        var queryByBoundsService = initQueryByBoundsService(worldMapURL);
        var queryByBoundsParameters = new QueryByBoundsParameters({
            customParams: null,
            expectCount: 100,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTE,
            queryParams: new Array(),
            bounds: new Bounds(0, 0, 100, 100)
        });
        queryByBoundsParameters.startRecord = 0;
        queryByBoundsParameters.holdTime = 10;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryMode).toBe("BoundsQuery");
            expect(paramsObj.queryParameters.expectCount).toEqual(100);
            expect(paramsObj.queryParameters.networkType).toBe("POINT");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数 queryParameters 非法，queryParameters.queryParams 不能为空。"}}`));
        });
        queryByBoundsService.processAsync(queryByBoundsParameters, QueryByBoundsFailed);
    })
});

