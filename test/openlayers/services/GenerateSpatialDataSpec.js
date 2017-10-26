require('../../../src/openlayers/services/SpatialAnalystService');

var originalTimeout, serviceResults;
var changchunServiceUrl = GlobeParameter.spatialAnalystURL_Changchun;
describe('openlayers_SpatialAnalystService_generateSpatialData', function () {
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('generateSpatialData test', function (done) {
        var generateSpatialDataParameters = new SuperMap.GenerateSpatialDataParameters({
            routeTable: "RouteDT_road@Changchun",
            routeIDField: "RouteID",
            eventTable: "LinearEventTabDT@Changchun",
            eventRouteIDField: "RouteID",
            measureField: "",
            measureStartField: "LineMeasureFrom",
            measureEndField: "LineMeasureTo",
            measureOffsetField: "",
            errorInfoField: "",
            dataReturnOption: new SuperMap.DataReturnOption({
                expectCount: 1000,
                dataset: "generateSpatialData@Changchun",
                deleteExistResultDataset: true,
                dataReturnMode: SuperMap.DataReturnMode.DATASET_ONLY
            })
        });
        var spatialAnalystService = new ol.supermap.SpatialAnalystService(changchunServiceUrl);
        spatialAnalystService.generateSpatialData(generateSpatialDataParameters, function (serviceResult) {
            serviceResults = serviceResult;
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
        });

        setTimeout(function () {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        }, 8000);
    });
});