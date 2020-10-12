import {featureService} from '../../../src/leaflet/services/FeatureService';
import {EditFeaturesParameters} from '../../../src/common/iServer/EditFeaturesParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
var editServiceURL = GlobeParameter.editServiceURL_leaflet;
var id1;

describe('leaflet_FeatureService_editFeatures_Line', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    // 增加LINE要素，returnContent为true
    it('successEvent:add_LINE', (done) => {
        var addFeatureResult_LINE = null;
        var line = L.polyline([[10, 20], [20, 30]]);
        var addFeaturesParams = new EditFeaturesParameters({
            dataSourceName: "Jingjin",
            dataSetName: "Geomor_L",
            features: line,
            editType: "add",
            returnContent: true,
            isUseBatch: false
        });
        var addFeaturesService = featureService(editServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(editServiceURL + "/datasources/Jingjin/datasets/Geomor_L/features?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].geometry.type).toBe("LINE");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`[98]`));
        });
        addFeaturesService.editFeatures(addFeaturesParams, (addFeatureResult_LINE) => {
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
        });
    });

    // 删除LINE要素
    it('successEvent:delete_LINE', (done) => {
        var deleteLineResult = null;
        var deleteFeaturesParams = new EditFeaturesParameters({
            dataSourceName: "Jingjin",
            dataSetName: "Geomor_L",
            IDs: [id1],
            editType: "delete"
        });
        var deleteLineService = featureService(editServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("DELETE");
            expect(testUrl).toBe(editServiceURL + "/datasources/Jingjin/datasets/Geomor_L/features?ids=[98]");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        deleteLineService.editFeatures(deleteFeaturesParams, (deleteLineResult) => {
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
                console.log("'successEvent:delete_LINE'案例失败" + exception.name + ":" + exception.message);
                deleteLineService.destroy();
                done();
            }
        });
    });
});