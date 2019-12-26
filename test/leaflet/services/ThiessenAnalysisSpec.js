import {spatialAnalystService} from '../../../src/leaflet/services/SpatialAnalystService';
import {DatasetThiessenAnalystParameters} from '../../../src/common/iServer/DatasetThiessenAnalystParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var spatialAnalystURL = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    serverType: 'iServer'
};
describe('leaflet_SpatialAnalystService_thiessenAnalysis', () => {
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

    it('proxy', () => {
        var service = spatialAnalystService(spatialAnalystURL, { proxy: 'testProxy' });
        expect(service).not.toBeNull();
        expect(service.options.proxy).toEqual('testProxy');
        service.destroy();
    });

    it('serverType', () => {
        var service = spatialAnalystService(spatialAnalystURL, { serverType: 'iPortal' });
        expect(service).not.toBeNull();
        expect(service.options.serverType).toEqual('iPortal');
        service.destroy();
    });

    it('withCredentials', () => {
        var service = spatialAnalystService(spatialAnalystURL, { withCredentials: true });
        expect(service).not.toBeNull();
        expect(service.options.withCredentials).toBeTruthy();
        service.destroy();
    });

    it('crossOrigin', () => {
        var service = spatialAnalystService(spatialAnalystURL, { crossOrigin: true });
        expect(service).not.toBeNull();
        expect(service.options.crossOrigin).toBeTruthy();
        service.destroy();
    });

    it('headers', () => {
        var service = spatialAnalystService(spatialAnalystURL, { headers: {} });
        expect(service).not.toBeNull();
        expect(service.options.headers).not.toBeNull();
        service.destroy();
    });

    it('thiessenAnalysis', (done) => {
        var dsThiessenAnalystParameters = new DatasetThiessenAnalystParameters({
            dataset: "Factory@Changchun"
        });
        var thiessenAnalystService = spatialAnalystService(spatialAnalystURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/Factory@Changchun/thiessenpolygon.json?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.dataset).toBe("Factory@Changchun");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(thiessenAnalysisDatasetsEscapedJson)));
        });
        thiessenAnalystService.thiessenAnalysis(dsThiessenAnalystParameters, (result) => {
            serviceResult = result;
       
            try {
                expect(thiessenAnalystService).not.toBeNull();
                expect(thiessenAnalystService.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                var regions = serviceResult.result.regions;
                expect(regions).not.toBeNull();
                expect(regions.features).not.toBeNull();
                expect(regions.features.length).toBeGreaterThan(0);
                for (var i = 0; i < regions.features.length; i++) {
                    expect(regions.features[i].type).toEqual("Feature");
                    expect(regions.features[i].geometry.type).toEqual("MultiPolygon");
                    var coordinates = regions.features[i].geometry.coordinates;
                    expect(coordinates).not.toBeNull();
                    expect(coordinates[0][0].length).toBeGreaterThan(0);
                    for (var j = 0; j < coordinates[0][0].length; j++) {
                        expect(coordinates[0][0][j].length).toEqual(2);
                    }
                }
                expect(regions.type).toEqual("FeatureCollection");
                thiessenAnalystService.destroy();
                done();
            } catch (exception) {
                console.log("'thiessenAnalysis'案例失败" + exception.name + ":" + exception.message);
                thiessenAnalystService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});