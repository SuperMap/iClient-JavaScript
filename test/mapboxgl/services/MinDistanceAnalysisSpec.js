import {SpatialAnalystService} from '../../../src/mapboxgl/services/SpatialAnalystService';
import {DatasetMinDistanceAnalystParameters} from '../../../src/common/iServer/DatasetMinDistanceAnalystParameters';
import {GeometryMinDistanceAnalystParameters} from '../../../src/common/iServer/GeometryMinDistanceAnalystParameters';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';

var url = GlobeParameter.spatialAnalystURL;
var options = {

};
describe('mapboxgl_SpatialAnalystService_minDistanceAnalysis', () => {
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

    // 最短距离分析
    it('minDistanceAnalysis_byDatasets', (done) => {
        var datasetMinDistanceAnalystParameters = new DatasetMinDistanceAnalystParameters({
          dataset: "SamplesP@Interpolation",
          createResultDataset:false,
          referenceDatasetName:"Bounds@Interpolation",
          minDistance:0,
          maxDistance:-1,
          resultDatasetName:"minDistanceBounds",
          resultDatasourceName:"Interpolation"
        });
        var service = new SpatialAnalystService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/datasets/SamplesP@Interpolation/mindistance?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.dataset).toBe("SamplesP@Interpolation");
            expect(paramsObj.createResultDataset).toBeFalsy();
            return Promise.resolve(new Response((JSON.stringify(minDistanceAnalystEscapedJson))));
        });
        service.minDistanceAnalysis(datasetMinDistanceAnalystParameters, (result) => {
            serviceResult = result;
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.result.distanceResults[0].distance).toBe(1941565.658677927);
                done();
            } catch (e) {
                console.log("'minDistanceAnalysis_byDatasets'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    it('minDistanceAnalysis_byGeometry', (done) => {
        var pointGeometryData = {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [116, 40]
          }
        };
        var geometryMinDistanceAnalystParameters = new GeometryMinDistanceAnalystParameters({
            inputGeometries:[pointGeometryData],
            referenceDatasetName:"Bounds@Interpolation",
            createResultDataset:false,
            minDistance:0,
            maxDistance:-1,
        });
        var service = new SpatialAnalystService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
          expect(method).toBe("POST");
          expect(testUrl).toBe(url + "/geometry/mindistance?returnContent=true");
          var paramsObj = JSON.parse(params.replace(/'/g, "\""));
          expect(paramsObj.createResultDataset).toBeFalsy();
          expect(paramsObj.inputGeometries.length).toEqual(1);
          return Promise.resolve(new Response((JSON.stringify(minDistanceAnalystEscapedJson))));
        });
        service.minDistanceAnalysis(geometryMinDistanceAnalystParameters, (result) => {
            serviceResult = result;
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.result.distanceResults[0].distance).toBe(1941565.658677927);
                done();
            } catch (e) {
                console.log("'minDistanceAnalysis_byGeometry'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});