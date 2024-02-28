import {SpatialAnalystService} from '../../../src/maplibregl/services/SpatialAnalystService';
import {ConvexHullAnalystParameters} from '../../../src/common/iServer/ConvexHullAnalystParameters';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';


var url = GlobeParameter.spatialAnalystURL;
var options = {

};
describe('maplibregl_SpatialAnalystService_terrainCutFillCalculate', () => {
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

    // 凸包运算
    it('convexHullAnalysis', (done) => {
        var terrainCutFillCalculationParameters = new ConvexHullAnalystParameters({
          model:{
            "type":"GEOMODEL3D", 
            "modelUrl":"http://supermapiserver:8090/SampleData/AirPlane.s3m", 
            "position":{"x":120.2, "y":40.2, "z":10}
          }
        });
        var service = new SpatialAnalystService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params) => {
          expect(method).toBe("POST");
          expect(testUrl).toBe(url + "/geometry/3d/convexhull?returnContent=true");
          return Promise.resolve(new Response(`{
            "streamBytes":null,
            "volume":0,
            "dataContent":null,
            "succeed":false,
            "position":null,
            "message":"can not download file."
            }
          `));
        });
        service.convexHullAnalysis(terrainCutFillCalculationParameters, (result) => {
            serviceResult = result;
            try {
                expect(serviceResult).not.toBeNull();
                done();
            } catch (e) {
                console.log("'convexHullAnalysis'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});