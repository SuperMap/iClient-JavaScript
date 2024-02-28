import { FeatureService } from '../../../src/maplibregl/services/FeatureService';
import { GetFeaturesByIDsParameters } from '../../../src/common/iServer/GetFeaturesByIDsParameters';
import { MetricsAggParameter } from '../../../src/common/iServer/MetricsAggParameter';
import { GeoHashGridAggParameter } from '../../../src/common/iServer/GeoHashGridAggParameter';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.dataServiceURL;

describe('maplibregl_FeatureService_getFeaturesByIDs', () => {
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

    //数据集ID查询服务
    it('getFeaturesByIDs', done => {
        var idsParam = new GetFeaturesByIDsParameters({
            IDs: [247],
            datasetNames: ['World:Countries']
        });
        var service = new FeatureService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + '/featureResults?fromIndex=0&toIndex=19&returnContent=true');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.datasetNames[0]).toBe('World:Countries');
            expect(paramsObj.getFeatureMode).toBe('ID');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByIDs(idsParam, result => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe('processCompleted');
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.options.data).toContain('World:Countries');
                expect(serviceResult.result.featureCount).toEqual(1);
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                expect(serviceResult.result.features.type).toEqual('FeatureCollection');
                expect(serviceResult.result.features.features[0].id).toEqual(127);
                expect(serviceResult.result.features.features[0].type).toEqual('Feature');
                expect(serviceResult.result.features.features[0].geometry.type).toEqual('MultiPolygon');
                var coordinates = serviceResult.result.features.features[0].geometry.coordinates;
                expect(coordinates.length).toBeGreaterThan(0);
                for (var i = 0; i < coordinates.length; i++) {
                    expect(coordinates[i][0].length).toBeGreaterThan(0);
                    for (var j = 0; j < coordinates[i][0].length; j++) {
                        expect(coordinates[i][0][j].length).toEqual(2);
                    }
                }
                done();
            } catch (e) {
                console.log("'getFeaturesByIDs'案例失败" + e.name + ':' + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    it('GetFeaturesByIDsParameters:targetEpsgCode', done => {
        var idsParam = new GetFeaturesByIDsParameters({
            IDs: [247],
            datasetNames: ['World:Countries'],
            targetEpsgCode: 4326
        });
        var service = new FeatureService(url);

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetEpsgCode).toEqual(4326);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByIDs(idsParam, result => {
            serviceResult = result;
            idsParam.destroy();
            done();
        });
    });
    it('GetFeaturesByIDsParameters:targetPrj', done => {
        var idsParam = new GetFeaturesByIDsParameters({
            IDs: [247],
            datasetNames: ['World:Countries'],
            targetPrj: { epsgCode: 4326 }
        });
        var service = new FeatureService(url);

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetPrj.epsgCode).toEqual(4326);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByIDs(idsParam, result => {
            serviceResult = result;
            idsParam.destroy();
            done();
        });
    });
    it('MetricsAggParameter', done => {
        var aggregations = new MetricsAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var idsParam = new GetFeaturesByIDsParameters({
            IDs: [247],
            datasetNames: ['World:Countries'],
            targetPrj: { epsgCode: 4326 },
            aggregations: aggregations
        });
        var service = new FeatureService(url);

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.aggregations.aggName).toEqual('test');
            expect(paramsObj.aggregations.aggFieldName).toEqual('SMID');
            expect(paramsObj.aggregations.aggType).toEqual('avg');
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByIDs(idsParam, result => {
            serviceResult = result;
            idsParam.destroy();
            done();
        });
    });
    it('GeoHashGridAggParameter', done => {
        var aggregations = new GeoHashGridAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var idsParam = new GetFeaturesByIDsParameters({
            IDs: [247],
            datasetNames: ['World:Countries'],
            targetPrj: { epsgCode: 4326 },
            aggregations: aggregations
        });
        var service = new FeatureService(url);

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.aggregations.aggName).toEqual('test');
            expect(paramsObj.aggregations.aggFieldName).toEqual('SMID');
            expect(paramsObj.aggregations.aggType).toEqual('geohash_grid');
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByIDs(idsParam, result => {
            serviceResult = result;
            idsParam.destroy();
            done();
        });
    });
});
