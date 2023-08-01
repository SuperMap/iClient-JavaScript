import {featureService} from '../../../src/leaflet/services/FeatureService';
import {EditFeaturesParameters} from '../../../src/common/iServer/EditFeaturesParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var editServiceURL = GlobeParameter.editServiceURL_leaflet;
var id1, id2, id3;

describe('leaflet_FeatureService_editFeatures_Point', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    // 增加一个点要素，returnContent为true
    it('successEvent:add_POINT', (done) => {
        var addFeatureResult_POINT = null;
        var marker = L.circleMarker([38.837029131724, 118.05408801141]);
        var addFeaturesParams = new EditFeaturesParameters({
            dataSourceName: "Jingjin",
            dataSetName: "Neighbor_P",
            features: marker,
            editType: "add",
            returnContent: true,
            isUseBatch: false
        });
        var addFeaturesService = featureService(editServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(editServiceURL + "/datasources/Jingjin/datasets/Neighbor_P/features?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].geometry.type).toBe("POINT");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`[92]`));
        });
        addFeaturesService.editFeatures(addFeaturesParams, (addFeatureResult_POINT) => {
            try{
            expect(addFeaturesService).not.toBeNull();
            expect(addFeatureResult_POINT.type).toBe("processCompleted");
            expect(addFeatureResult_POINT.object.isInTheSameDomain).toBeTruthy();
            expect(addFeatureResult_POINT.options.method).toBe("POST");
            expect(addFeatureResult_POINT.options.data).toContain("'parts':[1]");
            expect(addFeatureResult_POINT.options.data).toContain('"POINT"');
            expect(addFeatureResult_POINT.result).not.toBeNull();
            expect(addFeatureResult_POINT.result.succeed).toBeTruthy();
            expect(addFeatureResult_POINT.result.length).toEqual(1);
            id1 = addFeatureResult_POINT.result[0];
            addFeaturesService.destroy();
            done();
        } catch (exception) {
            console.log("'successEvent:addFeature_POINT'案例失败：" + exception.name + ":" + exception.message);
            addFeaturesService.destroy();
            expect(false).toBeTruthy();
            done();
        }
        });
    });

    // 批量增加点要素，isUseBatch为true
    it('successEvent:add_isUseBatch=true', (done) => {
        var addFeaturesResult = null;
        var marker1 = L.circleMarker([40, 120]);
        var marker2 = L.circleMarker([51, 100]);
        var addFeaturesParams = new EditFeaturesParameters({
            dataSourceName: "Jingjin",
            dataSetName: "Neighbor_P",
            features: [marker1, marker2],
            editType: "add",
            returnContent: false,
            isUseBatch: true
        });
        var addFeaturesService = featureService(editServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(editServiceURL + "/datasources/Jingjin/datasets/Neighbor_P/features?isUseBatch=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].geometry.type).toBe("POINT");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","succeed":true}`));
        });
        addFeaturesService.editFeatures(addFeaturesParams, (addFeaturesResult) => {
            try {
                expect(addFeaturesService).not.toBeNull();
                expect(addFeaturesResult.type).toBe("processCompleted");
                expect(addFeaturesResult.object.isInTheSameDomain).toBeTruthy();
                expect(addFeaturesResult.object.isUseBatch).toBeTruthy();
                expect(addFeaturesResult.options.method).toBe("POST");
                expect(addFeaturesResult.options.data).toContain("'x':100,'y':51");
                expect(addFeaturesResult.options.data).toContain("'x':120,'y':40");
                expect(addFeaturesResult.result).not.toBeNull();
                expect(addFeaturesResult.result.succeed).toBeTruthy();
                expect(addFeaturesResult.result.postResultType).toBe("CreateChild");
                id2 = id1 + 1;
                id3 = id1 + 2;
                addFeaturesService.destroy();
                done();
            } catch (exception) {
                console.log("'successEvent:addFeatures_isUseBatch=true'案例失败：" + exception.name + ":" + exception.message);
                addFeaturesService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    // 批量删除点要素
    it('successEvent:delete', (done) => {
        var deletePointsResult = null;
        var deleteFeaturesParams = new EditFeaturesParameters({
            dataSourceName: "Jingjin",
            dataSetName: "Neighbor_P",
            IDs: [id1, id2, id3],
            editType: "delete"
        });
        var deletePointsService = featureService(editServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("DELETE");
            expect(testUrl).toBe(editServiceURL + "/datasources/Jingjin/datasets/Neighbor_P/features?ids=%5B92%2C93%2C94%5D");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        deletePointsService.editFeatures(deleteFeaturesParams, (result) => {
            deletePointsResult = result;
            try {
                expect(deletePointsService).not.toBeNull();
                expect(deletePointsResult).not.toBeNull();
                expect(deletePointsResult.type).toBe("processCompleted");
                var id = "[" + id1 + "," + id2 + "," + id3 + "]";
                expect(deletePointsResult.options.data).toBe(id);
                expect(deletePointsResult.options.method).toBe("DELETE");
                expect(deletePointsResult.result.succeed).toBeTruthy();
                deletePointsService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("'successEvent:deletePoints'案例失败" + exception.name + ":" + exception.message);
                deletePointsService.destroy();
                done();
            }
        });
    });

    // 失败事件：features为空
    it('failEvent:add_featuresNull', (done) => {
        var featuresNullResult = null;
        var nullFeaturesParams = new EditFeaturesParameters({
            dataSourceName: "Jingjin",
            dataSetName: "Neighbor_P",
            features: [],
            editType: "add"
        });
        var nullFeaturesService = featureService(editServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(editServiceURL + "/datasources/Jingjin/datasets/Neighbor_P/features");
            expect(params).toContain("[]");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"the features is empty addFeatures method"}}`));
        });
        nullFeaturesService.editFeatures(nullFeaturesParams, (result) => {
            featuresNullResult = result;
            try {
                expect(nullFeaturesService).not.toBeNull();
                expect(featuresNullResult.type).toBe("processFailed");
                expect(featuresNullResult.object.isInTheSameDomain).toBeTruthy();
                expect(featuresNullResult.options.method).toBe("POST");
                expect(featuresNullResult.error).not.toBeNull();
                expect(featuresNullResult.error.code).toEqual(400);
                expect(featuresNullResult.error.errorMsg).toBe("the features is empty addFeatures method");
                nullFeaturesService.destroy();
                done();
            } catch (exception) {
                console.log("'failEvent:addFeature_featuresNull'案例失败：" + exception.name + ":" + exception.message);
                nullFeaturesService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });
    // 获取地理要素元信息
    it('getMetadata', (done) => {
      var metaFeatureService = featureService(editServiceURL);
      spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
          expect(method).toBe("GET");
          expect(testUrl).toBe(editServiceURL+"/datasources/Jingjin/datasets/Neighbor_P/features/238/metadata");

          return Promise.resolve(new Response(`{
              "createTime": 1436945830474,
              "createUser": "admin",
              "lastEditTime": 1436945830474,
              "lastEditUser": "admin"
            }`
          ));
      });
      metaFeatureService.getMetadata({
          dataSourceName: "Jingjin",
          dataSetName: "Neighbor_P",
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