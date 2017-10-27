require('../../../src/mapboxgl/services/SpatialAnalystService');
var mapboxgl = require('mapbox-gl');

var url = GlobeParameter.spatialAnalystURL;
var options = {
    serverType: 'iServer'
};
describe('mapboxgl_SpatialAnalystService_surfaceAnalysis', function () {
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

    //表面分析
    it('surfaceAnalysis', function (done) {
        var datasetSurfaceAnalystParameters = new SuperMap.DatasetSurfaceAnalystParameters({
            dataset: "SamplesP@Interpolation",
            //获取或设置用于提取操作的字段名称
            zValueFieldName: "AVG_TMP",
            //获取或设置表面分析参数
            extractParameter: new SuperMap.SurfaceAnalystParametersSetting({
                datumValue: 0,
                interval: 2,
                resampleTolerance: 0,
                smoothMethod: SuperMap.SmoothMethod.BSPLINE,
                smoothness: 3,
                clipRegion: null
            }),
            resolution: 3000
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
        service.surfaceAnalysis(datasetSurfaceAnalystParameters, function (result) {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.recordset.features.type).toEqual("FeatureCollection");
                var features = serviceResult.result.recordset.features.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].properties.ID).toEqual(features[i].id);
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].geometry.type).toEqual("LineString");
                    expect(features[i].geometry.coordinates.length).toBeGreaterThan(2);
                    for (var j = 0; j < features[i].geometry.coordinates.length; j++) {
                        expect(features[i].geometry.coordinates[j].length).toEqual(2);
                    }
                }
                expect(serviceResult.result.recordset.fieldCaptions.length).toEqual(11);
                expect(serviceResult.result.recordset.fieldTypes.length).toEqual(serviceResult.result.recordset.fieldCaptions.length);
                expect(serviceResult.result.recordset.fields.length).toEqual(serviceResult.result.recordset.fieldCaptions.length);
                done();
            } catch (e) {
                console.log("'surfaceAnalysis'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});