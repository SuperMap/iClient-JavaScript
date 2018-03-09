import {fieldService} from '../../../src/leaflet/services/FieldService';
import {FieldStatisticsParameters} from '../../../src/common/iServer/FieldStatisticsParameters';

var dataServiceURL = GlobeParameter.dataServiceURL;
var params = {
    datasource: "World",
    dataset: "continent_T"
};

describe('leaflet_FieldService', () => {
    var serviceResult;
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //字段查询服务 成功事件
    it('successEvent:getFields', (done) => {
        var getFieldsService = fieldService(dataServiceURL);
        getFieldsService.getFields(params, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFieldsService).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.datasource).toBe("World");
                expect(serviceResult.object.dataset).toBe("continent_T");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.fieldNames.length).toEqual(7);
                expect(serviceResult.result.childUriList.length).toEqual(7);
                getFieldsService.destroy();
                done();
            } catch (exception) {
                console.log("leafletFieldService_'successEvent:getFields'案例失败：" + exception.name + ":" + exception.message);
                getFieldsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });

    //字段查询服务 失败事件
    it('failEvent:getFields_dataSourceNotExist', (done) => {
        var getFieldsService = fieldService(dataServiceURL);
        getFieldsService.getFields({
            datasource: "World1",
            dataset: "continent_T"
        }, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFieldsService).not.toBeNull();
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.datasource).toBe("World1");
                expect(serviceResult.object.dataset).toBe("continent_T");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(404);
                expect(serviceResult.error.errorMsg).toBe("数据源World1不存在，获取相应的数据服务组件失败");
                getFieldsService.destroy();
                done();
            } catch (exception) {
                console.log("leafletFieldService_'failEvent:getFields_dataSourceNotExist'案例失败：" + exception.name + ":" + exception.message);
                getFieldsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });

    //字段统计服务 成功事件
    it('successEvent:getFieldStatisticsInfo', (done) => {
        var getFieldStatisticsInfoParams = new FieldStatisticsParameters({
            datasource: "World",
            dataset: "continent_T",
            fieldName: "SmID",
            statisticMode: ["AVERAGE", "MAX", "MIN", "STDDEVIATION", "SUM", "VARIANCE"]
        });
        var getFieldStatisticsInfoService = fieldService(dataServiceURL);
        getFieldStatisticsInfoService.getFieldStatisticsInfo(getFieldStatisticsInfoParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFieldStatisticsInfoService).not.toBeNull();
                expect(getFieldStatisticsInfoService.currentStatisticResult.fieldName).toBe("SmID");
                expect(getFieldStatisticsInfoService.currentStatisticResult.AVERAGE).toEqual(4);
                expect(getFieldStatisticsInfoService.currentStatisticResult.MAX).toEqual(7);
                expect(getFieldStatisticsInfoService.currentStatisticResult.MIN).toEqual(1);
                expect(getFieldStatisticsInfoService.currentStatisticResult.STDDEVIATION).toEqual(2.160246899469287);
                expect(getFieldStatisticsInfoService.currentStatisticResult.SUM).toEqual(28);
                expect(getFieldStatisticsInfoService.currentStatisticResult.VARIANCE).toEqual(4.666666666666667);
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.fieldName).toBe("SmID");
                expect(serviceResult.result.AVERAGE).toEqual(4);
                expect(serviceResult.result.MAX).toEqual(7);
                expect(serviceResult.result.MIN).toEqual(1);
                expect(serviceResult.result.STDDEVIATION).toEqual(2.160246899469287);
                expect(serviceResult.result.SUM).toEqual(28);
                expect(serviceResult.result.VARIANCE).toEqual(4.666666666666667);
                getFieldStatisticsInfoService.destroy();
                done();
            } catch (exception) {
                console.log("leafletFieldService_'successEvent:getFieldStatisticsInfo'案例失败：" + exception.name + ":" + exception.message);
                getFieldStatisticsInfoService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });

    //字段查询服务 失败事件
    it('failEvent:getFieldStatisticsInfo_dataSourceNotExist', (done) => {
        var getFieldStatisticsInfoParams = new FieldStatisticsParameters({
            datasource: "World1",
            dataset: "continent_T",
            fieldName: "SmID",
            statisticMode: ["AVERAGE", "MAX", "MIN", "STDDEVIATION", "SUM", "VARIANCE"]
        });
        var getFieldStatisticsInfoService = fieldService(dataServiceURL);
        getFieldStatisticsInfoService.getFieldStatisticsInfo(getFieldStatisticsInfoParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFieldStatisticsInfoService).not.toBeNull();
                expect(getFieldStatisticsInfoService.currentStatisticResult.fieldName).toBe("SmID");
                expect(getFieldStatisticsInfoService.currentStatisticResult.AVERAGE).toBeNull();
                expect(getFieldStatisticsInfoService.currentStatisticResult.MAX).toBeNull();
                expect(getFieldStatisticsInfoService.currentStatisticResult.MIN).toBeNull();
                expect(getFieldStatisticsInfoService.currentStatisticResult.STDDEVIATION).toBeNull();
                expect(getFieldStatisticsInfoService.currentStatisticResult.SUM).toBeNull();
                expect(getFieldStatisticsInfoService.currentStatisticResult.VARIANCE).toBeNull();
                expect(serviceResult.type).toEqual("processFailed");
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(404);
                expect(serviceResult.error.errorMsg).toBe("数据源World1不存在，获取相应的数据服务组件失败");
                getFieldStatisticsInfoService.destroy();
                done();
            } catch (exception) {
                console.log("leafletFieldService_'failEvent:getFieldStatisticsInfo_dataSourceNotExist'案例失败：" + exception.name + ":" + exception.message);
                getFieldStatisticsInfoService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });
});


