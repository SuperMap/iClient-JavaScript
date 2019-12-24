import request from 'request';
import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {DatasetBufferAnalystParameters} from '../../../src/common/iServer/DatasetBufferAnalystParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {BufferSetting} from '../../../src/common/iServer/BufferSetting';
import {DataReturnOption} from '../../../src/common/iServer/DataReturnOption';
import {GeometryBufferAnalystParameters} from '../../../src/common/iServer/GeometryBufferAnalystParameters';
import {BufferDistance} from '../../../src/common/iServer/BufferDistance';
import {BufferEndType} from '../../../src/common/REST';
import {DataReturnMode} from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

import LineString from 'ol/geom/LineString';

var originalTimeout, serviceResult;
var changchunServiceUrl = GlobeParameter.spatialAnalystURL_Changchun;

describe('openlayers_SpatialAnalystService_bufferAnalysis', () => {
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var resultDataset = "BufferAnalystByDatasets_olTest";
    //缓冲区分析
    it('bufferAnalysis_byDataset_DATASET_ONLY', (done) => {
        var dsBufferAnalystParameters = new DatasetBufferAnalystParameters({
            dataset: "RoadLine2@Changchun",
            filterQueryParameter: new FilterParameter({
                attributeFilter: 'NAME="团结路"'
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
        var spatialAnalystService = new SpatialAnalystService(changchunServiceUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(changchunServiceUrl + "/datasets/RoadLine2@Changchun/buffer.json?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.bufferAnalystParameter.endType).toBe("ROUND");
            expect(paramsObj.bufferAnalystParameter.leftDistance.value).toEqual(10);
            expect(paramsObj.dataReturnOption.expectCount).toEqual(2000);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true,"recordset":null,"message":null,"dataset":"BufferAnalystByDatasets_olTest@Changchun"}`));
        });
        spatialAnalystService.bufferAnalysis(dsBufferAnalystParameters, (result) => {
            serviceResult = result;
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toBe('processCompleted');
            expect(serviceResult.result.succeed).toBeTruthy();
            expect(serviceResult.result.dataset).toEqual(resultDataset + "@Changchun");
            done();
        });
    });

    //缓冲区分析
    it('bufferAnalysis_byDataset_RECORDSET_ONLY', (done) => {
        var dsBufferAnalystParameters = new DatasetBufferAnalystParameters({
            dataset: "RoadLine2@Changchun",
            filterQueryParameter: new FilterParameter({
                attributeFilter: 'NAME="团结路"'
            }),
            bufferSetting: new BufferSetting({
                endType: BufferEndType.ROUND,
                leftDistance: {value: 10},
                rightDistance: {value: 10},
                semicircleLineSegment: 10
            })
        });
        var spatialAnalystService = new SpatialAnalystService(changchunServiceUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(changchunServiceUrl + "/datasets/RoadLine2@Changchun/buffer.json?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.bufferAnalystParameter.endType).toBe("ROUND");
            expect(paramsObj.bufferAnalystParameter.leftDistance.value).toEqual(10);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(bufferAnalysis_byDatasetResultJson)));
        });
        spatialAnalystService.bufferAnalysis(dsBufferAnalystParameters, (result) => {
            serviceResult = result;
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toBe('processCompleted');
            expect(serviceResult.result.recordset.features).not.toBeNull();
            done();
        });
    });

    it('bufferAnalysis_byGeometry', (done) => {
        var pointsList = [
            [2823.940, -4690.000],
            [3448.940, -4690.301],
            [3816.561, -3810.125],
            [3917.383, -3609.158],
            [3976.983, -3490.291],
            [4020.004, -4377.027],
            [4076.265, -4382.939],
            [4215.049, -4382.333],
            [4428.156, -4382.285],
            [4647.579, -4383.017],
            [4679.707, -4382.898],
            [4917.462, -4382.635],
            [5074.019, -4381.833],
            [5257.042, -4381.031],
            [5363.785, -4380.717],
            [5671.717, -4378.794],
            [5847.521, -4377.970],
            [5990.637, -4303.528],
            [6055.343, -4270.072],
            [6168.913, -4382.389],
            [6214.183, -4209.927],
            [6377.789, -4209.142],
            [6393.692, -4210.142],
            [6693.989, -4207.450],
            [6788.392, -4208.450],
            [6984.304, -4207.210],
            [7189.183, -4208.296],
            [7300.505, -4208.296],
            [7573.056, -4208.803],
            [7680.977, -4208.804],
            [7850.593, -4208.393],
            [8182.656, -4210.533],
            [8554.893, -4261.485]
        ];
        var roadLine = new LineString(pointsList);
        var geoBufferAnalystParams = new GeometryBufferAnalystParameters({
            sourceGeometry: roadLine,
            bufferSetting: new BufferSetting({
                endType: BufferEndType.ROUND,
                leftDistance: new BufferDistance({value: 250}),
                rightDistance: new BufferDistance({value: 250}),
                semicircleLineSegment: 10
            })
        });
        var bufferAnalystService = new SpatialAnalystService(changchunServiceUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(changchunServiceUrl + "/geometry/buffer.json?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.analystParameter.endType).toBe("ROUND");
            expect(paramsObj.analystParameter.leftDistance.value).toEqual(250);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(bufferAnalysis_byGeometryResultJson)));
        });
        bufferAnalystService.bufferAnalysis(geoBufferAnalystParams, (result) => {
            serviceResult = result;
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
                done();
            } catch (exception) {
                console.log("'bufferAnalysis_byGeometry'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});