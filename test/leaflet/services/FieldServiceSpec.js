import { fieldService } from '../../../src/leaflet/services/FieldService';
import { FieldStatisticsParameters } from '../../../src/common/iServer/FieldStatisticsParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var dataServiceURL = GlobeParameter.dataServiceURL;
var params = {
  datasource: 'World',
  dataset: 'continent_T'
};

describe('leaflet_FieldService', () => {
  var serviceResult;
  var originalTimeout;
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    serviceResult = null;
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  //字段查询服务 成功事件
  it('successEvent:getFields', done => {
    var getFieldsService = fieldService(dataServiceURL);
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
      expect(method).toBe('GET');
      expect(testUrl).toContain('data-world/rest/data/datasources/World/datasets/continent_T/fields');
      expect(options).not.toBeNull();
      var getFieldsEscapedJson = `{"fieldNames":["SmID","SmSdriW","SmSdriN","SmSdriE","SmSdriS","SmUserID","SmGeometrySize"],"childUriList":["http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/continent_T/fields/SmID","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/continent_T/fields/SmSdriW","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/continent_T/fields/SmSdriN","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/continent_T/fields/SmSdriE","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/continent_T/fields/SmSdriS","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/continent_T/fields/SmUserID","http://localhost:8090/iserver/services/data-world/rest/data/datasources/World/datasets/continent_T/fields/SmGeometrySize"]}`;
      return Promise.resolve(new Response(getFieldsEscapedJson));
    });
    getFieldsService.getFields(params, result => {
      serviceResult = result;
      try {
        expect(getFieldsService).not.toBeNull();
        expect(serviceResult.type).toBe('processCompleted');
        expect(serviceResult.object.datasource).toBe('World');
        expect(serviceResult.object.dataset).toBe('continent_T');
        // expect(serviceResult.object.isInTheSameDomain).toBeTruthy();
        expect(serviceResult.result).not.toBeNull();
        expect(serviceResult.result.succeed).toBeTruthy();
        expect(serviceResult.result.fieldNames.length).toEqual(7);
        expect(serviceResult.result.childUriList.length).toEqual(7);
        getFieldsService.destroy();
        done();
      } catch (exception) {
        console.log(
          "leafletFieldService_'successEvent:getFields'案例失败：" + exception.name + ':' + exception.message
        );
        getFieldsService.destroy();
        expect(false).toBeTruthy();
        done();
      }
    });
  });

  //字段查询服务 失败事件
  it('failEvent:getFields_dataSourceNotExist', done => {
    var getFieldsService = fieldService(dataServiceURL);
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
      expect(method).toBe('GET');
      expect(testUrl).toContain('data-world/rest/data/datasources/World1/datasets/continent_T/fields');
      expect(options).not.toBeNull();
      return Promise.resolve(
        new Response(
          `{"succeed":false,"error":{"code":404,"errorMsg":"数据源World1不存在，获取相应的数据服务组件失败"}}`
        )
      );
    });
    getFieldsService.getFields(
      {
        datasource: 'World1',
        dataset: 'continent_T'
      },
      result => {
        serviceResult = result;
        try {
          expect(getFieldsService).not.toBeNull();
          expect(serviceResult.type).toBe('processFailed');
          expect(serviceResult.object.datasource).toBe('World1');
          expect(serviceResult.object.dataset).toBe('continent_T');
          // expect(serviceResult.object.isInTheSameDomain).toBeTruthy();
          expect(serviceResult.error).not.toBeNull();
          expect(serviceResult.error.code).toEqual(404);
          expect(serviceResult.error.errorMsg).toBe('数据源World1不存在，获取相应的数据服务组件失败');
          getFieldsService.destroy();
          done();
        } catch (exception) {
          console.log(
            "leafletFieldService_'failEvent:getFields_dataSourceNotExist'案例失败：" +
              exception.name +
              ':' +
              exception.message
          );
          getFieldsService.destroy();
          expect(false).toBeTruthy();
          done();
        }
      }
    );
  });

  //字段统计服务 成功事件
  it('successEvent:getFieldStatisticsInfo', done => {
    var getFieldStatisticsInfoParams = new FieldStatisticsParameters({
      datasource: 'World',
      dataset: 'continent_T',
      fieldName: 'SmID',
      statisticMode: ['AVERAGE', 'MAX', 'MIN', 'STDDEVIATION', 'SUM', 'VARIANCE']
    });
    var getFieldStatisticsInfoService = fieldService(dataServiceURL);
    spyOn(FetchRequest, 'commit').and.callFake((method, url) => {
      expect(method).toBe('GET');
      if (url.indexOf('/AVERAGE') > -1) {
        return Promise.resolve(new Response(`{"result":4,"mode":"AVERAGE"}`));
      } else if (url.indexOf('/MAX') > -1) {
        return Promise.resolve(new Response(`{"result":7,"mode":"MAX"}`));
      } else if (url.indexOf('/MIN') > -1) {
        return Promise.resolve(new Response(`{"result":1,"mode":"MIN"}`));
      } else if (url.indexOf('/STDDEVIATION') > -1) {
        return Promise.resolve(new Response(`{"result":2.160246899469287,"mode":"STDDEVIATION"}`));
      } else if (url.indexOf('/SUM') > -1) {
        return Promise.resolve(new Response(`{"result":28,"mode":"SUM"}`));
      } else if (url.indexOf('/VARIANCE') > -1) {
        return Promise.resolve(new Response(`{"result":4.666666666666667,"mode":"VARIANCE"}`));
      }
      return Promise.resolve();
    });
    getFieldStatisticsInfoService.getFieldStatisticsInfo(getFieldStatisticsInfoParams, result => {
      serviceResult = result;
      try {
        expect(getFieldStatisticsInfoService).not.toBeNull();
        expect(getFieldStatisticsInfoService._fieldService.currentStatisticResult.fieldName).toBe('SmID');
        expect(getFieldStatisticsInfoService._fieldService.currentStatisticResult.AVERAGE).toEqual(4);
        expect(getFieldStatisticsInfoService._fieldService.currentStatisticResult.MAX).toEqual(7);
        expect(getFieldStatisticsInfoService._fieldService.currentStatisticResult.MIN).toEqual(1);
        expect(getFieldStatisticsInfoService._fieldService.currentStatisticResult.STDDEVIATION).toEqual(2.160246899469287);
        expect(getFieldStatisticsInfoService._fieldService.currentStatisticResult.SUM).toEqual(28);
        expect(getFieldStatisticsInfoService._fieldService.currentStatisticResult.VARIANCE).toEqual(4.666666666666667);
        expect(serviceResult.result).not.toBeNull();
        expect(serviceResult.result.fieldName).toBe('SmID');
        expect(serviceResult.result.AVERAGE).toEqual(4);
        expect(serviceResult.result.MAX).toEqual(7);
        expect(serviceResult.result.MIN).toEqual(1);
        expect(serviceResult.result.STDDEVIATION).toEqual(2.160246899469287);
        expect(serviceResult.result.SUM).toEqual(28);
        expect(serviceResult.result.VARIANCE).toEqual(4.666666666666667);
        getFieldStatisticsInfoService.destroy();
        done();
      } catch (exception) {
        console.log(
          "leafletFieldService_'successEvent:getFieldStatisticsInfo'案例失败：" +
            exception.name +
            ':' +
            exception.message
        );
        getFieldStatisticsInfoService.destroy();
        expect(false).toBeTruthy();
        done();
      }
    });
  });

  //字段查询服务 失败事件
  it('failEvent:getFieldStatisticsInfo_dataSourceNotExist', done => {
    var getFieldStatisticsInfoParams = new FieldStatisticsParameters({
      datasource: 'World1',
      dataset: 'continent_T',
      fieldName: 'SmID',
      statisticMode: ['AVERAGE', 'MAX', 'MIN', 'STDDEVIATION', 'SUM', 'VARIANCE']
    });
    var getFieldStatisticsInfoService = fieldService(dataServiceURL);
    spyOn(FetchRequest, 'commit').and.callFake((method, url) => {
      expect(method).toBe('GET');
      if (url.indexOf('/AVERAGE') > -1) {
        return Promise.resolve(
          new Response(
            `{"succeed":false,"error":{"code":404,"errorMsg":"数据源World1不存在，获取相应的数据服务组件失败"}}`
          )
        );
      } else if (url.indexOf('/MAX') > -1) {
        return Promise.resolve(
          new Response(
            `{"succeed":false,"error":{"code":404,"errorMsg":"数据源World1不存在，获取相应的数据服务组件失败"}}`
          )
        );
      } else if (url.indexOf('/MIN') > -1) {
        return Promise.resolve(
          new Response(
            `{"succeed":false,"error":{"code":404,"errorMsg":"数据源World1不存在，获取相应的数据服务组件失败"}}`
          )
        );
      } else if (url.indexOf('/STDDEVIATION') > -1) {
        return Promise.resolve(
          new Response(
            `{"succeed":false,"error":{"code":404,"errorMsg":"数据源World1不存在，获取相应的数据服务组件失败"}}`
          )
        );
      } else if (url.indexOf('/SUM') > -1) {
        return Promise.resolve(
          new Response(
            `{"succeed":false,"error":{"code":404,"errorMsg":"数据源World1不存在，获取相应的数据服务组件失败"}}`
          )
        );
      } else if (url.indexOf('/VARIANCE') > -1) {
        return Promise.resolve(
          new Response(
            `{"succeed":false,"error":{"code":404,"errorMsg":"数据源World1不存在，获取相应的数据服务组件失败"}}`
          )
        );
      }
      return Promise.resolve();
    });
    let count = 0;
    getFieldStatisticsInfoService.getFieldStatisticsInfo(getFieldStatisticsInfoParams, result => {
      serviceResult = result;
      try {
        expect(getFieldStatisticsInfoService).not.toBeNull();
        expect(getFieldStatisticsInfoService._fieldService.currentStatisticResult.fieldName).toBe('SmID');
        expect(getFieldStatisticsInfoService._fieldService.currentStatisticResult.AVERAGE).toBeNull();
        expect(getFieldStatisticsInfoService._fieldService.currentStatisticResult.MAX).toBeNull();
        expect(getFieldStatisticsInfoService._fieldService.currentStatisticResult.MIN).toBeNull();
        expect(getFieldStatisticsInfoService._fieldService.currentStatisticResult.STDDEVIATION).toBeNull();
        expect(getFieldStatisticsInfoService._fieldService.currentStatisticResult.SUM).toBeNull();
        expect(getFieldStatisticsInfoService._fieldService.currentStatisticResult.VARIANCE).toBeNull();
        expect(serviceResult.type).toEqual('processFailed');
        expect(serviceResult.error).not.toBeNull();
        expect(serviceResult.error.code).toEqual(404);
        expect(serviceResult.error.errorMsg).toBe('数据源World1不存在，获取相应的数据服务组件失败');
        getFieldStatisticsInfoService.destroy();
        count++;
        if (count === 6) {
          done();
        }
      } catch (exception) {
        console.log(
          "leafletFieldService_'failEvent:getFieldStatisticsInfo_dataSourceNotExist'案例失败：" +
            exception.name +
            ':' +
            exception.message
        );
        getFieldStatisticsInfoService.destroy();
        expect(false).toBeTruthy();
        done();
      }
    });
  });
});
