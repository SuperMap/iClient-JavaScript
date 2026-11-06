/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import videojs from 'video.js';
import 'flv.js';
import 'videojs-flvjs-es6';
import { VideoPlayerAdapter } from './VideoPlayerAdapter';

/**
 * @private
 * @class VideoLayerRenderer
 * @classdesc Video。
 * @version 11.2.0
 * @param {Object} options - 参数。
 * @param {string} [options.id] - 图层 ID。
 * @param {string} [options.url] - 视频地址。SEI 直播场景下 MediaSource 由 hls.js 接管，可不传。
 * @param {boolean} [options.autoplay =true] - 自动播放。
 * @param {boolean} [options.loop =true] - 循环播放。
 * @param {Object|HTMLVideoElement} [options.player] - 外部播放器（video.js 实例）或 video 元素。传入时不再创建 video.js 容器。
 * @usage
 */

export class VideoLayerRenderer {
  constructor(options = {}) {
    this.options = options;
    this.url = options.url;
    this.layerId = options.id;
    this.autoplay = options.autoplay !== undefined ? options.autoplay : true;
    this.loop = options.loop !== undefined ? options.loop : true;
    this.externalPlayer = options.player || null;
    this.isExternal = false;
  }

  _createVideoElement() {
    let video = document.createElement('video');
    video.id = this.layerId;
    video.className = 'video-js';
    video.style.position = 'fixed';
    video.style.left = '-300%';
    video.setAttribute('crossorigin', 'anonymous');
    document.body.appendChild(video);
  }
  /**
   * @function VideoLayerRenderer.prototype.createVideo
   * @description 创建videojs 实例。
   */
  createVideo() {
    if (this.externalPlayer) {
      this.isExternal = true;
      this.video = VideoPlayerAdapter.wrap(this.externalPlayer);
      return this.video;
    }
    this._createVideoElement();
    let options = this._getVideoOptions();
    this.video = videojs(this.layerId, options, () => { });
    return this.video;
  }

  _getVideoOptions() {
    let options = {
      autoplay: this.autoplay,
      muted: true,
      loop: this.loop
    };
    if (!this.url) {
      // SEI 直播：MediaSource 被 iClient 内部的 hls.js 独占（VHS 不解析 SEI，且同一 <video> 只能挂一个 MSE），
      // 所以这里不配 sources，video.js 只当 UI 外壳
      return options;
    }
    if (this.url.includes('mp4') || this.url.includes('MP4')) {
      options['sources'] = [
        {
          src: this.url,
          type: 'video/mp4'
        }
      ];
    } else if (this.url.includes('flv') || this.url.includes('FLV')) {
      options = {
        loop: this.loop,
        autoplay: this.autoplay,
        muted: true,
        techOrder: ['html5', 'flvjs'],
        flvjs: {
          mediaDataSource: {
            isLive: true,
            cors: true,
            withCredentials: false
          }
        },
        sources: [
          {
            src: this.url,
            type: 'video/x-flv'
          }
        ]
      };
    } else if (this.url.includes('m3u8') || this.url.includes('M3U8')) {
      options['sources'] = [
        {
          src: this.url
        }
      ];
    }
    return options;
  }

  /**
   * @function VideoLayerRenderer.prototype.getVideoDomId
   * @description 获取创建的 video 元素的 DOM id。
   * SEI 直播场景下 url 可为空（MediaSource 由 hls.js 接管），因此这里不再依赖 url 判断。
   */
  getVideoDomId() {
    if (this.url && this.url.includes('flv') && !this.isExternal) {
      let videoWrap = document.querySelector(`#${this.layerId}`);
      if (videoWrap) {
        videoWrap.style.position = 'fixed';
        videoWrap.style.left = '-200%';
      }
      return `${this.layerId}_flvjs_api`;
    }
    const videoElement = this._getVideoElement();
    if (!videoElement) {
      return undefined;
    }
    if (!videoElement.id) {
      videoElement.id = `${this.layerId}_video`;
    }
    return videoElement.id;
  }

  _getVideoElement() {
    const video = this.video;
    if (!video) {
      return null;
    }
    if (typeof video.tech === 'function') {
      const tech = video.tech();
      if (tech && typeof tech.el === 'function') {
        return tech.el();
      }
    }
    if (video.nodeType === 1) {
      return video;
    }
    return null;
  }
}
