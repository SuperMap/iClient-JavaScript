import {spatialAnalystService} from '../../../src/leaflet/services/SpatialAnalystService';
import {InterpolationKrigingAnalystParameters} from '../../../src/common/iServer/InterpolationKrigingAnalystParameters';
import {PixelFormat} from '../../../src/common/REST';
import request from 'request';

var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
var options = {
    serverType: 'iServer'
};
describe('leaflet_SpatialAnalystService_interpolationAnalysis', () => {
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

    var resultDataset = "Interpolation_UnvsKriging_lfTest";
    it('interpolationAnalysis_Kriging_Universal', () => {
        var interpolationAnalystParameters = new InterpolationKrigingAnalystParameters({
            // 用于做插值分析的数据源中数据集的名称
            dataset: "SamplesP@Interpolation",
            // 插值分析结果数据集的名称
            outputDatasetName: resultDataset,
            // 插值分析结果数据源的名称
            outputDatasourceName: "Interpolation",
            // 结果栅格数据集存储的像素格式
            pixelFormat: PixelFormat.DOUBLE,
            // 属性过滤条件
            filterQueryParameter: {
                attributeFilter: ""
            },
            //存储用于进行插值分析的字段名称
            zValueFieldName: "AVG_TMP",
            searchRadius: "0",
            //克吕金插值的类型
            type: "UniversalKriging",
            //克吕金类型中旋转角度值
            angle: 0,
            //克吕金类型中块金效应值
            nugget: 0,
            //克吕金类型中自相关阈值，单位与原数据集单位相同
            range: 0,
            //克吕金类型中基台值
            sill: 0,
            //克吕金插值时的半变函数类型
            variogramMode: "SPHERICAL",
            searchMode: "KDTREE_FIXED_COUNT",
            bounds: L.bounds([-2640403.63, 1873792.1], [3247669.39, 5921501.4])
        });
        var interpolationAnalystService = spatialAnalystService(spatialAnalystURL, options);
        interpolationAnalystService.interpolationAnalysis(interpolationAnalystParameters, (result) => {
            serviceResult = result;
            try {
                expect(interpolationAnalystService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.dataset).toContain(resultDataset);
                expect(serviceResult.result.dataset).toContain("@Interpolation");
                expect(serviceResult.result.succeed).toBe(true);
                interpolationAnalystService.destroy();
            } catch (exception) {
                console.log("'leaflet_interpolationAnalystService_Kriging_Universal'案例失败" + exception.name + ":" + exception.message);
                interpolationAnalystService.destroy();
                expect(false).toBeTruthy();
            }
        });
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', (done) => {
        var testResult = GlobeParameter.dataspatialAnalystURL + resultDataset;
        request.delete(testResult);
        done();
    });
});
