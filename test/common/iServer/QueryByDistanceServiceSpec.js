import {QueryByDistanceService} from '../../../src/common/iServer/QueryByDistanceService';
import {QueryByDistanceParameters} from '../../../src/common/iServer/QueryByDistanceParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {GeometryType} from '../../../src/common/REST';
import {QueryOption} from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var serviceFailedEventArgsSystem = null, serviceCompletedEventArgsSystem = null;
var initQueryByDistanceService = (url) => {
    return new QueryByDistanceService(url);
};
describe('QueryByBoundsService', () => {
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
        var queryByDistanceService = new QueryByDistanceService(GlobeParameter.mapServiceURL + "World Map", { headers: myHeaders });
        expect(queryByDistanceService).not.toBeNull();
        expect(queryByDistanceService.headers).not.toBeNull();
        queryByDistanceService.destroy();
    });
    
    it('crossOrigin', () => {
        var queryByDistanceService = new QueryByDistanceService(GlobeParameter.mapServiceURL + "World Map", { crossOrigin: false });
        expect(queryByDistanceService).not.toBeNull();
        expect(queryByDistanceService.crossOrigin).toBeFalsy();
        queryByDistanceService.destroy();
    });

    it('constructor, destroy', () => {
        var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
        var queryByDistanceService = initQueryByDistanceService(worldMapURL);
        expect(queryByDistanceService).not.toBeNull();
        expect(queryByDistanceService.url).toEqual(worldMapURL + "/queryResults");
        queryByDistanceService.destroy();
        expect(queryByDistanceService.returnContent).toBeNull();
    });

    it('processAsync_returnContent:true', (done) => {
        var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
        var QueryByDistanceCompleted = (serviceCompletedEventArgs) => {
            serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
            try {
                var queryResult = serviceCompletedEventArgsSystem.result.recordsets[0].features;
                expect(queryResult).not.toBeNull();
                expect(queryResult.type).toBe("FeatureCollection");
                expect(queryResult.features.length).toEqual(1);
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByDistanceService_" + exception.name + ":" + exception.message);
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            }
        };
        var queryByDistanceService = initQueryByDistanceService(worldMapURL);
        expect(queryByDistanceService).not.toBeNull();
        expect(queryByDistanceService.url).toEqual(worldMapURL+"/queryResults");
        var queryByDistanceParameters = new QueryByDistanceParameters({
            customParams: null,
            startRecord: 1,
            queryOption: QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams: new Array(new FilterParameter({
                name: "Capitals@World"
            })),
            returnContent: true,
            distance: 20,
            geometry: new Point(-50, -10)
        });
        queryByDistanceParameters.holdTime = 10;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.distance).toEqual(20);
            expect(paramsObj.queryParameters.startRecord).toEqual(1);
            return Promise.resolve(new Response(JSON.stringify(queryResultJson)));
        });
        queryByDistanceService.processAsync(queryByDistanceParameters, QueryByDistanceCompleted);
    });

    it('processAsync_returnCotent:false', (done) => {
        var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
        var QueryByDistanceCompleted = (serviceCompletedEventArgs) => {
            serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
            try {
                var queryResult = serviceCompletedEventArgsSystem.result;
                expect(queryResult).not.toBeNull();
                expect(queryResult.newResourceLocation).not.toBeNull();
                expect(queryResult.newResourceLocation.length).toBeGreaterThan(0);
                expect(queryResult.newResourceID).not.toBeNull();
                expect(queryResult.succeed).toBeTruthy();
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByDistanceService_" + exception.name + ":" + exception.message);
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            }
        };
        var queryByDistanceService = initQueryByDistanceService(worldMapURL);
        expect(queryByDistanceService).not.toBeNull();
        expect(queryByDistanceService.url).toEqual(worldMapURL+"/queryResults");
        var queryByDistanceParameters = new QueryByDistanceParameters({
            customParams: null,
            expectCount: 100,
            queryOption: QueryOption.GEOMETRY,
            queryParams: new Array(new FilterParameter({
                name: "Capitals@World"
            })),
            returnContent: false,
            distance: 20,
            isNearest: true,
            geometry: new Point(-50, -10)
        });
        queryByDistanceParameters.startRecord = 0;
        queryByDistanceParameters.holdTime = 10;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.distance).toEqual(20);
            expect(paramsObj.queryParameters.expectCount).toEqual(100);
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"f701028a2b7144b19b582f55c1902b18_d96d9c6b2d4641cdbb5fc7867b956ecf","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World Map/queryResults/f701028a2b7144b19b582f55c1902b18_d96d9c6b2d4641cdbb5fc7867b956ecf.json"}`));
        });
        queryByDistanceService.processAsync(queryByDistanceParameters, QueryByDistanceCompleted);
    });

    it('fail:processAsync', (done) => {
        var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
        var serviceFailedEventArgsSystem;
        var QueryByDistanceFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByDistanceService_" + exception.name + ":" + exception.message);
                queryByDistanceService.destroy();
                queryByDistanceParameters.destroy();
                done();
            }
        };
        var queryByDistanceService = initQueryByDistanceService(worldMapURL);
        expect(queryByDistanceService).not.toBeNull();
        expect(queryByDistanceService.url).toEqual(worldMapURL+"/queryResults");
        var queryByDistanceParameters = new QueryByDistanceParameters({
            customParams: null,
            expectCount: 100,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTE,
            queryParams: new Array(),
            geometry: new Point(-50, -10),
            distance: 20,
            startRecord: 0,
            holdTime: 10
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.distance).toEqual(20);
            expect(paramsObj.queryParameters.expectCount).toEqual(100);
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数 queryParameters 非法，queryParameters.queryParams 不能为空。"}}`));
        });
        queryByDistanceService.processAsync(queryByDistanceParameters, QueryByDistanceFailed);
    });
});

