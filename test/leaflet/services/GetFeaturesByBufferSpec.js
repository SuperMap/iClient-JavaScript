import { featureService } from '../../../src/leaflet/services/FeatureService';
import { GetFeaturesByBufferParameters } from '../../../src/common/iServer/GetFeaturesByBufferParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var dataServiceURL = GlobeParameter.dataServiceURL;
var options = {
};

describe('leaflet_FeatureService_getFeaturesByBuffer', () => {
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

    it('successEvent:getFeaturesByBuffer_returnContent=true', done => {
        var polygon = L.polygon([
            [-20, 20],
            [0, 20],
            [0, 40],
            [-20, 40],
            [-20, 20]
        ]);
        var getFeaturesByBufferParams = new GetFeaturesByBufferParameters({
            returnContent: true,
            datasetNames: ['World:Capitals'],
            attributeFilter: 'SMID>0',
            bufferDistance: 30,
            geometry: polygon,
            fromIndex: 0,
            toIndex: 19
        });
        var getFeaturesByBufferService = featureService(dataServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(dataServiceURL + '/featureResults?returnContent=true&fromIndex=0&toIndex=19');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.datasetNames[0]).toBe('World:Capitals');
            expect(paramsObj.attributeFilter).toBe('SMID%26gt;0');
            // expect(params).toContain("'attributeFilter':\"SMID%26gt;0\"");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesByBufferService.getFeaturesByBuffer(getFeaturesByBufferParams, result => {
            serviceResult = result;
            try {
                expect(getFeaturesByBufferService).not.toBeNull();
                expect(serviceResult.type).toBe('processCompleted');
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.featureCount).toBeGreaterThan(0);
                expect(serviceResult.result.totalCount).toBeGreaterThan(0);
                expect(serviceResult.result.features.type).toBe('FeatureCollection');
                expect(serviceResult.result.features.features.length).toEqual(1);
                for (var i = 0; i < serviceResult.result.features.features.length; i++) {
                    expect(serviceResult.result.features.features[i].type).toBe('Feature');
                    expect(serviceResult.result.features.features[i].geometry.type).toBe('MultiPolygon');
                    expect(serviceResult.result.features.features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(serviceResult.result.features.features[0].properties).toEqual(
                    Object({
                        SMID: '127',
                        CAPITAL: '利伯维尔'
                    })
                );
                getFeaturesByBufferService.destroy();
                done();
            } catch (exception) {
                console.log(
                    "leafletGetFeaturesByBufferService_'successEvent:returnContent=true'案例失败：" +
                        exception.name +
                        ':' +
                        exception.message
                );
                getFeaturesByBufferService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('successEvent:getFeaturesByBuffer_returnContent=false', done => {
        var polygon = L.polygon([
            [-20, 20],
            [0, 20],
            [0, 40],
            [-20, 40],
            [-20, 20]
        ]);
        var getFeaturesByBufferParams = new GetFeaturesByBufferParameters({
            returnContent: false,
            datasetNames: ['World:Capitals'],
            attributeFilter: 'SMID>0',
            bufferDistance: 30,
            geometry: polygon
        });
        var getFeaturesByBufferService = featureService(dataServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(dataServiceURL + '/featureResults');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.datasetNames[0]).toBe('World:Capitals');
            expect(paramsObj.attributeFilter).toBe('SMID%26gt;0');
            expect(paramsObj.bufferDistance).toBe(30);
            expect(options).not.toBeNull();
            return Promise.resolve(
                new Response(
                    `{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_02c1636b347046d9b1428bce7118c4df","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_02c1636b347046d9b1428bce7118c4df.json"}`
                )
            );
        });
        getFeaturesByBufferService.getFeaturesByBuffer(getFeaturesByBufferParams, result => {
            serviceResult = result;
            try {
                expect(getFeaturesByBufferService).not.toBeNull();
                expect(serviceResult.type).toBe('processCompleted');
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.postResultType).toBe('CreateChild');
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                getFeaturesByBufferService.destroy();
                done();
            } catch (exception) {
                console.log(
                    "leafletGetFeaturesByBufferService_'successEvent:returnContent=false'案例失败：" +
                        exception.name +
                        ':' +
                        exception.message
                );
                getFeaturesByBufferService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('failEvent:getFeaturesByBuffer_datasetNotExist', done => {
        var polygon = L.polygon([
            [-20, 20],
            [0, 20],
            [0, 40],
            [-20, 40],
            [-20, 20]
        ]);
        var getFeaturesByBufferParams = new GetFeaturesByBufferParameters({
            datasetNames: ['World1:Capitals'],
            attributeFilter: 'SMID>0',
            bufferDistance: 30,
            geometry: polygon
        });
        var getFeaturesByBufferService = featureService(dataServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(dataServiceURL + '/featureResults?returnContent=true&fromIndex=0&toIndex=19');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.datasetNames[0]).toBe('World1:Capitals');
            expect(paramsObj.attributeFilter).toBe('SMID%26gt;0');
            expect(paramsObj.bufferDistance).toBe(30);
            expect(options).not.toBeNull();
            return Promise.resolve(
                new Response(
                    `{"succeed":false,"error":{"code":400,"errorMsg":"数据源World1不存在，获取相应的数据服务组件失败"}}`
                )
            );
        });
        getFeaturesByBufferService.getFeaturesByBuffer(getFeaturesByBufferParams, result => {
            serviceResult = result;
            try {
                expect(getFeaturesByBufferService).not.toBeNull();
                expect(serviceResult.type).toBe('processFailed');
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe('数据源World1不存在，获取相应的数据服务组件失败');
                getFeaturesByBufferService.destroy();
                done();
            } catch (exception) {
                console.log(
                    "leafletGetFeaturesByBufferService_'failEvent:datasetNotExist'案例失败：" +
                        exception.name +
                        ':' +
                        exception.message
                );
                getFeaturesByBufferService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('failEvent:getFeaturesByBuffer_datasetNamesNull', done => {
        var polygon = L.polygon([
            [-20, 20],
            [0, 20],
            [0, 40],
            [-20, 40],
            [-20, 20]
        ]);
        var getFeaturesByBufferParams = new GetFeaturesByBufferParameters({
            datasetNames: null,
            attributeFilter: 'SMID>0',
            bufferDistance: 30,
            geometry: polygon
        });
        var getFeaturesByBufferService = featureService(dataServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(dataServiceURL + '/featureResults?returnContent=true&fromIndex=0&toIndex=19');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.attributeFilter).toBe('SMID%26gt;0');
            expect(paramsObj.bufferDistance).toBe(30);
            expect(options).not.toBeNull();
            return Promise.resolve(
                new Response(
                    `{"succeed":false,"error":{"code":400,"errorMsg":"在FeatureResults中，在检验请求体时，请求体参数datasetNames为空"}}`
                )
            );
        });
        getFeaturesByBufferService.getFeaturesByBuffer(getFeaturesByBufferParams, result => {
            serviceResult = result;
            try {
                expect(getFeaturesByBufferService).not.toBeNull();
                expect(serviceResult.type).toBe('processFailed');
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe(
                    '在FeatureResults中，在检验请求体时，请求体参数datasetNames为空'
                );
                getFeaturesByBufferService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log(
                    "leafletGetFeaturesByBufferService_'failEvent:datasetNamesNull'案例失败：" +
                        exception.name +
                        ':' +
                        exception.message
                );
                getFeaturesByBufferService.destroy();
                done();
            }
        });
    });
    it('getFeaturesByBufferParams:targetEpsgCode', done => {
        var polygon = L.polygon([
            [-20, 20],
            [0, 20],
            [0, 40],
            [-20, 40],
            [-20, 20]
        ]);
        var getFeaturesByBufferService = featureService(dataServiceURL, options);
        var getFeaturesByBufferParams = new GetFeaturesByBufferParameters({
            datasetNames: ['World1:Capitals'],
            attributeFilter: 'SMID>0',
            bufferDistance: 30,
            geometry: polygon,
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
        getFeaturesByBufferService.getFeaturesByBuffer(getFeaturesByBufferParams, result => {
            serviceResult = result;
            getFeaturesByBufferService.destroy();
            done();
        });
    });
    it('getFeaturesByBufferParams:targetPrj', done => {
        var polygon = L.polygon([
            [-20, 20],
            [0, 20],
            [0, 40],
            [-20, 40],
            [-20, 20]
        ]);
        var getFeaturesByBufferService = featureService(dataServiceURL, options);
        var getFeaturesByBufferParams = new GetFeaturesByBufferParameters({
            datasetNames: ['World1:Capitals'],
            attributeFilter: 'SMID>0',
            bufferDistance: 30,
            geometry: polygon,
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
        getFeaturesByBufferService.getFeaturesByBuffer(getFeaturesByBufferParams, result => {
            serviceResult = result;
            getFeaturesByBufferService.destroy();
            done();
        });
    });
    it('MetricsAggParameter', done => {
        var aggregations = new SuperMap.MetricsAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var polygon = L.polygon([
            [-20, 20],
            [0, 20],
            [0, 40],
            [-20, 40],
            [-20, 20]
        ]);
        var getFeaturesByBufferService = featureService(dataServiceURL, options);
        var getFeaturesByBufferParams = new GetFeaturesByBufferParameters({
            datasetNames: ['World1:Capitals'],
            attributeFilter: 'SMID>0',
            bufferDistance: 30,
            geometry: polygon,
            targetPrj: { epsgCode: 4326 },
            aggregations: aggregations
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.aggregations.aggName).toEqual('test');
            expect(paramsObj.aggregations.aggFieldName).toEqual('SMID');
            expect(paramsObj.aggregations.aggType).toEqual('avg');
            done();
            return Promise.resolve(
                new Response(
                    `{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d.json"}`
                )
            );
        });
        getFeaturesByBufferService.getFeaturesByBuffer(getFeaturesByBufferParams, result => {
            serviceResult = result;
            getFeaturesByBufferService.destroy();
            done();
        });
    });
    it('GeoHashGridAggParameter', done => {
        var aggregations = new SuperMap.GeoHashGridAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var polygon = L.polygon([
            [-20, 20],
            [0, 20],
            [0, 40],
            [-20, 40],
            [-20, 20]
        ]);
        var getFeaturesByBufferService = featureService(dataServiceURL, options);
        var getFeaturesByBufferParams = new GetFeaturesByBufferParameters({
            datasetNames: ['World1:Capitals'],
            attributeFilter: 'SMID>0',
            bufferDistance: 30,
            geometry: polygon,
            targetPrj: { epsgCode: 4326 },
            aggregations: aggregations
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.aggregations.aggName).toEqual('test');
            expect(paramsObj.aggregations.aggFieldName).toEqual('SMID');
            expect(paramsObj.aggregations.aggType).toEqual('geohash_grid');
            done();
            return Promise.resolve(
                new Response(
                    `{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d.json"}`
                )
            );
        });
        getFeaturesByBufferService.getFeaturesByBuffer(getFeaturesByBufferParams, result => {
            serviceResult = result;
            getFeaturesByBufferService.destroy();
            done();
        });
    });
});
