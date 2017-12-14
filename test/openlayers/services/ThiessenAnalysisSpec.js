var ol = require('openlayers');
require('../../../src/openlayers/services/SpatialAnalystService');

var originalTimeout, serviceResults;
var changchunServiceUrl = GlobeParameter.spatialAnalystURL_Changchun;
describe('openlayers_SpatialAnalystService_thiessenAnalysis', function () {
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //数据集泰森多边形
    it('thiessenAnalysis_datasets', function (done) {
        var dThiessenAnalystParameters = new SuperMap.DatasetThiessenAnalystParameters({
            dataset: "Factory@Changchun"
        });
        var spatialAnalystService = new ol.supermap.SpatialAnalystService(changchunServiceUrl);
        spatialAnalystService.thiessenAnalysis(dThiessenAnalystParameters, function (serviceResult) {
            serviceResults = serviceResult;
        });
        setTimeout(function () {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        }, 8000);
    });

    //几何泰森多边形
    it('thiessenAnalysis_geometry', function (done) {
        //创建几何泰森多边形参数
        var pointsList = [
            new ol.geom.Point([5238.998556, -1724.229865]),
            new ol.geom.Point([4996.270055, -2118.538477]),
            new ol.geom.Point([5450.34263, -2070.794081]),
            new ol.geom.Point([5317.70775, -2521.162355]),
            new ol.geom.Point([5741.149405, -1970.130198]),
            new ol.geom.Point([4716.133098, -1575.858795]),
            new ol.geom.Point([5447.671615, -2255.928819]),
            new ol.geom.Point([4783.423507, -1135.598744]),
            new ol.geom.Point([5472.712382, -2189.15344]),
            new ol.geom.Point([5752.716961, -2425.40363])
        ];
        var gThiessenAnalystParameters = new SuperMap.GeometryThiessenAnalystParameters({
            points: pointsList
        });
        //创建泰森多边形服务实例
        var spatialAnalystService = new ol.supermap.SpatialAnalystService(changchunServiceUrl);
        spatialAnalystService.thiessenAnalysis(gThiessenAnalystParameters, function (serviceResult) {
            serviceResults = serviceResult;
        });
        setTimeout(function () {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        }, 8000);
    });
});