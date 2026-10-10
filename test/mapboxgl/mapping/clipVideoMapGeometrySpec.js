import {
  clipSegmentToRect,
  clipPolylineToRect,
  clipPolygonToRect,
  clipPolylineNearPlane,
  getImageClipRect,
  isInImageRect,
  transformVideoMapGeoJSON,
  CAMERA_Z_NEAR
} from '../../../src/mapboxgl/mapping/utils/clipVideoMapGeometry';

describe('clipVideoMapGeometry', () => {
  const rect = { minX: 0, minY: 0, maxX: 100, maxY: 100 };

  it('getImageClipRect should expand by margin', () => {
    const clipRect = getImageClipRect(1000, 500, 0.05);
    expect(clipRect.minX).toBe(-50);
    expect(clipRect.minY).toBe(-25);
    expect(clipRect.maxX).toBe(1050);
    expect(clipRect.maxY).toBe(525);
  });

  it('isInImageRect should detect inside and outside', () => {
    expect(isInImageRect([10, 10], rect)).toBe(true);
    expect(isInImageRect([-1, 10], rect)).toBe(false);
    expect(isInImageRect(null, rect)).toBe(false);
  });

  it('clipSegmentToRect should keep inner segment', () => {
    const clipped = clipSegmentToRect(-50, 50, 150, 50, rect);
    expect(clipped[0][0]).toBe(0);
    expect(clipped[1][0]).toBe(100);
    expect(clipped[0][1]).toBe(50);
  });

  it('clipSegmentToRect should drop fully outside segment', () => {
    expect(clipSegmentToRect(-10, -10, -1, -1, rect)).toBeNull();
  });

  it('clipPolylineToRect should split when leaving the rect', () => {
    const parts = clipPolylineToRect(
      [
        [10, 10],
        [90, 10],
        [200, 10],
        [200, 50],
        [50, 50]
      ],
      rect
    );
    expect(parts.length).toBe(2);
    expect(parts[0][0][0]).toBe(10);
    expect(parts[1][parts[1].length - 1][0]).toBe(50);
  });

  it('clipPolygonToRect should clip a square crossing the boundary', () => {
    const clipped = clipPolygonToRect(
      [
        [-20, -20],
        [120, -20],
        [120, 120],
        [-20, 120],
        [-20, -20]
      ],
      rect
    );
    expect(clipped.length).toBeGreaterThan(3);
    clipped.forEach((point) => {
      expect(point[0]).toBeGreaterThanOrEqual(0);
      expect(point[0]).toBeLessThanOrEqual(100);
      expect(point[1]).toBeGreaterThanOrEqual(0);
      expect(point[1]).toBeLessThanOrEqual(100);
    });
  });

  it('clipPolylineNearPlane should drop behind-camera points and insert intersection', () => {
    const projectFn = (camera) => [camera[0] / camera[2], camera[1] / camera[2]];
    const parts = clipPolylineNearPlane(
      [
        { camera: [0, 0, 10], uv: [0, 0] },
        { camera: [0, 0, -10], uv: null },
        { camera: [10, 0, 10], uv: [1, 0] }
      ],
      CAMERA_Z_NEAR,
      projectFn
    );
    expect(parts.length).toBe(2);
    expect(parts[0][parts[0].length - 1].camera[2]).toBe(CAMERA_Z_NEAR);
    expect(parts[1][0].camera[2]).toBe(CAMERA_Z_NEAR);
  });

  it('transformVideoMapGeoJSON should drop behind-camera points', () => {
    const videoMap = {
      videoWidth: 100,
      videoHeight: 100,
      originCoordsLeftTop: { lng: 0, lat: 1 },
      originCoordsRightBottom: { lng: 1, lat: 0 },
      coordTransfer: {
        toCameraCoordinate: (coord) => {
          if (coord[0] < 0) {
            return [0, 0, -1];
          }
          return [50, 50, 10];
        },
        projectCameraToVideo: (camera) => {
          if (!(camera[2] > CAMERA_Z_NEAR)) {
            return null;
          }
          return [50, 50];
        }
      }
    };
    const result = transformVideoMapGeoJSON(
      {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: { id: 1 },
            geometry: { type: 'Point', coordinates: [-1, 0] }
          },
          {
            type: 'Feature',
            properties: { id: 2 },
            geometry: { type: 'Point', coordinates: [1, 0] }
          }
        ]
      },
      videoMap
    );
    expect(result.features.length).toBe(1);
    expect(result.features[0].properties.id).toBe(2);
  });

  it('transformVideoMapGeoJSON should clip line to image rect', () => {
    const cameras = [
      [-50, 50, 10],
      [150, 50, 10]
    ];
    let index = 0;
    const videoMap = {
      videoWidth: 100,
      videoHeight: 100,
      originCoordsLeftTop: { lng: 0, lat: 1 },
      originCoordsRightBottom: { lng: 1, lat: 0 },
      coordTransfer: {
        toCameraCoordinate: () => cameras[index++],
        projectCameraToVideo: (camera) => [camera[0], camera[1]]
      }
    };
    const result = transformVideoMapGeoJSON(
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [0, 0],
            [1, 0]
          ]
        }
      },
      videoMap
    );
    expect(result.geometry.type).toBe('LineString');
    expect(result.geometry.coordinates.length).toBe(2);
    expect(result.geometry.coordinates[0][0]).toBeCloseTo(-0.05, 5);
    expect(result.geometry.coordinates[1][0]).toBeCloseTo(1.05, 5);
  });
});
