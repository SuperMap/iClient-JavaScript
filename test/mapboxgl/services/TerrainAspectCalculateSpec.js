import {SpatialAnalystService} from '../../../src/mapboxgl/services/SpatialAnalystService';
import {TerrainAspectCalculationParameters} from '../../../src/common/iServer/TerrainAspectCalculationParameters';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';


var url = GlobeParameter.spatialAnalystURL;
var options = {

};
describe('mapboxgl_SpatialAnalystService_terrainAspectCalculate', () => {
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

    // 地形坡向
    it('terrainAspectCalculate', (done) => {
        var terrainAspectCalculationParameters = new TerrainAspectCalculationParameters({
            dataset: "JingjinTerrain@Jingjin",
            terrainAnalystSetting:{"boundsType":"UNION", "cellSizeType":"MAX"}, 
            resultDatasetName:"testResult", 
            deleteExistResultDataset:true
        });
        var service = new SpatialAnalystService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
          expect(method).toBe("POST");
          expect(testUrl).toBe(url + "/datasets/JingjinTerrain@Jingjin/terraincalculation/aspect?returnContent=true");
          var paramsObj = JSON.parse(params.replace(/'/g, "\""));
          expect(paramsObj.resultDatasetName).toBe("testResult");
          expect(paramsObj.deleteExistResultDataset).toBeTruthy();
          return Promise.resolve(new Response(`{
              "succeed": true,
              "recordset": null,
              "message": null,
              "dataset": "testResult@Jingjin",
              "status": null
          }`));
        });
        service.terrainAspectCalculate(terrainAspectCalculationParameters, (result) => {
            serviceResult = result;
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.dataset).toBe("testResult@Jingjin");
                done();
            } catch (e) {
                console.log("'terrainAspectCalculate'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});