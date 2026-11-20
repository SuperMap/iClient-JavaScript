/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import Hls from 'hls.js';

/**
 * @private
 * @description hls.js 事件名。这里直接使用字符串事件名，避免不同 hls.js 版本对 `Hls.Events`
 * 常量的组织方式存在差异。这些名字在 hls.js 0.14 ~ 1.7 之间保持稳定。
 */
export const SEI_HLS_EVENTS = {
  FRAG_PARSING_USERDATA: 'hlsFragParsingUserdata',
  FRAG_BUFFERED: 'hlsFragBuffered',
  MEDIA_ATTACHED: 'hlsMediaAttached',
  MANIFEST_PARSED: 'hlsManifestParsed',
  ERROR: 'hlsError'
};

const HLS_ERROR_TYPES = {
  NETWORK: 'networkError',
  MEDIA: 'mediaError'
};

/**
 * @private
 * @description 直播场景下的保守默认配置，业务可通过 `hlsConfig` 覆盖。
 */
export const DEFAULT_SEI_HLS_CONFIG = {
  enableWorker: true,
  lowLatencyMode: false,
  liveSyncDurationCount: 3,
  liveMaxLatencyDurationCount: 10,
  backBufferLength: 90
};

const ATTACH_RETRY_INTERVAL = 50;
const ATTACH_MAX_TRIES = 300;
const MAX_RECONNECT_DELAY = 30;
const MAX_MEDIA_RECOVER = 2;

/**
 * @private
 * @description 判断地址是否为 HLS(m3u8) 流。只有 HLS 流才需要 hls.js 接管 MediaSource。
 * @param {string} url - 视频地址。
 * @returns {boolean}
 */
export function isHlsStreamUrl(url) {
  return typeof url === 'string' && /\.m3u8([?#]|$)/i.test(url);
}

/**
 * @private
 * @description 判断当前浏览器是否支持 MediaSource(MSE)。SEI 直播必须由 hls.js 接管 MSE，
 * 浏览器不支持时只能把画面交给 video.js 播放，拿不到 SEI 参数。
 * @returns {boolean}
 */
export function isMseSupported() {
  return typeof window !== 'undefined' && !!(window.MediaSource || window.WebKitMediaSource);
}

/**
 * @private
 * @description 判断 hls.js 在当前环境是否可用（已加载且支持 MSE）。
 * hls.js 与 video.js 一样作为外部库由页面引入（全局 `Hls`），iClient 内部固定使用该版本。
 * @returns {boolean}
 */
export function isSeiHlsAvailable() {
  if (!Hls || typeof Hls !== 'function' || typeof Hls.isSupported !== 'function') {
    return false;
  }
  try {
    return !!Hls.isSupported();
  } catch (e) {
    return false;
  }
}

/**
 * @private
 * @description SEI 参数不可用时给业务的说明文案。优先区分浏览器 MSE 能力与 hls.js 是否加载，
 * 避免业务侧重复做浏览器能力检测。
 * @returns {string}
 */
export function getSeiUnavailableMessage() {
  if (!isMseSupported()) {
    return 'MediaSource (MSE) is not supported in this browser, SEI camera parameters will be unavailable and only the video will be played.';
  }
  return 'hls.js is not available, SEI camera parameters will be unavailable. Load hls.js (global Hls) before iClient, the same way as video.js.';
}

/**
 * @private
 * @classdesc SEI 直播的 HLS 播放源。
 *
 * 负责把 hls.js 的生命周期收敛到 iClient 内部：创建实例、等待 iClient 创建的 `<video>` 就绪后
 * `attachMedia`、`loadSource(url)` 拉流、把 `FRAG_PARSING_USERDATA` / `FRAG_BUFFERED` 转成回调，
 * 并在网络 / 解码致命错误时自动恢复或按指数退避重建播放会话。
 *
 * SEI 必须走 hls.js：video.js 内置的 VHS 只把 SEI 中的 T.35 字幕数据交给 inbandTextTracks，
 * 不会把 `user_data_unregistered` 抛给外部，且 transmux 在 Worker 内完成。
 * 因此 SEI 模式下 `<video>` 不能带 `type: 'application/x-mpegURL'` 的源，否则 VHS 会抢占 MediaSource。
 *
 * hls.js 与 video.js 一样作为外部库由页面引入，业务只需传 `url`，实例创建 / 挂载 / 拉流 / 重连全部由这里完成。
 * @param {Object} options - 参数。
 * @param {string} options.url - HLS(m3u8) 地址。
 * @param {Object} [options.hlsConfig] - 新建 hls 实例时使用的配置，覆盖 {@link DEFAULT_SEI_HLS_CONFIG}。
 * @param {boolean} [options.attachMedia=true] - 是否把 `<video>` 交给 hls.js。
 * @param {boolean} [options.loadSource=true] - 是否由 iClient 调用 `loadSource`。
 * @param {boolean} [options.autoRecover=true] - 是否自动恢复致命错误。
 * @param {Function} [options.getVideoElement] - 获取 `<video>` 元素，元素异步创建时需要。
 * @param {Function} [options.onUserData] - `FRAG_PARSING_USERDATA` 回调，参数为 `{frag, samples}`。
 * @param {Function} [options.onFragBuffered] - `FRAG_BUFFERED` 回调。
 * @param {Function} [options.onMediaAttached] - `MEDIA_ATTACHED` 回调。
 * @param {Function} [options.onManifestParsed] - `MANIFEST_PARSED` 回调。
 * @param {Function} [options.onError] - hls 错误回调，参数为 hls.js 的 error data。
 * @param {Function} [options.onReconnect] - 重建播放会话前的回调，用于清理旧的时间轴数据。
 */
export class SeiHlsSource {
  constructor(options) {
    const opts = options || {};
    this.url = opts.url || '';
    this.autoRecover = opts.autoRecover !== false;
    this.attachMedia = opts.attachMedia !== false;
    this.loadSource = opts.loadSource !== false && !!this.url;
    this.hlsConfig = Object.assign({}, DEFAULT_SEI_HLS_CONFIG, opts.hlsConfig || {});
    this.getVideoElement = typeof opts.getVideoElement === 'function' ? opts.getVideoElement : () => null;
    this.onUserData = opts.onUserData;
    this.onFragBuffered = opts.onFragBuffered;
    this.onMediaAttached = opts.onMediaAttached;
    this.onManifestParsed = opts.onManifestParsed;
    this.onError = opts.onError;
    this.onReconnect = opts.onReconnect;
    this._createInstance = isSeiHlsAvailable() ? (config) => new Hls(config) : null;
    this.instance = null;
    this._handlers = null;
    this._attachTimer = null;
    this._reconnectTimer = null;
    this._reconnectCount = 0;
    this._mediaRecoverCount = 0;
    this._attached = false;
    this._destroyed = false;
  }

  /**
   * @description 是否具备创建 hls 实例的能力。页面未引入 hls.js（全局 `Hls`）或浏览器不支持 MSE 时为 `false`。
   * @returns {boolean}
   */
  isSupported() {
    return !!this._createInstance;
  }

  /**
   * @description 启动拉流。缺少 hls.js 时会回调 onError 并返回 false。
   * @returns {boolean} 是否成功启动。
   */
  start() {
    if (this._destroyed) {
      return false;
    }
    if (!this.instance) {
      if (!this._createInstance) {
        this._reportError({
          fatal: true,
          type: 'otherError',
          details: 'hlsLibraryMissing',
          reason: getSeiUnavailableMessage()
        });
        return false;
      }
      this.instance = this._createInstance(this.hlsConfig);
    }
    this._bindEvents();
    this._attach();
    return true;
  }

  /**
   * @description 直达直播点。hls.js 已给出 `liveSyncPosition` 时优先使用它，否则退化为缓冲末尾。
   * @returns {number|null} 目标时间，单位秒。
   */
  getLiveSyncPosition() {
    if (this.instance && Number.isFinite(this.instance.liveSyncPosition)) {
      return this.instance.liveSyncPosition;
    }
    const video = this.getVideoElement();
    if (video && video.buffered && video.buffered.length) {
      return video.buffered.end(video.buffered.length - 1) - 0.5;
    }
    return null;
  }

  /**
   * @description 当前直播延迟，单位秒。优先取 hls.js 的 `latency`（低延迟模式才有），
   * 取不到时退化为缓冲区末尾与播放头的差值。
   * @returns {number|null}
   */
  getLatency() {
    if (this.instance && Number.isFinite(this.instance.latency)) {
      return this.instance.latency;
    }
    const video = this.getVideoElement();
    if (video && video.buffered && video.buffered.length && Number.isFinite(video.currentTime)) {
      const end = video.buffered.end(video.buffered.length - 1);
      if (Number.isFinite(end)) {
        return Math.max(0, end - video.currentTime);
      }
    }
    return null;
  }

  /**
   * @description 获取底层 hls.js 实例。
   * @returns {Object|null} hls.js 实例，未创建时返回 `null`。
   */
  getHls() {
    return this.instance || null;
  }

  destroy() {
    this._destroyed = true;
    this._stopAttachRetry();
    if (this._reconnectTimer) {
      clearTimeout(this._reconnectTimer);
      this._reconnectTimer = null;
    }
    this._destroyInstance();
    this.instance = null;
  }

  _bindEvents() {
    if (!this.instance || this._handlers) {
      return;
    }
    this._handlers = {
      userData: (event, data) => {
        if (typeof this.onUserData === 'function') {
          this.onUserData(data);
        }
      },
      fragBuffered: (event, data) => {
        if (typeof this.onFragBuffered === 'function') {
          this.onFragBuffered(data);
        }
      },
      mediaAttached: (event, data) => {
        this._attached = true;
        if (typeof this.onMediaAttached === 'function') {
          this.onMediaAttached(data);
        }
      },
      manifestParsed: (event, data) => {
        this._reconnectCount = 0;
        this._mediaRecoverCount = 0;
        if (typeof this.onManifestParsed === 'function') {
          this.onManifestParsed(data);
        }
      },
      error: (event, data) => this._handleError(data)
    };
    this.instance.on(SEI_HLS_EVENTS.FRAG_PARSING_USERDATA, this._handlers.userData);
    this.instance.on(SEI_HLS_EVENTS.FRAG_BUFFERED, this._handlers.fragBuffered);
    this.instance.on(SEI_HLS_EVENTS.MEDIA_ATTACHED, this._handlers.mediaAttached);
    this.instance.on(SEI_HLS_EVENTS.MANIFEST_PARSED, this._handlers.manifestParsed);
    this.instance.on(SEI_HLS_EVENTS.ERROR, this._handlers.error);
  }

  _unbindEvents() {
    const hls = this.instance;
    if (!hls || !this._handlers) {
      this._handlers = null;
      return;
    }
    if (typeof hls.off === 'function') {
      hls.off(SEI_HLS_EVENTS.FRAG_PARSING_USERDATA, this._handlers.userData);
      hls.off(SEI_HLS_EVENTS.FRAG_BUFFERED, this._handlers.fragBuffered);
      hls.off(SEI_HLS_EVENTS.MEDIA_ATTACHED, this._handlers.mediaAttached);
      hls.off(SEI_HLS_EVENTS.MANIFEST_PARSED, this._handlers.manifestParsed);
      hls.off(SEI_HLS_EVENTS.ERROR, this._handlers.error);
    }
    this._handlers = null;
  }

  /**
   * @private
   * @description 挂载 `<video>` 并拉流。video 元素由 VideoMap / VideoLayer 异步创建，这里做有限重试。
   */
  _attach() {
    if (!this.instance || this._destroyed) {
      return;
    }
    const video = this.attachMedia ? this.getVideoElement() : null;
    if (!this.attachMedia || video) {
      this._stopAttachRetry();
      if (video && !this._attached) {
        this.instance.attachMedia(video);
      }
      if (this.loadSource) {
        this.loadSource = false;
        this.instance.loadSource(this.url);
      }
      return;
    }
    if (this._attachTimer) {
      return;
    }
    let tries = 0;
    this._attachTimer = setInterval(() => {
      tries++;
      if (this._destroyed || !this.instance || tries > ATTACH_MAX_TRIES) {
        this._stopAttachRetry();
        return;
      }
      this._attach();
    }, ATTACH_RETRY_INTERVAL);
  }

  _stopAttachRetry() {
    if (this._attachTimer) {
      clearInterval(this._attachTimer);
      this._attachTimer = null;
    }
  }

  _handleError(data) {
    if (typeof this.onError === 'function') {
      this.onError(data);
    }
    if (!data || !data.fatal || !this.autoRecover || this._destroyed || !this.instance) {
      return;
    }
    try {
      if (data.type === HLS_ERROR_TYPES.NETWORK) {
        this.instance.startLoad();
        return;
      }
      if (data.type === HLS_ERROR_TYPES.MEDIA) {
        this._mediaRecoverCount++;
        if (this._mediaRecoverCount <= MAX_MEDIA_RECOVER) {
          this.instance.recoverMediaError();
          return;
        }
        if (typeof this.instance.swapAudioCodec === 'function') {
          this.instance.swapAudioCodec();
        }
      }
    } catch (e) {
      // 实例已不可用，直接重建播放会话
    }
    this._scheduleReconnect();
  }

  _scheduleReconnect() {
    if (this._reconnectTimer || this._destroyed || !this._createInstance) {
      return;
    }
    this._reconnectCount++;
    const delay = Math.min(MAX_RECONNECT_DELAY, Math.pow(2, this._reconnectCount - 1));
    this._reconnectTimer = setTimeout(() => {
      this._reconnectTimer = null;
      if (this._destroyed) {
        return;
      }
      if (typeof this.onReconnect === 'function') {
        this.onReconnect();
      }
      this._destroyInstance();
      this._mediaRecoverCount = 0;
      this.loadSource = !!this.url;
      this.instance = this._createInstance(this.hlsConfig);
      this._bindEvents();
      this._attach();
    }, delay * 1000);
  }

  _destroyInstance() {
    const hls = this.instance;
    this._unbindEvents();
    this._attached = false;
    if (hls && typeof hls.destroy === 'function') {
      try {
        hls.destroy();
      } catch (e) {
        // 已在销毁状态
      }
    }
  }

  _reportError(data) {
    if (typeof this.onError === 'function') {
      this.onError(data);
    }
  }
}
