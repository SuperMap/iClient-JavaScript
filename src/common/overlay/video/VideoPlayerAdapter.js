/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @private
 * @classdesc 把「video.js 播放器实例」与「原生 video 元素」统一成同一套调用面。
 *
 * 之所以需要它：SEI 直播方案里 MediaSource 由 hls.js 接管，video.js 只当 UI 外壳，
 * 甚至完全不用 video.js（业务方自己 new HTMLVideoElement）。而 VideoMap / VideoLayer
 * 内部大量依赖 video.js 的 `tech().el()`、`one()`、`videoWidth()` 等方法，
 * 这里统一适配，避免调用方被迫再包一层 video.js。
 *
 * 支持的输入：
 * - videojs.Player 实例（原样透传）
 * - HTMLVideoElement（包装成播放器风格）
 * - VideoPlayerAdapter 本身（原样返回）
 */

function isVideoElement(target) {
  return !!target && target.nodeType === 1 && String(target.tagName).toUpperCase() === 'VIDEO';
}

function isPlayerLike(target) {
  return (
    !!target &&
    typeof target.tech === 'function' &&
    typeof target.on === 'function' &&
    typeof target.el_ === 'object'
  );
}

/**
 * @private
 * @description 消费播放 Promise 的拒绝状态，避免自动播放被浏览器拦截时抛出未捕获的 Promise 拒绝；
 * 同时原样返回该 Promise，调用方仍可自行 `catch`（例如静音重试、引导用户点击播放）。
 * @param {Promise|undefined} promise - `play()` 的返回值。
 * @returns {Promise|undefined} 传入的播放 Promise。
 */
export function silencePlayRejection(promise) {
  if (promise && typeof promise.catch === 'function') {
    promise.catch(() => {});
  }
  return promise;
}

export class VideoPlayerAdapter {
  /**
   * @param {Object} target - video.js 播放器实例或原生 video 元素。
   */
  constructor(target) {
    this.target = target || null;
    this.element = isVideoElement(this.target) ? this.target : this._resolveElement();
    this._external = true;
    this._disposers = [];
  }

  _resolveElement() {
    if (!this.target) {
      return null;
    }
    if (typeof this.target.el === 'function') {
      return this.target.el();
    }
    return null;
  }

  /**
   * @description 统一包装入口。
   * @param {Object} target - video.js 播放器实例或原生 video 元素。
   * @returns {VideoPlayerAdapter|null}
   */
  static wrap(target) {
    if (!target) {
      return null;
    }
    if (target instanceof VideoPlayerAdapter) {
      return target;
    }
    return new VideoPlayerAdapter(target);
  }

  /**
   * @description 判断入参是否是可用的播放器/视频元素。
   * @param {Object} target - 待判断对象。
   * @returns {boolean}
   */
  static isValid(target) {
    return isVideoElement(target) || isPlayerLike(target);
  }

  /**
   * @description 获取底层 video.js 播放器实例；原生元素时返回 null。
   * @returns {Object|null}
   */
  get player() {
    return isPlayerLike(this.target) ? this.target : null;
  }

  /**
   * @description 获取原生 video 元素。
   * @returns {HTMLVideoElement|null}
   */
  el() {
    return this.element;
  }

  /**
   * @description 与 video.js Player#tech() 对齐，返回可获取 video 元素的对象。
   * @returns {Object|null}
   */
  tech() {
    const element = this.el();
    if (!element) {
      return null;
    }
    return {
      el: () => element
    };
  }

  /**
   * @description 与 video.js Player#el_ 对齐，返回播放器根节点。
   * @returns {HTMLElement|null}
   */
  get el_() {
    if (this.player) {
      return this.player.el_;
    }
    const element = this.el();
    return element && element.parentNode ? element.parentNode : element;
  }

  on(type, listener) {
    if (this.player) {
      this.player.on(type, listener);
      return this;
    }
    const element = this.el();
    if (element && typeof element.addEventListener === 'function') {
      element.addEventListener(type, listener);
      this._disposers.push(() => element.removeEventListener(type, listener));
    }
    return this;
  }

  off(type, listener) {
    if (this.player) {
      this.player.off(type, listener);
      return this;
    }
    const element = this.el();
    if (element && typeof element.removeEventListener === 'function') {
      element.removeEventListener(type, listener);
    }
    return this;
  }

  one(type, listener) {
    if (this.player) {
      this.player.one(type, listener);
      return this;
    }
    const element = this.el();
    if (element && typeof element.addEventListener === 'function') {
      element.addEventListener(type, listener, { once: true });
    }
    return this;
  }

  /**
   * @description 播放视频，返回播放 Promise（自动播放被拦截时以 `NotAllowedError` 拒绝）。
   * @returns {Promise|undefined} 播放 Promise。
   */
  play() {
    if (this.player) {
      return silencePlayRejection(this.player.play());
    }
    const element = this.el();
    if (!element || typeof element.play !== 'function') {
      return undefined;
    }
    return silencePlayRejection(element.play());
  }

  pause() {
    if (this.player) {
      return this.player.pause();
    }
    const element = this.el();
    return element && typeof element.pause === 'function' ? element.pause() : undefined;
  }

  paused() {
    if (this.player) {
      return this.player.paused();
    }
    const element = this.el();
    return element ? !!element.paused : true;
  }

  currentTime() {
    if (this.player) {
      return this.player.currentTime();
    }
    const element = this.el();
    return element ? element.currentTime : 0;
  }

  videoWidth() {
    if (this.player) {
      return this.player.videoWidth();
    }
    const element = this.el();
    return element ? element.videoWidth : 0;
  }

  videoHeight() {
    if (this.player) {
      return this.player.videoHeight();
    }
    const element = this.el();
    return element ? element.videoHeight : 0;
  }

  duration() {
    if (this.player) {
      return this.player.duration();
    }
    const element = this.el();
    return element && Number.isFinite(element.duration) ? element.duration : 0;
  }

  /**
   * @description 释放适配器添加的监听。
   */
  dispose() {
    this._disposers.forEach((fn) => fn());
    this._disposers = [];
  }
}

export default VideoPlayerAdapter;
