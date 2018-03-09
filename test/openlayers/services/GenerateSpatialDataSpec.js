import request from 'request';
import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {GenerateSpatialDataParameters} from '../../../src/common/iServer/GenerateSpatialDataParameters';
import {DataReturnOption} from '../../../src/common/iServer/DataReturnOption';
import {DataReturnMode} from '../../../src/common/REST';

var originalTimeout, serviceResults;
var changchunServiceUrl = GlobeParameter.spatialAnalystURL_Changchun;
describe('openlayers_SpatialAnalystService_generateSpatialData', () => {
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var resultDataset = "GenerateSpatialData_openlayersTest";
    it('generateSpatialData', (done) => {
        var generateSpatialDataParameters = new GenerateSpatialDataParameters({
            routeTable: "RouteDT_road@Changchun",
            routeIDField: "RouteID",
            eventTable: "LinearEventTabDT@Changchun",
            eventRouteIDField: "RouteID",
            measureField: "",
            measureStartField: "LineMeasureFrom",
            measureEndField: "LineMeasureTo",
            measureOffsetField: "",
            errorInfoField: "",
            dataReturnOption: new DataReturnOption({
                expectCount: 1000,
                dataset: resultDataset,
                deleteExistResultDataset: true,
                dataReturnMode: DataReturnMode.DATASET_ONLY
            })
        });
        var spatialAnalystService = new SpatialAnalystService(changchunServiceUrl);
        spatialAnalystService.generateSpatialData(generateSpatialDataParameters, (serviceResult) => {
            serviceResults = serviceResult;
        });
        setTimeout(() => {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        }, 8000);
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', (done) => {
        var testResult = GlobeParameter.datachangchunURL + resultDataset;
        request.delete(testResult);
        done();
    });
});