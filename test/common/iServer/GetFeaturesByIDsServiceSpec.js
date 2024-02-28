﻿import { GetFeaturesByIDsService } from '../../../src/common/iServer/GetFeaturesByIDsService';
import { GetFeaturesByIDsParameters } from '../../../src/common/iServer/GetFeaturesByIDsParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var dataServiceURL = GlobeParameter.dataServiceURL;
var serviceFailedEventArgsSystem = null;
var getFeatureEventArgsSystem = null;

var initGetFeaturesByIDsService = () => {
  return new GetFeaturesByIDsService(dataServiceURL);
};

describe('GetFeaturesByIDsService', () => {
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
    var getFeaturesByIDsService = new GetFeaturesByIDsService(dataServiceURL, { headers: myHeaders });
    expect(getFeaturesByIDsService).not.toBeNull();
    expect(getFeaturesByIDsService.headers).not.toBeNull();
    getFeaturesByIDsService.destroy();
  });

  it('crossOrigin', () => {
    var getFeaturesByIDsService = new GetFeaturesByIDsService(dataServiceURL, { crossOrigin: false });
    expect(getFeaturesByIDsService).not.toBeNull();
    expect(getFeaturesByIDsService.crossOrigin).toBeFalsy();
    getFeaturesByIDsService.destroy();
  });

  //不直接返回查询结果
  it('processAsync_returnContent:false', done => {
    var getFeaturesByIDsFailed = serviceFailedEventArgs => {
      serviceFailedEventArgsSystem = serviceFailedEventArgs;
    };
    var getFeaturesByIDsCompleted = getFeatureEventArgsSystem => {
      try {
        var getFeaturesResult = getFeatureEventArgsSystem.result;
        expect(getFeaturesByIDsService).not.toBeNull();
        expect(getFeaturesResult).not.toBeNull();
        expect(getFeaturesResult.newResourceID).not.toBeNull();
        expect(getFeaturesResult.newResourceLocation).not.toBeNull();
        getFeaturesByIDsService.destroy();
        expect(getFeaturesByIDsService.returnContent).toBeNull();
        getFeaturesByIDsParameters.destroy();
        done();
      } catch (exception) {
        expect(false).toBeTruthy();
        console.log('GetFeaturesByIDsService_' + exception.name + ':' + exception.message);
        getFeaturesByIDsService.destroy();
        getFeaturesByIDsParameters.destroy();
        done();
      }
    };

    var getFeaturesByIDsService = initGetFeaturesByIDsService();
    var getFeaturesByIDsParameters = new GetFeaturesByIDsParameters({
      returnContent: false,
      datasetNames: ['World:Capitals'],
      fromIndex: 0,
      fields: ['SMID'],
      toIndex: -1,
      IDs: [1, 2, 3],
      hasGeometry: false
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe('POST');
      expect(testUrl).toBe(dataServiceURL + '/featureResults');
      // expect(params).toContain("'datasetNames':[\"World:Capitals\"]");
      // expect(params).toContain("'getFeatureMode':\"ID\"");
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.datasetNames[0]).toBe('World:Capitals');
      expect(paramsObj.getFeatureMode).toBe('ID');
      expect(paramsObj.hasGeometry).toBe(false);
      expect(options).not.toBeNull();
      return Promise.resolve(
        new Response(
          `{"postResultType":"CreateChild","newResourceID":"f701028a2b7144b19b582f55c1902b18_96f665c1638c4a8aa96a62caaaed5922","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/f701028a2b7144b19b582f55c1902b18_96f665c1638c4a8aa96a62caaaed5922.json"}`
        )
      );
    });
    getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters, getFeaturesByIDsCompleted);
  });

  it('processAsync_returnContent:true', done => {
    var getFeaturesByIDsCompleted = getFeatureEventArgsSystem => {
      try {
        var getFeaturesResult = getFeatureEventArgsSystem.result.features;
        expect(getFeaturesByIDsService).not.toBeNull();
        expect(getFeaturesResult).not.toBeNull();
        expect(getFeaturesResult.type).toBe('FeatureCollection');
        expect(getFeaturesResult.features).not.toBeNull();
        expect(getFeaturesResult.features[0].type).toBe('Feature');
        getFeaturesByIDsService.destroy();
        getFeaturesByIDsParameters.destroy();
        done();
      } catch (exception) {
        expect(false).toBeTruthy();
        console.log('GetFeaturesByIDsService_' + exception.name + ':' + exception.message);
        getFeaturesByIDsService.destroy();
        getFeaturesByIDsParameters.destroy();
        done();
      }
    };
    var getFeaturesByIDsService = initGetFeaturesByIDsService();
    var getFeaturesByIDsParameters = new GetFeaturesByIDsParameters({
      returnContent: true,
      datasetNames: ['World:Capitals'],
      fromIndex: 0,
      toIndex: -1,
      IDs: [1, 2, 3]
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe('POST');
      expect(testUrl).toBe(dataServiceURL + '/featureResults?returnContent=true');
      // expect(params).toContain("'datasetNames':[\"World:Capitals\"]");
      // expect(params).toContain("'getFeatureMode':\"ID\"");
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.datasetNames[0]).toBe('World:Capitals');
      expect(paramsObj.getFeatureMode).toBe('ID');
      expect(options).not.toBeNull();
      return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    });
    getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters, getFeaturesByIDsCompleted);
  });

  //测试没有传入参数时的情况
  it('processAsync_noParams', done => {
    var getFeaturesByIDsFailed = serviceFailedEventArgsSystem => {
      try {
        expect(getFeaturesByIDsService).not.toBeNull();
        expect(serviceFailedEventArgsSystem.result).not.toBeNull();
        expect(serviceFailedEventArgsSystem.error).not.toBeNull();
        expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
        expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
        getFeaturesByIDsService.destroy();
        getFeaturesByIDsParameters.destroy();
        done();
      } catch (exception) {
        expect(false).toBeTruthy();
        console.log('GetFeaturesByIDsService_' + exception.name + ':' + exception.message);
        getFeaturesByIDsService.destroy();
        getFeaturesByIDsParameters.destroy();
        done();
      }
    };
    var getFeaturesByIDsCompleted = getFeaturesEventArgs => {
      getFeatureEventArgsSystem = getFeaturesEventArgs;
    };

    var getFeaturesByIDsService = initGetFeaturesByIDsService();
    var getFeaturesByIDsParameters = new GetFeaturesByIDsParameters({
      IDs: []
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
      expect(method).toBe('POST');
      expect(testUrl).toBe(dataServiceURL + '/featureResults?fromIndex=0&toIndex=19&returnContent=true');
      expect(options).not.toBeNull();
      return Promise.resolve(
        new Response(
          `{"succeed":false,"error":{"code":400,"errorMsg":"在FeatureResults中，在检验请求体时，请求体参数datasetNames为空"}}`
        )
      );
    });
    getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters, getFeaturesByIDsFailed);
  });

  //查询目标图层不存在情况
  it('processAsync_LayerNotExist', done => {
    var getFeaturesByIDsFailed = serviceFailedEventArgsSystem => {
      try {
        expect(getFeaturesByIDsService).not.toBeNull();
        expect(serviceFailedEventArgsSystem.result).not.toBeNull();
        expect(serviceFailedEventArgsSystem.error).not.toBeNull();
        expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
        expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
        getFeaturesByIDsService.destroy();
        getFeaturesByIDsParameters.destroy();
        done();
      } catch (exception) {
        expect(false).toBeTruthy();
        console.log('GetFeaturesByIDsService_' + exception.name + ':' + exception.message);
        getFeaturesByIDsService.destroy();
        getFeaturesByIDsParameters.destroy();
        done();
      }
    };
    var getFeaturesByIDsCompleted = getFeaturesEventArgs => {
      getFeatureEventArgsSystem = getFeaturesEventArgs;
    };
    var getFeaturesByIDsService = initGetFeaturesByIDsService();
    var getFeaturesByIDsParameters = new GetFeaturesByIDsParameters({
      returnContent: false,
      datasetNames: ['World:CapitalsNotExsit'],
      fromIndex: 0,
      toIndex: -1,
      IDs: [1, 2, 3]
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe('POST');
      expect(testUrl).toBe(dataServiceURL + '/featureResults');
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.datasetNames[0]).toBe('World:CapitalsNotExsit');
      expect(paramsObj.getFeatureMode).toBe('ID');
      // expect(params).toContain("'datasetNames':[\"World:CapitalsNotExsit\"]");
      expect(options).not.toBeNull();
      return Promise.resolve(
        new Response(
          `{"succeed":false,"error":{"code":400,"errorMsg":"getFeature方法中数据集名CapitalsNotExsit不存在"}}`
        )
      );
    });

    getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters, getFeaturesByIDsFailed);
  });

  it('processAsync_LayerNotExist promise', done => {
    var getFeaturesByIDsFailed = serviceFailedEventArgsSystem => {
      try {
        expect(getFeaturesByIDsService).not.toBeNull();
        expect(serviceFailedEventArgsSystem.result).not.toBeNull();
        expect(serviceFailedEventArgsSystem.error).not.toBeNull();
        expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
        expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
        getFeaturesByIDsService.destroy();
        getFeaturesByIDsParameters.destroy();
        done();
      } catch (exception) {
        expect(false).toBeTruthy();
        console.log('GetFeaturesByIDsService_' + exception.name + ':' + exception.message);
        getFeaturesByIDsService.destroy();
        getFeaturesByIDsParameters.destroy();
        done();
      }
    };
    var getFeaturesByIDsCompleted = getFeaturesEventArgs => {
      getFeatureEventArgsSystem = getFeaturesEventArgs;
    };
    var getFeaturesByIDsService = initGetFeaturesByIDsService();
    var getFeaturesByIDsParameters = new GetFeaturesByIDsParameters({
      returnContent: false,
      datasetNames: ['World:CapitalsNotExsit'],
      fromIndex: 0,
      toIndex: -1,
      IDs: [1, 2, 3]
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe('POST');
      expect(testUrl).toBe(dataServiceURL + '/featureResults');
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.datasetNames[0]).toBe('World:CapitalsNotExsit');
      expect(paramsObj.getFeatureMode).toBe('ID');
      // expect(params).toContain("'datasetNames':[\"World:CapitalsNotExsit\"]");
      expect(options).not.toBeNull();
      return Promise.resolve(
        new Response(
          `{"succeed":false,"error":{"code":400,"errorMsg":"getFeature方法中数据集名CapitalsNotExsit不存在"}}`
        )
      );
    });

    getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters).then(getFeaturesByIDsFailed);
  });

  it('getFeaturesByIDsParameters:targetEpsgCode', done => {
    var getFeaturesByIDsService = new GetFeaturesByIDsService(dataServiceURL);
    var getFeaturesByIDsParameters = new GetFeaturesByIDsParameters({
      datasetNames: ['World:Capitals'],
      IDs: [1, 2, 3],
      targetEpsgCode: 4326
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.targetEpsgCode).toEqual(4326);
      return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    });
    getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters, function() {
      getFeaturesByIDsService.destroy();
      getFeaturesByIDsParameters.destroy();
      done();
    });
  })
  it('getFeaturesByIDsParameters:targetPrj', done => {
    var getFeaturesByIDsService = new GetFeaturesByIDsService(dataServiceURL);
    var getFeaturesByIDsParameters = new GetFeaturesByIDsParameters({
      datasetNames: ['World:Capitals'],
      IDs: [1, 2, 3],
      targetPrj: { "epsgCode": 4326 }
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.targetPrj.epsgCode).toEqual(4326);
      return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    });
    getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters, function() {
      getFeaturesByIDsService.destroy();
      getFeaturesByIDsParameters.destroy();
      done();
    });
  })
  it('GetFeaturesByIDsParameters:returnFeaturesOnly', done => {
    var serviceCompleted = serviceSucceedEventArgsSystem => {
      console.log('serviceSucceedEventArgsSystem', serviceSucceedEventArgsSystem);
      try {
        getFeaturesByIDsService.destroy();
        idParams.destroy();
        expect(serviceSucceedEventArgsSystem.result.features.type).toBe('FeatureCollection');
        expect(serviceSucceedEventArgsSystem.result.features.features.length).toBe(4);
        done();
      } catch (exception) {
        expect(false).toBeTruthy();
        console.log('GetFeaturesByIDsService_' + exception.name + ':' + exception.message);
        getFeaturesByIDsService.destroy();
        idParams.destroy();
        done();
      }
    };
    var getFeaturesByIDsService = new GetFeaturesByIDsService(dataServiceURL);
    var idParams = new GetFeaturesByIDsParameters({
      datasetNames: ['World:Capitals'],
      IDs: [1, 2, 3],
      targetPrj: { "epsgCode": 4326 },
      returnFeaturesOnly: true
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      if (testUrl.indexOf('returnFeaturesOnly') > -1) {
        return Promise.resolve(new Response(JSON.stringify(getReturnFeaturesOnlyResultJson)));
      }
    });
    getFeaturesByIDsService.processAsync(idParams, serviceCompleted);
  })
});
