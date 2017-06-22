require('../../../src/leaflet/services/QueryService');

var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
var options = {
    serverType: 'iServer'
};

describe('leaflet_testQueryService_queryByGeometry', function () {
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
        var polygon = L.polygon([[0, 20], [-30, 20], [-10, 50], [0, 20]]);
        var queryByGeometryParams = new SuperMap.QueryByGeometryParameters({
            customParams: null,
            expectCount: 5,
            startRecord: 1,
            queryParams: {name: "Capitals@World"},
            geometry: polygon
        });
        var queryByGeometryService = L.supermap.queryService(worldMapURL, options).queryByGeometry(queryByGeometryParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(queryByGeometryService).not.toBeNull();
                expect(queryByGeometryService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.customResponse).toBeNull();
                expect(serviceResult.result.currentCount).toEqual(5);
                expect(serviceResult.result.totalCount).toEqual(7);
                expect(serviceResult.result.recordsets.length).toBeGreaterThan(0);
                expect(serviceResult.result.recordsets[0].datasetName).toBe("Capitals@World");
                expect(serviceResult.result.recordsets[0].fieldCaptions.length).toEqual(16);
                expect(serviceResult.result.recordsets[0].fieldTypes.length).toEqual(16);
                expect(serviceResult.result.recordsets[0].features.type).toBe("FeatureCollection");
                expect(serviceResult.result.recordsets[0].features.features.length).toEqual(5);
                for (var i = 0; i < serviceResult.result.recordsets[0].features.features.length; i++) {
                    expect(serviceResult.result.recordsets[0].features.features[i].type).toBe("Feature");
                    expect(serviceResult.result.recordsets[0].features.features[i].geometry.type).toBe("Point");
                    expect(serviceResult.result.recordsets[0].features.features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(serviceResult.result.recordsets[0].features.features[0].properties).toEqual(Object({
                    CAPITAL: "达累斯萨拉姆",
                    CAPITAL_CH: "达累斯萨拉姆",
                    CAPITAL_EN: "Dar es Salaam",
                    CAPITAL_LO: "Dodoma",
                    CAP_POP: "2698652.0",
                    COUNTRY: "坦桑尼亚",
                    COUNTRY_CH: "坦桑尼亚",
                    COUNTRY_EN: "Tanzania",
                    ID: 49,
                    POP: "2698652.0",
                    SmGeometrySize: "16",
                    SmID: "49",
                    SmLibTileID: "1",
                    SmUserID: "0",
                    SmX: "39.253347298189766",
                    SmY: "-6.817356064000194",
                    USERID: "0"
                }));
                queryByGeometryService.destroy();
                done();
            } catch (exception) {
                console.log("leafletQueryByGeometryService_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
                queryByGeometryService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });

    it('successEvent:returnContent=false', function (done) {
        var polygon = L.polygon([[0, 20], [-30, 20], [-10, 50], [0, 20]]);
        var queryByGeometryParams = new SuperMap.QueryByGeometryParameters({
            customParams: null,
            expectCount: 10,
            startRecord: 1,
            queryParams: {name: "Capitals@World"},
            geometry: polygon,
            returnContent: false
        });
        var queryByGeometryService = L.supermap.queryService(worldMapURL, options).queryByGeometry(queryByGeometryParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
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
                console.log("leafletQueryByGeometryService_'successEvent:returnContent=false'案例失败：" + exception.name + ":" + exception.message);
                queryByGeometryService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:layerNotExist', function (done) {
        var polygon = L.polygon([[0, 20], [-30, 20], [-10, 50], [0, 20]]);
        var queryByGeometryParams = new SuperMap.QueryByGeometryParameters({
            queryParams: {name: "Capitals@World1"},
            geometry: polygon
        });
        var queryByGeometryService = L.supermap.queryService(worldMapURL, options).queryByGeometry(queryByGeometryParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
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
                console.log("leafletQueryByGeometryService_'failEvent:layerNotExist'案例失败：" + exception.name + ":" + exception.message);
                queryByGeometryService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:queryParamsNull', function (done) {
        var polygon = L.polygon([[0, 20], [-30, 20], [-10, 50], [0, 20]]);
        var queryByGeometryParams = new SuperMap.QueryByGeometryParameters({
            queryParams: null,
            geometry: polygon
        });
        var queryByGeometryService = L.supermap.queryService(worldMapURL, options).queryByGeometry(queryByGeometryParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
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
                console.log("leafletQueryByGeometryService_'failEvent:queryParamsNull'案例失败：" + exception.name + ":" + exception.message);
                queryByGeometryService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    })
});

