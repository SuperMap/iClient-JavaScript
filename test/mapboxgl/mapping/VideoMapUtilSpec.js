import {
  shortestAngleDelta,
  lerpAngle,
  findParamIndexAtTime,
  interpolateCameraPose,
  resolveCameraPose,
  findHeadingSweep,
  FastRangeSearcher,
  smartTimeProcessor,
  transformCoord,
  transformCoordReverse,
  fovXToFx,
  fovYToFy,
  ANGLE_SNAP_THRESHOLD,
  HEADING_SWEEP_WINDOW,
  HEADING_SWEEP_HOLD_RATIO
} from '../../../src/mapboxgl/mapping/utils/VideoMapUtil';

function makePose(time, yaw, extra = {}) {
  return {
    time,
    yaw,
    pitch: 0,
    roll: 0,
    x: extra.x != null ? extra.x : 0,
    y: 0,
    z: 0,
    fovX: 60,
    fovY: 40,
    centerX: 0,
    centerY: 0
  };
}

describe('VideoMapUtil camera pose interpolation', () => {
  it('shortestAngleDelta should take the short arc across 180', () => {
    expect(shortestAngleDelta(179, -179)).toBeCloseTo(2, 6);
    expect(shortestAngleDelta(-179, 179)).toBeCloseTo(-2, 6);
    expect(Math.abs(shortestAngleDelta(0, 180))).toBeCloseTo(180, 6);
  });

  it('lerpAngle should not rotate the long way from 179 to -179', () => {
    expect(lerpAngle(179, -179, 0.5)).toBeCloseTo(180, 5);
  });

  it('small heading change should keep time-based interpolation', () => {
    const prev = makePose(0, 10);
    const next = makePose(1, 20);
    expect(interpolateCameraPose(prev, next, 0.5).yaw).toBeCloseTo(15, 5);
    expect(resolveCameraPose([prev, next], 0.5).yaw).toBeCloseTo(15, 5);
  });

  it('single 180deg jump should stay on A until near B', () => {
    const params = [makePose(0, 0, { x: 0 }), makePose(0.2, 180, { x: 10 })];
    expect(ANGLE_SNAP_THRESHOLD).toBe(45);
    expect(resolveCameraPose(params, 0.1).yaw).toBe(0);
    expect(resolveCameraPose(params, 0.1).x).toBe(0);
    expect(resolveCameraPose(params, 0.2 * HEADING_SWEEP_HOLD_RATIO - 0.001).yaw).toBe(0);
    expect(resolveCameraPose(params, 0.2 * HEADING_SWEEP_HOLD_RATIO).yaw).toBe(180);
    expect(resolveCameraPose(params, 0.2 * HEADING_SWEEP_HOLD_RATIO).x).toBe(10);
  });

  it('45deg resampled steps should not show B-side pose around 20deg', () => {
    const params = [0, 45, 90, 135, 180].map((yaw, i) => makePose(i * 0.1, yaw, { x: yaw }));
    expect(findHeadingSweep(params, 0).end.yaw).toBe(180);
    expect(resolveCameraPose(params, 0.05).yaw).toBe(0);
    expect(resolveCameraPose(params, 0.18).yaw).toBe(0);
    expect(resolveCameraPose(params, 0.3).yaw).toBe(0);
    expect(resolveCameraPose(params, 0.39).yaw).toBe(180);
  });

  it('20deg keyframe steps over a short 180deg sweep should stay on A until near B', () => {
    const params = [];
    for (let i = 0; i <= 9; i++) {
      params.push(makePose(i * 0.04, i * 20, { x: i * 20 }));
    }
    expect(findHeadingSweep(params, 3).start.yaw).toBe(0);
    expect(findHeadingSweep(params, 3).end.yaw).toBe(180);
    expect(resolveCameraPose(params, 0.04).yaw).toBe(0);
    expect(resolveCameraPose(params, 0.08).yaw).toBe(0);
    expect(resolveCameraPose(params, 0.16).yaw).toBe(0);
    expect(resolveCameraPose(params, 0.32).yaw).toBe(0);
    expect(resolveCameraPose(params, 0.35).yaw).toBe(180);
  });

  it('findHeadingSweep should reject invalid, noisy and opposing input', () => {
    expect(findHeadingSweep([], 0)).toBeNull();
    expect(findHeadingSweep([makePose(0, 0)], 0)).toBeNull();
    expect(findHeadingSweep([makePose(0, 0), makePose(1, 0.1)], 0)).toBeNull();
    expect(findHeadingSweep([makePose(0, 0), makePose(1, 60)], 2)).toBeNull();
    expect(findHeadingSweep([makePose(0, 0), makePose(1, 60)], -1)).toBeNull();
    expect(findHeadingSweep([makePose(0, 0), makePose(1, 60)], 1, 2, 61)).toBeNull();
    expect(findHeadingSweep([makePose(0, 0), makePose(1, 60), makePose(2, 30)], 1)).toBeNull();
    expect(findHeadingSweep([makePose(0, 0), makePose(1, 30), makePose(2, 60)], 1, 0.5)).toBeNull();
    expect(findHeadingSweep([makePose(0, 0), makePose(1, 60)], 1).start.yaw).toBe(0);
    expect(HEADING_SWEEP_WINDOW).toBe(2);
  });

  it('findParamIndexAtTime should handle empty input, endpoints and interior ranges', () => {
    const params = [makePose(1, 0), makePose(2, 10), makePose(3, 20)];

    expect(findParamIndexAtTime(null, 1)).toBe(0);
    expect(findParamIndexAtTime([], 1)).toBe(0);
    expect(findParamIndexAtTime(params, 0)).toBe(0);
    expect(findParamIndexAtTime(params, 1)).toBe(0);
    expect(findParamIndexAtTime(params, 2)).toBe(1);
    expect(findParamIndexAtTime(params, 4)).toBe(2);
    expect(resolveCameraPose([], 0)).toBeNull();
    expect(resolveCameraPose(params, 1).yaw).toBe(0);
    expect(resolveCameraPose(params, 4).yaw).toBe(20);
  });

  it('FastRangeSearcher should handle empty, boundary and interpolated ranges', () => {
    const empty = new FastRangeSearcher([]);
    expect(empty.findRange(1)).toBeNull();
    expect(empty.findNearest(1)).toBeNull();

    const searcher = new FastRangeSearcher([0, 1, 2]);
    expect(searcher.findRange(-1)).toEqual({ index: 0, ratio: 0 });
    expect(searcher.findRange(0.25)).toEqual({ index: 0, ratio: 0.25 });
    expect(searcher.findRange(2)).toEqual({ index: 2, ratio: 0 });
    expect(searcher.findNearest(-1)).toEqual({ value: 0 });
    expect(searcher.findNearest(1.2)).toEqual({ value: 2 });
    expect(searcher.findNearest(3)).toEqual({ value: 2 });
  });

  it('smartTimeProcessor should validate interval and process empty data', () => {
    expect(() => smartTimeProcessor(0, [])).toThrow();
    expect(smartTimeProcessor(0.1, [])).toEqual([]);
    expect(smartTimeProcessor(0.1, null)).toEqual([]);
  });

  it('smartTimeProcessor should return original data for an unchanged interval', () => {
    const data = [makePose(0, 0), makePose(0.25, 10), makePose(0.5, 20)];
    expect(smartTimeProcessor(0.25, data)).toBe(data);
  });

  it('smartTimeProcessor should cover one-frame and duplicate-time interpolation', () => {
    const single = [makePose(1, 30)];
    expect(smartTimeProcessor(0.1, single, ['yaw'])[0].yaw).toBe(30);

    const duplicateTimes = [makePose(0, 5), makePose(0, 15)];
    const duplicateResult = smartTimeProcessor(0.1, duplicateTimes, ['yaw']);
    expect(duplicateResult.length).toBe(1);
    expect(duplicateResult[0].yaw).toBe(15);
  });

  it('smartTimeProcessor should interpolate numeric properties and angles', () => {
    const result = smartTimeProcessor(0.5, [
      makePose(0, 170, { x: 0 }),
      makePose(1, -170, { x: 100 })
    ], ['yaw', 'x']);

    expect(result.length).toBe(3);
    expect(result[1].time).toBe(0.5);
    expect(result[1].yaw).toBeCloseTo(180, 5);
    expect(result[1].x).toBe(50);
  });

  it('smartTimeProcessor should hold fast turns and interpolate extent coordinates', () => {
    const data = [
      Object.assign(makePose(0, 0), {
        pitch: 0,
        roll: 0,
        extent: [{ x: 0, y: 10 }]
      }),
      Object.assign(makePose(1, 90), {
        pitch: 20,
        roll: 30,
        extent: [{ x: 100, y: 30 }]
      })
    ];
    const result = smartTimeProcessor(0.5, data, ['yaw', 'pitch', 'roll', 'extent']);

    expect(result[1].yaw).toBe(0);
    expect(result[1].pitch).toBe(0);
    expect(result[1].roll).toBe(0);
    expect(result[1].extent).toEqual([[0, 10]]);
    expect(result[2].yaw).toBe(90);
    expect(result[2].pitch).toBe(20);
    expect(result[2].roll).toBe(30);
    expect(result[2].extent).toEqual([[100, 30]]);
  });

  it('smartTimeProcessor should preserve the nearest frame when downsampling', () => {
    const data = [0, 0.1, 0.2, 0.3].map((time) => makePose(time, time * 10));
    const result = smartTimeProcessor(0.2, data, ['yaw']);

    expect(result.map((item) => item.time)).toEqual([0, 0.2]);
  });

  it('smartTimeProcessor should select the closer next frame and deduplicate samples', () => {
    const data = [0, 0.3, 0.6, 1].map((time) => makePose(time, time * 10));
    const result = smartTimeProcessor(0.5, data, ['yaw']);

    expect(result.map((item) => item.time)).toEqual([0, 0.6, 1]);
  });

  it('coordinate helpers should transform in both directions and calculate focal length', () => {
    const options = {
      originCoordsLeftTop: { lng: 100, lat: 40 },
      originCoordsRightBottom: { lng: 110, lat: 20 },
      videoWidth: 1000,
      videoHeight: 500
    };
    const point = [250, 100];
    const coordinate = transformCoord({ ...options, videoPoint: point });

    expect(coordinate).toEqual([102.5, 36]);
    expect(transformCoordReverse({ ...options, coord: coordinate })).toEqual(point);
    expect(fovXToFx(90, 1000)).toBeCloseTo(500, 6);
    expect(fovYToFy(90, 500)).toBeCloseTo(250, 6);
  });
});
