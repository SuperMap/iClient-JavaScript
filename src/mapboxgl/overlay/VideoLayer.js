/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import mapboxgl from 'mapbox-gl';
 import { Util as CommonUtil } from '@supermapgis/iclient-common/commontypes/Util';
 import { VideoLayerRenderer } from '@supermapgis/iclient-common/overlay/video/VideoLayerRenderer';
 import { bbox, polygon } from '@turf/turf';
 import CoordTransfer from '../mapping/CoordTransfer';
 import { fovXToFx, fovYToFy, smartTimeProcessor, FastRangeSearcher } from '../mapping/utils/VideoMapUtil';
 import proj4 from 'proj4';
 
 /**
  * @typedef {Object} VideoLayer.VideoParameters - 视频配准参数。
  * @property {number} pitch - 俯仰角。
  * @property {number} roll - 侧偏角。
  * @property {number} yaw - 偏航角。
  * @property {number} x - 视频 x 坐标。
  * @property {number} y - 视频 y 坐标。
  * @property {number} z - 视频 z 坐标。
  * @property {number} fovX - 水平方向上以像素为单位的焦距。
  * @property {number} fovY - 垂直方向上以像素为单位的焦距。
  * @property {number} centerX - 相机中心的水平坐标。
  * @property {number} centerY - 相机中心的垂直坐标。
  */
 
 /**
   * @typedef {Object} VideoLayer.VideoTimeParameters - 按时间播放时的视频配准参数。
   * @property {number} pitch - 俯仰角。
   * @property {number} roll - 侧偏角。
   * @property {number} yaw - 偏航角。
   * @property {number} x - 视频 x 坐标。
   * @property {number} y - 视频 y 坐标。
   * @property {number} z - 视频 z 坐标。
   * @property {number} fovX - 水平方向上以像素为单位的焦距。
   * @property {number} fovY - 垂直方向上以像素为单位的焦距。
   * @property {number} centerX - 相机中心的水平坐标。
   * @property {number} centerY - 相机中心的垂直坐标。
   * @property {number} time - 视频时间，单位秒。
   * @property {Array} extent - 视频范围。
  */
 
 /**
  * @class VideoLayer
  * @category  Visualization Video
  * @classdesc 视频图层，用于将配准后的视频、视频流（HLS(m3u8)、HTTP-FLV）叠加至地图上。
  * @modulecategory Overlay
  * @version 11.2.0
  * @param {Object} options - 构造参数。
  * @param {string} options.url - 视频 或 流链接。支持 flv, m3u8, map4 格式。
  * @param {VideoLayer.VideoParameters|Array<VideoLayer.VideoTimeParameters>} options.videoParameters - 视频配准参数，当传入类型为数组时，支持非定点视频。
  * @param {Array} [options.extent] - 视频范围。
  * @param {Object} [options.opencv] - opencv.js 实例, 未传入时将去 window.cv 获取。
  * @param {number} [options.interval=0.1] 非定点视频参数间隔，单位秒，当视频参数为数组时，会根据该参数将 VideoTimeParameters.time 处理成均匀间隔的视频参数，默认为 0.1 秒，最小值为 0.001 秒。
  * @param {string} [options.id] - 视频图层 ID。默认使用 CommonUtil.createUniqueID("VideoLayer_") 创建专题图层 ID。
  * @param {Array} [options.clipRegion] -裁剪范围
  * @extends {mapboxgl.Evented}
  * @usage
  * ```
  * // 浏览器
  * <script type="text/javascript" src="{cdn}"></script>
  * <script type="text/javascript" src="https://iclient.supermap.io/web/libs/opencv/3.4/opencv.js"></script>
  * <script>
  *   new {namespace}.VideoLayer(options);
  * 
  * </script>
  *
  *  // ES6 Import
  * import { VideoLayer } from "{npm}";
  * // 将上面 opencv 源码拷贝到本地路径引用
  * options.opencv = "your opencv path";
  * new VideoLayer(options);
  * ```
  */
 export class VideoLayer extends mapboxgl.Evented {
 
   constructor(options) {
     super();
     var _options = options ? options : {};
     this.options = _options;
     this.url = this.options.url;
     this.extent = this.options.extent;
     this.clipRegion = this.options.clipRegion || [];
     this.videoParameters = this.options.videoParameters;
     this.interval = this.options.interval || 0.1;
     this.cv = this.options.opencv || window.cv;
     if (!this.cv) {
       throw new Error('opencv.js instance is not existed!');
     }
     if (!this.videoParameters) {
       throw new Error('videoParameters must be set!');
     }
 
     this.id = _options.id ? _options.id : CommonUtil.createUniqueID("VideoLayer_");
     this.layerId = this.id + '_outer';
     this.type = 'custom';
     this.renderingMode = '3d';
     this.overlay = true;
     if (Array.isArray(this.videoParameters)) {
       this.videoParameters = smartTimeProcessor(this.interval, this.videoParameters, ['yaw', 'pitch', 'roll', 'x', 'y', 'z', 'extent']);
       const timeArr = this.videoParameters.map((item) => {
         return item.time;
       })
       this.finder = new FastRangeSearcher(timeArr);
     }
   }
 
   /**
    * @function VideoLayer.prototype.onAdd
    * @description 添加该图层。
    * @param {mapboxgl.Map} map - 地图实例。
    */
   onAdd(map) {
     this.map = map;
     this.renderer = new VideoLayerRenderer({ url: this.url, id: this.layerId });
     this.video = this.renderer.createVideo();
     this.videoDomId = this.renderer.getVideoDomId();
 
     this.video.one('firstplay', () => {
       this.video.play();
     });
     this.video.one('canplay', () => {
       this.videoWidth = this.video.videoWidth();
       this.videoHeight = this.video.videoHeight();
       if (!Array.isArray(this.videoParameters)) {
         this.videoParameters = [this.videoParameters];
       }
       this._initParameters(this.videoParameters[0]).then((coordTransfer) => {
         this.coordTransfer = coordTransfer;
         this.timeParams = {};
         this.videoParameters.forEach((dataItem) => {
           const { pitch, roll, yaw, x, y, z, fovX, fovY, centerX, centerY } = dataItem;
           const time = dataItem.time || 0;
           this.timeParams[time] = {}
           let fx = fovXToFx(fovX, this.videoWidth);
           let fy = fovYToFy(fovY, this.videoHeight);
           this.coordTransfer.setCameraLocation({
             pitch, roll, yaw, x, y, z, fx, fy, centerX, centerY
           });
           const extent = dataItem.extent || this.extent;
           const formatExtent = extent.map((item) => {
             if (Array.isArray(item)) {
               return item;
             }
             return [item.x, item.y];
           });
           const poly = polygon([
             [...formatExtent, formatExtent[0]]
           ]);
           const result = bbox(poly);
           this.timeParams[time].result = result;
           let latlng = [];
           this.timeParams[time].allContained = true;
           let that = this;
           let temp = [[0, 0], [that.videoWidth, 0], [that.videoWidth, that.videoHeight], [0, that.videoHeight]];
           let realHeight = this.videoHeight;
           if (this.clipRegion.length) {
             temp = this.clipRegion;
             realHeight = this.clipRegion[2][1] - this.clipRegion[0][1];
           }
           this.timeParams[time].realHeight = realHeight;
           temp.forEach((point) => {
             let coord = this.coordTransfer.toSpatialCoordinate(point);
             let tcoord = [coord[0], coord[1]];
             const pcoord = proj4('EPSG:3857', 'EPSG:4326', tcoord);
             if (!this._contain(pcoord, result)) {
               this.timeParams[time].allContained = false;
             }
             latlng.push(pcoord);
           });
           let originBounds = [];
           formatExtent.forEach((coord) => {
             let res = map.project(coord);
             originBounds.push(res.x);
             originBounds.push(res.y);
           });
           this.timeParams[time].extent = formatExtent;
           let pointCoords = []
           latlng.forEach((item) => {
             let result = map.project(item);
             pointCoords.push(result.x);
             pointCoords.push(result.y);
           });
           let br = map.project([result[2], result[3]]);
           let tl = map.project([result[0], result[1]]);
           let size = [Math.abs(br.x - tl.x), Math.abs(br.y - tl.y)];
           let ratio = size[0] / size[1];
           this.timeParams[time].ratio = ratio;
           this.timeParams[time].dsize = new this.cv.Size(realHeight * ratio, realHeight);
           let realX = realHeight * ratio;
           let realY = realHeight;
           let ratioX = realX / size[0];
           let ratioY = realY / size[1];
           let realRatio = Math.min(ratioX, ratioY);
           pointCoords = this._getPixelBbox(pointCoords, result, this.timeParams[time].allContained);
           pointCoords = pointCoords.map((item) => {
             return item * realRatio;
           });
           originBounds = this._getPixelBbox(originBounds);
           this.timeParams[time].originBounds = originBounds.map((item) => {
             return item * realRatio;
           });
           let dstTri = this.cv.matFromArray(4, 1, this.cv.CV_32FC2, pointCoords);
           this.timeParams[time].dstTri = dstTri;
         })
         this._addVideoLayer(this.map);
       })
     });
   }
 
   render() { }
 
   _getPixelBbox(bounds, bbox, allContained = true) {
     let minX = 0;
     let minY = 0;
     bounds.forEach((item, index) => {
       if ((!minX || item < minX) && index % 2 === 0) {
         minX = item;
       }
       if ((!minY || item < minY) && index % 2 !== 0) {
         minY = item;
       }
     });
     let maxX = 0;
     let maxY = 0;
     if (bbox && !allContained) {
       let pixelLeftBottom = this.map.project([bbox[0], bbox[1]]);
       let pixelRightTop = this.map.project([bbox[2], bbox[3]]);
       maxX = Math.min(Math.abs(minX - pixelLeftBottom.x), Math.abs(minX - pixelRightTop.x));
       maxY = Math.max(Math.abs(minY - pixelLeftBottom.y), Math.abs(minY - pixelRightTop.y));
     }
     bounds = bounds.map((item, index) => {
       if (index % 2 === 0) {
         return item - minX - maxX;
       } else {
         return item - minY + maxY;
       }
     });
     return bounds;
   }
 
   _initParameters(parameters) {
     if (parameters && !Object.keys(parameters).length) {
       return;
     }
     parameters.fx = fovXToFx(parameters.fovX, this.videoWidth);
     parameters.fy = fovYToFy(parameters.fovY, this.videoHeight);
     return new CoordTransfer(this.cv, parameters).init();
   }
 
   _addVideoLayer(map) {
     let url = this.videoDomId || this.url;
     const extent = this.extent || this.timeParams[0].extent;
     const poly = polygon([
       [...extent, extent[0]]
     ]);
     let result = bbox(poly);
     let that = this;
     let srcPixelCoords = [0, 0, that.videoWidth, 0, that.videoWidth, that.videoHeight, 0, that.videoHeight];
     if (this.clipRegion.length) {
       srcPixelCoords = [];
       this.clipRegion.forEach((coord) => {
         srcPixelCoords.push(coord[0]);
         srcPixelCoords.push(coord[1]);
       });
     }
     let srcTri = this.cv.matFromArray(4, 1, this.cv.CV_32FC2,
       srcPixelCoords
     );
     that.dsize = that.timeParams[0].dsize;
     let dstTri = that.timeParams[0].dstTri;
     let canvas = document.createElement('canvas');
     let { clipMat, dst1 } = this._updateMask(canvas, that.timeParams[0].realHeight, that.timeParams[0].ratio);
     let count = 0;
     const videoEle = this.video.tech().el();
     let current = 0;
     if (this.videoParameters.length > 1 && videoEle && videoEle.requestVideoFrameCallback) {
       const updateCanvas = (now, metadata) => {
         current = metadata.mediaTime;
         videoEle.requestVideoFrameCallback(updateCanvas);
       };
 
       videoEle.requestVideoFrameCallback(updateCanvas);
     }
     map.addSource(this.layerId, {
       type: 'video',
       urls: [url],
       drawImageCallback(frame) {
         if (that.videoParameters.length > 1) {
           let time = current || that.video.currentTime();
           let res = that.finder.findNearest(time);
           if (res) {
             count = res.value;
           }
 
           if (count) {
             let curData = that.timeParams[count];
             count = 0;
             if (curData) {
               that.dsize = curData.dsize;
               dstTri = curData.dstTri;
               result = curData.result;
               setTimeout(() => {
                 that.map.getSource(that.layerId).setCoordinates([
                   [result[0], result[3]],
                   [result[2], result[3]],
                   [result[2], result[1]],
                   [result[0], result[1]]
                 ])
               }, 0);
             }
           }
         }
         let src = that.cv.matFromImageData(frame);
         let dst = new that.cv.Mat();
         let M = that.cv.findHomography(srcTri, dstTri);
         that.cv.warpPerspective(src, dst, M, that.dsize);
         let newFrame;
         if (that.timeParams[count].allContained) {
           newFrame = new ImageData(new Uint8ClampedArray(dst.data), dst.cols, dst.rows);
         } else {
           if (that.videoParameters.length > 1) {
             const res = that._updateMask(canvas, that.timeParams[0].realHeight, that.timeParams[0].ratio);
             clipMat = res.clipMat;
             dst1 = res.dst1;
           }
           dst.copyTo(dst1, clipMat);
           newFrame = new ImageData(new Uint8ClampedArray(dst1.data), dst1.cols, dst1.rows);
         }
         src.delete();
         dst.delete();
         M.delete();
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
         source: this.layerId,
         paint: {
           'raster-fade-duration': 0
         }
       }
     );
     const source = map.getSource(this.layerId);
     if (source) {
       source.play();
     }
   }
 
   _updateMask(canvas, realHeight, ratio) {
     canvas.width = realHeight * ratio;
     canvas.height = realHeight;
     let context = canvas.getContext('2d');
     context.beginPath();
     this.timeParams[0].originBounds.forEach((coord, index) => {
       if (index === 0) {
         context.moveTo(coord, this.timeParams[0].originBounds[index + 1]);
       }
       if (index % 2 === 0) {
         context.lineTo(coord, this.timeParams[0].originBounds[index + 1]);
       }
     });
     context.closePath();
     context.fillStyle = '#ffffff';
     context.fill();
     let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
     let clipMat = this.cv.matFromImageData(imgData);
     let dst1 = new this.cv.Mat();
     return { clipMat, dst1 };
   }
 
   _contain(coord, bounds) {
     return coord[0] >= bounds[0] && coord[0] <= bounds[2] && coord[1] >= bounds[1] && coord[1] <= bounds[3];
   }
 
   /**
     * @function VideoLayer.prototype.moveLayer
     * @description 移动图层。
     * @param {string} beforeId - 要移动到的图层前的 id。
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
 