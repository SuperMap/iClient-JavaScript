require('../../../src/leaflet/services/QueryService');

var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
var options = {
    serverType: 'iServer'
};

describe('leaflet_testQueryService_queryByDistance', function () {
    var serviceResult;
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('successEvent:returnContent=true', function (done) {
        var circleMarker = L.circleMarker([30, 104]);
        var queryByDistanceParams = new SuperMap.QueryByDistanceParameters({
            queryParams: {name: "Capitals@World"},
            distance: 10,
            geometry: circleMarker
        });
        var queryByDistanceService = L.supermap.queryService(worldMapURL, options).queryByDistance(queryByDistanceParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(queryByDistanceService).not.toBeNull();
                expect(queryByDistanceService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.customResponse).toBeNull();
                expect(serviceResult.result.currentCount).toEqual(1);
                expect(serviceResult.result.totalCount).toEqual(1);
                expect(serviceResult.result.recordsets.length).toBeGreaterThan(0);
                expect(serviceResult.result.recordsets[0].datasetName).toBe("Capitals@World");
                expect(serviceResult.result.recordsets[0].fieldCaptions.length).toEqual(16);
                expect(serviceResult.result.recordsets[0].fieldTypes.length).toEqual(16);
                expect(serviceResult.result.recordsets[0].features.type).toBe("FeatureCollection");
                expect(serviceResult.result.recordsets[0].features.features.length).toEqual(1);
                for (var i = 0; i < serviceResult.result.recordsets[0].features.features.length; i++) {
                    expect(serviceResult.result.recordsets[0].features.features[i].type).toBe("Feature");
                    expect(serviceResult.result.recordsets[0].features.features[i].geometry.type).toBe("Point");
                    expect(serviceResult.result.recordsets[0].features.features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(serviceResult.result.recordsets[0].features.features[0].properties).toEqual(Object({
                    CAPITAL: "河内",
                    CAPITAL_CH: "河内",
                    CAPITAL_EN: "Hanoi",
                    CAPITAL_LO: "Hà Nội",
                    CAP_POP: "1431270.0",
                    COUNTRY: "越南",
                    COUNTRY_CH: "越南",
                    COUNTRY_EN: "Vietnam",
                    ID: 167,
                    POP: "1431270.0",
                    SmGeometrySize: "16",
                    SmID: "167",
                    SmLibTileID: "1",
                    SmUserID: "0",
                    SmX: "105.82000238598519",
                    SmY: "21.030003066242273",
                    USERID: "0"
                }));
                queryByDistanceService.destroy();
                done();
            } catch (exception) {
                console.log("leafletQueryByDistanceService_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
                queryByDistanceService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });

    it('successEvent:returnContent=false', function (done) {
        var circleMarker = L.circleMarker([30, 104]);
        var queryByDistanceParams = new SuperMap.QueryByDistanceParameters({
            queryParams: {name: "Capitals@World"},
            distance: 10,
            geometry: circleMarker,
            returnContent: false
        });
        var queryByDistanceService = L.supermap.queryService(worldMapURL, options).queryByDistance(queryByDistanceParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
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
                console.log("leafletQueryByDistanceService_'successEvent:returnContent=false'案例失败：" + exception.name + ":" + exception.message);
                queryByDistanceService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });


    it('failEvent:layerNotExist', function (done) {
        var circleMarker = L.circleMarker([30, 104]);
        var queryByDistanceParams = new SuperMap.QueryByDistanceParameters({
            queryParams: {name: "Capitals@World1"},
            distance: 10,
            geometry: circleMarker
        });
        var queryByDistanceService = L.supermap.queryService(worldMapURL, options).queryByDistance(queryByDistanceParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
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
                console.log("leafletQueryByDistanceService_'failEvent:layerNotExist'案例失败：" + exception.name + ":" + exception.message);
                queryByDistanceService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });


    it('failEvent:queryParamsNull', function (done) {
        var circleMarker = L.circleMarker([30, 104]);
        var queryByDistanceParams = new SuperMap.QueryByDistanceParameters({
            queryParams: null,
            distance: 10,
            geometry: circleMarker
        });
        var queryByDistanceService = L.supermap.queryService(worldMapURL, options).queryByDistance(queryByDistanceParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
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
                console.log("leafletQueryByDistanceService_'failEvent:queryParamsNull'案例失败：" + exception.name + ":" + exception.message);
                queryByDistanceService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    })
});

