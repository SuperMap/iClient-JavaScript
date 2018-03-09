﻿import {BufferAnalystService} from '../../../src/common/iServer/BufferAnalystService';
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
var initBufferAnalystService = () => {
    return new BufferAnalystService(url, options);
};
var analyzeFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var analyzeCompleted = (analyseEventArgs) => {
    analystEventArgsSystem = analyseEventArgs;
};
var options = {
    eventListeners: {"processCompleted": analyzeCompleted, 'processFailed': analyzeFailed}
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
        var bfServiceByDatasets = initBufferAnalystService();
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
        bfServiceByDatasets.processAsync(dsBufferAnalystParameters);
        setTimeout(() => {
            try {
                expect(bfServiceByDatasets.mode).toEqual("datasets");
                expect(analystEventArgsSystem).not.toBeNull();
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
        }, 5000)
    });

    it('success:BufferAnalystService_byGeometry', (done) => {
        var bfServiceByGeometry = initBufferAnalystService();
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
        bfServiceByGeometry.processAsync(geometryBufferAnalystParameters);
        setTimeout(() => {
            try {
                var bfMode = analystEventArgsSystem.result.resultGeometry;
                expect(bfMode).not.toBeNull();
                expect(bfMode.type).toEqual("Feature");
                bfServiceByGeometry.destroy();
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
        }, 4000)
    });

    //测试失败事件
    it('fail:BufferAnalystService_byGeometry', (done) => {
        var bfServiceByGeometry = initBufferAnalystService();
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
        bfServiceByGeometry.processAsync(geometryBufferAnalystParameters);
        setTimeout(() => {
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
        }, 4000)
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', (done) => {
        var testResult = GlobeParameter.datajingjinURL + resultDataset;
        request.delete(testResult);
        done();
    });
});




