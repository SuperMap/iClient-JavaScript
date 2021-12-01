import mapboxgl from 'mapbox-gl';
import { CommonUtil } from '@supermap/iclient-common';
import videojs from 'video.js';
import 'flv.js';
import 'videojs-flvjs-es6';

/**
 * @class SuperMap.VideoLayer
 * @classdesc 视频图层类
 * @param {Object} videoMap - 视频地图实例
 * @param {boolean} autoplay - 是否自动播放
 * @param {boolean} loop - 是否循环播放
 * @extends {mapboxgl.Evented}
 */

export default class VideoLayer extends mapboxgl.Evented {
  constructor(videoMap) {
    super();
    this.id = CommonUtil.createUniqueID('videoLayer_');
    this.videoMap = videoMap;
    this.loop = this.videoMap.loop;
    this.autoplay = this.videoMap.autoplay;
    this.map = this.videoMap.map;
    this._playFn = this._play.bind(this);
    this.timer = null;
  }
  /**
   * @function SuperMap.VideoLayer.prototype.add
   * @description  添加视频图层。
   * @param {string} address - 视频地址。
   */
  add(address) {
    this.address = address;
    if (!this.address) {
      return;
    }
    this.video = this._createVideo();
    console.log('this.video', this.video);
    this.videoDomId = this._getVideoDom();
    this.video.one('firstplay', () => {
      if (this.autoplay) {
        this.play();
      }
    });
    this.video.on('canplay', () => {
      setTimeout(() => {
        this._addVideoLayer(this.map);
      }, 1000);
    });
  }

  _createVideo() {
    this._createVideoElement();
    let options = this._getVideoOptions();
    return videojs(this.id, options);
  }

  _getVideoOptions() {
    let options = {};
    options.autoplay = this.autoplay;
    options.loop = this.loop !== false;
    if (this.address.includes('mp4')) {
      options['sources'] = [
        {
          src: this.address,
          type: 'video/mp4'
        }
      ];
    } else if (this.address.includes('flv')) {
      options = {
        autoplay: 'muted',
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
            src: this.address,
            type: 'video/x-flv'
          }
        ]
      };
    } else if (this.address.includes('m3u8')) {
      options['sources'] = [
        {
          src: this.address
        }
      ];
    }
    return options;
  }

  _getVideoDom() {
    let videoDomId;
    if (this.address.includes('flv')) {
      let videoWrap = document.querySelector(`#${this.id}`);
      videoDomId = `${this.id}_flvjs_api`;
      videoWrap.style.position = 'fixed';
      videoWrap.style.left = '-200%';
    } else {
      videoDomId = this.video.el_.firstChild.id;
    }
    return videoDomId;
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
    let url = this.videoDomId || this.address;
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
    this.fire('videolayeradded', {
      originCoordsRightBottom: this.originCoordsRightBottom,
      originCoordsLeftTop: this.originCoordsLeftTop
    });
  }

  _calcCoords(videoMap) {
    const { width, height, videoHeight, videoWidth } = videoMap;
    let ratioX = videoWidth / width;
    let ratioY = videoHeight / height;
    let ratio = Math.min(ratioX, ratioY);
    let realWidth = videoWidth / ratio;
    let realHeight = videoHeight / ratio;
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
    this.originCoordsLeftTop = coords[0]; // 对象
    this.originCoordsRightBottom = coords[2];
    return coords;
  }
  /**
   * @function SuperMap.VideoLayer.prototype.play
   * @description  播放视频。
   */
  play() {
    this._pause();
    this.video.play();
    this._play();
  }
  /**
   * @function SuperMap.VideoLayer.prototype.pause
   * @description  暂停视频。
   */
  pause() {
    this.video.pause();
    this._pause();
  }
  /**
   * @function SuperMap.VideoLayer.prototype.remove
   * @description  移除视频图层。
   */
  remove() {
    if (this.id) {
      this.map.removeLayer(this.id);
      this.map.removeSource(this.id);
      document.body.removeChild(document.getElementById(this.id));
      this._pause();
    }
  }

  _play() {
    let time = this.video.currentTime();
    this.fire('timeupdate', { time });
    this.timer = requestAnimationFrame(this._playFn);
  }

  _pause() {
    if (this.timer) {
      cancelAnimationFrame(this.timer);
      this.timer = null;
    }
  }
}
