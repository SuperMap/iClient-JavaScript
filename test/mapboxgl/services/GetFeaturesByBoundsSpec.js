import {FeatureService} from '../../../src/mapboxgl/services/FeatureService';
import {GetFeaturesByBoundsParameters} from '../../../src/common/iServer/GetFeaturesByBoundsParameters';
import {FetchRequest} from '../../../src/common/util/FetchRequest';
import mapboxgl from 'mapbox-gl';

var url = "http://supermap:8090/iserver/services/data-world/rest/data";

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
    it('getFeaturesByBounds', (done) => {
        var sw = new mapboxgl.LngLat(-20, -20);
        var ne = new mapboxgl.LngLat(20, 20);
        var lngLatBounds = new mapboxgl.LngLatBounds(sw, ne);
        var boundsParam = new GetFeaturesByBoundsParameters({
            datasetNames: ["World:Capitals"],
            bounds: lngLatBounds,
            fromIndex: 1,
            toIndex: 3
        });
        var service = new FeatureService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + "/featureResults.json?returnContent=true&fromIndex=1&toIndex=3");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(getFeasByBounds));
        });
        service.getFeaturesByBounds(boundsParam, (testResult) => {
            serviceResult = testResult;
            expect(service).not.toBeNull();
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.object.format).toBe("GEOJSON");
            var result = serviceResult.result;
            expect(result.succeed).toBe(true);
            expect(result.featureCount).toEqual(24);
            expect(result.totalCount).toEqual(24);
            expect(result.features.type).toEqual("FeatureCollection");
            var features = result.features.features;
            expect(features.length).toEqual(3);
            expect(features[0].id).toEqual(19);
            expect(features[1].id).toEqual(20);
            expect(features[2].id).toEqual(21);
            for (var i = 0; i < features.length; i++) {
                expect(features[i].type).toEqual("Feature");
                expect(features[i].properties).not.toBeNull();
                expect(features[i].geometry.type).toEqual("Point");
                expect(features[i].geometry.coordinates.length).toEqual(2);
            }
            boundsParam.destroy();
            done();
        });
    });
});