/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';
import {
    VectorGrid
} from './vectortile/VectorGrid';
import {
    CartoCSSToLeaflet
} from './carto/CartoCSSToLeaflet';
import {
    FetchRequest,
    Unit,
    ServerType,
    Credential,
    SecurityManager
} from '@supermap/iclient-common';
import * as Util from "../core/Util";
import Attributions from '../core/Attributions'

/**
 * @class L.supermap.tiledVectorLayer
 * @classdesc SuperMap iServer 的矢量瓦片图层。
 * @category Visualization VectorTile
 * @extends L.supermap.VectorGrid
 * @example
 *      L.supermap.tiledVectorLayer(url).addTo(map);
 * @param {string} url - 图层数据服务地址。
 * @param {Object} options - 图层参数。
 * @param {string} options.layerNames - 指定图层的名称列表，支持的类型为矢量图层。
 * @param {string} options.layersID - 获取进行切片的地图图层 ID。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务器类型。
 * @param {string}  [options.cartoCSS] - 客户端CartoCSS样式字符串。
 * @param {boolean} [options.serverCartoCSSStyle=true] - 是否使用服务端 CartoCSS 样式。
 * @param {boolean} [options.processCharacters=false] - 设置客户端CartoCSS样式时是否进行特定字符转换。
 * @param {L.Proj.CRS} [options.crs] - 坐标系统类。
 * @param {boolean} [options.returnAttributes=false] - 是否返回 attributes。
 * @param {string} [options.expands] - expands。
 * @param {boolean} [options.cacheEnabled=true] - 是否使用服务器缓存出图。
 * @param {Object} [options.tileTemplate] - 瓦片模板，如果设置了此参数，则按此模板出图，URL 无效（对接第三方瓦片）。
 * @param {string} [options.subdomains] - 子域名。
 * @param {num} [options.timeout=10000] - timeout。
 * @param {string} [options.attribution='Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' title='SuperMap iServer' target='_blank'>SuperMap iServer</a></span>`] - 版权信息。
 */
export var TileVectorLayer = VectorGrid.extend({

    options: {
        //服务器类型<SuperMap.ServerType>iServer|iPortal|Online
        serverType: null,
        crs: null,
        //客户端cartocss样式
        cartoCSS: null,
        // 指定图层的名称列表。支持的类型为矢量图层
        layerNames: null,
        //获取进行切片的地图图层 ID
        layersID: null,
        //是否服务端CartoCSS样式，默认使用
        serverCartoCSSStyle: true,
        //设置客户端CartoCSS样式时是否进行特定字符转换
        processCharacters: false,

        returnAttributes: false,

        /*各图层扩展的像素值。
         *例如：
         * 0_15:0_5,1_10：表示顶级0图层的0、1子图层扩展的像素分别为5、10像素；顶级0图层下，除0、1图层外的子图层的扩展像素都为15像素。
         * 0:0_5,1_10：表示顶级0图层的0、1子图层扩展的像素分别为5、10像素；顶级0图层下，其他除0、1图层外的子图层的扩展像素为根据该图层默认样式计算得出的默认值。
         */
        expands: null,
        cacheEnabled: false,
        //瓦片模板，如果设置了此参数，则按此模板出图，url无效（对接第三方瓦片）
        tileTemplate: null,
        subdomains: 'abc',

        timeout: 10000,
        attribution: Attributions.Common.attribution
    },

    initialize: function (url, options) {
        options = options || {};
        options.noWrap = (options.noWrap == null) ? true : options.noWrap;
        L.setOptions(this, options);
        VectorGrid.prototype.initialize.call(this, options);
        L.stamp(this);
        var me = this;

        if (!url || url.indexOf("http") < 0) {
            url = "";
            return this;
        }

        me.url = url;
        if (url.indexOf("/") === (url.length - 1)) {
            url = url.substr(0, url.length - 1);
            me.url = url;
        }
        this.cartoCSSToLeaflet = new CartoCSSToLeaflet(me.url);
        me.initLayersInfo();
        if (!me.options.serverCartoCSSStyle && me.options) {
            me.setClientCartoCSS(me.options.cartoCSS);
        }
    },

    /**
     * @private
     * @function L.supermap.tiledVectorLayer.prototype.onAdd
     * @description 添加地图。
     * @param {L.map} map - 待添加的地图。
     */
    onAdd: function (map) {
        this._crs = this.options.crs || map.options.crs;
        this._map = map;
        this._initLayerUrl();
        if (this.options.tileTemplate || !this.options.serverCartoCSSStyle) {
            this._initGrid();
        }
    },

    /**
     * @private
     * @function L.supermap.tiledVectorLayer.prototype.initLayersInfo
     * @description 获取服务器 layers 资源下的风格信息（当 CartoCSS 中不存在相应图层渲染信息时使用）。
     */
    initLayersInfo: function () {
        var me = this;
        var layersUrl = me.url + "/layers.json";
        FetchRequest.get(layersUrl, null, {
            timeout: me.options.timeout
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            me.layersInfoInitialized = true;
            me.layersInfo = json;
            if (!me.layersInfo) {
                return;
            }
            var layersInfo = {};
            for (var i = 0, len = me.layersInfo.length; i < len; i++) {
                var layers = me.layersInfo[i].subLayers.layers;
                for (var j = 0, len1 = layers.length; j < len1; j++) {
                    layers[j].layerIndex = len1 - j;
                    layersInfo[layers[j].name] = layers[j];
                }
            }
            me.layersInfo = layersInfo;
            if (me.options.serverCartoCSSStyle) {
                me.getVectorStylesFromServer();
            }
        }).catch(function (ex) {
            console.error('error', ex)
        });
    },

    /**
     * @function L.supermap.tiledVectorLayer.prototype.getLayerStyleInfo
     * @description 获取图层样式信息。
     * @param {string} layerName - 图层名称。
     */
    getLayerStyleInfo: function (layerName) {
        var me = this,
            layerInfo_simple;
        me.layersStyles = me.layersStyles || {};

        layerInfo_simple = me.layersStyles[layerName];
        if (layerInfo_simple) {
            return layerInfo_simple;
        }

        if (!me.layersInfo) {
            return {};
        }
        var layerInfo = me.layersInfo[layerName];
        if (!layerInfo) {
            return null;
        }
        layerInfo_simple = {
            layerIndex: layerInfo.layerIndex,
            ugcLayerType: layerInfo.ugcLayerType
        };
        switch (layerInfo.ugcLayerType) {
            case "VECTOR":
                layerInfo_simple.layerStyle = layerInfo.style ? layerInfo.style : null;
                break;
            case "THEME":
                var theme = layerInfo.theme;
                //标注图层特别标明
                layerInfo_simple.layerStyle = theme ? theme.defaultStyle : null;
                if (theme && theme.type === "LABEL") {
                    layerInfo_simple.type = theme.type;
                    layerInfo_simple.textField = theme.labelExpression;
                }
                break;
            default:
                //SVTile发布出来的地图没有ugcLayerType属性
                if (layerInfo.style) {
                    layerInfo_simple.layerStyle = layerInfo.style;
                }
                break;
        }
        me.layersStyles[layerName] = layerInfo_simple;
        return layerInfo_simple;
    },

    /*
     * @function L.supermap.tiledVectorLayer.prototype.getVectorStylesFromServer
     * @description 等待服务器的 carto 返回之后拼接本地配置的 cartoCSS,并调用 onAdd 出图。
     */
    getVectorStylesFromServer: function () {
        var me = this;
        var vectorStyleUrl = me.url + "/tileFeature/vectorstyles.json";
        FetchRequest.get(vectorStyleUrl, null, {
            timeout: me.options.timeout
        }).then(function (response) {
            return response.json()
        }).then(function (styles) {
            if (!styles || !styles.style) {
                return null;
            }
            if (styles.style && styles.type === 'cartoCSS') {
                me.setServerCartoCSS(styles.style);
            }
            if (me.options) {
                me.setClientCartoCSS(me.options.cartoCSS);
            }
            me._initGrid();
        }).catch(function (ex) {
            console.error('error', ex)
        });
    },

    /**
     * @private
     * @function L.supermap.tiledVectorLayer.prototype.setServerCartoCSS
     * @description 设置服务端获取到的 cartoCSS 样式,cartoCSS 请求回来之后自动调用。
     */
    setServerCartoCSS: function (cartoCSSStr) {
        this.cartoCSSToLeaflet.pretreatedCartoCSS(cartoCSSStr, true);
    },
    /**
     * @function L.supermap.tiledVectorLayer.prototype.setClientCartoCSS
     * @description 客户端设置 cartoCSS 样式。
     */
    setClientCartoCSS: function (cartoCSSStr) {
        let processCharacters = false;
        if (this.options.processCharacters) {
            processCharacters = this.options.processCharacters;
        }
        this.cartoCSSToLeaflet.pretreatedCartoCSS(cartoCSSStr, processCharacters);
    },

    /**
     * @private
     * @function L.supermap.tiledVectorLayer.prototype.getVectorTileLayerStyle
     * @description 获取图层风格信息，当 CartoCSS 中包含有对该图层的渲染信息时，优先获取，否则获取 layers 资源下 layerSytle 的渲染信息。
     * @param {Object} coords - 图层坐标参数对象。
     * @param {L.feature} feature - 要获取的要素。
     */
    getVectorTileLayerStyle: function (coords, feature) {
        if (!feature) {
            return null;
        }
        var me = this,
            layerName = feature.layerName,
            layerStyleInfo = me.getLayerStyleInfo(layerName);

        //处理标签图层
        if (layerStyleInfo.textField) {
            var textField = layerStyleInfo.textField;
            if (textField && textField.indexOf('.')) {
                var arr = textField.split('.');
                textField = arr && arr.length > 0 && arr[arr.length - 1];
            }
            feature.properties.textField = textField;
        }

        me.vectorTileLayerStyles = me.vectorTileLayerStyles || {};

        var style = me.vectorTileLayerStyles[layerName];
        if (style) {
            feature = this._mergeFeatureTextField(feature, style);
            return style;
        }

        // SuperMap.CartoCSSToLeaflet内部做了客户端配置的cartoCSS和服务端cartoCSS的拼接处理
        // 客户端配置的cartoCSS会覆盖相应图层的服务端cartoCSS
        var scale = this.getScaleFromCoords(coords);
        var shaders = this.cartoCSSToLeaflet.pickShader(layerName) || [];
        style = [];
        for (var itemKey in shaders) {
            var shader = shaders[itemKey];
            for (var j = 0; j < shader.length; j++) {
                var serverStyle = this.cartoCSSToLeaflet.getValidStyleFromCarto(coords.z, scale, shader[j], feature);
                if (serverStyle) {
                    style.push(serverStyle);
                }
            }
        }

        feature = this._mergeFeatureTextField(feature, style);

        //次优先级是layers资源的默认的样式，最低优先级是CartoDefaultStyle的样式
        if (feature.type === "TEXT" ||  style.length === 0) {
            style = this.cartoCSSToLeaflet.getValidStyleFromLayerInfo(feature, layerStyleInfo);
            if (feature.type === "TEXT") {
                style.textName = "[" + feature.properties.textField + "]";
            }
        }

        me.vectorTileLayerStyles[layerName] = style;
        return style;
    },

    /**
     * @function L.supermap.tiledVectorLayer.prototype.getScale
     * @description 通过缩放级别获取比例尺。
     * @param {number} zoom - 缩放级别。
     * @returns {number} 比例尺。
     */
    getScale: function (zoom) {
        var me = this;
        //返回当前比例尺
        var z = zoom || me._map.getZoom();
        return me.scales[z];
    },

    /**
     * @function L.supermap.tiledVectorLayer.prototype.getScaleFromCoords
     * @description 通过行列号获取比例尺。
     * @param {Object} coords - 行列号。
     * @returns {number} 比例尺。
     */
    getScaleFromCoords: function (coords) {
        var me = this,
            scale;
        if (me.scales && me.scales[coords.z]) {
            return me.scales[coords.z];
        }
        me.scales = me.scales || {};
        scale = me.getDefaultScale(coords);
        me.scales[coords.z] = scale;
        return scale;
    },

    /**
     * @private
     * @function L.supermap.tiledVectorLayer.prototype.getDefaultScale
     * @description 根据行列号获取默认比例尺。
     * @param {Object} coords - 行列号。
     * @returns {number} 默认比例尺。
     */
    getDefaultScale: function (coords) {
        var me = this,
            crs = me._crs;
        if (crs.scales) {
            return crs.scales[coords.z];
        } else {
            var tileBounds = me._tileCoordsToBounds(coords);
            var ne = crs.project(tileBounds.getNorthEast());
            var sw = crs.project(tileBounds.getSouthWest());
            var tileSize = me.options.tileSize;
            var resolution = Math.max(
                Math.abs(ne.x - sw.x) / tileSize,
                Math.abs(ne.y - sw.y) / tileSize
            );
            var mapUnit = Unit.METER;
            if (crs.code) {
                var array = crs.code.split(':');
                if (array && array.length > 1) {
                    var code = parseInt(array[1]);
                    mapUnit = code && code >= 4000 && code <= 5000 ? Unit.DEGREE : Unit.METER;
                }
            }
            return Util.resolutionToScale(resolution, 96, mapUnit);
        }
    },

    _mergeFeatureTextField: function (feature, style) {
        //如果设置了使用服务端cartocss样式，则文本专题图图层优先从carto中读取文本字段的key
        if (!this.options.serverCartoCSSStyle || !style || feature.type !== "TEXT") {
            return feature;
        }

        var tempStyle = style;
        if (!L.Util.isArray(style)) {
            tempStyle = [style];
        }
        for (var i = 0; i < tempStyle.length; i++) {
            var textName = tempStyle[i].textName;
            if (textName && feature.properties) {
                feature.properties.textField = textName.substring(1, textName.length - 1);
            }
        }

        return feature;
    },

    _getTileUrl: function (coords) {
        var me = this,
            tileTemplate = me.options.tileTemplate;
        if (!tileTemplate) {
            return me._getDefaultTileUrl(coords);
        }
        return me._getTileTemplateUrl(coords)
    },

    _getTileTemplateUrl: function (coords) {
        var me = this,
            tileTemplate = me.options.tileTemplate;
        var data = {
            s: me._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: coords.z
        };
        if (me._map && !me._map.options.crs.infinite) {
            var invertedY = me._globalTileRange.max.y - coords.y;
            if (me.options.tms) {
                data['y'] = invertedY;
            }
            data['-y'] = invertedY;
        }

        var tileUrl = L.Util.template(tileTemplate, L.extend(data, me.options));
        return tileUrl;
    },

    _initGrid: function () {
        VectorGrid.prototype.onAdd.call(this, this._map);
    },

    _getSubdomain: L.TileLayer.prototype._getSubdomain,
    _getDefaultTileUrl: function (coords) {
        var x = coords.x,
            y = coords.y;
        var tileUrl = this._tileUrl + "&x=" + x + "&y=" + y;
        var scale = this.getScaleFromCoords(coords);
        tileUrl += "&scale=" + scale;
        return tileUrl;
    },

    _initLayerUrl: function () {
        var options = this.options;
        if (!this.url) {
            return;
        }
        var format = options.format.toString().toLowerCase();
        this._tileUrl = this.url + "/tileFeature." + format + "?";
        this._tileUrl += encodeURI(this._createURLParam(options));
    },

    _createURLParam: function (options) {
        var params = [];

        //添加安全认证信息
        var credential = this._getCredential();
        if (credential) {
            params.push(credential);
        }
        if (options.layersID) {
            params.push("layersID=" + options.layersID);
        }
        if (options.layerNames) {
            if (!L.Util.isArray(options.layerNames)) {
                options.layerNames = [options.layerNames];
            }
            var layerNamesString = '[' + options.layerNames.join(',') + ']';
            params.push("layerNames=" + layerNamesString);
        }
        //切片的起始参考点，默认为地图范围的左上角。
        var crs = this._crs;
        if (crs.options && crs.options.origin) {
            params.push("origin=" + JSON.stringify({
                x: crs.options.origin[0],
                y: crs.options.origin[1]
            }));
        } else if (crs.projection && crs.projection.bounds) {
            var bounds = crs.projection.bounds;
            var tileOrigin = L.point(bounds.min.x, bounds.max.y);
            params.push("origin=" + JSON.stringify({
                x: tileOrigin.x,
                y: tileOrigin.y
            }));
        }
        if (options.expands) {
            params.push("expands=" + options.expands);
        }

        params.push("returnAttributes=" + options.returnAttributes);

        params.push("cacheEnabled=" + options.cacheEnabled);

        var tileSize = this.options.tileSize;
        params.push("width=" + tileSize);
        params.push("height=" + tileSize);
        return params.join("&");
    },

    //获取token或key表达式
    _getCredential: function (url) {
        var credential, value;
        switch (this.options.serverType) {
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
            return credential.getUrlParameters();
        }
        return null;
    }
});

export var tiledVectorLayer = function (url, options) {
    return new TileVectorLayer(url, options);
};

L.supermap.tiledVectorLayer = tiledVectorLayer;