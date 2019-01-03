import {GetFieldsService} from '../../../src/common/iServer/GetFieldsService';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(dataServiceURL + "/datasources/World/datasets/Countries/fields.json?");
            var resultJson=`{"fieldNames":["SmID","SmSdriW","SmSdriN","SmSdriE","SmSdriS","SmUserID","SmArea","SmPerimeter","SmGeometrySize","SQKM","SQMI","COLOR_MAP","CAPITAL","COUNTRY","POP_1994","ColorID","CONTINENT"],"childUriList":["http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/SmID","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/SmSdriW","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/SmSdriN","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/SmSdriE","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/SmSdriS","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/SmUserID","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/SmArea","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/SmPerimeter","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/SmGeometrySize","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/SQKM","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/SQMI","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/COLOR_MAP","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/CAPITAL","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/COUNTRY","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/POP_1994","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/ColorID","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/fields/CONTINENT"]}`;
            return Promise.resolve(new Response(resultJson));
        });
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(dataServiceURL + "/datasources/World/datasets/NoDataset/fields.json?");
            var resultJson=`{"succeed":false,"error":{"code":404,"errorMsg":"资源不存在"}}`;
            return Promise.resolve(new Response(resultJson));
        });
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
