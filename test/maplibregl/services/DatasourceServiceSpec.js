import {DatasourceService} from '../../../src/maplibregl/services/DatasourceService';
import { SetDatasourceParameters } from '@supermapgis/iclient-common/iServer/SetDatasourceParameters';
import { FetchRequest } from '@supermapgis/iclient-common/util/FetchRequest';

var url = GlobeParameter.dataServiceURL;
var options = {

};
describe('maplibregl_DatasourceService', () => {
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

    //获取数据源集服务
    it('success:getDatasources', (done) => {
        var service = new DatasourceService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url+"/datasources");
            expect(options).not.toBeNull();
            var getDatasourceEscapedJson = `{"childUriList":["https://iserver.supermap.io/iserver/services/data-world/rest/data/datasources/name/World/datasets"],"datasourceInfo":{"coordUnit": "DEGREE","description": distanceUnit": "METER","engineType": "UDB","name": "World"}}`;
            return Promise.resolve(new Response(getDatasourceEscapedJson));
        });
        service.getDatasources((result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.totalTimes).toBe(0);
                expect(serviceResult.result.succeed).toBe(true);
                done();
            } catch (exception) {
                console.log("'success:getDatasourceService'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //数据源信息查询服务成功事件
    it('success:getDatasource', (done) => {
        var service = new DatasourceService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url+"/datasources/name/World");
            expect(options).not.toBeNull();
            var getDatasourceEscapedJson = `{"childUriList":["https://iserver.supermap.io/iserver/services/data-world/rest/data/datasources/name/World/datasets"],"datasourceInfo":{"coordUnit": "DEGREE","description": distanceUnit": "METER","engineType": "UDB","name": "World"}}`;
            return Promise.resolve(new Response(getDatasourceEscapedJson));
        });
        service.getDatasource("World", (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.CLASS_NAME).toBe("SuperMap.DatasourceService");
                expect(serviceResult.result.object).not.toBeNull();
                expect(serviceResult.result.datasourceInfo).not.toBeNull();
                expect(serviceResult.result.succeed).toBe(true);
                done();
            } catch (exception) {
                console.log("'success:getDatasourceService'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //数据源信息查询服务失败事件
    it('fail:getDatasource', (done) => {
        var service = new DatasourceService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url+"/datasources/name/World1");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":404,"errorMsg":"数据源World1不存在，获取相应的数据服务组件失败"}}`));
        });
        service.getDatasource("World1", (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeTruthy();
                expect(serviceResult.error.code).toEqual(404);
                expect(serviceResult.error.errorMsg).toBe("数据源World1不存在，获取相应的数据服务组件失败");
                done();
            } catch (e) {
                console.log("'fail:getFields'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    
    //数据集信息更改服务成功事件
    it('fail:setDatasource', (done) => {
        var datasourceParameters = new SetDatasourceParameters({
            datasourceName: "World",
            description:"This is a new description",
            coordUnit: "MILE",
            distanceUnit: "MILE"
        });
        var service = new DatasourceService(url, options);
        spyOn(FetchRequest,'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("PUT");
            expect(testUrl).toBe( url + "/datasources/name/World");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        service.setDatasource(datasourceParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.object).toBe(undefined);
                expect(serviceResult.object.url).toBe(url);
                done();
            } catch (exception) {
                console.log("'fail:setDataSource'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    })
});