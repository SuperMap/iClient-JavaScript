import {SpatialAnalystService} from '../../../src/mapboxgl/services/SpatialAnalystService';
import {MathExpressionAnalysisParameters} from '../../../src/common/iServer/MathExpressionAnalysisParameters';
import request from 'request';

var url = GlobeParameter.spatialAnalystURL;
var options = {
    serverType: 'iServer'
};

describe('mapboxgl_SpatialAnalystService_mathExpressionAnalysis', () => {
    var serviceResult;
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var resultDataset = "MathExpression_mapboxglTest";
    //栅格代数运算, 删除已有的数据集
    it('mathExpressionAnalysis_deleteExistResultDataset:true', (done) => {
        var mathExpressionAnalysisParameters = new MathExpressionAnalysisParameters({
            dataset: "JingjinTerrain@Jingjin",
            expression: "[Jingjin.JingjinTerrain] + 600",
            targetDatasource: "Jingjin",
            resultGridName: resultDataset,
            deleteExistResultDataset: true
        });
        var service = new SpatialAnalystService(url, options);
        service.mathExpressionAnalysis(mathExpressionAnalysisParameters, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.dataset).toEqual(resultDataset + "@Jingjin");
                done();
            } catch (e) {
                console.log("'mathExpressionAnalysis_deleteExistResultDataset:true'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 8000);
    });

    //栅格代数运算, 不删除重复的数据集(默认), 本测试的resultGridName需要是一个已经存在的数据集
    it('mathExpressionAnalysis_deleteExistResultDataset:false', (done) => {
        var mathExpressionAnalysisParameters = new MathExpressionAnalysisParameters({
            dataset: "JingjinTerrain@Jingjin",
            expression: "[Jingjin.JingjinTerrain] + 600",
            targetDatasource: "Jingjin",
            resultGridName: resultDataset,
            //如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除
            deleteExistResultDataset: false
        });
        var service = new SpatialAnalystService(url, options);
        service.mathExpressionAnalysis(mathExpressionAnalysisParameters, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processFailed");
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toEqual("数据集" + resultDataset + "@Jingjin已存在。");
                done();
            } catch (e) {
                console.log("'mathExpressionAnalysis_deleteExistResultDataset_false_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 8000);
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', (done) => {
        var testResult = GlobeParameter.datajingjinURL + resultDataset;
        request.delete(testResult);
        done();
    });
});