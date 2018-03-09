﻿import {GenerateSpatialDataService} from '../../../src/common/iServer/GenerateSpatialDataService';
import {GenerateSpatialDataParameters} from '../../../src/common/iServer/GenerateSpatialDataParameters';
import {DataReturnOption} from '../../../src/common/iServer/DataReturnOption';
import {DataReturnMode} from '../../../src/common/REST';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

var url = "http://supermap:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst";
var completedEventArgsSystem, failedEventArgsSystem;
var initGenerateSpatialDataService = () => {
    return new GenerateSpatialDataService(url, options);
};
var generateSpatialDataCompleted = (completedEventArgs) => {
    completedEventArgsSystem = completedEventArgs;
};
var generateSpatialDataFailed = (failedEventArgs) => {
    failedEventArgsSystem = failedEventArgs;
};
var options = {
    eventListeners: {
        processCompleted: generateSpatialDataCompleted,
        processFailed: generateSpatialDataFailed
    }
};

describe('GenerateSpatialDataService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        completedEventArgsSystem = null;
        failedEventArgsSystem = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    // 点事件表数据集动态分段, DATASET_ONLY
    it('processAsync_PointEventTable_DATASET_ONLY', (done) => {
        var resultDataset_Point_DATASET = "GenerateSpatial_Point_DS_Test";
        var dataRtnOption = new DataReturnOption({
            dataset: resultDataset_Point_DATASET,
            deleteExistResultDataset: true,
            dataReturnMode: DataReturnMode.DATASET_ONLY
        });
        var generateSpatialDataParameters = new GenerateSpatialDataParameters({
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + "/datasets/RouteDT_road@Changchun/linearreferencing/generatespatialdata.json?returnContent=true");
            var expectParams = "{'routeTable':\"RouteDT_road@Changchun\",'routeIDField':\"RouteID\",'eventTable':\"PointEventTabDT@Changchun\",'eventRouteIDField':\"RouteID\",'measureField':\"measure\",'measureStartField':null,'measureEndField':null,'measureOffsetField':\"\",'errorInfoField':\"\",'retainedFields':null,'dataReturnOption':{'expectCount':1000,'dataset':\"GenerateSpatial_Point_DS_Test\",'dataReturnMode':\"DATASET_ONLY\",'deleteExistResultDataset':true}}";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var escapedJson = "{\"succeed\":true,\"recordset\":null,\"message\":null,\"dataset\":\"GenerateSpatial_Point_DS_Test@Changchun\"}";
            return Promise.resolve(new Response(escapedJson));
        });
        generateSpatialDataService.processAsync(generateSpatialDataParameters);
        setTimeout(() => {
            expect(generateSpatialDataService).not.toBeNull();
            expect(completedEventArgsSystem).not.toBeNull();
            expect(failedEventArgsSystem).toBeNull();
            expect(completedEventArgsSystem.type).toBe("processCompleted");
            var generateSpatialDataResult = completedEventArgsSystem.result;
            expect(generateSpatialDataResult).not.toBeNull();
            expect(generateSpatialDataResult.succeed).toBeTruthy();
            expect(generateSpatialDataResult.recordset).toBeNull();
            expect(generateSpatialDataResult.dataset).toBe(resultDataset_Point_DATASET + "@Changchun");
            generateSpatialDataService.destroy();
            expect(generateSpatialDataService.EVENT_TYPES).toBeNull();
            expect(generateSpatialDataService.events).toBeNull();
            expect(generateSpatialDataService.eventListeners).toBeNull();
            generateSpatialDataParameters.destroy();
            done();
        }, 1000)
    });

    // 线事件表数据集动态分段, DATASET_ONLY
    it('processAsync_LinearEventTable_DATASET_ONLY', (done) => {
        var resultDataset_Linear_DATASET = "GenerateSpatial_Linear_DS_Test";
        var generateSpatialDataService = initGenerateSpatialDataService();
        var dataRtnOption = new DataReturnOption({
            dataset: resultDataset_Linear_DATASET,
            deleteExistResultDataset: true,
            dataReturnMode: DataReturnMode.DATASET_ONLY
        });
        var generateSpatialDataParameters = new GenerateSpatialDataParameters({
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + "/datasets/RouteDT_road@Changchun/linearreferencing/generatespatialdata.json?returnContent=true");
            var expectParams = "{'routeTable':\"RouteDT_road@Changchun\",'routeIDField':\"RouteID\",'eventTable':\"LinearEventTabDT@Changchun\",'eventRouteIDField':\"RouteID\",'measureField':\"\",'measureStartField':\"LineMeasureFrom\",'measureEndField':\"LineMeasureTo\",'measureOffsetField':\"\",'errorInfoField':\"\",'retainedFields':null,'dataReturnOption':{'expectCount':1000,'dataset':\"GenerateSpatial_Linear_DS_Test\",'dataReturnMode':\"DATASET_ONLY\",'deleteExistResultDataset':true}}";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var escapedJson = "{\"succeed\":true,\"recordset\":null,\"message\":null,\"dataset\":\"GenerateSpatial_Linear_DS_Test@Changchun\"}";
            return Promise.resolve(new Response(escapedJson));
        });
        generateSpatialDataService.processAsync(generateSpatialDataParameters);
        setTimeout(() => {
            expect(generateSpatialDataService).not.toBeNull();
            expect(completedEventArgsSystem).not.toBeNull();
            expect(failedEventArgsSystem).toBeNull();
            expect(completedEventArgsSystem.type).toBe("processCompleted");
            var generateSpatialDataResult = completedEventArgsSystem.result;
            expect(generateSpatialDataResult).not.toBeNull();
            expect(generateSpatialDataResult.succeed).toBeTruthy();
            expect(generateSpatialDataResult.recordset).toBeNull();
            expect(generateSpatialDataResult.dataset).toEqual(resultDataset_Linear_DATASET + "@Changchun");
            generateSpatialDataParameters.destroy();
            generateSpatialDataService.destroy();
            done();
        }, 1000)
    });

    // 点事件表数据集动态分段,并设置期望返回记录数2。
    it('processAsync_PointEventTable_RECORDSET_ONLY', (done) => {
        var dataRtnOption = new DataReturnOption({
            expectCount: 2,
            dataset: "",
            deleteExistResultDataset: true,
            dataReturnMode: DataReturnMode.RECORDSET_ONLY
        });
        var generateSpatialDataParameters = new GenerateSpatialDataParameters({
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + "/datasets/RouteDT_road@Changchun/linearreferencing/generatespatialdata.json?returnContent=true");
            var expectParams = "{'routeTable':\"RouteDT_road@Changchun\",'routeIDField':\"RouteID\",'eventTable':\"PointEventTabDT@Changchun\",'eventRouteIDField':\"RouteID\",'measureField':\"measure\",'measureStartField':null,'measureEndField':null,'measureOffsetField':\"\",'errorInfoField':\"\",'retainedFields':null,'dataReturnOption':{'expectCount':2,'dataset':\"\",'dataReturnMode':\"RECORDSET_ONLY\",'deleteExistResultDataset':true}}";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var escapedJson = "{\"succeed\":true,\"recordset\":{\"features\":[{\"fieldNames\":[\"SmID\",\"SmX\",\"SmY\",\"SmLibTileID\",\"SmUserID\",\"SmGeometrySize\",\"SmGeoPosition\",\"RouteID\",\"Measure\",\"Event_SMID\"],\"geometry\":{\"center\":{\"x\":4567.867467731736,\"y\":-4052.8153568908647},\"parts\":[1],\"style\":null,\"prjCoordSys\":null,\"id\":1,\"type\":\"POINT\",\"partTopo\":null,\"points\":[{\"x\":4567.867467731736,\"y\":-4052.8153568908647}]},\"fieldValues\":[\"1\",\"4567.867467731736\",\"-4052.8153568908647\",\"1\",\"24\",\"20\",\"3309568\",\"560\",\"356.0\",\"1\"],\"ID\":1},{\"fieldNames\":[\"SmID\",\"SmX\",\"SmY\",\"SmLibTileID\",\"SmUserID\",\"SmGeometrySize\",\"SmGeoPosition\",\"RouteID\",\"Measure\",\"Event_SMID\"],\"geometry\":{\"center\":{\"x\":5470.7165973049505,\"y\":-2922.2119992383105},\"parts\":[1],\"style\":null,\"prjCoordSys\":null,\"id\":2,\"type\":\"POINT\",\"partTopo\":null,\"points\":[{\"x\":5470.7165973049505,\"y\":-2922.2119992383105}]},\"fieldValues\":[\"2\",\"5470.7165973049505\",\"-2922.2119992383105\",\"1\",\"24\",\"20\",\"3309588\",\"720\",\"158.0\",\"2\"],\"ID\":2}],\"fieldCaptions\":[\"SmID\",\"SmX\",\"SmY\",\"SmLibTileID\",\"SmUserID\",\"SmGeometrySize\",\"SmGeoPosition\",\"RouteID\",\"Measure\",\"Event_SMID\"],\"fieldTypes\":[\"INT32\",\"DOUBLE\",\"DOUBLE\",\"INT32\",\"INT32\",\"INT32\",\"INT64\",\"INT32\",\"DOUBLE\",\"INT32\"],\"datasetName\":null,\"fields\":[\"SmID\",\"SmX\",\"SmY\",\"SmLibTileID\",\"SmUserID\",\"SmGeometrySize\",\"SmGeoPosition\",\"RouteID\",\"Measure\",\"Event_SMID\"]},\"message\":null,\"dataset\":null}";
            return Promise.resolve(new Response(escapedJson));
        });
        generateSpatialDataService.processAsync(generateSpatialDataParameters);
        setTimeout(() => {
            expect(generateSpatialDataService).not.toBeNull();
            expect(completedEventArgsSystem.type).toBe("processCompleted");
            var generateSpatialDataResult = completedEventArgsSystem.result;
            expect(generateSpatialDataResult).not.toBeNull();
            expect(generateSpatialDataResult.succeed).toBeTruthy();
            expect(generateSpatialDataResult.dataset).toBeNull();
            var features = completedEventArgsSystem.result.recordset.features;
            expect(features).not.toBeNull();
            expect(features.type).toBe("FeatureCollection");
            expect(features.features.length).toEqual(2);
            generateSpatialDataService.destroy();
            generateSpatialDataParameters.destroy();
            done();
        }, 1000)
    });

    // 线事件表数据集动态分段,并设置期望返回记录数2。
    it('processAsync_LinearEventTable_RECORDSET_ONLY', (done) => {
        var generateSpatialDataService = initGenerateSpatialDataService();
        var dataRtnOption = new DataReturnOption({
            expectCount: 2,
            dataset: "",
            deleteExistResultDataset: true,
            dataReturnMode: DataReturnMode.RECORDSET_ONLY
        });
        var generateSpatialDataParameters = new GenerateSpatialDataParameters({
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + "/datasets/RouteDT_road@Changchun/linearreferencing/generatespatialdata.json?returnContent=true");
            var expectParams = "{'routeTable':\"RouteDT_road@Changchun\",'routeIDField':\"RouteID\",'eventTable':\"LinearEventTabDT@Changchun\",'eventRouteIDField':\"RouteID\",'measureField':\"\",'measureStartField':\"LineMeasureFrom\",'measureEndField':\"LineMeasureTo\",'measureOffsetField':\"\",'errorInfoField':\"\",'retainedFields':null,'dataReturnOption':{'expectCount':2,'dataset':\"\",'dataReturnMode':\"RECORDSET_ONLY\",'deleteExistResultDataset':true}}";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var escapedJson = "{\"succeed\":true,\"recordset\":{\"features\":[{\"fieldNames\":[\"SmID\",\"SmSdriW\",\"SmSdriN\",\"SmSdriE\",\"SmSdriS\",\"SmUserID\",\"SmTopoError\",\"SmMaxMeasure\",\"SmMinMeasure\",\"SmLength\",\"SmGeometrySize\",\"SmGeoPosition\",\"RouteID\",\"LineMeasureFrom\",\"LineMeasureTo\",\"NAME\",\"TrafficStatus\",\"Event_SMID\"],\"geometry\":{\"line\":null,\"center\":null,\"length\":1258.8231315962066,\"minM\":0,\"type\":\"LINEM\",\"points\":[{\"measure\":0,\"x\":4030.2000322076688,\"y\":-5758.197662443126},{\"measure\":425.4514780663061,\"x\":4455.639319487514,\"y\":-5754.976943948421},{\"measure\":1258.8231315962066,\"x\":5289.01068425431,\"y\":-5754.283190470987}],\"parts\":[3],\"maxM\":1258.8231315962066,\"style\":null,\"prjCoordSys\":null,\"id\":1,\"region\":null,\"partTopo\":null},\"fieldValues\":[\"1\",\"4030.2\",\"-5754.283\",\"5289.0107\",\"-5758.1978\",\"0\",\"0\",\"1258.8231315962066\",\"0.0\",\"1258.8231315962066\",\"84\",\"16056320\",\"10\",\"0.0\",\"1258.8231315962066\",\"南湖大路\",\"畅通\",\"1\"],\"ID\":1},{\"fieldNames\":[\"SmID\",\"SmSdriW\",\"SmSdriN\",\"SmSdriE\",\"SmSdriS\",\"SmUserID\",\"SmTopoError\",\"SmMaxMeasure\",\"SmMinMeasure\",\"SmLength\",\"SmGeometrySize\",\"SmGeoPosition\",\"RouteID\",\"LineMeasureFrom\",\"LineMeasureTo\",\"NAME\",\"TrafficStatus\",\"Event_SMID\"],\"geometry\":{\"line\":null,\"center\":null,\"length\":1246.05997322132,\"minM\":0,\"type\":\"LINEM\",\"points\":[{\"measure\":0,\"x\":4031.546988614261,\"y\":-6673.697364254913},{\"measure\":348.24461005823053,\"x\":4379.791383014397,\"y\":-6673.309803302958},{\"measure\":805.9462905472112,\"x\":4837.492515116954,\"y\":-6674.018318987329},{\"measure\":1064.909015494496,\"x\":5096.454997753926,\"y\":-6673.664061145143},{\"measure\":1246.05997322132,\"x\":5277.604874646225,\"y\":-6673.038291818071}],\"parts\":[5],\"maxM\":1246.05997322132,\"style\":null,\"prjCoordSys\":null,\"id\":2,\"region\":null,\"partTopo\":null},\"fieldValues\":[\"2\",\"4031.5469\",\"-6673.038\",\"5277.605\",\"-6674.0186\",\"0\",\"0\",\"1246.05997322132\",\"0.0\",\"1246.05997322132\",\"132\",\"16056404\",\"20\",\"0.0\",\"1246.05997322132\",\"卫星路\",\"畅通\",\"2\"],\"ID\":2}],\"fieldCaptions\":[\"SmID\",\"SmSdriW\",\"SmSdriN\",\"SmSdriE\",\"SmSdriS\",\"SmUserID\",\"SmTopoError\",\"SmMaxMeasure\",\"SmMinMeasure\",\"SmLength\",\"SmGeometrySize\",\"SmGeoPosition\",\"RouteID\",\"LineMeasureFrom\",\"LineMeasureTo\",\"Name\",\"TrafficStatus\",\"Event_SMID\"],\"fieldTypes\":[\"INT32\",\"SINGLE\",\"SINGLE\",\"SINGLE\",\"SINGLE\",\"INT32\",\"INT32\",\"DOUBLE\",\"DOUBLE\",\"DOUBLE\",\"INT32\",\"INT64\",\"INT32\",\"DOUBLE\",\"DOUBLE\",\"TEXT\",\"TEXT\",\"INT32\"],\"datasetName\":null,\"fields\":[\"SmID\",\"SmSdriW\",\"SmSdriN\",\"SmSdriE\",\"SmSdriS\",\"SmUserID\",\"SmTopoError\",\"SmMaxMeasure\",\"SmMinMeasure\",\"SmLength\",\"SmGeometrySize\",\"SmGeoPosition\",\"RouteID\",\"LineMeasureFrom\",\"LineMeasureTo\",\"NAME\",\"TrafficStatus\",\"Event_SMID\"]},\"message\":null,\"dataset\":null}";
            return Promise.resolve(new Response(escapedJson));
        });
        generateSpatialDataService.processAsync(generateSpatialDataParameters);
        setTimeout(() => {
            var generateSpatialDataResult = completedEventArgsSystem.result.recordset.features;
            expect(generateSpatialDataService).not.toBeNull();
            expect(generateSpatialDataResult).not.toBeNull();
            expect(generateSpatialDataResult.type).toBe("FeatureCollection");
            expect(generateSpatialDataResult.features.length).toEqual(2);
            generateSpatialDataService.destroy();
            generateSpatialDataParameters.destroy();
            done();
        }, 1000)
    });

    // 点事件表数据集动态分段,设置deleteExistResultDataset=false，并且设置一个已存在的数据集名称。
    // deleteExistResultDataset=false时期望失败，但其实成功了，iserver中此处未走checkDatasetExist逻辑，不知是预期还是错误。
    //xit('PointEventTable_deleteExistResultDataset=false', (done)=> {
    //    var dataRtnOption = new DataReturnOption({
    //        dataset: resultDataset_Point_DATASET,
    //        deleteExistResultDataset: false,
    //        dataReturnMode: DataReturnMode.DATASET_ONLY
    //    });
    //    var generateSpatialDataParameters = new GenerateSpatialDataParameters({
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
    //    setTimeout(()=> {
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

    // 线事件表数据集动态分段,设置deleteExistResultDataset=false，并且设置一个已存在的数据集名称。
    // deleteExistResultDataset=false时期望失败，但其实成功了，iserver中此处未走checkDatasetExist逻辑，不知是预期还是错误。
    //xit('LinearEventTable_deleteExistResultDataset_false', (done)=> {
    //    var generateSpatialDataService = initGenerateSpatialDataService();
    //    var dataRtnOption = new DataReturnOption({
    //        expectCount: 2000,
    //        dataset: "generateSpatialData",
    //        deleteExistResultDataset: false,
    //        dataReturnMode: DataReturnMode.DATASET_AND_RECORDSET
    //    });
    //    var generateSpatialDataParameters = new GenerateSpatialDataParameters({
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
    //    setTimeout(()=> {
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
});

