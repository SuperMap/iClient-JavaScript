/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import videojs from 'video.js';
import 'flv.js';
import 'videojs-flvjs-es6';

/**
 * @private
 * @class VideoLayerRenderer
 * @classdesc Video。
 * @version 11.2.0
 * @param {Object} options - 参数。
 * @param {string} [options.id] - 图层 ID。
 * @param {string} [options.url] - 视频地址。
 * @usage
 */

export class VideoLayerRenderer {
  constructor(options = {}) {
    this.options = options;
    this.url = options.url;
    this.layerId = options.id;
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
    this._createVideoElement();
    let options = this._getVideoOptions();
    this.video = videojs(this.layerId, options, () => { });
    return this.video;
  }

  _getVideoOptions() {
    if (!this.url) {
      return;
    }
    let options = {
      autoplay: true,
      muted: true
    };
    options.loop = this.loop !== false;
    if (this.url.includes('mp4')) {
      options['sources'] = [
        {
          src: this.url,
          type: 'video/mp4'
        }
      ];
    } else if (this.url.includes('flv')) {
      options = {
        autoplay: this.autoplay,
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
    } else if (this.url.includes('m3u8')) {
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
   */
  getVideoDomId() {
    if (!this.url) {
      return;
    }
    let videoDomId;
    if (this.url.includes('flv')) {
      let videoWrap = document.querySelector(`#${this.layerId}`);
      videoDomId = `${this.layerId}_flvjs_api`;
      videoWrap.style.position = 'fixed';
      videoWrap.style.left = '-200%';
    } else {
      videoDomId = this.video.el_.firstChild.id;
    }
    return videoDomId;
  }
}
