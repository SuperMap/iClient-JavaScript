import {SpatialAnalystService} from '../../../src/mapboxgl/services/SpatialAnalystService';
import {GenerateSpatialDataParameters} from '../../../src/common/iServer/GenerateSpatialDataParameters';
import {DataReturnOption} from '../../../src/common/iServer/DataReturnOption';
import {DataReturnMode} from '../../../src/common/REST';
import request from 'request';

var url = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    serverType: 'iServer'
};
describe('mapboxgl_SpatialAnalystService_generateSpatialData', () => {
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

    var resultDataset = "GenerateSpatialData_mapboxglTest";
    //动态分段分析
    it('generateSpatialData', (done) => {
        var generateSpatialDataParameters = new GenerateSpatialDataParameters({
            routeTable: "RouteDT_road@Changchun",
            routeIDField: "RouteID",
            eventTable: "LinearEventTabDT@Changchun",
            eventRouteIDField: "RouteID",
            //用于生成空间数据的事件表的刻度字段，只有当事件为点事件的时候该属性才有意义
            measureField: "",
            measureStartField: "LineMeasureFrom", //只有当事件为线事件的时候该属性才有意义
            measureEndField: "LineMeasureTo",  //只有当事件为线事件的时候该属性才有意义
            measureOffsetField: "",
            errorInfoField: "",
            dataReturnOption: new DataReturnOption({
                expectCount: 1000,
                dataset: resultDataset,
                deleteExistResultDataset: true,
                dataReturnMode: DataReturnMode.DATASET_ONLY
            })
        });
        var service = new SpatialAnalystService(url, options);
        service.generateSpatialData(generateSpatialDataParameters, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.dataset).toEqual(resultDataset + "@Changchun");
                done();
            } catch (e) {
                console.log("'generateSpatialData'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', (done) => {
        var testResult = GlobeParameter.datachangchunURL + resultDataset;
        request.delete(testResult);
        done();
    });
});