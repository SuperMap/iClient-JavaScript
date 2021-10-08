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
        service.editFeatures(addFeatureParams, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result[0]).not.toBeNull();
                id = serviceResult.result[0];
                expect(serviceResult.object.options.method).toBe("POST");
                expect(serviceResult.object.options.data).toContain('"POINT"');
                expect(serviceResult.object.options.data).toContain("'x':10");
                expect(serviceResult.object.options.data).toContain("'y':15");
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
            expect(testUrl).toBe(url + "/datasources/World/datasets/Capitals/features?ids=[257]");
            return Promise.resolve(new Response(`{"succeed":true}`));
        });
        service.editFeatures(deleteFeatureParams, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.object.isInTheSameDomain).toBeTruthy();
                expect(serviceResult.object.options.method).toBe("DELETE");
                expect(serviceResult.object.options.data).toContain(id);
                done();
            } catch (e) {
                console.log("'editFeatures_deleteFeature'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});