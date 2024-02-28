﻿import { FetchRequest } from '../../../src/common/util/FetchRequest';
import {EditFeaturesService} from '../../../src/common/iServer/EditFeaturesService';
import {EditFeaturesParameters} from '../../../src/common/iServer/EditFeaturesParameters';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {LinearRing} from '../../../src/common/commontypes/geometry/LinearRing';
import {Polygon} from '../../../src/common/commontypes/geometry/Polygon';
import {EditType} from '../../../src/common/REST';

var editServiceURL = GlobeParameter.editServiceURL;
var id1;
describe('EditFeaturesService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    // 成功：增加一个REGION要素，returnContent为true
    it('successEvent:addFeature_returnContent=true', (done) => {
        var addFeatureCompleted = (addFeatureSuccessEventArgsSystem) => {
            try {
                var serviceResult = addFeatureSuccessEventArgsSystem.result;
                expect(addFeatureService).not.toBeNull();
                expect(addFeatureService.isInTheSameDomain).toBeTruthy();
                expect(addFeatureService.isUseBatch).toBeFalsy();
                expect(addFeatureService.returnContent).toBeTruthy();
                expect(addFeatureSuccessEventArgsSystem.options.method).toBe("POST");
                expect(addFeatureSuccessEventArgsSystem.options.data).toContain("'parts':[4]");
                expect(addFeatureSuccessEventArgsSystem.options.data).toContain('"REGION"');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult[0]).not.toBeNull();
                id1 = serviceResult[0];
                addFeatureService.destroy();
                addFeaturesParams.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("addFeature案例失败" + exception.name + ":" + exception.message);
                addFeatureService.destroy();
                addFeaturesParams.destroy();
                done();
            }
        };
        var pointList = [],
            p1 = new Point(118.05408801141, 38.837029131724),
            p2 = new Point(117.80757663534, 38.606951847395),
            p3 = new Point(118.43207212138, 38.530259419285);
        pointList.push(p1);
        pointList.push(p2);
        pointList.push(p3);
        pointList.push(p1);
        var linearRing = new LinearRing(pointList);
        var polygon = new Polygon([linearRing]);
        var features = {
            fieldNames: [],
            fieldValues: [],
            geometry: polygon
        };
        var addFeaturesParams = new EditFeaturesParameters({
            features: [features],
            editType: EditType.ADD,
            returnContent: true
        });
        var addFeatureService = new EditFeaturesService(editServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(editServiceURL + "/features?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].geometry.type).toBe("REGION");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`[134]`));
        });
        addFeatureService.processAsync(addFeaturesParams, addFeatureCompleted);
    });

    // 更新要素
    it('successEvent:updateFeatures', (done) => {
        var updateFailedEventArgsSystem = null;
        var updateFeaturesCompleted = (updateSuccessEventArgsSystem) => {
            try {
                expect(updateFeaturesService).not.toBeNull();
                expect(updateFeaturesService.isInTheSameDomain).toBeTruthy();
                expect(updateFailedEventArgsSystem).toBeNull();
                expect(updateSuccessEventArgsSystem.type).toBe("processCompleted");
                expect(updateSuccessEventArgsSystem.options.method).toBe("PUT");
                expect(updateSuccessEventArgsSystem.result.succeed).toBeTruthy();
                updateFeaturesService.destroy();
                updateFeaturesParams.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("updateFeatures案例失败" + exception.name + ":" + exception.message);
                updateFeaturesService.destroy();
                updateFeaturesParams.destroy();
                done();
            }
        };
        var pointList = [],
            p1 = new Point(118.05, 38.83),
            p2 = new Point(117.80, 38.60),
            p3 = new Point(118.43, 38.53);
        pointList.push(p1);
        pointList.push(p2);
        pointList.push(p3);
        pointList.push(p1);
        var linearRing = new LinearRing(pointList);
        var polygonUpdate = new Polygon([linearRing]);
        var features = {
            fieldNames: [],
            fieldValues: [],
            geometry: polygonUpdate
        };
        polygonUpdate.id = id1;
        var updateFeaturesParams = new EditFeaturesParameters({
            features: [features],
            editType: EditType.UPDATE
        });
        var updateFeaturesService = new EditFeaturesService(editServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("PUT");
            expect(testUrl).toBe(editServiceURL + "/features");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].geometry.type).toBe("REGION");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        updateFeaturesService.processAsync(updateFeaturesParams, updateFeaturesCompleted);
    });

    // 删除要素
    it('successEvent:deleteFeature', (done) => {
        var deleteFeaturesCompleted = (deleteSuccessEventArgsSystem) => {
            try {

                expect(deleteSuccessEventArgsSystem.type).toBe("processCompleted");
                var id = "[" + id1 + "]";
                expect(deleteSuccessEventArgsSystem.options.data).toBe(id);
                expect(deleteSuccessEventArgsSystem.options.method).toBe("DELETE");
                expect(deleteSuccessEventArgsSystem.result.succeed).toBeTruthy();
                deleteFeaturesService.destroy();
                deleteFeaturesParams.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("deleteFeatures案例失败" + exception.name + ":" + exception.message);
                deleteFeaturesService.destroy();
                deleteFeaturesParams.destroy();
                done();
            }
        };
        var deleteFeaturesParams = new EditFeaturesParameters({
            dataSourceName: "Jingjin",
            dataSetName: "Landuse_R",
            IDs: [id1],
            editType: EditType.DELETE
        });
        var deleteFeaturesService = new EditFeaturesService(editServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("DELETE");
            expect(testUrl).toBe(editServiceURL + "/features?ids=%5B134%5D");
            expect(params).not.toBeNull();
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        deleteFeaturesService.processAsync(deleteFeaturesParams, deleteFeaturesCompleted);
    });

    // 删除要素-url超过长度转post
    it('successEvent:deleteFeature-longurl', (done) => {
        var ids = []
        for(var i =0; i<500; i++){
            ids.push(i)
        }
        var deleteFeaturesCompleted = (deleteSuccessEventArgsSystem) => {
            try {
                expect(deleteSuccessEventArgsSystem.type).toBe("processCompleted");
                var id = JSON.stringify(ids);
                expect(deleteSuccessEventArgsSystem.options.data).toBe(id);
                expect(deleteSuccessEventArgsSystem.options.method).toBe("POST");
                expect(deleteSuccessEventArgsSystem.result.succeed).toBeTruthy();
                deleteFeaturesService.destroy();
                deleteFeaturesParams.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("deleteFeatures案例失败" + exception.name + ":" + exception.message);
                deleteFeaturesService.destroy();
                deleteFeaturesParams.destroy();
                done();
            }
        };
        var deleteFeaturesParams = new EditFeaturesParameters({
            dataSourceName: "Jingjin",
            dataSetName: "Landuse_R",
            IDs: ids,
            editType: EditType.DELETE
        });
        var deleteFeaturesService = new EditFeaturesService(editServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(editServiceURL + "/features?_method=DELETE");
            expect(JSON.parse(params).length).toBe(500);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        deleteFeaturesService.processAsync(deleteFeaturesParams, deleteFeaturesCompleted);
    });
    // 删除要素-url超过长度且原本带有参数
    it('successEvent:deleteFeature-longurl-withParms', (done) => {
        var ids = []
        for(var i =0; i<1000; i++){
            ids.push(i)
        }
        var editServiceURL2 = editServiceURL + "?token=test&key=123"
        var deleteFeaturesCompleted = (deleteSuccessEventArgsSystem) => {
            try {
                expect(deleteSuccessEventArgsSystem.type).toBe("processCompleted");
                var id = JSON.stringify(ids);
                expect(deleteSuccessEventArgsSystem.options.data).toBe(id);
                expect(deleteSuccessEventArgsSystem.options.method).toBe("POST");
                expect(deleteSuccessEventArgsSystem.result.succeed).toBeTruthy();
                deleteFeaturesService.destroy();
                deleteFeaturesParams.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("deleteFeatures案例失败" + exception.name + ":" + exception.message);
                deleteFeaturesService.destroy();
                deleteFeaturesParams.destroy();
                done();
            }
        };
        var deleteFeaturesParams = new EditFeaturesParameters({
            dataSourceName: "Jingjin",
            dataSetName: "Landuse_R",
            IDs: ids,
            editType: EditType.DELETE
        });
        var deleteFeaturesService = new EditFeaturesService(editServiceURL2);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe( editServiceURL + "/features?token=test&key=123&_method=DELETE");
            expect(JSON.parse(params).length).toBe(1000);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        deleteFeaturesService.processAsync(deleteFeaturesParams, deleteFeaturesCompleted);
    });

    // 失败事件
    it('failEvent:addFeatures_noParameters', (done) => {
        var noParamsFailed = (noParamsFailedEventArgsSystem) => {
            try {

                expect(noParamsFailedEventArgsSystem).not.toBeNull();
                expect(noParamsFailedEventArgsSystem.type).toBe('processFailed');
                expect(noParamsFailedEventArgsSystem.options.method).toBe('POST');
                expect(noParamsFailedEventArgsSystem.error).not.toBeNull();
                expect(noParamsFailedEventArgsSystem.error.code).toEqual(400);
                expect(noParamsFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                noParamsService.destroy();
                noParams.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("'failEvent:addFeatures_noParameters'案例失败" + exception.name + ":" + exception.message);
                noParamsService.destroy();
                noParams.destroy();
                done();
            }
        };
        var noParams = new EditFeaturesParameters({
            features: null,
            editType: EditType.ADD,
            returnContent: true
        });
        var noParamsService = new EditFeaturesService(editServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(editServiceURL + "/features?returnContent=true");
            expect(params).toBe("[]")
            // expect(params).not.toBeNull();
            // var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            // expect(paramsObj[0].geometry).toBeNull;
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"the features is empty addFeatures method"}}`));
        });
        noParamsService.processAsync(noParams, noParamsFailed);
    });
    it('successEvent:addFeature_customQueryParam', (done) => {
        var addFeatureFailedEventArgsSystem = null, addFeatureSuccessEventArgsSystem = null;
        var addFeatureCompleted = (addFeatureSuccessEventArgsSystem) => {
            try {
                addFeatureService.destroy();
                addFeaturesParams.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("addFeature案例失败" + exception.name + ":" + exception.message);
                addFeatureService.destroy();
                addFeaturesParams.destroy();
                done();
            }
        };
        var pointList = [],
            p1 = new Point(118.05408801141, 38.837029131724),
            p2 = new Point(117.80757663534, 38.606951847395),
            p3 = new Point(118.43207212138, 38.530259419285);
        pointList.push(p1);
        pointList.push(p2);
        pointList.push(p3);
        pointList.push(p1);
        var linearRing = new LinearRing(pointList);
        var polygon = new Polygon([linearRing]);
        var features = {
            fieldNames: [],
            fieldValues: [],
            geometry: polygon
        };
        var addFeaturesParams = new EditFeaturesParameters({
            features: [features],
            editType: EditType.ADD,
            returnContent: true
        });
        var addFeatureService = new EditFeaturesService(editServiceURL + '?key=111');
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(testUrl).toBe(editServiceURL + "/features?key=111&returnContent=true");
            return Promise.resolve(new Response(`[134]`));
        });
        addFeatureService.processAsync(addFeaturesParams, addFeatureCompleted);
    });

});