import { VideoMap } from '../../../src/mapboxgl/mapping/VideoMap';
import { SeiPoseTimeline } from '../../../src/mapboxgl/mapping/utils/SeiPoseTimeline';
import { normalizeSeiPose, normalizeSeiProjection } from '../../../src/mapboxgl/mapping/utils/seiParser';
import { VideoLayer } from '../../../src/mapboxgl/overlay/VideoLayer';

const WEB_MERCATOR_EXTENT = [
  [111319.49079327358, 0],
  [222638.98158654716, 0],
  [222638.98158654716, 111325.1428663851],
  [111319.49079327358, 111325.1428663851]
];

const LON_LAT_EXTENT = [
  [1, 0],
  [2, 0],
  [2, 1],
  [1, 1]
];

function createPose(x, y, extent) {
  return {
    x,
    y,
    z: 100,
    pitch: 0,
    roll: 0,
    yaw: 0,
    fovX: 80,
    fovY: 45,
    centerX: 960,
    centerY: 540,
    extent,
    time: 1
  };
}

function expectCoordinatesClose(actual, expected) {
  expect(actual.length).toBe(expected.length);
  actual.forEach((point, index) => {
    expect(point[0]).toBeCloseTo(expected[index][0], 5);
    expect(point[1]).toBeCloseTo(expected[index][1], 5);
  });
}

describe('SEI projection normalization', () => {
  it('uses the VideoMap parameter source selector and rejects unsupported values', () => {
    spyOn(VideoMap.prototype, '_createMap').and.returnValue(new Promise(() => {}));
    const customMap = new VideoMap({ opencv: {}, videoParameters: {} });
    const seiMap = new VideoMap({ opencv: {}, parametersSource: 'SEI' });

    expect(customMap.parametersSource).toBe('custom');
    expect(customMap.isSeiSource).toBe(false);
    expect(seiMap.parametersSource).toBe('SEI');
    expect(seiMap.isSeiSource).toBe(true);
    expect(() => new VideoMap({
      opencv: {},
      videoParameters: {},
      parametersSource: 'sei'
    })).toThrowError('parametersSource must be "custom" or "SEI".');
  });

  it('keeps EPSG:3857 as the default and normalizes its extent to EPSG:4326', () => {
    expect(normalizeSeiProjection()).toBe('EPSG:3857');
    const pose = normalizeSeiPose(createPose(13358338.895192828, 3503549.8435043753, WEB_MERCATOR_EXTENT));

    expect(pose.x).toBeCloseTo(13358338.895192828, 5);
    expect(pose.y).toBeCloseTo(3503549.8435043753, 5);
    expectCoordinatesClose(pose.extent, LON_LAT_EXTENT);
  });

  it('uses EPSG:4326 for automatic HLS SEI parsing and converts camera coordinates', () => {
    const timeline = new SeiPoseTimeline();
    const added = timeline.ingest({
      frag: { sn: 1, start: 10 },
      samples: [{
        pts: 10,
        userData: JSON.stringify({
          cameraX: 120,
          cameraY: 30,
          fovX: 80,
          extent: [[120, 30], [120.01, 30], [120.01, 30.01], [120, 30.01]]
        })
      }]
    }, { seiProjection: 'EPSG:4326' });

    expect(added.length).toBe(1);
    expect(added[0].x).toBeCloseTo(13358338.895192828, 5);
    expect(added[0].y).toBeCloseTo(3503549.8435043753, 5);
    expectCoordinatesClose(added[0].extent, [[120, 30], [120.01, 30], [120.01, 30.01], [120, 30.01]]);
  });

  it('passes the configured projection through both components automatic SEI handlers', () => {
    const data = {
      frag: { sn: 1, start: 10 },
      samples: [{
        pts: 10,
        userData: JSON.stringify({
          cameraX: 120,
          cameraY: 30,
          fovX: 80,
          extent: [[120, 30], [120.01, 30], [120.01, 30.01], [120, 30.01]]
        })
      }]
    };
    spyOn(VideoMap.prototype, '_createMap').and.returnValue(new Promise(() => {}));
    const map = new VideoMap({
      opencv: {},
      parametersSource: 'SEI',
      seiProjection: 'EPSG:4326',
      videoWidth: 1920,
      videoHeight: 1080
    });
    map._handleSeiPayload(data);

    const layer = new VideoLayer({
      opencv: {},
      parametersSource: 'SEI',
      seiProjection: 'EPSG:4326'
    });
    layer._handleSeiPayload(data);

    [map.seiTimeline.poses()[0], layer.seiTimeline.poses()[0]].forEach((pose) => {
      expect(pose.x).toBeCloseTo(13358338.895192828, 5);
      expect(pose.y).toBeCloseTo(3503549.8435043753, 5);
      expectCoordinatesClose(pose.extent, [[120, 30], [120.01, 30], [120.01, 30.01], [120, 30.01]]);
    });
  });

  it('passes the configured parser and projection to VideoLayer SEI samples', () => {
    const sample = { pts: 10, userData: '{}' };
    const parser = jasmine.createSpy('seiParser').and.returnValue(
      createPose(13358338.895192828, 3503549.8435043753, LON_LAT_EXTENT)
    );
    const layer = new VideoLayer({
      opencv: {},
      parametersSource: 'SEI',
      seiProjection: 'EPSG:4326',
      seiParser: parser
    });
    layer.videoWidth = 1920;
    layer.videoHeight = 1080;

    layer._handleSeiPayload({
      frag: { sn: 2, start: 10 },
      samples: [sample]
    });

    expect(parser).toHaveBeenCalledWith(sample, jasmine.objectContaining({
      videoWidth: 1920,
      videoHeight: 1080,
      seiProjection: 'EPSG:4326'
    }));
    expect(layer.seiTimeline.poses().length).toBe(1);
  });

  describe('SEI timeline timestamp fallback', () => {
    const parser = (sample) => ({ x: sample.x });

    it('distributes samples without PTS across fragment interval centers', () => {
      const timeline = new SeiPoseTimeline();
      const data = {
        frag: { sn: 2, start: 10, duration: 4 },
        samples: [{ x: 1, pts: null }, { x: 2 }]
      };

      const added = timeline.ingest(data, { parser });

      expect(added.map((pose) => pose.time)).toEqual([11, 13]);
      expect(timeline.ingest(data, { parser })).toEqual([]);
    });

    it('uses fragment fallback when PTS is missing, ignoring sample and parsed pose time', () => {
      const timeline = new SeiPoseTimeline();
      const added = timeline.ingest({
        frag: { sn: 3, start: 20, duration: 4 },
        samples: [{ x: 1, time: 90, poseTime: 95 }, { x: 2, time: 91, poseTime: 96 }]
      }, {
        parser: (sample) => ({ x: sample.x, time: sample.poseTime })
      });

      expect(added.map((pose) => pose.time)).toEqual([21, 23]);
    });

    it('preserves PTS and only falls back for samples without PTS', () => {
      const timeline = new SeiPoseTimeline();
      const added = timeline.ingest({
        frag: { sn: 3, start: 10, duration: 4 },
        samples: [{ x: 1, pts: 10.5 }, { x: 2 }, { x: 3, pts: 13.5 }]
      }, { parser });

      expect(added.map((pose) => pose.time)).toEqual([10.5, 12, 13.5]);
    });

    it('does not estimate timestamps without a valid fragment duration', () => {
      const timeline = new SeiPoseTimeline();
      const added = timeline.ingest({
        frag: { sn: 4, start: 10 },
        samples: [{ x: 1 }]
      }, { parser });

      expect(added.length).toBe(1);
      expect(added[0].time).toBe(10);
    });
  });

  it('applies the configured projection to manual VideoMap and VideoLayer parameters', () => {
    spyOn(VideoMap.prototype, '_createMap').and.returnValue(new Promise(() => {}));
    const map = new VideoMap({ opencv: {}, parametersSource: 'SEI', seiProjection: 'EPSG:4326' });
    const mapAdded = map.pushSeiParameters(createPose(120, 30, LON_LAT_EXTENT));

    const layer = new VideoLayer({
      opencv: {},
      parametersSource: 'SEI',
      seiProjection: 'EPSG:4326'
    });
    layer.pushSeiParameters([createPose(120, 30, LON_LAT_EXTENT)]);
    const layerPose = layer.seiTimeline.poses()[0];

    expect(mapAdded.length).toBe(1);
    expect(mapAdded[0].x).toBeCloseTo(13358338.895192828, 5);
    expect(mapAdded[0].y).toBeCloseTo(3503549.8435043753, 5);
    expectCoordinatesClose(mapAdded[0].extent, LON_LAT_EXTENT);
    expect(layerPose.x).toBeCloseTo(13358338.895192828, 5);
    expect(layerPose.y).toBeCloseTo(3503549.8435043753, 5);
    expectCoordinatesClose(layerPose.extent, LON_LAT_EXTENT);
  });

  it('rejects unsupported SEI projections', () => {
    expect(() => normalizeSeiProjection('EPSG:4269')).toThrowError(RangeError);
  });
});
