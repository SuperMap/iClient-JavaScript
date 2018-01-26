require('../../../src/common/iServer/GeometryBatchAnalystService');
var request = require('request');

var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;
var url = GlobeParameter.spatialAnalystURL;
var options = {
    eventListeners: {"processCompleted": analyzeCompleted, 'processFailed': analyzeFailed}
};

function initGeometryBatchAnalystService() {
    return new SuperMap.GeometryBatchAnalystService(url, options);
}

function analyzeFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

function analyzeCompleted(analyseEventArgs) {
    analystEventArgsSystem = analyseEventArgs;
}

describe("GeometryBatchAnalystServiceTest", function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        serviceFailedEventArgsSystem = null;
        analystEventArgsSystem = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('GeometryBatchAnalystService', function (done) {
        var geometryBatchAnalystService = initGeometryBatchAnalystService();
        //缓冲区分析参数：
        var bufferBatchAnalystParameter = {
            analystName: "buffer",
            param: new SuperMap.GeometryBufferAnalystParameters({
                sourceGeometry: new SuperMap.Geometry.Point(7884.79277012316, 5072.18865322196),
                bufferSetting: new SuperMap.BufferSetting({
                    endType: SuperMap.BufferEndType.ROUND,
                    leftDistance: new SuperMap.BufferDistance({value: 300}),
                    semicircleLineSegment: 5
                })
            })
        };
        //叠加分析参数：
        var points = [new SuperMap.Geometry.Point(47.9909960608, 382.4873382105),
            new SuperMap.Geometry.Point(47.9909960608, 437.8615644344),
            new SuperMap.Geometry.Point(170.3545301069, 437.8615644344),
            new SuperMap.Geometry.Point(170.3545301069, 382.4873382105)];
        var sourceGeometry = new SuperMap.Geometry.LineString(points);
        var points1 = [new SuperMap.Geometry.Point(111.4687675858, 353.8548114800),
            new SuperMap.Geometry.Point(111.4687675858, 408.1485649972),
            new SuperMap.Geometry.Point(208.9814293754, 408.1485649972),
            new SuperMap.Geometry.Point(208.9814293754, 353.8548114800)];
        var operateGeometry = new SuperMap.Geometry.Polygon(new SuperMap.Geometry.LinearRing(points1));

        var OverlayBatchAnalystParameters = {
            analystName: "overlay",
            param: new SuperMap.GeometryOverlayAnalystParameters({
                sourceGeometry: sourceGeometry,
                operateGeometry: operateGeometry,
                operation: SuperMap.OverlayOperationType.CLIP
            })
        };

        //表面分析参数
        var surfaceAnalystParameters = new SuperMap.SurfaceAnalystParametersSetting({
            datumValue: -3,
            interval: 0.5,
            resampleTolerance: 0.7,
            smoothMethod: SuperMap.SmoothMethod.BSPLINE,
            smoothness: 3
        });
        var GeometrySurfaceAnalystParameters = {
            analystName: "isoline",
            param: new SuperMap.GeometrySurfaceAnalystParameters({
                extractParameter: surfaceAnalystParameters,
                points: [new SuperMap.Geometry.Point(-4000, 2000),
                    new SuperMap.Geometry.Point(-4500, 2000),
                    new SuperMap.Geometry.Point(-3000, 3000),
                    new SuperMap.Geometry.Point(-3000, 2000),
                    new SuperMap.Geometry.Point(-2500, 2500),
                    new SuperMap.Geometry.Point(-2000, 2000),
                    new SuperMap.Geometry.Point(-2000, 3000),
                    new SuperMap.Geometry.Point(-2000, 2000),
                    new SuperMap.Geometry.Point(2000, 4000),
                    new SuperMap.Geometry.Point(0, 0)
                ],
                resolution: 3000,
                zValues: [-3, -2, 0, -1, -3, 0, 1, 0, 1, 1],
                surfaceAnalystMethod: SuperMap.SurfaceAnalystMethod.ISOLINE,
                resultSetting: new SuperMap.DataReturnOption({
                    expectCount: 1
                })
            })
        };

        //插值分析：
        var interpolationIDWAnalystParameters = {
            analystName: "interpolationidw",
            param: new SuperMap.InterpolationIDWAnalystParameters({
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

        var geometryBatchAnalystParameters = [bufferBatchAnalystParameter, OverlayBatchAnalystParameters, GeometrySurfaceAnalystParameters, interpolationIDWAnalystParameters];
        geometryBatchAnalystService.processAsync(geometryBatchAnalystParameters);

        setTimeout(function () {
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