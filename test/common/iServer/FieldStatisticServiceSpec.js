﻿import {FieldStatisticService} from '../../../src/common/iServer/FieldStatisticService';
import {StatisticMode} from '../../../src/common/REST';

var dataServiceURL = GlobeParameter.dataServiceURL;
var serviceFailedEventArgsSystem = null, fieldStatisticEventArgsSystem = null;
var initFieldStatisticService = () => {
    return new FieldStatisticService(dataServiceURL, options);
};
var fieldStatisticCompleted = (getFeaturesEventArgs) => {
    fieldStatisticEventArgsSystem = getFeaturesEventArgs;
};
var fieldStatisticFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var options = {
    eventListeners: {
        'processCompleted': fieldStatisticCompleted,
        'processFailed': fieldStatisticFailed
    }
};

describe('FieldStatisticService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //存在对应数据源数据集返回查询结果
    it('success:processAsync', (done) => {
        var fieldStatisticService = initFieldStatisticService();
        expect(fieldStatisticService).not.toBeNull();
        expect(fieldStatisticService.url).toBe(dataServiceURL);
        fieldStatisticService.dataset = "Countries";
        fieldStatisticService.datasource = "World";
        fieldStatisticService.field = "SmID";
        fieldStatisticService.statisticMode = StatisticMode.AVERAGE;
        fieldStatisticService.events.on({'processCompleted': fieldStatisticCompleted});
        fieldStatisticService.processAsync();
        setTimeout(() => {
            try {
                expect(fieldStatisticEventArgsSystem).not.toBeNull();
                expect(fieldStatisticEventArgsSystem.result.mode).toBe("AVERAGE");
                expect(fieldStatisticEventArgsSystem.result.result).toEqual(124);
                fieldStatisticService.destroy();
                expect(fieldStatisticService.EVENT_TYPES).toBeNull();
                expect(fieldStatisticService.events).toBeNull();
                expect(fieldStatisticService.datasource).toBeNull();
                expect(fieldStatisticService.field).toBeNull();
                expect(fieldStatisticService.statisticMode).toBeNull();
                expect(fieldStatisticService.dataset).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                fieldStatisticService.destroy();
                done();
            }
        }, 2000);
    });

    //错误数据集，查询错误
    it('processAsync_datasetsWrong', (done) => {
        var fieldStatisticService = initFieldStatisticService();
        fieldStatisticService.dataset = "NoDataset";
        fieldStatisticService.datasource = "World";
        fieldStatisticService.field = "NotIDThis";
        fieldStatisticService.statisticMode = StatisticMode.AVERAGE;
        fieldStatisticService.events.on({'processFailed': fieldStatisticFailed});
        fieldStatisticService.processAsync();
        setTimeout(() => {
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(500);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                fieldStatisticService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                fieldStatisticService.destroy();
                done();
            }
        }, 2000);
    })
});
