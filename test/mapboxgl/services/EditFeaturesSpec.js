import {FeatureService} from '../../../src/mapboxgl/services/FeatureService';
import {EditFeaturesParameters} from '../../../src/common/iServer/EditFeaturesParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.dataServiceURL;
var id;
describe('mapboxgl_FeatureService_editFeatures', () => {
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

    //添加要素
    it('add', (done) => {
        var pointFeature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [10, 15]
            },
            "properties": {POP: 1, CAPITAL: 'test'}
        };
        var marker = {
            "type": "FeatureCollection",
            "features": [pointFeature]
        };
        var addFeatureParams = new EditFeaturesParameters({
            features: marker,
            dataSourceName: "World",
            dataSetName: "Capitals",
            editType: "add",
            returnContent: true
        });
        var service = new FeatureService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/datasources/World/datasets/Capitals/features?returnContent=true");
            return Promise.resolve(new Response(`[257]`));
        });
        service.editFeatures(addFeatureParams, (serviceResult) => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result[0]).not.toBeNull();
                id = serviceResult.result[0];
                expect(serviceResult.options.method).toBe("POST");
                expect(serviceResult.options.data).toContain('"POINT"');
                expect(serviceResult.options.data).toContain("'x':10");
                expect(serviceResult.options.data).toContain("'y':15");
                done();
            } catch (e) {
                console.log("'editFeatures_addFeature'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //删除要素
    it('delete', (done) => {
        var deleteFeatureParams = new EditFeaturesParameters({
            dataSourceName: "World",
            dataSetName: "Capitals",
            IDs: [id],
            editType: "delete"
        });
        var service = new FeatureService(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe("DELETE");
            expect(testUrl).toBe(url + "/datasources/World/datasets/Capitals/features?ids=%5B257%5D");
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        service.editFeatures(deleteFeatureParams, (serviceResult) => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.isInTheSameDomain).toBeTruthy();
                expect(serviceResult.options.method).toBe("DELETE");
                expect(serviceResult.options.data).toContain(id);
                done();
            } catch (e) {
                console.log("'editFeatures_deleteFeature'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    //删除要素
    it('add and delete', (done) => {
      var deleteFeatureParams = new EditFeaturesParameters({
          dataSourceName: "World",
          dataSetName: "Capitals",
          IDs: [id],
          editType: "delete"
      });
      var pointFeature = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [10, 15]
        },
        "properties": {POP: 1, CAPITAL: 'test'}
      };
      var marker = {
          "type": "FeatureCollection",
          "features": [pointFeature]
      };
      var addFeatureParams = new EditFeaturesParameters({
          features: marker,
          dataSourceName: "World",
          dataSetName: "Capitals",
          editType: "add",
          returnContent: true
      });
      var service = new FeatureService(url);
      spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
        if(method === 'POST'){
          expect(method).toBe("POST");
          expect(testUrl).toBe(url + "/datasources/World/datasets/Capitals/features?returnContent=true");
          return Promise.resolve(new Response(`[257]`));
        }
        expect(method).toBe("DELETE");
        expect(testUrl).toBe(url + "/datasources/World/datasets/Capitals/features?ids=%5B257%5D");
        return Promise.resolve(new Response(`{"succeed":true}`));
      });
      service.editFeatures(addFeatureParams, (serviceResult) => {
        try {
            expect(service).not.toBeNull();
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.result.succeed).toBe(true);
            expect(serviceResult.result[0]).not.toBeNull();
            id = serviceResult.result[0];
            expect(serviceResult.options.method).toBe("POST");
            expect(serviceResult.options.data).toContain('"POINT"');
            expect(serviceResult.options.data).toContain("'x':10");
            expect(serviceResult.options.data).toContain("'y':15");
            done();
        } catch (e) {
            console.log("'editFeatures_addFeature'案例失败" + e.name + ":" + e.message);
            expect(false).toBeTruthy();
            done();
        }
      });
      service.editFeatures(deleteFeatureParams, (serviceResult) => {
        try {
            expect(service).not.toBeNull();
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.result.succeed).toBe(true);
            expect(serviceResult.object.isInTheSameDomain).toBeTruthy();
            expect(serviceResult.options.method).toBe("DELETE");
            expect(serviceResult.options.data).toContain(id);
        } catch (e) {
            console.log("'editFeatures_deleteFeature'案例失败" + e.name + ":" + e.message);
            expect(false).toBeTruthy();
        }
    });
  });

    // 获取地理要素元信息
    it('getMetadata', (done) => {
      var featureService = new FeatureService(url);
      spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
          expect(method).toBe("GET");
          expect(testUrl).toBe(url+"/datasources/World/datasets/Capitals/features/238/metadata");

          return Promise.resolve(new Response(`{
              "createTime": 1436945830474,
              "createUser": "admin",
              "lastEditTime": 1436945830474,
              "lastEditUser": "admin"
            }`
          ));
      });
      featureService.getMetadata({
          dataSourceName: "World",
          dataSetName: "Capitals",
          featureId: 238
        }, (serviceResult) => {
          try {
              expect(serviceResult).not.toBeNull();
              expect(serviceResult.result.createTime).toBe(1436945830474);
              expect(serviceResult.result.succeed).toBe(true);
              done();
          } catch (e) {
              console.log("'addFeature'案例失败" + e.name + ":" + e.message);
              expect(false).toBeTruthy();
              done();
          }
      });
    });

});