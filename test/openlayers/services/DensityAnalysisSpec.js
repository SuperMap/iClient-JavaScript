import request from 'request';
import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {DensityKernelAnalystParameters} from '../../../src/common/iServer/DensityKernelAnalystParameters';
import {FetchRequest} from "@supermap/iclient-common";

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
            expect(testUrl).toBe(changchunServiceUrl + "/datasets/Railway@Changchun/densityanalyst/kernel.json?returnContent=true");
            var expectParams = `{'bounds':{'left':3800,'bottom':-3800,'right':8200,'top':-2200,'centerLonLat':null},'fieldName':"SmLength",'resultGridDatasetResolution':null,'searchRadius':50,'targetDatasource':null,'resultGridName':"KernelDensity_openlayersTest",'deleteExistResultDataset':true}`;
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var resultJson=`{"succeed":true,"recordset":null,"message":null,"dataset":"KernelDensity_openlayersTest@Changchun"}`;
            return Promise.resolve(new Response(resultJson));
        });
        spatialAnalystService.densityAnalysis(densityAnalystParameters, (serviceResult) => {
            serviceResults = serviceResult;
        });
        setTimeout(() => {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            expect(serviceResults.result.dataset).toEqual(resultDataset+"@Changchun");
            done();
        }, 8000);
    });

});