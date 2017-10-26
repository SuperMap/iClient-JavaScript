require('../../../src/mapboxgl/services/FeatureService');
var mapboxgl = require('mapbox-gl');

var url = GlobeParameter.dataServiceURL;
var id;
var originFeature = null;
describe('mapboxgl_FeatureService_editFeatures', function () {
    var serviceResult;
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    //地物编辑服务 添加地物
    it('editFeatures_addFeature_test', function (done) {
        var pointFeature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [10, 15]
            },
            "properties": {POP: 1, CAPITAL: 'test'}
        };
        var marker = {
            "type": "FeatureCollection",
            "features": [pointFeature]
        };
        var addFeatureParams = new SuperMap.EditFeaturesParameters({
            features: marker,
            dataSourceName: "World",
            dataSetName: "Capitals",
            editType: "add",
            returnContent: true,
        });
        var service = new mapboxgl.supermap.FeatureService(url);
        service.editFeatures(addFeatureParams, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result[0]).not.toBeNull();
                id = serviceResult.result[0];
                expect(serviceResult.object.options.method).toBe("POST");
                expect(serviceResult.object.options.data).toContain('"POINT"');
                expect(serviceResult.object.options.data).toContain("'x':10");
                expect(serviceResult.object.options.data).toContain("'y':15");
                done();
            } catch (e) {
                console.log("'editFeatures_addFeature_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //地物编辑服务 删除地物
    it('editFeatures_deleteFeature_test', function (done) {
        var deleteFeatureParams = new SuperMap.EditFeaturesParameters({
            dataSourceName: "World",
            dataSetName: "Capitals",
            IDs: [id],
            editType: "delete",
        });
        var service = new mapboxgl.supermap.FeatureService(url);
        service.editFeatures(deleteFeatureParams, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.object.options.method).toBe("DELETE");
                expect(serviceResult.object.options.data).toContain(id);
                done();
            } catch (e) {
                console.log("'editFeatures_deleteFeature_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});