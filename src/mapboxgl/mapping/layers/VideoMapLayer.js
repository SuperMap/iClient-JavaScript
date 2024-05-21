import mapboxgl from 'mapbox-gl';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { VideoLayerRenderer } from '@supermap/iclient-common/overlay/video/VideoLayerRenderer';

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
   * @param {string} address - 视频地址。
   */
  add(address) {
    this.address = address;
    if (!this.address) {
      return;
    }
    this.renderer = new VideoLayerRenderer({ url: this.address, id: this.id });
    this.video = this.renderer.createVideo();
    this.videoDomId = this.renderer.getVideoDomId();
    this.video.one('firstplay', () => {
      if (this.autoplay) {
        this.play();
      }
    });
    this.video.one('ready', () => {
      setTimeout(() => {
        this.videoWidth = this.video.videoWidth();
        this.videoHeight = this.video.videoHeight();
        this._addVideoLayer(this.map);
      }, 1000);
    });
    this.video.one('canplay', () => {
      setTimeout(() => {
        this.map.getSource(this.id).play();
      }, 1500);
    });
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
    this.fire('loaded', {
      originCoordsRightBottom: this.originCoordsRightBottom,
      originCoordsLeftTop: this.originCoordsLeftTop,
      videoWidth: this.videoWidth,
      videoHeight: this.videoHeight
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
    return coords;
  }
  /**
   * @function VideoMapLayer.prototype.play
   * @description  播放视频。
   */
  play() {
    this.video.play();
  }
  /**
   * @function VideoMapLayer.prototype.pause
   * @description  暂停视频。
   */
  pause() {
    this.video.pause();
  }
  /**
   * @function VideoMapLayer.prototype.remove
   * @description  移除视频图层。
   */
  remove() {
    if (this.id) {
      this.map.removeLayer(this.id);
      this.map.removeSource(this.id);
      document.body.removeChild(document.getElementById(this.id));
    }
  }
}