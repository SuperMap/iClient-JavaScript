import { FetchRequest } from '../../../src/common/util/FetchRequest';
import {BufferAnalystService} from '../../../src/common/iServer/BufferAnalystService';
import {GeometryBufferAnalystParameters} from '../../../src/common/iServer/GeometryBufferAnalystParameters';
import {DatasetBufferAnalystParameters} from '../../../src/common/iServer/DatasetBufferAnalystParameters';
import {BufferSetting} from '../../../src/common/iServer/BufferSetting';
import {DataReturnOption} from '../../../src/common/iServer/DataReturnOption';
import {Geometry} from '../../../src/common/commontypes/Geometry';
import {BufferEndType} from '../../../src/common/REST';
import {DataReturnMode} from '../../../src/common/REST';
import request from 'request';

var url = GlobeParameter.spatialAnalystURL;
var serviceFailedEventArgsSystem = null, analystEventArgsSystem = null;
var initBufferAnalystService = (analyzeCompleted,analyzeFailed,newUrl) => {
    return new BufferAnalystService(newUrl || url,  {
            eventListeners: {"processCompleted": analyzeCompleted, 'processFailed': analyzeFailed}
        });
};
var analyzeFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var analyzeCompleted1 = (analyseEventArgs) => {
    analystEventArgsSystem = analyseEventArgs;
};

describe('BufferAnalystService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        serviceFailedEventArgsSystem = null;
        analystEventArgsSystem = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var resultDataset = "BufferAnalystByDS_commonTest";
    //测试成功事件
    it('success:BufferAnalystService_byDatasets', (done) => {
        var analyzeCompleted = (analyseEventArgs) => {
            analystEventArgsSystem = analyseEventArgs;
            try {
                expect(bfServiceByDatasets.mode).toEqual("datasets");
                expect(analystEventArgsSystem).not.toBeNull();
                var analystResult = analystEventArgsSystem.result;
                expect(analystResult).not.toBeNull();
                expect(analystResult.message).toBeNull();
                expect(analystResult.recordset).toBeNull();
                expect(analystResult.succeed).toBeTruthy();
                bfServiceByDatasets.destroy();
                expect(bfServiceByDatasets.events).toBeNull();
                expect(bfServiceByDatasets.eventListeners).toBeNull();
                expect(bfServiceByDatasets.mode).toBeNull();
                dsBufferAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("BufferAnalystService_byDatasets" + exception.name + ":" + exception.message);
                bfServiceByDatasets.destroy();
                dsBufferAnalystParameters.destroy();
                done();
            }
        };
        var bfServiceByDatasets = initBufferAnalystService(analyzeCompleted,analyzeFailed);
        var resultSetting = new DataReturnOption({
            expectCount: 2000,
            dataset: resultDataset,
            dataReturnMode: DataReturnMode.DATASET_ONLY,
            deleteExistResultDataset: true
        });
        var dsBufferAnalystParameters = new DatasetBufferAnalystParameters();
        dsBufferAnalystParameters.dataset = "Landuse_R@Jingjin";
        dsBufferAnalystParameters.filterQueryParameter.attributeFilter = "smid like 48";
        dsBufferAnalystParameters.bufferSetting.endType = BufferEndType.ROUND;
        dsBufferAnalystParameters.bufferSetting.semicircleLineSegment = 5;
        dsBufferAnalystParameters.bufferSetting.leftDistance.value = 100;
        dsBufferAnalystParameters.resultSetting = resultSetting;

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/datasets/Landuse_R@Jingjin/buffer?returnContent=true");
            expect(params).not.toBeNull();
            // expect(params).toContain("'dataReturnMode':\"DATASET_ONLY\"");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.dataReturnOption.dataReturnMode).toBe("DATASET_ONLY");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(bufferAnalysisByDatasetRecordNullResultJson)));
        });

        bfServiceByDatasets.processAsync(dsBufferAnalystParameters);

    });

    it('success:BufferAnalystService_byGeometry', (done) => {
        var analyzeCompleted = (analyseEventArgs) => {
            analystEventArgsSystem = analyseEventArgs;
            try {
                expect(analystEventArgsSystem.type).toBe("processCompleted");
                var bfMode = analystEventArgsSystem.result.resultGeometry;
                expect(bfMode).not.toBeNull();
                expect(bfMode.type).toEqual("Feature");
                bfServiceByGeometry.destroy();
                var analystResult = analystEventArgsSystem.result;
                expect(analystResult).not.toBeNull();
                expect(analystResult.message).toBeNull();
                expect(analystResult.image).toBeNull();
                expect(analystResult.succeed).toBeTruthy();
                var resultGeometry = analystResult.resultGeometry;
                expect(resultGeometry.type).toBe("Feature");
                expect(resultGeometry.geometry.type).toBe("MultiPolygon");
                expect(resultGeometry.geometry.coordinates.length).toEqual(1);
                expect(bfServiceByGeometry.events).toBeNull();
                expect(bfServiceByGeometry.eventListeners).toBeNull();
                expect(bfServiceByGeometry.mode).toBeNull();
                geometryBufferAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("BufferAnalystService_byGeometry" + exception.name + ":" + exception.message);
                bfServiceByGeometry.destroy();
                geometryBufferAnalystParameters.destroy();
                done();
            }
        }
        var bfServiceByGeometry = initBufferAnalystService(analyzeCompleted,analyzeFailed);
        expect(bfServiceByGeometry).not.toBeNull();
        expect(bfServiceByGeometry.url).toEqual(url);
        var sourceGeometry = new Geometry.Point(7884.79277012316, 5072.18865322196);
        var bufferSetting = new BufferSetting();
        bufferSetting.endType = BufferEndType.ROUND;
        bufferSetting.leftDistance.value = 300;
        bufferSetting.semicircleLineSegment = 5;
        var geometryBufferAnalystParameters = new GeometryBufferAnalystParameters();
        geometryBufferAnalystParameters.sourceGeometry = sourceGeometry;
        geometryBufferAnalystParameters.bufferSetting = bufferSetting;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/geometry/buffer?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.analystParameter.semicircleLineSegment).toBe(5);
            // expect(params).toContain("'semicircleLineSegment':5");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(bufferAnalysis_byGeometryResultJson)));
        });
        bfServiceByGeometry.processAsync(geometryBufferAnalystParameters);
    });

    //测试失败事件
    it('fail:BufferAnalystService_byGeometry', (done) => {
        var analyzeFailed1 = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("左缓冲距离不能小于等于0");
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                bfServiceByGeometry.destroy();
                expect(bfServiceByGeometry.events).toBeNull();
                expect(bfServiceByGeometry.eventListeners).toBeNull();
                expect(bfServiceByGeometry.mode).toBeNull();
                geometryBufferAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("fail:BufferAnalystService_byGeometry" + exception.name + ":" + exception.message);
                bfServiceByGeometry.destroy();
                dsBufferAnalystParameters.destroy();
                done();
            }
        };

        var bfServiceByGeometry = initBufferAnalystService(analyzeCompleted1,analyzeFailed1);
        expect(bfServiceByGeometry).not.toBeNull();
        expect(bfServiceByGeometry.url).toEqual(url);
        var sourceGeometry = new Geometry.Point(7884.79277012316, 5072.18865322196);
        var bufferSetting = new BufferSetting();
        bufferSetting.endType = BufferEndType.ROUND;
        bufferSetting.leftDistance.value = -1;
        bufferSetting.semicircleLineSegment = 5;
        var geometryBufferAnalystParameters = new GeometryBufferAnalystParameters();
        geometryBufferAnalystParameters.sourceGeometry = sourceGeometry;
        geometryBufferAnalystParameters.bufferSetting = bufferSetting;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/geometry/buffer?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.analystParameter.semicircleLineSegment).toBe(5);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"左缓冲距离不能小于等于0。"}}`));
        });
        bfServiceByGeometry.processAsync(geometryBufferAnalystParameters);
    });

    it('success:BufferAnalystService_byDatasets_customQueryParam', (done) => {
        var analyzeCompleted = (analyseEventArgs) => {
            analystEventArgsSystem = analyseEventArgs;
            try {
                bfServiceByDatasets.destroy();
                dsBufferAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("BufferAnalystService_byDatasets" + exception.name + ":" + exception.message);
                bfServiceByDatasets.destroy();
                dsBufferAnalystParameters.destroy();
                done();
            }
        };
        var bfServiceByDatasets = initBufferAnalystService(analyzeCompleted,analyzeFailed,url + '?key=123');
        var resultSetting = new DataReturnOption({
            expectCount: 2000,
            dataset: resultDataset,
            dataReturnMode: DataReturnMode.DATASET_ONLY,
            deleteExistResultDataset: true
        });
        var dsBufferAnalystParameters = new DatasetBufferAnalystParameters();
        dsBufferAnalystParameters.dataset = "Landuse_R@Jingjin";
        dsBufferAnalystParameters.filterQueryParameter.attributeFilter = "smid like 48";
        dsBufferAnalystParameters.bufferSetting.endType = BufferEndType.ROUND;
        dsBufferAnalystParameters.bufferSetting.semicircleLineSegment = 5;
        dsBufferAnalystParameters.bufferSetting.leftDistance.value = 100;
        dsBufferAnalystParameters.resultSetting = resultSetting;

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(testUrl).toBe(url + "/datasets/Landuse_R@Jingjin/buffer?key=123&returnContent=true");
            return Promise.resolve(new Response(JSON.stringify(bufferAnalysisByDatasetRecordNullResultJson)));
        });

        bfServiceByDatasets.processAsync(dsBufferAnalystParameters);

    });

    it('success:BufferAnalystService_byGeometry_customQueryParam', (done) => {
        var analyzeCompleted = (analyseEventArgs) => {
            analystEventArgsSystem = analyseEventArgs;
            try {
                bfServiceByGeometry.destroy();
                geometryBufferAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("BufferAnalystService_byGeometry" + exception.name + ":" + exception.message);
                bfServiceByGeometry.destroy();
                geometryBufferAnalystParameters.destroy();
                done();
            }
        }
        var bfServiceByGeometry = initBufferAnalystService(analyzeCompleted,analyzeFailed,url + '?key=123');
        expect(bfServiceByGeometry).not.toBeNull();
        expect(bfServiceByGeometry.url).toEqual(url + '?key=123');
        var sourceGeometry = new Geometry.Point(7884.79277012316, 5072.18865322196);
        var bufferSetting = new BufferSetting();
        bufferSetting.endType = BufferEndType.ROUND;
        bufferSetting.leftDistance.value = 300;
        bufferSetting.semicircleLineSegment = 5;
        var geometryBufferAnalystParameters = new GeometryBufferAnalystParameters();
        geometryBufferAnalystParameters.sourceGeometry = sourceGeometry;
        geometryBufferAnalystParameters.bufferSetting = bufferSetting;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(testUrl).toBe(url + "/geometry/buffer?key=123&returnContent=true");
            return Promise.resolve(new Response(JSON.stringify(bufferAnalysis_byGeometryResultJson)));
        });
        bfServiceByGeometry.processAsync(geometryBufferAnalystParameters);
    });
});




