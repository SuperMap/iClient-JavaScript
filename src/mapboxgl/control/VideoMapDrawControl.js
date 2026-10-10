/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import { Lang } from '../../common/lang/Lang';
import {
  MODE_SIMPLE_SELECT,
  MODE_DRAW_POINT,
  MODE_DRAW_LINE_STRING,
  MODE_DRAW_POLYGON
} from '../mapping/VideoMapDraw';

const DEFAULT_CONTROLS = {
  point: true,
  line_string: true,
  polygon: true,
  trash: true
};

const BUTTONS = [
  {
    key: 'point',
    mode: MODE_DRAW_POINT,
    className: 'sm-videomap-draw-point mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_point',
    titleKey: 'text_videoMapDrawPoint'
  },
  {
    key: 'line_string',
    mode: MODE_DRAW_LINE_STRING,
    className: 'sm-videomap-draw-line mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_line',
    titleKey: 'text_videoMapDrawLine'
  },
  {
    key: 'polygon',
    mode: MODE_DRAW_POLYGON,
    className: 'sm-videomap-draw-polygon mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon',
    titleKey: 'text_videoMapDrawPolygon'
  },
  {
    key: 'trash',
    mode: 'trash',
    className: 'sm-videomap-draw-trash mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash',
    titleKey: 'text_videoMapDeleteSelectedFeature'
  }
];

function resolveControls(options) {
  const controls = {};
  Object.keys(DEFAULT_CONTROLS).forEach((key) => {
    controls[key] = options.controls ? !!options.controls[key] : DEFAULT_CONTROLS[key];
  });
  return controls;
}

/**
 * @class VideoMapDrawControl
 * @category  Control
 * @classdesc 视频地图绘制控件。UI 参考 mapbox-gl-draw：点、线、面、删除。
 * 绘制结果走 VideoMap 地理坐标与重投影链路，可同步到真实地图。后续可在此控件上扩展要素编辑。
 * @modulecategory Control
 * @param {Object} [options] - 参数。
 * @param {VideoMap} [options.videoMap] - 视频地图实例。通过 `videoMap.addControl` 添加时会自动注入。
 * @param {Object} [options.controls={point:true, line_string:true, polygon:true, trash:true}] - 按钮显隐，`point` / `line_string` / `polygon` / `trash`。不传时默认全部显示；传入后仅 `true` 对应的按钮显示，未指定项隐藏。
 * @param {Object} [options.styles] - 点、线、面的全局样式，使用 Mapbox paint 属性名。`point`：`circle-radius` / `circle-color` / `circle-opacity` / `circle-stroke-width` / `circle-stroke-color`；`line`：`line-color` / `line-width` / `line-opacity` / `line-dasharray`；`polygon`：`fill-color` / `fill-opacity` 及轮廓的 `line-*`。选中要素的颜色由 `selected.color` 指定（默认 `#fbb03b`），绘制完成后要素处于选中状态；绘制中的预览线点沿用对应的点、线、面颜色。可通过 `preview.point` / `preview.line` / `preview.polygon` 单独设置绘制中的样式（属性同上，面预览可用 `fill-*` 与轮廓 `line-*`），未设置的属性沿用主样式或默认值。
 * @example
 * videoMap.addControl(new mapboxgl.supermap.VideoMapDrawControl({
 *   styles: { point: { 'circle-color': '#f00' }, line: { 'line-width': 4 } }
 * }), 'top-left');
 * @usage
 */
export class VideoMapDrawControl {
  constructor(options) {
    options = options || {};
    this.options = {
      videoMap: options.videoMap,
      controls: resolveControls(options),
      styles: options.styles
    };
    this.videoMap = options.videoMap || null;
    this._buttons = {};
    this._onModeChange = this._syncUI.bind(this);
    this._onSelectionChange = this._syncUI.bind(this);
    this._onDelete = this._syncUI.bind(this);
    this._onClear = this._syncUI.bind(this);
  }

  /**
   * @function VideoMapDrawControl.prototype.setVideoMap
   * @description 绑定视频地图实例。
   * @param {VideoMap} videoMap - 视频地图。
   */
  setVideoMap(videoMap) {
    this._unbindVideoMap();
    this.videoMap = videoMap;
    this._bindVideoMap();
    if (this._container) {
      this._getDraw().activate();
      this._syncUI();
    }
  }

  /**
   * @function VideoMapDrawControl.prototype.onAdd
   * @description 添加到地图。
   * @param {mapboxgl.Map} map - MapboxGL 地图对象。
   * @returns {HTMLElement} 控件容器。
   */
  onAdd(map) {
    this._map = map;
    if (!this.videoMap && map && map._smVideoMap) {
      this.videoMap = map._smVideoMap;
    }
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl sm-videomap-draw-ctrl';
    BUTTONS.forEach((item) => {
      if (!this.options.controls[item.key]) {
        return;
      }
      const button = document.createElement('button');
      const title = Lang.i18n(item.titleKey);
      button.type = 'button';
      button.className = `sm-videomap-draw-btn ${item.className}`;
      button.title = title;
      button.setAttribute('aria-label', title);
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        this._onButtonClick(item);
      });
      this._container.appendChild(button);
      this._buttons[item.key] = button;
    });
    this._bindVideoMap();
    if (this.videoMap) {
      this._getDraw().activate();
    }
    this._syncUI();
    return this._container;
  }

  /**
   * @function VideoMapDrawControl.prototype.onRemove
   * @description 从地图移除控件。
   */
  onRemove() {
    if (this.videoMap) {
      this._getDraw().changeMode(MODE_SIMPLE_SELECT);
    }
    this._unbindVideoMap();
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
    this._container = null;
    this._buttons = {};
    this._map = null;
  }

  /**
   * @function VideoMapDrawControl.prototype.getDefaultPosition
   * @description 默认位置。
   * @returns {string} 控件位置。
   */
  getDefaultPosition() {
    return 'top-left';
  }

  /**
   * @function VideoMapDrawControl.prototype.setStyles
   * @description 更新点、线、面的全局样式，仅覆盖传入的属性。
   * @param {Object} styles - 结构同构造参数 `styles`。
   */
  setStyles(styles) {
    this.options.styles = styles;
    if (this.videoMap) {
      this._getDraw().setStyles(styles);
    }
  }

  /**
   * @function VideoMapDrawControl.prototype.getStyles
   * @description 获取当前生效的点、线、面样式。
   * @returns {Object} 样式配置。
   */
  getStyles() {
    return this.videoMap ? this._getDraw().getStyles() : null;
  }

  _getDraw() {
    return this.videoMap._getDraw({ styles: this.options.styles });
  }

  _onButtonClick(item) {
    if (!this.videoMap) {
      return;
    }
    const draw = this._getDraw();
    if (item.mode === 'trash') {
      if (draw.getSelectedIds().length) {
        draw.delete();
      } else if (draw.getMode()) {
        draw.cancel();
      }
      return;
    }
    if (draw.getUiMode() === item.mode) {
      draw.changeMode(MODE_SIMPLE_SELECT);
      return;
    }
    draw.changeMode(item.mode);
  }

  _syncUI() {
    if (!this._container) {
      return;
    }
    const draw = this.videoMap ? this._getDraw() : null;
    const uiMode = draw ? draw.getUiMode() : MODE_SIMPLE_SELECT;
    const selectedCount = draw ? draw.getSelectedIds().length : 0;
    const canTrash = selectedCount > 0 || !!(draw && draw.getMode());
    Object.keys(this._buttons).forEach((key) => {
      const button = this._buttons[key];
      const meta = BUTTONS.find((item) => item.key === key);
      if (meta.mode === 'trash') {
        button.disabled = !canTrash;
        button.classList.remove('active');
        return;
      }
      if (uiMode === meta.mode) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  _bindVideoMap() {
    if (!this.videoMap || this._videoMapBound) {
      return;
    }
    this.videoMap.on('drawmodechange', this._onModeChange);
    this.videoMap.on('drawselectionchange', this._onSelectionChange);
    this.videoMap.on('drawdelete', this._onDelete);
    this.videoMap.on('drawclear', this._onClear);
    this.videoMap.on('drawcreate', this._onSelectionChange);
    this._videoMapBound = true;
  }

  _unbindVideoMap() {
    if (!this.videoMap || !this._videoMapBound) {
      return;
    }
    this.videoMap.off('drawmodechange', this._onModeChange);
    this.videoMap.off('drawselectionchange', this._onSelectionChange);
    this.videoMap.off('drawdelete', this._onDelete);
    this.videoMap.off('drawclear', this._onClear);
    this.videoMap.off('drawcreate', this._onSelectionChange);
    this._videoMapBound = false;
  }
}

export default VideoMapDrawControl;
