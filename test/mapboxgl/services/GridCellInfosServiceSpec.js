require('../../../src/mapboxgl/services/GridCellInfosService');
var mapboxgl = require('mapbox-gl');

var url = GlobeParameter.dataServiceURL;
//数据栅格查询服务
describe('mapboxgl_GridCellInfosService', function () {
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
    it('getGridCellInfos_test', function (done) {
        var getGridCellInfosParam = new SuperMap.GetGridCellInfosParameters({
            dataSourceName: "World",
            datasetName: "WorldEarth",
            X: 4,
            Y: 20
        });
        var service = new mapboxgl.supermap.GridCellInfosService(url);
        service.getGridCellInfos(getGridCellInfosParam, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.dataSourceName).toEqual("World");
                expect(serviceResult.object.datasetName).toEqual("WorldEarth");
                expect(serviceResult.object.options.method).toEqual("GET");
                expect(serviceResult.result.centerPoint.x).toEqual(4);
                expect(serviceResult.result.centerPoint.y).toEqual(20);
                expect(serviceResult.result.color).not.toBeNull();
                expect(serviceResult.result.column).toEqual(1046);
                expect(serviceResult.result.row).toEqual(398);
                expect(serviceResult.result.value).toEqual(12295026);
                done();
            } catch (e) {
                console.log("'getGridCellInfos_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)

    })
});