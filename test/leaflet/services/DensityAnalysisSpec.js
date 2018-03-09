import {spatialAnalystService} from '../../../src/leaflet/services/SpatialAnalystService';
import {DensityKernelAnalystParameters} from '../../../src/common/iServer/DensityKernelAnalystParameters';
import request from 'request';

var spatialAnalystURL = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    serverType: 'iServer'
};

describe('leaflet_SpatialAnalystService_densityAnalysis', () => {
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

    var resultDataset = "KernelDensity_leafletTest";
    //点密度分析
    it('densityAnalysis', (done) => {
        var densityAnalystParameters = new DensityKernelAnalystParameters({
            //指定数据集
            dataset: "Railway@Changchun",
            //指定范围
            bounds: L.bounds([3800, -3800], [8200, -2200]),
            //指定数据集中用于核密度分析的字段
            fieldName: "SmLength",
            searchRadius: 50, //Railway@Changchun的单位是米
            // 结果数据集名称
            resultGridName: resultDataset,
            deleteExistResultDataset: true
        });
        var densityAnalystService = spatialAnalystService(spatialAnalystURL, options);
        densityAnalystService.densityAnalysis(densityAnalystParameters, (densityServiceResult) => {
            serviceResult = densityServiceResult;
        });
        setTimeout(() => {
            try {
                expect(densityAnalystService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                expect(result.dataset).toEqual(resultDataset + "@Changchun");
                expect(result.succeed).toBe(true);
                densityAnalystService.destroy();
                done();
            } catch (exception) {
                console.log("'densityAnalysis'案例失败" + exception.name + ":" + exception.message);
                densityAnalystService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', (done) => {
        var testResult = GlobeParameter.datachangchunURL + resultDataset;
        request.delete(testResult);
        done();
    });
});