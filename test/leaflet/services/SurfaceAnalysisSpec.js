import {spatialAnalystService} from '../../../src/leaflet/services/SpatialAnalystService';
import {DatasetSurfaceAnalystParameters} from '../../../src/common/iServer/DatasetSurfaceAnalystParameters';
import {SurfaceAnalystParametersSetting} from '../../../src/common/iServer/SurfaceAnalystParametersSetting';
import {SmoothMethod} from '../../../src/common/REST';

var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
var options = {
    serverType: 'iServer'
};
describe('leaflet_SpatialAnalystService_surfaceAnalysis', ()=> {
    var serviceResult;
    var originalTimeout;
    beforeEach(()=> {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(()=> {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('surfaceAnalysis', (done)=> {
        var region = L.polygon([
            [4010338, 0],
            [4010338, 1063524],
            [3150322, 1063524],
            [3150322, 0]
        ]);
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
        var surfaceAnalystService = spatialAnalystService(spatialAnalystURL, options);
        surfaceAnalystService.surfaceAnalysis(surfaceAnalystParameters, (result)=> {
            serviceResult = result;

        });
        setTimeout(()=> {
            try {
                expect(surfaceAnalystService).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBe(true);
                var recordset = serviceResult.result.recordset;
                expect(recordset).not.toBeNull();
                expect(recordset.features).not.toBeNull();
                expect(recordset.features.type).toEqual('FeatureCollection');
                var features = recordset.features.features;
                expect(features.length).toBeGreaterThan(0);
                expect(features[0].id).not.toBeNull();
                expect(features[0].type).toEqual("Feature");
                expect(features[0].geometry.type).toEqual("LineString");
                expect(features[0].geometry.coordinates.length).toBeGreaterThan(0);
                for (var i = 0; i < features[0].geometry.coordinates.length; i++) {
                    expect(features[0].geometry.coordinates[i].length).toEqual(2)
                }
                expect(features[0].properties).not.toBeNull();
                expect(recordset.fields.length).toEqual(recordset.fieldTypes.length);
                expect(recordset.fieldCaptions.length).toEqual(recordset.fields.length);
                surfaceAnalystService.destroy();
                done();
            } catch (exception) {
                console.log("'surfaceAnalysis'案例失败" + exception.name + ":" + exception.message);
                surfaceAnalystService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });
});