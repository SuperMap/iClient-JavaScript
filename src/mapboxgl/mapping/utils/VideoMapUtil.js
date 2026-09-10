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
          let res = {};
          properties.forEach(prop => {
              if (prop === 'extent') {
                res[prop] = current[prop].map((item, index) => {
                  return [current[prop][index].x + (next[prop][index].x - current[prop][index].x) * ratio, current[prop][index].y + (next[prop][index].y - current[prop][index].y) * ratio];
                });
              } else {
                const value = current[prop] + (next[prop] - current[prop]) * ratio;
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