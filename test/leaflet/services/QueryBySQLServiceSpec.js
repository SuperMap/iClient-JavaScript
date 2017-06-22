require('../../../src/leaflet/services/QueryService');

var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
var options = {
    serverType: 'iServer'
};

describe('leaflet_testQueryService_queryBySQL', function () {
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
        var queryBySQLParams = new SuperMap.QueryBySQLParameters({
            queryParams: {
                name: "Capitals@World",
                attributeFilter: "SMID < 10"
            }
        });
        var queryBySQLService = L.supermap.queryService(worldMapURL, options).queryBySQL(queryBySQLParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(queryBySQLService).not.toBeNull();
                expect(queryBySQLService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.customResponse).toBeNull();
                expect(serviceResult.result.currentCount).toEqual(9);
                expect(serviceResult.result.totalCount).toEqual(9);
                expect(serviceResult.result.recordsets.length).toBeGreaterThan(0);
                expect(serviceResult.result.recordsets[0].datasetName).toBe("Capitals@World");
                expect(serviceResult.result.recordsets[0].fieldCaptions.length).toEqual(16);
                expect(serviceResult.result.recordsets[0].fieldTypes.length).toEqual(16);
                expect(serviceResult.result.recordsets[0].features.type).toBe("FeatureCollection");
                expect(serviceResult.result.recordsets[0].features.features.length).toEqual(9);
                for (var i = 0; i < serviceResult.result.recordsets[0].features.features.length; i++) {
                    expect(serviceResult.result.recordsets[0].features.features[i].type).toBe("Feature");
                    expect(serviceResult.result.recordsets[0].features.features[i].geometry.type).toBe("Point");
                    expect(serviceResult.result.recordsets[0].features.features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(serviceResult.result.recordsets[0].features.features[0].properties).toEqual(Object({
                    CAPITAL: "巴西利亚",
                    CAPITAL_CH: "巴西利亚",
                    CAPITAL_EN: "Brasilia",
                    CAPITAL_LO: "Brasília",
                    CAP_POP: "2207718.0",
                    COUNTRY: "巴西",
                    COUNTRY_CH: "巴西",
                    COUNTRY_EN: "Brazil",
                    ID: 1,
                    POP: "2207718.0",
                    SmGeometrySize: "16",
                    SmID: "1",
                    SmLibTileID: "1",
                    SmUserID: "0",
                    SmX: "-47.8977476573595",
                    SmY: "-15.792110943058866",
                    USERID: "0"
                }));
                queryBySQLService.destroy();
                done();
            } catch (exception) {
                console.log("leafletQueryBySQLService_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });

    it('successEvent:returnContent=false', function (done) {
        var queryBySQLParams = new SuperMap.QueryBySQLParameters({
            queryParams: {
                name: "Capitals@World",
                attributeFilter: "SMID < 10"
            },
            returnContent: false
        });
        var queryBySQLService = L.supermap.queryService(worldMapURL, options).queryBySQL(queryBySQLParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(queryBySQLService).not.toBeNull();
                expect(queryBySQLService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                queryBySQLService.destroy();
                done();
            } catch (exception) {
                console.log("leafletQueryBySQLService_'successEvent:returnContent=false'案例失败：" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('successEvent:customsResult=true', function (done) {
        var queryBySQLParams = new SuperMap.QueryBySQLParameters({
            queryParams: {
                name: "Capitals@World",
                attributeFilter: "SMID < 10"
            },
            returnContent: false,
            returnCustomResult: true
        });
        var queryBySQLService = L.supermap.queryService(worldMapURL, options).queryBySQL(queryBySQLParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(queryBySQLService).not.toBeNull();
                expect(queryBySQLService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                expect(serviceResult.result.customResult).not.toBeNull();
                queryBySQLService.destroy();
                done();
            } catch (exception) {
                console.log("leafletQueryBySQLService_'successEvent:customsResult=true'案例失败：" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:layerNotExist', function (done) {
        var queryBySQLParams = new SuperMap.QueryBySQLParameters({
            queryParams: {
                name: "Capitals@World1",
                attributeFilter: "SMID < 10"
            }
        });
        var queryBySQLService = L.supermap.queryService(worldMapURL, options).queryBySQL(queryBySQLParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(queryBySQLService).not.toBeNull();
                expect(queryBySQLService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("查询目标图层不存在。(Capitals@World1)");
                queryBySQLService.destroy();
                done();
            } catch (exception) {
                console.log("leafletQueryBySQLService_'failEvent:layerNotExist'案例失败：" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:queryParamsNull', function (done) {
        var queryBySQLParams = new SuperMap.QueryBySQLParameters({
            queryParams: null
        });
        var queryBySQLService = L.supermap.queryService(worldMapURL, options).queryBySQL(queryBySQLParams, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(queryBySQLService).not.toBeNull();
                expect(queryBySQLService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("参数queryParameterSet.queryParams非法，不能为空。");
                queryBySQLService.destroy();
                done();
            } catch (exception) {
                console.log("leafletQueryBySQLService_'failEvent:queryParamsNull'案例失败：" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    })
});

