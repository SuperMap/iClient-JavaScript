import {QueryByDistanceService} from '../../../src/common/iServer/QueryByDistanceService';
import {QueryByDistanceParameters} from '../../../src/common/iServer/QueryByDistanceParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {GeometryType} from '../../../src/common/REST';
import {QueryOption} from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
var serviceFailedEventArgsSystem = null, serviceCompletedEventArgsSystem = null;
var QueryByDistanceFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var QueryByDistanceCompleted = (serviceCompletedEventArgs) => {
    serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
};
var initQueryByDistanceService = () => {
    return new QueryByDistanceService(worldMapURL);
};
var options = {
    eventListeners: {
        'processFailed': QueryByDistanceFailed,
        'processCompleted': QueryByDistanceCompleted
    }
};
//服务初始化时注册事件监听函数
var initQueryByDistanceService_RegisterListener = () => {
    return new QueryByDistanceService(worldMapURL, options);
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

    it('constructor, destroy', () => {
        var queryByDistanceService = initQueryByDistanceService();
        expect(queryByDistanceService).not.toBeNull();
        expect(queryByDistanceService.url).toEqual(worldMapURL + "/queryResults.json?");
        queryByDistanceService.destroy();
        expect(queryByDistanceService.EVENT_TYPES).toBeNull();
        expect(queryByDistanceService.events).toBeNull();
        expect(queryByDistanceService.returnContent).toBeNull();
    });

    it('processAsync_returnContent:true', (done) => {
        var queryByDistanceService = initQueryByDistanceService_RegisterListener();
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?returnContent=true");
            expect(params).not.toBeNull();
            expect(params).toContain("'queryMode':'DistanceQuery'");
            expect(params).toContain("'distance':20");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(queryResultJson)));
        });
        queryByDistanceService.processAsync(queryByDistanceParameters);
        setTimeout(() => {
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
        }, 2000);
    });

    it('processAsync_returnCotent:false', (done) => {
        var queryByDistanceService = initQueryByDistanceService_RegisterListener();
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?");
            expect(params).not.toBeNull();
            expect(params).toContain("'distance':20");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"f701028a2b7144b19b582f55c1902b18_d96d9c6b2d4641cdbb5fc7867b956ecf","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World Map/queryResults/f701028a2b7144b19b582f55c1902b18_d96d9c6b2d4641cdbb5fc7867b956ecf.json"}`));
        });
        queryByDistanceService.processAsync(queryByDistanceParameters);
        setTimeout(() => {
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
        }, 2000);
    });

    it('fail:processAsync', (done) => {
        var failedResult;
        var queryFailed = (e) => {
            failedResult = e;
        };
        var queryByDistanceService = initQueryByDistanceService_RegisterListener();
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?returnContent=true");
            expect(params).not.toBeNull();
            expect(params).toContain("'startRecord':0");
            expect(params).toContain("'distance':20");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数 queryParameters 非法，queryParameters.queryParams 不能为空。"}}`));
        });
        queryByDistanceService.events.on({'processFailed': queryFailed});
        queryByDistanceService.processAsync(queryByDistanceParameters);
        setTimeout(() => {
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(failedResult.error.code).toEqual(400);
                expect(failedResult.error.errorMsg).not.toBeNull();
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
        }, 2000);
    })
});

