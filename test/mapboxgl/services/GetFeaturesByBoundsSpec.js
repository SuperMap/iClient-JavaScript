import { FeatureService } from '../../../src/mapboxgl/services/FeatureService';
import { GetFeaturesByBoundsParameters } from '../../../src/common/iServer/GetFeaturesByBoundsParameters';
import { MetricsAggParameter } from '../../../src/common/iServer/MetricsAggParameter';
import { GeoHashGridAggParameter } from '../../../src/common/iServer/GeoHashGridAggParameter';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import mapboxgl from 'mapbox-gl';

var url = 'http://supermap:8090/iserver/services/data-world/rest/data';

describe('mapboxgl_FeatureService_getFeaturesByBounds', () => {
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
        var sw = new mapboxgl.LngLat(-20, -20);
        var ne = new mapboxgl.LngLat(20, 20);
        var lngLatBounds = new mapboxgl.LngLatBounds(sw, ne);
        var boundsParam = new GetFeaturesByBoundsParameters({
            datasetNames: ['World:Capitals'],
            bounds: lngLatBounds,
            fromIndex: 1,
            toIndex: 3
        });
        var service = new FeatureService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + '/featureResults?returnContent=true&fromIndex=1&toIndex=3');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.datasetNames[0]).toBe('World:Capitals');
            expect(paramsObj.getFeatureMode).toBe('BOUNDS');
            expect(paramsObj.spatialQueryMode).toBe('CONTAIN');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByBounds(boundsParam, testResult => {
            serviceResult = testResult;
            expect(service).not.toBeNull();
            expect(serviceResult.type).toBe('processCompleted');
            expect(serviceResult.object.format).toBe('GEOJSON');
            var result = serviceResult.result;
            expect(result.succeed).toBe(true);
            expect(result.featureCount).toEqual(1);
            expect(result.totalCount).toEqual(1);
            expect(result.features.type).toEqual('FeatureCollection');
            var features = result.features.features;
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
        var sw = new mapboxgl.LngLat(-20, -20);
        var ne = new mapboxgl.LngLat(20, 20);
        var lngLatBounds = new mapboxgl.LngLatBounds(sw, ne);
        var boundsParam = new GetFeaturesByBoundsParameters({
            datasetNames: ['World:Capitals'],
            bounds: lngLatBounds,
            targetEpsgCode: 4326
        });
        var service = new FeatureService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetEpsgCode).toEqual(4326);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByBounds(boundsParam, result => {
            serviceResult = result;
            boundsParam.destroy();
            done();
        });
    });
    it('GetFeaturesByBoundsParameters:targetPrj', done => {
        var sw = new mapboxgl.LngLat(-20, -20);
        var ne = new mapboxgl.LngLat(20, 20);
        var lngLatBounds = new mapboxgl.LngLatBounds(sw, ne);
        var boundsParam = new GetFeaturesByBoundsParameters({
            datasetNames: ['World:Capitals'],
            bounds: lngLatBounds,
            targetPrj: { epsgCode: 4326 }
        });
        var service = new FeatureService(url);

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetPrj.epsgCode).toEqual(4326);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByBounds(boundsParam, result => {
            serviceResult = result;
            boundsParam.destroy();
            done();
        });
    });
    it('MetricsAggParameter', done => {
        var sw = new mapboxgl.LngLat(-20, -20);
        var ne = new mapboxgl.LngLat(20, 20);
        var lngLatBounds = new mapboxgl.LngLatBounds(sw, ne);
        var aggregations = new MetricsAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var params = new GetFeaturesByBoundsParameters({
            datasetNames: ['World:Capitals'],
            bounds: lngLatBounds,
            aggregations: aggregations
        });
        var service = new FeatureService(url);
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
        var aggregations = new GeoHashGridAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var sw = new mapboxgl.LngLat(-20, -20);
        var ne = new mapboxgl.LngLat(20, 20);
        var lngLatBounds = new mapboxgl.LngLatBounds(sw, ne);
        var params = new GetFeaturesByBoundsParameters({
            datasetNames: ['World:Capitals'],
            bounds: lngLatBounds,
            aggregations: aggregations
        });
        var service = new FeatureService(url);
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
