require('../../../src/common/iServer/EditFeaturesService');

var editServiceURL = GlobeParameter.editServiceURL;
var id1;
describe('testEditFeaturesService', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    // 成功：增加一个REGION要素，returnContent为true
    it('successEvent:addFeature_returnContent=true', function (done) {
        var addFeatureFailedEventArgsSystem = null;
        var addFeatureSuccessEventArgsSystem = null;

        function addFeatureFailed(serviceFailedEventArgs) {
            addFeatureFailedEventArgsSystem = serviceFailedEventArgs;
        }

        function addFeatureCompleted(editFeaturesEventArgs) {
            addFeatureSuccessEventArgsSystem = editFeaturesEventArgs;
        }

        var addFeatureOptions = {
            eventListeners: {
                'processCompleted': addFeatureCompleted,
                'processFailed': addFeatureFailed
            }
        };
        var pointList = [],
            p1 = new SuperMap.Geometry.Point(118.05408801141, 38.837029131724),
            p2 = new SuperMap.Geometry.Point(117.80757663534, 38.606951847395),
            p3 = new SuperMap.Geometry.Point(118.43207212138, 38.530259419285);
        pointList.push(p1);
        pointList.push(p2);
        pointList.push(p3);
        pointList.push(p1);
        var linearRing = new SuperMap.Geometry.LinearRing(pointList);
        var polygon = new SuperMap.Geometry.Polygon([linearRing]);
        var features = {
            fieldNames: [],
            fieldValues: [],
            geometry: polygon
        };
        var addFeaturesParams = new SuperMap.EditFeaturesParameters({
            features: [features],
            editType: SuperMap.EditType.ADD,
            returnContent: true
        });
        var addFeatureService = new SuperMap.EditFeaturesService(editServiceURL, addFeatureOptions);
        addFeatureService.processAsync(addFeaturesParams);

        setTimeout(function () {
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
    it('successEvent:updateFeatures', function (done) {
        var updateFailedEventArgsSystem = null;
        var updateSuccessEventArgsSystem = null;

        function updateFeaturesFailed(serviceFailedEventArgs) {
            updateFailedEventArgsSystem = serviceFailedEventArgs;
        }

        function updateFeaturesCompleted(editFeaturesEventArgs) {
            updateSuccessEventArgsSystem = editFeaturesEventArgs;
        }

        var updateFeaturesOptions = {
            eventListeners: {
                'processCompleted': updateFeaturesCompleted,
                'processFailed': updateFeaturesFailed
            }
        };
        var pointList = [],
            p1 = new SuperMap.Geometry.Point(118.05, 38.83),
            p2 = new SuperMap.Geometry.Point(117.80, 38.60),
            p3 = new SuperMap.Geometry.Point(118.43, 38.53);
        pointList.push(p1);
        pointList.push(p2);
        pointList.push(p3);
        pointList.push(p1);
        var linearRing = new SuperMap.Geometry.LinearRing(pointList);
        var polygonUpdate = new SuperMap.Geometry.Polygon([linearRing]);
        var features = {
            fieldNames: [],
            fieldValues: [],
            geometry: polygonUpdate
        };
        polygonUpdate.id = id1;
        var updateFeaturesParams = new SuperMap.EditFeaturesParameters({
            features: [features],
            editType: SuperMap.EditType.UPDATE
        });
        var updateFeaturesService = new SuperMap.EditFeaturesService(editServiceURL, updateFeaturesOptions);
        updateFeaturesService.processAsync(updateFeaturesParams);

        setTimeout(function () {
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
    it('successEvent:deleteFeature', function (done) {
        var deleteFailedEventArgsSystem = null;
        var deleteSuccessEventArgsSystem = null;

        function deleteFeaturesFailed(serviceFailedEventArgs) {
            deleteFailedEventArgsSystem = serviceFailedEventArgs;
        }

        function deleteFeaturesCompleted(editFeaturesEventArgs) {
            deleteSuccessEventArgsSystem = editFeaturesEventArgs;
        }

        var deleteFeaturesOptions = {
            eventListeners: {
                'processCompleted': deleteFeaturesCompleted,
                'processFailed': deleteFeaturesFailed
            }
        };

        var deleteFeaturesParams = new SuperMap.EditFeaturesParameters({
            dataSourceName: "Jingjin",
            dataSetName: "Landuse_R",
            IDs: [id1],
            editType: SuperMap.EditType.DELETE
        });
        var deleteFeaturesService = new SuperMap.EditFeaturesService(editServiceURL, deleteFeaturesOptions);
        deleteFeaturesService.processAsync(deleteFeaturesParams);

        setTimeout(function () {
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
    it('failEvent:addFeatures_noParameters', function (done) {
        var noParamsFailedEventArgsSystem = null;
        var noParamsSuccessEventArgsSystem = null;

        function noParamsFailed(serviceFailedEventArgs) {
            noParamsFailedEventArgsSystem = serviceFailedEventArgs;
        }

        function noParamsCompleted(editFeaturesEventArgs) {
            noParamsSuccessEventArgsSystem = editFeaturesEventArgs;
        }

        var noParamsOptions = {
            eventListeners: {
                'processCompleted': noParamsCompleted,
                'processFailed': noParamsFailed
            }
        };

        var noParams = new SuperMap.EditFeaturesParameters({
            features: null,
            editType: SuperMap.EditType.ADD,
            returnContent: true
        });
        var noParamsService = new SuperMap.EditFeaturesService(editServiceURL, noParamsOptions);
        noParamsService.processAsync(noParams);

        setTimeout(function () {
            try {
                expect(noParamsSuccessEventArgsSystem).toBeNull();
                expect(noParamsFailedEventArgsSystem).not.toBeNull();
                expect(noParamsFailedEventArgsSystem.type).toBe('processFailed');
                expect(noParamsFailedEventArgsSystem.object.options.data).toBeUndefined();
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