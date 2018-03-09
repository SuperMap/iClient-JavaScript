import {FeatureService} from '../../../src/mapboxgl/services/FeatureService';
import {GetFeaturesByGeometryParameters} from '../../../src/common/iServer/GetFeaturesByGeometryParameters';

var url = GlobeParameter.dataServiceURL;
describe('mapboxgl_FeatureService_getFeaturesByGeometry', () => {
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
    it('getFeaturesByGeometry', (done) => {
        var queryPolygonGeometry = {
            "type": "Polygon",
            "coordinates": [[[0, 0], [-10, 30], [-30, 0], [0, 0]]]
        };
        var geometryParam = new GetFeaturesByGeometryParameters({
            datasetNames: ["World:Countries"],
            geometry: queryPolygonGeometry,
            spatialQueryMode: "INTERSECT"
        });
        var service = new FeatureService(url);
        service.getFeaturesByGeometry(geometryParam, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.options.data).toContain("World:Countries");
                expect(serviceResult.result.featureCount).not.toBeNull();
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
                expect(serviceResult.result.features.type).toEqual("FeatureCollection");
                var features = serviceResult.result.features.features[0];
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].geometry.type).toEqual("MultiPolygon");
                    expect(features[i].geometry.coordinates).not.toBeNull();
                }
                done();
            } catch (e) {
                console.log("'getFeaturesByGeometry'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});