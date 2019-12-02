import { featureService } from '../../../src/leaflet/services/FeatureService';
import { GetFeaturesByBoundsParameters } from '../../../src/common/iServer/GetFeaturesByBoundsParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var dataServiceURL = GlobeParameter.dataServiceURL;
var options = {
  serverType: 'iServer'
};

describe('leaflet_FeatureService_getFeaturesByBounds', () => {
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

  it('successEvent:getFeaturesByBounds_returnContent=true', (done) => {
    var polygon = L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]]);
    var getFeaturesByBoundsParams = new GetFeaturesByBoundsParameters({
      datasetNames: ["World:Capitals"],
      bounds: polygon.getBounds(),
      returnContent: true
    });
    var getFeaturesByBoundsService = featureService(dataServiceURL, options);
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe("POST");
      expect(testUrl).toBe(dataServiceURL + "/featureResults.json?returnContent=true&fromIndex=0&toIndex=19");
      var paramsObj = JSON.parse(params.replace(/'/g, "\""));
      expect(paramsObj.datasetNames[0]).toBe("World:Capitals");
      expect(paramsObj.getFeatureMode).toBe("BOUNDS");
      expect(paramsObj.spatialQueryMode).toBe("CONTAIN");
      expect(options).not.toBeNull();
      return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    });
    getFeaturesByBoundsService.getFeaturesByBounds(getFeaturesByBoundsParams, (result) => {
      serviceResult = result;
      try {
        expect(getFeaturesByBoundsService).not.toBeNull();
        expect(getFeaturesByBoundsService.options.serverType).toBe("iServer");
        expect(serviceResult.type).toBe("processCompleted");
        expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
        expect(serviceResult.result).not.toBeNull();
        expect(serviceResult.result.succeed).toBeTruthy();
        expect(serviceResult.result.featureCount).toEqual(1);
        expect(serviceResult.result.totalCount).toEqual(1);
        expect(serviceResult.result.features.type).toBe("FeatureCollection");
        expect(serviceResult.result.features.features.length).toEqual(1);
        for (var i = 0; i < serviceResult.result.features.features.length; i++) {
          expect(serviceResult.result.features.features[i].type).toBe("Feature");
          // expect(serviceResult.result.features.features[i].geometry.type).toBe("MultiPolygon");
          expect(serviceResult.result.features.features[i].geometry.coordinates.length).toEqual(2);
        }
        expect(serviceResult.result.features.features[0].properties).toEqual(Object({
          SMID: '127',
          CAPITAL: "利伯维尔",
        }));
        getFeaturesByBoundsService.destroy();
        done();
      } catch (exception) {
        console.log("leafletGetFeaturesByBoundsService_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
        getFeaturesByBoundsService.destroy();
        expect(false).toBeTruthy();
        done();
      }
    });
  });

  it('successEvent:getFeaturesByBounds_returnContent=false', (done) => {
    var polygon = L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]]);
    var getFeaturesByBoundsParams = new GetFeaturesByBoundsParameters({
      datasetNames: ["World:Capitals"],
      bounds: polygon.getBounds(),
      returnContent: false
    });
    var getFeaturesByBoundsService = featureService(dataServiceURL, options);
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe("POST");
      expect(testUrl).toBe(dataServiceURL + "/featureResults.json?");
      var paramsObj = JSON.parse(params.replace(/'/g, "\""));
      expect(paramsObj.datasetNames[0]).toBe("World:Capitals");
      expect(paramsObj.getFeatureMode).toBe("BOUNDS");
      expect(paramsObj.spatialQueryMode).toBe("CONTAIN");
      expect(options).not.toBeNull();
      return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d.json"}`));
    });
    getFeaturesByBoundsService.getFeaturesByBounds(getFeaturesByBoundsParams, (result) => {
      serviceResult = result;
      try {
        expect(getFeaturesByBoundsService).not.toBeNull();
        expect(getFeaturesByBoundsService.options.serverType).toBe("iServer");
        expect(serviceResult.type).toBe("processCompleted");
        expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
        expect(serviceResult.result).not.toBeNull();
        expect(serviceResult.result.succeed).toBeTruthy();
        expect(serviceResult.result.postResultType).toBe("CreateChild");
        expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
        expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
        getFeaturesByBoundsService.destroy();
        done();
      } catch (exception) {
        console.log("leafletGetFeaturesByBoundsService_'successEvent:returnContent=false'案例失败：" + exception.name + ":" + exception.message);
        getFeaturesByBoundsService.destroy();
        expect(false).toBeTruthy();
        done();
      }
    });
  });

  it('failEvent:getFeaturesByBounds_datasetNotExist', (done) => {
    var polygon = L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]]);
    var getFeaturesByBoundsParams = new GetFeaturesByBoundsParameters({
      datasetNames: ["World1:Capitals"],
      bounds: polygon.getBounds()
    });
    var getFeaturesByBoundsService = featureService(dataServiceURL, options);
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe("POST");
      expect(testUrl).toBe(dataServiceURL + "/featureResults.json?returnContent=true&fromIndex=0&toIndex=19");
      // expect(params).toContain("'datasetNames':[\"World1:Capitals\"");
      var paramsObj = JSON.parse(params.replace(/'/g, "\""));
      expect(paramsObj.datasetNames[0]).toBe("World1:Capitals");
      expect(paramsObj.getFeatureMode).toBe("BOUNDS");
      expect(paramsObj.spatialQueryMode).toBe("CONTAIN");
      expect(options).not.toBeNull();
      return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"数据源World1不存在，获取相应的数据服务组件失败"}}`));
    });
    getFeaturesByBoundsService.getFeaturesByBounds(getFeaturesByBoundsParams, (result) => {
      serviceResult = result;
      try {
        expect(getFeaturesByBoundsService).not.toBeNull();
        expect(getFeaturesByBoundsService.options.serverType).toBe("iServer");
        expect(serviceResult.type).toBe("processFailed");
        expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
        expect(serviceResult.error).not.toBeNull();
        expect(serviceResult.error.code).toEqual(400);
        expect(serviceResult.error.errorMsg).toBe("数据源World1不存在，获取相应的数据服务组件失败");
        getFeaturesByBoundsService.destroy();
        done();
      } catch (exception) {
        console.log("leafletGetFeaturesByBoundsService_'failEvent:datasetNotExist'案例失败：" + exception.name + ":" + exception.message);
        getFeaturesByBoundsService.destroy();
        expect(false).toBeTruthy();
        done();
      }
    });
  });
  it('GetFeaturesByBoundsParameters:targetEpsgCode', done => {
    var polygon = L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]]);
    var getFeaturesByBoundsService = featureService(dataServiceURL, options);
    var getFeaturesByBoundsParams = new GetFeaturesByBoundsParameters({
      datasetNames: ["World:Capitals"],
      bounds: polygon.getBounds(),
      targetEpsgCode: 4326
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.targetEpsgCode).toEqual(4326);
      return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d.json"}`));
    });
    getFeaturesByBoundsService.getFeaturesByBounds(getFeaturesByBoundsParams, (result) => {
      serviceResult = result;
      getFeaturesByBoundsService.destroy();
      done();
    });
  });
  it('GetFeaturesByBoundsParameters:targetPrj', done => {
    var polygon = L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]]);
    var getFeaturesByBoundsService = featureService(dataServiceURL, options);
    var getFeaturesByBoundsParams = new GetFeaturesByBoundsParameters({
      datasetNames: ["World:Capitals"],
      bounds: polygon.getBounds(),
      targetPrj: { "epsgCode": 4326 }
    });
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.targetPrj.epsgCode).toEqual(4326);
      return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d.json"}`));
    });
    getFeaturesByBoundsService.getFeaturesByBounds(getFeaturesByBoundsParams, (result) => {
      serviceResult = result;
      getFeaturesByBoundsService.destroy();
      done();
    });
  });
});

