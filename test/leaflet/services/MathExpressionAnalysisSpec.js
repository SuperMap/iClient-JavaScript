import {spatialAnalystService} from '../../../src/leaflet/services/SpatialAnalystService';
import {MathExpressionAnalysisParameters} from '../../../src/common/iServer/MathExpressionAnalysisParameters';
import request from 'request';

var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
var options = {
    serverType: 'iServer'
};

describe('leaflet_SpatialAnalystService_mathExpressionAnalysis', () => {
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

    var resultDataset = "MathExpressionAnalysis_leafletTest";
    it('mathExpressionAnalysis', (done) => {
        var mathExpressionAnalysisParams = new MathExpressionAnalysisParameters({
            //指定数据集,必设
            dataset: "JingjinTerrain@Jingjin",
            //要执行的栅格运算代数表达式,必设
            expression: "[Jingjin.JingjinTerrain] + 600",
            //存储结果数据集的数据源,必设
            targetDatasource: "Jingjin",
            //结果数据集名称,必设
            resultGridName: resultDataset,
            deleteExistResultDataset: true
        });
        var mathExpressionAnalystService = spatialAnalystService(spatialAnalystURL, options);
        mathExpressionAnalystService.densityAnalysis(mathExpressionAnalysisParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(mathExpressionAnalystService).not.toBeNull();
                expect(mathExpressionAnalystService.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBe(true);
                done();
            } catch (exception) {
                console.log("'leaflet_mathExpressionAnalysis'案例失败" + exception.name + ":" + exception.message);
                mathExpressionAnalystService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});