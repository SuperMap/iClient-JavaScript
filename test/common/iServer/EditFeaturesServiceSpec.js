﻿import {EditFeaturesService} from '../../../src/common/iServer/EditFeaturesService';
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
        var addFeatureFailedEventArgsSystem = null, addFeatureSuccessEventArgsSystem = null;
        var addFeatureFailed = (serviceFailedEventArgs) => {
            addFeatureFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var addFeatureCompleted = (editFeaturesEventArgs) => {
            addFeatureSuccessEventArgsSystem = editFeaturesEventArgs;
        };
        var addFeatureOptions = {
            eventListeners: {
                'processCompleted': addFeatureCompleted,
                'processFailed': addFeatureFailed
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
        var addFeatureService = new EditFeaturesService(editServiceURL, addFeatureOptions);
        addFeatureService.processAsync(addFeaturesParams);
        setTimeout(() => {
            try {
                var serviceResult = addFeatureSuccessEventArgsSystem.result;
                expect(addFeatureService).not.toBeNull();
                expect(addFeatureService.isInTheSameDomain).toBeFalsy();
                expect(addFeatureService.isUseBatch).toBeFalsy();
                expect(addFeatureService.returnContent).toBeTruthy();
                expect(addFeatureService.options.method).toBe("POST");
                expect(addFeatureService.options.data).toContain("'parts':[4]");
                expect(addFeatureService.options.data).toContain('"REGION"');
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
        }, 2000);
    });

    // 更新要素
    it('successEvent:updateFeatures', (done) => {
        var updateFailedEventArgsSystem = null, updateSuccessEventArgsSystem = null;
        var updateFeaturesFailed = (serviceFailedEventArgs) => {
            updateFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var updateFeaturesCompleted = (editFeaturesEventArgs) => {
            updateSuccessEventArgsSystem = editFeaturesEventArgs;
        };
        var updateFeaturesOptions = {
            eventListeners: {
                'processCompleted': updateFeaturesCompleted,
                'processFailed': updateFeaturesFailed
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
        var updateFeaturesService = new EditFeaturesService(editServiceURL, updateFeaturesOptions);
        updateFeaturesService.processAsync(updateFeaturesParams);
        setTimeout(() => {
            try {
                expect(updateFeaturesService).not.toBeNull();
                expect(updateFeaturesService.isInTheSameDomain).toBeFalsy();
                expect(updateFailedEventArgsSystem).toBeNull();
                expect(updateSuccessEventArgsSystem.type).toBe("processCompleted");
                expect(updateSuccessEventArgsSystem.object.options.method).toBe("PUT");
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
        }, 2000);
    });

    // 删除要素
    it('successEvent:deleteFeature', (done) => {
        var deleteFailedEventArgsSystem = null, deleteSuccessEventArgsSystem = null;
        var deleteFeaturesFailed = (serviceFailedEventArgs) => {
            deleteFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var deleteFeaturesCompleted = (editFeaturesEventArgs) => {
            deleteSuccessEventArgsSystem = editFeaturesEventArgs;
        };
        var deleteFeaturesOptions = {
            eventListeners: {
                'processCompleted': deleteFeaturesCompleted,
                'processFailed': deleteFeaturesFailed
            }
        };
        var deleteFeaturesParams = new EditFeaturesParameters({
            dataSourceName: "Jingjin",
            dataSetName: "Landuse_R",
            IDs: [id1],
            editType: EditType.DELETE
        });
        var deleteFeaturesService = new EditFeaturesService(editServiceURL, deleteFeaturesOptions);
        deleteFeaturesService.processAsync(deleteFeaturesParams);
        setTimeout(() => {
            try {
                expect(deleteFailedEventArgsSystem).toBeNull();
                expect(deleteSuccessEventArgsSystem.type).toBe("processCompleted");
                var id = "[" + id1 + "]";
                expect(deleteSuccessEventArgsSystem.object.options.data).toBe(id);
                expect(deleteSuccessEventArgsSystem.object.options.method).toBe("DELETE");
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
        }, 2000);
    });

    // 失败事件
    it('failEvent:addFeatures_noParameters', (done) => {
        var noParamsFailedEventArgsSystem = null, noParamsSuccessEventArgsSystem = null;
        var noParamsFailed = (serviceFailedEventArgs) => {
            noParamsFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var noParamsCompleted = (editFeaturesEventArgs) => {
            noParamsSuccessEventArgsSystem = editFeaturesEventArgs;
        };
        var noParamsOptions = {
            eventListeners: {
                'processCompleted': noParamsCompleted,
                'processFailed': noParamsFailed
            }
        };
        var noParams = new EditFeaturesParameters({
            features: null,
            editType: EditType.ADD,
            returnContent: true
        });
        var noParamsService = new EditFeaturesService(editServiceURL, noParamsOptions);
        noParamsService.processAsync(noParams);
        setTimeout(() => {
            try {
                expect(noParamsSuccessEventArgsSystem).toBeNull();
                expect(noParamsFailedEventArgsSystem).not.toBeNull();
                expect(noParamsFailedEventArgsSystem.type).toBe('processFailed');
                expect(noParamsFailedEventArgsSystem.object.options.method).toBe('POST');
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
        }, 2000);
    });
});