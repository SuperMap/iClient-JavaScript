/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @function getMapTransform
 * @description 获取地图的 Transform。maplibre-gl v6 起 Map 不再公开 transform，
 * 其 Transform 移至 camera（map._camera.transform）；mapbox-gl 及 maplibre v5
 * 仍使用 map.transform。
 * @param {Object} map - 地图实例。
 * @returns {Object} Transform 实例。
 * @private
 */
export function getMapTransform(map) {
  if (!map) {
    return null;
  }
  if (map.transform) {
    return map.transform;
  }
  const camera = map._camera || map.camera;
  return camera && camera.transform;
}
