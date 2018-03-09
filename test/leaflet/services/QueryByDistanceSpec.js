import {queryService} from '../../../src/leaflet/services/QueryService';
import {QueryByDistanceParameters} from '../../../src/common/iServer/QueryByDistanceParameters';

var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
var options = {
    serverType: 'iServer'
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
            queryParams: {name: "Capitals@World"},
            distance: 10,
            geometry: circleMarker
        });
        var queryByDistanceService = queryService(worldMapURL, options);
        queryByDistanceService.queryByDistance(queryByDistanceParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(queryByDistanceService).not.toBeNull();
                expect(queryByDistanceService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.customResponse).toBeNull();
                expect(serviceResult.result.currentCount).toBeGreaterThan(0);
                expect(serviceResult.result.totalCount).toBeGreaterThan(0);
                expect(serviceResult.result.recordsets.length).toBeGreaterThan(0);
                expect(serviceResult.result.recordsets[0].datasetName).toBe("Capitals@World");
                expect(serviceResult.result.recordsets[0].fieldCaptions.length).toEqual(16);
                expect(serviceResult.result.recordsets[0].fieldTypes.length).toEqual(16);
                expect(serviceResult.result.recordsets[0].features.type).toBe("FeatureCollection");
                expect(serviceResult.result.recordsets[0].features.features.length).toBeGreaterThan(0);
                for (var i = 0; i < serviceResult.result.recordsets[0].features.features.length; i++) {
                    expect(serviceResult.result.recordsets[0].features.features[i].type).toBe("Feature");
                    expect(serviceResult.result.recordsets[0].features.features[i].geometry.type).toBe("Point");
                    expect(serviceResult.result.recordsets[0].features.features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(serviceResult.result.recordsets[0].features.features[0].properties.CAPITAL).not.toBeUndefined();
                expect(serviceResult.result.recordsets[0].features.features[0].properties.CAPITAL_CH).not.toBeUndefined();
                expect(serviceResult.result.recordsets[0].features.features[0].properties.CAPITAL_EN).not.toBeUndefined();
                expect(serviceResult.result.recordsets[0].features.features[0].properties.CAPITAL_LO).not.toBeUndefined();
                expect(serviceResult.result.recordsets[0].features.features[0].properties.CAP_POP).not.toBeUndefined();
                expect(serviceResult.result.recordsets[0].features.features[0].properties.COUNTRY).not.toBeUndefined();
                expect(serviceResult.result.recordsets[0].features.features[0].properties.COUNTRY_CH).not.toBeUndefined();
                expect(serviceResult.result.recordsets[0].features.features[0].properties.COUNTRY_EN).not.toBeUndefined();
                expect(serviceResult.result.recordsets[0].features.features[0].properties.ID).not.toBeUndefined();
                expect(serviceResult.result.recordsets[0].features.features[0].properties.POP).not.toBeUndefined();
                expect(serviceResult.result.recordsets[0].features.features[0].properties.SmGeometrySize).not.toBeUndefined();
                expect(serviceResult.result.recordsets[0].features.features[0].properties.SmID).not.toBeUndefined();
                expect(serviceResult.result.recordsets[0].features.features[0].properties.SmLibTileID).not.toBeUndefined();
                expect(serviceResult.result.recordsets[0].features.features[0].properties.SmUserID).not.toBeUndefined();
                expect(serviceResult.result.recordsets[0].features.features[0].properties.SmX).not.toBeUndefined();
                expect(serviceResult.result.recordsets[0].features.features[0].properties.SmY).not.toBeUndefined();
                expect(serviceResult.result.recordsets[0].features.features[0].properties.USERID).not.toBeUndefined();
                queryByDistanceService.destroy();
                done();
            } catch (exception) {
                console.log("leaflet_queryByDistance_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
                queryByDistanceService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });

    it('successEvent:queryByDistance_returnContent=false', (done) => {
        var circleMarker = L.circleMarker([30, 104]);
        var queryByDistanceParams = new QueryByDistanceParameters({
            queryParams: {name: "Capitals@World"},
            distance: 10,
            geometry: circleMarker,
            returnContent: false
        });
        var queryByDistanceService = queryService(worldMapURL, options);
        queryByDistanceService.queryByDistance(queryByDistanceParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(queryByDistanceService).not.toBeNull();
                expect(queryByDistanceService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
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
        }, 2000);
    });

    it('failEvent:queryByDistance_layerNotExist', (done) => {
        var circleMarker = L.circleMarker([30, 104]);
        var queryByDistanceParams = new QueryByDistanceParameters({
            queryParams: {name: "Capitals@World1"},
            distance: 10,
            geometry: circleMarker
        });
        var queryByDistanceService = queryService(worldMapURL, options);
        queryByDistanceService.queryByDistance(queryByDistanceParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(queryByDistanceService).not.toBeNull();
                expect(queryByDistanceService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
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
        }, 2000);
    });

    it('failEvent:queryByDistance_queryParamsNull', (done) => {
        var circleMarker = L.circleMarker([30, 104]);
        var queryByDistanceParams = new QueryByDistanceParameters({
            queryParams: null,
            distance: 10,
            geometry: circleMarker
        });
        var queryByDistanceService = queryService(worldMapURL, options);
        queryByDistanceService.queryByDistance(queryByDistanceParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(queryByDistanceService).not.toBeNull();
                expect(queryByDistanceService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
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
        }, 2000);
    })
});

