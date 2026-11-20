import mapboxgl from 'mapbox-gl';
import { Util as CommonUtil } from '@supermapgis/iclient-common/commontypes/Util';
import { VideoLayerRenderer } from '@supermapgis/iclient-common/overlay/video/VideoLayerRenderer';
import { silencePlayRejection, getVideoElement } from '@supermapgis/iclient-common/overlay/video/VideoPlayerAdapter';

/**
 * @class VideoMapLayer
 * @classdesc 视频图层类
 * @private
 * @version 11.2.0
 * @param {Object} videoMap - 视频地图实例
 * @param {boolean} autoplay - 是否自动播放
 * @param {boolean} loop - 是否循环播放
 * @extends {mapboxgl.Evented}
 */

export default class VideoMapLayer extends mapboxgl.Evented {
  constructor(videoMap) {
    super();
    this.id = CommonUtil.createUniqueID('videoLayer_');
    this.videoMap = videoMap;
    this.loop = this.videoMap.loop;
    this.autoplay = this.videoMap.autoplay;
    this.map = this.videoMap.map;
  }
  /**
   * @function VideoMapLayer.prototype.add
   * @description  添加视频图层。
   * @param {string} [address] - 视频地址。SEI 直播场景下不传，由内部 hls.js 接管 MediaSource。
   */
  add(address) {
    this.address = address;
    const needsVideoElementOnly = !!this.videoMap && this.videoMap.parametersSource === 'SEI';
    if (!this.address && !this.videoMap.player && !needsVideoElementOnly) {
      return;
    }
    this.renderer = new VideoLayerRenderer({
      url: this.address,
      player: this.videoMap.player,
      id: this.id,
      loop: this.loop,
      autoplay: this.autoplay
    });
    this.video = this.renderer.createVideo();
    this.videoDomId = this.renderer.getVideoDomId();
    this._bindPlaybackEvents();
    this.video.one('firstplay', () => {
      if (this.autoplay) {
        this.play();
      }
    });
    this._cancelVideoReady = this.renderer.onVideoReady(() => {
      this._onVideoReady();
    });
  }

  _onVideoReady() {
    if (this._videoReady) {
      return;
    }
    const width = this.video.videoWidth();
    const height = this.video.videoHeight();
    if (!width || !height) {
      return;
    }
    this._videoReady = true;
    this.videoWidth = width;
    this.videoHeight = height;
    this.videoDomId = this.videoDomId || this.renderer.getVideoDomId();
    this._addVideoLayer(this.map);
  }

  _createVideoElement() {
    let video = document.createElement('video');
    video.id = this.id;
    video.className = 'video-js';
    video.style.width = 0;
    video.style.height = 0;
    video.style.visibility = 'hidden';
    video.style.display = 'none';
    video.setAttribute('crossorigin', 'anonymous');
    document.body.appendChild(video);
  }

  _addVideoLayer(map) {
    if (map && map.getSource(this.id)) {
      return;
    }
    let videoBounds = this._calcCoords(this.videoMap);
    const videoBoundsFormat = videoBounds.map((obj) => {
      return [obj.lng, obj.lat];
    });
    let url = this.videoDomId;
    map.addSource(this.id, {
      type: 'video',
      urls: [url],
      coordinates: videoBoundsFormat
    });

    if (map.getStyle().layers.length >= 1) {
      this.beforeLayerId = map.getStyle().layers[0].id;
    }
    map.addLayer(
      {
        id: this.id,
        type: 'raster',
        source: this.id
      },
      this.beforeLayerId
    );
    this.map.fitBounds([videoBounds[1], videoBounds[3]]);
    this._afterAddVideoLayer();
  }

  _afterAddVideoLayer() {
    if (this.autoplay) {
      this.play();
    }
    this._bindTimeUpdates();
    this.fire('loaded', {
      originCoordsRightBottom: this.originCoordsRightBottom,
      originCoordsLeftTop: this.originCoordsLeftTop,
      originCoordinates: this.originCoordinates,
      videoWidth: this.videoWidth,
      videoHeight: this.videoHeight
    });
  }

  _bindTimeUpdates() {
    const videoElement = getVideoElement(this.video);
    if (!videoElement) {
      return;
    }
    this._statsStartTime = performance.now();
    this._statsFrameCount = 0;
    this._statsLastMediaTime = 0;
    const video = this.video;
    if (videoElement.requestVideoFrameCallback) {
      const update = (now, metadata) => {
        if (this.video !== video) {
          return;
        }
        this._statsFrameCount++;
        this._statsLastMediaTime = metadata.mediaTime;
        this.fire('timeupdate', { time: metadata.mediaTime });
        if (this.video !== video) {
          return;
        }
        if (this._statsFrameCount % 30 === 0) {
          this._fireVideoStats(videoElement, metadata.mediaTime);
        }
        // timeupdate 的业务监听可能移除地图，不能在回调结束后重新启动帧循环。
        if (this.video === video) {
          this.frameCallbackId = videoElement.requestVideoFrameCallback(update);
        }
      };
      this.frameCallbackId = videoElement.requestVideoFrameCallback(update);
    } else {
      this.timeUpdateHandler = () => {
        if (this.video !== video) {
          return;
        }
        this._statsFrameCount++;
        this._statsLastMediaTime = video.currentTime();
        this.fire('timeupdate', { time: this._statsLastMediaTime });
        if (this.video !== video) {
          return;
        }
        if (this._statsFrameCount % 30 === 0) {
          this._fireVideoStats(videoElement, this._statsLastMediaTime);
        }
      };
      this.video.on('timeupdate', this.timeUpdateHandler);
    }
  }

  _fireVideoStats(videoElement, mediaTime) {
    const elapsed = (performance.now() - this._statsStartTime) / 1000;
    const quality = videoElement.getVideoPlaybackQuality ? videoElement.getVideoPlaybackQuality() : null;
    this.fire('videostats', {
      mediaTime,
      decodedFrames: quality ? quality.totalVideoFrames : videoElement.webkitDecodedFrameCount,
      droppedFrames: quality ? quality.droppedVideoFrames : videoElement.webkitDroppedFrameCount,
      measuredFps: elapsed ? this._statsFrameCount / elapsed : 0,
      videoWidth: this.videoWidth,
      videoHeight: this.videoHeight,
      duration: this.video.duration()
    });
  }

  _calcCoords(videoMap) {
    const { width, height, videoHeight, videoWidth } = videoMap;
    const calcWidth = videoWidth || this.videoWidth;
    const calcHeight = videoHeight || this.videoHeight;
    let ratioX = calcWidth / width;
    let ratioY = calcHeight / height;
    let ratio = Math.min(ratioX, ratioY);
    let realWidth = calcWidth / ratio;
    let realHeight = calcHeight / ratio;
    let center = { x: width / 2, y: height / 2 };
    let cx = realWidth / 2;
    let cy = realHeight / 2;
    let pos = [
      [center.x - cx, center.y - cy],
      [center.x + cx, center.y - cy],
      [center.x + cx, center.y + cy],
      [center.x - cx, center.y + cy]
    ];
    let coords = pos.map((coord) => {
      return this.map.unproject(coord);
    });
    this.originCoordsLeftTop = coords[0];
    this.originCoordsRightBottom = coords[2];
    this.originCoordinates = coords;
    return coords;
  }
  /**
   * @function VideoMapLayer.prototype.play
   * @description  播放视频。
   * @returns {Promise|undefined} 播放 Promise，自动播放被浏览器拦截时以 `NotAllowedError` 拒绝；播放器尚未创建时返回 `undefined`。
   */
  play() {
    let promise;
    if (this.video && typeof this.video.play === 'function') {
      promise = this.video.play();
    }
    const source = this._getVideoSource();
    if (source && typeof source.play === 'function') {
      source.play();
    }
    return silencePlayRejection(promise);
  }
  /**
   * @function VideoMapLayer.prototype.pause
   * @description  暂停视频。
   */
  pause() {
    if (this.video && typeof this.video.pause === 'function') {
      this.video.pause();
    }
    const source = this._getVideoSource();
    if (source && typeof source.pause === 'function') {
      source.pause();
    }
  }
  /**
   * @function VideoMapLayer.prototype.paused
   * @description  获取视频是否处于暂停状态。
   * @returns {boolean} 视频是否暂停。
   */
  paused() {
    if (this.video && typeof this.video.paused === 'function') {
      return this.video.paused();
    }
    return true;
  }
  _bindPlaybackEvents() {
    if (!this.video) {
      return;
    }
    this.video.on('play', () => {
      this.fire('play');
    });
    this.video.on('pause', () => {
      this.fire('pause');
    });
  }
  _getVideoSource() {
    if (!this.map || !this.id || typeof this.map.getSource !== 'function') {
      return null;
    }
    return this.map.getSource(this.id) || null;
  }
  /**
   * @function VideoMapLayer.prototype.remove
   * @description  移除视频图层。
   */
  remove() {
    if (this._cancelVideoReady) {
      this._cancelVideoReady();
    }
    if (this.id) {
      const videoElement = getVideoElement(this.video);
      if (videoElement && this.frameCallbackId && videoElement.cancelVideoFrameCallback) {
        videoElement.cancelVideoFrameCallback(this.frameCallbackId);
      }
      if (this.timeUpdateHandler && this.video) {
        this.video.off('timeupdate', this.timeUpdateHandler);
      }
      // 适配器仅解绑外部播放器监听，自建 video.js 播放器则完整销毁。
      if (this.video && typeof this.video.dispose === 'function') {
        this.video.dispose();
      }
      if (!this.renderer || !this.renderer.isExternal) {
        const wrapper = document.getElementById(this.id);
        if (wrapper && wrapper.parentNode) {
          wrapper.parentNode.removeChild(wrapper);
        }
      }
      if (this.map && this.map.getLayer && this.map.getLayer(this.id)) {
        this.map.removeLayer(this.id);
      }
      if (this.map && this.map.getSource && this.map.getSource(this.id)) {
        this.map.removeSource(this.id);
      }
    }
    this.video = null;
    this.renderer = null;
    this.frameCallbackId = null;
    this.timeUpdateHandler = null;
    this._videoReady = false;
  }
}
