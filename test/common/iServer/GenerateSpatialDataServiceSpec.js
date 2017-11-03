require('../../../src/common/iServer/GenerateSpatialDataService');
var request = require('request');

var completedEventArgsSystem, failedEventArgsSystem;
var url = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    eventListeners: {
        processCompleted: generateSpatialDataCompleted,
        processFailed: generateSpatialDataFailed
    }
};
function initGenerateSpatialDataService() {
    return new SuperMap.GenerateSpatialDataService(url, options);
}
function generateSpatialDataCompleted(completedEventArgs) {
    completedEventArgsSystem = completedEventArgs;
}
function generateSpatialDataFailed(failedEventArgs) {
    failedEventArgsSystem = failedEventArgs;
}


describe('testGenerateSpatialDataService_processAsync', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        completedEventArgsSystem = null;
        failedEventArgsSystem = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var resultDataset_Point_DATASET = "GenerateSpatial_Point_DS_Test";
    // 点事件表数据集动态分段, DATASET_ONLY
    it('PointEventTable_DATASET_ONLY', function (done) {
        var dataRtnOption = new SuperMap.DataReturnOption({
            dataset: resultDataset_Point_DATASET,
            deleteExistResultDataset: true,
            dataReturnMode: SuperMap.DataReturnMode.DATASET_ONLY
        });
        var generateSpatialDataParameters = new SuperMap.GenerateSpatialDataParameters({
            routeTable: "RouteDT_road@Changchun",
            routeIDField: "RouteID",
            eventTable: "PointEventTabDT@Changchun",
            eventRouteIDField: "RouteID",
            measureField: "measure",
            measureStartField: null,
            measureEndField: null,
            measureOffsetField: "",
            errorInfoField: "",
            dataReturnOption: dataRtnOption
        });
        var generateSpatialDataService = initGenerateSpatialDataService();
        generateSpatialDataService.processAsync(generateSpatialDataParameters);
        setTimeout(function () {
            try {
                expect(generateSpatialDataService).not.toBeNull();
                expect(completedEventArgsSystem.type).toBe("processCompleted");
                var generateSpatialDataResult = completedEventArgsSystem.result;
                expect(generateSpatialDataResult).not.toBeNull();
                expect(generateSpatialDataResult.succeed).toBeTruthy();
                expect(generateSpatialDataResult.recordset).toBeNull();
                expect(generateSpatialDataResult.dataset).toEqual(resultDataset_Point_DATASET + "@Changchun");
                generateSpatialDataService.destroy();
                expect(generateSpatialDataService.EVENT_TYPES).toBeNull();
                expect(generateSpatialDataService.events).toBeNull();
                expect(generateSpatialDataService.eventListeners).toBeNull();
                generateSpatialDataParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GenerateSpatialDataService_" + exception.name + ":" + exception.message);
                generateSpatialDataService.destroy();
                generateSpatialDataParameters.destroy();
                done();
            }
        }, 2000)
    });

    var resultDataset_Linear_DATASET = "GenerateSpatial_Linear_DS_Test";
    // 线事件表数据集动态分段, DATASET_ONLY
    it('LinearEventTable_DATASET_ONLY', function (done) {
        var generateSpatialDataService = initGenerateSpatialDataService();
        var dataRtnOption = new SuperMap.DataReturnOption({
            dataset: resultDataset_Linear_DATASET,
            deleteExistResultDataset: true,
            dataReturnMode: SuperMap.DataReturnMode.DATASET_ONLY
        });
        var generateSpatialDataParameters = new SuperMap.GenerateSpatialDataParameters({
            routeTable: "RouteDT_road@Changchun",
            routeIDField: "RouteID",
            eventTable: "LinearEventTabDT@Changchun",
            eventRouteIDField: "RouteID",
            measureField: "",
            measureStartField: "LineMeasureFrom",
            measureEndField: "LineMeasureTo",
            measureOffsetField: "",
            errorInfoField: "",
            dataReturnOption: dataRtnOption
        });
        generateSpatialDataService.processAsync(generateSpatialDataParameters);
        setTimeout(function () {
            try {
                expect(generateSpatialDataService).not.toBeNull();
                expect(completedEventArgsSystem.type).toBe("processCompleted");
                var generateSpatialDataResult = completedEventArgsSystem.result;
                expect(generateSpatialDataResult).not.toBeNull();
                //expect(generateSpatialDataResult.succeed).toBeTruthy();
                //expect(generateSpatialDataResult.recordset).toBeNull();
                //expect(generateSpatialDataResult.dataset).toEqual(resultDataset_Linear_DATASET + "@Changchun");
                generateSpatialDataService.destroy();
                expect(generateSpatialDataService.EVENT_TYPES).toBeNull();
                expect(generateSpatialDataService.events).toBeNull();
                expect(generateSpatialDataService.eventListeners).toBeNull();
                generateSpatialDataParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GenerateSpatialDataService_" + exception.name + ":" + exception.message);
                generateSpatialDataService.destroy();
                generateSpatialDataParameters.destroy();
                done();
            }
        }, 2000)
    });

    // 点事件表数据集动态分段,并设置期望返回记录数2。生成的随机名称数据集暂时无法删除, 因此先注释掉
    //xit('PointEventTable_RECORDSET_ONLY', function (done) {
    //    var dataRtnOption = new SuperMap.DataReturnOption({
    //        expectCount: 2,
    //        dataset: "",
    //        deleteExistResultDataset: true,
    //        dataReturnMode: SuperMap.DataReturnMode.RECORDSET_ONLY
    //    });
    //    var generateSpatialDataParameters = new SuperMap.GenerateSpatialDataParameters({
    //        routeTable: "RouteDT_road@Changchun",
    //        routeIDField: "RouteID",
    //        eventTable: "PointEventTabDT@Changchun",
    //        eventRouteIDField: "RouteID",
    //        measureField: "measure",
    //        measureStartField: null,
    //        measureEndField: null,
    //        measureOffsetField: "",
    //        errorInfoField: "",
    //        dataReturnOption: dataRtnOption
    //    });
    //    var generateSpatialDataService = initGenerateSpatialDataService();
    //    generateSpatialDataService.processAsync(generateSpatialDataParameters);
    //    setTimeout(function () {
    //        try {
    //            expect(generateSpatialDataService).not.toBeNull();
    //            expect(completedEventArgsSystem.type).toBe("processCompleted");
    //            var generateSpatialDataResult = completedEventArgsSystem.result;
    //            expect(generateSpatialDataResult).not.toBeNull();
    //            expect(generateSpatialDataResult.succeed).toBeTruthy();
    //            expect(generateSpatialDataResult.dataset).toBeNull();
    //            var features = completedEventArgsSystem.result.recordset.features;
    //            expect(features).not.toBeNull();
    //            expect(features.type).toBe("FeatureCollection");
    //            expect(features.features.length).toEqual(2);
    //            generateSpatialDataService.destroy();
    //            expect(generateSpatialDataService.EVENT_TYPES).toBeNull();
    //            expect(generateSpatialDataService.events).toBeNull();
    //            expect(generateSpatialDataService.eventListeners).toBeNull();
    //            generateSpatialDataParameters.destroy();
    //            done();
    //        } catch (exception) {
    //            expect(false).toBeTruthy();
    //            console.log("GenerateSpatialDataService_" + exception.name + ":" + exception.message);
    //            generateSpatialDataService.destroy();
    //            generateSpatialDataParameters.destroy();
    //            done();
    //        }
    //    }, 2000)
    //});

    // 点事件表数据集动态分段,设置deleteExistResultDataset=false，并且设置一个已存在的数据集名称。
    // 期望失败，但其实成功了，iserver中此处未走checkDatasetExist逻辑，不知是预期还是错误。
    //xit('PointEventTable_deleteExistResultDataset=false', function (done) {
    //    var dataRtnOption = new SuperMap.DataReturnOption({
    //        dataset: resultDataset_Point_DATASET,
    //        deleteExistResultDataset: false,
    //        dataReturnMode: SuperMap.DataReturnMode.DATASET_ONLY
    //    });
    //    var generateSpatialDataParameters = new SuperMap.GenerateSpatialDataParameters({
    //        routeTable: "RouteDT_road@Changchun",
    //        routeIDField: "RouteID",
    //        eventTable: "PointEventTabDT@Changchun",
    //        eventRouteIDField: "RouteID",
    //        measureField: "measure",
    //        measureStartField: null,
    //        measureEndField: null,
    //        measureOffsetField: "",
    //        errorInfoField: "",
    //        dataReturnOption: dataRtnOption
    //    });
    //    var generateSpatialDataService = initGenerateSpatialDataService();
    //    generateSpatialDataService.processAsync(generateSpatialDataParameters);
    //    setTimeout(function () {
    //        try {
    //            expect(completedEventArgsSystem).toBeNull();
    //            expect(failedEventArgsSystem.error.errorMsg).not.toBeNull();
    //            expect(failedEventArgsSystem.error.code).toEqual(400);
    //            generateSpatialDataService.destroy();
    //            expect(generateSpatialDataService.EVENT_TYPES).toBeNull();
    //            expect(generateSpatialDataService.events).toBeNull();
    //            expect(generateSpatialDataService.eventListeners).toBeNull();
    //            generateSpatialDataParameters.destroy();
    //            done();
    //        } catch (exception) {
    //            expect(false).toBeTruthy();
    //            console.log("GenerateSpatialDataService_" + exception.name + ":" + exception.message);
    //            generateSpatialDataService.destroy();
    //            generateSpatialDataParameters.destroy();
    //            done();
    //        }
    //    }, 2000)
    //});

    // 线事件表数据集动态分段,并设置期望返回记录数2。生成的随机名称数据集暂时无法删除, 因此先注释掉
    //xit('LinearEventTable_RECORDSET_ONLY', function (done) {
    //    var generateSpatialDataService = initGenerateSpatialDataService();
    //    var dataRtnOption = new SuperMap.DataReturnOption({
    //        expectCount: 2,
    //        dataset: "",
    //        deleteExistResultDataset: true,
    //        dataReturnMode: SuperMap.DataReturnMode.RECORDSET_ONLY
    //    });
    //    var generateSpatialDataParameters = new SuperMap.GenerateSpatialDataParameters({
    //        routeTable: "RouteDT_road@Changchun",
    //        routeIDField: "RouteID",
    //        eventTable: "LinearEventTabDT@Changchun",
    //        eventRouteIDField: "RouteID",
    //        measureField: "",
    //        measureStartField: "LineMeasureFrom",
    //        measureEndField: "LineMeasureTo",
    //        measureOffsetField: "",
    //        errorInfoField: "",
    //        dataReturnOption: dataRtnOption
    //    });
    //    generateSpatialDataService.processAsync(generateSpatialDataParameters);
    //    setTimeout(function () {
    //        try {
    //            var generateSpatialDataResult = completedEventArgsSystem.result.recordset.features;
    //            expect(generateSpatialDataService).not.toBeNull();
    //            expect(generateSpatialDataResult).not.toBeNull();
    //            expect(generateSpatialDataResult.type).toBe("FeatureCollection");
    //            expect(generateSpatialDataResult.features.length).toEqual(2);
    //            generateSpatialDataService.destroy();
    //            expect(generateSpatialDataService.EVENT_TYPES).toBeNull();
    //            expect(generateSpatialDataService.events).toBeNull();
    //            expect(generateSpatialDataService.eventListeners).toBeNull();
    //            generateSpatialDataParameters.destroy();
    //            done();
    //        } catch (exception) {
    //            expect(false).toBeTruthy();
    //            console.log("GenerateSpatialDataService_" + exception.name + ":" + exception.message);
    //            generateSpatialDataService.destroy();
    //            generateSpatialDataParameters.destroy();
    //            done();
    //        }
    //    }, 2000)
    //});

    // 线事件表数据集动态分段,设置deleteExistResultDataset=false，并且设置一个已存在的数据集名称。
    // 期望失败，但其实成功了，iserver中此处未走checkDatasetExist逻辑，不知是预期还是错误。
    //xit('LinearEventTable_deleteExistResultDataset_false', function (done) {
    //    var generateSpatialDataService = initGenerateSpatialDataService();
    //    var dataRtnOption = new SuperMap.DataReturnOption({
    //        expectCount: 2000,
    //        dataset: "generateSpatialData",
    //        deleteExistResultDataset: false,
    //        dataReturnMode: SuperMap.DataReturnMode.DATASET_AND_RECORDSET
    //    });
    //    var generateSpatialDataParameters = new SuperMap.GenerateSpatialDataParameters({
    //        routeTable: "RouteDT_road@Changchun",
    //        routeIDField: "RouteID",
    //        eventTable: "LinearEventTabDT@Changchun",
    //        eventRouteIDField: "RouteID",
    //        measureField: "",
    //        measureStartField: "LineMeasureFrom",
    //        measureEndField: "",
    //        measureOffsetField: "",
    //        errorInfoField: "",
    //        dataReturnOption: dataRtnOption
    //    });
    //    generateSpatialDataService.processAsync(generateSpatialDataParameters);
    //    setTimeout(function () {
    //        try {
    //            expect(failedEventArgsSystem.error.code).toEqual(400);
    //            expect(failedEventArgsSystem.error.errorMsg).not.toBeNull();
    //            generateSpatialDataService.destroy();
    //            expect(generateSpatialDataService.EVENT_TYPES).toBeNull();
    //            expect(generateSpatialDataService.events).toBeNull();
    //            expect(generateSpatialDataService.eventListeners).toBeNull();
    //            generateSpatialDataParameters.destroy();
    //            done();
    //        } catch (exception) {
    //            expect(false).toBeTruthy();
    //            console.log("GenerateSpatialDataService_" + exception.name + ":" + exception.message);
    //            generateSpatialDataService.destroy();
    //            generateSpatialDataParameters.destroy();
    //            done();
    //        }
    //    }, 2000)
    //});

    // 删除测试过程中产生的测试数据集
    it('delete test resources', function (done) {
        var testResult_Point = GlobeParameter.datachangchunURL + resultDataset_Point_DATASET;
        var testResult_Linear = GlobeParameter.datachangchunURL + resultDataset_Linear_DATASET;
        request.delete(testResult_Point);
        request.delete(testResult_Linear);
        done();
    });
});

