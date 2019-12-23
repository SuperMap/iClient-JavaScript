import { GetFeaturesBySQLService } from '../../../src/common/iServer/GetFeaturesBySQLService';
import { GetFeaturesBySQLParameters } from '../../../src/common/iServer/GetFeaturesBySQLParameters';
import { FilterParameter } from '../../../src/common/iServer/FilterParameter';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var dataServiceURL = GlobeParameter.dataServiceURL;
var serviceFailedEventArgsSystem = null;
var getFeaturesEventArgsSystem = null;
var initGetFeaturesBySQLService = (getFeaturesBySQLCompleted, getFeaturesBySQLFailed) => {
  return new GetFeaturesBySQLService(dataServiceURL, {
    eventListeners: {
      processCompleted: getFeaturesBySQLCompleted,
      processFailed: getFeaturesBySQLFailed
    }
  });
};
//        var getFeaturesBySQLService = initGetFeaturesBySQLService(getFeaturesBySQLCompleted,getFeaturesBySQLFailed);
describe('GetFeaturesBySQLService', () => {
  var originalTimeout;
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('headers', () => {
    let myHeaders = new Headers();
    var getFeaturesBySQLService = new GetFeaturesBySQLService(dataServiceURL, { headers: myHeaders });
    expect(getFeaturesBySQLService).not.toBeNull();
    expect(getFeaturesBySQLService.headers).not.toBeNull();
    getFeaturesBySQLService.destroy();
  });

  it('crossOrigin', () => {
    var getFeaturesBySQLService = new GetFeaturesBySQLService(dataServiceURL, { crossOrigin: false });
    expect(getFeaturesBySQLService).not.toBeNull();
    expect(getFeaturesBySQLService.crossOrigin).toBeFalsy();
    getFeaturesBySQLService.destroy();
  });

  //不直接返回查询结果
  it('processAsync_returnContent:false', done => {
    var getFeaturesBySQLFailed = serviceFailedEventArgs => {
      serviceFailedEventArgsSystem = serviceFailedEventArgs;
    };
    var getFeaturesBySQLCompleted = getFeaturesEventArgsSystem => {
      try {
        var getFeaturesResult = getFeaturesEventArgsSystem.result;
        expect(getFeaturesBySQLService).not.toBeNull();
        expect(getFeaturesResult).not.toBeNull();
        expect(getFeaturesResult.newResourceID).not.toBeNull();
        expect(getFeaturesResult.newResourceLocation).not.toBeNull();
        getFeaturesBySQLService.destroy();
        expect(getFeaturesBySQLService.EVENT_TYPES).toBeNull();
        expect(getFeaturesBySQLService.events).toBeNull();
        expect(getFeaturesBySQLService.eventListeners).toBeNull();
        expect(getFeaturesBySQLService.returnContent).toBeNull();
        expect(getFeaturesBySQLService.fromIndex).toBeNull();
        expect(getFeaturesBySQLService.toIndex).toBeNull();
        getFeaturesBySQLParameters.destroy();
        done();
      } catch (exception) {
        expect(false).toBeTruthy();
        console.log('GetFeaturesBySQLService_' + exception.name + ':' + exception.message);
        getFeaturesBySQLService.destroy();
        getFeaturesBySQLParameters.destroy();
        done();
      }
    };

    var getFeaturesBySQLService = initGetFeaturesBySQLService(getFeaturesBySQLCompleted, getFeaturesBySQLFailed);
    var getFeaturesBySQLParameters = new GetFeaturesBySQLParameters({
      datasetNames: ['World:Countries'],
      queryParameter: new FilterParameter({
        attributeFilter: 'SmID>0',
        name: 'Countries@World'
      }),
      returnContent: false
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe('POST');
      expect(testUrl).toBe(dataServiceURL + '/featureResults.json?');
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.datasetNames[0]).toBe('World:Countries');
      expect(options).not.toBeNull();
      return Promise.resolve(
        new Response(
          `{"postResultType":"CreateChild","newResourceID":"f701028a2b7144b19b582f55c1902b18_96f665c1638c4a8aa96a62caaaed5922","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/f701028a2b7144b19b582f55c1902b18_96f665c1638c4a8aa96a62caaaed5922.json"}`
        )
      );
    });
    getFeaturesBySQLService.processAsync(getFeaturesBySQLParameters);
  });

  //直接返回查询结果
  it('processAsync_returnContent:true', done => {
    var getFeaturesBySQLFailed = serviceFailedEventArgs => {
      serviceFailedEventArgsSystem = serviceFailedEventArgs;
    };
    var getFeaturesBySQLCompleted = getFeaturesEventArgsSystem => {
      try {
        var getFeaturesResult = getFeaturesEventArgsSystem.result.features;
        expect(getFeaturesBySQLService).not.toBeNull();
        expect(getFeaturesResult).not.toBeNull();
        expect(getFeaturesResult.type).toBe('FeatureCollection');
        expect(getFeaturesResult.features).not.toBeNull();
        expect(getFeaturesResult.features[0].type).toBe('Feature');
        getFeaturesBySQLService.destroy();
        getFeaturesBySQLParameters.destroy();
        done();
      } catch (exception) {
        expect(false).toBeTruthy();
        console.log('GetFeaturesBySQLService_' + exception.name + ':' + exception.message);
        getFeaturesBySQLService.destroy();
        getFeaturesBySQLParameters.destroy();
        done();
      }
    };
    var getFeaturesBySQLService = initGetFeaturesBySQLService(getFeaturesBySQLCompleted, getFeaturesBySQLFailed);
    var getFeaturesBySQLParameters = new GetFeaturesBySQLParameters({
      datasetNames: ['World:Countries'],
      queryParameter: new FilterParameter({
        attributeFilter: 'SMID<10',
        name: 'Countries@World'
      }),
      returnContent: true,
      fromIndex: 2,
      toIndex: 10
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe('POST');
      expect(testUrl).toBe(dataServiceURL + '/featureResults.json?returnContent=true&fromIndex=2&toIndex=10');
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.datasetNames[0]).toBe('World:Countries');
      expect(options).not.toBeNull();
      return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    });
    getFeaturesBySQLService.processAsync(getFeaturesBySQLParameters);
  });

  //测试没有传入参数时的情况
  it('processAsync_noParams', done => {
    var getFeaturesBySQLFailed = serviceFailedEventArgsSystem => {
      try {
        expect(getFeaturesBySQLService).not.toBeNull();
        expect(serviceFailedEventArgsSystem.result).not.toBeNull();
        expect(serviceFailedEventArgsSystem.error).not.toBeNull();
        expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
        expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
        getFeaturesBySQLService.destroy();
        getFeaturesBySQLParameters.destroy();
        done();
      } catch (exception) {
        expect(false).toBeTruthy();
        console.log('GetFeaturesBySQLService_' + exception.name + ':' + exception.message);
        getFeaturesBySQLService.destroy();
        getFeaturesBySQLParameters.destroy();
        done();
      }
    };
    var getFeaturesBySQLCompleted = getFeaturesEventArgs => {
      getFeaturesEventArgsSystem = getFeaturesEventArgs;
    };

    var getFeaturesBySQLService = initGetFeaturesBySQLService(getFeaturesBySQLCompleted, getFeaturesBySQLFailed);
    var getFeaturesBySQLParameters = new GetFeaturesBySQLParameters({
      datasetNames: ['World:Countries'],
      returnContent: true,
      fromIndex: 2,
      toIndex: 10
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
      expect(method).toBe('POST');
      expect(testUrl).toBe(dataServiceURL + '/featureResults.json?returnContent=true&fromIndex=2&toIndex=10');
      expect(options).not.toBeNull();
      return Promise.resolve(
        new Response(
          `{"succeed":false,"error":{"code":400,"errorMsg":"在FeatureResults中，在检验请求体时，请求体参数datasetNames为空"}}`
        )
      );
    });
    getFeaturesBySQLService.processAsync(getFeaturesBySQLParameters);
  });

  //查询目标图层不存在情况
  it('processAsync_LayerNotExist', done => {
    var getFeaturesBySQLFailed = serviceFailedEventArgsSystem => {
      try {
        expect(getFeaturesBySQLService).not.toBeNull();
        expect(serviceFailedEventArgsSystem.result).not.toBeNull();
        expect(serviceFailedEventArgsSystem.error).not.toBeNull();
        expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
        expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
        getFeaturesBySQLService.destroy();
        getFeaturesBySQLParameters.destroy();
        done();
      } catch (exception) {
        expect(false).toBeTruthy();
        console.log('GetFeaturesBySQLService_' + exception.name + ':' + exception.message);
        getFeaturesBySQLService.destroy();
        getFeaturesBySQLParameters.destroy();
        done();
      }
    };
    var getFeaturesBySQLCompleted = getFeaturesEventArgs => {
      getFeaturesEventArgsSystem = getFeaturesEventArgs;
    };
    var getFeaturesBySQLService = initGetFeaturesBySQLService(getFeaturesBySQLCompleted, getFeaturesBySQLFailed);
    var getFeaturesBySQLParameters = new GetFeaturesBySQLParameters({
      datasetNames: ['World:Countriess'],
      queryParameter: new FilterParameter({
        attributeFilter: 'SMID<10',
        name: 'Countries@World'
      }),
      returnContent: true,
      fromIndex: 2,
      toIndex: 10
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe('POST');
      expect(testUrl).toBe(dataServiceURL + '/featureResults.json?returnContent=true&fromIndex=2&toIndex=10');
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.datasetNames[0]).toBe('World:Countriess');
      expect(options).not.toBeNull();
      return Promise.resolve(
        new Response(
          `{"succeed":false,"error":{"code":400,"errorMsg":"getFeature方法中数据集名CapitalsNotExsit不存在"}}`
        )
      );
    });
    getFeaturesBySQLService.processAsync(getFeaturesBySQLParameters);
  });

  it('getFeaturesBySQLParameters:targetEpsgCode', done => {
    var getFeaturesBySQLService = new GetFeaturesBySQLService(dataServiceURL, {
      eventListeners: {
        processFailed: () => { },
        processCompleted: () => {
          getFeaturesBySQLService.destroy();
          getFeaturesBySQLParameters.destroy();
          done();
        }
      }
    });
    var getFeaturesBySQLParameters = new GetFeaturesBySQLParameters({
      datasetNames: ['World:Countries'],
      queryParameter: new FilterParameter({
        attributeFilter: 'SmID>0',
        name: 'Countries@World'
      }),
      targetEpsgCode: 4326
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.targetEpsgCode).toEqual(4326);
      return Promise.resolve(
        new Response(
          `{"postResultType":"CreateChild","newResourceID":"f701028a2b7144b19b582f55c1902b18_96f665c1638c4a8aa96a62caaaed5922","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/f701028a2b7144b19b582f55c1902b18_96f665c1638c4a8aa96a62caaaed5922.json"}`
        )
      );
    });
    getFeaturesBySQLService.processAsync(getFeaturesBySQLParameters);
  })
  it('getFeaturesBySQLParameters:targetPrj', done => {
    var getFeaturesBySQLService = new GetFeaturesBySQLService(dataServiceURL, {
      eventListeners: {
        processFailed: () => { },
        processCompleted: () => {
          getFeaturesBySQLService.destroy();
          getFeaturesBySQLParameters.destroy();
          done();
        }
      }
    });
    var getFeaturesBySQLParameters = new GetFeaturesBySQLParameters({
      datasetNames: ['World:Countries'],
      queryParameter: new FilterParameter({
        attributeFilter: 'SmID>0',
        name: 'Countries@World'
      }),
      targetPrj: { "epsgCode": 4326 }
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.targetPrj.epsgCode).toEqual(4326);
      return Promise.resolve(
        new Response(
          `{"postResultType":"CreateChild","newResourceID":"f701028a2b7144b19b582f55c1902b18_96f665c1638c4a8aa96a62caaaed5922","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/f701028a2b7144b19b582f55c1902b18_96f665c1638c4a8aa96a62caaaed5922.json"}`
        )
      );
    });
    getFeaturesBySQLService.processAsync(getFeaturesBySQLParameters);
  })
});
