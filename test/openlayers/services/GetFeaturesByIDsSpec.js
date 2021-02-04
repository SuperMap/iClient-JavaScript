import { FeatureService } from '../../../src/openlayers/services/FeatureService';
import { GetFeaturesByIDsParameters } from '../../../src/common/iServer/GetFeaturesByIDsParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var featureServiceURL = GlobeParameter.dataServiceURL;
var options = {
    serverType: 'iServer'
};
describe('openlayers_FeatureService_getFeaturesByIDs', () => {
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
    // it('getFeaturesByIDs', done => {
    //     var idsParam = new GetFeaturesByIDsParameters({
    //         IDs: [246, 247],
    //         datasetNames: ['World:Countries']
    //     });
    //     var getFeaturesByIDService = new FeatureService(featureServiceURL, options);
    //     spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
    //         expect(method).toBe('POST');
    //         expect(testUrl).toBe(featureServiceURL + '/featureResults?returnContent=true&fromIndex=0&toIndex=19');
    //         var paramsObj = JSON.parse(params.replace(/'/g, '"'));
    //         expect(paramsObj.datasetNames[0]).toBe('World:Countries');
    //         expect(options).not.toBeNull();
    //         return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    //     });
    //     getFeaturesByIDService.getFeaturesByIDs(idsParam, result => {
    //         serviceResult = result;
    //         try {
    //             expect(getFeaturesByIDService).not.toBeNull();
    //             expect(serviceResult).not.toBeNull();
    //             expect(serviceResult.type).toBe('processCompleted');
    //             expect(serviceResult.result.featureCount).toEqual(1);
    //             expect(serviceResult.result.totalCount).toEqual(1);
    //             expect(serviceResult.result.succeed).toBe(true);
    //             expect(serviceResult.result.features.type).toEqual('FeatureCollection');
    //             var features = serviceResult.result.features.features;
    //             expect(features.length).toEqual(1);
    //             for (var i = 0; i < 1; i++) {
    //                 expect(features[i].id).not.toBeNull();
    //                 expect(features[i].type).toEqual('Feature');
    //                 expect(features[i].properties).not.toBeNull();
    //                 expect(features[i].properties.CAPITAL).toEqual('利伯维尔');
    //                 expect(features[i].geometry.type).toEqual('MultiPolygon');
    //                 expect(features[i].geometry.coordinates[0][0].length).toBeGreaterThan(0);
    //                 for (var j = 0; j < features[i].geometry.coordinates[0][0].length - 300; j++) {
    //                     expect(features[i].geometry.coordinates[0][0][j].length).toEqual(2);
    //                 }
    //             }
    //             done();
    //         } catch (exception) {
    //             console.log("'getFeaturesByIDs'案例失败" + exception.name + ':' + exception.message);
    //             expect(false).toBeTruthy();
    //             done();
    //         }
    //     });
    // });
    // it('GetFeaturesByIDsParameters:targetEpsgCode', done => {
    //     var idsParam = new GetFeaturesByIDsParameters({
    //         IDs: [246, 247],
    //         datasetNames: ['World:Countries'],
    //         targetEpsgCode: 4326
    //     });
    //     var getFeaturesByIDService = new FeatureService(featureServiceURL, options);
    //     spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
    //         var paramsObj = JSON.parse(params.replace(/'/g, '"'));
    //         expect(paramsObj.targetEpsgCode).toEqual(4326);
    //         return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    //     });
    //     getFeaturesByIDService.getFeaturesByIDs(idsParam, result => {
    //         serviceResult = result;
    //         done();
    //     });
    // });
    // it('GetFeaturesByIDsParameters:targetPrj', done => {
    //     var idsParam = new GetFeaturesByIDsParameters({
    //         IDs: [246, 247],
    //         datasetNames: ['World:Countries'],
    //         targetPrj: { epsgCode: 4326 }
    //     });
    //     var getFeaturesByIDService = new FeatureService(featureServiceURL, options);
    //     spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
    //         var paramsObj = JSON.parse(params.replace(/'/g, '"'));
    //         expect(paramsObj.targetPrj.epsgCode).toEqual(4326);
    //         return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    //     });
    //     getFeaturesByIDService.getFeaturesByIDs(idsParam, result => {
    //         serviceResult = result;
    //         done();
    //     });
    // });
    it('MetricsAggParameter', done => {
        var aggregations = new SuperMap.MetricsAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var idsParam = new GetFeaturesByIDsParameters({
            IDs: [246, 247],
            datasetNames: ['World:Countries'],
            targetPrj: { epsgCode: 4326 },
            aggregations: aggregations
        });
        var getFeaturesByIDService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.aggregations.aggName).toEqual('test');
            expect(paramsObj.aggregations.aggFieldName).toEqual('SMID');
            expect(paramsObj.aggregations.aggType).toEqual('avg');
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesByIDService.getFeaturesByIDs(idsParam, result => {
            serviceResult = result;
            done();
        });
    });
    it('GeoHashGridAggParameter', done => {
        var aggregations = new SuperMap.GeoHashGridAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var idsParam = new GetFeaturesByIDsParameters({
            IDs: [246, 247],
            datasetNames: ['World:Countries'],
            targetPrj: { epsgCode: 4326 },
            aggregations: aggregations
        });
        var getFeaturesByIDService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.aggregations.aggName).toEqual('test');
            expect(paramsObj.aggregations.aggFieldName).toEqual('SMID');
            expect(paramsObj.aggregations.aggType).toEqual('geohash_grid');
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesByIDService.getFeaturesByIDs(idsParam, result => {
            serviceResult = result;
            done();
        });
    });
});
