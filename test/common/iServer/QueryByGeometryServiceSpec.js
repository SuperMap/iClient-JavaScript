import {QueryByGeometryService} from '../../../src/common/iServer/QueryByGeometryService';
import {QueryByGeometryParameters} from '../../../src/common/iServer/QueryByGeometryParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {Polygon} from '../../../src/common/commontypes/geometry/Polygon';
import {LinearRing} from '../../../src/common/commontypes/geometry/LinearRing';
import {GeometryType} from '../../../src/common/REST';
import {QueryOption} from '../../../src/common/REST';
import {SpatialQueryMode} from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var serviceFailedEventArgsSystem = null, serviceCompletedEventArgsSystem = null;
var initQueryByGeometryService = (url) => {
    return new QueryByGeometryService(url);
};
describe('QueryByGeometryService', () => {
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
        var queryByGeometryService = new QueryByGeometryService(GlobeParameter.mapServiceURL + "World Map", { headers: myHeaders });
        expect(queryByGeometryService).not.toBeNull();
        expect(queryByGeometryService.headers).not.toBeNull();
        queryByGeometryService.destroy();
    });
    
    it('crossOrigin', () => {
        var queryByGeometryService = new QueryByGeometryService(GlobeParameter.mapServiceURL + "World Map", { crossOrigin: false });
        expect(queryByGeometryService).not.toBeNull();
        expect(queryByGeometryService.crossOrigin).toBeFalsy();
        queryByGeometryService.destroy();
    });

    it('constructor, destroy', () => {
        var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
        var queryByGeometryService = initQueryByGeometryService(worldMapURL);
        expect(queryByGeometryService).not.toBeNull();
        expect(queryByGeometryService.url).toEqual(worldMapURL + "/queryResults");
        expect(queryByGeometryService).not.toBeNull();
        expect(queryByGeometryService.url).toEqual(worldMapURL + "/queryResults");
        queryByGeometryService.destroy();
        expect(queryByGeometryService.returnContent).toBeNull();
    });

    it('processAsync_returnContent:false', (done) => {
        var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
        var QueryByGeometryServiceFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var QueryByGeometryServiceCompleted = (serviceCompletedEventArgs) => {
            serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
            try {
                var queryResult = serviceCompletedEventArgsSystem.result;
                expect(queryResult).not.toBeNull();
                expect(queryResult.succeed).toBeTruthy();
                expect(queryResult.newResourceLocation).not.toBeNull();
                expect(queryResult.newResourceLocation.length).toBeGreaterThan(0);
                expect(queryResult.newResourceID).not.toBeNull();
                queryByGeometryService.destroy();
                queryByGeometryParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByGeometryService_" + exception.name + ":" + exception.message);
                queryByGeometryService.destroy();
                queryByGeometryParameters.destroy();
                done();
            }
        };
        var queryByGeometryService = initQueryByGeometryService(worldMapURL);
        var points = [new Point(-90, -45),
            new Point(90, -45),
            new Point(90, 45),
            new Point(-90, 45),
            new Point(-90, -45)];
        var geometry = new Polygon(new LinearRing(points));
        var queryByGeometryParameters = new QueryByGeometryParameters({
            customParams: null,
            expectCount: 3,
            startRecord: 1,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTEANDGEOMETRY,
            spatialQueryMode: SpatialQueryMode.INTERSECT,
            queryParams: new Array(new FilterParameter({
                attributeFilter: "SmID<20",
                name: "Capitals@World"
            })),
            returnContent: false,
            geometry: geometry
        });
        queryByGeometryParameters.startRecord = 0;
        queryByGeometryParameters.holdTime = 10;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryParameters.queryParams[0].attributeFilter).toBe("SmID%26lt;20");
            expect(paramsObj.queryParameters.expectCount).toEqual(3);
            expect(paramsObj.queryParameters.customParams).toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"f701028a2b7144b19b582f55c1902b18_86887442ecde4880b55f40812fd898b6","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World Map/queryResults/f701028a2b7144b19b582f55c1902b18_86887442ecde4880b55f40812fd898b6.json"}`));
        });
        queryByGeometryService.processAsync(queryByGeometryParameters, QueryByGeometryServiceCompleted);
    });

    it('processAsync_returnContent:true', (done) => {
        var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
        var QueryByGeometryServiceFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var QueryByGeometryServiceCompleted = (serviceCompletedEventArgs) => {
            serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
            try {
                var queryResult = serviceCompletedEventArgsSystem.result.recordsets[0].features;
                expect(queryResult).not.toBeNull();
                expect(queryResult.type).toBe("FeatureCollection");
                expect(queryResult.features.length).toEqual(1);
                queryByGeometryService.destroy();
                queryByGeometryParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByGeometryService_" + exception.name + ":" + exception.message);
                queryByGeometryService.destroy();
                queryByGeometryParameters.destroy();
                done();
            }
        };
        var queryByGeometryService = initQueryByGeometryService(worldMapURL);
        var points = [
            new Point(-90, -45),
            new Point(90, -45),
            new Point(90, 45),
            new Point(-90, 45),
            new Point(-90, -45)
        ];
        var geometry = new Polygon(new LinearRing(points));
        var queryByGeometryParameters = new QueryByGeometryParameters({
            customParams: null,
            expectCount: 10,
            startRecord: 1,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTEANDGEOMETRY,
            spatialQueryMode: SpatialQueryMode.INTERSECT,
            queryParams: new Array(new FilterParameter({
                attributeFilter: "SmID<20",
                name: "Capitals@World"
            })),
            returnContent: true,
            geometry: geometry
        });
        queryByGeometryParameters.startRecord = 0;
        queryByGeometryParameters.holdTime = 10;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryParameters.queryParams[0].attributeFilter).toBe("SmID%26lt;20");
            expect(paramsObj.queryParameters.expectCount).toEqual(10);
            expect(paramsObj.queryParameters.customParams).toBeNull();
            return Promise.resolve(new Response(JSON.stringify(queryResultJson)));
        });
        queryByGeometryService.processAsync(queryByGeometryParameters, QueryByGeometryServiceCompleted);
    });

    //查询参数为空
    it('fail:processAsync', (done) => {
        var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
        var QueryByGeometryServiceFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                queryByGeometryService.destroy();
                queryByGeometryParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("QueryByGeometryService_" + exception.name + ":" + exception.message);
                queryByGeometryService.destroy();
                queryByGeometryParameters.destroy();
                done();
            }
        };
        var QueryByGeometryServiceCompleted = (serviceCompletedEventArgs) => {
            serviceCompletedEventArgsSystem = serviceCompletedEventArgs;
        };
        var queryByGeometryService = initQueryByGeometryService(worldMapURL);
        var queryByGeometryParameters = new QueryByGeometryParameters({
            customParams: null,
            expectCount: 100,
            networkType: GeometryType.POINT,
            queryOption: QueryOption.ATTRIBUTE,
            spatialQueryMode: SpatialQueryMode.OVERLAP,
            queryParams: new Array(),
            geometry: new Point(-50, -20)
        });
        queryByGeometryParameters.startRecord = 0;
        queryByGeometryParameters.holdTime = 10;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryParameters.expectCount).toEqual(100);
            expect(paramsObj.queryParameters.customParams).toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数 queryParameters 非法，queryParameters.queryParams 不能为空。"}}`));
        });
        queryByGeometryService.processAsync(queryByGeometryParameters, QueryByGeometryServiceFailed);

    })
});



