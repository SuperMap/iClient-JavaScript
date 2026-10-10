/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import { Lang } from '@supermapgis/iclient-common/lang/Lang';

const PLAY_ICON =
  '<svg viewBox="0 0 24 24" class="sm-mapboxgl-play-svg sm-mapboxgl-play-svg--play" aria-hidden="true"><path d="M8 5.14v13.72L19 12 8 5.14z"/></svg>';
const PAUSE_ICON =
  '<svg viewBox="0 0 24 24" class="sm-mapboxgl-play-svg sm-mapboxgl-play-svg--pause" aria-hidden="true"><path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z"/></svg>';
const DEFAULT_CONTENT = `<button type="button" class="sm-mapboxgl-play-btn">${PLAY_ICON}${PAUSE_ICON}</button>`;

export function escapeHTML(strings) {
  var result = '';
  for (var i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i + 1 < arguments.length) {
      var value = arguments[i + 1] || '';
      result += String(value).replace(/[&<>"'/]/g, function (s) {
        return {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&apos;',
          '/': '&#x2F;'
        }[s];
      });
    }
  }
  return result;
}

/**
 * @class VideoPlayControl
 * @category Control
 * @classdesc VideoMap 或 VideoLayer 的播放/暂停控件。
 * @modulecategory Control
 * @param {Object} [options] - 参数。
 * @param {VideoMap|VideoLayer} [options.target] - 要控制的对象。添加到 VideoMap 时可省略并自动绑定。
 * @param {number} [options.size] - 内置按钮直径，单位像素。使用 setHTML / setDOMContent 自定义内容后不再生效。
 * @example
 * videoMap.addControl(new mapboxgl.supermap.VideoPlayControl(), 'bottom-left');
 * map.addControl(new mapboxgl.supermap.VideoPlayControl({ target: videoLayer }), 'bottom-left');
 * @example
 * // 自定义整个控件内容（可以是自己的 button）：带 sm-mapboxgl-play-when-paused 的元素仅在暂停时显示，sm-mapboxgl-play-when-playing 仅在播放时显示
 * const control = new mapboxgl.supermap.VideoPlayControl();
 * control.setHTML(
 *   '<span class="sm-mapboxgl-play-when-paused">播放</span><span class="sm-mapboxgl-play-when-playing">暂停</span>'
 * );
 */
export class VideoPlayControl {
  constructor(options) {
    options = options || {};
    this.options = {
      position: 'bottom-left',
      size: options.size
    };
    this.target = null;
    this._targetBound = false;
    this._content = DEFAULT_CONTENT;
    this._onPlayState = this._syncUI.bind(this);
    this.setTarget(options.target);
  }

  /**
   * @function VideoPlayControl.prototype.setHTML
   * @description 设置控件内容，会替换包括内置圆形按钮在内的全部内容，可以是任意自定义结构（如自己的 button）。内容中任意位置被点击都会切换播放/暂停。内容可同时包含两种状态：带 sm-mapboxgl-play-when-paused 类的元素仅在暂停时显示，带 sm-mapboxgl-play-when-playing 类的元素仅在播放时显示；也可用控件容器（.sm-mapboxgl-play-ctrl）上的 is-playing / is-paused 类自行编写样式。自定义内容的 title、aria-label 需自行设置。内容会被过滤：移除 script、iframe、style 等危险标签，以及 on* 事件属性和 javascript: 等危险链接。如需完全自定义，请使用 setDOMContent。
   * @param {string} html - HTML 字符串。
   * @returns {VideoPlayControl} this。
   */
  setHTML(html) {
    this._content = escapeHTML`${String(html)}`;
    this._renderContent();
    return this;
  }

  /**
   * @function VideoPlayControl.prototype.setDOMContent
   * @description 以 DOM 节点设置按钮内容，用法同 setHTML。节点由调用方创建，不做过滤；节点会被直接放入按钮，不会克隆。
   * @param {Node} node - DOM 节点。
   * @returns {VideoPlayControl} this。
   */
  setDOMContent(node) {
    if (!node || typeof node.nodeType !== 'number') {
      throw new TypeError('VideoPlayControl.setDOMContent expects a DOM Node');
    }
    this._content = node;
    this._renderContent();
    return this;
  }

  setTarget(target) {
    this._unbindTarget();
    this.target = target || null;
    this._bindTarget();
    this._syncUI();
    return this;
  }

  onAdd(map) {
    this._map = map;
    if (!this.target && map && map._smVideoMap) {
      this.setTarget(map._smVideoMap);
    }
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl sm-mapboxgl-play-ctrl';
    // 自定义内容中的任意元素被点击都会切换播放状态
    this._container.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this._toggle();
    });
    this._renderContent();
    this._bindTarget();
    return this._container;
  }

  onRemove() {
    this._unbindTarget();
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
    this._container = null;
    this._button = null;
    this._map = null;
  }

  getDefaultPosition() {
    return this.options.position;
  }

  _toggle() {
    if (!this.target) {
      return;
    }
    if (this.target.paused()) {
      this.target.play();
    } else {
      this.target.pause();
    }
  }

  _renderContent() {
    if (!this._container) {
      return;
    }
    while (this._container.firstChild) {
      this._container.removeChild(this._container.firstChild);
    }
    if (typeof this._content === 'string') {
      this._container.innerHTML = this._content;
    } else {
      const node = this._content.nodeType === 11 ? this._content.cloneNode(true) : this._content;
      this._container.appendChild(node);
    }
    // 仅内置按钮存在时应用 size，并维护标题和 aria-label
    this._button = this._container.querySelector('.sm-mapboxgl-play-btn');
    if (this._button && this.options.size) {
      this._button.style.width = `${this.options.size}px`;
      this._button.style.height = `${this.options.size}px`;
    }
    this._syncUI();
  }

  _syncUI() {
    if (!this._container) {
      return;
    }
    const paused = !this.target || this.target.paused();
    [this._container, this._button].forEach((el) => {
      if (el) {
        el.classList.toggle('is-paused', paused);
        el.classList.toggle('is-playing', !paused);
      }
    });
    if (this._button) {
      this._button.title = Lang.i18n(paused ? 'text_videoMapPlay' : 'text_videoMapPause');
      this._button.setAttribute('aria-label', this._button.title);
    }
    this._container.querySelectorAll('.sm-mapboxgl-play-when-paused').forEach((el) => {
      el.style.display = paused ? '' : 'none';
    });
    this._container.querySelectorAll('.sm-mapboxgl-play-when-playing').forEach((el) => {
      el.style.display = paused ? 'none' : '';
    });
  }

  _bindTarget() {
    if (!this.target || this._targetBound) {
      return;
    }
    this.target.on('play', this._onPlayState);
    this.target.on('pause', this._onPlayState);
    this._targetBound = true;
  }

  _unbindTarget() {
    if (!this.target || !this._targetBound) {
      return;
    }
    this.target.off('play', this._onPlayState);
    this.target.off('pause', this._onPlayState);
    this._targetBound = false;
  }
}

export default VideoPlayControl;