import { queryService } from '../../../src/leaflet/services/QueryService';
import { QueryByDistanceParameters } from '../../../src/common/iServer/QueryByDistanceParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
var options = {

};

describe('leaflet_QueryService_queryByDistance', () => {
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

    it('successEvent:queryByDistance_returnContent=true', (done) => {
        var circleMarker = L.circleMarker([30, 104]);
        var queryByDistanceParams = new QueryByDistanceParameters({
            queryParams: { name: "Capitals@World" },
            distance: 10,
            geometry: circleMarker
        });
        var queryByDistanceService = queryService(worldMapURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryMode).toBe("DistanceQuery");
            expect(paramsObj.distance).toBe(10);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(queryResultJson)));
        });
        queryByDistanceService.queryByDistance(queryByDistanceParams, (result) => {
            serviceResult = result;

            try {
                expect(queryByDistanceService).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeTruthy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.customResponse).toBeNull();
                expect(serviceResult.result.currentCount).toBeGreaterThan(0);
                expect(serviceResult.result.totalCount).toBeGreaterThan(0);
                expect(serviceResult.result.recordsets.length).toBeGreaterThan(0);
                expect(serviceResult.result.recordsets[0].datasetName).toBe("Capitals@World");
                expect(serviceResult.result.recordsets[0].fieldCaptions.length).toEqual(2);
                expect(serviceResult.result.recordsets[0].fieldTypes.length).toEqual(2);
                expect(serviceResult.result.recordsets[0].features.type).toBe("FeatureCollection");
                expect(serviceResult.result.recordsets[0].features.features.length).toBeGreaterThan(0);
                for (var i = 0; i < serviceResult.result.recordsets[0].features.features.length; i++) {
                    expect(serviceResult.result.recordsets[0].features.features[i].type).toBe("Feature");
                    expect(serviceResult.result.recordsets[0].features.features[i].geometry.type).toBe("Point");
                    expect(serviceResult.result.recordsets[0].features.features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(serviceResult.result.recordsets[0].features.features[0].properties).toEqual(Object({
                    CAPITAL: "拉巴斯",
                    SmID: "59"
                }));
                queryByDistanceService.destroy();
                done();
            } catch (exception) {
                console.log("leaflet_queryByDistance_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
                queryByDistanceService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('successEvent:queryByDistance_returnContent=false', (done) => {
        var circleMarker = L.circleMarker([30, 104]);
        var queryByDistanceParams = new QueryByDistanceParameters({
            queryParams: { name: "Capitals@World" },
            distance: 10,
            geometry: circleMarker,
            returnContent: false
        });
        var queryByDistanceService = queryService(worldMapURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryMode).toBe("DistanceQuery");
            expect(paramsObj.distance).toBe(10);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_3bd769669d614da2ac450c593b18e63a","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World Map/queryResults/c01d29d8d41743adb673cd1cecda6ed0_3bd769669d614da2ac450c593b18e63a.json"}`));
        });
        queryByDistanceService.queryByDistance(queryByDistanceParams, (result) => {
            serviceResult = result;

            try {
                expect(queryByDistanceService).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeTruthy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                queryByDistanceService.destroy();
                done();
            } catch (exception) {
                console.log("leaflet_queryByDistance_'successEvent:returnContent=false'案例失败：" + exception.name + ":" + exception.message);
                queryByDistanceService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('failEvent:queryByDistance_layerNotExist', (done) => {
        var circleMarker = L.circleMarker([30, 104]);
        var queryByDistanceParams = new QueryByDistanceParameters({
            queryParams: { name: "Capitals@World1" },
            distance: 10,
            geometry: circleMarker
        });
        var queryByDistanceService = queryService(worldMapURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults?returnContent=true");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"查询目标图层不存在。(Capitals@World1)"}}`));
        });
        queryByDistanceService.queryByDistance(queryByDistanceParams, (result) => {
            serviceResult = result;

            setTimeout(() => {
                try {
                    expect(queryByDistanceService).not.toBeNull();
                    expect(serviceResult.type).toBe("processFailed");
                    expect(serviceResult.object.isInTheSameDomain).toBeTruthy();
                    expect(serviceResult.error).not.toBeNull();
                    expect(serviceResult.error.code).toEqual(400);
                    expect(serviceResult.error.errorMsg).toBe("查询目标图层不存在。(Capitals@World1)");
                    queryByDistanceService.destroy();
                    done();
                } catch (exception) {
                    console.log("leaflet_queryByDistance_'failEvent:layerNotExist'案例失败：" + exception.name + ":" + exception.message);
                    queryByDistanceService.destroy();
                    expect(false).toBeTruthy();
                    done();
                }
            });
        });
    });

        it('failEvent:queryByDistance_queryParamsNull', (done) => {
            var circleMarker = L.circleMarker([30, 104]);
            var queryByDistanceParams = new QueryByDistanceParameters({
                queryParams: null,
                distance: 10,
                geometry: circleMarker
            });
            var queryByDistanceService = queryService(worldMapURL, options);
            spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
                expect(method).toBe("POST");
                return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数queryParameterSet.queryParams非法，不能为空。"}}`));
            });
            queryByDistanceService.queryByDistance(queryByDistanceParams, (result) => {
                serviceResult = result;
                try {
                    expect(queryByDistanceService).not.toBeNull();
                    expect(serviceResult.type).toBe("processFailed");
                    expect(serviceResult.object.isInTheSameDomain).toBeTruthy();
                    expect(serviceResult.error).not.toBeNull();
                    expect(serviceResult.error.code).toEqual(400);
                    expect(serviceResult.error.errorMsg).toBe("参数queryParameterSet.queryParams非法，不能为空。");
                    queryByDistanceService.destroy();
                    done();
                } catch (exception) {
                    console.log("leaflet_queryByDistance_'failEvent:queryParamsNull'案例失败：" + exception.name + ":" + exception.message);
                    queryByDistanceService.destroy();
                    expect(false).toBeTruthy();
                    done();
                }
            })
        });
    });

