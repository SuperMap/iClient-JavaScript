import {queryService} from '../../../src/leaflet/services/QueryService';
import {QueryBySQLParameters} from '../../../src/common/iServer/QueryBySQLParameters';

var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
var options = {
    serverType: 'iServer'
};

describe('leaflet_QueryService_queryBySQL', () => {
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

    it('successEvent:queryBySQL_returnContent=true', (done) => {
        var queryBySQLParams = new QueryBySQLParameters({
            queryParams: {
                name: "Capitals@World",
                attributeFilter: "SMID < 10"
            }
        });
        var queryBySQLService = queryService(worldMapURL, options);
        queryBySQLService.queryBySQL(queryBySQLParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
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
                queryBySQLService.destroy();
                done();
            } catch (exception) {
                console.log("leaflet_queryBySQL_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });

    it('successEvent:queryBySQL_returnContent=false', (done) => {
        var queryBySQLParams = new QueryBySQLParameters({
            queryParams: {
                name: "Capitals@World",
                attributeFilter: "SMID < 10"
            },
            returnContent: false
        });
        var queryBySQLService = queryService(worldMapURL, options);
        queryBySQLService.queryBySQL(queryBySQLParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
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
                console.log("leaflet_queryBySQL_'successEvent:returnContent=false'案例失败：" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('successEvent:queryBySQL_customsResult=true', (done) => {
        var queryBySQLParams = new QueryBySQLParameters({
            queryParams: {
                name: "Capitals@World",
                attributeFilter: "SMID < 10"
            },
            returnContent: false,
            returnCustomResult: true
        });
        var queryBySQLService = queryService(worldMapURL, options);
        queryBySQLService.queryBySQL(queryBySQLParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
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
                console.log("leaflet_queryBySQL_'successEvent:customsResult=true'案例失败：" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:queryBySQL_layerNotExist', (done) => {
        var queryBySQLParams = new QueryBySQLParameters({
            queryParams: {
                name: "Capitals@World1",
                attributeFilter: "SMID < 10"
            }
        });
        var queryBySQLService = queryService(worldMapURL, options);
        queryBySQLService.queryBySQL(queryBySQLParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
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
                console.log("leaflet_queryBySQL_'failEvent:layerNotExist'案例失败：" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:queryBySQL_queryParamsNull', (done) => {
        var queryBySQLParams = new QueryBySQLParameters({
            queryParams: null
        });
        var queryBySQLService = queryService(worldMapURL, options);
        queryBySQLService.queryBySQL(queryBySQLParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
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
                console.log("leaflet_queryBySQL_'failEvent:queryParamsNull'案例失败：" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    })
});

