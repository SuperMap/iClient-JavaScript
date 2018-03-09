import {spatialAnalystService} from '../../../src/leaflet/services/SpatialAnalystService';
import {DatasetOverlayAnalystParameters} from '../../../src/common/iServer/DatasetOverlayAnalystParameters';
import {DataReturnOption} from '../../../src/common/iServer/DataReturnOption';
import {OverlayOperationType} from '../../../src/common/REST';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

var spatialAnalystURL = "http://supermap:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst";
var options = {
    serverType: 'iServer'
};
describe('leaflet_SpatialAnalystService_overlayAnalysis', () => {
    var serviceResult = null;
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        serviceResult = null;
    });

    it('overlayAnalysis', (done) => {
        var datasetOverlayAnalystParams = new DatasetOverlayAnalystParameters({
            sourceDataset: "BaseMap_R@Jingjin",
            operateDataset: "Neighbor_R@Jingjin",
            tolerance: 0,
            operation: OverlayOperationType.UNION,
            resultSetting: new DataReturnOption({expectCount: 2})
        });
        var overlayAnalystService = spatialAnalystService(spatialAnalystURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/BaseMap_R@Jingjin/overlay.json?returnContent=true");
            var expectParams = "{'operation':\"UNION\",'operateDataset':\"Neighbor_R@Jingjin\",'tolerance':0,'dataReturnOption':{'expectCount':2,'dataset':null,'dataReturnMode':\"RECORDSET_ONLY\",'deleteExistResultDataset':true},'operateDatasetFields':[],'operateDatasetFilter':{'attributeFilter':null,'name':null,'joinItems':null,'linkItems':null,'ids':null,'orderBy':null,'groupBy':null,'fields':null},'operateRegions':[],'sourceDatasetFields':[],'sourceDatasetFilter':{'attributeFilter':null,'name':null,'joinItems':null,'linkItems':null,'ids':null,'orderBy':null,'groupBy':null,'fields':null}}";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(overlayEscapedJson));
        });
        overlayAnalystService.overlayAnalysis(datasetOverlayAnalystParams, (result) => {
            serviceResult = result;
            expect(serviceResult.type).toEqual("processCompleted");
            expect(serviceResult.result.succeed).toBe(true);
            var recordset = serviceResult.result.recordset;
            expect(recordset).not.toBeNull();
            expect(recordset.features.type).toEqual("FeatureCollection");
            var features = recordset.features.features;
            expect(features.length).toEqual(2);
            for (var i = 0; i < features.length; i++) {
                expect(features[i].geometry.type).toEqual("MultiPolygon");
                expect(features[i].id).not.toBeNull();
                expect(features[i].type).toEqual("Feature");
                expect(features[i].properties).not.toBeNull();
                expect(features[i].geometry.coordinates).not.toBeNull();
                expect(features[i].geometry.coordinates.length).toBeGreaterThan(0);
                expect(features[i].geometry.coordinates[0][0].length).toBeGreaterThan(0);
                for (var j = 0; j < features[i].geometry.coordinates[0][0].length; j++) {
                    expect(features[i].geometry.coordinates[0][0][j].length).toEqual(2);
                }
            }
            expect(recordset.fieldTypes.length).toEqual(recordset.fieldCaptions.length);
            expect(recordset.fields.length).toEqual(recordset.fieldCaptions.length);
            datasetOverlayAnalystParams.destroy();
            overlayAnalystService.destroy();
            done();
        });
    });
});