require('../../../src/leaflet/services/spatialAnalystService');

var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
var options = {
    serverType: 'iServer'
};
describe('leaflet_SpatialAnalystService_overlayAnalysis', function () {
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

    it('overlayAnalysis', function (done) {
        var datasetOverlayAnalystParameters = new SuperMap.DatasetOverlayAnalystParameters({
            sourceDataset: "BaseMap_R@Jingjin",
            operateDataset: "Neighbor_R@Jingjin",
            tolerance: 0,
            operation: SuperMap.OverlayOperationType.UNION
        });
        var overlayAnalystService = L.supermap.spatialAnalystService(spatialAnalystURL, options);
        overlayAnalystService.overlayAnalysis(datasetOverlayAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(overlayAnalystService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBe(true);
                var recordset = serviceResult.result.recordset;
                expect(recordset).not.toBeNull();
                expect(recordset.features.type).toEqual("FeatureCollection");
                var features = recordset.features.features;
                expect(features).not.toBeNull();
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
                overlayAnalystService.destroy();
                done();
            } catch (exception) {
                console.log("'overlayAnalysis'案例失败" + exception.name + ":" + exception.message);
                overlayAnalystService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});