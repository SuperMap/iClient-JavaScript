import {InterpolationAnalystService} from '../../../src/common/iServer/InterpolationAnalystService';
import {InterpolationRBFAnalystParameters} from '../../../src/common/iServer/InterpolationRBFAnalystParameters';
import {InterpolationDensityAnalystParameters} from '../../../src/common/iServer/InterpolationDensityAnalystParameters';
import {InterpolationIDWAnalystParameters} from '../../../src/common/iServer/InterpolationIDWAnalystParameters';
import {InterpolationKrigingAnalystParameters} from '../../../src/common/iServer/InterpolationKrigingAnalystParameters';
import {FetchRequest} from '../../../src/common/util/FetchRequest';
import request from 'request';

var url = GlobeParameter.spatialAnalystURL;
var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;
var initInterpolationAnalystService = () => {
    return new InterpolationAnalystService(url, options);
};
var analyzeCompleted = (analyseEventArgs) => {
    analystEventArgsSystem = analyseEventArgs;
};
var analyzeFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var options = {
    eventListeners: {"processCompleted": analyzeCompleted, 'processFailed': analyzeFailed}
};

describe('InterpolationAnalystService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceFailedEventArgsSystem = null;
        analystEventArgsSystem = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //数据集 样条插值（径向基函数插值法）分析
    it('InterpolationRBFAnalyst_dataset', (done) => {
        var url = "http://supermapiserver:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst";
        var resultDataset_RBFByDS = "Interpolation_RBFByDS_commonTest";
        var interpolationAnalystService = new InterpolationAnalystService(url, options);
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationRBFAnalystParameters = new InterpolationRBFAnalystParameters({
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
        spyOn(FetchRequest, 'commit').and.callFake(() => {
            var escapedJson = "{\"succeed\":true,\"recordset\":null,\"message\":null,\"dataset\":\"Interpolation_RBFByDS_commonTest@Interpolation\"}";
            return Promise.resolve(new Response(escapedJson));
        });
        interpolationAnalystService.events.on({"processCompleted": analyzeCompleted});
        interpolationAnalystService.processAsync(interpolationRBFAnalystParameters);
        setTimeout(() => {
            expect(analystEventArgsSystem.type).toEqual("processCompleted");
            var serviceResult = analystEventArgsSystem.result;
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.succeed).toBeTruthy();
            expect(serviceResult.recordset).toBeNull();
            expect(serviceResult.dataset).toContain(resultDataset_RBFByDS);
            expect(serviceResult.dataset).toContain("@Interpolation");
            interpolationAnalystService.destroy();
            interpolationRBFAnalystParameters.destroy();
            done();
        }, 1000);
    });

    //数据集 点密度插值分析
    it('InterpolationDensityAnalyst_dataset', (done) => {
        var url = "http://supermapiserver:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst";
        var resultDataset_densityByDS = "Interpolation_densityByDS_commonTest";
        var interpolationAnalystService = new InterpolationAnalystService(url, options);
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationDensityAnalystParameters = new InterpolationDensityAnalystParameters({
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
        spyOn(FetchRequest, 'commit').and.callFake(() => {
            var escapedJson = "{\"succeed\":true,\"recordset\":null,\"message\":null,\"dataset\":\"Interpolation_densityByDS_commonTest@Interpolation\"}";
            return Promise.resolve(new Response(escapedJson));
        });
        interpolationAnalystService.events.on({"processCompleted": analyzeCompleted});
        interpolationAnalystService.processAsync(interpolationDensityAnalystParameters);
        setTimeout(() => {
            expect(analystEventArgsSystem.type).toEqual("processCompleted");
            var serviceResult = analystEventArgsSystem.result;
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.succeed).toBeTruthy();
            expect(serviceResult.recordset).toBeNull();
            expect(serviceResult.dataset).toContain(resultDataset_densityByDS);
            expect(serviceResult.dataset).toContain("@Interpolation");
            interpolationAnalystService.destroy();
            interpolationDensityAnalystParameters.destroy();
            done();
        }, 1000);
    });


    var resultDataset_IDWByDS = "Interpolation_IDWByDS_commonTest";
    //数据集 反距离加权插值（IDW）分析
    it('InterpolationIDWAnalyst_dataset', (done) => {
        var interpolationAnalystService = initInterpolationAnalystService();
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationIDWAnalystParameters = new InterpolationIDWAnalystParameters({
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
        setTimeout(() => {
            try {
                expect(analystEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = analystEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.dataset).toContain(resultDataset_IDWByDS);
                expect(serviceResult.dataset).toContain("@Interpolation");
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
        }, 10000);

    });
    // 删除测试过程中产生的数据集
    it('delete test resources_IDWByDS', (done) => {
        var testResult_IDWByDS = GlobeParameter.dataspatialAnalystURL + resultDataset_IDWByDS;
        request.delete(testResult_IDWByDS);
        done();
    });

    var resultDataset_krigingByDS = "Interpolation_krigingByDS_commonTest";
    //数据集 克吕金插值分析
    it('InterpolationKrigingAnalyst_dataset', (done) => {
        var interpolationAnalystService = initInterpolationAnalystService();
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationKrigingAnalystParameters = new InterpolationKrigingAnalystParameters({
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
        setTimeout(() => {
            try {
                expect(analystEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = analystEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.dataset).toContain(resultDataset_krigingByDS);
                expect(serviceResult.dataset).toContain("@Interpolation");
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
        }, 10000);
    });
    // 删除测试过程中产生的数据集
    it('delete test resources_krigingByDS', (done) => {
        var testResult_krigingByDS = GlobeParameter.dataspatialAnalystURL + resultDataset_krigingByDS;
        request.delete(testResult_krigingByDS);
        done();
    });

    var resultDataset_RBFByGeo = "Interpolation_RBFByGeo_commonTest";
    //几何 样条插值（径向基函数插值法）分析
    it('InterpolationRBFAnalyst_geometry', (done) => {
        var interpolationAnalystService = initInterpolationAnalystService();
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationRBFAnalystParameters = new InterpolationRBFAnalystParameters({
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
        setTimeout(() => {
            try {
                expect(analystEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = analystEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.dataset).toContain(resultDataset_RBFByGeo);
                expect(serviceResult.dataset).toContain("@Interpolation");
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
    it('delete test resources_RBFByGeo', (done) => {
        var testResult_RBFByGeo = GlobeParameter.dataspatialAnalystURL + resultDataset_RBFByGeo;
        request.delete(testResult_RBFByGeo);
        done();
    });

    var resultDataset_densityByGeo = "Interpolation_densityByGeo_commonTest";
    //几何 点密度插值分析
    it('InterpolationDensityAnalyst_geometry', (done) => {
        var interpolationAnalystService = initInterpolationAnalystService();
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationDensityAnalystParameters = new InterpolationDensityAnalystParameters({
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
        setTimeout(() => {
            try {
                expect(analystEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = analystEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.dataset).toContain(resultDataset_densityByGeo);
                expect(serviceResult.dataset).toContain("@Interpolation");
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
    it('delete test resources_densityByGeo', (done) => {
        var testResult_densityByGeo = GlobeParameter.dataspatialAnalystURL + resultDataset_densityByGeo;
        request.delete(testResult_densityByGeo);
        done();
    });

    var resultDataset_IDWByGeo = "Interpolation_IDWByGeo_commonTest";
    //几何 反距离加权插值（IDW）分析
    it('InterpolationIDWAnalyst_geometry', (done) => {
        var interpolationAnalystService = initInterpolationAnalystService();
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationIDWAnalystParameters = new InterpolationIDWAnalystParameters({
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
        setTimeout(() => {
            try {
                expect(analystEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = analystEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.dataset).toContain(resultDataset_IDWByGeo);
                expect(serviceResult.dataset).toContain("@Interpolation");
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
    it('delete test resources_IDWByGeo', (done) => {
        var testResult_IDWByGeo = GlobeParameter.dataspatialAnalystURL + resultDataset_IDWByGeo;
        request.delete(testResult_IDWByGeo);
        done();
    });

    var resultDataset_krigingByGeo = "Interpolation_krigingByGeo_commonTest";
    //几何 克吕金插值分析
    it('InterpolationKrigingAnalyst_geometry', (done) => {
        var interpolationAnalystService = initInterpolationAnalystService();
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationKrigingAnalystParameters = new InterpolationKrigingAnalystParameters({
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
        setTimeout(() => {
            try {
                expect(analystEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = analystEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.dataset).toContain(resultDataset_krigingByGeo);
                expect(serviceResult.dataset).toContain("@Interpolation");
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
    it('delete test resources', (done) => {
        var testResult_krigingByGeo = GlobeParameter.dataspatialAnalystURL + resultDataset_krigingByGeo;
        request.delete(testResult_krigingByGeo);
        done();
    });

    //分析失败
    it('FailedEvent', (done) => {
        var interpolationAnalystService = initInterpolationAnalystService();
        expect(interpolationAnalystService).not.toBeNull();
        expect(interpolationAnalystService.url).toEqual(url);
        var interpolationRBFAnalystParameters = new InterpolationRBFAnalystParameters({
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
        setTimeout(() => {
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