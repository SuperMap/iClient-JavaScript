import { GetFeaturesByBoundsService } from '../../../src/common/iServer/GetFeaturesByBoundsService';
import { GetFeaturesByBoundsParameters } from '../../../src/common/iServer/GetFeaturesByBoundsParameters';
import { Bounds } from '../../../src/common/commontypes/Bounds';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.dataServiceURL;
//服务初始化时注册事件监听函数
var serviceFailedEventArgsSystem = null,
  serviceSucceedEventArgsSystem = null;

var initGetFeaturesByBoundsService_RegisterListener = (newUrl) => {
  return new GetFeaturesByBoundsService(newUrl || url);
};

//initGetFeaturesByBoundsService_RegisterListener(serviceCompleted,serviceFailed)
describe('GetFeaturesByBoundsService', () => {
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
    var getFeaturesByBoundsService = new GetFeaturesByBoundsService(url, { headers: myHeaders });
    expect(getFeaturesByBoundsService).not.toBeNull();
    expect(getFeaturesByBoundsService.headers).not.toBeNull();
    getFeaturesByBoundsService.destroy();
  });

  it('crossOrigin', () => {
    var getFeaturesByBoundsService = new GetFeaturesByBoundsService(url, { crossOrigin: false });
    expect(getFeaturesByBoundsService).not.toBeNull();
    expect(getFeaturesByBoundsService.crossOrigin).toBeFalsy();
    getFeaturesByBoundsService.destroy();
  });

  it('constructor, destroy', () => {
    var serviceCompleted = serviceSucceedEventArgs => {
      serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
    };
    var serviceFailed = serviceFailedEventArgs => {
      serviceFailedEventArgsSystem = serviceFailedEventArgs;
    };
    var getFeaturesByBoundsService = initGetFeaturesByBoundsService_RegisterListener();
    expect(getFeaturesByBoundsService).not.toBeNull();
    expect(getFeaturesByBoundsService.CLASS_NAME).toEqual('SuperMap.GetFeaturesByBoundsService');
    getFeaturesByBoundsService.destroy();
  });

  it('success:processAsync', done => {
    var serviceCompleted = serviceSucceedEventArgsSystem => {
      try {
        var analystResult = serviceSucceedEventArgsSystem.result.features;
        expect(analystResult).not.toBeNull();
        expect(analystResult.type).toEqual('FeatureCollection');
        expect(analystResult.features).not.toBeNull();
        expect(analystResult.features.length).toBeGreaterThan(0);
        getFeaturesByBoundsService.destroy();
        boundsParams.destroy();
        done();
      } catch (exception) {
        expect(false).toBeTruthy();
        console.log('GetFeaturesByBoundsService_' + exception.name + ':' + exception.message);
        getFeaturesByBoundsService.destroy();
        boundsParams.destroy();
        done();
      }
    };
    var getFeaturesByBoundsService = initGetFeaturesByBoundsService_RegisterListener();
    var boundsParams = new GetFeaturesByBoundsParameters({
      datasetNames: ['World:Countries'],
      bounds: new Bounds(0, 0, 90, 90),
      hasGeometry: false
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe('POST');
      expect(testUrl).toBe(url + '/featureResults?fromIndex=0&toIndex=19&returnContent=true');
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.datasetNames[0]).toBe('World:Countries');
      expect(paramsObj.hasGeometry).toBe(false);
      expect(options).not.toBeNull();
      return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    });
    getFeaturesByBoundsService.processAsync(boundsParams, serviceCompleted);
  });

  it('success:processAsync promise', done => {
    var serviceCompleted = serviceSucceedEventArgsSystem => {
      try {
        var analystResult = serviceSucceedEventArgsSystem.result.features;
        expect(analystResult).not.toBeNull();
        expect(analystResult.type).toEqual('FeatureCollection');
        expect(analystResult.features).not.toBeNull();
        expect(analystResult.features.length).toBeGreaterThan(0);
        getFeaturesByBoundsService.destroy();
        boundsParams.destroy();
        done();
      } catch (exception) {
        expect(false).toBeTruthy();
        console.log('GetFeaturesByBoundsService_' + exception.name + ':' + exception.message);
        getFeaturesByBoundsService.destroy();
        boundsParams.destroy();
        done();
      }
    };
    var getFeaturesByBoundsService = initGetFeaturesByBoundsService_RegisterListener();
    var boundsParams = new GetFeaturesByBoundsParameters({
      datasetNames: ['World:Countries'],
      bounds: new Bounds(0, 0, 90, 90),
      hasGeometry: false
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe('POST');
      expect(testUrl).toBe(url + '/featureResults?fromIndex=0&toIndex=19&returnContent=true');
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.datasetNames[0]).toBe('World:Countries');
      expect(paramsObj.hasGeometry).toBe(false);
      expect(options).not.toBeNull();
      return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    });
    getFeaturesByBoundsService.processAsync(boundsParams).then(serviceCompleted);
  });

  it('GetFeaturesByBoundsParameters:targetEpsgCode', done => {
    var serviceCompleted = serviceSucceedEventArgsSystem => {
      try {
        getFeaturesByBoundsService.destroy();
        boundsParams.destroy();
        done();
      } catch (exception) {
        expect(false).toBeTruthy();
        console.log('GetFeaturesByBoundsService_' + exception.name + ':' + exception.message);
        getFeaturesByBoundsService.destroy();
        boundsParams.destroy();
        done();
      }
    };
    var getFeaturesByBoundsService = initGetFeaturesByBoundsService_RegisterListener();
    var boundsParams = new GetFeaturesByBoundsParameters({
      datasetNames: ['World:Countries'],
      bounds: new Bounds(0, 0, 90, 90),
      targetEpsgCode: 4326
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.targetEpsgCode).toEqual(4326);
      return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    });
    getFeaturesByBoundsService.processAsync(boundsParams, serviceCompleted);
  })
  it('GetFeaturesByBoundsParameters:targetPrj', done => {
    var serviceCompleted = serviceSucceedEventArgsSystem => {
      try {
        getFeaturesByBoundsService.destroy();
        boundsParams.destroy();
        done();
      } catch (exception) {
        expect(false).toBeTruthy();
        console.log('GetFeaturesByBoundsService_' + exception.name + ':' + exception.message);
        getFeaturesByBoundsService.destroy();
        boundsParams.destroy();
        done();
      }
    };
    var getFeaturesByBoundsService = initGetFeaturesByBoundsService_RegisterListener();
    var boundsParams = new GetFeaturesByBoundsParameters({
      datasetNames: ['World:Countries'],
      bounds: new Bounds(0, 0, 90, 90),
      targetPrj: { "epsgCode": 4326 }
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.targetPrj.epsgCode).toEqual(4326);
      return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    });
    getFeaturesByBoundsService.processAsync(boundsParams, serviceCompleted);
  })
  it('processAsync_customQueryParam', done => {
    var serviceCompleted = serviceSucceedEventArgsSystem => {
      try {
        getFeaturesByBoundsService.destroy();
        boundsParams.destroy();
        done();
      } catch (exception) {
        expect(false).toBeTruthy();
        console.log('GetFeaturesByBoundsService_' + exception.name + ':' + exception.message);
        getFeaturesByBoundsService.destroy();
        boundsParams.destroy();
        done();
      }
    };
    var getFeaturesByBoundsService = initGetFeaturesByBoundsService_RegisterListener(
      url + '?key=123'
    );
    var boundsParams = new GetFeaturesByBoundsParameters({
      datasetNames: ['World:Countries'],
      bounds: new Bounds(0, 0, 90, 90)
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
      expect(testUrl).toBe(url + '/featureResults?key=123&fromIndex=0&toIndex=19&returnContent=true');
      return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    });
    getFeaturesByBoundsService.processAsync(boundsParams, serviceCompleted);
  });
});
