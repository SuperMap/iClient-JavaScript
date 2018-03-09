﻿import {GetFieldsService} from '../../../src/common/iServer/GetFieldsService';

var dataServiceURL = GlobeParameter.dataServiceURL;
var serviceFailedEventArgsSystem = null;
var getFieldsEventArgsSystem = null;
var initGetFieldsService = () => {
    return new GetFieldsService(dataServiceURL, options);
}
var getFieldsFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
var getFieldsCompleted = (getFieldsEventArgs) => {
    getFieldsEventArgsSystem = getFieldsEventArgs;
}
var options = {
    eventListeners: {
        processCompleted: getFieldsCompleted,
        processFailed: getFieldsFailed
    }
};

describe('GetFieldsService', () => {
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
        var getFieldsService = initGetFieldsService();
        expect(getFieldsService).not.toBeNull();
        getFieldsService.dataset = "Countries";
        getFieldsService.datasource = "World";
        getFieldsService.events.on({'processCompleted': getFieldsCompleted});
        getFieldsService.processAsync();
        setTimeout(() => {
            try {
                var getFieldsResult = getFieldsEventArgsSystem.result;
                expect(getFieldsEventArgsSystem).not.toBeNull();
                expect(getFieldsResult).not.toBeNull();
                expect(getFieldsResult.fieldNames).not.toBeNull();
                expect(getFieldsResult.fieldNames.length).toEqual(17);
                expect(getFieldsResult.childUriList).not.toBeNull();
                getFieldsService.destroy();
                expect(getFieldsService.EVENT_TYPES).toBeNull();
                expect(getFieldsService.events).toBeNull();
                expect(getFieldsService.datasource).toBeNull();
                expect(getFieldsService.dataset).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetFieldsService_" + exception.name + ":" + exception.message);
                getFieldsService.destroy();
                done();
            }
        }, 2000)
    });

    //错误数据集，查询错误
    it('processAsync_wrongDataset', (done) => {
        var getFieldsService = initGetFieldsService();
        getFieldsService.dataset = "NoDataset";
        getFieldsService.datasource = "World";
        getFieldsService.events.on({'processFailed': getFieldsFailed});
        getFieldsService.processAsync();
        setTimeout(() => {
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(404);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                getFieldsService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetFieldsService_" + exception.name + ":" + exception.message);
                getFieldsService.destroy();
                done();
            }
        }, 2000);
    });
});
