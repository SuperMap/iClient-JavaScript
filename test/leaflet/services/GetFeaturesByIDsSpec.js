import { featureService } from '../../../src/leaflet/services/FeatureService';
import { GetFeaturesByIDsParameters } from '../../../src/common/iServer/GetFeaturesByIDsParameters';
import { MetricsAggParameter } from '../../../src/common/iServer/MetricsAggParameter';
import { GeoHashGridAggParameter } from '../../../src/common/iServer/GeoHashGridAggParameter';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var dataServiceURL = GlobeParameter.dataServiceURL;
var options = {

};

describe('leaflet_FeatureService_getFeaturesByIDs', () => {
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

    it('successEvent:getFeaturesByIDs_returnContent=true', done => {
        var getFeaturesByIDsParams = new GetFeaturesByIDsParameters({
            returnContent: true,
            datasetNames: ['World:Capitals'],
            IDs: [1, 2, 3]
        });
        var getFeaturesByIDsService = featureService(dataServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(dataServiceURL + '/featureResults?fromIndex=0&toIndex=19&returnContent=true');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.datasetNames[0]).toBe('World:Capitals');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesByIDsService.getFeaturesByIDs(getFeaturesByIDsParams, result => {
            serviceResult = result;
            try {
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(serviceResult.type).toBe('processCompleted');
                expect(serviceResult.object.isInTheSameDomain).toBeTruthy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.featureCount).toEqual(1);
                expect(serviceResult.result.totalCount).toEqual(1);
                expect(serviceResult.result.features.type).toBe('FeatureCollection');
                expect(serviceResult.result.features.features.length).toEqual(1);
                for (var i = 0; i < serviceResult.result.features.features.length; i++) {
                    expect(serviceResult.result.features.features[i].type).toBe('Feature');
                    expect(serviceResult.result.features.features[i].geometry.type).toBe('MultiPolygon');
                    expect(serviceResult.result.features.features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(serviceResult.result.features.features[0].properties).toEqual(
                    Object({
                        CAPITAL: '利伯维尔',
                        SMID: '127'
                    })
                );
                getFeaturesByIDsService.destroy();
                done();
            } catch (exception) {
                console.log(
                    "leafletGetFeaturesByIDsService_'successEvent:returnContent=true'案例失败：" +
                        exception.name +
                        ':' +
                        exception.message
                );
                getFeaturesByIDsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('successEvent:getFeaturesByIDs_returnContent=false', done => {
        var getFeaturesByIDsParams = new GetFeaturesByIDsParameters({
            returnContent: false,
            datasetNames: ['World:Capitals'],
            IDs: [1, 2, 3]
        });
        var getFeaturesByIDsService = featureService(dataServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(dataServiceURL + '/featureResults');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.datasetNames[0]).toBe('World:Capitals');
            expect(options).not.toBeNull();
            return Promise.resolve(
                new Response(
                    `{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_1392ef903de94fb695e8552894f7969f","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_1392ef903de94fb695e8552894f7969f.json"}`
                )
            );
        });
        getFeaturesByIDsService.getFeaturesByIDs(getFeaturesByIDsParams, result => {
            serviceResult = result;
            try {
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(serviceResult.type).toBe('processCompleted');
                expect(serviceResult.object.isInTheSameDomain).toBeTruthy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.postResultType).toBe('CreateChild');
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                getFeaturesByIDsService.destroy();
                done();
            } catch (exception) {
                console.log(
                    "leafletGetFeaturesByIDsService_'successEvent:returnContent=false'案例失败：" +
                        exception.name +
                        ':' +
                        exception.message
                );
                getFeaturesByIDsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('failEvent:getFeaturesByIDs_datasetNotExist', done => {
        var getFeaturesByIDsParams = new GetFeaturesByIDsParameters({
            datasetNames: ['World1:Capitals'],
            IDs: [1, 2, 3]
        });
        var getFeaturesByIDsService = featureService(dataServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(dataServiceURL + '/featureResults?fromIndex=0&toIndex=19&returnContent=true');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.datasetNames[0]).toBe('World1:Capitals');
            expect(paramsObj.getFeatureMode).toBe('ID');
            expect(options).not.toBeNull();
            return Promise.resolve(
                new Response(
                    `{"succeed":false,"error":{"code":400,"errorMsg":"数据源World1不存在，获取相应的数据服务组件失败"}}`
                )
            );
        });
        getFeaturesByIDsService.getFeaturesByIDs(getFeaturesByIDsParams, result => {
            serviceResult = result;
            try {
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(serviceResult.type).toBe('processFailed');
                expect(serviceResult.object.isInTheSameDomain).toBeTruthy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe('数据源World1不存在，获取相应的数据服务组件失败');
                getFeaturesByIDsService.destroy();
                done();
            } catch (exception) {
                console.log(
                    "leafletGetFeaturesByIDsService_'failEvent:datasetNotExist'案例失败：" +
                        exception.name +
                        ':' +
                        exception.message
                );
                getFeaturesByIDsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('failEvent:getFeaturesByIDs_datasetNamesNull', done => {
        var getFeaturesByIDsParams = new GetFeaturesByIDsParameters({
            datasetNames: null
        });
        var getFeaturesByIDsService = featureService(dataServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(dataServiceURL + '/featureResults?fromIndex=0&toIndex=19&returnContent=true');
            expect(options).not.toBeNull();
            return Promise.resolve(
                new Response(
                    `{"succeed":false,"error":{"code":400,"errorMsg":"在FeatureResults中，在检验请求体时，请求体参数datasetNames为空"}}`
                )
            );
        });
        getFeaturesByIDsService.getFeaturesByIDs(getFeaturesByIDsParams, result => {
            serviceResult = result;
            try {
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(serviceResult.type).toBe('processFailed');
                expect(serviceResult.object.isInTheSameDomain).toBeTruthy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe(
                    '在FeatureResults中，在检验请求体时，请求体参数datasetNames为空'
                );
                getFeaturesByIDsService.destroy();
                done();
            } catch (exception) {
                console.log(
                    "leafletGetFeaturesByIDsService_'failEvent:datasetNamesNull'案例失败：" +
                        exception.name +
                        ':' +
                        exception.message
                );
                getFeaturesByIDsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    it('getFeaturesByIDsParams:targetEpsgCode', done => {
        var getFeaturesByIDsService = featureService(dataServiceURL, options);
        var getFeaturesByIDsParams = new GetFeaturesByIDsParameters({
            datasetNames: ['World1:Capitals'],
            IDs: [1, 2, 3],
            targetEpsgCode: 4326
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetEpsgCode).toEqual(4326);
            return Promise.resolve(
                new Response(
                    `{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d.json"}`
                )
            );
        });
        getFeaturesByIDsService.getFeaturesByIDs(getFeaturesByIDsParams, result => {
            serviceResult = result;
            getFeaturesByIDsService.destroy();
            done();
        });
    });
    it('getFeaturesByIDsParams:targetPrj', done => {
        var getFeaturesByIDsService = featureService(dataServiceURL, options);
        var getFeaturesByIDsParams = new GetFeaturesByIDsParameters({
            datasetNames: ['World1:Capitals'],
            IDs: [1, 2, 3],
            targetPrj: { epsgCode: 4326 }
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetPrj.epsgCode).toEqual(4326);
            return Promise.resolve(
                new Response(
                    `{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d.json"}`
                )
            );
        });
        getFeaturesByIDsService.getFeaturesByIDs(getFeaturesByIDsParams, result => {
            serviceResult = result;
            getFeaturesByIDsService.destroy();
            done();
        });
    });
    it('MetricsAggParameter', done => {
        var aggregations = new MetricsAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var getFeaturesByIDsService = featureService(dataServiceURL, options);
        var getFeaturesByIDsParams = new GetFeaturesByIDsParameters({
            datasetNames: ['World1:Capitals'],
            IDs: [1, 2, 3],
            targetPrj: { epsgCode: 4326 },
            aggregations: aggregations
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.aggregations.aggName).toEqual('test');
            expect(paramsObj.aggregations.aggFieldName).toEqual('SMID');
            expect(paramsObj.aggregations.aggType).toEqual('avg');
            return Promise.resolve(
                new Response(
                    `{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d.json"}`
                )
            );
        });
        getFeaturesByIDsService.getFeaturesByIDs(getFeaturesByIDsParams, result => {
            serviceResult = result;
            getFeaturesByIDsService.destroy();
            done();
        });
    });
    it('GeoHashGridAggParameter', done => {
        var aggregations = new GeoHashGridAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var getFeaturesByIDsService = featureService(dataServiceURL, options);
        var getFeaturesByIDsParams = new GetFeaturesByIDsParameters({
            datasetNames: ['World1:Capitals'],
            IDs: [1, 2, 3],
            targetPrj: { epsgCode: 4326 },
            aggregations: aggregations
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.aggregations.aggName).toEqual('test');
            expect(paramsObj.aggregations.aggFieldName).toEqual('SMID');
            expect(paramsObj.aggregations.aggType).toEqual('geohash_grid');
            return Promise.resolve(
                new Response(
                    `{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d.json"}`
                )
            );
        });
        getFeaturesByIDsService.getFeaturesByIDs(getFeaturesByIDsParams, result => {
            serviceResult = result;
            getFeaturesByIDsService.destroy();
            done();
        });
    });
});
