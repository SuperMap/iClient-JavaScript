import Module from '../../../src/common/util/UGCWasmAll';
import { GeometryAnalysis } from '../../../src/common/util/GeometryAnalysis';

describe('GeometryAnalysis', () => {
  var instance;
  beforeAll(() => {
    instance = new GeometryAnalysis(Module);
  });
  it('buffer', () => {
    const result = instance.buffer(
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [20, 20]
        }
      },
      1
    );
    expect(result.type).toBe('Feature');
    expect(result.geometry.coordinates.length).not.toBe(0);
    expect(result.geometry.coordinates[0][0][0]).toBe(21);
  });

  it('computeConvexHull', () => {
    var points = [
      [117, 32],
      [120, 34],
      [120, 30]
    ];
    const result = instance.computeConvexHull(points, 3);
    expect(result.geometry.type).toBe('Polygon');
    expect(result.geometry.coordinates[0].length).toBe(4);
  });

  it('isIdentical', () => {
    const line1 = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [117, 29],
          [122, 32]
        ]
      }
    };
    const line2 = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [117, 29],
          [122, 32]
        ]
      }
    };
    const result = instance.isIdentical(line1, line2);
    expect(result).toBeTruthy();
  });

  it('hasIntersection', () => {
    const poly1 = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              69.05078125000003,
              64.94452997268957
            ],
            [
              69.05078125000003,
              52.72637398699237
            ],
            [
              90.14453124999983,
              52.72637398699237
            ],
            [
              90.14453124999983,
              64.94452997268957
            ],
            [
              69.05078125000003,
              64.94452997268957
            ]
          ]
        ],
        "type": "Polygon"
      },
      "id": 0
    };
    const poly2 = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              80.87563161140378,
              57.45030784568206
            ],
            [
              80.87563161140378,
              43.6194265865916
            ],
            [
              110.40688161140469,
              43.6194265865916
            ],
            [
              110.40688161140469,
              57.45030784568206
            ],
            [
              80.87563161140378,
              57.45030784568206
            ]
          ]
        ],
        "type": "Polygon"
      }
    };
    const result = instance.hasIntersection(poly1, poly2);
    expect(result).toBeTruthy();
  });


  it('isIdentical multilinestring', () => {
    const line1 = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [[
          [
            67.99609375000006,
            67.69489448648969
          ],
          [
            89.26562499999926,
            63.72666005814014
          ]
        ], [
          [
            57.80078124999906,
            65.82307382870485
          ],
          [
            93.1328124999992,
            59.201303359951794
          ]
        ]],
        "type": "MultiLineString"
      }
    };
    const line2 = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [[
          [
            67.99609375000006,
            67.69489448648969
          ],
          [
            89.26562499999926,
            63.72666005814014
          ]
        ], [
          [
            57.80078124999906,
            65.82307382870485
          ],
          [
            93.1328124999992,
            59.201303359951794
          ]
        ]],
        "type": "MultiLineString"
      }
    };
    const result = instance.isIdentical(line1, line2);
    expect(result).toBeTruthy();
  });

  it('hasTouch', () => {
    const polygon1 = {
      type: 'Feature',
      properties: {},
      geometry: {
        coordinates: [
          [
            [
              123,
              32.18254549015718
            ],
            [
              123,
              31.628614463736426
            ],
            [
              123.91806538776427,
              31.628614463736426
            ],
            [
              123.91806538776427,
              32.18254549015718
            ],
            [
              123,
              32.18254549015718
            ]
          ]
        ],
        type: 'Polygon'
      }
    };
    const polygon2 = {
      type: 'Feature',
      properties: {},
      geometry: {
        coordinates: [
          [
            [
              122,
              32.191063972668516
            ],
            [
              122,
              31.23452861936751
            ],
            [
              123,
              31.23452861936751
            ],
            [
              123,
              32.191063972668516
            ],
            [
              122,
              32.191063972668516
            ]
          ]
        ],
        type: 'Polygon'
      }
    };
    const result = instance.hasTouch(polygon1, polygon2);
    expect(result).toBeTruthy();
  });

  it('resample', () => {
    const geojson = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            124.26443338739216,
            33.87432013365262
          ],
          [
            122.2966615634117,
            33.67403285392291
          ],
          [
            122.63800973696033,
            32.20805502492
          ],
          [
            121.29269634709613,
            30.856060676530902
          ],
          [
            117.85913530729306,
            30.82157998325019
          ]
        ],
        "type": "LineString"
      }
    };
    const result = instance.resample(geojson);
    expect(result.geometry.coordinates.length).toBe(5);
    expect(result.geometry.type).toBe('LineString');
  });

  it('isParallel', () => {
    const result = instance.isParallel(58, 65, 78, 65, 58, 88, 78, 88);
    expect(result).toBeTruthy();
  });

  it('computePerpendicularPosition', () => {
    const result = instance.computePerpendicularPosition(111, 60, 140, 69, 140, 46);
    expect(result[0]).toBe(140);
    expect(result[1]).toBe(60);
  });

  it('isPointOnLine', () => {
    const result = instance.isPointOnLine(0, 0, -1, -1, 1, 1);
    expect(result).toBeTruthy();
  });

  it('isProjectOnLineSegment', () => {
    const result = instance.isProjectOnLineSegment(111, 35, 92, 39, 113, 39);
    expect(result).toBeTruthy();
  });

  it('distanceToLineSegment', () => {
    const res = instance.distanceToLineSegment(111, 35, 118, 41, 118, 27);
    expect(res).toBe(7);
  });

  it('distanceToLineSegment with unit and featureUnit', () => {
    const res = instance.distanceToLineSegment(123, 25, 120, 30, 125, 30);
    expect(res).toBe(5);

    const res1 = instance.distanceToLineSegment(123, 25, 120, 30, 125, 30, 'DEGREE', 'FOOT');
    expect(res1).toBe(1826107.13243559);

    const res2 = instance.distanceToLineSegment(123, 25, 120, 30, 125, 30, 'DEGREE', 'INCH');
    expect(res2).toBe(21913285.65997076);

    const res3 = instance.distanceToLineSegment(123, 25, 120, 30, 125, 30, 'DEGREE', 'KILOMETER');
    expect(res3).toBe(556.5974539663679);

    const res4 = instance.distanceToLineSegment(123, 25, 120, 30, 125, 30, 'DEGREE', 'METER');
    expect(res4).toBe(556597.4539663679);

    const res5 = instance.distanceToLineSegment(13692297.36757265, 2875744.624352243, 13358338.895192828, 3503549.8435043753, 13914936.349159198, 3503549.8435043753, 'METER', 'METER');
    expect(res5).toBe(627805.2191521325);
    const res6 = instance.distanceToLineSegment(13692297.36757265, 2875744.624352243, 13358338.895192828, 3503549.8435043753, 13914936.349159198, 3503549.8435043753, 'METER', 'KILOMETER');
    expect(res6).toBe(627.8052191521325);
  });

  

  it('nearestPointToVertex', () => {
    const result = instance.nearestPointToVertex(111, 35, {
      type: 'Feature',
      properties: {},
      geometry: {
        coordinates: [
          [118, 41],
          [117, 27]
        ],
        type: 'LineString'
      }
    });
    expect(result.length).toBe(2);
  });

  it('computeConcaveHullPoints', () => {
    const xArray = [118, 125, 123, 117];
    const yArray = [30, 31, 28, 32];
    const result = instance.computeConcaveHullPoints(xArray, yArray);
    expect(result.geometry.type).toBe('Polygon');
    expect(result.geometry.coordinates[0].length).toBe(5);
  });

  it('computeConcaveHullPoints pass different xArray param', () => {
    const xArray = [118, 125, 123, 117];
    const yArray = [30, 31, 28, 32];
    const result = instance.computeConcaveHullPoints(xArray, yArray);
    const datas1 = [[118, 30], [125, 31], [123, 28], [117, 32]];
    const result1 = instance.computeConcaveHullPoints(datas1);
    expect(result1.geometry.coordinates[0].length).toBe(5);
    expect(result.geometry.type).toBe('Polygon');
    expect(result.geometry.coordinates[0].length).toBe(5);
    const datas2 = [{
      x: 118,
      y: 30
    }, {
      x: 125,
      y: 31
    }, {
      x: 123,
      y: 28
    }, {
      x: 117,
      y: 32
    }];
    const result2 = instance.computeConcaveHullPoints(datas2);
    expect(result2.geometry.coordinates[0].length).toBe(5);
    const datas3 = [{ type: 'Feature', geometry: { coordinates: [118, 30] } },
    { type: 'Feature', geometry: { coordinates: [125, 31] } },
    { type: 'Feature', geometry: { coordinates: [123, 28] } },
    { type: 'Feature', geometry: { coordinates: [117, 32] } }];
    const result3 = instance.computeConcaveHullPoints(datas3);
    expect(result3.geometry.coordinates[0].length).toBe(5);
    const datas4 = { type: 'FeatureCollection', features: datas3 };
    const result4 = instance.computeConcaveHullPoints(datas4);
    expect(result4.geometry.coordinates[0].length).toBe(5);
  });

  it('isSegmentIntersect', () => {
    const result = instance.isSegmentIntersect(114, 38, 110, 31, 108, 37, 116, 32);
    expect(result).toBeTruthy();
  });

  it('isOnSameSide', () => {
    const result = instance.isOnSameSide(122, 30, 122, 32, 121, 33, 121, 29);
    expect(result).toBeTruthy();
  });

  it('isRight', () => {
    const result = instance.isRight(122, 30, 120, 20, 120, 40);
    expect(result).toBeTruthy();
  });

  it('isLeft', () => {
    const result = instance.isLeft(118, 40, 111, 43, 117, 27);
    expect(result).toBeTruthy();
  });

  it('smooth', () => {
    const line = {
      geometry: {
        type: 'LineString',
        coordinates: [
          [116.2937579415, 40.1347201433],
          [116.2937384459, 40.1350417526],
          [116.2937205469, 40.1353914866],
          [116.2936961073, 40.1357691248],
          [116.2936959914, 40.1359171585],
          [116.2936389424, 40.1362305353]
        ]
      },
      type: 'Feature'
    };
    const result = instance.smooth(line);
    expect(result.geometry.type).toBe('LineString');
    expect(result.geometry.coordinates.length).toBe(15);
    expect(result.geometry.coordinates[0][0]).toBe(116.2937579415);
    expect(result.geometry.coordinates[14][1]).toBe(40.1362305353);
  });

  it('smooth is wrong type', () => {
    try {
      const line = {
        geometry: {
          type: 'Point',
          coordinates: [
            [116.2937579415, 40.1347201433]
          ]
        },
        type: 'Feature'
      };
      instance.smooth(line);
    } catch (error) {
      expect(error.message).toBe('only feature type is LineString supported')
    }
  });

  it('smooth test coord valid', () => {
    try {
      const line = {
        geometry: {
          type: 'LineString',
          coordinates: [
            [190.2937579415, 40.1347201433],
            [190.2936959914, 40.1359171585],
            [190.2936389424, 40.1362305353]
          ]
        },
        type: 'Feature'
      };
      instance.smooth(line);
    } catch (error) {
      expect(error.message).toBe('coordinates is invalid latlng')
    }
  });

  it('computeParallel', () => {
    const result = instance.computeParallel(
      {
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [
            [120, 30],
            [125, 30]
          ],
          type: 'LineString'
        }
      },
      5
    );
    expect(result.geometry.coordinates[0][1]).toBe(35);
    expect(result.geometry.coordinates[1][1]).toBe(35);
  });

  it('computeParallel with unit and featureUnit', () => {
    const feature = {
      type: 'Feature',
      properties: {},
      geometry: {
        coordinates: [
          [120, 30],
          [125, 30]
        ],
        type: 'LineString'
      }
    };
    const result = instance.computeParallel(
      feature,
      5
    );
    expect(result.geometry.coordinates[0][1]).toBe(35);
    expect(result.geometry.coordinates[1][1]).toBe(35);

    const result1 = instance.computeParallel(
      feature,
      1640419.9475066,
      'DEGREE',
      'FOOT'
    );
    expect(result1.geometry.coordinates[0][1]).toBe(34.49157642059771);
    expect(result1.geometry.coordinates[1][1]).toBe(34.49157642059771);

    const result3 = instance.computeParallel(
      feature,
      19685039.370079,
      'DEGREE',
      'INCH'
    );
    expect(result3.geometry.coordinates[0][1]).toBe(34.4915764060973);
    expect(result3.geometry.coordinates[1][1]).toBe(34.4915764060973);

    const feature1 = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [13358.338895192828, 3503.5498435043753],
          [13914.936349159198, 3503.5498435043753]
        ]
      }
    }
    const result4 = instance.computeParallel(
      feature1,
      660.3313005599175,
      'KILOMETER',
      'KILOMETER'
    );
    expect(result4.geometry.coordinates[0][1]).toBe(4163.881144064293);
    expect(result4.geometry.coordinates[1][1]).toBe(4163.881144064293);
  });

  it('computeConvexHullPoints', () => {
    const xArray = [118, 125, 123, 117];
    const yArray = [30, 31, 28, 32];
    const result = instance.computeConvexHullPoints(xArray, yArray);
    expect(result.geometry.coordinates[0].length).toBe(5);
    const datas1 = [[118, 30], [125, 31], [123, 28], [117, 32]];
    const result1 = instance.computeConvexHullPoints(datas1);
    expect(result1.geometry.coordinates[0].length).toBe(5);
    const datas2 = [{
      x: 118,
      y: 30
    }, {
      x: 125,
      y: 31
    }, {
      x: 123,
      y: 28
    }, {
      x: 117,
      y: 32
    }]
    const result2 = instance.computeConvexHullPoints(datas2);
    expect(result2.geometry.coordinates[0].length).toBe(5);
    const datas3 = [{ type: 'Feature', geometry: { coordinates: [118, 30] } },
    { type: 'Feature', geometry: { coordinates: [125, 31] } },
    { type: 'Feature', geometry: { coordinates: [123, 28] } },
    { type: 'Feature', geometry: { coordinates: [117, 32] } }];
    const result3 = instance.computeConvexHullPoints(datas3);
    expect(result3.geometry.coordinates[0].length).toBe(5);
    const datas4 = { type: 'FeatureCollection', features: datas3 };
    const result4 = instance.computeConvexHullPoints(datas4);
    expect(result4.geometry.coordinates[0].length).toBe(5);
  });

  it('isIntersectRegionWithRect', () => {
    var polygon1 = {
      type: 'Feature',
      properties: {},
      geometry: {
        coordinates: [
          [
            [119.267912970807, 29.742649250075488],
            [119.267912970807, 28.929660206686734],
            [120.88700327552647, 28.929660206686734],
            [120.88700327552647, 29.742649250075488],
            [119.267912970807, 29.742649250075488]
          ]
        ],
        type: 'Polygon'
      }
    };
    var polygon2 = {
      type: 'Feature',
      properties: {},
      geometry: {
        coordinates: [
          [
            [121.21536332646303, 33.19979516422491],
            [121.21536332646303, 29.664917601179866],
            [123.33517321005525, 29.664917601179866],
            [123.33517321005525, 33.19979516422491],
            [121.21536332646303, 33.19979516422491]
          ]
        ],
        type: 'Polygon'
      }
    };
    const res1 = instance.isIntersectRegionWithRect(
      polygon1,
      118, 32, 122, 30
    );
    const res2 = instance.isIntersectRegionWithRect(
      polygon2,
      118, 32, 122, 30
    );
    expect(res1).toBeFalsy();
    expect(res2).toBeTruthy();
  });

  it('computeGeodesicArea', () => {
    var polygon = {
      type: 'Feature',
      properties: {},
      geometry: {
        coordinates: [
          [
            [121.74162512536924, 32.60736281118376],
            [120.59633803460247, 32.42386901254892],
            [119.76027845834045, 31.47151252648368],
            [120.36728061644811, 29.925467312116822],
            [121.6843607708318, 29.93539273511712],
            [122.37153302529236, 30.627700930765172],
            [123.15032824701461, 31.66667145093632],
            [122.77238350706119, 32.597714586070424],
            [121.74162512536924, 32.60736281118376]
          ]
        ],
        type: 'Polygon'
      }
    };
    const result = instance.computeGeodesicArea(polygon);
    expect(result).toBe(69379492599.1777);
  });

  it('computeGeodesicArea with unit', () => {
    var polygon = {
      type: 'Feature',
      properties: {},
      geometry: {
        coordinates: [
          [
            [121.74162512536924, 32.60736281118376],
            [120.59633803460247, 32.42386901254892],
            [119.76027845834045, 31.47151252648368],
            [120.36728061644811, 29.925467312116822],
            [121.6843607708318, 29.93539273511712],
            [122.37153302529236, 30.627700930765172],
            [123.15032824701461, 31.66667145093632],
            [122.77238350706119, 32.597714586070424],
            [121.74162512536924, 32.60736281118376]
          ]
        ],
        type: 'Polygon'
      }
    };
    const result = instance.computeGeodesicArea(polygon);
    expect(result).toBe(69379492599.1777);
  });

  it('computeGeodesicDistance', () => {
    var xArray = [120, 125];
    var yArray = [30, 30];
    var majorAxis = 6378137;
    var flatten = 0.0033528106647475;
    const result = instance.computeGeodesicDistance(xArray, yArray, majorAxis, flatten);
    expect(result).toBe(482393.11011638306);
  });

  it('computeGeodesicDistance with unit', () => {
    var xArray = [120, 125];
    var yArray = [30, 30];
    var majorAxis = 6378137;
    var flatten = 0.0033528106647475;
    const result = instance.computeGeodesicDistance(xArray, yArray, majorAxis, flatten);
    expect(result).toBe(482393.11011638306);
    const result1 = instance.computeGeodesicDistance(xArray, yArray, majorAxis, flatten, 'KILOMETER');
    expect(result1).toBe(482.39311011638307);
    const result2 = instance.computeGeodesicDistance(xArray, yArray, majorAxis, flatten, 'INCH');
    expect(result2).toBe(18991854.790303748);
    const result3 = instance.computeGeodesicDistance(xArray, yArray, majorAxis, flatten, 'FOOT');
    expect(result3).toBe(1582654.5607492882);
  });

  it('computeGeodesicDistance use different param and unit', () => {
    var xArray = [120, 125];
    var yArray = [30, 30];
    var majorAxis = 6378137;
    var flatten = 0.0033528106647475;
    const result = instance.computeGeodesicDistance(xArray, yArray, majorAxis, flatten);
    expect(result).toBe(482393.11011638306);

    var datas1 = [[120, 30], [125, 30]];
    const result1 = instance.computeGeodesicDistance(datas1, majorAxis, flatten);
    expect(result1).toBe(482393.11011638306);
    var datas2 = [{ x: 120, y: 30 }, { x: 125, y: 30 }];
    const result2 = instance.computeGeodesicDistance(datas2, majorAxis, flatten);
    expect(result2).toBe(482393.11011638306);
    var datas3 = [{
      type: 'Feature',
      geometry: {
        coordinates: [120, 30]
      }
    }, {
      type: 'Feature',
      geometry: {
        coordinates: [125, 30]
      }
    }];
    const result3 = instance.computeGeodesicDistance(datas3, majorAxis, flatten);
    expect(result3).toBe(482393.11011638306);
    var datas4 = {
      type: 'FeatureCollection',
      features: datas3
    };
    const result4 = instance.computeGeodesicDistance(datas4, majorAxis, flatten);
    expect(result4).toBe(482393.11011638306);
  });
});
