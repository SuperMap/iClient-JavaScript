/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @private
 * @classdesc SEI（Supplemental Enhancement Information）用户数据解析。
 *
 * hls.js 触发 Hls.Events.FRAG_PARSING_USERDATA 时，回调数据形如：
 * ```
 * {
 *   frag: { url, sn, type, start, byteRange },
 *   samples: [{
 *     payloadType: 5,
 *     pts: 197.9,
 *     userData: '{"centerX":960,"cameraX":121.25,...}',
 *     userDataBytes: Uint8Array,
 *     uuid: '...'
 *   }]
 * }
 * ```
 * `userData` 可能是 JSON 字符串，也可能是已经反序列化好的对象，两种都要兼容。
 *
 * 输出统一为 iClient 内部约定的空间：相机 `x`/`y` 为 EPSG:3857（投影平面，与 `z` 的米制单位一致），
 * `extent` 为 EPSG:4326（经纬度，供 `map.project` 使用）。相机坐标与 `videoParameters` 保持一致，
 * 要求 SEI 直接下发 EPSG:3857；`extent` 则按数值范围自动识别并归一化到 EPSG:4326。
 */

import proj4 from 'proj4';
import { Lang } from '@supermapgis/iclient-common/lang/Lang';

const DEFAULT_VIDEO_WIDTH = 1920;
const DEFAULT_VIDEO_HEIGHT = 1080;
const RAD_TO_DEG = 180 / Math.PI;
const DEG_TO_RAD = Math.PI / 180;

// SEI 里相机字段的常见命名，按优先级排列
const CAMERA_X_KEYS = ['cameraX', 'x', 'camX', 'posX'];
const CAMERA_Y_KEYS = ['cameraY', 'y', 'camY', 'posY'];
const CAMERA_Z_KEYS = ['cameraZ', 'z', 'camZ', 'posZ', 'altitude', 'elevation'];
const PITCH_KEYS = ['pitch', 'cameraPitch', 'tilt', 'phi'];
const ROLL_KEYS = ['roll', 'cameraRoll', 'omega'];
const YAW_KEYS = ['yaw', 'cameraYaw', 'heading', 'kappa'];
const FOV_X_KEYS = ['fovX', 'fov_x', 'horizontalFov', 'fov'];
const FOV_Y_KEYS = ['fovY', 'fov_y', 'verticalFov'];
const CENTER_X_KEYS = ['centerX', 'center_x', 'cx', 'principalX'];
const CENTER_Y_KEYS = ['centerY', 'center_y', 'cy', 'principalY'];
const EXTENT_KEYS = ['extent', 'videoExtent', 'range'];
const CLIP_REGION_KEYS = ['clipRegion', 'clip_region', 'videoClipRegion', 'cropRegion'];

function toFiniteNumber(value) {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }
  const num = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(num) ? num : undefined;
}

function pickNumber(source, keys) {
  for (let i = 0; i < keys.length; i++) {
    const num = toFiniteNumber(source[keys[i]]);
    if (num !== undefined) {
      return num;
    }
  }
  return undefined;
}

function parseUserData(userData) {
  if (!userData) {
    return null;
  }
  if (typeof userData === 'object') {
    return userData;
  }
  if (typeof userData !== 'string') {
    return null;
  }
  try {
    const parsed = JSON.parse(userData);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (e) {
    return null;
  }
}

/**
 * @private
 * @description 判断坐标是否落在经纬度范围内，用于区分 EPSG:4326 与 EPSG:3857 的 SEI 数据。
 * @param {number} x - 横坐标。
 * @param {number} y - 纵坐标。
 * @returns {boolean} 是否为经纬度。
 */
export function isLngLatCoordinate(x, y) {
  return Math.abs(x) <= 180 && Math.abs(y) <= 90;
}

let _warnedPosePrjMismatch = false;

/**
 * @private
 * @description 相机坐标要求 EPSG:3857，命中经纬度范围时说明服务端 SEI 坐标系不符，只提示一次避免刷屏。
 * @param {number} x - 横坐标。
 * @param {number} y - 纵坐标。
 */
function warnPosePrjMismatch(x, y) {
  if (_warnedPosePrjMismatch) {
    return;
  }
  _warnedPosePrjMismatch = true;
  console.warn(Lang.i18n('msg_videoMapSeiPosePrjMismatch'), [x, y]);
}

/**
 * @private
 * @description 把 SEI 中的 extent 归一化为四角点数组 `[[x, y], ...]`。
 * 兼容 `[[x, y], ...]`、`[{x, y}, ...]` 与 `{points: [{x, y}, ...]}`（与 videoParameters 结构一致）三种写法，非法时返回 null。
 * @param {Array|Object} extent - SEI 中的 extent。
 * @returns {Array<Array<number>>|null} 四角点数组。
 */
export function formatSeiExtent(extent) {
  const list = Array.isArray(extent) ? extent : extent && Array.isArray(extent.points) ? extent.points : null;
  if (!list || list.length < 3) {
    return null;
  }
  const corners = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    let x;
    let y;
    if (Array.isArray(item)) {
      x = toFiniteNumber(item[0]);
      y = toFiniteNumber(item[1]);
    } else if (item && typeof item === 'object') {
      x = toFiniteNumber(item.x);
      y = toFiniteNumber(item.y);
    } else {
      return null;
    }
    if (x === undefined || y === undefined) {
      return null;
    }
    corners.push([x, y]);
  }
  return corners;
}

/**
 * @private
 * @description 把 SEI 中的 clipRegion 归一化为视频像素坐标下的四角点数组 `[[x, y], ...]`。
 * clipRegion 是画面裁剪范围（像素），与 extent 的地面范围不同，不做投影转换；末尾可能重复首点，只取前四角。
 * @param {Array|Object} clipRegion - SEI 中的裁剪范围。
 * @returns {Array<Array<number>>|null} 四角点数组，不足四角时返回 null。
 */
export function formatSeiClipRegion(clipRegion) {
  const corners = formatSeiExtent(clipRegion);
  if (!corners || corners.length < 4) {
    return null;
  }
  return corners.slice(0, 4);
}

/**
 * @private
 * @description 把相机参数归一化为 iClient 内部使用的空间：`x`/`y` 保持 EPSG:3857，`extent` 转为 EPSG:4326。
 * 与 `videoParameters` 一致，相机坐标要求直接给出 EPSG:3857；`extent` 允许经纬度或 EPSG:3857，按数值范围自动识别。
 * @param {Object} pose - 相机参数。
 * @returns {Object|null} 归一化后的相机参数。
 */
export function normalizeSeiPose(pose) {
  if (!pose) {
    return null;
  }
  const x = toFiniteNumber(pose.x);
  const y = toFiniteNumber(pose.y);
  if (x === undefined || y === undefined) {
    return null;
  }
  const normalized = Object.assign({}, pose);
  normalized.x = x;
  normalized.y = y;
  if (isLngLatCoordinate(x, y)) {
    warnPosePrjMismatch(x, y);
    return null;
  }
  const corners = formatSeiExtent(normalized.extent);
  if (corners) {
    normalized.extent = isLngLatCoordinate(corners[0][0], corners[0][1])
      ? corners
      : corners.map((corner) => {
        const lngLat = proj4('EPSG:3857', 'EPSG:4326', [corner[0], corner[1]]);
        return [lngLat[0], lngLat[1]];
      });
  }
  return normalized;
}

/**
 * @private
 * @description 解析单个 SEI sample，得到一份可直接交给 CoordTransfer 的相机参数。
 * @param {Object} sample - hls.js 提供的 SEI sample，包含 payloadType/pts/userData 等字段。
 * @param {Object} [context] - 上下文。
 * @param {number} [context.videoWidth] - 视频宽度，用于补全 fov 与主点。
 * @param {number} [context.videoHeight] - 视频高度，用于补全 fov 与主点。
 * @returns {Object|null} 相机参数，无法解析时返回 null。
 */
export function parseSeiSample(sample, context) {
  if (!sample) {
    return null;
  }
  const ctx = context || {};
  const videoWidth = toFiniteNumber(ctx.videoWidth) || DEFAULT_VIDEO_WIDTH;
  const videoHeight = toFiniteNumber(ctx.videoHeight) || DEFAULT_VIDEO_HEIGHT;
  let data = parseUserData(sample.userData);
  if (!data) {
    return null;
  }
  // 部分设备会把相机参数放在 calibrationModel 里
  if (data.calibrationModel && typeof data.calibrationModel === 'object') {
    data = Object.assign({}, data.calibrationModel, data);
  }

  const x = pickNumber(data, CAMERA_X_KEYS);
  const y = pickNumber(data, CAMERA_Y_KEYS);
  if (x === undefined || y === undefined) {
    return null;
  }
  const z = pickNumber(data, CAMERA_Z_KEYS);
  const pitch = pickNumber(data, PITCH_KEYS);
  const roll = pickNumber(data, ROLL_KEYS);
  const yaw = pickNumber(data, YAW_KEYS);

  let fovX = pickNumber(data, FOV_X_KEYS);
  let fovY = pickNumber(data, FOV_Y_KEYS);
  if (fovX === undefined && fovY === undefined) {
    return null;
  }
  // 只有一个视场角时按像元为正方形推算另一个
  if (fovX === undefined) {
    fovX = 2 * Math.atan(Math.tan((fovY * DEG_TO_RAD) / 2) * (videoWidth / videoHeight)) * RAD_TO_DEG;
  } else if (fovY === undefined) {
    fovY = 2 * Math.atan(Math.tan((fovX * DEG_TO_RAD) / 2) * (videoHeight / videoWidth)) * RAD_TO_DEG;
  }

  let extent = null;
  for (let i = 0; i < EXTENT_KEYS.length; i++) {
    extent = formatSeiExtent(data[EXTENT_KEYS[i]]);
    if (extent) {
      break;
    }
  }

  // 裁剪范围就在 SEI 里，VideoLayer 未显式传入 clipRegion 时用它，无需再查 videoParameters
  let clipRegion = null;
  for (let i = 0; i < CLIP_REGION_KEYS.length; i++) {
    clipRegion = formatSeiClipRegion(data[CLIP_REGION_KEYS[i]]);
    if (clipRegion) {
      break;
    }
  }

  const centerX = pickNumber(data, CENTER_X_KEYS);
  const centerY = pickNumber(data, CENTER_Y_KEYS);

  return normalizeSeiPose(
    {
      pitch: pitch !== undefined ? pitch : 0,
      roll: roll !== undefined ? roll : 0,
      yaw: yaw !== undefined ? yaw : 0,
      x,
      y,
      z: z !== undefined ? z : 0,
      fovX,
      fovY,
      centerX: centerX !== undefined ? centerX : videoWidth / 2,
      centerY: centerY !== undefined ? centerY : videoHeight / 2,
      extent,
      clipRegion
    }
  );
}

/**
 * @private
 * @description 解析 hls.js `FRAG_PARSING_USERDATA` 回调中的样本数组。
 * @param {Array} samples - SEI sample 数组。
 * @param {Object} [context] - 透传给 parseSeiSample 的上下文。
 * @returns {Array<Object>} 解析成功的相机参数数组。
 */
export function parseSeiSamples(samples, context) {
  if (!Array.isArray(samples)) {
    return [];
  }
  const poses = [];
  samples.forEach((sample) => {
    const pose = parseSeiSample(sample, context);
    if (pose) {
      poses.push(pose);
    }
  });
  return poses;
}

export default parseSeiSample;
