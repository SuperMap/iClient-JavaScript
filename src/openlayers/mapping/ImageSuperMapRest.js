/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SecurityManager } from '@supermap/iclient-common/security/SecurityManager';
import { Unit } from '@supermap/iclient-common/REST';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { ServerGeometry } from '@supermap/iclient-common/iServer/ServerGeometry';
import { Util } from '../core/Util';
import ImageSource, { defaultImageLoadFunction } from 'ol/source/Image';
import ImageWrapper from 'ol/Image';
import Geometry from 'ol/geom/Geometry';
import GeoJSON from 'ol/format/GeoJSON';
import { containsExtent, getCenter, getHeight, getWidth, getForViewAndSize } from 'ol/extent';

/**
 * @class ImageSuperMapRest
 * @browsernamespace ol.source
 * @category iServer Map Tile
 * @classdesc SuperMap iServer Image 图层源。
 * @param {Object} options - 参数。
 * @param {string} options.url - 地图服务地址,例如: http://{ip}:{port}/iserver/services/map-world/rest/maps/World。
 * @param {ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务类型 ISERVER|IPORTAL|ONLINE。
 * @param {boolean} [options.redirect=false] - 是否重定向。
 * @param {boolean} [options.transparent=true] - 瓦片是否透明。
 * @param {boolean} [options.antialias=false] - 是否反走样地图。
 * @param {boolean} [options.cacheEnabled=true] - 是否使用服务端的缓存，true 表示使用服务端的缓存。
 * @param {Object} [options.prjCoordSys] - 请求的地图的坐标参考系统。当此参数设置的坐标系统不同于地图的原有坐标系统时，系统会进行动态投影，并返回动态投影后的地图瓦片。例如：{"epsgCode":3857}。
 * @param {string} [options.layersID] - 获取进行切片的地图图层 ID，即指定进行地图切片的图层，可以是临时图层集，也可以是当前地图中图层的组合。
 * @param {boolean} [options.clipRegionEnabled = false] - 是否地图只显示该区域覆盖的部分。true 表示地图只显示该区域覆盖的部分。
 * @param {ol.geom.Geometry} [options.clipRegion] - 地图显示裁剪的区域。是一个面对象，当 clipRegionEnabled = true 时有效，即地图只显示该区域覆盖的部分。
 * @param {boolean} [options.overlapDisplayed=false] - 地图对象在同一范围内时，是否重叠显示。如果为 true，则同一范围内的对象会直接压盖；如果为 false 则通过 overlapDisplayedOptions 控制对象不压盖显示。
 * @param {OverlapDisplayedOptions} [options.overlapDisplayedOptions] - 避免地图对象压盖显示的过滤选项，当 overlapDisplayed 为 false 时有效，用来增强对地图对象压盖时的处理。
 * @param {boolean} [options.markerAngleFixed=false] - 指定点状符号的角度是否固定。
 * @param {boolean} [options.textAngleFixed=false] - 文本角度是否固定。
 * @param {boolean} [options.textOrientationFixed=false] - 文本朝向是否固定。
 * @param {boolean} [options.paintBackground=false] - 是否绘制地图背景。
 * @param {boolean} [options.maxVisibleTextSize] - 文本的最大可见尺寸，单位为像素。
 * @param {boolean} [options.maxVisibleVertex] - 最大几何对象可见节点数。如果几何对象的节点数超过指定的个数，则超过的那部分节点不显示。
 * @param {boolean} [options.minVisibleTextSize] - 文本的最小可见尺寸，单位为像素。
 * @param {string} [options.tileversion] - 切片版本名称，_cache 为 true 时有效。
 * @param {string} [options.tileProxy] - 代理地址。
 * @param {NDVIParameter|HillshadeParameter} [options.rasterfunction] - 栅格分析参数。
 * @param {string} [options.format = 'png'] - 瓦片表述类型，支持 "png" 、"webp"、"bmp" 、"jpg"、"gif" 等图片类型。
 * @param {Function} [options.imageLoadFunction] - 加载图片的方法。默认为function(imageTile, src) {imageTile.getImage().src = src;};
 * @param {string} [options.ratio=1.5] - 	请求图片大小比例。 1 表示请求图片大小和地图视窗范围一致，2 表示请求图片大小是地图视窗范围的2倍，以此类推。
 * @extends {ol.source.Image}
 * @usage
 */
 export class ImageSuperMapRest extends ImageSource {
  constructor(options) {
    super({
      attributions: options.attributions,
      imageSmoothing: options.imageSmoothing,
      projection: options.projection,
      resolutions: options.resolutions
    });
    if (options.url === undefined) {
      return;
    }
    this.imageLoadFunction_ =
      options.imageLoadFunction !== undefined ? options.imageLoadFunction : defaultImageLoadFunction;
    this._image = null;
    this.renderedRevision_ = 0;
    this._crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : null;
    this._url = options.url;
    this.ratio_ = options.ratio !== undefined ? options.ratio : 1.5;

    options.attributions =
      options.attributions ||
      "Map Data <span>© SuperMap iServer</span> with © SuperMap iClient";

    options.format = options.format ? options.format : 'png';
    this._layerUrl = CommonUtil.urlPathAppend(options.url, 'image.' + options.format);
    //为url添加安全认证信息片段
    this._layerUrl = SecurityManager.appendCredential(this._layerUrl);

    const params = {};
    //切片是否透明
    const transparent = options.transparent !== undefined ? options.transparent : true;
    params['transparent'] = transparent;

    //是否使用缓存吗，默认为true
    const cacheEnabled = options.cacheEnabled !== undefined ? options.cacheEnabled : true;
    params['cacheEnabled'] = cacheEnabled;

    //如果有layersID，则是在使用专题图
    if (options.layersID !== undefined) {
      params['layersID'] = options.layersID;
    }
    //是否重定向,默认为false
    let redirect = false;
    if (options.redirect !== undefined) {
      redirect = options.redirect;
    }
    params['redirect'] = redirect;

    if (options.prjCoordSys) {
      params['prjCoordSys'] = JSON.stringify(options.prjCoordSys);
    }
    if (options.clipRegionEnabled && options.clipRegion instanceof Geometry) {
      options.clipRegion = Util.toSuperMapGeometry(new GeoJSON().writeGeometryObject(options.clipRegion));
      options.clipRegion = CommonUtil.toJSON(ServerGeometry.fromGeometry(options.clipRegion));
      params['clipRegionEnabled'] = options.clipRegionEnabled;
      params['clipRegion'] = JSON.stringify(options.clipRegion);
    }
    if (!!options.overlapDisplayed && options.overlapDisplayedOptions) {
      // options.overlapDisplayedOptions = options.overlapDisplayedOptions;
      params['overlapDisplayed'] = options.overlapDisplayed;
      params['overlapDisplayedOptions'] = options.overlapDisplayedOptions.toString();
    }
    if (cacheEnabled === true && options.tileversion) {
      params['tileversion'] = options.tileversion;
    }
    if (options.rasterfunction) {
      params['rasterfunction'] = JSON.stringify(options.rasterfunction);
    }
    //是否反走样地图,默认为false
    if (options.antialias !== undefined) {
      params['antialias'] = options.antialias;
    }
    if (options.markerAngleFixed !== undefined) {
      params['markerAngleFixed'] = options.markerAngleFixed;
    }
    if (options.textAngleFixed !== undefined) {
      params['textAngleFixed'] = options.textAngleFixed;
    }
    if (options.textOrientationFixed !== undefined) {
      params['textOrientationFixed'] = options.textOrientationFixed;
    }
    if (options.paintBackground !== undefined) {
      params['paintBackground'] = options.paintBackground;
    }
    if (!isNaN(options.maxVisibleTextSize)) {
      params['maxVisibleTextSize'] = +options.maxVisibleTextSize;
    }
    if (!isNaN(options.minVisibleTextSize)) {
      params['maxVisibleTextSize'] = +options.minVisibleTextSize;
    }
    if (!isNaN(options.maxVisibleVertex)) {
      params['maxVisibleVertex'] = Math.round(+options.maxVisibleVertex);
    }

    this._layerUrl = CommonUtil.urlAppend(this._layerUrl, CommonUtil.getParameterString(params));

    //存储一个cacheEnabled
    this.cacheEnabled = cacheEnabled;

    if (options.tileProxy) {
      this.tileProxy = options.tileProxy;
    }
  }
  getImageInternal(extent, resolution, pixelRatio) {
    resolution = this.findNearestResolution(resolution);
    const imageResolution = resolution / pixelRatio;
    const center = getCenter(extent);
    const viewWidth = Math.ceil(getWidth(extent) / imageResolution);
    const viewHeight = Math.ceil(getHeight(extent) / imageResolution);
    const viewExtent = getForViewAndSize(center, imageResolution, 0, [viewWidth, viewHeight]);
    const requestWidth = Math.ceil((this.ratio_ * getWidth(extent)) / imageResolution);
    const requestHeight = Math.ceil((this.ratio_ * getHeight(extent)) / imageResolution);
    const requestExtent = getForViewAndSize(center, imageResolution, 0, [requestWidth, requestHeight]);
    const image = this._image;
    if (
      image &&
      this.renderedRevision_ === this.getRevision() &&
      image.getResolution() === resolution &&
      image.getPixelRatio() === pixelRatio &&
      containsExtent(image.getExtent(), viewExtent)
    ) {
      return image;
    }
    const imageSize = [
      Math.round(getWidth(requestExtent) / imageResolution),
      Math.round(getHeight(requestExtent) / imageResolution)
    ];
    const imageUrl = this._getRequestUrl(requestExtent, imageSize);
    this._image = new ImageWrapper(
      requestExtent,
      resolution,
      pixelRatio,
      imageUrl,
      this._crossOrigin,
      this.imageLoadFunction_
    );
    this.renderedRevision_ = this.getRevision();
    this._image.addEventListener('change', this.handleImageChange.bind(this));
    return this._image;
  }
  _getRequestUrl(extent, imageSize) {
    const params = {
      width: imageSize[0],
      height: imageSize[1],
      viewBounds: { leftBottom: { x: extent[0], y: extent[1] }, rightTop: { x: extent[2], y: extent[3] } }
    };
    //不启用缓存时启用时间戳
    if (!this.cacheEnabled) {
      params['_t'] = new Date().getTime();
    }
    let imageUrl = CommonUtil.urlAppend(this._layerUrl, CommonUtil.getParameterString(params));
    //支持代理
    if (this.tileProxy) {
      imageUrl = this.tileProxy + encodeURIComponent(imageUrl);
    }
    return imageUrl;
  }
  /**
   * @function ImageSuperMapRest.optionsFromMapJSON
   * @param {string} url - 地址。
   * @param {Object} mapJSONObj - 地图 JSON。
   * @description 获取地图 JSON 信息。
   */
  static optionsFromMapJSON(url, mapJSONObj) {
    var extent = [mapJSONObj.bounds.left, mapJSONObj.bounds.bottom, mapJSONObj.bounds.right, mapJSONObj.bounds.top];
    var resolutions = getResolutions();

    function getResolutions() {
      var level = 28;
      var dpi = 96;
      var width = extent[2] - extent[0];
      var height = extent[3] - extent[1];
      var tileSize = width >= height ? width : height;
      var maxReolution;
      if (tileSize === width) {
        maxReolution = tileSize / mapJSONObj.viewer.width;
      } else {
        maxReolution = tileSize / mapJSONObj.viewer.height;
      }
      var resolutions = [];
      var unit = Unit.METER;
      if (mapJSONObj.coordUnit === Unit.DEGREE) {
        unit = Unit.DEGREE;
      }
      if (mapJSONObj.visibleScales.length > 0) {
        for (let i = 0; i < mapJSONObj.visibleScales.length; i++) {
          resolutions.push(Util.scaleToResolution(mapJSONObj.visibleScales[i], dpi, unit));
        }
      } else {
        for (let i = 0; i < level; i++) {
          resolutions.push(maxReolution / Math.pow(2, i));
        }
      }

      function sortNumber(a, b) {
        return b - a;
      }

      return resolutions.sort(sortNumber);
    }
    return { url,resolutions };
  }
}
