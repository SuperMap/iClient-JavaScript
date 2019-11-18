import {queryService} from '../../../src/leaflet/services/QueryService';
import {QueryBySQLParameters} from '../../../src/common/iServer/QueryBySQLParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

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

    it('proxy', () => {
        var service = queryService(worldMapURL, { proxy: 'testProxy' });
        expect(service).not.toBeNull();
        expect(service.options.proxy).toEqual('testProxy');
        service.destroy();
    });

    it('serverType', () => {
        var service = queryService(worldMapURL, { serverType: 'iPortal' });
        expect(service).not.toBeNull();
        expect(service.options.serverType).toEqual('iPortal');
        service.destroy();
    });

    it('withCredentials', () => {
        var service = queryService(worldMapURL, { withCredentials: true });
        expect(service).not.toBeNull();
        expect(service.options.withCredentials).toBeTruthy();
        service.destroy();
    });

    it('crossOrigin', () => {
        var service = queryService(worldMapURL, { crossOrigin: true });
        expect(service).not.toBeNull();
        expect(service.options.crossOrigin).toBeTruthy();
        service.destroy();
    });

    it('headers', () => {
        var service = queryService(worldMapURL, { headers: {} });
        expect(service).not.toBeNull();
        expect(service.options.headers).not.toBeNull();
        service.destroy();
    });

    it('successEvent:queryBySQL_returnContent=true', (done) => {
        var queryBySQLParams = new QueryBySQLParameters({
            queryParams: {
                name: "Capitals@World",
                attributeFilter: "SMID < 10"
            }
        });
        var queryBySQLService = queryService(worldMapURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryMode).toBe("SqlQuery");
            expect(paramsObj.queryParameters.queryParams[0].name).toBe("Capitals@World");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(queryResultJson)));
        });
        queryBySQLService.queryBySQL(queryBySQLParams, (result) => {
            serviceResult = result;

            try {
                expect(queryBySQLService).not.toBeNull();
                expect(queryBySQLService.options.serverType).toBe("iServer");
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
                queryBySQLService.destroy();
                done();
            } catch (exception) {
                console.log("leaflet_queryBySQL_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryParameters.queryParams[0].name).toBe("Capitals@World");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_3bd769669d614da2ac450c593b18e63a","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World Map/queryResults/c01d29d8d41743adb673cd1cecda6ed0_3bd769669d614da2ac450c593b18e63a.json"}`));
        });
        queryBySQLService.queryBySQL(queryBySQLParams, (result) => {
            serviceResult = result;
    
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
        });
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?returnCustomResult=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryParameters.queryParams[0].name).toBe("Capitals@World");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_7c073408732d47e7bffb8314a595e1d8","succeed":true,"customResult":{"top":38.89090807427654,"left":-175.245650649682,"bottom":-21.13090205664112,"leftBottom":{"x":-175.245650649682,"y":-21.13090205664112},"right":-47.8977476573595,"rightTop":{"x":-47.8977476573595,"y":38.89090807427654}},"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World Map/queryResults/c01d29d8d41743adb673cd1cecda6ed0_7c073408732d47e7bffb8314a595e1d8.json"}`));
        });
        queryBySQLService.queryBySQL(queryBySQLParams, (result) => {
            serviceResult = result;
      
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
        });
    });

    it('failEvent:queryBySQL_layerNotExist', (done) => {
        var queryBySQLParams = new QueryBySQLParameters({
            queryParams: {
                name: "Capitals@World1",
                attributeFilter: "SMID < 10"
            }
        });
        var queryBySQLService = queryService(worldMapURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?returnContent=true");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"查询目标图层不存在。(Capitals@World1)"}}`));
        });
        queryBySQLService.queryBySQL(queryBySQLParams, (result) => {
            serviceResult = result;
       
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
        });
    });

    it('failEvent:queryBySQL_queryParamsNull', (done) => {
        var queryBySQLParams = new QueryBySQLParameters({
            queryParams: null
        });
        var queryBySQLService = queryService(worldMapURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method,testUrl) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?returnContent=true");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数queryParameterSet.queryParams非法，不能为空。"}}`));
        });
        queryBySQLService.queryBySQL(queryBySQLParams, (result) => {
            serviceResult = result;
       
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
        })
    })
});

