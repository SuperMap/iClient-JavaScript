import {spatialAnalystService} from '../../../src/leaflet/services/SpatialAnalystService';
import {GeometryBufferAnalystParameters} from '../../../src/common/iServer/GeometryBufferAnalystParameters';
import {DatasetBufferAnalystParameters} from '../../../src/common/iServer/DatasetBufferAnalystParameters';
import {BufferSetting} from '../../../src/common/iServer/BufferSetting';
import {BufferDistance} from '../../../src/common/iServer/BufferDistance';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {DataReturnOption} from '../../../src/common/iServer/DataReturnOption';
import {BufferEndType} from '../../../src/common/REST';
import {DataReturnMode} from '../../../src/common/REST';
import request from 'request';

var spatialAnalystURL = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    serverType: 'iServer'
};

describe('leaflet_SpatialAnalystService_bufferAnalysis', () => {
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

    it('bufferAnalysis_byGeometry', (done) => {
        var pointsList = [
            [-4690.000, 2823.940],
            [-4690.301, 3448.940],
            [-3810.125, 3816.561],
            [-3609.158, 3917.383],
            [-3490.291, 3976.983],
            [-4377.027, 4020.004],
            [-4382.939, 4076.265],
            [-4382.333, 4215.049],
            [-4382.285, 4428.156],
            [-4383.017, 4647.579],
            [-4382.898, 4679.707],
            [-4382.635, 4917.462],
            [-4381.833, 5074.019],
            [-4381.031, 5257.042],
            [-4380.717, 5363.785],
            [-4378.794, 5671.717],
            [-4377.970, 5847.521],
            [-4303.528, 5990.637],
            [-4270.072, 6055.343],
            [-4382.389, 6168.913],
            [-4209.927, 6214.183],
            [-4209.142, 6377.789],
            [-4210.142, 6393.692],
            [-4207.450, 6693.989],
            [-4208.450, 6788.392],
            [-4207.210, 6984.304],
            [-4208.296, 7189.183],
            [-4208.296, 7300.505],
            [-4208.803, 7573.056],
            [-4208.804, 7680.977],
            [-4208.393, 7850.593],
            [-4210.533, 8182.656],
            [-4261.485, 8554.893]
        ];
        var roadLine = L.polyline(pointsList, {color: 'red'});
        var geoBufferAnalystParams = new GeometryBufferAnalystParameters({
            sourceGeometry: roadLine,
            bufferSetting: new BufferSetting({
                endType: BufferEndType.ROUND,
                leftDistance: new BufferDistance({value: 250}),
                rightDistance: new BufferDistance({value: 250}),
                semicircleLineSegment: 10
            })
        });
        var bufferAnalystService = spatialAnalystService(spatialAnalystURL, options);
        bufferAnalystService.bufferAnalysis(geoBufferAnalystParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(bufferAnalystService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBe(true);
                var resultGeometry = serviceResult.result.resultGeometry;
                expect(resultGeometry.type).toBe("Feature");
                expect(resultGeometry.geometry).not.toBeNull();
                expect(resultGeometry.geometry.type).toEqual("MultiPolygon");
                var coordinates = resultGeometry.geometry.coordinates;
                expect(coordinates).not.toBeNull();
                expect(coordinates.length).toBeGreaterThan(0);
                for (var i = 0; i < coordinates[0][0].length; i++) {
                    expect(coordinates[0][0][i].length).toEqual(2);
                }
                bufferAnalystService.destroy();
                done();
            } catch (exception) {
                console.log("'bufferAnalysis_byGeometry'案例失败" + exception.name + ":" + exception.message);
                bufferAnalystService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    var resultDataset = "bufferAnalystByDatasets_leafletTest";
    it('bufferAnalysis_byDatasets', (done) => {
        var dsBufferAnalystParameters = new DatasetBufferAnalystParameters({
            dataset: "RoadLine2@Changchun",
            filterQueryParameter: new FilterParameter({
                attributeFilter: "NAME='团结路'"
            }),
            bufferSetting: new BufferSetting({
                endType: BufferEndType.ROUND,
                leftDistance: {value: 10},
                rightDistance: {value: 10},
                semicircleLineSegment: 10
            }),
            resultSetting: new DataReturnOption({
                expectCount: 2000,
                dataset: resultDataset,
                dataReturnMode: DataReturnMode.DATASET_ONLY,
                deleteExistResultDataset: true
            })
        });
        var bufferAnalystService = spatialAnalystService(spatialAnalystURL);
        bufferAnalystService.bufferAnalysis(dsBufferAnalystParameters, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toBe('processCompleted');
            expect(serviceResult.result.succeed).toBeTruthy();
            expect(serviceResult.result.dataset).toEqual(resultDataset + "@Changchun");
            done();
        }, 5000);
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', (done) => {
        var testResult = GlobeParameter.datachangchunURL + resultDataset;
        request.delete(testResult);
        done();
    });
});