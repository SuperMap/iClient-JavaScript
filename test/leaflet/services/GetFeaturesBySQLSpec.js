import {featureService} from '../../../src/leaflet/services/FeatureService';
import {GetFeaturesBySQLParameters} from '../../../src/common/iServer/GetFeaturesBySQLParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var dataServiceURL = GlobeParameter.dataServiceURL;
var options = {
    serverType: 'iServer'
};

describe('leaflet_FeatureService_getFeaturesBySQL', () => {
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

    it('successEvent:getFeaturesBySQL_returnContent=true', (done) => {
        var getFeaturesBySQLParams = new GetFeaturesBySQLParameters({
            returnContent: true,
            queryParameter: {
                name: "Countries@World",
                attributeFilter: "SMID =247"
            },
            datasetNames: ["World:Countries"]
        });
        var getFeaturesBySQLService = featureService(dataServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(dataServiceURL + "/featureResults.json?returnContent=true&fromIndex=0&toIndex=19");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.datasetNames[0]).toBe("World:Countries");
            expect(paramsObj.getFeatureMode).toBe("SQL");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesBySQLService.getFeaturesBySQL(getFeaturesBySQLParams, (result) => {
            serviceResult = result;
            try {
                expect(getFeaturesBySQLService).not.toBeNull();
                expect(getFeaturesBySQLService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.featureCount).toEqual(1);
                expect(serviceResult.result.totalCount).toEqual(1);
                expect(serviceResult.result.features.type).toBe("FeatureCollection");
                expect(serviceResult.result.features.features.length).toEqual(1);
                expect(serviceResult.result.features.features[0].type).toBe("Feature");
                expect(serviceResult.result.features.features[0].geometry.type).toBe("MultiPolygon");
                expect(serviceResult.result.features.features[0].geometry.coordinates.length).toEqual(2);
                expect(serviceResult.result.features.features[0].properties).toEqual(Object({
                    CAPITAL: "利伯维尔",
                    SMID: "127"
                }));
                getFeaturesBySQLService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesBySQLService_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
         });

    it('successEvent:getFeaturesBySQL_returnContent=false', (done) => {
        var getFeaturesBySQLParams = new GetFeaturesBySQLParameters({
            returnContent: false,
            queryParameter: {
                name: "Countries@World",
                attributeFilter: "SMID>0"
            },
            datasetNames: ["World:Countries"]
        });
        var getFeaturesBySQLService = featureService(dataServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(dataServiceURL + "/featureResults.json?");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.queryParameter.name).toBe("Countries@World");
            expect(paramsObj.queryParameter.attributeFilter).toBe("SMID%26gt;0");
            // expect(params).toContain("'queryParameter':{'name':\"Countries@World\",'attributeFilter':\"SMID%26gt;0\"}");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_aeeacd0b0b3e492b9bdab6fa92e91184","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_aeeacd0b0b3e492b9bdab6fa92e91184.json"}`));
        });
        getFeaturesBySQLService.getFeaturesBySQL(getFeaturesBySQLParams, (result) => {
            serviceResult = result;
            try {
                expect(getFeaturesBySQLService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                getFeaturesBySQLService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesBySQLService_'successEvent:returnContent=false'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('failEvent:getFeaturesBySQL_datasetNotExist', (done) => {
        var getFeaturesBySQLParams = new GetFeaturesBySQLParameters({
            queryParameter: {
                name: "Countries@World",
                attributeFilter: "SMID>0"
            },
            datasetNames: ["World1:Countries"]
        });
        var getFeaturesBySQLService = featureService(dataServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(dataServiceURL + "/featureResults.json?returnContent=true&fromIndex=0&toIndex=19");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.datasetNames[0]).toBe("World1:Countries");
            expect(paramsObj.queryParameter.name).toBe("Countries@World");
            expect(paramsObj.queryParameter.attributeFilter).toBe("SMID%26gt;0");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"数据源World1不存在，获取相应的数据服务组件失败"}}`));
        });
        getFeaturesBySQLService.getFeaturesBySQL(getFeaturesBySQLParams, (result) => {
            serviceResult = result;
            try {
                expect(getFeaturesBySQLService).not.toBeNull();
                expect(getFeaturesBySQLService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("数据源World1不存在，获取相应的数据服务组件失败");
                getFeaturesBySQLService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesBySQLService_'failEvent:datasetNotExist'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('failEvent:getFeaturesBySQL_queryParameterNull', (done) => {
        var getFeaturesBySQLParams = new GetFeaturesBySQLParameters({
            queryParameter: null,
            datasetNames: ["World:Countries"]
        });
        var getFeaturesBySQLService = featureService(dataServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(dataServiceURL + "/featureResults.json?returnContent=true&fromIndex=0&toIndex=19");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.datasetNames[0]).toBe("World:Countries");
            expect(paramsObj.queryParameter).toBeNull;
            // expect(params).toContain("'queryParameter':null");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"在FeatureResults资源中，检查请求体时，发现Queryparam为空。"}}`));
        });
        getFeaturesBySQLService.getFeaturesBySQL(getFeaturesBySQLParams, (result) => {
            serviceResult = result;
            try {
                expect(getFeaturesBySQLService).not.toBeNull();
                expect(getFeaturesBySQLService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("在FeatureResults资源中，检查请求体时，发现Queryparam为空。");
                getFeaturesBySQLService.destroy();
                done();
            } catch (exception) {
                console.log("leaflet_getFeaturesBySQL_'failEvent:queryParameterNull'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesBySQLService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    })
});

