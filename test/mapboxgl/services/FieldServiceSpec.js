require('../../../src/mapboxgl/services/FieldService');
var mapboxgl = require('mapbox-gl');

var url = GlobeParameter.dataServiceURL;
describe('mapboxgl_FieldService', function () {
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
    
    //字段查询服务
    it('getFields_test', function (done) {
        var fieldParameters = new SuperMap.FieldParameters({
            datasource: "World",
            dataset: "continent_T"
        });
        var service = new mapboxgl.supermap.FieldService(url);
        service.getFields(fieldParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.datasource).toEqual("World");
                expect(serviceResult.object.dataset).toEqual("continent_T");
                expect(serviceResult.result.childUriList.length).toEqual(7);
                expect(serviceResult.result.fieldNames.length).toEqual(7);
                expect(serviceResult.result.fieldNames[0]).toEqual("SmID");
                done();
            } catch (e) {
                console.log("'getFields_test'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //字段统计服务
    it('getFieldStatisticsInfo_test', function (done) {
        var fieldStatisticsParameters = new SuperMap.FieldStatisticsParameters({
            datasource: "World",
            dataset: "Countries",
            fieldName: "SmID",
            //字段统计方法类型
            statisticMode: [
                SuperMap.StatisticMode.MAX,
                SuperMap.StatisticMode.MIN,
                SuperMap.StatisticMode.SUM,
                SuperMap.StatisticMode.AVERAGE,
                SuperMap.StatisticMode.STDDEVIATION,
                SuperMap.StatisticMode.VARIANCE
            ]
        });
        var service = new mapboxgl.supermap.FieldService(url);
        service.getFieldStatisticsInfo(fieldStatisticsParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(service.currentStatisticResult).not.toBeNull();
                expect(service.currentStatisticResult.AVERAGE).toEqual(124);
                expect(service.currentStatisticResult.MAX).toEqual(247);
                expect(service.currentStatisticResult.MIN).toEqual(1);
                expect(service.currentStatisticResult.STDDEVIATION).toEqual(71.44695001654492);
                expect(service.currentStatisticResult.SUM).toEqual(30628);
                expect(service.currentStatisticResult.VARIANCE).toEqual(5104.666666666667);
                expect(service.currentStatisticResult.fieldName).toEqual("SmID");
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.result.AVERAGE).toEqual(124);
                expect(serviceResult.result.MAX).toEqual(247);
                expect(serviceResult.result.MIN).toEqual(1);
                expect(serviceResult.result.STDDEVIATION).toEqual(71.44695001654492);
                expect(serviceResult.result.SUM).toEqual(30628);
                expect(serviceResult.result.VARIANCE).toEqual(5104.666666666667);
                expect(serviceResult.result.fieldName).toEqual("SmID");
                done();
            } catch (e) {
                console.log("'getFieldStatisticsInfo_test'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

});