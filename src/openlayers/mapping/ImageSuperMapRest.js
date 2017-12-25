import ol from 'openlayers';
import {
    ServerType,
    SecurityManager,
    Credential,
    ServerGeometry,
    CommonUtil
} from '@supermap/iclient-common';
import {Util} from '../core/Util';

/**
 * @class ol.source.ImageSuperMapRest
 * @classdesc SuperMap iServer Image图层源。
 * @param options - {Object} 服务参数：<br>
 *        url - {string} iServer Map服务地址。<br>
 *        attributions - {string} 版权描述信息。<br>
 *        logo - {olx.LogoOptions} 对象文字与地图标识的配置选项。默认为 null。<br>
 *        projection- {ol.proj.Projection} 地图投影对象。默认为 null。<br>
 *        serverType - {SuperMap.ServerType} 服务类型。默认为 ServerType.ISERVER。<br>
 *        imageLoadFunction - {function} 图像加载函数，默认为：ol.source.Image.defaultImageLoadFunction。<br>
 *        ratio - {number} 视图比, 1表示图像请求是地图视图的大小，2表示地图视口大小的两倍，依此类推。 默认值是1.5。<br>
 *        transparent - {boolean} 是否透明。默认为 true。<br>
 *        cacheEnabled - {boolean} 是否启用缓存。默认为 false。<br>
 *        layersID - {string} 地图中要出图的图层 ID。如果有layersID，则是在使用专题图。可选。<br>
 *        redirect - {boolean} 是否重定向。可选。<br>
 *        prjCoordSys - {Object} 地图投影。可选。<br>
 *        clipRegionEnabled - {boolean} 是否进行裁剪。可选。<br>
 *        clipRegion - {ol.geom.Geometry}  裁剪区域。可选。<br>
 *        overlapDisplayed - {boolean} 是否重叠显示，默认为 false。<br>
 *        overlapDisplayedOptions - {SuperMap.OverlapDisplayedOptions} 避免地图对象压盖显示的过滤选项，当 overlapDisplayed 为 false 时有效，用来增强对地图对象压盖时的处理。
 *
 * @extends ol.source.Image{@linkdoc-openlayers/ol.source.Image}
 */
export class ImageSuperMapRest extends ol.source.Image {

    constructor(options) {
        if (options.url === undefined) {
            return;
        }

        options.attributions = options.attributions ||
            new ol.Attribution({
                html: "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <a href='http://icltest.supermapol.com/'>© SuperMap iClient</a>"
            });

        super({
            attributions: options.attributions,
            logo: options.logo,
            projection: options.projection,
            resolutions: options.resolutions
        });

        /**
         * @private
         * @type {string}
         */
        this.crossOrigin_ = options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';

        /**
         * @private
         * @type {string}
         */
        this.url_ = options.url;

        /**
         * @private
         * @type {number}
         */
        this.ratio_ = options.ratio !== undefined ? options.ratio : 1.5;

        /**
         * @type {string}
         */
        this.serverType = options.serverType || ServerType.ISERVER;

        /**
         * @private
         * @type {ol.ImageLoadFunctionType}
         */
        this.imageLoadFunction_ = options.imageLoadFunction !== undefined ?
            options.imageLoadFunction : ol.source.Image.defaultImageLoadFunction;

        /**
         * @private
         * @type {Object}
         */
        this.options_ = options;


        /**
         * @private
         * @type {ol.Image}
         */
        this.image_ = null;

        /**
         * @private
         * @type {ol.Size}
         */
        this.imageSize_ = [0, 0];

        /**
         * @private
         * @type {number}
         */
        this.renderedRevision_ = 0;

    }

    /**
     * @inheritDoc
     */
    getImageInternal(extent, resolution, pixelRatio, projection) { // eslint-disable-line no-unused-vars
        if (this.url_ === undefined) {
            return null;
        }
        resolution = this.findNearestResolution(resolution);
        var image = this.image_;
        if (image &&
            this.renderedRevision_ === this.getRevision() &&
            image.getResolution() === resolution &&
            image.getPixelRatio() === pixelRatio &&
            ol.extent.containsExtent(image.getExtent(), extent)) {
            return image;
        }

        var params = this.getRequestParams_();

        extent = extent.slice();
        var centerX = (extent[0] + extent[2]) / 2;
        var centerY = (extent[1] + extent[3]) / 2;
        if (this.ratio_ !== 1) {
            var halfWidth = this.ratio_ * ol.extent.getWidth(extent) / 2;
            var halfHeight = this.ratio_ * ol.extent.getHeight(extent) / 2;
            extent[0] = centerX - halfWidth;
            extent[1] = centerY - halfHeight;
            extent[2] = centerX + halfWidth;
            extent[3] = centerY + halfHeight;
        }

        var imageResolution = resolution / pixelRatio;

        var width = Math.ceil(ol.extent.getWidth(extent) / imageResolution);
        var height = Math.ceil(ol.extent.getHeight(extent) / imageResolution);

        extent[0] = centerX - imageResolution * width / 2;
        extent[2] = centerX + imageResolution * width / 2;
        extent[1] = centerY - imageResolution * height / 2;
        extent[3] = centerY + imageResolution * height / 2;

        this.imageSize_[0] = width;
        this.imageSize_[1] = height;

        var url = this.getRequestUrl_(extent, this.imageSize_, params);

        this.image_ = new ol.Image(extent, resolution, pixelRatio,
            url, this.crossOrigin_, this.imageLoadFunction_);

        this.renderedRevision_ = this.getRevision();

        ol.events.listen(this.image_, ol.events.EventType.CHANGE,
            this.handleImageChange, this);

        return this.image_;
    }

    /**
     * @description 获取可用的请求参数
     * @private
     */
    getRequestParams_() {
        var params = {};
        //切片是否透明
        params.transparent = this.options_.transparent !== undefined ? this.options_.transparent : true;
        //是否使用缓存
        params.cacheEnabled = this.options_.cacheEnabled !== undefined ? this.options_.cacheEnabled : false;
        //如果有layersID，则是在使用专题图
        if (this.options_.layersID !== undefined) {
            params.layersID = this.options_.layersID;
        }
        //是否重定向
        if (this.options_.redirect !== undefined) {
            params.redirect = this.options_.redirect;
        }
        if (this.options_.prjCoordSys) {
            params.prjCoordSys = JSON.stringify(this.options_.prjCoordSys);
        }
        if (this.options_.clipRegionEnabled && this.options_.clipRegion instanceof ol.geom.Geometry) {
            params.clipRegionEnabled = this.options_.clipRegionEnabled;
            params.clipRegion = Util.toSuperMapGeometry(new ol.format.GeoJSON().writeGeometryObject(this.options_.clipRegion));
            params.clipRegion = CommonUtil.toJSON(ServerGeometry.fromGeometry(params.clipRegion));
            params.clipRegion = JSON.stringify(params.clipRegion);
        }
        if (!!this.options_.overlapDisplayed && this.options_.overlapDisplayedOptions) {
            params.overlapDisplayed = this.options_.overlapDisplayed;
            params.overlapDisplayedOptions = this.options_.overlapDisplayedOptions.toString();
        }
        return params;
    }

    /**
     * @description 构建资源请求url
     * @private
     */
    getRequestUrl_(extent, size, params) {
        var url = this.url_ + "/image.png?";
        //为url添加安全认证信息片段
        url = this.appendCredential_(url, this.serverType);
        //为url添加请求参数
        url = ol.uri.appendParams(url, params);
        //为url添加请求图片大小以及显示范围参数
        return encodeURI(url + "&width=" + size[0] + "&height=" + size[1] + "&viewBounds=" + "{\"leftBottom\" : {\"x\":" + extent[0] + ",\"y\":" + extent[1] + "},\"rightTop\" : {\"x\":" + extent[2] + ",\"y\":" + extent[3] + "}}");
    }

    /**
     * @function ol.source.ImageSuperMapRest.prototype.appendCredential
     * @description 添加凭据
     * @param url - {string} 地址
     * @param serverType - {Object} 服务类型
     * @return {string} 添加生成后的新地址
     * @private
     */
    appendCredential_(url, serverType) {
        var newUrl = url, credential, value;
        switch (serverType) {
            case ServerType.IPORTAL:
                value = SecurityManager.getToken(url);
                credential = value ? new Credential(value, "token") : null;
                if (!credential) {
                    value = SecurityManager.getKey(url);
                    credential = value ? new Credential(value, "key") : null;
                }
                break;
            case ServerType.ONLINE:
                value = SecurityManager.getKey(url);
                credential = value ? new Credential(value, "key") : null;
                break;
            default:
                //iserver or others
                value = SecurityManager.getToken(url);
                credential = value ? new Credential(value, "token") : null;
                break;
        }
        if (credential) {
            newUrl += "&" + credential.getUrlParameters();
        }
        return newUrl;
    }

}

ol.source.ImageSuperMapRest = ImageSuperMapRest;