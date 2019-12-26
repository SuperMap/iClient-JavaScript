import { FeatureService } from '../../../src/mapboxgl/services/FeatureService';
import { GetFeaturesBySQLParameters } from '../../../src/common/iServer/GetFeaturesBySQLParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.dataServiceURL;

describe('mapboxgl_FeatureService_getFeaturesBySQL', () => {
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

  it('headers', () => {
    let myHeaders = new Headers();
    var getFeaturesBySQLService = new FeatureService(url, { headers: myHeaders });
    expect(getFeaturesBySQLService).not.toBeNull();
    expect(getFeaturesBySQLService.options).not.toBeNull();
    expect(getFeaturesBySQLService.options.headers).not.toBeNull();
  });

  //数据集SQL查询服务
  it('getFeaturesBySQL', (done) => {
    var sqlParam = new GetFeaturesBySQLParameters({
      queryParameter: {
        name: "Countries@World",
        attributeFilter: "SMID = 247"
      },
      datasetNames: ["World:Countries"]
    });
    var service = new FeatureService(url);
    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      expect(method).toBe("POST");
      expect(testUrl).toBe(url + "/featureResults.json?returnContent=true&fromIndex=0&toIndex=19");
      var paramsObj = JSON.parse(params.replace(/'/g, "\""));
      expect(paramsObj.datasetNames[0]).toBe("World:Countries");
      expect(paramsObj.getFeatureMode).toBe("SQL");
      expect(options).not.toBeNull();
      return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    });
    service.getFeaturesBySQL(sqlParam, (result) => {
      serviceResult = result

      try {
        expect(service).not.toBeNull();
        expect(serviceResult).not.toBeNull();
        expect(serviceResult.type).toBe("processCompleted");
        expect(serviceResult.result.succeed).toBe(true);
        expect(serviceResult.object.options.data).toContain("Countries@World");
        expect(serviceResult.object.options.data).toContain("SMID = 247");
        expect(serviceResult.result.featureCount).toEqual(1);
        expect(serviceResult.result.totalCount).toEqual(serviceResult.result.featureCount);
        expect(serviceResult.result.features.type).toEqual("FeatureCollection");
        var features = serviceResult.result.features.features[0];
        expect(features.id).toEqual(127);
        expect(features.type).toEqual("Feature");
        expect(features.properties).not.toBeNull();
        expect(features.geometry.type).toEqual("MultiPolygon");
        var coordinates = features.geometry.coordinates;
        for (var i = 0; i < coordinates.length; i++) {
          expect(coordinates[i][0].length).toBeGreaterThan(0);
          for (var j = 0; j < coordinates[i][0].length; j++) {
            expect(coordinates[i][0][j].length).toEqual(2);
          }
        }
        done();
      } catch (e) {
        console.log("'getFeaturesBySQL'案例失败" + e.name + ":" + e.message);
        expect(false).toBeTruthy();
        done();
      }
    });
  });
  it('GetFeaturesBySQLParameters:targetEpsgCode', done => {
    var sqlParam = new GetFeaturesBySQLParameters({
      queryParameter: {
        name: "Countries@World",
        attributeFilter: "SMID = 247"
      },
      datasetNames: ["World:Countries"],
      targetEpsgCode: 4326
    });
    var service = new FeatureService(url);

    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.targetEpsgCode).toEqual(4326);
      return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    });
    service.getFeaturesBySQL(sqlParam, (result) => {
      serviceResult = result;
      done();
    });
  });
  it('GetFeaturesBySQLParameters:targetPrj', done => {
    var sqlParam = new GetFeaturesBySQLParameters({
      queryParameter: {
        name: "Countries@World",
        attributeFilter: "SMID = 247"
      },
      datasetNames: ["World:Countries"],
      targetPrj: { "epsgCode": 4326 }
    });
    var service = new FeatureService(url);

    spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
      var paramsObj = JSON.parse(params.replace(/'/g, '"'));
      expect(paramsObj.targetPrj.epsgCode).toEqual(4326);
      return Promise.resolve(new Response(JSON.stringify(getFeaturesResultJson)));
    });
    service.getFeaturesBySQL(sqlParam, (result) => {
      serviceResult = result;
      done();
    });
  });
});