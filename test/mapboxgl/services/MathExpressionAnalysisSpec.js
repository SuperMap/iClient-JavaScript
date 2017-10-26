require('../../../src/mapboxgl/services/SpatialAnalystService');
var mapboxgl = require('mapbox-gl');

var url = GlobeParameter.spatialAnalystURL;
var options = {
    serverType: 'iServer'
};
describe('mapboxgl_SpatialAnalystService_mathExpressionAnalysis', function () {
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

    //栅格代数运算 删除已有的数据集  默认不删除
    it('mathExpressionAnalysis_deleteExistResultDataset_true_test', function (done) {
        var mathExpressionAnalysisParameters = new SuperMap.MathExpressionAnalysisParameters({
            dataset: "JingjinTerrain@Jingjin",
            expression: "[Jingjin.JingjinTerrain] + 600",
            targetDatasource: "Jingjin",
            resultGridName: "MathExpressionAnalysis_Result",
            //如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除
            deleteExistResultDataset: true
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
        service.mathExpressionAnalysis(mathExpressionAnalysisParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.dataset).toEqual("MathExpressionAnalysis_Result@Jingjin");
                done();
            } catch (e) {
                console.log("'mathExpressionAnalysis_deleteExistResultDataset_true_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 8000);
    });

    //栅格代数运算 不删除已有的数据集
    it('mathExpressionAnalysis_deleteExistResultDataset_false_test', function (done) {
        var mathExpressionAnalysisParameters = new SuperMap.MathExpressionAnalysisParameters({
            dataset: "JingjinTerrain@Jingjin",
            expression: "[Jingjin.JingjinTerrain] + 600",
            targetDatasource: "Jingjin",
            resultGridName: "MathExpressionAnalysis_Result1",
            //如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除
            deleteExistResultDataset: false
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
        service.mathExpressionAnalysis(mathExpressionAnalysisParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processFailed");
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toEqual("数据集MathExpressionAnalysis_Result1@Jingjin已存在。");
                done();
            } catch (e) {
                console.log("'mathExpressionAnalysis_deleteExistResultDataset_false_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 8000);
    });
});