require('../../../src/leaflet/services/spatialAnalystService');

var spatialAnalystURL = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    serverType: 'iServer'
};
describe('leaflet_SpatialAnalystService_generateSpatialData', function () {
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

    it('generateSpatialData', function (done) {
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
                dataset: "generateSpatialData_leafletTest",
                deleteExistResultDataset: true,
                dataReturnMode: SuperMap.DataReturnMode.DATASET_ONLY
            })
        });
        var generateSpatialDataService = L.supermap.spatialAnalystService(spatialAnalystURL, options);
        generateSpatialDataService.generateSpatialData(generateSpatialDataParameters, function (result) {
            serviceResult = result;

        });
        setTimeout(function () {
            try {
                expect(generateSpatialDataService).not.toBeNull();
                expect(generateSpatialDataService.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.dataset).toEqual("generateSpatialData_leafletTest@Changchun");
                generateSpatialDataService.destroy();
                done();
            } catch (exception) {
                console.log("'generateSpatialData_test'案例失败" + exception.name + ":" + exception.message);
                generateSpatialDataService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});