import {SpatialAnalystService} from '../../../src/mapboxgl/services/SpatialAnalystService';
import {TerrainCutFillCalculationParameters} from '../../../src/common/iServer/TerrainCutFillCalculationParameters';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';


var url = GlobeParameter.spatialAnalystURL;
var options = {

};
describe('mapboxgl_SpatialAnalystService_terrainCutFillCalculate', () => {
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

    // 填挖方
    it('terrainCutFillCalculate', (done) => {
        var terrainCutFillCalculationParameters = new TerrainCutFillCalculationParameters({
          dataset: "JingjinTerrain@Jingjin",
          cutFillType:"REGION3D",
          region3D:"{\"bounds\":{\"bottom\":39.5,\"center\":{\"x\":116.2,\"y\":40.0},\"height\":1.0,\"left\":115.4,\"leftBottom\":{\"x\":115.4,\"y\":39.5},\"right\":117.0,\"rightTop\":{\"x\":117.0,\"y\":40.5},\"top\":40.5,\"valid\":true,\"width\":1.6},\"id\":0,\"parts\":[4],\"points\":[{\"x\":115.4,\"y\":40.0,\"z\":-5.0},{\"x\":116.4,\"y\":39.5,\"z\":0.0},{\"x\":117.0,\"y\":40.5,\"z\":5.0},{\"x\":115.4,\"y\":40.0,\"z\":-5.0}],\"rotationX\":0.0,\"rotationY\":0.0,\"rotationZ\":0.0,\"scaleX\":0.0,\"scaleY\":0.0,\"scaleZ\":0.0,\"type\":\"REGION3D\"}",
          resultDataset:"cutfill", 
          buildPyramid:true,
          deleteExistResultDataset:true
        });
        var service = new SpatialAnalystService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
          expect(method).toBe("POST");
          expect(testUrl).toBe(url + "/datasets/JingjinTerrain@Jingjin/terraincalculation/cutfill?returnContent=true");
          var paramsObj = JSON.parse(params.replace(/'/g, "\""));
          expect(paramsObj.resultDataset).toBe("cutfill");
          expect(paramsObj.deleteExistResultDataset).toBeTruthy();
          return Promise.resolve(new Response(`{
            "fillArea": 6584.200807058389,
            "remainderArea": 0,
            "succeed": true,
            "fillVolume": 203845.38005984636,
            "message": null,
            "dataset": "cutfill@Jingjin",
            "cutArea": 6150486331.391543,
            "cutVolume": 1345394487658.8027,
            "status": null
          }`));
        });
        service.terrainCutFillCalculate(terrainCutFillCalculationParameters, (result) => {
            serviceResult = result;
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.dataset).toBe("cutfill@Jingjin");
                expect(serviceResult.result.fillArea).toBe(6584.200807058389);
                done();
            } catch (e) {
                console.log("'terrainCutFillCalculate'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});