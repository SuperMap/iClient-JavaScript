import {SpatialAnalystService} from '../../../src/mapboxgl/services/SpatialAnalystService';
import {DatasetSurfaceAnalystParameters} from '../../../src/common/iServer/DatasetSurfaceAnalystParameters';
import {SurfaceAnalystParametersSetting} from '../../../src/common/iServer/SurfaceAnalystParametersSetting';
import { DataReturnOption} from '../../../src/common/iServer/DataReturnOption';
import {SmoothMethod} from '../../../src/common/REST';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

var url = "http://supermap:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst";
var options = {
    serverType: 'iServer'
};
describe('mapboxgl_SpatialAnalystService_surfaceAnalysis', () => {
    var serviceResult = null;
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        serviceResult = null;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //表面分析
    it('surfaceAnalysis', (done) => {
        var datasetSurfaceAnalystParams = new DatasetSurfaceAnalystParameters({
            dataset: "SamplesP@Interpolation",
            //获取或设置用于提取操作的字段名称
            zValueFieldName: "AVG_TMP",
            //获取或设置表面分析参数
            extractParameter: new SurfaceAnalystParametersSetting({
                datumValue: 0,
                interval: 2,
                resampleTolerance: 0,
                smoothMethod: SmoothMethod.BSPLINE,
                smoothness: 3,
                clipRegion: null
            }),
            resolution: 3000,
            resultSetting: new DataReturnOption({expectCount: 1})
        });
        var service = new SpatialAnalystService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + "/datasets/SamplesP@Interpolation/isoline.json?returnContent=true");
            var expectParams = "{'resolution':3000,'extractParameter':{'clipRegion':null,'datumValue':0,'expectedZValues':null,'interval':2,'resampleTolerance':0,'smoothMethod':\"BSPLINE\",'smoothness':3},'resultSetting':{'expectCount':1,'dataset':null,'dataReturnMode':\"RECORDSET_ONLY\",'deleteExistResultDataset':true},'zValueFieldName':\"AVG_TMP\",'filterQueryParameter':{'attributeFilter':null,'name':null,'joinItems':null,'linkItems':null,'ids':null,'orderBy':null,'groupBy':null,'fields':null}}";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(surfaceAnalystEscapedJson));
        });
        service.surfaceAnalysis(datasetSurfaceAnalystParams, (result) => {
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
            datasetSurfaceAnalystParams.destroy();
            done();
        });
    });
});