import { FeatureService } from '../../../src/openlayers/services/FeatureService';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import { GetFeaturesByBoundsParameters } from '../../../src/common/iServer/GetFeaturesByBoundsParameters';

import Polygon from 'ol/geom/Polygon';

var featureServiceURL = 'http://supermap:8090/iserver/services/data-world/rest/data';
var options = {

};
describe('openlayers_FeatureService_getFeaturesByBounds', () => {
    var serviceResult = null;
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        serviceResult = null;
    });

    //数据集Bounds查询服务
    it('getFeaturesByBounds', done => {
        var polygon = new Polygon([
            [
                [-20, 20],
                [-20, -20],
                [20, -20],
                [20, 20],
                [-20, 20]
            ]
        ]);
        var boundsParam = new GetFeaturesByBoundsParameters({
            datasetNames: ['World:Capitals'],
            bounds: polygon.getExtent(),
            fromIndex: 1,
            toIndex: 3
        });
        var getFeaturesByBoundsService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(featureServiceURL + '/featureResults?returnContent=true&fromIndex=1&toIndex=3');
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.datasetNames[0]).toBe('World:Capitals');
            expect(paramsObj.getFeatureMode).toBe('BOUNDS');
            expect(paramsObj.spatialQueryMode).toBe('CONTAIN');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesByBoundsService.getFeaturesByBounds(boundsParam, testResult => {
            serviceResult = testResult;
            expect(getFeaturesByBoundsService).not.toBeNull();
            expect(serviceResult.type).toBe('processCompleted');
            var result = serviceResult.result;
            expect(result.succeed).toBe(true);
            expect(result.featureCount).not.toBeNull();
            expect(result.totalCount).toEqual(1);
            expect(result.featureCount).toEqual(1);
            expect(result.features.type).toEqual('FeatureCollection');
            var features = result.features.features;
            expect(features).not.toBeNull();
            expect(features.length).toEqual(1);
            expect(features.length).toEqual(1);
            expect(features[0].id).toEqual(127);
            for (var i = 0; i < features.length; i++) {
                expect(features[i].type).toEqual('Feature');
                expect(features[i].properties).not.toBeNull();
                expect(features[i].geometry.type).toEqual('MultiPolygon');
                expect(features[i].geometry.coordinates.length).toEqual(2);
            }
            boundsParam.destroy();
            done();
        });
    });
    it('GetFeaturesByBoundsParameters:targetEpsgCode', done => {
        var polygon = new Polygon([
            [
                [-20, 20],
                [-20, -20],
                [20, -20],
                [20, 20],
                [-20, 20]
            ]
        ]);
        var boundsParam = new GetFeaturesByBoundsParameters({
            datasetNames: ['World:Capitals'],
            bounds: polygon.getExtent(),
            targetEpsgCode: 4326
        });
        var getFeaturesByBoundsService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetEpsgCode).toEqual(4326);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesByBoundsService.getFeaturesByBounds(boundsParam, result => {
            serviceResult = result;
            boundsParam.destroy();
            done();
        });
    });
    it('GetFeaturesByBoundsParameters:targetPrj', done => {
        var polygon = new Polygon([
            [
                [-20, 20],
                [-20, -20],
                [20, -20],
                [20, 20],
                [-20, 20]
            ]
        ]);
        var boundsParam = new GetFeaturesByBoundsParameters({
            datasetNames: ['World:Capitals'],
            bounds: polygon.getExtent(),
            targetPrj: { epsgCode: 4326 }
        });
        var getFeaturesByBoundsService = new FeatureService(featureServiceURL, options);

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetPrj.epsgCode).toEqual(4326);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesByBoundsService.getFeaturesByBounds(boundsParam, result => {
            serviceResult = result;
            boundsParam.destroy();
            done();
        });
    });
    it('MetricsAggParameter', done => {
        var aggregations = new SuperMap.MetricsAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var polygon = new Polygon([
            [
                [-20, 20],
                [-20, -20],
                [20, -20],
                [20, 20],
                [-20, 20]
            ]
        ]);
        var params = new GetFeaturesByBoundsParameters({
            datasetNames: ['World:Capitals'],
            bounds: polygon.getExtent(),
            aggregations: aggregations
        });
        var service = new FeatureService(featureServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.aggregations.aggName).toEqual('test');
            expect(paramsObj.aggregations.aggFieldName).toEqual('SMID');
            expect(paramsObj.aggregations.aggType).toEqual('avg');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByBounds(params, testResult => {
            done();
        });
    });
    it('GeoHashGridAggParameter', done => {
        var aggregations = new SuperMap.GeoHashGridAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var polygon = new Polygon([
          [
              [-20, 20],
              [-20, -20],
              [20, -20],
              [20, 20],
              [-20, 20]
          ]
      ]);
      var params = new GetFeaturesByBoundsParameters({
          datasetNames: ['World:Capitals'],
          bounds: polygon.getExtent(),
          aggregations: aggregations
      });
      var service = new FeatureService(featureServiceURL);
      spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
          expect(method).toBe('POST');
          var paramsObj = JSON.parse(params.replace(/'/g, '"'));
          expect(paramsObj.aggregations.aggName).toEqual('test');
          expect(paramsObj.aggregations.aggFieldName).toEqual('SMID');
          expect(paramsObj.aggregations.aggType).toEqual('geohash_grid');
          expect(options).not.toBeNull();
          return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
      });
      service.getFeaturesByBounds(params, testResult => {
          done();
      });
    });
});
