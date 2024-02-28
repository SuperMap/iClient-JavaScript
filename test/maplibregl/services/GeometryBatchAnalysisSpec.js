import {SpatialAnalystService} from '../../../src/maplibregl/services/SpatialAnalystService';
import {GeometryBufferAnalystParameters} from '../../../src/common/iServer/GeometryBufferAnalystParameters';
import {GeometryOverlayAnalystParameters} from '../../../src/common/iServer/GeometryOverlayAnalystParameters';
import {BufferSetting} from '../../../src/common/iServer/BufferSetting';
import {BufferDistance} from '../../../src/common/iServer/BufferDistance';
import {BufferEndType} from '../../../src/common/REST';
import {OverlayOperationType} from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var serviceUrl = GlobeParameter.spatialAnalystURL;
describe('maplibregl_SpatialAnalystService_geometryBatchAnalysis', () => {
    var originalTimeout;
    var serviceResult;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('geometryBatchAnalysis', (done) => {
        //缓冲区分析参数
        var bufferLine = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [[117, 40.50], [118, 40]]
            }
        };
        var geoBufferAnalystParams = {
            analystName: "buffer",
            param: new GeometryBufferAnalystParameters({
                sourceGeometry: bufferLine,
                sourceGeometrySRID: 4326,
                bufferSetting: new BufferSetting({
                    endType: BufferEndType.ROUND,
                    leftDistance: new BufferDistance({value: 0.05}),
                    rightDistance: new BufferDistance({value: 0.05}),
                    semicircleLineSegment: 10
                })

            })
        };
        //叠加分析参数
        var sourceGeometry = {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[116, 39.75],
                    [116, 39.15],
                    [117, 39.15],
                    [117, 39.85],
                    [116, 39.85]]]
            }
        };
        var operateGeometry = {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[116.25, 40.5],
                    [116.25, 38.5],
                    [116.75, 38.5],
                    [116.75, 40.5],
                    [116.25, 40.5]]]
            }
        };
        var OverlayBatchAnalystParameters = {
            analystName: "overlay",
            param: new GeometryOverlayAnalystParameters({
                sourceGeometry: sourceGeometry,
                operateGeometry: operateGeometry,
                operation: OverlayOperationType.CLIP
            })
        };
        //批量分析参数
        var parameters = [geoBufferAnalystParams, OverlayBatchAnalystParameters];
        //批量分析
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(serviceUrl + "/geometry/batchanalyst?returnContent=true&ignoreAnalystParam=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].analystName).toBe("buffer");
            expect(paramsObj[0].param.analystParameter.endType).toBe("ROUND");
            expect(paramsObj[0].param.analystParameter.leftDistance.value).toEqual(0.05);
            expect(paramsObj[1].analystName).toBe("overlay");
            expect(paramsObj[1].param.operation).toBe("CLIP");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(geometryBatchAnalystEscapedJson)));
        });
        new SpatialAnalystService(serviceUrl).geometrybatchAnalysis(parameters, function (result) {
            serviceResult = result;
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.result.succeed).toEqual(true);
            expect(serviceResult.result.length).toEqual(1);
            for (var i = 0; i < serviceResult.result.length; i++) {
                expect(serviceResult.result[i].resultGeometry).not.toBeNull();
                expect(serviceResult.result[i].resultGeometry.geometry).not.toBeNull();
                expect(serviceResult.result[i].resultGeometry.geometry.coordinates.length).toBeGreaterThan(0);
                expect(serviceResult.result[i].resultGeometry.geometry.type).toBe("MultiPolygon");
                expect(serviceResult.result[i].resultGeometry.type).toBe("Feature");
                expect(serviceResult.result[i].succeed).toBe(true);
            }
            done();
        });
    });
});