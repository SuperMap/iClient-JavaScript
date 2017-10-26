require('../../../src/mapboxgl/services/SpatialAnalystService');
var mapboxgl = require('mapbox-gl');

var url = GlobeParameter.spatialAnalystURL;
var options = {
    serverType: 'iServer'
};
describe('mapboxgl_SpatialAnalystService_interpolationAnalysis', function () {
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

    //插值分析 点密度插值分析
    it('interpolationAnalysis_density_test', function (done) {
        var interpolationAnalystParameters = new SuperMap.InterpolationDensityAnalystParameters({
            dataset: "SamplesP@Interpolation",
            //插值分析结果数据集的名称
            outputDatasetName: "Density_Result",
            //插值分析结果数据源的名称
            outputDatasourceName: "Interpolation",
            //结果栅格数据集存储的像素格式
            pixelFormat: SuperMap.PixelFormat.DOUBLE,
            //插值结果栅格数据集的分辨率
            resolution: 3000,
            // 存储用于进行插值分析的字段名称
            zValueFieldName: "AVG_TMP",
            //结果栅格数据集的范围（生效）
            bounds: [-2640403.63, 1873792.1, 3247669.39, 5921501.4]
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
        service.interpolationAnalysis(interpolationAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.dataset).toContain("Density_Result");
                expect(serviceResult.object.mode).toEqual("Density");
                done();
            } catch (e) {
                console.log("'interpolationAnalysis_density_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 25000);
    });

    //插值分析 反距离加权插值分析
    it('interpolationAnalysis_IDW_dataset_test', function (done) {
        var interpolationAnalystParameters = new SuperMap.InterpolationIDWAnalystParameters({
            //用于做插值分析的数据源中数据集的名称
            dataset: "SamplesP@Interpolation",
            //插值分析结果数据集的名称
            outputDatasetName: "IDW_result",
            //插值分析结果数据源的名称
            outputDatasourceName: "Interpolation",
            //结果栅格数据集存储的像素格式
            pixelFormat: SuperMap.PixelFormat.DOUBLE,
            zValueFieldName: "AVG_TMP",
            resolution: 7923.84989108,
            //采取固定点数查找参与运算点的方式
            searchMode: "KDTREE_FIXED_COUNT",
            //固定点数查找方式下,参与差值运算的点数默认为12。
            expectedCount: 12,
            bounds: [-2640403.63, 1873792.1, 3247669.39, 5921501.4]
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
        service.interpolationAnalysis(interpolationAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.dataset).toContain("IDW_result");
                expect(serviceResult.object.mode).toEqual("IDW");
                done();
            } catch (e) {
                console.log("'interpolationAnalysis_IDW_dataset_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 25000);
    });

});