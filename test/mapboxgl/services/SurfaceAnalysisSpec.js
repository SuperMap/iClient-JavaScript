require('../../../src/mapboxgl/services/SpatialAnalystService');
var mapboxgl = require('mapbox-gl');
require('../../../src/common/util/FetchRequest');

var url = "http://supermap:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst";
var options = {
    serverType: 'iServer'
};
describe('mapboxgl_SpatialAnalystService_surfaceAnalysis', function () {
    var serviceResult = null;
    var originalTimeout;
    var FetchRequest = SuperMap.FetchRequest;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        serviceResult = null;
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
            resolution: 3000,
            resultSetting: new SuperMap.DataReturnOption({expectCount: 1})
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake(function (method, testUrl, params, options) {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + "/datasets/SamplesP@Interpolation/isoline.json?returnContent=true");
            var expectParams = "{'resolution':3000,'extractParameter':{'clipRegion':null,'datumValue':0,'expectedZValues':null,'interval':2,'resampleTolerance':0,'smoothMethod':\"BSPLINE\",'smoothness':3},'resultSetting':{'expectCount':1,'dataset':null,'dataReturnMode':\"RECORDSET_ONLY\",'deleteExistResultDataset':true},'zValueFieldName':\"AVG_TMP\",'filterQueryParameter':{'attributeFilter':null,'name':null,'joinItems':null,'linkItems':null,'ids':null,'orderBy':null,'groupBy':null,'fields':null}}";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(surfaceAnalystEscapedJson));
        });
        service.surfaceAnalysis(datasetSurfaceAnalystParameters, function (result) {
            serviceResult = result;
            expect(service).not.toBeNull();
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toEqual("processCompleted");
            expect(serviceResult.result.succeed).toEqual(true);
            expect(serviceResult.result.recordset.features.type).toEqual("FeatureCollection");
            var features = serviceResult.result.recordset.features.features;
            expect(features.length).toEqual(1);
            expect(features[0].id).toEqual(2);
            expect(features[0].properties.ID).toEqual(2);
            expect(features[0].properties.ID).toEqual(2);
            expect(features[0].type).toEqual("Feature");
            expect(features[0].geometry.type).toEqual("LineString");
            expect(features[0].geometry.coordinates.length).toEqual(7);
            for (var j = 0; j < features[0].geometry.coordinates.length; j++) {
                expect(features[0].geometry.coordinates[j].length).toEqual(2);
            }
            var recordset = serviceResult.result.recordset;
            expect(recordset.fieldCaptions.length).toEqual(11);
            expect(recordset.fieldTypes.length).toEqual(11);
            expect(recordset.fields.length).toEqual(11);
            datasetSurfaceAnalystParameters.destroy();
            done();
        });
    });
});