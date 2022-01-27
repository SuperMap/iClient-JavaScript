/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SecurityManager } from '@supermap/iclient-common/security/SecurityManager';
import { Unit } from '@supermap/iclient-common/REST';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { ServerGeometry } from '@supermap/iclient-common/iServer/ServerGeometry';
import { Util } from '../core/Util';
import TileImage from 'ol/source/TileImage';
import Geometry from 'ol/geom/Geometry';
import GeoJSON from 'ol/format/GeoJSON';
import * as olSize from 'ol/size';
import * as olTilegrid from 'ol/tilegrid';
import TileGrid from 'ol/tilegrid/TileGrid';

/**
 * @class ol.source.ImageSuperMapRest
 * @category iServer Map Tile
 * @classdesc SuperMap iServer Image 图层源。
 * @param {Object} options - 参数。
 * @param {string} options.url - 服务地址,例如: http://{ip}:{port}/iserver/services/map-world/rest/maps/World。
 * @param {ol.tilegrid.TileGrid} [options.tileGrid] - 瓦片网格对象。
 * @param {boolean} [options.redirect=false] - 是否重定向。
 * @param {boolean} [options.transparent=true] - 瓦片是否透明。
 * @param {boolean} [options.cacheEnabled=true] - 是否使用服务端的缓存，true 表示使用服务端的缓存。
 * @param {Object} [options.prjCoordSys] - 请求的地图的坐标参考系统。当此参数设置的坐标系统不同于地图的原有坐标系统时， 系统会进行动态投影，并返回动态投影后的地图瓦片。例如：{"epsgCode":3857}。
 * @param {string} [options.layersID] - 获取进行切片的地图图层 ID，即指定进行地图切片的图层，可以是临时图层集，也可以是当前地图中图层的组合。
 * @param {boolean} [options.clipRegionEnabled = false] - 是否地图只显示该区域覆盖的部分。true 表示地图只显示该区域覆盖的部分。
 * @param {ol.geom.Geometry} [options.clipRegion] - 地图显示裁剪的区域。是一个面对象，当 clipRegionEnabled = true 时有效，即地图只显示该区域覆盖的部分。
 * @param {boolean} [options.overlapDisplayed=false] - 地图对象在同一范围内时，是否重叠显示。如果为 true，则同一范围内的对象会直接压盖；如果为 false 则通过 overlapDisplayedOptions 控制对象不压盖显示。
 * @param {OverlapDisplayedOptions} [options.overlapDisplayedOptions] - 避免地图对象压盖显示的过滤选项，当 overlapDisplayed 为 false 时有效，用来增强对地图对象压盖时的处理。
 * @param {string} [options.tileversion] - 切片版本名称，_cache 为 true 时有效。
 * @param {string} [options.tileProxy] - 服务代理地址。
 * @param {(NDVIParameter|HillshadeParameter)} [options.rasterfunction] - 栅格分析参数。
 * @param {string} [options.format = 'png'] - 瓦片表述类型，支持 "png" 、"webp"、"bmp" 、"jpg"、 "gif" 等图片类型。
 * @extends {ol.source.TileImage}
 */
export class ImageSuperMapRest extends TileImage {
  constructor(options) {
    options.attributions =
      options.attributions || "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <a href='https://iclient.supermap.io/'>© SuperMap iClient</a>"

    options.format = options.format ? options.format : 'png'
    var layerUrl = CommonUtil.urlPathAppend(options.url, "image." + options.format);

    //为url添加安全认证信息片段
    layerUrl = SecurityManager.appendCredential(layerUrl);

    const params = {};
    //切片是否透明
    var transparent = options.transparent !== undefined ? options.transparent : true;
    params['transparent'] = transparent;

    //是否使用缓存吗，默认为true
    var cacheEnabled = options.cacheEnabled !== undefined ? options.cacheEnabled : true;
    params['cacheEnabled'] = cacheEnabled;

    //如果有layersID，则是在使用专题图
    if (options.layersID !== undefined) {
      params['layersID'] = options.layersID;
    }
    //是否重定向,默认为false
    var redirect = false;
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
    layerUrl = CommonUtil.urlAppend(encodeURI(layerUrl), CommonUtil.getParameterString(params));
    super({
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      logo: Util.getOlVersion() === '4' ? options.logo : null,
      opaque: options.opaque,
      projection: options.projection,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      state: options.state,
      tileClass: options.tileClass,
      tileGrid: options.tileGrid,
      tileLoadFunction: options.tileLoadFunction,
      tilePixelRatio: options.tilePixelRatio,
      tileUrlFunction: tileUrlFunction,
      wrapX: options.wrapX !== undefined ? options.wrapX : false,
      cacheEnabled: options.cacheEnabled,
      layersID: options.layersID
    });

    //存储一个cacheEnabled
    this.cacheEnabled = cacheEnabled;

    if (options.tileProxy) {
      this.tileProxy = options.tileProxy;
    }
    var me = this;

    /**
     * @function ol.source.ImageSuperMapRest.prototype.tileUrlFunction
     * @param {Object} tileCoord - 瓦片坐标系。
     * @param {Object} pixelRatio - 像素密度。
     * @param {string} projection - 投影参考系。
     * @description 瓦片地址参数。
     * @returns {string} 返回瓦片地址参数
     */
    function tileUrlFunction(tileCoord, pixelRatio, projection) {
      if (!this.tileGrid) {
        this.tileGrid = this.getTileGridForProjection && this.getTileGridForProjection(projection);
      }
      if (!this.tileGrid) {
        if (options.extent) {
          this.tileGrid = ImageSuperMapRest.createTileGrid(options.extent);
          if (this.resolutions) {
            this.tileGrid.resolutions = me.resolutions;
          }
        } else {
          if (projection.getCode() === 'EPSG:3857') {
            this.tileGrid = ImageSuperMapRest.createTileGrid([
              -20037508.3427892,
              -20037508.3427892,
              20037508.3427892,
              20037508.3427892
            ]);
            this.extent = [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892];
          }
          if (projection.getCode() === 'EPSG:4326') {
            this.tileGrid = ImageSuperMapRest.createTileGrid([-180, -90, 180, 90]);
            this.extent = [-180, -90, 180, 90];
          }
        }
      }
      var tileExtent = this.tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent_);
      var tileSize = olSize.toSize(this.tileGrid.getTileSize(tileCoord[0]), this.tmpSize);
      var url =
          layerUrl +
          encodeURI(
              '&width=' +
                  tileSize[0] +
                  '&height=' +
                  tileSize[1] +
                  '&viewBounds=' +
                  '{"leftBottom" : {"x":' +
                  tileExtent[0] +
                  ',"y":' +
                  tileExtent[1] +
                  '},"rightTop" : {"x":' +
                  tileExtent[2] +
                  ',"y":' +
                  tileExtent[3] +
                  '}}'
          );

      //支持代理
      if (me.tileProxy) {
          url = me.tileProxy + encodeURIComponent(url);
      }
      //不启用缓存时启用时间戳
      if (!me.cacheEnabled) {
        url += '&_t=' + new Date().getTime();
      }

      return url;
    }
  }

  /**
   * @function ol.source.ImageSuperMapRest.optionsFromMapJSON
   * @param {string} url - 服务地址。
   * @param {Object} mapJSONObj - 地图 JSON。
   * @description 获取地图 JSON 信息。
   */
  static optionsFromMapJSON(url, mapJSONObj) {
    var options = {};
    options.url = url;
    options.crossOrigin = 'anonymous';
    var extent = [mapJSONObj.bounds.left, mapJSONObj.bounds.bottom, mapJSONObj.bounds.right, mapJSONObj.bounds.top];
    var resolutions = getResolutions();

    function getResolutions() {
      var level = 17;
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

    options.tileGrid = new TileGrid({
      extent: extent,
      resolutions: resolutions
    });
    return options;
  }

  /**
   * @function ol.source.ImageSuperMapRest.createTileGrid
   * @param {number} extent - 长度。
   * @param {number} maxZoom - 最大的放大级别。
   * @param {number} minZoom - 最小的放大级别。
   * @param {number} tileSize - 瓦片的尺寸。
   * @param {number} origin - 原点。
   * @description 创建网格切片。
   * @returns {ol.tilegrid.TileGrid} 创建的网格切片
   */
  static createTileGrid(extent, maxZoom, minZoom, tileSize, origin) {
    var tilegrid = olTilegrid.createXYZ({
      extent: extent,
      maxZoom: maxZoom,
      minZoom: minZoom,
      tileSize: tileSize
    });
    return new TileGrid({
      extent: extent,
      minZoom: minZoom,
      origin: origin,
      resolutions: tilegrid.getResolutions(),
      tileSize: tilegrid.getTileSize()
    });
  }
}
