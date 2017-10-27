require('../../../src/openlayers/services/FieldService');

var url = GlobeParameter.dataServiceURL;
var options = {
    serverType: 'iServer'
};
describe('openlayers_FieldService', function () {
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

    //字段查询服务成功事件
    it('success:getFields', function (done) {
        var fieldParameters = new SuperMap.FieldParameters({
            datasource: "World",
            dataset: "continent_T"
        });
        var service = new ol.supermap.FieldService(url, options);
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
                console.log("'success:getFields'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //字段查询服务失败事件
    it('fail:getFields', function (done) {
        var fieldParameters = new SuperMap.FieldParameters({
            datasource: "World1",
            dataset: "continent_T"
        });
        var service = new ol.supermap.FieldService(url, options);
        service.getFields(fieldParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.datasource).toBe("World1");
                expect(serviceResult.object.dataset).toBe("continent_T");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(404);
                expect(serviceResult.error.errorMsg).toBe("数据源World1不存在，获取相应的数据服务组件失败");
                done();
            } catch (e) {
                console.log("'fail:getFields'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //字段统计服务成功事件
    it('success:getFieldStatisticsInfo', function (done) {
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
        var service = new ol.supermap.FieldService(url, options);
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
                console.log("'success:getFieldStatisticsInfo'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //字段统计服务失败事件
    it('fail:getFieldStatisticsInfo', function (done) {
        var fieldStatisticsParameters = new SuperMap.FieldStatisticsParameters({
            datasource: "World1",
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
        var service = new ol.supermap.FieldService(url, options);
        service.getFieldStatisticsInfo(fieldStatisticsParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(service.currentStatisticResult).not.toBeNull();
                expect(service.currentStatisticResult.AVERAGE).toBeNull();
                expect(service.currentStatisticResult.MAX).toBeNull();
                expect(service.currentStatisticResult.MIN).toBeNull();
                expect(service.currentStatisticResult.STDDEVIATION).toBeNull();
                expect(service.currentStatisticResult.SUM).toBeNull();
                expect(service.currentStatisticResult.VARIANCE).toBeNull();
                expect(service.currentStatisticResult.fieldName).toEqual("SmID");
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processFailed");
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(404);
                expect(serviceResult.error.errorMsg).toBe("数据源World1不存在，获取相应的数据服务组件失败");
                done();
            } catch (e) {
                console.log("'fail:getFieldStatisticsInfo'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});