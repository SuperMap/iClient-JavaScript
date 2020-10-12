import {FieldService} from '../../../src/mapboxgl/services/FieldService';
import {FieldParameters} from '../../../src/common/iServer/FieldParameters';
import {FieldStatisticsParameters} from '../../../src/common/iServer/FieldStatisticsParameters';
import {StatisticMode} from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.dataServiceURL;
describe('mapboxgl_FieldService', () => {
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

    //字段查询服务
    it('getFields', (done) => {
        var fieldParameters = new FieldParameters({
            datasource: "World",
            dataset: "continent_T"
        });
        var service = new FieldService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("GET");
            expect(testUrl).toContain("iserver/services/data-world/rest/data/datasources/World/datasets/continent_T/fields");
            expect(options).not.toBeNull();
            var getFieldsEscapedJson = `{"fieldNames":["SmID","SmSdriW","SmSdriN","SmSdriE","SmSdriS","SmUserID","SmGeometrySize"],"childUriList":["http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/continent_T/fields/SmID","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/continent_T/fields/SmSdriW","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/continent_T/fields/SmSdriN","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/continent_T/fields/SmSdriE","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/continent_T/fields/SmSdriS","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/continent_T/fields/SmUserID","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/continent_T/fields/SmGeometrySize"]}`;
            return Promise.resolve(new Response(getFieldsEscapedJson));
        });
        service.getFields(fieldParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.datasource).toEqual("World");
                expect(serviceResult.object.dataset).toEqual("continent_T");
                expect(serviceResult.result.childUriList.length).toEqual(7);
                expect(serviceResult.result.fieldNames.length).toEqual(7);
                expect(serviceResult.result.fieldNames[0]).toEqual("SmID");
                done();
            } catch (e) {
                console.log("'getFields'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //字段统计服务
    it('getFieldStatisticsInfo', (done) => {
        var fieldStatisticsParameters = new FieldStatisticsParameters({
            datasource: "World",
            dataset: "Countries",
            fieldName: "SmID",
            //字段统计方法类型
            statisticMode: [
                StatisticMode.MAX,
                StatisticMode.MIN,
                StatisticMode.SUM,
                StatisticMode.AVERAGE,
                StatisticMode.STDDEVIATION,
                StatisticMode.VARIANCE
            ]
        });
        var service = new FieldService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method,url) => {
            expect(method).toBe("GET");
            if (url.indexOf("/AVERAGE") > -1) {
                return Promise.resolve(new Response(`{"result":4,"mode":"AVERAGE"}`));
            }else if(url.indexOf("/MAX")>-1){
                return Promise.resolve(new Response(`{"result":7,"mode":"MAX"}`));
            }else if(url.indexOf("/MIN")>-1){
                return Promise.resolve(new Response(`{"result":1,"mode":"MIN"}`));
            }else if(url.indexOf("/STDDEVIATION")>-1){
                return Promise.resolve(new Response(`{"result":2.160246899469287,"mode":"STDDEVIATION"}`));
            }else if(url.indexOf("/SUM")>-1){
                return Promise.resolve(new Response(`{"result":28,"mode":"SUM"}`));
            }else if(url.indexOf("/VARIANCE")>-1){
                return Promise.resolve(new Response(`{"result":4.666666666666667,"mode":"VARIANCE"}`));
            }
            return Promise.resolve();
        });
        service.getFieldStatisticsInfo(fieldStatisticsParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(service.currentStatisticResult).not.toBeNull();
                expect(service.currentStatisticResult.AVERAGE).toEqual(4);
                expect(service.currentStatisticResult.MAX).toEqual(7);
                expect(service.currentStatisticResult.MIN).toEqual(1);
                expect(service.currentStatisticResult.STDDEVIATION).toEqual(2.160246899469287);
                expect(service.currentStatisticResult.SUM).toEqual(28);
                expect(service.currentStatisticResult.VARIANCE).toEqual(4.666666666666667);
                expect(service.currentStatisticResult.fieldName).toEqual("SmID");
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.result.AVERAGE).toEqual(4);
                expect(serviceResult.result.MAX).toEqual(7);
                expect(serviceResult.result.MIN).toEqual(1);
                expect(serviceResult.result.STDDEVIATION).toEqual(2.160246899469287);
                expect(serviceResult.result.SUM).toEqual(28);
                expect(serviceResult.result.VARIANCE).toEqual(4.666666666666667);
                expect(serviceResult.result.fieldName).toEqual("SmID");
                done();
            } catch (e) {
                console.log("'getFieldStatisticsInfo'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});