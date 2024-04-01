import mapboxgl from 'mapbox-gl';
import { FeatureService } from '../../../src/mapboxgl/services/FeatureService';
import { GetFeaturesByBufferParameters } from '../../../src/common/iServer/GetFeaturesByBufferParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = 'http://supermap:8090/iserver/services/data-world/rest/data';

describe('mapboxgl_FeatureService_getFeaturesByBuffer', () => {
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

    //数据集Buffer查询服务
    it('getFeaturesByBuffer_geometry', done => {
        var queryBufferGeometry = {
            type: 'Polygon',
            coordinates: [
                [
                    [-20, 20],
                    [-20, -20],
                    [20, -20],
                    [20, 20],
                    [-20, 20]
                ]
            ]
        };
        var bufferParam = new GetFeaturesByBufferParameters({
            datasetNames: ['World:Capitals'],
            bufferDistance: 10,
            geometry: queryBufferGeometry,
            fromIndex: 1,
            toIndex: 3
        });
        var service = new FeatureService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + '/featureResults?fromIndex=1&toIndex=3&returnContent=true');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.datasetNames[0]).toBe('World:Capitals');
            expect(paramsObj.bufferDistance).toEqual(10);
            expect(paramsObj.getFeatureMode).toBe('BUFFER');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByBuffer(bufferParam, testResult => {
            serviceResult = testResult;
            expect(service).not.toBeNull();
            expect(serviceResult.type).toBe('processCompleted');
            expect(serviceResult.object.format).toBe('GEOJSON');
            var result = serviceResult.result;
            expect(result.succeed).toBe(true);
            expect(result.featureCount).toEqual(1);
            expect(result.totalCount).toEqual(1);
            expect(serviceResult.result.features.type).toEqual('FeatureCollection');
            var features = result.features.features;
            expect(features.length).toEqual(1);
            expect(features[0].id).toEqual(127);
            for (var i = 0; i < features.length; i++) {
                expect(features[i].type).toEqual('Feature');
                expect(features[i].properties).not.toBeNull();
                expect(features[i].geometry.type).toEqual('MultiPolygon');
                expect(features[i].geometry.coordinates.length).toEqual(2);
            }
            bufferParam.destroy();
            done();
        });
    });
    it('GetFeaturesByBufferParameters:targetEpsgCode', done => {
        var queryBufferGeometry = {
            type: 'Polygon',
            coordinates: [
                [
                    [-20, 20],
                    [-20, -20],
                    [20, -20],
                    [20, 20],
                    [-20, 20]
                ]
            ]
        };
        var bufferParam = new GetFeaturesByBufferParameters({
            datasetNames: ['World:Capitals'],
            bufferDistance: 10,
            geometry: queryBufferGeometry,
            targetEpsgCode: 4326
        });
        var service = new FeatureService(url);

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetEpsgCode).toEqual(4326);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByBuffer(bufferParam, result => {
            serviceResult = result;
            bufferParam.destroy();
            done();
        });
    });
    it('GetFeaturesByBufferParameters:targetPrj', done => {
        var queryBufferGeometry = {
            type: 'Polygon',
            coordinates: [
                [
                    [-20, 20],
                    [-20, -20],
                    [20, -20],
                    [20, 20],
                    [-20, 20]
                ]
            ]
        };
        var bufferParam = new GetFeaturesByBufferParameters({
            datasetNames: ['World:Capitals'],
            bufferDistance: 10,
            geometry: queryBufferGeometry,
            targetPrj: { epsgCode: 4326 }
        });
        var service = new FeatureService(url);

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetPrj.epsgCode).toEqual(4326);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByBuffer(bufferParam, result => {
            serviceResult = result;
            bufferParam.destroy();
            done();
        });
    });
    it('getFeaturesByBuffer_geometry_mapboxglPoint', done => {
        var queryBufferGeometry = new mapboxgl.Point(-77, 38);
        var bufferParam = new GetFeaturesByBufferParameters({
            datasetNames: ['World:Capitals'],
            bufferDistance: 10,
            geometry: queryBufferGeometry,
            fromIndex: 1,
            toIndex: 3
        });
        var service = new FeatureService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + '/featureResults?fromIndex=1&toIndex=3&returnContent=true');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.geometry).not.toBeFalsy();
            expect(paramsObj.geometry.points.length).toBe(1);
            expect(paramsObj.geometry.points[0].x).toBe(-77)
            expect(paramsObj.geometry.points[0].y).toBe(38)
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByBuffer(bufferParam, testResult => {
            serviceResult = testResult;
            var result = serviceResult.result;
            expect(result.succeed).toBe(true);
            expect(result.featureCount).toEqual(1);
            expect(result.totalCount).toEqual(1);
            expect(serviceResult.result.features.type).toEqual('FeatureCollection');
            bufferParam.destroy();
            done();
        });
    });
    it('getFeaturesByBuffer_geometry_mapboxglLatlng', done => {
        var queryBufferGeometry = new mapboxgl.LngLat(-77, 38);
        var bufferParam = new GetFeaturesByBufferParameters({
            datasetNames: ['World:Capitals'],
            bufferDistance: 10,
            geometry: queryBufferGeometry,
            fromIndex: 1,
            toIndex: 3
        });
        var service = new FeatureService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + '/featureResults?fromIndex=1&toIndex=3&returnContent=true');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.geometry).not.toBeFalsy();
            expect(paramsObj.geometry.points.length).toBe(1);
            expect(paramsObj.geometry.points[0].x).toBe(-77);
            expect(paramsObj.geometry.points[0].y).toBe(38);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        service.getFeaturesByBuffer(bufferParam, testResult => {
            serviceResult = testResult;
            var result = serviceResult.result;
            expect(result.succeed).toBe(true);
            expect(result.featureCount).toEqual(1);
            expect(result.totalCount).toEqual(1);
            expect(serviceResult.result.features.type).toEqual('FeatureCollection');
            bufferParam.destroy();
            done();
        });
    });

    it('getFeaturesCount', done => {
      var queryBufferGeometry = {
        type: 'Polygon',
        coordinates: [
            [
                [-20, 20],
                [-20, -20],
                [20, -20],
                [20, 20],
                [-20, 20]
            ]
        ]
    };
    var bufferParam = new GetFeaturesByBufferParameters({
        datasetNames: ['World:Capitals'],
        bufferDistance: 10,
        geometry: queryBufferGeometry,
        fromIndex: 1,
        toIndex: 3
    });
    var service = new FeatureService(url);
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
        expect(method).toBe('POST');
        expect(testUrl).toBe(url + '/featureResults?fromIndex=1&toIndex=3&returnCountOnly=true&returnContent=true');
        var paramsObj = JSON.parse(params.replace(/'/g, '"'));
        expect(paramsObj.datasetNames[0]).toBe('World:Capitals');
        expect(paramsObj.bufferDistance).toEqual(10);
        expect(paramsObj.getFeatureMode).toBe('BUFFER');
        expect(options).not.toBeNull();
        return Promise.resolve(new Response(JSON.stringify({
          "features": null,
          "featureUriList": null,
          "datasetInfos": null,
          "totalCount": 1889,
          "featureCount": 20
      })));
    });
    service.getFeaturesCount(bufferParam, testResult => {
        serviceResult = testResult;
        expect(serviceResult.result).not.toBeNull();
        expect(serviceResult.result.succeed).toBeTruthy();
        expect(serviceResult.result.totalCount).toEqual(1889);
        expect(serviceResult.result.features).toBe(null);
        bufferParam.destroy();
        done();
    });
  });

  it('getFeaturesDatasetInfo', done => {
    var queryBufferGeometry = {
      type: 'Polygon',
      coordinates: [
          [
              [-20, 20],
              [-20, -20],
              [20, -20],
              [20, 20],
              [-20, 20]
          ]
      ]
  };
  var bufferParam = new GetFeaturesByBufferParameters({
      datasetNames: ['World:Capitals'],
      bufferDistance: 10,
      geometry: queryBufferGeometry,
      fromIndex: 1,
      toIndex: 3
  });
  var service = new FeatureService(url);
  spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe('POST');
      expect(testUrl).toBe(url + '/featureResults?fromIndex=1&toIndex=3&returnDatasetInfoOnly=true&returnContent=true');
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.datasetNames[0]).toBe('World:Capitals');
      expect(paramsObj.bufferDistance).toEqual(10);
      expect(paramsObj.getFeatureMode).toBe('BUFFER');
      expect(options).not.toBeNull();
      return Promise.resolve(new Response(JSON.stringify(getReturnDatasetInfoOnlyResult)));
  });
    service.getFeaturesDatasetInfo(bufferParam, testResult => {
        serviceResult = testResult;
        expect(serviceResult.type).toBe('processCompleted');
        expect(serviceResult.result).not.toBeNull();
        expect(serviceResult.result.succeed).toBeTruthy();
        expect(serviceResult.result[0].datasetName).toBe("World:Countries");
        expect(serviceResult.result[0].fieldInfos.length).toEqual(13);
        bufferParam.destroy();
        done();
    });
  });
});
