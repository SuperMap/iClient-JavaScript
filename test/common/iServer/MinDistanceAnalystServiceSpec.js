import { MinDistanceAnalystService } from '../../../src/common/iServer/MinDistanceAnalystService';
import { DatasetMinDistanceAnalystParameters } from '../../../src/common/iServer/DatasetMinDistanceAnalystParameters';
import { GeometryMinDistanceAnalystParameters } from '../../../src/common/iServer/GeometryMinDistanceAnalystParameters';
import { Point } from '../../../src/common/commontypes/geometry/Point';
import { FetchRequest } from '../../../src/common/util/FetchRequest';


var serviceFailedEventArgsSystem = null,analystEventArgsSystem = null;
var initMinDistanceAnalystService = (url,analyzeCompleted,analyzeFailed) => {
    return new MinDistanceAnalystService(url,
        {
            eventListeners: {
                "processCompleted": analyzeCompleted,
                'processFailed': analyzeFailed
            }
        });
};
describe('MinDistanceAnalystService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('headers', () => {
        let myHeaders = new Headers();
        var minDistanceAnalystService = new MinDistanceAnalystService(GlobeParameter.spatialAnalystURL, { headers: myHeaders });
        expect(minDistanceAnalystService).not.toBeNull();
        expect(minDistanceAnalystService.headers).not.toBeNull();
        minDistanceAnalystService.destroy();
    });
    
    it('crossOrigin', () => {
        var minDistanceAnalystService = new MinDistanceAnalystService(GlobeParameter.spatialAnalystURL, { crossOrigin: false });
        expect(minDistanceAnalystService).not.toBeNull();
        expect(minDistanceAnalystService.crossOrigin).toBeFalsy();
        minDistanceAnalystService.destroy();
    });

    //成功事件 AnalyzeByDatasets
    it('processAsync_byDatasets', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var analyzeFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var analyzeCompleted = (analyseEventArgs) => {
            analystEventArgsSystem = analyseEventArgs;
            try {
                var result = analystEventArgsSystem.result.distanceResults;
                expect(result).not.toBeNull();
                expect(result[0].distance).toBe(1941565.658677927);
                minDisServiceByDatasets.destroy();
                expect(minDisServiceByDatasets.events).toBeNull();
                expect(minDisServiceByDatasets.eventListeners).toBeNull();
                dsMinDistanceAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("MinDistanceAnalystService_" + exception.name + ":" + exception.message);
                minDisServiceByDatasets.destroy();
                dsMinDistanceAnalystParameters.destroy();
                done();
            }
        };
        var minDisServiceByDatasets = initMinDistanceAnalystService(spatialAnalystURL,analyzeCompleted,analyzeFailed);
        expect(minDisServiceByDatasets).not.toBeNull();
        expect(minDisServiceByDatasets.url).toEqual(spatialAnalystURL);

        var dsMinDistanceAnalystParameters = new DatasetMinDistanceAnalystParameters({
            dataset: "SamplesP@Interpolation",
            createResultDataset:false,
            referenceDatasetName:"Bounds@Interpolation",
            minDistance:0,
            maxDistance:-1,
            resultDatasetName:"minDistanceBounds",
            resultDatasourceName:"Interpolation"
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/SamplesP@Interpolation/mindistance?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.dataset).toBe("SamplesP@Interpolation");
            expect(paramsObj.createResultDataset).toBeFalsy();
            return Promise.resolve(new Response((JSON.stringify(minDistanceAnalystEscapedJson))));
        });
        minDisServiceByDatasets.processAsync(dsMinDistanceAnalystParameters);
    });

    //成功事件 AnalyzeByGeometry
    it('processAsync_byGeometry', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var analyzeFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var analyzeCompleted = (analyseEventArgs) => {
            analystEventArgsSystem = analyseEventArgs;
            try {
                var result = analystEventArgsSystem.result.distanceResults;
                expect(result).not.toBeNull();
                expect(result[0].distance).toBe(1941565.658677927);
                minDisServiceByGeometry.destroy();
                expect(minDisServiceByGeometry.events).toBeNull();
                expect(minDisServiceByGeometry.eventListeners).toBeNull();
                geoMinDistanceAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("MinDistanceAnalystService_" + exception.name + ":" + exception.message);
                minDisServiceByGeometry.destroy();
                geoMinDistanceAnalystParameters.destroy();
                done();
            }
        };
        var minDisServiceByGeometry = initMinDistanceAnalystService(spatialAnalystURL,analyzeCompleted,analyzeFailed);
        var geoMinDistanceAnalystParameters = new GeometryMinDistanceAnalystParameters({
            inputGeometries:[new Point(23, 23), new Point(33, 37)],
            referenceDatasetName:"Bounds@Interpolation",
            createResultDataset:false,
            minDistance:0,
            maxDistance:-1,
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/geometry/mindistance?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.createResultDataset).toBeFalsy();
            expect(paramsObj.inputGeometries.length).toEqual(2);
            return Promise.resolve(new Response((JSON.stringify(minDistanceAnalystEscapedJson))));
        });
        minDisServiceByGeometry.processAsync(geoMinDistanceAnalystParameters);
    });

    //测试失败事件 AnalyzeByGeometry
    it('fail:processAsync_byGeometry', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var analyzeFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("参数 points 错误：不能为空。");
                minDisServiceByGeometry.destroy();
                geoMinDistanceAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("MinDistanceAnalystService_" + exception.name + ":" + exception.message);
                minDisServiceByGeometry.destroy();
                geoMinDistanceAnalystParameters.destroy();
                done();
            }
        };
        var analyzeCompleted = (analyseEventArgs) => {
            analystEventArgsSystem = analyseEventArgs;
        };
        var minDisServiceByGeometry = initMinDistanceAnalystService(spatialAnalystURL,analyzeCompleted,analyzeFailed);
        var geoMinDistanceAnalystParameters = new GeometryMinDistanceAnalystParameters();
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/geometry/mindistance?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.inputGeometries).toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数 points 错误：不能为空。"}}`));
        });
        minDisServiceByGeometry.processAsync(geoMinDistanceAnalystParameters);
    });

    //测试失败事件 AnalyzeByDataset
    it('fail:processAsync_byDataset', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var analyzeFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(404);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("数据集test不存在");
                minDisServiceByDataset.destroy();
                dsThiessenAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("MinDistanceAnalystService_" + exception.name + ":" + exception.message);
                minDisServiceByDataset.destroy();
                dsThiessenAnalystParameters.destroy();
                done();
            }
        };
        var analyzeCompleted = (analyseEventArgs) => {
            analystEventArgsSystem = analyseEventArgs;
        };
        var minDisServiceByDataset = initMinDistanceAnalystService(spatialAnalystURL,analyzeCompleted,analyzeFailed);
        var dsThiessenAnalystParameters = new DatasetMinDistanceAnalystParameters({
            dataset: 'test'
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/test/mindistance?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.dataset).toBe('test');
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":404,"errorMsg":"数据集test不存在"}}`));
        });
        minDisServiceByDataset.processAsync(dsThiessenAnalystParameters);
    })
});

