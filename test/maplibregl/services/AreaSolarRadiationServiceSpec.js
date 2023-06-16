import { SpatialAnalystService } from '../../../src/maplibregl/services/SpatialAnalystService';
import { AreaSolarRadiationParameters } from '@supermap/iclient-common/iServer/AreaSolarRadiationParameters';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';

var url = GlobeParameter.spatialAnalystURL;
var options = {

};
describe('maplibregl_SpatialAnalystService_AreaSolarRadiationService', () => {
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

    it('getAreaSolarRadiationResult', (done) => {
        var areaSolarRadiationParameters = new AreaSolarRadiationParameters({
            dataset: 'JingjinTerrain@Jingjin',
            targetDatasourceName: 'Jingjin',
            totalGridName: 'dataset1',
            diffuseDatasetGridName: 'dataset2',
            durationDatasetGridName: 'dataset3',
            directDatasetGridName: 'dataset4',
            latitude: 90,
            dayStart: 1,
            dayEnd: 300,
            hourStart: 8,
            hourEnd: 18
        });
        var service = new SpatialAnalystService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/datasets/JingjinTerrain@Jingjin/solarradiation?returnContent=true");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(getAreaSolarRadiationResultJson)));
        });
        service.getAreaSolarRadiationResult(areaSolarRadiationParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                done();
            } catch (e) {
                console.log("'getAreaSolarRadiationResult'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});