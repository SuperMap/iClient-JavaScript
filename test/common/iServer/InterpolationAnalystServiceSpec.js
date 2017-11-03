require('../../../src/common/iServer/InterpolationAnalystService');
var request = require('request');

var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;
var url = GlobeParameter.spatialAnalystURL;
var options = {
    eventListeners: {"processCompleted": analyzeCompleted, 'processFailed': analyzeFailed}
};

function initInterpolationAnalystService() {
    return new SuperMap.InterpolationAnalystService(url, options);
}

function analyzeCompleted(analyseEventArgs) {
    analystEventArgsSystem = analyseEventArgs;
}

function analyzeFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

describe('InterpolationAnalystService', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        serviceFailedEventArgsSystem = null;
        analystEventArgsSystem = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var resultDataset_RBFByDS = "Interpolation_RBFByDS_commonTest";
    //数据集 样条插值（径向基函数插值法）分析
    it('InterpolationRBFAnalyst_dataset', function (done) {
        var interpolationAnalystService = initInterpolationAnalystService();
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationRBFAnalystParameters = new SuperMap.InterpolationRBFAnalystParameters({
            dataset: "SamplesP@Interpolation",
            smooth: 0.1,
            tension: 40,
            searchMode: "QUADTREE",
            maxPointCountForInterpolation: 20,
            maxPointCountInNode: 5,
            pixelFormat: "BIT16",
            zValueFieldName: "AVG_TMP",
            resolution: 3000,
            filterQueryParameter: {
                attributeFilter: ""
            },
            outputDatasetName: resultDataset_RBFByDS
        });
        interpolationAnalystService.processAsync(interpolationRBFAnalystParameters);
        interpolationAnalystService.events.on({"processCompleted": analyzeCompleted});
        setTimeout(function () {
            try {
                expect(analystEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = analystEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.dataset).toEqual(resultDataset_RBFByDS + "@Interpolation");
                interpolationAnalystService.destroy();
                interpolationRBFAnalystParameters.destroy();
                done();
            } catch (e) {
                expect(false).toBeTruthy();
                console.log("InterpolationRBFAnalyst_dataset" + e.name + ":" + e.message);
                interpolationAnalystService.destroy();
                interpolationRBFAnalystParameters.destroy();
                done();
            }
        }, 5000);
    });
    // 删除测试过程中产生的数据集
    it('delete test resources_RBFByDS', function (done) {
        var testResult_RBFByDS = GlobeParameter.dataspatialAnalystURL + resultDataset_RBFByDS;
        request.delete(testResult_RBFByDS);
        done();
    });

    var resultDataset_densityByDS = "Interpolation_densityByDS_commonTest";
    //数据集 点密度插值分析
    it('InterpolationDensityAnalyst_dataset', function (done) {
        var interpolationAnalystService = initInterpolationAnalystService();
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationDensityAnalystParameters = new SuperMap.InterpolationDensityAnalystParameters({
            dataset: "SamplesP@Interpolation",
            searchRadius: "100000",
            pixelFormat: "BIT16",
            zValueFieldName: "AVG_TMP",
            resolution: 3000,
            filterQueryParameter: {
                attributeFilter: ""
            },
            outputDatasetName: resultDataset_densityByDS
        });
        interpolationAnalystService.processAsync(interpolationDensityAnalystParameters);
        interpolationAnalystService.events.on({"processCompleted": analyzeCompleted});
        setTimeout(function () {
            try {
                expect(analystEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = analystEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.dataset).toEqual(resultDataset_densityByDS + "@Interpolation");
                interpolationAnalystService.destroy();
                interpolationDensityAnalystParameters.destroy();
                done();
            } catch (e) {
                expect(false).toBeTruthy();
                console.log("InterpolationDensityAnalyst_dataset" + e.name + ":" + e.message);
                interpolationAnalystService.destroy();
                interpolationDensityAnalystParameters.destroy();
                done();
            }
        }, 5000);
    });
    // 删除测试过程中产生的数据集
    it('delete test resources_densityByDS', function (done) {
        var testResult_densityByDS = GlobeParameter.dataspatialAnalystURL + resultDataset_densityByDS;
        request.delete(testResult_densityByDS);
        done();
    });

    var resultDataset_IDWByDS = "Interpolation_IDWByDS_commonTest";
    //数据集 反距离加权插值（IDW）分析
    it('InterpolationIDWAnalyst_dataset', function (done) {
        var interpolationAnalystService = initInterpolationAnalystService();
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationIDWAnalystParameters = new SuperMap.InterpolationIDWAnalystParameters({
            dataset: "SamplesP@Interpolation",
            power: 2,
            searchMode: "KDTREE_FIXED_COUNT",
            expectedCount: 12,
            pixelFormat: "BIT16",
            zValueFieldName: "AVG_TMP",
            resolution: 3000,
            filterQueryParameter: {
                attributeFilter: ""
            },
            outputDatasetName: resultDataset_IDWByDS
        });
        interpolationAnalystService.processAsync(interpolationIDWAnalystParameters);
        interpolationAnalystService.events.on({"processCompleted": analyzeCompleted});
        setTimeout(function () {
            try {
                expect(analystEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = analystEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.dataset).toEqual(resultDataset_IDWByDS + "@Interpolation");
                interpolationAnalystService.destroy();
                interpolationIDWAnalystParameters.destroy();
                done();
            } catch (e) {
                expect(false).toBeTruthy();
                console.log("InterpolationIDWAnalyst_dataset" + e.name + ":" + e.message);
                interpolationAnalystService.destroy();
                interpolationIDWAnalystParameters.destroy();
                done();
            }
        }, 5000);

    });
    // 删除测试过程中产生的数据集
    it('delete test resources_IDWByDS', function (done) {
        var testResult_IDWByDS = GlobeParameter.dataspatialAnalystURL + resultDataset_IDWByDS;
        request.delete(testResult_IDWByDS);
        done();
    });

    var resultDataset_krigingByDS = "Interpolation_krigingByDS_commonTest";
    //数据集 克吕金插值分析
    it('InterpolationKrigingAnalyst_dataset', function (done) {
        var interpolationAnalystService = initInterpolationAnalystService();
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationKrigingAnalystParameters = new SuperMap.InterpolationKrigingAnalystParameters({
            dataset: "SamplesP@Interpolation",
            type: "KRIGING",
            angle: 0,
            mean: 5,
            nugget: 30,
            range: 50,
            sill: 300,
            variogramMode: "EXPONENTIAL",
            searchMode: "QUADTREE",
            maxPointCountForInterpolation: 20,
            maxPointCountInNode: 5,
            pixelFormat: "BIT16",
            zValueFieldName: "AVG_TMP",
            resolution: 30000,
            filterQueryParameter: {
                attributeFilter: ""
            },
            outputDatasetName: resultDataset_krigingByDS
        });
        interpolationAnalystService.processAsync(interpolationKrigingAnalystParameters);
        interpolationAnalystService.events.on({"processCompleted": analyzeCompleted});
        setTimeout(function () {
            try {
                expect(analystEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = analystEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.dataset).toEqual(resultDataset_krigingByDS + "@Interpolation");
                interpolationAnalystService.destroy();
                interpolationKrigingAnalystParameters.destroy();
                done();
            } catch (e) {
                expect(false).toBeTruthy();
                console.log("InterpolationKrigingAnalyst_dataset" + e.name + ":" + e.message);
                interpolationAnalystService.destroy();
                interpolationKrigingAnalystParameters.destroy();
                done();
            }
        }, 5000);
    });
    // 删除测试过程中产生的数据集
    it('delete test resources_krigingByDS', function (done) {
        var testResult_krigingByDS = GlobeParameter.dataspatialAnalystURL + resultDataset_krigingByDS;
        request.delete(testResult_krigingByDS);
        done();
    });

    var resultDataset_RBFByGeo = "Interpolation_RBFByGeo_commonTest";
    //几何 样条插值（径向基函数插值法）分析
    it('InterpolationRBFAnalyst_geometry', function (done) {
        var interpolationAnalystService = initInterpolationAnalystService();
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationRBFAnalystParameters = new SuperMap.InterpolationRBFAnalystParameters({
            InterpolationAnalystType: "geometry",
            smooth: 0.1,
            tension: 40,
            searchMode: "QUADTREE",
            maxPointCountForInterpolation: 20,
            maxPointCountInNode: 5,
            pixelFormat: "BIT16",
            zValueScale: 1,
            resolution: 3000,
            outputDatasetName: resultDataset_RBFByGeo,
            outputDatasourceName: "Interpolation",
            inputPoints: [{"z": -3, "y": 5846399.011754164, "x": 1210581.346513096},
                {"z": -2, "y": 5806144.683668519, "x": 1374568.1968855715},
                {"z": 0, "y": 5770737.831291649, "x": 1521370.8530005363},
                {"z": -1, "y": 5528199.929583105, "x": 1095631.459772168}]
        });
        interpolationAnalystService.processAsync(interpolationRBFAnalystParameters);
        interpolationAnalystService.events.on({"processCompleted": analyzeCompleted});
        setTimeout(function () {
            try {
                expect(analystEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = analystEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.dataset).toEqual(resultDataset_RBFByGeo + "@Interpolation");
                interpolationAnalystService.destroy();
                interpolationRBFAnalystParameters.destroy();
                done();
            } catch (e) {
                expect(false).toBeTruthy();
                console.log("InterpolationRBFAnalyst_geometry" + e.name + ":" + e.message);
                interpolationAnalystService.destroy();
                interpolationRBFAnalystParameters.destroy();
                done();
            }
        }, 5000);
    });
    // 删除测试过程中产生的数据集
    it('delete test resources_RBFByGeo', function (done) {
        var testResult_RBFByGeo = GlobeParameter.dataspatialAnalystURL + resultDataset_RBFByGeo;
        request.delete(testResult_RBFByGeo);
        done();
    });

    var resultDataset_densityByGeo = "Interpolation_densityByGeo_commonTest";
    //几何 点密度插值分析
    it('InterpolationDensityAnalyst_geometry', function (done) {
        var interpolationAnalystService = initInterpolationAnalystService();
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationDensityAnalystParameters = new SuperMap.InterpolationDensityAnalystParameters({
            InterpolationAnalystType: "geometry",
            searchRadius: 0,
            pixelFormat: "BIT16",
            zValueScale: 1,
            resolution: 3000,
            outputDatasetName: resultDataset_densityByGeo,
            outputDatasourceName: "Interpolation",
            inputPoints: [{"z": -3, "y": 5846399.011754164, "x": 1210581.346513096},
                {"z": -2, "y": 5806144.683668519, "x": 1374568.1968855715},
                {"z": 0, "y": 5770737.831291649, "x": 1521370.8530005363},
                {"z": -1, "y": 5528199.929583105, "x": 1095631.459772168},
                {"z": -3, "y": 5570741.490646067, "x": 1198626.2178598372}]
        });
        interpolationAnalystService.processAsync(interpolationDensityAnalystParameters);
        interpolationAnalystService.events.on({"processCompleted": analyzeCompleted});
        setTimeout(function () {
            try {
                expect(analystEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = analystEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.dataset).toEqual(resultDataset_densityByGeo + "@Interpolation");
                interpolationAnalystService.destroy();
                interpolationDensityAnalystParameters.destroy();
                done();
            } catch (e) {
                expect(false).toBeTruthy();
                console.log("InterpolationDensityAnalyst_geometry" + e.name + ":" + e.message);
                interpolationAnalystService.destroy();
                interpolationDensityAnalystParameters.destroy();
                done();
            }
        }, 5000);
    });
    // 删除测试过程中产生的数据集
    it('delete test resources_densityByGeo', function (done) {
        var testResult_densityByGeo = GlobeParameter.dataspatialAnalystURL + resultDataset_densityByGeo;
        request.delete(testResult_densityByGeo);
        done();
    });

    var resultDataset_IDWByGeo = "Interpolation_IDWByGeo_commonTest";
    //几何 反距离加权插值（IDW）分析
    it('InterpolationIDWAnalyst_geometry', function (done) {
        var interpolationAnalystService = initInterpolationAnalystService();
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationIDWAnalystParameters = new SuperMap.InterpolationIDWAnalystParameters({
            InterpolationAnalystType: "geometry",
            power: 2,
            searchMode: "KDTREE_FIXED_RADIUS",
            searchRadius: 0,
            expectedCount: 12,
            pixelFormat: "BIT16",
            zValueScale: 1,
            resolution: 3000,
            outputDatasetName: resultDataset_IDWByGeo,
            outputDatasourceName: "Interpolation",
            inputPoints: [{"z": -3, "y": 5846399.011754164, "x": 1210581.346513096},
                {"z": -2, "y": 5806144.683668519, "x": 1374568.1968855715},
                {"z": 0, "y": 5770737.831291649, "x": 1521370.8530005363},
                {"z": -1, "y": 5528199.929583105, "x": 1095631.459772168},
                {"z": -3, "y": 5570741.490646067, "x": 1198626.2178598372}]
        });
        interpolationAnalystService.processAsync(interpolationIDWAnalystParameters);
        interpolationAnalystService.events.on({"processCompleted": analyzeCompleted});
        setTimeout(function () {
            try {
                expect(analystEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = analystEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.dataset).toEqual(resultDataset_IDWByGeo + "@Interpolation");
                interpolationAnalystService.destroy();
                interpolationIDWAnalystParameters.destroy();
                done();
            } catch (e) {
                expect(false).toBeTruthy();
                console.log("InterpolationIDWAnalyst_geometry" + e.name + ":" + e.message);
                interpolationAnalystService.destroy();
                interpolationIDWAnalystParameters.destroy();
                done();
            }
        }, 5000);
    });
    // 删除测试过程中产生的数据集
    it('delete test resources_IDWByGeo', function (done) {
        var testResult_IDWByGeo = GlobeParameter.dataspatialAnalystURL + resultDataset_IDWByGeo;
        request.delete(testResult_IDWByGeo);
        done();
    });

    var resultDataset_krigingByGeo = "Interpolation_krigingByGeo_commonTest";
    //几何 克吕金插值分析
    it('InterpolationKrigingAnalyst_geometry', function (done) {
        var interpolationAnalystService = initInterpolationAnalystService();
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationKrigingAnalystParameters = new SuperMap.InterpolationKrigingAnalystParameters({
            InterpolationAnalystType: "geometry",
            type: "KRIGING",
            angle: 0,
            nugget: 0,
            range: 0,
            sill: 0,
            variogramMode: "SPHERICAL",
            searchMode: "KDTREE_FIXED_RADIUS",
            searchRadius: 0,
            expectedCount: 12,
            pixelFormat: "BIT16",
            zValueScale: 1,
            resolution: 3000,
            outputDatasetName: resultDataset_krigingByGeo,
            outputDatasourceName: "Interpolation",
            inputPoints: [{"z": -3, "y": 5846399.011754164, "x": 1210581.346513096},
                {"z": -2, "y": 5806144.683668519, "x": 1374568.1968855715},
                {"z": 0, "y": 5770737.831291649, "x": 1521370.8530005363},
                {"z": -1, "y": 5528199.929583105, "x": 1095631.459772168}]
        });
        interpolationAnalystService.processAsync(interpolationKrigingAnalystParameters);
        interpolationAnalystService.events.on({"processCompleted": analyzeCompleted});
        setTimeout(function () {
            try {
                expect(analystEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = analystEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.dataset).toEqual(resultDataset_krigingByGeo + "@Interpolation");
                interpolationAnalystService.destroy();
                interpolationKrigingAnalystParameters.destroy();
                done();
            } catch (e) {
                expect(false).toBeTruthy();
                console.log("InterpolationKrigingAnalyst_geometry" + e.name + ":" + e.message);
                interpolationAnalystService.destroy();
                interpolationKrigingAnalystParameters.destroy();
                done();
            }
        }, 5000);
    });
    // 删除测试过程中产生的数据集
    it('delete test resources', function (done) {
        var testResult_krigingByGeo = GlobeParameter.dataspatialAnalystURL + resultDataset_krigingByGeo;
        request.delete(testResult_krigingByGeo);
        done();
    });

    //分析失败
    it('FailedEvent', function (done) {
        var interpolationAnalystService = initInterpolationAnalystService();
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationRBFAnalystParameters = new SuperMap.InterpolationRBFAnalystParameters({
            dataset: "xxx@Interpolation",
            smooth: 0.1,
            tension: 40,
            searchMode: "QUADTREE",
            maxPointCountForInterpolation: 20,
            maxPointCountInNode: 5,
            pixelFormat: "BIT16",
            zValueFieldName: "AVG_TMP",
            resolution: 3000,
            filterQueryParameter: {
                attributeFilter: ""
            }
        });
        interpolationAnalystService.processAsync(interpolationRBFAnalystParameters);
        interpolationAnalystService.events.on({"processFailed": analyzeFailed});
        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.type).toEqual("processFailed");
                var serviceResult = serviceFailedEventArgsSystem;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).not.toBeNull();
                interpolationAnalystService.destroy();
                interpolationRBFAnalystParameters.destroy();
                done();
            } catch (e) {
                expect(false).toBeTruthy();
                console.log("FailedEvent" + e.name + ":" + e.message);
                interpolationAnalystService.destroy();
                interpolationRBFAnalystParameters.destroy();
                done();
            }
        }, 5000);
    });
});