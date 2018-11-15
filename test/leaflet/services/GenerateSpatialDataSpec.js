import {spatialAnalystService} from '../../../src/leaflet/services/SpatialAnalystService';
import {GenerateSpatialDataParameters} from '../../../src/common/iServer/GenerateSpatialDataParameters';
import {DataReturnOption} from '../../../src/common/iServer/DataReturnOption';
import {DataReturnMode} from '../../../src/common/REST';
import request from 'request';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var spatialAnalystURL = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    serverType: 'iServer'
};

describe('leaflet_SpatialAnalystService_generateSpatialData', () => {
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

    var resultDataset = "GenerateSpatialData_leafletTest";
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
        var generateSpatialDataService = spatialAnalystService(spatialAnalystURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/datasets/RouteDT_road@Changchun/linearreferencing/generatespatialdata.json?returnContent=true");
            expect(params).toContain("'eventRouteIDField':\"RouteID\"");
            expect(options).not.toBeNull();
            var resultJSON = `{"succeed":true,"recordset":null,"message":null,"dataset":"GenerateSpatialData_leafletTest@Changchun"}`;
            return Promise.resolve(new Response(resultJSON));
        });
        generateSpatialDataService.generateSpatialData(generateSpatialDataParameters, (result) => {
            serviceResult = result;

        });
        setTimeout(() => {
            try {
                expect(generateSpatialDataService).not.toBeNull();
                expect(generateSpatialDataService.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.dataset).toEqual(resultDataset + "@Changchun");
                generateSpatialDataService.destroy();
                done();
            } catch (exception) {
                console.log("'generateSpatialData_test'案例失败" + exception.name + ":" + exception.message);
                generateSpatialDataService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});