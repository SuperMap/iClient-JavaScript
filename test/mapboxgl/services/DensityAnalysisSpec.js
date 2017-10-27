require('../../../src/mapboxgl/services/SpatialAnalystService');
var mapboxgl = require('mapbox-gl');

var url = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    serverType: 'iServer'
};
describe('mapboxgl_SpatialAnalystService_densityAnalysis', function () {
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

    //点密度分析, 删除重复的数据集
    it('densityAnalysis_deleteExistResultDataset:true', function (done) {
        var densityKernelAnalystParameters = new SuperMap.DensityKernelAnalystParameters({
            dataset: "Railway@Changchun",
            //用于进行核密度分析的测量值的字段名称
            fieldName: "SmLength",
            resultGridName: "KernelDensity_Result",
            //删除重复的数据集
            deleteExistResultDataset: true
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
        service.densityAnalysis(densityKernelAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.dataset).toEqual("KernelDensity_Result@Changchun");
                done();
            } catch (e) {
                console.log("'densityAnalysis_deleteExistResultDataset:true'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 8000);
    });

    //点密度分析, 不删除重复的数据集(默认), 本测试的resultGridName需要是一个已经存在的数据集
    it('densityAnalysis_deleteExistResultDataset:false', function (done) {
        var densityKernelAnalystParameters = new SuperMap.DensityKernelAnalystParameters({
            dataset: "Railway@Changchun",
            //用于进行核密度分析的测量值的字段名称
            fieldName: "SmLength",
            resultGridName: "KernelDensity_Result",
            //不删除重复的数据集
            deleteExistResultDataset: false
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
        service.densityAnalysis(densityKernelAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toEqual("数据集KernelDensity_Result@Changchun已存在。");
                done();
            } catch (e) {
                console.log("'densityAnalysis_deleteExistResultDataset_false_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});