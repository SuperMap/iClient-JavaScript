import { queryService } from '../../../src/leaflet/services/QueryService';
import { QueryByGeometryParameters } from '../../../src/common/iServer/QueryByGeometryParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
var options = {
    serverType: 'iServer'
};

describe('leaflet_QueryService_queryByGeometry', () => {
    var serviceResult;
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('successEvent:queryByGeometry_returnContent=true', (done) => {
        var polygon = L.polygon([[0, 20], [-30, 20], [-10, 50], [0, 20]]);
        var queryByGeometryParams = new QueryByGeometryParameters({
            customParams: null,
            expectCount: 5,
            startRecord: 1,
            queryParams: { name: "Capitals@World" },
            geometry: polygon
        });
        var queryByGeometryService = queryService(worldMapURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryMode).toBe("SpatialQuery");
            expect(paramsObj.queryParameters.startRecord).toBe(1);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(queryResultJson)));
        });
        queryByGeometryService.queryByGeometry(queryByGeometryParams, (serviceResult) => {
            try {
                expect(queryByGeometryService).not.toBeNull();
                expect(queryByGeometryService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.customResponse).toBeNull();
                expect(serviceResult.result.currentCount).toEqual(1);
                expect(serviceResult.result.totalCount).toEqual(1);
                expect(serviceResult.result.recordsets.length).toBeGreaterThan(0);
                expect(serviceResult.result.recordsets[0].datasetName).toBe("Capitals@World");
                expect(serviceResult.result.recordsets[0].fieldCaptions.length).toEqual(2);
                expect(serviceResult.result.recordsets[0].fieldTypes.length).toEqual(2);
                expect(serviceResult.result.recordsets[0].features.type).toBe("FeatureCollection");
                expect(serviceResult.result.recordsets[0].features.features.length).toEqual(1);
                for (var i = 0; i < serviceResult.result.recordsets[0].features.features.length; i++) {
                    expect(serviceResult.result.recordsets[0].features.features[i].type).toBe("Feature");
                    expect(serviceResult.result.recordsets[0].features.features[i].geometry.type).toBe("Point");
                    expect(serviceResult.result.recordsets[0].features.features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(serviceResult.result.recordsets[0].features.features[0].properties).toEqual(Object({
                    CAPITAL: "拉巴斯",
                    SmID: "59"
                }));
                queryByGeometryService.destroy();
                done();
            } catch (exception) {
                console.log("leaflet_queryByGeometry_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
                queryByGeometryService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('successEvent:queryByGeometry_returnContent=false', (done) => {
        var polygon = L.polygon([[0, 20], [-30, 20], [-10, 50], [0, 20]]);
        var queryByGeometryParams = new QueryByGeometryParameters({
            customParams: null,
            expectCount: 10,
            startRecord: 1,
            queryParams: { name: "Capitals@World" },
            geometry: polygon,
            returnContent: false
        });
        var queryByGeometryService = queryService(worldMapURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryParameters.expectCount).toBe(10);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_3bd769669d614da2ac450c593b18e63a","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World Map/queryResults/c01d29d8d41743adb673cd1cecda6ed0_3bd769669d614da2ac450c593b18e63a.json"}`));
        });
        queryByGeometryService.queryByGeometry(queryByGeometryParams, (serviceResult) => {
             try {
                expect(queryByGeometryService).not.toBeNull();
                expect(queryByGeometryService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                queryByGeometryService.destroy();
                done();
            } catch (exception) {
                console.log("leaflet_queryByGeometry_'successEvent:returnContent=false'案例失败：" + exception.name + ":" + exception.message);
                queryByGeometryService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    it('failEvent:queryByGeometry_layerNotExist', (done) => {
        var polygon = L.polygon([[0, 20], [-30, 20], [-10, 50], [0, 20]]);
        var queryByGeometryParams = new QueryByGeometryParameters({
            queryParams: { name: "Capitals@World1" },
            geometry: polygon
        });
        var queryByGeometryService = queryService(worldMapURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method) => {
            expect(method).toBe("POST");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"查询目标图层不存在。(Capitals@World1)"}}`));
        });
        queryByGeometryService.queryByGeometry(queryByGeometryParams, (serviceResult) => {
            try {
                expect(queryByGeometryService).not.toBeNull();
                expect(queryByGeometryService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("查询目标图层不存在。(Capitals@World1)");
                queryByGeometryService.destroy();
                done();
            } catch (exception) {
                console.log("leaflet_queryByGeometry_'failEvent:layerNotExist'案例失败：" + exception.name + ":" + exception.message);
                queryByGeometryService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    }); 
    it('failEvent:queryByGeometry_queryParamsNull', (done) => {
        var polygon = L.polygon([[0, 20], [-30, 20], [-10, 50], [0, 20]]);
        var queryByGeometryParams = new QueryByGeometryParameters({
            queryParams: null,
            geometry: polygon
        });
        var queryByGeometryService = queryService(worldMapURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe("POST");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数queryParameterSet.queryParams非法，不能为空。"}}`));
        });
        queryByGeometryService.queryByGeometry(queryByGeometryParams, (serviceResult) => {
            try {
                expect(queryByGeometryService).not.toBeNull();
                expect(queryByGeometryService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("参数queryParameterSet.queryParams非法，不能为空。");
                queryByGeometryService.destroy();
                done();
            } catch (exception) {
                console.log("leaflet_queryByGeometry_'failEvent:queryParamsNull'案例失败：" + exception.name + ":" + exception.message);
                queryByGeometryService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        })
    })
});


