export const transformCoord = ({
  videoPoint,
  originCoordsRightBottom,
  originCoordsLeftTop,
  videoHeight,
  videoWidth
}) => {
  let perWidth = Math.abs(originCoordsRightBottom.lng - originCoordsLeftTop.lng) / videoWidth;
  let perHeight = Math.abs(originCoordsRightBottom.lat - originCoordsLeftTop.lat) / videoHeight;
  return [videoPoint[0] * perWidth + originCoordsLeftTop.lng, originCoordsLeftTop.lat - videoPoint[1] * perHeight];
};

export const transformCoordReverse = ({
  coord,
  originCoordsRightBottom,
  originCoordsLeftTop,
  videoHeight,
  videoWidth
}) => {
  let perWidth = Math.abs(originCoordsRightBottom.lng - originCoordsLeftTop.lng) / videoWidth;
  let perHeight = Math.abs(originCoordsRightBottom.lat - originCoordsLeftTop.lat) / videoHeight;
  return [(coord[0] - originCoordsLeftTop.lng) / perWidth, (originCoordsLeftTop.lat - coord[1]) / perHeight];
};

export const fovXToFx = (fovX, videoWidth) => {
  return videoWidth / (2 * Math.tan(fovX / 2 * Math.PI / 180));
}

export const fovYToFy = (fovY, videoHeight) => {
  return videoHeight / (2 * Math.tan(fovY / 2 * Math.PI / 180));
}

/** 连续航向变化累计超过该角度时，视为一次快转（度）。 */
export const ANGLE_SNAP_THRESHOLD = 45;
/** 快转检测的最大时间窗口（秒）。 */
export const HEADING_SWEEP_WINDOW = 2;
/** 快转过程中保持起点姿态的时间比例，接近终点再切到 B。 */
export const HEADING_SWEEP_HOLD_RATIO = 0.95;
const YAW_EPS = 0.5;

export function shortestAngleDelta(from, to) {
  return ((to - from) % 360 + 540) % 360 - 180;
}

export function lerpAngle(from, to, t) {
  return from + shortestAngleDelta(from, to) * t;
}

export function findParamIndexAtTime(params, time) {
  if (!params || !params.length) {
    return 0;
  }
  if (time <= params[0].time) {
    return 0;
  }
  const last = params.length - 1;
  if (time >= params[last].time) {
    return last;
  }
  let lo = 0;
  let hi = last;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (params[mid].time <= time && params[mid + 1].time > time) {
      return mid;
    }
    if (params[mid].time < time) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return Math.max(0, Math.min(last, lo));
}

/**
 * 从当前关键帧向前后扩展，找出同一方向上的短时大角度航向变化。
 * 用于避免 A→B 快转时用中间朝向把 B 侧要素提前投进画面。
 */
export function findHeadingSweep(params, index, maxWindow = HEADING_SWEEP_WINDOW, minDelta = ANGLE_SNAP_THRESHOLD) {
  if (!params || !params.length || index < 0 || index >= params.length) {
    return null;
  }
  const stepDelta = (i) => shortestAngleDelta(params[i].yaw, params[i + 1].yaw);
  const isNoise = (d) => Math.abs(d) < YAW_EPS;
  let dir = 0;
  if (index < params.length - 1 && !isNoise(stepDelta(index))) {
    dir = Math.sign(stepDelta(index));
  }
  if (!dir && index > 0 && !isNoise(stepDelta(index - 1))) {
    dir = Math.sign(stepDelta(index - 1));
  }
  if (!dir) {
    return null;
  }

  let start = index;
  while (start > 0) {
    const d = stepDelta(start - 1);
    if (!isNoise(d) && Math.sign(d) !== dir) {
      break;
    }
    if (params[index].time - params[start - 1].time > maxWindow) {
      break;
    }
    start--;
  }

  let end = Math.min(index, params.length - 1);
  while (end < params.length - 1) {
    const d = stepDelta(end);
    if (!isNoise(d) && Math.sign(d) !== dir) {
      break;
    }
    if (params[end + 1].time - params[start].time > maxWindow) {
      break;
    }
    end++;
  }

  if (end <= start) {
    return null;
  }
  const delta = shortestAngleDelta(params[start].yaw, params[end].yaw);
  const span = params[end].time - params[start].time;
  if (Math.abs(delta) < minDelta || span <= 0 || span > maxWindow) {
    return null;
  }
  return {
    startIndex: start,
    endIndex: end,
    start: params[start],
    end: params[end],
    delta,
    span
  };
}

export function interpolateCameraPose(prev, next, ratio) {
  const t = ratio;
  const lerp = (a, b) => a + (b - a) * t;
  return {
    pitch: lerpAngle(prev.pitch, next.pitch, t),
    roll: lerpAngle(prev.roll, next.roll, t),
    yaw: lerpAngle(prev.yaw, next.yaw, t),
    x: lerp(prev.x, next.x),
    y: lerp(prev.y, next.y),
    z: lerp(prev.z, next.z),
    fovX: lerp(prev.fovX, next.fovX),
    fovY: lerp(prev.fovY, next.fovY),
    centerX: lerp(prev.centerX, next.centerX),
    centerY: lerp(prev.centerY, next.centerY)
  };
}

/**
 * 解析当前时间应使用的相机姿态。
 * 若处于短时大角度航向快转中，在接近终点前始终使用起点 A。
 * 不能按相邻 20°/45° 关键帧成对切换，否则画面只转到约 20° 就会用到下一帧朝向。
 */
export function resolveCameraPose(params, time) {
  if (!params || !params.length) {
    return null;
  }
  const index = findParamIndexAtTime(params, time);
  const prev = params[index];
  const next = params[index + 1] || prev;
  const dt = (next.time || 0) - (prev.time || 0);
  const ratio = dt > 0 ? (time - prev.time) / dt : 0;
  const sweep = findHeadingSweep(params, index);
  if (sweep) {
    const r = sweep.span > 0 ? (time - sweep.start.time) / sweep.span : 1;
    return r >= HEADING_SWEEP_HOLD_RATIO ? sweep.end : sweep.start;
  }
  return interpolateCameraPose(prev, next, ratio);
}

/**
 * @private
 */

export class FastRangeSearcher {
  constructor(sortedArray) {
    this.raw = sortedArray.slice();
    this.data = sortedArray.map(n => Math.round(n * 1000));
  }

  /**
   * 查找 target 落入的区间 [data[index], data[index+1]]，并返回插值比例。
   * @param {number} target - 目标时间（秒）。
   * @returns {{index: number, ratio: number}|null} index 为前一个关键帧索引，ratio 为 [0,1] 插值比例。
   */
  findRange(target) {
    if (!this.data.length) {
      return null;
    }
    const targetInt = Math.round(target * 1000);

    // target 早于首个关键帧，取首帧
    if (targetInt <= this.data[0]) {
      return { index: 0, ratio: 0 };
    }
    // target 晚于末个关键帧，取末帧
    const last = this.data.length - 1;
    if (targetInt >= this.data[last]) {
      return { index: last, ratio: 0 };
    }

    // 二分查找 target 所在区间
    let lo = 0;
    let hi = last;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (this.data[mid] <= targetInt && this.data[mid + 1] > targetInt) {
        const span = this.data[mid + 1] - this.data[mid];
        const ratio = span > 0 ? (targetInt - this.data[mid]) / span : 0;
        return { index: mid, ratio };
      }
      if (this.data[mid] < targetInt) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return { index: lo, ratio: 0 };
  }

  /**
   * 查找不小于 target 的最近关键帧，返回其时间值（秒）。
   * @param {number} target - 目标时间（秒）。
   * @returns {{value: number}|null} value 为命中的关键帧时间值（秒）。
   */
  findNearest(target) {
    if (!this.data.length) {
      return null;
    }
    const targetInt = Math.round(target * 1000);
    // 二分查找第一个 >= target 的索引
    let lo = 0;
    let hi = this.data.length - 1;
    let result = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (this.data[mid] >= targetInt) {
        result = mid;
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    }
    // target 晚于末帧，取末帧
    if (result === -1) {
      result = this.data.length - 1;
    }
    return { value: this.raw[result] };
  }
}

/**
 * @private
 * @param {Object} params 配置参数
 * @param {number} params.interval 目标时间间隔（秒，≥0.001）
 * @param {Array} params.data 时间序列数据
 * @returns {Array} 处理结果
 */
export function smartTimeProcessor(interval, data, properties = []) {
  if (interval < 0.001) {
    throw new Error("time interval can't' less than 0.001");
  }
  if (!data || data.length === 0) {
    return [];
  }

  const processed = data.map(p => ({
      ...p,
      time: Math.round(p.time * 1000)
  }));

  // 计算最小原始间隔和有效时间范围
  let minInterval = Infinity;
  for (let i = 1; i < processed.length; i++) {
      minInterval = Math.min(minInterval, processed[i].time - processed[i-1].time);
  }
  const targetInterval = Math.round(interval * 1000);
  const [startMs, endMs] = [
      processed[0].time,
      processed[processed.length - 1].time
  ];

  if (targetInterval === minInterval) {
      return data;
  }

  const useInterpolation = targetInterval < minInterval;
  
  let result = [];
  let dataPtr = 0;
  
  for (let t = startMs; t <= endMs; t += targetInterval) {
      while (dataPtr < processed.length - 1 && processed[dataPtr + 1].time < t) {
          dataPtr++;
      }

      const current = processed[dataPtr];
      const next = processed[dataPtr + 1] || current;

      if (useInterpolation) {
          const ratio = next.time === current.time ? 0 : (t - current.time) / (next.time - current.time);
          const poseT = (properties.indexOf('yaw') !== -1 && Math.abs(shortestAngleDelta(current.yaw, next.yaw)) >= ANGLE_SNAP_THRESHOLD)
            ? (ratio >= HEADING_SWEEP_HOLD_RATIO ? 1 : 0)
            : ratio;
          let res = {};
          properties.forEach(prop => {
              if (prop === 'extent') {
                res[prop] = current[prop].map((item, index) => {
                  return [current[prop][index].x + (next[prop][index].x - current[prop][index].x) * poseT, current[prop][index].y + (next[prop][index].y - current[prop][index].y) * poseT];
                });
              } else if (prop === 'yaw' || prop === 'pitch' || prop === 'roll') {
                res[prop] = +lerpAngle(current[prop], next[prop], poseT);
              } else {
                const value = current[prop] + (next[prop] - current[prop]) * poseT;
                res[prop] = +value;
              }
          });
          result.push({
              ...current,
              time: +((t / 1000).toFixed(3)),
              ...res
          });
      } else {
          // 降采样：在每个目标时间点 t 选取最近的关键帧，并去重。
          // 旧实现要求 current.time/next.time 与 t 严格相等才入队，
          // 当原始时间步长(如33/34ms交替)与目标间隔(如330ms)不对齐时会丢掉几乎所有帧，
          // 导致 timeParams 仅剩零散几帧、画面长时间不更新。
          while (dataPtr < processed.length - 1 && processed[dataPtr + 1].time <= t) {
              dataPtr++;
          }
          const cur = processed[dataPtr];
          const nxt = processed[dataPtr + 1];
          let candidate = cur;
          if (nxt && Math.abs(nxt.time - t) < Math.abs(cur.time - t)) {
              candidate = nxt;
          }
          if (result.length === 0 || result[result.length - 1].time !== formatPoint(candidate).time) {
              result.push(formatPoint(candidate));
          }
      }
  }
  return result;
}

function formatPoint(point) {
  return {
      ...point,
      time: +(point.time / 1000).toFixed(3)
  };
}