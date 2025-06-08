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
    this.data = sortedArray.map(n => Math.round(n * 1000));
  }

  findNearest(target) {
    const targetInt = Math.round(target * 1000);
    const minVal = targetInt;
    const maxVal = targetInt + 3000;

    let closestIndex = -1;
    let minDiff = Infinity;

    for (let i = 0; i < this.data.length; i++) {
      const current = this.data[i];
      
      if (current > maxVal) {
        break
      }

      if (current >= minVal) {
        const diff = current - targetInt;
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = i;
        }
      }
    }

    if (closestIndex !== -1) {
      return {
        value: +(this.data[closestIndex] / 1000).toFixed(3)
      };
    }
    
    return null;
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
          if (current.time === t) {
              result.push(formatPoint(current));
              dataPtr++;
          } else if (next.time === t) {
              result.push(formatPoint(next));
              dataPtr++;
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