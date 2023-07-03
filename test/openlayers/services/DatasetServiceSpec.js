import {DatasetService} from '../../../src/openlayers/services/DatasetService';
import {CreateDatasetParameters} from '@supermap/iclient-common/iServer/CreateDatasetParameters';
import {UpdateDatasetParameters} from '@supermap/iclient-common/iServer/UpdateDatasetParameters';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';

var url = GlobeParameter.dataServiceURL;
var options = {

};
describe('openlayers_DatasetService', () => {
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

    // 数据集查询服务成功事件
    it('success:getDatasets', (done) => {
        var service = new DatasetService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url+"/datasources/name/World/datasets");
            expect(options).not.toBeNull();
            var getDatasourceEscapedJson = `{"datasetCount":34,"childUriList":[""LandCover","WorldEarth","worldimage","Night","Ocean","Ocean_Label","Country_Label","Continent_Label","Lakes","Rivers","Grids","continent_T","Ocean_Label_1","Capitals","OceanLabel","CountryLabel1","CountryLabel","China_island_part","China_Boundary_nanhai","China_Boundary_1","capital","world","ocean_label_2","continent_common","continent_robinson","continent_vanderGrintenI","airline","China_boundary_unsettling","China_Boundary","China_island","BackUp_Countries","BackUp_Countries_1","BackUp_Countries_2","Countries"]}`;
            return Promise.resolve(new Response(getDatasourceEscapedJson));
        });
        service.getDatasets("World", (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.element).toBe(undefined);
                expect(serviceResult.object.totalTimes).toBe(0);;
                expect(serviceResult.result.succeed).toBe(true);
                done();
            } catch (exception) {
                console.log("'success:getDatasets'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    
    //数据集信息查询服务成功事件
    it('success:getDataset', (done) => {
        var service = new DatasetService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url+"/datasources/name/World/datasets/name/LandCover");
            expect(options).not.toBeNull();
            var getDatasourceEscapedJson = `{"childUriList":["https://iserver.supermap.io/iserver/services/data-world/rest/data/datasources/name/World/datasets/name/continent_T/fields","https://iserver.supermap.io/iserver/services/data-world/rest/data/datasources/name/World/datasets/name/continent_T/features","https://iserver.supermap.io/iserver/services/data-world/rest/data/datasources/name/World/datasets/name/continent_T/domain"]}}`;
            return Promise.resolve(new Response(getDatasourceEscapedJson));
        });
        service.getDataset("World","LandCover", (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.CLASS_NAME).toBe("SuperMap.DatasetService");
                expect(serviceResult.result.succeed).toBe(true);
                done();
            } catch (exception) {
                console.log("'success:getDataset'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    // 数据集信息查询服务失败事件
    it('fail:getDataset', (done) => {
        var service = new DatasetService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url+"/datasources/name/World1/datasets/name/LandCover");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":404,"errorMsg":"数据源World1不存在，获取相应的数据服务组件失败"}}`));
        });
        service.getDataset("World1","LandCover", (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeTruthy();
                expect(serviceResult.dataset).not.toBeNull();
                expect(serviceResult.datasource).not.toBeNull();
                expect(serviceResult.error.code).toEqual(404);
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.error.errorMsg).toBe("数据源World1不存在，获取相应的数据服务组件失败");
                done();
            } catch (exception) {
                console.log("'fail:getDataset'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    // 数据集创建服务成功事件
    it('success:setDataset_create', (done) => {
        var datasetParameters = new CreateDatasetParameters({
            datasourceName: "World",
            datasetName: "World1",
            datasetType: "POINT"
        });
        var service = new DatasetService(url, options);
        spyOn(FetchRequest,'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("PUT");
            expect(testUrl).toBe(url + "/datasources/name/World/datasets/name/World1");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        service.setDataset(datasetParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.events).not.toBeNull();
                expect(serviceResult.options).not.toBeNull;
                expect(serviceResult.result.succeed).toBe(true);
                done();
            } catch (exception) {
                console.log("'fail:setDataset'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    // 数据集信息更改服务成功事件
    it('success:setDataset_update', (done) => {
        var datasetParameters = new UpdateDatasetParameters({
            datasourceName: "World",
            datasetName: "World1",
            description: "this is my try"
        });
        var service = new DatasetService(url, options);
        spyOn(FetchRequest,'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("PUT");
            expect(testUrl).toBe(url + "/datasources/name/World/datasets/name/World1");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        service.setDataset(datasetParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.events).not.toBeNull();
                expect(serviceResult.options).not.toBeNull;
                expect(serviceResult.result.succeed).toBe(true);
                done();
            } catch (exception) {
                console.log("'fail:setDataset'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    // 数据集服务删除成功事件
    it('success:deleteDataset', (done) => {
        var service = new DatasetService(url, options);
        spyOn(FetchRequest,'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("DELETE");
            expect(testUrl).toBe('http://localhost:9876/iserver/services/data-world/rest/data/datasources/name/World/datasets/name/continent_T');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        service.deleteDataset("World","continent_T", (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.object.isInTheSameDomain).toBe(true);
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.element).toBeNull();
                expect(serviceResult.result.succeed).toBe(true);
                done();
            } catch (exception) {
                console.log("'fail:setDataset'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    })
});