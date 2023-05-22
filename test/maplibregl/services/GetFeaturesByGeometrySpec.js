import { FeatureService } from '../../../src/maplibregl/services/FeatureService';
import { GetFeaturesByGeometryParameters } from '../../../src/common/iServer/GetFeaturesByGeometryParameters';
import { MetricsAggParameter } from '../../../src/common/iServer/MetricsAggParameter';
import { GeoHashGridAggParameter } from '../../../src/common/iServer/GeoHashGridAggParameter';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import maplibregl from 'maplibre-gl';

var url = GlobeParameter.dataServiceURL;
describe('maplibregl_FeatureService_getFeaturesByGeometry', () => {
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

    //数据集几何查询服务类
    it('getFeaturesByGeometry', done => {
        var queryPolygonGeometry = {
            type: 'Polygon',
            coordinates: [
                [
                    [0, 0],
                    [-10, 30],
                    [-30, 0],
                    [0, 0]
                ]
            ]
        };
        var geometryParam = new GetFeaturesByGeometryParameters({
            datasetNames: ['World:Countries'],
            geometry: queryPolygonGeometry,
            spatialQueryMode: 'INTERSECT'
        });
        var service = new FeatureService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + '/featureResults?fromIndex=0&toIndex=19&returnContent=true');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.datasetNames[0]).toBe('World:Countries');
            expect(paramsObj.spatialQueryMode).toBe('INTERSECT');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByGeometry(geometryParam, result => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe('processCompleted');
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.options.data).toContain('World:Countries');
                expect(serviceResult.result.featureCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                expect(serviceResult.result.features.type).toEqual('FeatureCollection');
                var features = serviceResult.result.features.features[0];
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].type).toEqual('Feature');
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].geometry.type).toEqual('MultiPolygon');
                    expect(features[i].geometry.coordinates).not.toBeNull();
                }
                done();
            } catch (e) {
                console.log("'getFeaturesByGeometry'案例失败" + e.name + ':' + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    it('GetFeaturesByGeometryParameters:targetEpsgCode', done => {
        var queryPolygonGeometry = {
            type: 'Polygon',
            coordinates: [
                [
                    [0, 0],
                    [-10, 30],
                    [-30, 0],
                    [0, 0]
                ]
            ]
        };
        var geometryParam = new GetFeaturesByGeometryParameters({
            datasetNames: ['World:Countries'],
            geometry: queryPolygonGeometry,
            spatialQueryMode: 'INTERSECT',
            targetEpsgCode: 4326
        });
        var service = new FeatureService(url);

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetEpsgCode).toEqual(4326);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByGeometry(geometryParam, result => {
            serviceResult = result;
            geometryParam.destroy();
            done();
        });
    });
    it('GetFeaturesByGeometryParameters:targetPrj', done => {
        var queryPolygonGeometry = {
            type: 'Polygon',
            coordinates: [
                [
                    [0, 0],
                    [-10, 30],
                    [-30, 0],
                    [0, 0]
                ]
            ]
        };
        var geometryParam = new GetFeaturesByGeometryParameters({
            datasetNames: ['World:Countries'],
            geometry: queryPolygonGeometry,
            spatialQueryMode: 'INTERSECT',
            targetPrj: { epsgCode: 4326 }
        });
        var service = new FeatureService(url);

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetPrj.epsgCode).toEqual(4326);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByGeometry(geometryParam, result => {
            serviceResult = result;
            geometryParam.destroy();
            done();
        });
    });

    it('MetricsAggParameter', done => {
        var aggregations = new MetricsAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var queryPolygonGeometry = {
            type: 'Polygon',
            coordinates: [
                [
                    [0, 0],
                    [-10, 30],
                    [-30, 0],
                    [0, 0]
                ]
            ]
        };
        var geometryParam = new GetFeaturesByGeometryParameters({
            datasetNames: ['World:Countries'],
            geometry: queryPolygonGeometry,
            spatialQueryMode: 'INTERSECT',
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
        service.getFeaturesByGeometry(geometryParam, result => {
            serviceResult = result;
            geometryParam.destroy();
            done();
        });
    });
    it('GeoHashGridAggParameter', done => {
        var aggregations = new GeoHashGridAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var queryPolygonGeometry = {
            type: 'Polygon',
            coordinates: [
                [
                    [0, 0],
                    [-10, 30],
                    [-30, 0],
                    [0, 0]
                ]
            ]
        };
        var geometryParam = new GetFeaturesByGeometryParameters({
            datasetNames: ['World:Countries'],
            geometry: queryPolygonGeometry,
            spatialQueryMode: 'INTERSECT',
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
        service.getFeaturesByGeometry(geometryParam, result => {
            serviceResult = result;
            geometryParam.destroy();
            done();
        });
    });
    it('GetFeaturesByGeometryParameters:prjCoordSys', (done) => {
      var sw = new maplibregl.LngLat(-20, -20);
      var ne = new maplibregl.LngLat(20, 20);
      var lngLatBounds = new maplibregl.LngLatBounds(sw, ne);
      var geometryParam = new GetFeaturesByGeometryParameters({
          datasetNames: ['World:Countries'],
          geometry: lngLatBounds,
          spatialQueryMode: 'INTERSECT',
      });
      var service = new FeatureService(url);

      spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
          var paramsObj = JSON.parse(params.replace(/'/g, '"'));
          expect(paramsObj.geometry.prjCoordSys.epsgCode).toEqual(4326);
          return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
      });
      service.getFeaturesByGeometry(geometryParam, (result) => {
          serviceResult = result;
          geometryParam.destroy();
          done();
      });
  });
});
