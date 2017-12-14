var ol = require('openlayers');
require('../../../src/openlayers/services/MeasureService');

var url = GlobeParameter.mapServiceURL + "World";
var options = {
    serverType: 'iServer'
};
describe('openlayers_MeasureService', function () {
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
    //测距, 成功事件
    it('success:measureDistance', function (done) {
        var geometry = new ol.geom.LineString([[0, 0], [10, 10]]);
        var distanceMeasureParam = new SuperMap.MeasureParameters(geometry);
        var service = new ol.supermap.MeasureService(url, options);
        service.measureDistance(distanceMeasureParam, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.area).toEqual(-1);
                expect(serviceResult.result.distance).toEqual(1565109.0991230179);
                expect(serviceResult.result.unit).toEqual("METER");
                done();
            } catch (e) {
                console.log("'success:measureDistance'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //测距, 失败事件
    it('fail:measureDistance', function (done) {
        var geometry = new ol.geom.LineString([[0, 0]]);
        var distanceMeasureParam = new SuperMap.MeasureParameters(geometry);
        var service = new ol.supermap.MeasureService(url, options);
        service.measureDistance(distanceMeasureParam, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.error.code).toBe(400);
                expect(serviceResult.error.errorMsg).toEqual("参数 point2Ds 不合法，必须至少包含两个二维点");
                done();
            } catch (e) {
                console.log("'fail:measureDistance'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //测面积, 成功事件
    it('success:measureArea', function (done) {
        var geometry = new ol.geom.Polygon([[[0, 0], [-10, 30], [-30, 0], [0, 0]]]);
        var areaMeasureParam = new SuperMap.MeasureParameters(geometry);
        var service = new ol.supermap.MeasureService(url, options);
        service.measureArea(areaMeasureParam, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.area).toEqual(5586861668611.416);
                expect(serviceResult.result.distance).toEqual(-1);
                expect(serviceResult.result.unit).toEqual("METER");
                done();
            } catch (e) {
                console.log("'success:measureArea'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //测面积, 失败事件
    it('fail:measureArea', function (done) {
        var geometry = new ol.geom.Polygon([[[0, 0]]]);
        var areaMeasureParam = new SuperMap.MeasureParameters(geometry);
        var service = new ol.supermap.MeasureService(url, options);
        service.measureArea(areaMeasureParam, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.error.code).toBe(400);
                expect(serviceResult.error.errorMsg).toEqual("传入参数 points 的长度小于3。");
                done();
            } catch (e) {
                console.log("'fail:measureArea'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});
