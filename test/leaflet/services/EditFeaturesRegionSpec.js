import {featureService} from '../../../src/leaflet/services/FeatureService';
import {EditFeaturesParameters} from '../../../src/common/iServer/EditFeaturesParameters';
import {GetFeaturesByIDsParameters} from '../../../src/common/iServer/GetFeaturesByIDsParameters';
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
            addFeatureResult_REGION = result
        });
        setTimeout(() => {
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
        }, 2000)
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
            addFeatureResult = result
        });
        setTimeout(() => {
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
        }, 2000)
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
            deleteFeatureResult = result
        });
        setTimeout(() => {
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
        }, 2000);
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
            var getFeaturesByIDsResult = `{"features":[{"fieldNames":["SMID","SMSDRIW","SMSDRIN","SMSDRIE","SMSDRIS","SMUSERID","SMAREA","SMPERIMETER","SMGEOMETRYSIZE","LANDTYPE","AREA","AREA_1"],"geometry":{"center":{"x":116.47779336538451,"y":40.87251703306746},"parts":[11,25],"style":null,"prjCoordSys":null,"id":1,"type":"REGION","partTopo":[1,1],"points":[{"x":116.56011798741545,"y":40.974998841787524},{"x":116.56150174220221,"y":40.94790592692218},{"x":116.55331473419942,"y":40.94833049741859},{"x":116.54452877286913,"y":40.94278698828072},{"x":116.51148708137882,"y":40.9415074930931},{"x":116.49191830073954,"y":40.95152962190887},{"x":116.49154278269937,"y":40.95184614731207},{"x":116.5191389279665,"y":40.95769733616327},{"x":116.54789215398107,"y":40.97059073753362},{"x":116.55227092644809,"y":40.98067291092698},{"x":116.56011798741545,"y":40.974998841787524},{"x":116.45240975534918,"y":40.926561643579994},{"x":116.48335738600382,"y":40.906946991843945},{"x":116.53413937842329,"y":40.88028894601777},{"x":116.58927251961083,"y":40.856382903250505},{"x":116.596844337489,"y":40.84998073656371},{"x":116.60411186940466,"y":40.8405905332111},{"x":116.6072915011725,"y":40.831418273640736},{"x":116.60487409400316,"y":40.80753512197169},{"x":116.59640286818349,"y":40.804983466638404},{"x":116.57159177084257,"y":40.80328295428424},{"x":116.53692379162426,"y":40.82611050270566},{"x":116.52177482025756,"y":40.83891618370415},{"x":116.47421448473249,"y":40.85639002162627},{"x":116.4534781249059,"y":40.85446228135805},{"x":116.43244763868684,"y":40.84954325148809},{"x":116.40792174055952,"y":40.85080941881564},{"x":116.40239206912636,"y":40.87810082185974},{"x":116.40094908064879,"y":40.905189880800194},{"x":116.39335586936419,"y":40.911581388287445},{"x":116.38830990832763,"y":40.92598874391613},{"x":116.40101209286374,"y":40.93271017885276},{"x":116.41656891111404,"y":40.93707440282737},{"x":116.43488196549607,"y":40.94131439413376},{"x":116.44242325777105,"y":40.94175111185068},{"x":116.45240975534918,"y":40.926561643579994}]},"fieldValues":["1","116.38831","40.980675","116.60729","40.803284","4","1.3188454380984211E8","79616.58012922351","592","用材林8469349","132.0","132"],"ID":1}],"featureUriList":[],"totalCount":1,"featureCount":1}`;
            return Promise.resolve(new Response(getFeaturesByIDsResult));
        });
        getFeaturesByIDsService.getFeaturesByIDs(getFeaturesByIDsParams, (result) => {
            getFeatureResult = result
        });
        setTimeout(() => {
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
        }, 4000)
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
            });
            setTimeout(() => {
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
            }, 5000);
        }
        else {
            console.log("'updateFeature'未获取到数据");
            done();
        }
    });
});