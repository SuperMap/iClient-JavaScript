import ol from 'openlayers';
import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {DatasetSurfaceAnalystParameters} from '../../../src/common/iServer/DatasetSurfaceAnalystParameters';
import {SurfaceAnalystParametersSetting} from '../../../src/common/iServer/SurfaceAnalystParametersSetting';
import {SmoothMethod} from '../../../src/common/REST';

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
        var region = new ol.geom.Polygon([[
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
        surfaceAnalystService.surfaceAnalysis(surfaceAnalystParameters, (surfaceAnalystServiceResult) => {
            serviceResults = surfaceAnalystServiceResult;
        });
        setTimeout(() => {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.recordset).not.toBeNull();
            done();
        }, 8000);
    });
});