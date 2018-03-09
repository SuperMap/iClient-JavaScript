import {SpatialAnalystService} from '../../../src/mapboxgl/services/SpatialAnalystService';
import {DensityKernelAnalystParameters} from '../../../src/common/iServer/DensityKernelAnalystParameters';
import request from 'request';

var url = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    serverType: 'iServer'
};
describe('mapboxgl_SpatialAnalystService_densityAnalysis', () => {
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

    var resultDataset = "KernelDensity_mapboxglTest";
    //点密度分析, 删除重复的数据集
    it('densityAnalysis_deleteExistResultDataset:true', (done)=> {
        var densityKernelAnalystParameters = new DensityKernelAnalystParameters({
            dataset: "Railway@Changchun",
            //用于进行核密度分析的测量值的字段名称
            fieldName: "SmLength",
            resultGridName: resultDataset,
            //删除重复的数据集
            deleteExistResultDataset: true
        });
        var service = new SpatialAnalystService(url, options);
        service.densityAnalysis(densityKernelAnalystParameters, (result)=> {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.dataset).toEqual(resultDataset + "@Changchun");
                done();
            } catch (e) {
                console.log("'densityAnalysis_deleteExistResultDataset:true'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 8000);
    });

    //点密度分析, 不删除重复的数据集(默认), 本测试的resultGridName需要是一个已经存在的数据集
    it('densityAnalysis_deleteExistResultDataset:false', (done)=> {
        var densityKernelAnalystParameters = new DensityKernelAnalystParameters({
            dataset: "Railway@Changchun",
            //用于进行核密度分析的测量值的字段名称
            fieldName: "SmLength",
            resultGridName: resultDataset,
            //不删除重复的数据集
            deleteExistResultDataset: false
        });
        var service = new SpatialAnalystService(url, options);
        service.densityAnalysis(densityKernelAnalystParameters, (result)=> {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toEqual("数据集" + resultDataset + "@Changchun已存在。");
                done();
            } catch (e) {
                console.log("'densityAnalysis_deleteExistResultDataset_false_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', (done)=> {
        var testResult = GlobeParameter.datachangchunURL + resultDataset;
        request.delete(testResult);
        done();
    });
});