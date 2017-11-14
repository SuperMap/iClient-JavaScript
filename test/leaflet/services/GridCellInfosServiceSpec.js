require('../../../src/leaflet/services/GridCellInfosService');

var url = GlobeParameter.dataServiceURL;
describe('leaflet_GridCellInfosService', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('initialize', function () {
        var gridCellInfosService = L.supermap.gridCellInfosService(url);
        expect(gridCellInfosService.url).toEqual(url);
    });

    it('getGridCellInfos', function () {
        var params = new SuperMap.GetGridCellInfosParameters({
            dataSourceName: "World",
            datasetName: "WorldEarth",
            X: 4,
            Y: 20
        });
        L.supermap.gridCellInfosService(url).getGridCellInfos(params, function (serviceResult) {
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.result.succeed).toBeTruthy();
            expect(serviceResult.result.centerPoint).not.toBeUndefined();
            expect(serviceResult.result.color).not.toBeUndefined();
            expect(serviceResult.result.column).not.toBeUndefined();
            expect(serviceResult.result.row).not.toBeUndefined();
            expect(serviceResult.result.value).not.toBeUndefined();
            expect(serviceResult.object.options.method).toBe("GET");
            expect(serviceResult.object.options.X).toEqual(4);
            expect(serviceResult.object.options.Y).toEqual(20);
            expect(serviceResult.object.options.dataSourceName).toBe("World");
            expect(serviceResult.object.options.datasetName).toBe("WorldEarth");
            expect(serviceResult.object.options.datasetType).toBe("IMAGE");
            params.destroy();
        });
    });
});
