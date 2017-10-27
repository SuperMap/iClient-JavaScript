require('../../../src/leaflet/services/spatialAnalystService');

var spatialAnalystURL = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    serverType: 'iServer'
};

describe('leaflet_SpatialAnalystService_densityAnalysis', function () {
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

    //点密度分析
    it('densityAnalysis', function (done) {
        var densityAnalystParameters = new SuperMap.DensityKernelAnalystParameters({
            //指定数据集
            dataset: "Railway@Changchun",
            //指定范围
            bounds: L.bounds([3800, -3800], [8200, -2200]),
            //指定数据集中用于核密度分析的字段
            fieldName: "SmLength",
            searchRadius: 50, //Railway@Changchun的单位是米
            // 结果数据集名称
            resultGridName: "KernelDensity_leafletTest",
            deleteExistResultDataset: true
        });
        var densityAnalystService = L.supermap.spatialAnalystService(spatialAnalystURL, options);
        densityAnalystService.densityAnalysis(densityAnalystParameters, function (densityServiceResult) {
            serviceResult = densityServiceResult;
        });
        setTimeout(function () {
            try {
                expect(densityAnalystService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                expect(result.dataset).toEqual("KernelDensity_leafletTest@Changchun");
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
});