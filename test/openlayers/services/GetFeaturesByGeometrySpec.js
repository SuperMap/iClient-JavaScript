import { FeatureService } from '../../../src/openlayers/services/FeatureService';
import { GetFeaturesByGeometryParameters } from '../../../src/common/iServer/GetFeaturesByGeometryParameters';
import { MetricsAggParameter } from '../../../src/common/iServer/MetricsAggParameter';
import { GeoHashGridAggParameter } from '../../../src/common/iServer/GeoHashGridAggParameter';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import Polygon from 'ol/geom/Polygon';

var featureServiceURL = GlobeParameter.dataServiceURL;
var options = {

};
describe('openlayers_FeatureService_getFeaturesByGeometry', () => {
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
        var polygon = new Polygon([
            [
                [0, 0],
                [-10, 30],
                [-30, 0],
                [0, 0]
            ]
        ]);
        var geometryParam = new GetFeaturesByGeometryParameters({
            datasetNames: ['World:Countries'],
            geometry: polygon,
            spatialQueryMode: 'INTERSECT'
        });
        var getFeaturesByGeometryService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(featureServiceURL + '/featureResults?fromIndex=0&toIndex=19&returnContent=true');
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.datasetNames[0]).toBe('World:Countries');
            expect(paramsObj.spatialQueryMode).toBe('INTERSECT');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesByGeometryService.getFeaturesByGeometry(geometryParam, result => {
            serviceResult = result;
            try {
                expect(getFeaturesByGeometryService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe('processCompleted');
                expect(serviceResult.result.featureCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                expect(serviceResult.result.features.type).toEqual('FeatureCollection');
                var features = serviceResult.result.features.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].type).toEqual('Feature');
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].id).toEqual(features[i].id);
                    expect(features[i].geometry.type).toEqual('MultiPolygon');
                    expect(features[i].geometry.coordinates[0][0].length).toBeGreaterThan(0);
                    for (var j = 0; j < features[i].geometry.coordinates[0][0].length; j++) {
                        expect(features[i].geometry.coordinates[0][0][j].length).toEqual(2);
                    }
                }
                done();
            } catch (exception) {
                console.log("'getFeaturesByGeometry'案例失败" + exception.name + ':' + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    it('GetFeaturesByGeometryParameters:targetEpsgCode', done => {
        var polygon = new Polygon([
            [
                [0, 0],
                [-10, 30],
                [-30, 0],
                [0, 0]
            ]
        ]);
        var geometryParam = new GetFeaturesByGeometryParameters({
            datasetNames: ['World:Countries'],
            geometry: polygon,
            spatialQueryMode: 'INTERSECT',
            targetEpsgCode: 4326
        });
        var getFeaturesByGeometryService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetEpsgCode).toEqual(4326);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesByGeometryService.getFeaturesByGeometry(geometryParam, result => {
            serviceResult = result;
            done();
        });
    });
    it('GetFeaturesByGeometryParameters:targetPrj', done => {
        var polygon = new Polygon([
            [
                [0, 0],
                [-10, 30],
                [-30, 0],
                [0, 0]
            ]
        ]);
        var geometryParam = new GetFeaturesByGeometryParameters({
            datasetNames: ['World:Countries'],
            geometry: polygon,
            spatialQueryMode: 'INTERSECT',
            targetPrj: { epsgCode: 4326 }
        });
        var getFeaturesByGeometryService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.targetPrj.epsgCode).toEqual(4326);
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesByGeometryService.getFeaturesByGeometry(geometryParam, result => {
            serviceResult = result;
            done();
        });
    });
    it('MetricsAggParameter', done => {
        var aggregations = new MetricsAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var polygon = new Polygon([
            [
                [0, 0],
                [-10, 30],
                [-30, 0],
                [0, 0]
            ]
        ]);
        var geometryParam = new GetFeaturesByGeometryParameters({
            datasetNames: ['World:Countries'],
            geometry: polygon,
            spatialQueryMode: 'INTERSECT',
            targetPrj: { epsgCode: 4326 },
            aggregations: aggregations
        });
        var getFeaturesByGeometryService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.aggregations.aggName).toEqual('test');
            expect(paramsObj.aggregations.aggFieldName).toEqual('SMID');
            expect(paramsObj.aggregations.aggType).toEqual('avg');
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesByGeometryService.getFeaturesByGeometry(geometryParam, result => {
            serviceResult = result;
            done();
        });
    });
    it('GeoHashGridAggParameter', done => {
        var aggregations = new GeoHashGridAggParameter({ aggName: 'test', aggFieldName: 'SMID' });
        var polygon = new Polygon([
            [
                [0, 0],
                [-10, 30],
                [-30, 0],
                [0, 0]
            ]
        ]);
        var geometryParam = new GetFeaturesByGeometryParameters({
            datasetNames: ['World:Countries'],
            geometry: polygon,
            spatialQueryMode: 'INTERSECT',
            targetPrj: { epsgCode: 4326 },
            aggregations: aggregations
        });
        var getFeaturesByGeometryService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.aggregations.aggName).toEqual('test');
            expect(paramsObj.aggregations.aggFieldName).toEqual('SMID');
            expect(paramsObj.aggregations.aggType).toEqual('geohash_grid');
            return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
        });
        getFeaturesByGeometryService.getFeaturesByGeometry(geometryParam, result => {
            serviceResult = result;
            done();
        });
    });

    it('getFeaturesCountOnly', done => {
      var polygon = new Polygon([
          [
              [0, 0],
              [-10, 30],
              [-30, 0],
              [0, 0]
          ]
      ]);
      var geometryParam = new GetFeaturesByGeometryParameters({
          datasetNames: ['World:Countries'],
          geometry: polygon,
          spatialQueryMode: 'INTERSECT'
      });
      var getFeaturesByGeometryService = new FeatureService(featureServiceURL, options);
      spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
          expect(method).toBe('POST');
          expect(testUrl).toBe(featureServiceURL + '/featureResults?fromIndex=0&toIndex=19&returnCountOnly=true&returnContent=true');
          var paramsObj = JSON.parse(params.replace(/'/g, '"'));
          expect(paramsObj.datasetNames[0]).toBe('World:Countries');
          expect(paramsObj.spatialQueryMode).toBe('INTERSECT');
          expect(options).not.toBeNull();
          return Promise.resolve(new Response(JSON.stringify({
            "features": null,
            "featureUriList": null,
            "datasetInfos": null,
            "totalCount": 1889,
            "featureCount": 20
        })));
      });
      getFeaturesByGeometryService.getFeaturesCount(geometryParam, result => {
          serviceResult = result;
          try {
              expect(serviceResult.result).not.toBeNull();
              expect(serviceResult.result.succeed).toBeTruthy();
              expect(serviceResult.result.totalCount).toEqual(1889);
              expect(serviceResult.result.features).toBe(null);
              done();
          } catch (exception) {
              console.log("'getFeaturesCountOnly'案例失败" + exception.name + ':' + exception.message);
              expect(false).toBeTruthy();
              done();
          }
      });
  });


  it('getFeaturesDatasetInfoOnly', done => {
    var polygon = new Polygon([
        [
            [0, 0],
            [-10, 30],
            [-30, 0],
            [0, 0]
        ]
    ]);
    var geometryParam = new GetFeaturesByGeometryParameters({
        datasetNames: ['World:Countries'],
        geometry: polygon,
        spatialQueryMode: 'INTERSECT'
    });
    var getFeaturesByGeometryService = new FeatureService(featureServiceURL, options);
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
        expect(method).toBe('POST');
        expect(testUrl).toBe(featureServiceURL + '/featureResults?fromIndex=0&toIndex=19&returnDatasetInfoOnly=true&returnContent=true');
        var paramsObj = JSON.parse(params.replace(/'/g, '"'));
        expect(paramsObj.datasetNames[0]).toBe('World:Countries');
        expect(paramsObj.spatialQueryMode).toBe('INTERSECT');
        expect(options).not.toBeNull();
        return Promise.resolve(new Response(JSON.stringify(getReturnDatasetInfoOnlyResult)));
    });
    getFeaturesByGeometryService.getFeaturesDatasetInfo(geometryParam, result => {
        serviceResult = result;
        try {
            expect(serviceResult.type).toBe('processCompleted');
            expect(serviceResult.result).not.toBeNull();
            expect(serviceResult.result.succeed).toBeTruthy();
            expect(serviceResult.result[0].datasetName).toBe("World:Countries");
            expect(serviceResult.result[0].fieldInfos.length).toEqual(13);
            done();
        } catch (exception) {
            console.log("'getFeaturesDatasetInfoOnly'案例失败" + exception.name + ':' + exception.message);
            expect(false).toBeTruthy();
            done();
        }
    });
});
});
