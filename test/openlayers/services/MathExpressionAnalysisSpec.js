import request from 'request';
import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {MathExpressionAnalysisParameters} from '../../../src/common/iServer/MathExpressionAnalysisParameters';

var originalTimeout, serviceResults;
var sampleServiceUrl = GlobeParameter.spatialAnalystURL;
describe('openlayers_SpatialAnalystService_mathExpressionAnalysis', () => {
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var resultDataset = "MathExpression_openlayersTest";
    //栅格代数运算
    it('mathExpressionAnalysis', (done) => {
        var mathExpressionAnalysisParameters = new MathExpressionAnalysisParameters({
            dataset: "JingjinTerrain@Jingjin",
            expression: "[Jingjin.JingjinTerrain] + 600",
            targetDatasource: "Jingjin",
            resultGridName: resultDataset,
            deleteExistResultDataset: true
        });
        var spatialAnalystService = new SpatialAnalystService(sampleServiceUrl);
        spatialAnalystService.mathExpressionAnalysis(mathExpressionAnalysisParameters, (serviceResult) => {
            serviceResults = serviceResult;
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        });
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', (done) => {
        var testResult = GlobeParameter.datajingjinURL + resultDataset;
        request.delete(testResult);
        done();
    });
});