import request from 'request';
import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {DensityKernelAnalystParameters} from '../../../src/common/iServer/DensityKernelAnalystParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var originalTimeout, serviceResults;
var changchunServiceUrl = GlobeParameter.spatialAnalystURL_Changchun;
describe('openlayers_SpatialAnalystService_densityAnalysis', () => {
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var resultDataset = "KernelDensity_openlayersTest";
    //点密度分析
    it('densityAnalysis', (done) => {
        var densityAnalystParameters = new DensityKernelAnalystParameters({
            dataset: "Railway@Changchun",
            bounds: [3800, -3800, 8200, -2200],
            fieldName: "SmLength",
            searchRadius: 50,
            resultGridName: resultDataset,
            deleteExistResultDataset: true
        });
        var spatialAnalystService = new SpatialAnalystService(changchunServiceUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(changchunServiceUrl + "/datasets/Railway@Changchun/densityanalyst/kernel?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.fieldName).toBe("SmLength");
            expect(paramsObj.resultGridName).toBe("KernelDensity_openlayersTest");
            expect(paramsObj.searchRadius).toEqual(50);
            expect(options).not.toBeNull();
            var resultJson=`{"succeed":true,"recordset":null,"message":null,"dataset":"KernelDensity_openlayersTest@Changchun"}`;
            return Promise.resolve(new Response(resultJson));
        });
        spatialAnalystService.densityAnalysis(densityAnalystParameters, (serviceResult) => {
            serviceResults = serviceResult;
            try {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            expect(serviceResults.result.dataset).toEqual(resultDataset+"@Changchun");
                done();
            } catch (exception) {
                console.log("'densityAnalysis'案例失败" + exception.name + ":" + exception.message);
                spatialAnalystService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        });
    });

});