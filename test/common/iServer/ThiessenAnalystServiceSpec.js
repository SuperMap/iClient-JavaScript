import {ThiessenAnalystService} from '../../../src/common/iServer/ThiessenAnalystService';
import {DatasetThiessenAnalystParameters} from '../../../src/common/iServer/DatasetThiessenAnalystParameters';
import {GeometryThiessenAnalystParameters} from '../../../src/common/iServer/GeometryThiessenAnalystParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {Point} from '../../../src/common/commontypes/geometry/Point';


var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;
var spatialAnalystURL_Changchun = GlobeParameter.spatialAnalystURL_Changchun;
var analyzeFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
var analyzeCompleted = (analyseEventArgs) => {
    analystEventArgsSystem = analyseEventArgs;
}
var initThiessenAnalystService = () => {
    return new ThiessenAnalystService(spatialAnalystURL_Changchun,
        {
            eventListeners: {
                "processCompleted": analyzeCompleted,
                'processFailed': analyzeFailed
            }
        });
}

describe('ThiessenAnalystService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //成功事件 AnalyzeByDatasets
    it('processAsync_byDatasets', (done) => {
        var tsServiceByDatasets = initThiessenAnalystService();
        expect(tsServiceByDatasets).not.toBeNull();
        expect(tsServiceByDatasets.url).toEqual(spatialAnalystURL_Changchun);

        var dsThiessenAnalystParameters = new DatasetThiessenAnalystParameters({
            dataset: "Park@Changchun",
            filterQueryParameter: new FilterParameter({attributeFilter: "SMID < 5"})
        });
        tsServiceByDatasets.processAsync(dsThiessenAnalystParameters);
        setTimeout(() => {
            try {
                var tsResult = analystEventArgsSystem.result.regions;
                expect(tsResult).not.toBeNull();
                expect(tsResult.type).toEqual("FeatureCollection");
                expect(tsResult.features.length).toEqual(4);
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
        }, 1500);
    });

    //成功事件 AnalyzeByGeometry
    it('processAsync_yGeometry', (done) => {
        var tsServiceByGeometry = initThiessenAnalystService();
        var points = [new Point(21.35414430430097, 91.59340881700358),
            new Point(20.50760752363726, 0.6802641290663991),
            new Point(28.208029226321006, 92.81799910814934),
            new Point(23.986958756157428, 95.21525547430991),
            new Point(30.762395431757028, 0.29794739028268236),
            new Point(20.607496079935604, 77.0461900744243)];
        var geoThiessenAnalystParameters = new GeometryThiessenAnalystParameters({
            points: points
        });
        tsServiceByGeometry.processAsync(geoThiessenAnalystParameters);
        setTimeout(() => {
            try {
                var tsResult = analystEventArgsSystem.result.regions;
                expect(tsResult).not.toBeNull();
                expect(tsResult.type).toEqual("FeatureCollection");
                expect(tsResult.features.length).toEqual(6);
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
        }, 1500);
    });

    //测试失败事件 AnalyzeByGeometry
    it('fail:processAsync_byGeometry', (done) => {
        var tsServiceByGeometry = initThiessenAnalystService();
        var geoThiessenAnalystParameters = new GeometryThiessenAnalystParameters();
        tsServiceByGeometry.processAsync(geoThiessenAnalystParameters);
        setTimeout(() => {
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
        }, 1500);
    });

    //测试失败事件 AnalyzeByDataset
    it('fail:processAsync_byDataset', (done) => {
        var tsServiceByDataset = initThiessenAnalystService();
        var dsThiessenAnalystParameters = new DatasetThiessenAnalystParameters({
            dataset: 'test'
        });
        tsServiceByDataset.processAsync(dsThiessenAnalystParameters);
        setTimeout(() => {
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
        }, 1500);
    })
});

