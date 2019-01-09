import {spatialAnalystService} from '../../../src/leaflet/services/SpatialAnalystService';
import {DensityKernelAnalystParameters} from '../../../src/common/iServer/DensityKernelAnalystParameters';
import request from 'request';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/Railway@Changchun/densityanalyst/kernel.json?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.fieldName).toBe("SmLength");
            expect(paramsObj.resultGridName).toBe("KernelDensity_leafletTest");
            expect(paramsObj.searchRadius).toEqual(50);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true,"recordset":null,"message":null,"dataset":"KernelDensity_leafletTest@Changchun"}`));
        });
        densityAnalystService.densityAnalysis(densityAnalystParameters, (result) => {
            serviceResult = result;
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe('processCompleted');
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.dataset).toEqual(resultDataset + "@Changchun");
                densityAnalystService.destroy();
                done();
            } catch (exception) {
                console.log("'densityAnalysis'案例失败" + exception.name + ":" + exception.message);
                densityAnalystService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

});