/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { VideoLayerRenderer } from '@supermap/iclient-common/overlay/video/VideoLayerRenderer';
import { bbox, polygon } from '@turf/turf';

/**
 * @class VideoLayer
 * @category  Visualization Video
 * @modulecategory Overlay
 * @param {Object} options - 构造参数。
 * @param {string} options.url - 视频 或 流链接。支持 flv, m3u8 流格式。
 * @param {Array} options.extent - 视频范围。
 * @param {string} [options.id] - 视频图层 ID。默认使用 CommonUtil.createUniqueID("VideoLayer_") 创建专题图层 ID。
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
    this.cv = this.options.opencv || window.cv;
    if (!this.cv) {
      throw new Error('opencv.js is not existed!');
    }
    this.id = _options.id ? _options.id : CommonUtil.createUniqueID("VideoLayer_");
    this.layerId = this.id + '_outer';
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
     setTimeout(() => {
      this.videoWidth = this.video.videoWidth();
      this.videoHeight = this.video.videoHeight();
      this._addVideoLayer(this.map);
     }, 1000);
    });
    this.video.one('canplay', () => {
      setTimeout(() => {
        map.getSource(this.layerId).play();
      }, 1000);
    });
  }

  render() {}

  getPixelBbox(map) {
    let res = [];
    let minX = 0;
    let minY = 0;
    this.extent.forEach((item) => {
      let result = map.project(item);
      if (!minX || result.x < minX) {
        minX = result.x;
      }
      if (!minY || result.y < minY) {
        minY = result.y;
      }
      res.push(result.x);
      res.push(result.y);
    });
    res = res.map((item, index) => {
      if (index % 2 === 0) {
        return item - minX;
      } else {
        return item - minY;
      }
    });
    return res;
  }

  _addVideoLayer(map) {
    let url = this.videoDomId || this.url;
    this.pixelBBox = this.getPixelBbox(map);
    const result = bbox(polygon([
      this.extent.concat(this.extent[0])
    ]));
    let br = map.project([result[2], result[3]]);
    let tl = map.project([result[0], result[1]]);
    let size = [Math.abs(br.x - tl.x), Math.abs(br.y - tl.y)];
    let ratio = size[0] / size[1];
    let realX = this.videoHeight * ratio;
    let realY = this.videoHeight;
    let ratioX = realX / size[0];
    let ratioY = realY / size[1];
    this.pixelBBox = this.pixelBBox.map((item, index) => {
      if (index % 2 === 0) {
        return item * ratioX;
      } else {
        return item * ratioY;
      }
    });
    this.dsize = new this.cv.Size(this.videoHeight * ratio, this.videoHeight);
    let that = this;
    let srcTri = this.cv.matFromArray(4, 1, this.cv.CV_32FC2, [0, 0, that.videoWidth, 0, that.videoWidth, that.videoHeight, 0, that.videoHeight]);
    let dstTri = this.cv.matFromArray(4, 1, this.cv.CV_32FC2, this.pixelBBox);
    map.addSource(this.layerId, {
      type: 'video',
      urls: [url],
      drawImageCallback(frame) {
        let src = that.cv.matFromImageData(frame);
        let dst = new that.cv.Mat();
        let M = that.cv.findHomography(srcTri, dstTri);
        that.cv.warpPerspective(src, dst, M, that.dsize);
        let newFrame = new ImageData(new Uint8ClampedArray(dst.data), dst.cols, dst.rows);
        src.delete();
        dst.delete();
        return newFrame;
      },
      coordinates: [
        [result[0], result[3]],
        [result[2], result[3]],
        [result[2], result[1]],
        [result[0], result[1]]
      ]
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
