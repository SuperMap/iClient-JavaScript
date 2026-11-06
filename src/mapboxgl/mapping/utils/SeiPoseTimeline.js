/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import { parseSeiSample } from './seiParser';

/**
 * @private
 * @classdesc SEI 相机姿态时间轴。
 *
 * 负责三件事：
 * 1. 把 hls.js 吐出的 SEI sample 换算成「媒体时间轴」上的相机姿态；
 * 2. 去重（同一个分片可能被重复解析）、排序、淘汰过期数据；
 * 3. 按视频播放头时间查询/切片，供 VideoMap 复用 resolveCameraPose 做插值。
 *
 * 时间换算：
 *   媒体时间 = PTS（当 PTS 与 frag.start 同轴时）或 分片起点 + 分片内 PTS 偏移，再减去 mediaOffset。
 *   PTS 的单位（秒 / 90kHz）与时间轴（绝对 / 分片内相对）由 toSeconds 结合 frag.start 自动判定；
 *   mediaOffset 由 FRAG_BUFFERED 时的 buffered.start(0) 与最早分片起点标定，
 *   用于补偿 MSE 时间轴与播放列表时间轴的差值。
 */

const SAME_TIME_EPSILON = 1e-4;
const DEFAULT_MAX_ENTRIES = 4000;
const MAX_SEEN_KEYS = 2048;
// PTS 与分片起点允许的最大偏离（秒）。分片通常几秒一个，用它来判定 PTS 是否已经和 frag.start 同轴
const MAX_PTS_FRAG_DRIFT = 60;
/**
 * 切片跨度（单侧，秒），即取播放头前后各 10 秒。
 * 插值只需目标时间相邻的两个姿态，该跨度只为 findHeadingSweep 的快转判定留出 2 秒邻域，
 * 并保证 SEI 稀疏（约 1 条/秒）时邻域内仍有足够样本。
 */
const SEI_POSE_WINDOW = 10;

/**
 * @private
 * @description 把 SEI sample 的 pts 换算成秒，并判定它是否已经处于播放列表时间轴（与 frag.start 同轴）。
 *
 * hls.js 不同版本对 userData 的 pts 处理不一致：可能是秒（与 frag.start 同轴），
 * 也可能是 90kHz 的原始 PES PTS。这里先用 frag.start 校准，失配时再按 90kHz 经验阈值退化。
 * @param {number} pts - sample.pts。
 * @param {number} [fragStart] - 分片在播放列表中的起点，单位秒。
 * @returns {Object} `{value, absolute}`，value 为秒值，absolute 表示是否与 frag.start 同轴。
 */
function toSeconds(pts, fragStart) {
  const num = Number(pts);
  if (!Number.isFinite(num)) {
    return { value: undefined, absolute: false };
  }
  if (Number.isFinite(fragStart)) {
    if (Math.abs(num - fragStart) <= MAX_PTS_FRAG_DRIFT) {
      return { value: num, absolute: true };
    }
    const asSeconds = num / 90000;
    if (Math.abs(asSeconds - fragStart) <= MAX_PTS_FRAG_DRIFT) {
      return { value: asSeconds, absolute: true };
    }
  }
  return { value: Math.abs(num) > 1e6 ? num / 90000 : num, absolute: false };
}

function lowerBound(poses, rawTime) {
  let lo = 0;
  let hi = poses.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (poses[mid].rawTime < rawTime) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}

export class SeiPoseTimeline {
  /**
   * @param {Object} [options] - 参数。
   * @param {number} [options.maxEntries=4000] - 最多缓存的姿态数量。
   */
  constructor(options) {
    const opts = options || {};
    this.maxEntries = opts.maxEntries !== undefined ? opts.maxEntries : DEFAULT_MAX_ENTRIES;
    this.mediaOffset = 0;
    this.calibrated = false;
    this._earliestFragStart = undefined;
    this._lastRawTime = undefined;
    this._poses = [];
    this._seen = new Set();
    this._seenQueue = [];
    this._listeners = {};
  }

  /**
   * @description 监听 `add`（新增姿态）/`reset`（清空）事件。
   * @param {string} type - 事件类型。
   * @param {Function} listener - 回调。
   */
  on(type, listener) {
    if (typeof listener !== 'function') {
      return;
    }
    if (!this._listeners[type]) {
      this._listeners[type] = [];
    }
    this._listeners[type].push(listener);
  }

  off(type, listener) {
    const list = this._listeners[type];
    if (!list) {
      return;
    }
    const index = list.indexOf(listener);
    if (index > -1) {
      list.splice(index, 1);
    }
  }

  _emit(type, payload) {
    const list = this._listeners[type];
    if (!list || !list.length) {
      return;
    }
    list.slice().forEach((listener) => {
      try {
        listener(payload);
      } catch (e) {
        // 订阅方异常不能影响时间轴自身的写入
      }
    });
  }

  get size() {
    return this._poses.length;
  }

  /**
   * @description 把媒体时间换算为时间轴内部使用的原始时间。
   * @param {number} mediaTime - 视频播放头时间，单位秒。
   * @returns {number} 原始时间。
   */
  toRawTime(mediaTime) {
    return mediaTime + this.mediaOffset;
  }

  /**
   * @description 把时间轴内部原始时间换算为媒体时间。
   * @param {number} rawTime - 原始时间。
   * @returns {number} 媒体时间。
   */
  toMediaTime(rawTime) {
    return rawTime - this.mediaOffset;
  }

  /**
   * @description 返回按时间升序排列的姿态副本，每项带媒体时间 `time`。
   * @returns {Array<Object>}
   */
  poses() {
    const offset = this.mediaOffset;
    return this._poses.map((item) => Object.assign({}, item, { time: item.rawTime - offset }));
  }

  /**
   * @description 取出时间轴最前面的若干个姿态，返回项带媒体时间 `time`。
   * 相比 `poses().slice(0, n)` 不会复制整条时间轴，适合每帧调用。
   * @param {number} [count=1] - 需要取出的数量。
   * @returns {Array<Object>} 姿态数组。
   */
  firstPoses(count) {
    const limit = Math.min(this._poses.length, Math.max(1, count || 1));
    const offset = this.mediaOffset;
    const result = [];
    for (let i = 0; i < limit; i++) {
      result.push(Object.assign({}, this._poses[i], { time: this._poses[i].rawTime - offset }));
    }
    return result;
  }

  /**
   * @description 用视频缓冲起点标定 MSE 时间轴与播放列表时间轴的差值。
   * @param {number} bufferedStart - `video.buffered.start(0)`，单位秒。
   * @returns {boolean} 是否完成标定。
   */
  calibrate(bufferedStart) {
    if (this.calibrated || this._earliestFragStart === undefined) {
      return this.calibrated;
    }
    const start = Number(bufferedStart);
    if (!Number.isFinite(start)) {
      return false;
    }
    // 媒体时间 = 原始时间 - mediaOffset，目标是把最早分片起点映射到 buffered.start(0)
    this.setMediaOffset(this._earliestFragStart - start);
    this.calibrated = true;
    return true;
  }

  /**
   * @description 手动设置时间偏移。`媒体时间 = 原始时间 - mediaOffset`。
   * @param {number} offset - 偏移量，单位秒。
   */
  setMediaOffset(offset) {
    const value = Number(offset);
    const next = Number.isFinite(value) ? value : 0;
    const changed = next !== this.mediaOffset;
    this.mediaOffset = next;
    if (changed) {
      // 偏移变化会改变所有姿态的媒体时间，订阅方按媒体时间缓存的结果必须失效
      this._emit('calibrate', { mediaOffset: next });
    }
  }

  /**
   * @description 重新标定时间轴。与 `calibrate` 的区别是忽略已有的标定结果，
   * 用于直播链路重连、服务端重启或用户手动纠正偏移的场景。
   * @param {number} bufferedStart - `video.buffered.start(0)`，单位秒。
   * @returns {boolean} 是否完成标定。
   */
  recalibrate(bufferedStart) {
    this.calibrated = false;
    return this.calibrate(bufferedStart);
  }

  /**
   * @description 清空全部姿态并复位标定状态，下次写入时会重新按缓冲起点标定时间轴。
   */
  clear() {
    this._poses = [];
    this._seen.clear();
    this._seenQueue = [];
    this._earliestFragStart = undefined;
    this._lastRawTime = undefined;
    this.calibrated = false;
    this._emit('reset', {});
  }

  /**
   * @description 写入一个 hls.js `FRAG_PARSING_USERDATA` 回调体。
   * @param {Object} data - 回调数据，形如 `{frag, samples}`。
   * @param {Object} [options] - 参数。
   * @param {Function} [options.parser] - 自定义 SEI 解析函数 `(sample, ctx) => pose|null`。
   * @param {number} [options.videoWidth] - 视频宽度。
   * @param {number} [options.videoHeight] - 视频高度。
   * @returns {Array<Object>} 本次新增的姿态（媒体时间）。
   */
  ingest(data, options) {
    const opts = options || {};
    if (!data || !Array.isArray(data.samples) || !data.samples.length) {
      return [];
    }
    const parser = typeof opts.parser === 'function' ? opts.parser : parseSeiSample;
    const frag = data.frag || {};
    const fragSn = frag.sn !== undefined ? frag.sn : '';
    const rawFragStart = Number(frag.start);
    const hasFragStart = Number.isFinite(rawFragStart);
    let fragStart = rawFragStart;
    if (!hasFragStart) {
      // 没有分片起点时退化为在上一帧基础上顺延，避免整段数据被丢弃
      fragStart = this._lastRawTime !== undefined ? this._lastRawTime : 0;
    }
    if (this._earliestFragStart === undefined || fragStart < this._earliestFragStart) {
      this._earliestFragStart = fragStart;
    }

    const samples = data.samples;
    // 同一分片内的 PTS 一定同源，用首个可用样本判定整片的换算方式，避免同片内混用两种基准
    let basePts;
    let isAbsolute = false;
    let detected = false;
    for (let i = 0; i < samples.length; i++) {
      const info = toSeconds(samples[i] && samples[i].pts, rawFragStart);
      if (info.value === undefined) {
        continue;
      }
      if (!detected) {
        isAbsolute = info.absolute;
        detected = true;
      }
      if (basePts === undefined || info.value < basePts) {
        basePts = info.value;
      }
    }

    const added = [];
    samples.forEach((sample) => {
      if (!sample) {
        return;
      }
      const pts = toSeconds(sample.pts, rawFragStart).value;
      const key = `${fragSn}:${pts === undefined ? 'na' : pts.toFixed(3)}`;
      if (this._seen.has(key)) {
        return;
      }
      this._markSeen(key);

      let pose;
      try {
        pose = parser(sample, {
          frag,
          sample,
          videoWidth: opts.videoWidth,
          videoHeight: opts.videoHeight
        });
      } catch (e) {
        pose = null;
      }
      if (!pose) {
        this._emit('invalid', { reason: 'seiParseFailed', sample, frag });
        return;
      }
      const ptsDelta = pts !== undefined && basePts !== undefined ? pts - basePts : 0;
      // 与 frag.start 同轴时直接用 PTS 作为媒体时间，避免不同分片的 PTS 起始偏移造成跳变
      const rawTime = pts !== undefined && (isAbsolute || !hasFragStart) ? pts : fragStart + ptsDelta;
      const entry = Object.assign({}, pose, { rawTime });
      if (this._insert(entry)) {
        added.push(Object.assign({}, entry, { time: entry.rawTime - this.mediaOffset }));
      }
    });
    return added;
  }

  /**
   * @description 直接写入已换算好时间的姿态。`time` 为媒体时间。
   * @param {Object|Array<Object>} poses - 单个或多个姿态。
   * @returns {Array<Object>} 本次新增的姿态。
   */
  push(poses) {
    const list = Array.isArray(poses) ? poses : [poses];
    const added = [];
    list.forEach((pose) => {
      if (!pose) {
        return;
      }
      const time = Number(pose.time);
      if (!Number.isFinite(time)) {
        return;
      }
      const entry = Object.assign({}, pose, { rawTime: this.toRawTime(time) });
      delete entry.time;
      if (this._insert(entry)) {
        added.push(Object.assign({}, entry, { time: entry.rawTime - this.mediaOffset }));
      }
    });
    return added;
  }

  _markSeen(key) {
    this._seen.add(key);
    this._seenQueue.push(key);
    if (this._seenQueue.length > MAX_SEEN_KEYS) {
      const dropped = this._seenQueue.shift();
      this._seen.delete(dropped);
    }
  }

  _insert(entry) {
    const poses = this._poses;
    let index = lowerBound(poses, entry.rawTime);
    // 极近的时间点视为同一帧，用新值覆盖，避免抖动产生双帧
    while (index > 0 && Math.abs(poses[index - 1].rawTime - entry.rawTime) < SAME_TIME_EPSILON) {
      index--;
    }
    if (index < poses.length && Math.abs(poses[index].rawTime - entry.rawTime) < SAME_TIME_EPSILON) {
      poses[index] = entry;
    } else {
      poses.splice(index, 0, entry);
    }
    if (this._lastRawTime === undefined || entry.rawTime > this._lastRawTime) {
      this._lastRawTime = entry.rawTime;
    }
    if (poses.length > this.maxEntries) {
      poses.splice(0, poses.length - this.maxEntries);
    }
    const payload = Object.assign({}, entry, { time: entry.rawTime - this.mediaOffset });
    this._emit('add', payload);
    return true;
  }

  /**
   * @description 查询时间轴，返回目标时间所在区间及插值比例。
   * @param {number} mediaTime - 视频播放头时间，单位秒。
   * @returns {Object|null} `{prevIndex, nextIndex, ratio, prev, next}`，无数据时返回 null。
   */
  resolve(mediaTime) {
    const poses = this._poses;
    if (!poses.length) {
      return null;
    }
    const targetRaw = this.toRawTime(mediaTime);
    let index = lowerBound(poses, targetRaw);
    if (index >= poses.length) {
      index = poses.length - 1;
    } else if (index > 0 && poses[index].rawTime > targetRaw) {
      index -= 1;
    }
    const prev = poses[index];
    const next = poses[index + 1] || prev;
    const dt = next.rawTime - prev.rawTime;
    const ratio = dt > 0 ? Math.min(1, Math.max(0, (targetRaw - prev.rawTime) / dt)) : 0;
    const offset = this.mediaOffset;
    return {
      prevIndex: index,
      nextIndex: index + 1,
      ratio,
      prev: Object.assign({}, prev, { time: prev.rawTime - offset }),
      next: Object.assign({}, next, { time: next.rawTime - offset })
    };
  }

  /**
   * @description 取出目标时间前后各 `SEI_POSE_WINDOW`（10 秒）内的姿态，用于 resolveCameraPose 插值。
   * 返回项按时间升序，且每项带媒体时间 `time`。
   * @param {number} mediaTime - 视频播放头时间，单位秒。
   * @returns {Array<Object>}
   */
  sliceAround(mediaTime) {
    const poses = this._poses;
    if (!poses.length) {
      return [];
    }
    const half = SEI_POSE_WINDOW;
    const targetRaw = this.toRawTime(mediaTime);
    const offset = this.mediaOffset;
    let start = lowerBound(poses, targetRaw - half);
    let end = lowerBound(poses, targetRaw + half);
    start = Math.max(0, start - 1);
    end = Math.min(poses.length, end + 1);
    if (end - start < 2) {
      start = Math.max(0, Math.min(poses.length - 2, start - 1));
      end = Math.min(poses.length, start + 2);
    }
    const slice = [];
    for (let i = start; i < end; i++) {
      slice.push(Object.assign({}, poses[i], { time: poses[i].rawTime - offset }));
    }
    return slice;
  }

  /**
   * @description 淘汰窗口之前的旧数据。
   * @param {number} mediaTime - 视频播放头时间，单位秒。
   */
  trim(mediaTime) {
    const half = SEI_POSE_WINDOW;
    const cutoff = this.toRawTime(mediaTime) - half;
    let drop = 0;
    while (drop < this._poses.length - 2 && this._poses[drop].rawTime < cutoff) {
      drop++;
    }
    if (drop > 0) {
      this._poses.splice(0, drop);
    }
  }

  /**
   * @description 导出时间轴状态，便于调试。
   * @returns {Object}
   */
  snapshot() {
    return {
      size: this._poses.length,
      mediaOffset: this.mediaOffset,
      calibrated: this.calibrated,
      earliestFragStart: this._earliestFragStart,
      first: this._poses.length ? this.toMediaTime(this._poses[0].rawTime) : null,
      last: this._poses.length ? this.toMediaTime(this._poses[this._poses.length - 1].rawTime) : null
    };
  }
}

export default SeiPoseTimeline;
