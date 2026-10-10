import {
  shortestAngleDelta,
  lerpAngle,
  interpolateCameraPose,
  resolveCameraPose,
  findHeadingSweep,
  ANGLE_SNAP_THRESHOLD,
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
});
