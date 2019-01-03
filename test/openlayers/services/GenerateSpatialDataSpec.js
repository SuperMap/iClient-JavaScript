import request from 'request';
import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {GenerateSpatialDataParameters} from '../../../src/common/iServer/GenerateSpatialDataParameters';
import {DataReturnOption} from '../../../src/common/iServer/DataReturnOption';
import {DataReturnMode} from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(changchunServiceUrl + "/datasets/RouteDT_road@Changchun/linearreferencing/generatespatialdata.json?returnContent=true");
            expect(params).not.toBeNull();
            expect(params).toContain("'routeIDField':\"RouteID\"");
            expect(options).not.toBeNull();
            var resultJSON = `{"succeed":true,"recordset":null,"message":null,"dataset":"GenerateSpatialData_openlayersTest@Changchun"}`;
            return Promise.resolve(new Response(resultJSON));
        });
        spatialAnalystService.generateSpatialData(generateSpatialDataParameters, (serviceResult) => {
            serviceResults = serviceResult;
        });
        setTimeout(() => {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.succeed).toBeTruthy();
            expect(serviceResults.result.dataset).not.toBeNull();
            expect(serviceResults.result.dataset).toEqual(resultDataset + "@Changchun");
            done();
        }, 8000);
    });

});