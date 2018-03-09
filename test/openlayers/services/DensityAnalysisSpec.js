import request from 'request';
import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {DensityKernelAnalystParameters} from '../../../src/common/iServer/DensityKernelAnalystParameters';

var originalTimeout, serviceResults;
var changchunServiceUrl = GlobeParameter.spatialAnalystURL_Changchun;
describe('openlayers_SpatialAnalystService_densityAnalysis', () => {
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var resultDataset = "KernelDensity_openlayersTest";
    //点密度分析
    it('densityAnalysis', (done) => {
        var densityAnalystParameters = new DensityKernelAnalystParameters({
            dataset: "Railway@Changchun",
            bounds: [3800, -3800, 8200, -2200],
            fieldName: "SmLength",
            searchRadius: 50,
            resultGridName: resultDataset,
            deleteExistResultDataset: true
        });
        var spatialAnalystService = new SpatialAnalystService(changchunServiceUrl);
        spatialAnalystService.densityAnalysis(densityAnalystParameters, (serviceResult) => {
            serviceResults = serviceResult;
        });
        setTimeout(() => {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        }, 8000);
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', (done) => {
        var testResult = GlobeParameter.datachangchunURL + resultDataset;
        request.delete(testResult);
        done();
    });
});