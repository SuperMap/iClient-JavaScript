import {ThiessenAnalystService} from '../../../src/common/iServer/ThiessenAnalystService';
import {DatasetThiessenAnalystParameters} from '../../../src/common/iServer/DatasetThiessenAnalystParameters';
import {GeometryThiessenAnalystParameters} from '../../../src/common/iServer/GeometryThiessenAnalystParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import { FetchRequest } from '../../../src/common/util/FetchRequest';


var serviceFailedEventArgsSystem = null,analystEventArgsSystem = null;
var initThiessenAnalystService = (url,analyzeCompleted,analyzeFailed) => {
    return new ThiessenAnalystService(url,
        {
            eventListeners: {
                "processCompleted": analyzeCompleted,
                'processFailed': analyzeFailed
            }
        });
};
describe('ThiessenAnalystService', () => {
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
        var thiessenAnalystService = new ThiessenAnalystService(GlobeParameter.spatialAnalystURL_Changchun, { headers: myHeaders });
        expect(thiessenAnalystService).not.toBeNull();
        expect(thiessenAnalystService.headers).not.toBeNull();
        thiessenAnalystService.destroy();
    });
    
    it('crossOrigin', () => {
        var thiessenAnalystService = new ThiessenAnalystService(GlobeParameter.spatialAnalystURL_Changchun, { crossOrigin: false });
        expect(thiessenAnalystService).not.toBeNull();
        expect(thiessenAnalystService.crossOrigin).toBeFalsy();
        thiessenAnalystService.destroy();
    });

    //成功事件 AnalyzeByDatasets
    it('processAsync_byDatasets', (done) => {
        var spatialAnalystURL_Changchun = GlobeParameter.spatialAnalystURL_Changchun;
        var analyzeFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var analyzeCompleted = (analyseEventArgs) => {
            analystEventArgsSystem = analyseEventArgs;
            try {
                var tsResult = analystEventArgsSystem.result.regions;
                expect(tsResult).not.toBeNull();
                expect(tsResult.type).toEqual("FeatureCollection");
                expect(tsResult.features.length).toEqual(3);
                expect(tsResult.features[0].type).toEqual("Feature");
                expect(tsResult.features[0].geometry).not.toBeNull();
                expect(tsResult.features[0].geometry.coordinates).not.toBeNull();
                expect(tsResult.features[0].geometry.type).toEqual("MultiPolygon");
                tsServiceByDatasets.destroy();
                expect(tsServiceByDatasets.events).toBeNull();
                expect(tsServiceByDatasets.eventListeners).toBeNull();
                dsThiessenAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThiessenAnalystService_" + exception.name + ":" + exception.message);
                tsServiceByDatasets.destroy();
                dsThiessenAnalystParameters.destroy();
                done();
            }
        };
        var tsServiceByDatasets = initThiessenAnalystService(spatialAnalystURL_Changchun,analyzeCompleted,analyzeFailed);
        expect(tsServiceByDatasets).not.toBeNull();
        expect(tsServiceByDatasets.url).toEqual(spatialAnalystURL_Changchun);

        var dsThiessenAnalystParameters = new DatasetThiessenAnalystParameters({
            dataset: "Park@Changchun",
            filterQueryParameter: new FilterParameter({attributeFilter: "SMID < 5"})
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL_Changchun + "/datasets/Park@Changchun/thiessenpolygon.json?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.dataset).toBe("Park@Changchun");
            expect(paramsObj.filterQueryParameter.attributeFilter).toBe("SMID %26lt; 5");
            return Promise.resolve(new Response(JSON.stringify(thiessenAnalysisDatasetsEscapedJson)));
        });
        tsServiceByDatasets.processAsync(dsThiessenAnalystParameters);
    });

    //成功事件 AnalyzeByGeometry
    it('processAsync_yGeometry', (done) => {
        var spatialAnalystURL_Changchun = GlobeParameter.spatialAnalystURL_Changchun;
        var analyzeFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var analyzeCompleted = (analyseEventArgs) => {
            analystEventArgsSystem = analyseEventArgs;
            try {
                var tsResult = analystEventArgsSystem.result.regions;
                expect(tsResult).not.toBeNull();
                expect(tsResult.type).toEqual("FeatureCollection");
                expect(tsResult.features.length).toEqual(10);
                expect(tsResult.features[0].type).toEqual("Feature");
                expect(tsResult.features[0].geometry).not.toBeNull();
                expect(tsResult.features[0].geometry.coordinates).not.toBeNull();
                expect(tsResult.features[0].geometry.type).toEqual("MultiPolygon");
                tsServiceByGeometry.destroy();
                expect(tsServiceByGeometry.events).toBeNull();
                expect(tsServiceByGeometry.eventListeners).toBeNull();
                geoThiessenAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThiessenAnalystService_" + exception.name + ":" + exception.message);
                tsServiceByGeometry.destroy();
                geoThiessenAnalystParameters.destroy();
                done();
            }
        };
        var tsServiceByGeometry = initThiessenAnalystService(spatialAnalystURL_Changchun,analyzeCompleted,analyzeFailed);
        var points = [new Point(21.35414430430097, 91.59340881700358),
            new Point(20.50760752363726, 0.6802641290663991),
            new Point(28.208029226321006, 92.81799910814934),
            new Point(23.986958756157428, 95.21525547430991),
            new Point(30.762395431757028, 0.29794739028268236),
            new Point(20.607496079935604, 77.0461900744243)];
        var geoThiessenAnalystParameters = new GeometryThiessenAnalystParameters({
            points: points
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL_Changchun + "/geometry/thiessenpolygon.json?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.createResultDataset).toBeFalsy();
            expect(paramsObj.points.length).toEqual(6);
            return Promise.resolve(new Response(thiessenAnalysisGeometryEscapedJson));
        });
        tsServiceByGeometry.processAsync(geoThiessenAnalystParameters);
    });

    //测试失败事件 AnalyzeByGeometry
    it('fail:processAsync_byGeometry', (done) => {
        var spatialAnalystURL_Changchun = GlobeParameter.spatialAnalystURL_Changchun;
        var analyzeFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("参数 points 错误：不能为空。");
                tsServiceByGeometry.destroy();
                geoThiessenAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThiessenAnalystService_" + exception.name + ":" + exception.message);
                tsServiceByGeometry.destroy();
                geoThiessenAnalystParameters.destroy();
                done();
            }
        };
        var analyzeCompleted = (analyseEventArgs) => {
            analystEventArgsSystem = analyseEventArgs;
        };
        var tsServiceByGeometry = initThiessenAnalystService(spatialAnalystURL_Changchun,analyzeCompleted,analyzeFailed);
        var geoThiessenAnalystParameters = new GeometryThiessenAnalystParameters();
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL_Changchun + "/geometry/thiessenpolygon.json?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.points).toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数 points 错误：不能为空。"}}`));
        });
        tsServiceByGeometry.processAsync(geoThiessenAnalystParameters);
    });

    //测试失败事件 AnalyzeByDataset
    it('fail:processAsync_byDataset', (done) => {
        var spatialAnalystURL_Changchun = GlobeParameter.spatialAnalystURL_Changchun;
        var analyzeFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(404);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("数据集test不存在");
                tsServiceByDataset.destroy();
                dsThiessenAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThiessenAnalystService_" + exception.name + ":" + exception.message);
                tsServiceByDataset.destroy();
                dsThiessenAnalystParameters.destroy();
                done();
            }
        };
        var analyzeCompleted = (analyseEventArgs) => {
            analystEventArgsSystem = analyseEventArgs;
        };
        var tsServiceByDataset = initThiessenAnalystService(spatialAnalystURL_Changchun,analyzeCompleted,analyzeFailed);
        var dsThiessenAnalystParameters = new DatasetThiessenAnalystParameters({
            dataset: 'test'
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL_Changchun + "/datasets/test/thiessenpolygon.json?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.dataset).toBe('test');
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":404,"errorMsg":"数据集test不存在"}}`));
        });
        tsServiceByDataset.processAsync(dsThiessenAnalystParameters);
    })
});

