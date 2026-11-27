/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

let l7Render = null;

/**
 * 注入 L7 render 模块命名空间。
 * @param {Object} renderModule - `import * as L7Render from 'maplibregl-l7-render'` 的命名空间
 */
export function setL7Render(renderModule) {
  l7Render = renderModule;
}

/**
 * 获取已注入的 render 模块，未注入时返回 null。
 * @returns {Object|null}
 */
export function getL7Render() {
  return l7Render;
}
