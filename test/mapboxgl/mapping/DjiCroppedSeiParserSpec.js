import proj4 from 'proj4';
import { parseSeiSample } from '../../../src/mapboxgl/mapping/utils/seiParser';

describe('parseSeiSample with cropped DJI SEI payload', () => {
  const sampleData = {
    centerX: 960,
    centerY: 540,
    fovX: 67.44,
    fovY: 53.13,
    cameraX: 13498549.600656215,
    cameraY: 3676577.9125460796,
    cameraZ: 103.4,
    cameraPitch: -75,
    cameraRoll: 0,
    cameraYaw: -90.16259361979553,
    extent: [
      { x: 13498679.456690367, y: 3676587.5711281034 },
      { x: 13498678.714544091, y: 3676559.9426781237 },
      { x: 13498673.45219154, y: 3676559.465940443 },
      { x: 13498674.197283898, y: 3676587.1113864887 },
      { x: 13498679.456690367, y: 3676587.5711281034 }
    ],
    clipRegion: [
      { x: 0, y: 0 },
      { x: 1920, y: 0 },
      { x: 1920, y: 1080 },
      { x: 0, y: 1080 },
      { x: 0, y: 0 }
    ]
  };

  it('preserves camera FOV values and coordinate spaces', () => {
    const pose = parseSeiSample(
      { userData: JSON.stringify(sampleData) },
      { videoWidth: 1920, videoHeight: 1080, seiProjection: 'EPSG:3857' }
    );
    const expectedExtent = proj4(
      'EPSG:3857',
      'EPSG:4326',
      [sampleData.extent[0].x, sampleData.extent[0].y]
    );

    expect(pose.fovX).toBe(sampleData.fovX);
    expect(pose.fovY).toBe(sampleData.fovY);
    expect(pose.x).toBe(sampleData.cameraX);
    expect(pose.y).toBe(sampleData.cameraY);
    expect(pose.extent[0][0]).toBeCloseTo(expectedExtent[0], 8);
    expect(pose.extent[0][1]).toBeCloseTo(expectedExtent[1], 8);
    expect(pose.clipRegion).toEqual([
      [0, 0],
      [1920, 0],
      [1920, 1080],
      [0, 1080]
    ]);
  });

  it('honors the EPSG:4326 source projection from the parser context', () => {
    const lngLatData = Object.assign({}, sampleData, {
      cameraX: 121.2595,
      cameraY: 31.3368,
      extent: [
        { x: 121.2596, y: 31.3369 },
        { x: 121.2595, y: 31.3368 },
        { x: 121.2594, y: 31.3368 },
        { x: 121.2595, y: 31.3369 }
      ]
    });
    const pose = parseSeiSample(
      { userData: JSON.stringify(lngLatData) },
      { videoWidth: 1920, videoHeight: 1080, seiProjection: 'EPSG:4326' }
    );
    const expectedCamera = proj4('EPSG:4326', 'EPSG:3857', [lngLatData.cameraX, lngLatData.cameraY]);

    expect(pose.x).toBeCloseTo(expectedCamera[0], 5);
    expect(pose.y).toBeCloseTo(expectedCamera[1], 5);
    // 4326 源数据不做 3857 -> 4326 的二次转换，否则经纬度会变成 0.00x 量级
    expect(pose.extent[0][0]).toBeCloseTo(lngLatData.extent[0].x, 8);
    expect(pose.extent[0][1]).toBeCloseTo(lngLatData.extent[0].y, 8);
  });

  it('accepts a userData object and camera parameters nested in calibrationModel', () => {
    const pose = parseSeiSample(
      { userData: { calibrationModel: sampleData } },
      { videoWidth: 1920, videoHeight: 1080, seiProjection: 'EPSG:3857' }
    );

    expect(pose.x).toBe(sampleData.cameraX);
    expect(pose.y).toBe(sampleData.cameraY);
    expect(pose.yaw).toBe(sampleData.cameraYaw);
  });

  it('rejects malformed or incomplete SEI data', () => {
    expect(parseSeiSample({ userData: '{bad json' }, {})).toBeNull();
    expect(parseSeiSample({ userData: { cameraX: 1 } }, {})).toBeNull();
    // 配置成 4326 却收到 3857 米制坐标时丢弃该 pose，避免投放位置错乱
    expect(parseSeiSample(
      { userData: JSON.stringify(sampleData) },
      { videoWidth: 1920, videoHeight: 1080, seiProjection: 'EPSG:4326' }
    )).toBeNull();
  });
});
