/**
 * Class: TiledMapLayer
 * SuperMap iServer 的 REST 地图服务的图层(SuperMap iServer Java 6R 及以上分块动态 REST 图层)
 * 用法：
 *      L.superMap.tiledMapLayer(url,{CRS:L.CRS.EPSG4326}).addTo(map);
 */
require('../core/Base');
require('../../common/security/SecurityManager');
var L = require("leaflet");
var SuperMap = require("../../common/SuperMap");
var TiledMapLayer = L.TileLayer.extend({

    options: {
        //如果有layersID，则是在使用专题图
        layersID: null,
        //如果为 true，则将请求重定向到图片的真实地址；如果为 false，则响应体中是图片的字节流
        redirect: false,
        transparent: null,
        cacheEnabled: null,
        clipRegionEnabled: false,
        //请求的地图的坐标参考系统。 如：prjCoordSys={"epsgCode":3857}。
        prjCoordSys: null,
        //切片的起始参考点，默认为地图范围的左上角。
        origin: null,
        //地图对象在同一范围内时，是否重叠显示
        overlapDisplayed: true,
        //避免地图对象压盖显示的过滤选项
        overlapDisplayedOptions: null,
        //切片版本名称，cacheEnabled 为 true 时有效。
        tileversion: null,

        crs: null,
        serverType: SuperMap.ServerType.ISERVER,

        attribution: 'Map Data <a href="http://support.supermap.com.cn/product/iServer.aspx">SuperMap iServer</a> with <a href="http://icltest.supermapol.com/">SuperMap iClient</a>'
    },

    initialize: function (url, options) {
        this.url = this._url = url;
        L.TileLayer.prototype.initialize.apply(this, arguments);
        L.setOptions(this, options);
        L.stamp(this);
    },

    onAdd: function (map) {
        this._crs = this.options.crs || map.options.crs;
        this._initLayerUrl();
        L.TileLayer.prototype.onAdd.call(this, map);
    },


    getTileUrl: function (coords) {
        var scale = this.getScaleFromCoords(coords);
        var tileUrl = this._layerUrl + "&scale=" + scale + "&x=" + coords.x + "&y=" + coords.y;
        return tileUrl;
    },

    setScales: function (scales) {
        this.scales = scales || this.scales;
    },

    getScale: function (zoom) {
        var me = this;
        //返回当前比例尺
        var z = zoom || me._map.getZoom();
        return me.scales[z];
    },

    getScaleFromCoords: function (coords) {
        var me = this, scale;
        if (me.scales && me.scales[coords.z]) {
            return me.scales[coords.z];
        }
        me.scales = me.scales || {};
        scale = me.getDefaultScale(coords);
        me.scales[coords.z] = scale;
        return scale;
    },

    getDefaultScale: function (coords) {
        var me = this, crs = me._crs;
        var resolution;
        if (crs.options && crs.options.resolutions) {
            resolution = crs.options.resolutions[coords.z];
        } else {
            var tileBounds = me._tileCoordsToBounds(coords);
            var ne = crs.project(tileBounds.getNorthEast());
            var sw = crs.project(tileBounds.getSouthWest());
            var tileSize = me.options.tileSize;
            resolution = Math.max(
                Math.abs(ne.x - sw.x) / tileSize,
                Math.abs(ne.y - sw.y) / tileSize
            );
        }

        var mapUnit = SuperMap.Unit.METER;
        if (crs.code && crs.code.indexOf("4326") > -1) {
            mapUnit = SuperMap.Unit.DEGREE;
        }
        return L.Util.resolutionToScale(resolution, 96, mapUnit);
    },

    _initLayerUrl: function () {
        var me = this;
        var layerUrl = me.url + "/tileImage.png?";
        layerUrl += me._initAllRequestParams().join('&');
        layerUrl = this._appendCredential(layerUrl);
        this._layerUrl = layerUrl;
    },

    _initAllRequestParams: function () {
        var me = this, options = me.options || {}, params = [];

        var tileSize = this.options.tileSize;
        params.push("width=" + tileSize);
        params.push("height=" + tileSize);

        var redirect = (options.redirect === true) ? options.redirect : false;
        params.push("redirect=" + redirect);

        var transparent = (options.transparent === true) ? options.transparent : false;
        params.push("transparent=" + transparent);

        var cacheEnabled = (options.cacheEnabled === false) ? options.cacheEnabled : true;
        params.push("cacheEnabled=" + cacheEnabled);

        if (options.prjCoordSys) {
            params.push("prjCoordSys=" + JSON.stringify(options.prjCoordSys));
        }

        if (options.layersID) {
            params.push("layersID=" + options.layersID);
        }

        if (options.clipRegionEnabled && options.clipRegion instanceof L.Path) {
            options.clipRegion = L.Util.toSuperMapGeometry(options.clipRegion.toGeoJSON());
            options.clipRegion = SuperMap.Util.toJSON(SuperMap.REST.ServerGeometry.fromGeometry(options.clipRegion));
            params.push("clipRegionEnabled=" + options.clipRegionEnabled);
            params.push("clipRegion=" + JSON.stringify(options.clipRegion));
        }

        //切片的起始参考点，默认为地图范围的左上角。
        if (options.origin) {
            var tileOrigin = options.origin;
            if (L.Util.isArray(options.origin)) {
                tileOrigin = L.latLng(options.origin);
            }
            params.push("origin={\"x\":" + tileOrigin.lng + "," + "\"y\":" + tileOrigin.lat + "}");
        }

        if (options.overlapDisplayed === false) {
            params.push("overlapDisplayed=false");
            if (options.overlapDisplayedOptions) {
                params.push("overlapDisplayedOptions=" + me.overlapDisplayedOptions.toString());
            }
        } else {
            params.push("overlapDisplayed=true");
        }

        if (options.cacheEnabled === true && options.tileversion) {
            params.push("tileversion=" + options.tileversion)
        }

        return params;
    },

    //追加token或key
    _appendCredential: function (url) {
        var newUrl = url, credential, value;
        switch (this.options.serverType) {
            case SuperMap.ServerType.ISERVER:
                value = SuperMap.SecurityManager.getToken(url);
                credential = value ? new SuperMap.Credential(value, "token") : null;
                break;
            case SuperMap.ServerType.IPORTAL:
                value = SuperMap.SecurityManager.getToken(url);
                credential = value ? new SuperMap.Credential(value, "token") : null;
                if (!credential) {
                    value = SuperMap.SecurityManager.getKey(url);
                    credential = value ? new SuperMap.Credential(value, "key") : null;
                }
                break;
            case SuperMap.ServerType.ONLINE:
                value = SuperMap.SecurityManager.getKey(url);
                credential = value ? new SuperMap.Credential(value, "key") : null;
                break;
            default:
                value = SuperMap.SecurityManager.getToken(url);
                credential = value ? new SuperMap.Credential(value, "token") : null;
                break;
        }
        if (credential) {
            newUrl += "&" + credential.getUrlParameters();
        }
        return newUrl;
    }
});

L.supermap.tiledMapLayer = function (url, options) {
    return new TiledMapLayer(url, options);
};

module.exports = TiledMapLayer;