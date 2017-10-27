require('../../../src/mapboxgl/services/SpatialAnalystService');
var mapboxgl = require('mapbox-gl');

var url = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    serverType: 'iServer'
};
describe('mapboxgl_SpatialAnalystService_generateSpatialData', function () {
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

    //动态分段分析
    it('generateSpatialData', function (done) {
        var generateSpatialDataParameters = new SuperMap.GenerateSpatialDataParameters({
            routeTable: "RouteDT_road@Changchun",
            routeIDField: "RouteID",
            eventTable: "LinearEventTabDT@Changchun",
            eventRouteIDField: "RouteID",
            //用于生成空间数据的事件表的刻度字段，只有当事件为点事件的时候该属性才有意义
            measureField: "",
            measureStartField: "LineMeasureFrom", //只有当事件为线事件的时候该属性才有意义
            measureEndField: "LineMeasureTo",  //只有当事件为线事件的时候该属性才有意义
            measureOffsetField: "",
            errorInfoField: "",
            dataReturnOption: new SuperMap.DataReturnOption({
                expectCount: 1000,
                dataset: "generateSpatialData@Changchun",
                deleteExistResultDataset: true,
                dataReturnMode: SuperMap.DataReturnMode.DATASET_ONLY
            })
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
        service.generateSpatialData(generateSpatialDataParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.dataset).toEqual("generateSpatialData@Changchun");
                done();
            } catch (e) {
                console.log("'generateSpatialData'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});