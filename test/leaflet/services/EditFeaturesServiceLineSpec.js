require('../../../src/leaflet/services/FeatureService');

var editServiceURL = GlobeParameter.editServiceURL_leaflet;
var id1;

describe('leaflet_testFeatureService_editFeatures', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    // 增加LINE要素，returnContent为true
    it('successEvent:addFeature_LINE', function (done) {
        var addFeatureResult_LINE = null;
        var line = L.polyline([[10, 20], [20, 30]]);
        var addFeaturesParams = new SuperMap.EditFeaturesParameters({
            dataSourceName: "Jingjin",
            dataSetName: "Geomor_L",
            features: line,
            editType: "add",
            returnContent: true,
            isUseBatch: false
        });
        var addFeaturesService = L.supermap.featureService(editServiceURL).editFeatures(addFeaturesParams, function (result) {
            addFeatureResult_LINE = result
        });
        setTimeout(function () {
            try {
                expect(addFeaturesService).not.toBeNull();
                expect(addFeatureResult_LINE.type).toBe("processCompleted");
                expect(addFeatureResult_LINE.object.isInTheSameDomain).toBeFalsy();
                expect(addFeatureResult_LINE.object.options.method).toBe("POST");
                expect(addFeatureResult_LINE.object.options.data).toContain("'parts':[2]");
                expect(addFeatureResult_LINE.object.options.data).toContain('"LINE"');
                expect(addFeatureResult_LINE.result).not.toBeNull();
                expect(addFeatureResult_LINE.result.succeed).toBeTruthy();
                expect(addFeatureResult_LINE.result.length).toEqual(1);
                id1 = addFeatureResult_LINE.result[0];
                addFeaturesService.destroy();
                done();
            } catch (exception) {
                console.log("'successEvent:addFeature_LINE'案例失败：" + exception.name + ":" + exception.message);
                addFeaturesService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });

    // 删除LINE要素
    it('successEvent:deleteLINE', function (done) {
        var deleteLineResult = null;
        var deleteFeaturesParams = new SuperMap.EditFeaturesParameters({
            dataSourceName: "Jingjin",
            dataSetName: "Geomor_L",
            IDs: [id1],
            editType: "delete"
        });
        var deleteLineService = L.supermap.featureService(editServiceURL).editFeatures(deleteFeaturesParams, function (result) {
            deleteLineResult = result
        });
        setTimeout(function () {
            try {
                expect(deleteLineService).not.toBeNull();
                expect(deleteLineResult).not.toBeNull();
                expect(deleteLineResult.type).toBe("processCompleted");
                var id = "[" + id1 + "]";
                expect(deleteLineResult.object.options.data).toBe(id);
                expect(deleteLineResult.object.options.method).toBe("DELETE");
                expect(deleteLineResult.result.succeed).toBeTruthy();
                deleteLineService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("'successEvent:deleteLINE'案例失败" + exception.name + ":" + exception.message);
                deleteLineService.destroy();
                done();
            }
        }, 2000);
    });

});