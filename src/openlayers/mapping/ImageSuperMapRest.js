import ol from 'openlayers';
import {
    Unit,
    ServerType,
    SecurityManager,
    Credential,
    ServerGeometry,
    CommonUtil
} from '@supermap/iclient-common';
import {Util} from '../core/Util';

/**
 * @class ol.source.ImageSuperMapRest
 * @category iServer Map
 * @classdesc SuperMap iServer Image图层源。
 * @param options - {Object} 服务参数：<br>
 *        url - {string} 服务地址。<br>
 *        tileGrid - [{ol.tilegrid.TileGrid}]{@linkdoc-openlayers/ol.tilegrid.TileGrid} 瓦片网格对象。<br>
 *        serverType - {SuperMap.ServerType} 服务类型。<br>
 *        redirect - {boolean} 是否重定向，默认为false。<br>
 *        transparent - {boolean} 图片是否透明，默认为true。<br>
 *        cacheEnabled - {boolean} 是否使用服务端的缓存，默认为 true，即使用服务端的缓存。<br>
 *        prjCoordSys - {Object} 请求的地图的坐标参考系统。当此参数设置的坐标系统不同于地图的原有坐标系统时， 系统会进行动态投影，并返回动态投影后的地图图片。例如：{"epsgCode":3857}。<br>
 *        layersID - {string} 获取进行切片的地图图层 ID，即指定进行地图切片的图层，可以是临时图层集，也可以是当前地图中图层的组合。如果此参数缺省则对全部图层进行切片。layersID 可以是临时图层创建时templayers的ID。<br>
 *        clipRegionEnabled - {boolean} 地图显示裁剪的区域。是一个面对象，当 clipRegionEnabled = true 时有效，即地图只显示该区域覆盖的部分。<br>
 *        clipRegion - [{ol.geom.Geometry}]{@linkdoc-openlayers/ol.geom.Geometry} 地图显示裁剪的区域。是一个面对象，当 clipRegionEnabled = true 时有效，即地图只显示该区域覆盖的部分。<br>
 *        overlapDisplayed - {boolean} 地图对象在同一范围内时，是否重叠显示，默认为 false。如果为 true，则同一范围内的对象会直接压盖；如果为 false 则通过 overlapDisplayedOptions 控制对象不压盖显示。<br>
 *        overlapDisplayedOptions - {@link SuperMap.OverlapDisplayedOptions} 避免地图对象压盖显示的过滤选项，当 overlapDisplayed 为 false 时有效，用来增强对地图对象压盖时的处理。<br>
 *        tileversion - {string} 切片版本名称，_cache 为 true 时有效。<br>
 *        tileProxy - {string} 代理地址
 * @extends ol.source.TileImage{@linkdoc-openlayers/ol.source.TileImage}
 */
export class ImageSuperMapRest extends ol.source.TileImage {

    constructor(options) {
        if (options.url === undefined) {
            return;
        }
        options.attributions = options.attributions ||
            new ol.Attribution({
                html: "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <a href='http://icltest.supermapol.com/'>© SuperMap iClient</a>"
            });
        var layerUrl = options.url + "/image.png?";
        options.serverType = options.serverType || ServerType.ISERVER;
        //为url添加安全认证信息片段
        layerUrl = appendCredential(options.url, layerUrl, options.serverType);

        /*
         * @function ol.source.ImageSuperMapRest.prototype.appendCredential
         * @description 添加凭据
         * @param url - {string} 地址
         * @param serverType - {Object} 服务类型
         * @return {string} 添加生成后的新地址
         */
        function appendCredential(id, url, serverType) {
            var newUrl = url, credential, value;
            switch (serverType) {
                case ServerType.IPORTAL:
                    value = SecurityManager.getToken(id);
                    credential = value ? new Credential(value, "token") : null;
                    if (!credential) {
                        value = SecurityManager.getKey(id);
                        credential = value ? new Credential(value, "key") : null;
                    }
                    break;
                case ServerType.ONLINE:
                    value = SecurityManager.getKey(id);
                    credential = value ? new Credential(value, "key") : null;
                    break;
                default:
                    //iserver or others
                    value = SecurityManager.getToken(id);
                    credential = value ? new Credential(value, "token") : null;
                    break;
            }
            if (credential) {
                newUrl += "&" + credential.getUrlParameters();
            }
            return newUrl;
        }

        //切片是否透明
        var transparent = true;
        if (options.opaque !== undefined) {
            transparent = options.opaque;
        }
        layerUrl += "&transparent=" + transparent;

        //是否使用缓存吗，默认为true
        var cacheEnabled = true;
        if (options.cacheEnabled !== undefined) {
            cacheEnabled = options.cacheEnabled;
        }
        layerUrl += "&cacheEnabled=" + cacheEnabled;

        //如果有layersID，则是在使用专题图
        if (options.layersID !== undefined) {
            layerUrl += "&layersID=" + options.layersID;
        }
        //是否重定向,默认为false
        var redirect = false;
        if (options.redirect !== undefined) {
            redirect = options.redirect;
        }
        layerUrl += "&redirect=" + redirect;

        if (options.prjCoordSys) {
            layerUrl += "prjCoordSys=" + JSON.stringify(options.prjCoordSys);
        }
        if (options.clipRegion instanceof ol.geom.Geometry) {
            options.clipRegionEnabled = true;
            options.clipRegion = Util.toSuperMapGeometry(new ol.format.GeoJSON().writeGeometryObject(options.clipRegion));
            options.clipRegion = CommonUtil.toJSON(ServerGeometry.fromGeometry(options.clipRegion));
            layerUrl += "&clipRegionEnabled=" + options.clipRegionEnabled + "&clipRegion=" + JSON.stringify(options.clipRegion);
        }
        if (!!options.overlapDisplayed && options.overlapDisplayedOptions) {
            options.overlapDisplayedOptions = options.overlapDisplayedOptions;
            layerUrl += "&overlapDisplayed=" + options.overlapDisplayed + "&overlapDisplayedOptions=" + options.overlapDisplayedOptions.toString();
        }
        if (options.cacheEnabled === true && options.tileversion) {
            layerUrl += "tileversion=" + options.tileversion;
        }

        super({
            attributions: options.attributions,
            cacheSize: options.cacheSize,
            crossOrigin: options.crossOrigin,
            logo: options.logo,
            opaque: options.opaque,
            projection: options.projection,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            state: options.state,
            tileClass: options.tileClass,
            tileGrid: options.tileGrid,
            tileLoadFunction: options.tileLoadFunction,
            tilePixelRatio: options.tilePixelRatio,
            tileUrlFunction: tileUrlFunction,
            url: options.url,
            urls: options.urls,
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

        /*
         * @function ol.source.ImageSuperMapRest.prototype.tileUrlFunction
         * @param tileCoord - {Object} 瓦片坐标系
         * @param pixelRatio - {Object} 像素密度
         * @param projection - {string} 投影参考系
         * @description 瓦片地址参数
         * @return {string} 返回瓦片地址参数
         */
        function tileUrlFunction(tileCoord, pixelRatio, projection) {
            if (!this.tileGrid) {
                this.tileGrid = this.getTileGridForProjection(projection);
            }
            var tileExtent = this.tileGrid.getTileCoordExtent(
                tileCoord, this.tmpExtent_);
            var tileSize = ol.size.toSize(
                this.tileGrid.getTileSize(tileCoord[0]), this.tmpSize);
            var url = encodeURI(layerUrl + "&width=" + tileSize[0] + "&height=" + tileSize[1] + "&viewBounds=" + "{\"leftBottom\" : {\"x\":" + tileExtent[0] + ",\"y\":" + tileExtent[1] + "},\"rightTop\" : {\"x\":" + tileExtent[2] + ",\"y\":" + tileExtent[3] + "}}");

            //支持代理
            if (me.tileProxy) {
                url = me.tileProxy + encodeURIComponent(url);
            }
            //不启用缓存时启用时间戳
            if (!me.cacheEnabled) {
                url += "&_t=" + new Date().getTime();
            }

            return url;
        }
    }

    /**
     * @function ol.source.ImageSuperMapRest.optionsFromMapJSON
     * @param url - {string} 地址
     * @param mapJSONObj - {Object} 地图JSON
     * @description 获取地图JSON信息
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
            var width = (extent[2] - extent[0]);
            var height = (extent[3] - extent[1]);
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

        options.tileGrid = new ol.tilegrid.TileGrid({
            extent: extent,
            resolutions: resolutions
        });
        return options;
    }

    /**
     * @function ol.source.ImageSuperMapRest.createTileGrid
     * @param extent - {number} 长度
     * @param maxZoom - {number} 最大的放大级别
     * @param minZoom - {number} 最小的放大级别
     * @param tileSize - {number} 瓦片的尺寸
     * @param origin - {number} 原点
     * @description 创建网格切片
     * @return {ol.tilegrid.TileGrid} 创建的网格切片
     */
    static createTileGrid(extent, maxZoom, minZoom, tileSize, origin) {
        var tilegrid = ol.tilegrid.createXYZ({
            extent: extent,
            maxZoom: maxZoom,
            minZoom: minZoom,
            tileSize: tileSize
        });
        return new ol.tilegrid.TileGrid({
                extent: extent,
                minZoom: minZoom,
                origin: origin,
                resolutions: tilegrid.getResolutions(),
                tileSize: tilegrid.getTileSize()
            }
        );
    }
}

ol.source.ImageSuperMapRest = ImageSuperMapRest;