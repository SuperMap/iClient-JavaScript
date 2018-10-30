import {spatialAnalystService} from '../../../src/leaflet/services/SpatialAnalystService';
import {DensityKernelAnalystParameters} from '../../../src/common/iServer/DensityKernelAnalystParameters';
import request from 'request';
import {FetchRequest} from "@supermap/iclient-common";

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
            var expectParams = `{'bounds':{'left':3800,'bottom':-3800,'right':8200,'top':-2200,'centerLonLat':null},'fieldName':"SmLength",'resultGridDatasetResolution':null,'searchRadius':50,'targetDatasource':null,'resultGridName':"KernelDensity_leafletTest",'deleteExistResultDataset':true}`;
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(expectParams));
        });
        densityAnalystService.densityAnalysis(densityAnalystParameters, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe('processCompleted');
                expect(serviceResult.result.succeed).toBeTruthy();
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

});