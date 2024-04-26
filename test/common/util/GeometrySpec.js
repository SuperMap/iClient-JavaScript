import Module from '../../../src/common/util/UGCWasmAll';
import { GeometryAnalysis } from '../../../src/common/util/Geometry';

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
    expect(result.find).toBeTruthy();
    expect(result.values.length).toBe(2);
  });

  it('computeConcaveHullPoints', () => {
    const xArray = [118, 125, 123, 117];
    const yArray = [30, 31, 28, 32];
    const result = instance.computeConcaveHullPoints(xArray, yArray);
    expect(result.geometry.type).toBe('Polygon');
    expect(result.geometry.coordinates[0].length).toBe(5);
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

  it('computeConvexHullPoints', () => {
    const xArray = [118, 125, 123, 117];
    const yArray = [30, 31, 28, 32];
    const result = instance.computeConvexHullPoints(xArray, yArray);
    expect(result.geometry.coordinates[0].length).toBe(5);
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
    const result = instance.computeGeodesicArea(polygon, 4326);
    expect(result).toBe(6.578677712850164);
  });
  
  it('computeGeodesicDistance', () => {
    var xArray = [120, 125];
    var yArray = [30, 30];
    var majorAxis = 6378137;
    var flatten = 0.0033528106647475;
    const result = instance.computeGeodesicDistance(xArray, yArray, majorAxis, flatten);
    expect(result).toBe(482393.11011638306);
  });
});
