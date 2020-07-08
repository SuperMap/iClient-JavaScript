import {FeatureService} from '../../../src/openlayers/services/FeatureService';
import {EditFeaturesParameters} from '../../../src/common/iServer/EditFeaturesParameters';
import {GetFeaturesByIDsParameters} from '../../../src/common/iServer/GetFeaturesByIDsParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import GeoJSON from 'ol/format/GeoJSON';

var featureServiceURL = GlobeParameter.dataServiceURL;
var editServiceURL = GlobeParameter.editServiceURL_leaflet;
var options = {
    serverType: 'iServer'
};
var id, id1, id2;
var originFeature = null, updateFeature = null;
describe('openlayers_FeatureService_editFeatures', () => {
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

    //地物编辑服务 添加一个地物
    it('addFeature', (done) => {
        var marker = new Feature(new Point([118.05408801141, 58.837029131724]));
        marker.setProperties({POP: 1, CAPITAL: 'test'});
        updateFeature = marker;
        var addFeatureParams = new EditFeaturesParameters({
            features: marker,
            dataSourceName: "World",
            dataSetName: "Capitals",
            editType: "add",
            returnContent: true
        });
        var featureService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(featureServiceURL + "/datasources/World/datasets/Capitals/features?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].fieldNames[1]).toBe("CAPITAL");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`[238]`));
        });
        featureService.editFeatures(addFeatureParams, (result) => {
            serviceResult = result;
            try {
                expect(featureService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result[0]).not.toBeNull();
                id = serviceResult.result[0];
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.object.options.method).toBe("POST");
                expect(serviceResult.object.options.data).toContain("'parts':[1]");
                expect(serviceResult.object.options.data).toContain('"POINT"');
                expect(serviceResult.object.options.data).toContain("'x':118.05408801141");
                expect(serviceResult.object.options.data).toContain("'y':58.837029131724");
                done();
            } catch (e) {
                console.log("'addFeature'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //地物编辑服务 批量添加地物   isUseBatch为true
    it('addFeatures_isUseBatch:true', (done) => {
        var marker = new Feature(new Point([100, 58]));
        var marker1 = new Feature(new Point([120, 42]));
        marker.setProperties({POP: 1, CAPITAL: 'test'});
        marker1.setProperties({POP: 1, CAPITAL: 'test'});
        var addFeatureParams = new EditFeaturesParameters({
            features: [marker, marker1],
            dataSourceName: "World",
            dataSetName: "Capitals",
            editType: "add",
            returnContent: true,
            isUseBatch: true
        });
        var featureService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(featureServiceURL + "/datasources/World/datasets/Capitals/features?isUseBatch=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].fieldNames[1]).toBe("CAPITAL");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","succeed":true}`));
        });
        featureService.editFeatures(addFeatureParams, (result) => {
            serviceResult = result;
            try {
                expect(featureService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.postResultType).toEqual("CreateChild");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.isUseBatch).toBe(true);
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.object.options.method).toBe("POST");
                expect(serviceResult.object.options.data).toContain("'parts':[1]");
                expect(serviceResult.object.options.data).toContain('"POINT"');
                expect(serviceResult.object.options.data).toContain("'x':100");
                expect(serviceResult.object.options.data).toContain("'y':58");
                expect(serviceResult.object.options.data).toContain("'x':120");
                expect(serviceResult.object.options.data).toContain("'y':42");
                id1 = id + 1;
                id2 = id + 2;
                done();
            } catch (e) {
                console.log("'addFeatures_isUseBatch:true'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //地物编辑服务 删除地物
    it('deleteFeatures', (done) => {
        var deleteFeatureParams = new EditFeaturesParameters({
            dataSourceName: "World",
            dataSetName: "Capitals",
            IDs: [id, id1, id2],
            editType: "delete"
        });
        var featureService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("DELETE");
            expect(testUrl).toBe(featureServiceURL + "/datasources/World/datasets/Capitals/features?ids=[238,239,240]");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        featureService.editFeatures(deleteFeatureParams, (result) => {
            serviceResult = result;
            try {
                expect(featureService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.object.options.method).toBe("DELETE");
                expect(serviceResult.object.options.data).toContain(id);
                expect(serviceResult.object.options.data).toContain(id1);
                expect(serviceResult.object.options.data).toContain(id2);
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBeTruthy();
                done();
            } catch (e) {
                console.log("'editFeatures_deleteFeature_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //地物编辑服务 删除地物失败事件
    it('deleteFeature_failed', (done) => {
        id = id + 3;
        var deleteFeatureParams = new EditFeaturesParameters({
            dataSourceName: "World",
            dataSetName: "Capitals",
            IDs: [id],
            editType: "delete"
        });
        var featureService = new FeatureService(featureServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe("DELETE");
            expect(testUrl).toBe(featureServiceURL + "/datasources/World/datasets/Capitals/features?ids=[241]");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"the specified features does not exist"}}`));
        });
        featureService.editFeatures(deleteFeatureParams, (result) => {
            serviceResult = result;
            try {
                expect(featureService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.error.code).toBe(400);
                expect(serviceResult.error.errorMsg).toEqual("the specified features does not exist");
                done();
            } catch (e) {
                console.log("'editFeatures_deleteFeature_failed_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //更新地物
    // 首先确认从服务器上获取一个有效要素
    it('getFeatureForUpdate', (done) => {
        var getFeatureResult = null;
        var getFeaturesByIDsParams = new GetFeaturesByIDsParameters({
            returnContent: true,
            datasetNames: ["Jingjin:Landuse_R"],
            IDs: [1]
        });
        var getFeaturesByIDsService = new FeatureService(editServiceURL);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(editServiceURL + "/featureResults?returnContent=true&fromIndex=0&toIndex=19");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.datasetNames[0]).toBe("Jingjin:Landuse_R");
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
                done();
            } else {
                originFeature = null;
                console.log("未获取到数据");
                done();
            }
        });
    });

    // 将上面获取的要素update
    it('updateFeature', (done) => {
        var updateFeatureResult = null;
        if (originFeature != null) {
            var random = parseInt(Math.random() * 10000000);
            originFeature.properties.LANDTYPE = "用材林" + random;
            var data = new GeoJSON().readFeatures(originFeature);
            var updateFeaturesService = new FeatureService(editServiceURL);
            var updateFeaturesParams = new EditFeaturesParameters({
                dataSourceName: "Jingjin",
                dataSetName: "Landuse_R",
                features: data,
                editType: "update"
            });
            spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
                expect(method).toBe("PUT");
                expect(testUrl).toBe(editServiceURL + "/datasources/Jingjin/datasets/Landuse_R/features");
                expect(params).not.toBeNull();
                var paramsObj = JSON.parse(params.replace(/'/g, "\""));
                expect(paramsObj[0].fieldNames[0]).toBe("SMID");
                expect(options).not.toBeNull();
                return Promise.resolve(new Response(`{"succeed":true}`));
            });
            updateFeaturesService.editFeatures(updateFeaturesParams, (result) => {
                updateFeatureResult = result;
                try {
                    expect(updateFeaturesService).not.toBeNull();
                    expect(updateFeatureResult).not.toBeNull();
                    expect(updateFeatureResult.type).toBe("processCompleted");
                    expect(updateFeatureResult.result.succeed).toBeTruthy();
                    done();
                } catch (exception) {
                    expect(false).toBeTruthy();
                    console.log("'successEvent:updateFeature'案例失败" + exception.name + ":" + exception.message);
                    done();
                }
            });
        }
        else {
            console.log("'updateFeature'未获取到数据");
            done();
        }
    });
});