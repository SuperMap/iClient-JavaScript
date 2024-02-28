import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {DatasetSurfaceAnalystParameters} from '../../../src/common/iServer/DatasetSurfaceAnalystParameters';
import {SurfaceAnalystParametersSetting} from '../../../src/common/iServer/SurfaceAnalystParametersSetting';
import {SmoothMethod} from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import Polygon from 'ol/geom/Polygon';

var originalTimeout, serviceResults;
var sampleServiceUrl = GlobeParameter.spatialAnalystURL;
describe('openlayers_SpatialAnalystService_surfaceAnalysis', () => {
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //表面分析(提取等值线)
    it('surfaceAnalysis', (done) => {
        var region = new Polygon([[
            [0, 4010338],
            [1063524, 4010338],
            [1063524, 3150322],
            [0, 3150322]
        ]]);
        var surfaceAnalystParameters = new DatasetSurfaceAnalystParameters({
            extractParameter: new SurfaceAnalystParametersSetting({
                datumValue: 0,
                interval: 2,
                resampleTolerance: 0,
                smoothMethod: SmoothMethod.BSPLINE,
                smoothness: 3,
                clipRegion: region
            }),
            dataset: "SamplesP@Interpolation",
            resolution: 3000,
            zValueFieldName: "AVG_TMP"
        });
        //创建表面分析服务实例
        var surfaceAnalystService = new SpatialAnalystService(sampleServiceUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(sampleServiceUrl + "/datasets/SamplesP@Interpolation/isoline?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.extractParameter.datumValue).toEqual(0);
            expect(paramsObj.extractParameter.smoothness).toEqual(3);
            expect(paramsObj.extractParameter.resampleTolerance).toEqual(0);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(surfaceAnalystEscapedJson));
        });
        surfaceAnalystService.surfaceAnalysis(surfaceAnalystParameters, (surfaceAnalystServiceResult) => {
            serviceResults = surfaceAnalystServiceResult;
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.recordset).not.toBeNull();
            done();
        });
    });
});