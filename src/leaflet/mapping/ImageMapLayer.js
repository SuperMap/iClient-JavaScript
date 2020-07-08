/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L, { Util, Layer, ImageOverlay } from 'leaflet';
import '../core/Base';
import { ServerGeometry, ServerType, SecurityManager, Credential, CommonUtil } from '@supermap/iclient-common';
import Attributions from '../core/Attributions';
import { toSuperMapGeometry } from "../core/Util";
/**
 * @class L.supermap.imageMapLayer
 * @classdesc SuperMap iServer 的 REST 地图服务的图层(SuperMap iServer Java 6R 及以上分块动态 REST 图层)。使用 Image 资源出图。
 * @category iServer Map
 * @extends {L.Layer}
 * @example
 *      L.supermap.imageMapLayer(url).addTo(map);
 * @param {string} url - 地图服务地址,如：http://{ip}:{port}/iserver/services/map-china400/rest/maps/China
 * @param {Object} options - 图层可选参数。
 * @param {string} [options.layersID] - 获取进行切片的地图图层 ID，即指定进行地图切片的图层，可以是临时图层集，也可以是当前地图中图层的组合
 * @param {boolean} [options.redirect=false] - 如果为 true，则将请求重定向到瓦片的真实地址；如果为 false，则响应体中是瓦片的字节流。
 * @param {boolean} [options.transparent=true] - 地图瓦片是否透明。
 * @param {boolean} [options.cacheEnabled=true] - 是否使用服务器缓存出图。
 * @param {boolean} [options.clipRegionEnabled=false] - 地图显示裁剪的区域是否有效。
 * @param {L.Path} [options.clipRegion] - 地图显示裁剪的区域。是一个面对象，当 clipRegionEnabled = true 时有效，即地图只显示该区域覆盖的部分。
 * @param {Object} [options.prjCoordSys] - 请求的地图的坐标参考系统。 如：prjCoordSys={"epsgCode":3857}。
 * @param {boolean} [options.overlapDisplayed=false] - 地图对象在同一范围内时，是否重叠显示。
 * @param {string} [options.overlapDisplayedOptions] - 避免地图对象压盖显示的过滤选项。
 * @param {number} [options.opacity=1] - 图层不透明度。
 * @param {string} [options.alt] - 无法显示图像时显示替代的文本。
 * @param {string} [options.pane='tilePane'] - 图层所归属的 map DOM 的分组。
 * @param {boolean} [options.interactive=false] - 是否响应鼠标点击或悬停交互事件。
 * @param {boolean} [options.crossOrigin=false] - 是否设置跨域属性。
 * @param {string} [options.errorOverlayUrl] - 图层未能加载时代替显示的瓦片地址。
 * @param {number} [options.zIndex=1] - 设置图层的层级。
 * @param {string} [options.className] - 自定义 dom 元素的 className。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {number} [options.updateInterval=150] - 平移时图层延迟刷新间隔时间。
 * @param {string} [options.tileProxy] -  代理地址。
 * @param {string} [options.format='png'] - 瓦片表述类型，支持 "png" 、"webp"、"bmp" 、"jpg"、 "gif" 等图片格式。
 * @param {(SuperMap.NDVIParameter|SuperMap.HillshadeParameter)} [options.rasterfunction] - 栅格分析参数。
 * @param {string} [options.attribution='Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' title='SuperMap iServer' target='_blank'>SuperMap iServer</a></span>'] - 版权信息。
 * @fires L.supermap.imageMapLayer#load
 * @fires L.supermap.imageMapLayer#error
 * @fires L.supermap.imageMapLayer#loading
 */
export var ImageMapLayer = Layer.extend({
    options: {
        //如果有layersID，则是在使用专题图
        layersID: null,
        //如果为 true，则将请求重定向到图片的真实地址；如果为 false，则响应体中是图片的字节流
        redirect: false,
        //地图图片是否透明
        transparent: true,
        //是否启用服务器缓存
        cacheEnabled: true,
        //地图显示裁剪的区域是否有效
        clipRegionEnabled: false,
        //地图显示裁剪的区域
        clipRegion: null,
        //请求的地图的坐标参考系统。 如：prjCoordSys= {"epsgCode":3857}。
        prjCoordSys: null,
        //地图对象在同一范围内时，是否重叠显示
        overlapDisplayed: false,
        //避免地图对象压盖显示的过滤选项
        overlapDisplayedOptions: null,
        //图层不透明度
        opacity: 1,
        //无法显示图像时显示替代的文本
        alt: '',
        //图层所归属的map DOM的分组。默认为："tilePane"
        pane: 'tilePane',
        //是否响应鼠标点击或悬停交互事件
        interactive: false,
        //是否设置跨域属性
        crossOrigin: false,
        //图层未能加载时代替显示的瓦片地址
        errorOverlayUrl: '',
        //设置图层的显示层级
        zIndex: 1,
        //自定义的html class name
        className: '',
        //服务来源 iServer|iPortal|online。
        serverType: ServerType.ISERVER,
        //版权信息
        attribution: Attributions.Common.attribution,
        //平移时图层延迟刷新间隔时间。
        updateInterval: 150,
        //启用托管地址。
        tileProxy: null,
        format: 'png'
    },

    initialize: function(url, options) {
        this._url = url;
        Util.setOptions(this, options);
    },

    /**
     * @private
     * @function L.supermap.imageMapLayer.prototype.onAdd
     * @description 添加到地图。
     * @param {L.Map} map - 待添加到的地图对象。
     */
    onAdd: function(map) {
        this.update = Util.throttle(this.update, this.options.updateInterval, this);
        map.on('moveend', this.update, this);

        if (this._currentImage && this._currentImage._bounds.equals(this._map.getBounds())) {
            map.addLayer(this._currentImage);
        } else if (this._currentImage) {
            this._map.removeLayer(this._currentImage);
            this._currentImage = null;
        }
        this.update();
    },

    /**
     * @private
     * @function L.supermap.imageMapLayer.prototype.onRemove
     * @description 从地图上移除。
     */
    onRemove: function() {
        // eslint-disable-line no-unused-vars
        if (this._currentImage) {
            this._map.removeLayer(this._currentImage);
        }
        this._map.off('moveend', this.update, this);
    },

    /**
     * @function L.supermap.imageMapLayer.prototype.bringToFront
     * @description 将当前图层置顶
     */
    bringToFront: function() {
        this.options.position = 'front';
        if (this._currentImage) {
            this._currentImage.bringToFront();
        }
        return this;
    },

    /**
     * @function L.supermap.imageMapLayer.prototype.bringToFront
     * @description 将当前图层置底。
     */
    bringToBack: function() {
        this.options.position = 'back';
        if (this._currentImage) {
            this._currentImage.bringToBack();
        }
        return this;
    },

    /**
     * @function L.supermap.imageMapLayer.prototype.getOpacity
     * @description 获取图层透明度。
     * @returns {number} 图层的透明度。
     */
    getOpacity: function() {
        return this.options.opacity;
    },

    /**
     * @function L.supermap.imageMapLayer.prototype.setOpacity
     * @description 设置透明度。
     */
    setOpacity: function(opacity) {
        this.options.opacity = opacity;
        if (this._currentImage) {
            this._currentImage.setOpacity(opacity);
        }
        return this;
    },

    /**
     * @function L.supermap.imageMapLayer.prototype.getImageUrl
     * @description 获取 image 图层请求地址，子类可重写实现。
     * @returns {string} 请求瓦片地址。
     */
    getImageUrl: function(params) {
        let serviceUrl = CommonUtil.urlPathAppend(this._url, `image.${this.options.format}`);
        let imageUrl =
            serviceUrl + Util.getParamString(Object.assign({}, this._initAllRequestParams(), params), serviceUrl);
        imageUrl = this._appendCredential(imageUrl);
        //支持代理
        if (this.options.tileProxy) {
            imageUrl = this.options.tileProxy + encodeURIComponent(imageUrl);
        }
        if (!this.options.cacheEnabled) {
            imageUrl += '&_t=' + new Date().getTime();
        }
        return imageUrl;
    },

    //获取请求瓦片宽高以及请求范围参数
    _getImageParams: function() {
        var size = this._calculateImageSize();
        return {
            viewBounds: this._compriseBounds(this._calculateBounds()),
            width: size.x,
            height: size.y
        };
    },

    //初始化服务请求参数
    _initAllRequestParams: function() {
        var me = this,
            options = me.options || {},
            params = {};

        var redirect = options.redirect === true ? options.redirect : false;
        params['redirect'] = redirect;

        var transparent = options.transparent === true ? options.transparent : false;
        params['transparent'] = transparent;

        var cacheEnabled = options.cacheEnabled === false ? options.cacheEnabled : true;
        params['cacheEnabled'] = cacheEnabled;

        if (options.prjCoordSys) {
            params['prjCoordSys'] = JSON.stringify(options.prjCoordSys);
        }

        if (options.layersID) {
            params['layersID'] = options.layersID;
        }
        if (options.rasterfunction) {
            params['rasterfunction'] = JSON.stringify(options.rasterfunction);
        }

        if (options.clipRegionEnabled && options.clipRegion) {
            params['clipRegionEnabled'] = options.clipRegionEnabled;
            params['clipRegion'] = JSON.stringify(ServerGeometry.fromGeometry(toSuperMapGeometry(options.clipRegion)));
        }

        if (options.overlapDisplayed === false) {
            params['overlapDisplayed'] = false;
            if (options.overlapDisplayedOptions) {
                params['overlapDisplayedOptions'] = me.overlapDisplayedOptions.toString();
            }
        } else {
            params['overlapDisplayed'] = true;
        }
        return params;
    },

    //初始化请求链接
    _requestImage: function(params, bounds) {
        var imageUrl = this.getImageUrl(params);
        this._loadImage(imageUrl, bounds);
    },

    //加载请求图层
    _loadImage: function(url, bounds) {
        if (!this._map) {
            return;
        }

        var image = new ImageOverlay(url, bounds, {
            opacity: 0,
            alt: this.options.alt,
            zIndex: this.options.zIndex,
            className: this.options.className,
            errorOverlayUrl: this.options.error,
            crossOrigin: this.options.crossOrigin,
            pane: this.options.pane || this.getPane(),
            interactive: this.options.interactive
        }).addTo(this._map);

        var onLoad = function(e) {
            image.off('error', onLoad, this);
            var map = this._map;
            if (!map) {
                return;
            }

            var newImage = e.target;
            var oldImage = this._currentImage;

            if (newImage._bounds && newImage._bounds.equals(bounds) && newImage._bounds.equals(map.getBounds())) {
                this._currentImage = newImage;

                if (this.options.position === 'front') {
                    this.bringToFront();
                }
                if (this.options.position === 'back') {
                    this.bringToBack();
                }

                if (this._currentImage._map) {
                    this._currentImage.setOpacity(this.options.opacity);
                }

                oldImage && map.removeLayer(oldImage);

                oldImage && oldImage._map && oldImage._map.removeLayer(oldImage);
            } else {
                map.removeLayer(newImage);
            }

            /**
             * @event L.supermap.imageMapLayer#load
             * @description 请求图层加载完成后触发。
             * @property {L.bounds} bounds  - 图层 bounds。
             */
            this.fire('load', { bounds: bounds });
        };

        image.once('load', onLoad, this);

        image.once(
            'error',
            function() {
                this._map.removeLayer(image);
                /**
                 * @event L.supermap.imageMapLayer#error
                 * @description 请求图层加载失败后触发。
                 */
                this.fire('error');
                image.off('load', onLoad, this);
            },
            this
        );

        /**
         * @event L.supermap.imageMapLayer#loading
         * @description 请求图层加载中触发。
         * @property {L.bounds} bounds  - 图层 bounds。
         */
        this.fire('loading', { bounds: bounds });
    },

    /**
     * @function L.supermap.imageMapLayer.prototype.update
     * @description 更新图层。
     */
    update: function() {
        if (!this._map) {
            return;
        }

        var zoom = this._map.getZoom();
        var bounds = this._map.getBounds();
        if (zoom > this._map.options.maxZoom || zoom < this._map.options.zoom) {
            if (this._currentImage) {
                this._currentImage._map.removeLayer(this._currentImage);
                this._currentImage = null;
            }
            return;
        }
        var params = this._getImageParams();
        if (params) {
            this._requestImage(params, bounds);
        } else if (this._currentImage) {
            this._currentImage._map.removeLayer(this._currentImage);
            this._currentImage = null;
        }
    },

    //将像素坐标转成点坐标
    _calculateBounds: function() {
        var pixelBounds = this._map.getPixelBounds();
        var sw = this._map.unproject(pixelBounds.getBottomLeft());
        var ne = this._map.unproject(pixelBounds.getTopRight());
        var neProjected = this._map.options.crs.project(ne);
        var swProjected = this._map.options.crs.project(sw);
        return L.bounds(neProjected, swProjected);
    },

    //转换viewBounds为JSON字符串
    _compriseBounds: function(boundsProjected) {
        var projBounds = {
            leftBottom: {
                x: boundsProjected.getBottomLeft().x,
                y: boundsProjected.getTopRight().y
            },
            rightTop: {
                x: boundsProjected.getTopRight().x,
                y: boundsProjected.getBottomLeft().y
            }
        };
        return JSON.stringify(projBounds);
    },

    //计算图层的宽高
    _calculateImageSize: function() {
        var map = this._map;
        var bounds = map.getPixelBounds();
        var size = map.getSize();

        var sw = map.unproject(bounds.getBottomLeft());
        var ne = map.unproject(bounds.getTopRight());

        var top = map.latLngToLayerPoint(ne).y;
        var bottom = map.latLngToLayerPoint(sw).y;

        if (top > 0 || bottom < size.y) {
            size.y = bottom - top;
        }
        return size;
    },

    //追加token或key
    _appendCredential: function(url) {
        var newUrl = url,
            credential,
            value;
        switch (this.options.serverType) {
            case ServerType.IPORTAL:
                value = SecurityManager.getToken(this._url);
                credential = value ? new Credential(value, 'token') : null;
                if (!credential) {
                    value = SecurityManager.getKey(this._url);
                    credential = value ? new Credential(value, 'key') : null;
                }
                break;
            case ServerType.ONLINE:
                value = SecurityManager.getKey(this._url);
                credential = value ? new Credential(value, 'key') : null;
                break;
            default:
                //iserver or others
                value = SecurityManager.getToken(this._url);
                credential = value ? new Credential(value, 'token') : null;
                break;
        }
        if (credential) {
            newUrl = CommonUtil.urlAppend(newUrl,credential.getUrlParameters());
        }
        return newUrl;
    }
});

export var imageMapLayer = function(url, options) {
    return new ImageMapLayer(url, options);
};
L.supermap.imageMapLayer = imageMapLayer;
