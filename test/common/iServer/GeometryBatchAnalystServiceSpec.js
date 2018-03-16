import {GeometryBatchAnalystService} from '../../../src/common/iServer/GeometryBatchAnalystService';
import {GeometryBufferAnalystParameters} from '../../../src/common/iServer/GeometryBufferAnalystParameters';
import {GeometryOverlayAnalystParameters} from '../../../src/common/iServer/GeometryOverlayAnalystParameters';
import {GeometrySurfaceAnalystParameters} from '../../../src/common/iServer/GeometrySurfaceAnalystParameters';
import {InterpolationIDWAnalystParameters} from '../../../src/common/iServer/InterpolationIDWAnalystParameters';
import {SurfaceAnalystParametersSetting} from '../../../src/common/iServer/SurfaceAnalystParametersSetting';
import {BufferSetting} from '../../../src/common/iServer/BufferSetting';
import {BufferDistance} from '../../../src/common/iServer/BufferDistance';
import {DataReturnOption} from '../../../src/common/iServer/DataReturnOption';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {LineString} from '../../../src/common/commontypes/geometry/LineString';
import {LinearRing} from '../../../src/common/commontypes/geometry/LinearRing';
import {Polygon} from '../../../src/common/commontypes/geometry/Polygon';
import {BufferEndType} from '../../../src/common/REST';
import {OverlayOperationType} from '../../../src/common/REST';
import {SmoothMethod} from '../../../src/common/REST';
import {SurfaceAnalystMethod} from '../../../src/common/REST';

var url = GlobeParameter.spatialAnalystURL;
var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;
var initGeometryBatchAnalystService = () => {
    return new GeometryBatchAnalystService(url, options);
};
var analyzeFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var analyzeCompleted = (analyseEventArgs) => {
    analystEventArgsSystem = analyseEventArgs;
};
var options = {
    eventListeners: {"processCompleted": analyzeCompleted, 'processFailed': analyzeFailed}
};

describe("GeometryBatchAnalystService", () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        serviceFailedEventArgsSystem = null;
        analystEventArgsSystem = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('GeometryBatchAnalystService', (done) => {
        var geometryBatchAnalystService = initGeometryBatchAnalystService();
        //缓冲区分析参数：
        var bufferBatchAnalystParameter = {
            analystName: "buffer",
            param: new GeometryBufferAnalystParameters({
                sourceGeometry: new Point(7884.79277012316, 5072.18865322196),
                bufferSetting: new BufferSetting({
                    endType: BufferEndType.ROUND,
                    leftDistance: new BufferDistance({value: 300}),
                    semicircleLineSegment: 5
                })
            })
        };
        //叠加分析参数：
        var points = [new Point(47.9909960608, 382.4873382105),
            new Point(47.9909960608, 437.8615644344),
            new Point(170.3545301069, 437.8615644344),
            new Point(170.3545301069, 382.4873382105)];
        var sourceGeometry = new LineString(points);
        var points1 = [new Point(111.4687675858, 353.8548114800),
            new Point(111.4687675858, 408.1485649972),
            new Point(208.9814293754, 408.1485649972),
            new Point(208.9814293754, 353.8548114800)];
        var operateGeometry = new Polygon(new LinearRing(points1));

        var OverlayBatchAnalystParameters = {
            analystName: "overlay",
            param: new GeometryOverlayAnalystParameters({
                sourceGeometry: sourceGeometry,
                operateGeometry: operateGeometry,
                operation: OverlayOperationType.CLIP
            })
        };

        //表面分析参数
        var surfaceAnalystParameters = new SurfaceAnalystParametersSetting({
            datumValue: -3,
            interval: 0.5,
            resampleTolerance: 0.7,
            smoothMethod: SmoothMethod.BSPLINE,
            smoothness: 3
        });
        var geometrySurfaceAnalystParams = {
            analystName: "isoline",
            param: new GeometrySurfaceAnalystParameters({
                extractParameter: surfaceAnalystParameters,
                points: [new Point(-4000, 2000),
                    new Point(-4500, 2000),
                    new Point(-3000, 3000),
                    new Point(-3000, 2000),
                    new Point(-2500, 2500),
                    new Point(-2000, 2000),
                    new Point(-2000, 3000),
                    new Point(-2000, 2000),
                    new Point(2000, 4000),
                    new Point(0, 0)
                ],
                resolution: 3000,
                zValues: [-3, -2, 0, -1, -3, 0, 1, 0, 1, 1],
                surfaceAnalystMethod: SurfaceAnalystMethod.ISOLINE,
                resultSetting: new DataReturnOption({
                    expectCount: 1
                })
            })
        };

        //插值分析：
        var interpolationIDWAnalystParams = {
            analystName: "interpolationidw",
            param: new InterpolationIDWAnalystParameters({
                InterpolationAnalystType: "geometry",
                power: 2,
                searchMode: "KDTREE_FIXED_RADIUS",
                searchRadius: 0,
                expectedCount: 12,
                pixelFormat: "BIT16",
                zValueScale: 1,
                resolution: 3000,
                outputDatasetName: "Interpolation_IDWByGeo_commonTest",
                inputPoints: [{"z": -3, "y": 5846399.011754164, "x": 1210581.346513096},
                    {"z": -2, "y": 5806144.683668519, "x": 1374568.1968855715},
                    {"z": 0, "y": 5770737.831291649, "x": 1521370.8530005363},
                    {"z": -1, "y": 5528199.929583105, "x": 1095631.459772168},
                    {"z": -3, "y": 5570741.490646067, "x": 1198626.2178598372}]
            })
        };

        //路由分析参数
        /*var RouteCalculateMeasureParameters = {
            analystName: "calculatemeasure",
            param: new SuperMap.RouteCalculateMeasureParameters({
                "sourceRoute": {
                    "type": "LINEM",
                    "parts": [4],
                    "points": [
                        {
                            "measure": 0,
                            "y": -6674.466867067764,
                            "x": 3817.3527876130133
                        },
                        {
                            "measure": 199.57954019411724,
                            "y": -6670.830929417594,
                            "x": 3617.806369901496
                        },
                        {
                            "measure": 609.3656478634477,
                            "y": -6877.837541432356,
                            "x": 3264.1498746678444
                        },
                        {
                            "measure": 936.0174126282958,
                            "y": -7038.687780615184,
                            "x": 2979.846206068903
                        }
                    ]
                },
                "tolerance": 1,
                "point": {
                    "x": 3330.7754269417,
                    "y": -6838.8394457216
                },
                "isIgnoreGap": false
            })
        };*/

        var geometryBatchAnalystParameters = [bufferBatchAnalystParameter, OverlayBatchAnalystParameters, geometrySurfaceAnalystParams, interpolationIDWAnalystParams];
        geometryBatchAnalystService.processAsync(geometryBatchAnalystParameters);

        setTimeout(() => {
            try {
                var bfMode = analystEventArgsSystem.result;
                expect(bfMode).not.toBeNull();
                expect(bfMode.length).toEqual(4);
                expect(bfMode[0].succeed).toBeTruthy();
                expect(bfMode[1].succeed).toBeTruthy();
                expect(bfMode[2].succeed).toBeTruthy();
                expect(bfMode[3].succeed).toBeTruthy();
                expect(bfMode[1].resultGeometry.type).toEqual("Feature");
                expect(bfMode[1].resultGeometry.geometry).not.toBeNull();
                geometryBatchAnalystService.destroy();
                expect(geometryBatchAnalystService.events).toBeNull();
                expect(geometryBatchAnalystService.eventListeners).toBeNull();
                done();
            } catch (ex) {
                expect(false).toBeTruthy();
                console.log("GeometryBatchAnalystService_Test" + ex.name + ":" + ex.message);
                geometryBatchAnalystService.destroy();
                done();
            }
        }, 4000)
    });
});