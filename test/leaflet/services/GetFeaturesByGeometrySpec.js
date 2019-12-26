import { featureService } from '../../../src/leaflet/services/FeatureService';
import { GetFeaturesByGeometryParameters } from '../../../src/common/iServer/GetFeaturesByGeometryParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var dataServiceURL = GlobeParameter.dataServiceURL;
var options = {
  serverType: 'iServer'
};

describe('leaflet_FeatureService_getFeaturesByGeometry', () => {
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

  it('proxy', () => {
    var getFeaturesService = featureService(dataServiceURL, { proxy: 'testProxy' });
    expect(getFeaturesService).not.toBeNull();
    expect(getFeaturesService.options.proxy).toEqual('testProxy');
    getFeaturesService.destroy();
  });

  it('serverType', () => {
    var getFeaturesService = featureService(dataServiceURL, { serverType: 'iPortal' });
    expect(getFeaturesService).not.toBeNull();
    expect(getFeaturesService.options.serverType).toEqual('iPortal');
    getFeaturesService.destroy();
  });

  it('withCredentials', () => {
    var getFeaturesService = featureService(dataServiceURL, { withCredentials: true });
    expect(getFeaturesService).not.toBeNull();
    expect(getFeaturesService.options.withCredentials).toBeTruthy();
    getFeaturesService.destroy();
  });

  it('crossOrigin', () => {
    var getFeaturesService = featureService(dataServiceURL, { crossOrigin: true });
    expect(getFeaturesService).not.toBeNull();
    expect(getFeaturesService.options.crossOrigin).toBeTruthy();
    getFeaturesService.destroy();
  });

  it('headers', () => {
    var getFeaturesService = featureService(dataServiceURL, { headers: {} });
    expect(getFeaturesService).not.toBeNull();
    expect(getFeaturesService.options.headers).not.toBeNull();
    getFeaturesService.destroy();
  });

  it('successEvent:getFeaturesByGeometry_returnContent=true', done => {
    var polygon = L.polygon([[0, 0], [-30, 0], [-10, 30], [0, 0]]);
    var getFeaturesByGeometryParams = new GetFeaturesByGeometryParameters({
      returnContent: true,
      datasetNames: ['World:Countries'],
      geometry: polygon,
      spatialQueryMode: 'INTERSECT'
    });
    var getFeaturesByGeometryService = featureService(dataServiceURL, options);
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe('POST');
      expect(testUrl).toBe(dataServiceURL + '/featureResults.json?returnContent=true&fromIndex=0&toIndex=19');
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.datasetNames[0]).toBe('World:Countries');
      expect(paramsObj.spatialQueryMode).toBe('INTERSECT');
      expect(options).not.toBeNull();
      return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    });
    getFeaturesByGeometryService.getFeaturesByGeometry(getFeaturesByGeometryParams, result => {
      serviceResult = result;
      try {
        expect(getFeaturesByGeometryService).not.toBeNull();
        expect(getFeaturesByGeometryService.options.serverType).toBe('iServer');
        expect(serviceResult.type).toBe('processCompleted');
        expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
        expect(serviceResult.result).not.toBeNull();
        expect(serviceResult.result.succeed).toBeTruthy();
        expect(serviceResult.result.featureCount).toEqual(1);
        expect(serviceResult.result.totalCount).toEqual(1);
        expect(serviceResult.result.features.type).toBe('FeatureCollection');
        expect(serviceResult.result.features.features.length).toEqual(1);
        for (var i = 0; i < serviceResult.result.features.features.length; i++) {
          expect(serviceResult.result.features.features[i].type).toBe('Feature');
          expect(serviceResult.result.features.features[i].geometry.type).toBe('MultiPolygon');
        }
        expect(serviceResult.result.features.features[0].geometry.coordinates.length).toEqual(2);
        expect(serviceResult.result.features.features[0].properties).toEqual(
          Object({
            CAPITAL: '利伯维尔',
            SMID: '127'
          })
        );
        getFeaturesByGeometryService.destroy();
        done();
      } catch (exception) {
        console.log(
          "leafletGetFeaturesByGeometryService_'successEvent:returnContent=true'案例失败：" +
          exception.name +
          ':' +
          exception.message
        );
        getFeaturesByGeometryService.destroy();
        expect(false).toBeTruthy();
        done();
      }
    });
  });

  it('successEvent:getFeaturesByGeometry_returnContent=false', done => {
    var polygon = L.polygon([[0, 0], [-30, 0], [-10, 30], [0, 0]]);
    var getFeaturesByGeometryParams = new GetFeaturesByGeometryParameters({
      returnContent: false,
      datasetNames: ['World:Countries'],
      geometry: polygon,
      spatialQueryMode: 'INTERSECT'
    });
    var getFeaturesByGeometryService = featureService(dataServiceURL, options);
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe('POST');
      expect(testUrl).toBe(dataServiceURL + '/featureResults.json?');
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.datasetNames[0]).toBe('World:Countries');
      expect(paramsObj.spatialQueryMode).toBe('INTERSECT');
      expect(options).not.toBeNull();
      return Promise.resolve(
        new Response(
          `{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_952187de2cde43a6bcfff2938c93dd9f","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_952187de2cde43a6bcfff2938c93dd9f.json"}`
        )
      );
    });
    getFeaturesByGeometryService.getFeaturesByGeometry(getFeaturesByGeometryParams, result => {
      serviceResult = result;
      try {
        expect(getFeaturesByGeometryService.options.serverType).toBe('iServer');
        expect(serviceResult.type).toBe('processCompleted');
        expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
        expect(serviceResult.result).not.toBeNull();
        expect(serviceResult.result.succeed).toBeTruthy();
        expect(serviceResult.result.postResultType).toBe('CreateChild');
        expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
        expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
        getFeaturesByGeometryService.destroy();
        done();
      } catch (exception) {
        console.log(
          "leafletGetFeaturesByGeometryService_'successEvent:returnContent=false'案例失败：" +
          exception.name +
          ':' +
          exception.message
        );
        getFeaturesByGeometryService.destroy();
        expect(false).toBeTruthy();
        done();
      }
    });
  });

  it('failEvent:getFeaturesByGeometry_datasetNotExist', done => {
    var getFeaturesByGeometryParams = new GetFeaturesByGeometryParameters({
      queryParameter: {
        name: 'Countries@World',
        attributeFilter: 'SMID>0'
      },
      datasetNames: ['World1:Countries']
    });
    var getFeaturesByGeometryService = featureService(dataServiceURL, options);
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe('POST');
      expect(testUrl).toBe(dataServiceURL + '/featureResults.json?returnContent=true&fromIndex=0&toIndex=19');
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.datasetNames[0]).toBe('World1:Countries');
      expect(paramsObj.spatialQueryMode).toBe('CONTAIN');
      expect(options).not.toBeNull();
      return Promise.resolve(
        new Response(
          `{"succeed":false,"error":{"code":400,"errorMsg":"数据源World1不存在，获取相应的数据服务组件失败"}}`
        )
      );
    });
    getFeaturesByGeometryService.getFeaturesByGeometry(getFeaturesByGeometryParams, result => {
      serviceResult = result;
      try {
        expect(getFeaturesByGeometryService).not.toBeNull();
        expect(getFeaturesByGeometryService.options.serverType).toBe('iServer');
        expect(serviceResult.type).toBe('processFailed');
        expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
        expect(serviceResult.error).not.toBeNull();
        expect(serviceResult.error.code).toEqual(400);
        expect(serviceResult.error.errorMsg).toBe('数据源World1不存在，获取相应的数据服务组件失败');
        getFeaturesByGeometryService.destroy();
        done();
      } catch (exception) {
        console.log(
          "leafletGetFeaturesByGeometryService_'failEvent:datasetNotExist'案例失败：" +
          exception.name +
          ':' +
          exception.message
        );
        getFeaturesByGeometryService.destroy();
        expect(false).toBeTruthy();
        done();
      }
    });
  });

  it('failEvent:getFeaturesByGeometry_queryParamsNull', done => {
    var getFeaturesByGeometryParams = new GetFeaturesByGeometryParameters({
      queryParameter: null,
      datasetNames: ['World:Countries']
    });
    var getFeaturesByGeometryService = featureService(dataServiceURL, options);
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe('POST');
      expect(testUrl).toBe(dataServiceURL + '/featureResults.json?returnContent=true&fromIndex=0&toIndex=19');
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.datasetNames[0]).toBe('World:Countries');
      expect(paramsObj.spatialQueryMode).toBe('CONTAIN');
      expect(options).not.toBeNull();
      return Promise.resolve(
        new Response(
          `{"succeed":false,"error":{"code":400,"errorMsg":"getFeatureByBuffer方法中传入的参数为空"}}`
        )
      );
    });
    getFeaturesByGeometryService.getFeaturesByGeometry(getFeaturesByGeometryParams, result => {
      serviceResult = result;
      try {
        expect(getFeaturesByGeometryService).not.toBeNull();
        expect(getFeaturesByGeometryService.options.serverType).toBe('iServer');
        expect(serviceResult.type).toBe('processFailed');
        expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
        expect(serviceResult.error).not.toBeNull();
        expect(serviceResult.error.code).toEqual(400);
        expect(serviceResult.error.errorMsg).toBe('getFeatureByBuffer方法中传入的参数为空');
        getFeaturesByGeometryService.destroy();
        done();
      } catch (exception) {
        console.log(
          "leafletGetFeaturesByGeometryService_'failEvent:queryParameterNull'案例失败：" +
          exception.name +
          ':' +
          exception.message
        );
        getFeaturesByGeometryService.destroy();
        expect(false).toBeTruthy();
        done();
      }
    });
  });
  it('getFeaturesByGeometryParams:targetEpsgCode', done => {
    var getFeaturesByGeometryService = featureService(dataServiceURL, options);
    var getFeaturesByGeometryParams = new GetFeaturesByGeometryParameters({
      queryParameter: null,
      datasetNames: ['World:Countries'],
      targetEpsgCode: 4326
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.targetEpsgCode).toEqual(4326);
      return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d.json"}`));
    });
    getFeaturesByGeometryService.getFeaturesByGeometry(getFeaturesByGeometryParams, (result) => {
      serviceResult = result;
      getFeaturesByGeometryService.destroy();
      done();
    });
  });
  it('getFeaturesByGeometryParams:targetPrj', done => {
    var getFeaturesByGeometryService = featureService(dataServiceURL, options);
    var getFeaturesByGeometryParams = new GetFeaturesByGeometryParameters({
      queryParameter: null,
      datasetNames: ['World:Countries'],
      targetPrj: { "epsgCode": 4326 }
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.targetPrj.epsgCode).toEqual(4326);
      return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d.json"}`));
    });
    getFeaturesByGeometryService.getFeaturesByGeometry(getFeaturesByGeometryParams, (result) => {
      serviceResult = result;
      getFeaturesByGeometryService.destroy();
      done();
    });
  });
});
