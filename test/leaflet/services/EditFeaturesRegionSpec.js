import { featureService } from '../../../src/leaflet/services/FeatureService';
import { EditFeaturesParameters } from '../../../src/common/iServer/EditFeaturesParameters';
import { GetFeaturesByIDsParameters } from '../../../src/common/iServer/GetFeaturesByIDsParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var editServiceURL = GlobeParameter.editServiceURL_leaflet;
var id1, id2;
var originFeature = null;

describe('leaflet_FeatureService_editFeatures_Region', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    // 增加REGION要素，returnContent为true
    it('successEvent:add_REGION', (done) => {
        var addFeatureResult_REGION = null;
        var polygon = L.polygon([[38.837029131724, 118.05408801141], [38.606951847395, 117.80757663534], [38.530259419285, 118.43207212138], [38.837029131724, 118.05408801141]]);
        var addFeaturesParams = new EditFeaturesParameters({
            dataSourceName: "Jingjin",
            dataSetName: "Landuse_R",
            features: polygon,
            editType: "add",
            returnContent: true,
            isUseBatch: false
        });
        var addFeaturesService = featureService(editServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(editServiceURL + "/datasources/Jingjin/datasets/Landuse_R/features.json?returnContent=true");
            expect(params).not.toBeNull();
            expect(params).toContain("'type':\"REGION\"");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`[115]`));
        });
        addFeaturesService.editFeatures(addFeaturesParams, (result) => {
            addFeatureResult_REGION = result;
            try {
                expect(addFeaturesService).not.toBeNull();
                expect(addFeatureResult_REGION.type).toBe("processCompleted");
                expect(addFeatureResult_REGION.object.isInTheSameDomain).toBeFalsy();
                expect(addFeatureResult_REGION.object.options.method).toBe("POST");
                expect(addFeatureResult_REGION.object.options.data).toContain("'parts':[4]");
                expect(addFeatureResult_REGION.object.options.data).toContain('"REGION"');
                expect(addFeatureResult_REGION.result).not.toBeNull();
                expect(addFeatureResult_REGION.result.succeed).toBeTruthy();
                expect(addFeatureResult_REGION.result.length).toEqual(1);
                id1 = addFeatureResult_REGION.result[0];
                addFeaturesService.destroy();
                done();
            } catch (exception) {
                console.log("'successEvent:addFeature_REGION'案例失败：" + exception.name + ":" + exception.message);
                addFeaturesService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    // 增加REGION要素，returnContent为false
    it('successEvent:add_returnContent=false', (done) => {
        var addFeatureResult = null;
        var polygon = L.polygon([[37.837029131724, 117.05408801141], [37.606951847395, 116.80757663534], [37.530259419285, 117.43207212138], [37.837029131724, 117.05408801141]]);
        var addFeaturesParams = new EditFeaturesParameters({
            dataSourceName: "Jingjin",
            dataSetName: "Landuse_R",
            features: polygon,
            editType: "add",
            returnContent: false,
            isUseBatch: false
        });
        var addFeaturesService = featureService(editServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(editServiceURL + "/datasources/Jingjin/datasets/Landuse_R/features.json?");
            expect(params).not.toBeNull();
            expect(params).toContain("'type':\"REGION\"");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_78a67b1809614341b9314f311a47c1d4","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-jingjin/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_78a67b1809614341b9314f311a47c1d4.json"}`));
        });
        addFeaturesService.editFeatures(addFeaturesParams, (result) => {
            addFeatureResult = result;
            try {
                expect(addFeaturesService).not.toBeNull();
                expect(addFeatureResult.type).toBe("processCompleted");
                expect(addFeatureResult.object.isInTheSameDomain).toBeFalsy();
                expect(addFeatureResult.object.options.method).toBe("POST");
                expect(addFeatureResult.object.options.data).toContain("'parts':[4]");
                expect(addFeatureResult.object.options.data).toContain('"REGION"');
                expect(addFeatureResult.result).not.toBeNull();
                expect(addFeatureResult.result.succeed).toBeTruthy();
                expect(addFeatureResult.result.newResourceID.length).toBeGreaterThan(0);
                expect(addFeatureResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(addFeatureResult.result.postResultType).toBe("CreateChild");
                id2 = id1 + 1;
                addFeaturesService.destroy();
                done();
            } catch (exception) {
                console.log("'successEvent:addFeature_REGION'案例失败：" + exception.name + ":" + exception.message);
                addFeaturesService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //  批量删除要素
    it('successEvent:delete', (done) => {
        var deleteFeatureResult = null;
        var deleteFeaturesParams = new EditFeaturesParameters({
            dataSourceName: "Jingjin",
            dataSetName: "Landuse_R",
            IDs: [id1, id2],
            editType: "delete"
        });
        var deleteFeaturesService = featureService(editServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("DELETE");
            expect(testUrl).toBe(editServiceURL + "/datasources/Jingjin/datasets/Landuse_R/features.json?ids=[115,116]");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        deleteFeaturesService.editFeatures(deleteFeaturesParams, (result) => {
            deleteFeatureResult = result;
            try {
                expect(deleteFeaturesService).not.toBeNull();
                expect(deleteFeatureResult).not.toBeNull();
                expect(deleteFeatureResult.type).toBe("processCompleted");
                var id = "[" + id1 + "," + id2 + "]";
                expect(deleteFeatureResult.object.options.data).toBe(id);
                expect(deleteFeatureResult.object.options.method).toBe("DELETE");
                expect(deleteFeatureResult.result.succeed).toBeTruthy();
                deleteFeaturesService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("'successEvent:deleteFeatures'案例失败" + exception.name + ":" + exception.message);
                deleteFeaturesService.destroy();
                done();
            }
        });
    });

    // 更新要素
    // 首先确认从服务器上获取一个有效要素
    it('getFeatureForUpdate', (done) => {
        var getFeatureResult = null;
        var getFeaturesByIDsParams = new GetFeaturesByIDsParameters({
            returnContent: true,
            datasetNames: ["Jingjin:Landuse_R"],
            IDs: [1]
        });
        var getFeaturesByIDsService = featureService(editServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(editServiceURL + "/featureResults.json?returnContent=true&fromIndex=0&toIndex=19");
            expect(params).not.toBeNull();
            expect(params).toContain("'datasetNames':[\"Jingjin:Landuse_R\"]");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getFeatureResultJson)));
        });
        getFeaturesByIDsService.getFeaturesByIDs(getFeaturesByIDsParams, (result) => {
            getFeatureResult = result;
            if (getFeatureResult != null) {
                expect(getFeaturesByIDsService).not.toBeNull();
                expect(getFeatureResult.type).toBe("processCompleted");
                expect(getFeatureResult.result).not.toBeNull();
                expect(getFeatureResult.result.succeed).toBeTruthy();
                originFeature = getFeatureResult.result.features.features[0];
                getFeaturesByIDsService.destroy();
                done();
            } else {
                originFeature = null;
                console.log("未获取到数据");
                getFeaturesByIDsService.destroy();
                done();
            }
        });
    });

    // 将上面获取的要素update
    it('successEvent:update', (done) => {
        var updateFeatureResult = null;
        if (originFeature != null) {
            var random = parseInt(Math.random() * 10000000);
            originFeature.properties.LANDTYPE = "用材林" + random;
            var updateFeaturesParams = new EditFeaturesParameters({
                dataSourceName: "Jingjin",
                dataSetName: "Landuse_R",
                features: originFeature,
                editType: "update"
            });
            var updateFeaturesService = featureService(editServiceURL);
            spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
                expect(method).toBe("PUT");
                expect(testUrl).toBe(editServiceURL + "/datasources/Jingjin/datasets/Landuse_R/features.json?");
                expect(params).not.toBeNull();
                expect(options).not.toBeNull();
                return Promise.resolve(new Response(`{"succeed":true}`));
            });
            updateFeaturesService.editFeatures(updateFeaturesParams, (result) => {
                updateFeatureResult = result

                if (updateFeatureResult != null) {
                    try {
                        expect(updateFeaturesService).not.toBeNull();
                        expect(updateFeatureResult).not.toBeNull();
                        expect(updateFeatureResult.type).toBe("processCompleted");
                        expect(updateFeatureResult.result.succeed).toBeTruthy();
                        updateFeaturesService.destroy();
                        done();
                    } catch (exception) {
                        expect(false).toBeTruthy();
                        console.log("'successEvent:updateFeature'案例失败" + exception.name + ":" + exception.message);
                        updateFeaturesService.destroy();
                        done();
                    }
                }
                else {
                    console.log("'updateFeature'在设置的延时时间内未完成要素更新");
                    done();
                }
            })
        }
        else {
            console.log("'updateFeature'未获取到数据");
            done();

        }
    });
});