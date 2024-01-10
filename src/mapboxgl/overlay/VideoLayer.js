/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { VideoLayerRenderer } from '@supermap/iclient-common/overlay/video/VideoLayerRenderer';

/**
 * @class VideoLayer
 * @category  Visualization Video
 * @modulecategory Overlay
 * @param {Object} options - 构造参数。
 * @param {string} [options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("VideoLayer_") 创建专题图层 ID。
 * @param {string} [options.url] - 视频 或 流链接。支持 flv, m3u8 流格式。
 * @param {string} [options.extent] - 视频范围。
 * @extends {mapboxgl.Evented}
 * @usage
 */
export class VideoLayer extends mapboxgl.Evented {

  constructor(options) {
    super();
    var _options = options ? options : {};
    this.options = _options;
    this.url = this.options.url;
    this.extent = this.options.extent;
    this.id = _options.id ? _options.id : CommonUtil.createUniqueID("VideoLayer_");
    this.layerId = this.id + 'outer';
    this.type = 'custom';
    this.renderingMode = '3d';
    this.overlay = true;
  }

  /**
   * @function VideoLayer.prototype.onAdd
   * @description 添加该图层。
   */
  onAdd(map) {
    this.map = map;
    this.renderer = new VideoLayerRenderer({ url: this.url, id: this.layerId });
    this.video = this.renderer.createVideo();
    this.videoDomId = this.renderer.getVideoDom();
    this.video.one('firstplay', () => {
      this.video.play();
    });
    this.video.one('ready', () => {
      this._addVideoLayer(this.map);
    });
    this.video.one('canplay', () => {
      setTimeout(() => {
        map.getSource(this.layerId).play();
      }, 1000);
    });
  }

  render() { }

  _addVideoLayer(map) {
    let url = this.videoDomId || this.url;
    map.addSource(this.layerId, {
      type: 'video',
      urls: [url],
      coordinates: this.extent
    });

    map.addLayer(
      {
        id: this.layerId,
        type: 'raster',
        source: this.layerId
      }
    );
  }

  /**
    * @function VideoLayer.prototype.moveLayer
    * @description 移动图层。
    */
  moveLayer(beforeId) {
    this.map.moveLayer(this.layerId, beforeId);
  }

  /**
   * @function VideoLayer.prototype.setVisibility
   * @description 设置图层可见性。
   * @param {boolean} [visibility] - 是否显示图层。
   */
  setVisibility(visibility) {
    const visible = visibility ? 'visible' : 'none';
    this.map.setLayoutProperty(this.layerId, 'visibility', visible);
  }
}
