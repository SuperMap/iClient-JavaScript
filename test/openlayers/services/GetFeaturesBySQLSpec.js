import { FeatureService } from '../../../src/openlayers/services/FeatureService';
import { GetFeaturesBySQLParameters } from '../../../src/common/iServer/GetFeaturesBySQLParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var featureServiceURL = GlobeParameter.dataServiceURL;
var options = {
    serverType: 'iServer'
};
describe('openlayers_FeatureService_getFeaturesBySQL', () => {
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

    it('headers', () => {
        let myHeaders = new Headers();
        var getFeaturesBySQLService = new FeatureService(featureServiceURL, { headers: myHeaders });
        expect(getFeaturesBySQLService).not.toBeNull();
        expect(getFeaturesBySQLService.options).not.toBeNull();
        expect(getFeaturesBySQLService.options.headers).not.toBeNull();
    });

    //数据集SQL查询服务
    it('getFeaturesBySQL', done => {
        var sqlParam = new GetFeaturesBySQLParameters({
            queryParameter: {
                name: 'Countries@World',
                attributeFilter: 'SMID = 247'
            },
            datasetNames: ['World:Countries']
        });
        var getFeaturesBySQLService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(featureServiceURL + '/featureResults?returnContent=true&fromIndex=0&toIndex=19');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.datasetNames[0]).toBe('World:Countries');
            expect(paramsObj.getFeatureMode).toBe('SQL');
            expect(paramsObj.queryParameter.attributeFilter).toBe('SMID = 247');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesBySQLService.getFeaturesBySQL(sqlParam, result => {
            serviceResult = result;
            try {
                expect(getFeaturesBySQLService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe('processCompleted');
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.featureCount).toEqual(1);
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                expect(serviceResult.result.features.type).toEqual('FeatureCollection');
                var features = serviceResult.result.features.features;
                expect(features.length).not.toBeNull();
                expect(features[0].id).not.toBeNull();
                expect(features[0].type).toEqual('Feature');
                expect(features[0].properties.CAPITAL).toEqual('利伯维尔');
                expect(features[0].geometry.type).toEqual('MultiPolygon');
                expect(features[0].geometry.coordinates.length).toBeGreaterThan(0);
                expect(features[0].geometry.coordinates[0][0].length).toBeGreaterThan(0);
                for (var i = 0; i < features[0].geometry.coordinates[0][0].length; i++) {
                    expect(features[0].geometry.coordinates[0][0][i].length).toEqual(2);
                }
                done();
            } catch (exception) {
                console.log("'getFeaturesBySQL'案例失败" + exception.name + ':' + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    it('GetFeaturesBySQLParameters:targetEpsgCode', done => {
        var sqlParam = new GetFeaturesBySQLParameters({
            queryParameter: {
                name: 'Countries@World',
                attributeFilter: 'SMID = 247'
            },
            datasetNames: ['World:Countries'],
            targetEpsgCode: 4326
        });
        var getFeaturesBySQLService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetEpsgCode).toEqual(4326);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesBySQLService.getFeaturesBySQL(sqlParam, result => {
            serviceResult = result;
            done();
        });
    });
    it('GetFeaturesBySQLParameters:targetPrj', done => {
        var sqlParam = new GetFeaturesBySQLParameters({
            queryParameter: {
                name: 'Countries@World',
                attributeFilter: 'SMID = 247'
            },
            datasetNames: ['World:Countries'],
            targetPrj: { epsgCode: 4326 }
        });
        var getFeaturesBySQLService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetPrj.epsgCode).toEqual(4326);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesBySQLService.getFeaturesBySQL(sqlParam, result => {
            serviceResult = result;
            done();
        });
    });
    it('MetricsAggParameter', done => {
        var aggregations = new SuperMap.MetricsAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var sqlParam = new GetFeaturesBySQLParameters({
            queryParameter: {
                name: 'Countries@World',
                attributeFilter: 'SMID = 247'
            },
            datasetNames: ['World:Countries'],
            targetPrj: { epsgCode: 4326 },
            aggregations: aggregations
        });
        var getFeaturesBySQLService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.aggregations.aggName).toEqual('test');
            expect(paramsObj.aggregations.aggFieldName).toEqual('SMID');
            expect(paramsObj.aggregations.aggType).toEqual('avg');
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesBySQLService.getFeaturesBySQL(sqlParam, result => {
            serviceResult = result;
            done();
        });
    });
    it('GeoHashGridAggParameter', done => {
        var aggregations = new SuperMap.GeoHashGridAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var sqlParam = new GetFeaturesBySQLParameters({
            queryParameter: {
                name: 'Countries@World',
                attributeFilter: 'SMID = 247'
            },
            datasetNames: ['World:Countries'],
            targetPrj: { epsgCode: 4326 },
            aggregations: aggregations
        });
        var getFeaturesBySQLService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.aggregations.aggName).toEqual('test');
            expect(paramsObj.aggregations.aggFieldName).toEqual('SMID');
            expect(paramsObj.aggregations.aggType).toEqual('geohash_grid');
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesBySQLService.getFeaturesBySQL(sqlParam, result => {
            serviceResult = result;
            done();
        });
    });
});
