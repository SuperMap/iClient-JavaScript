/**
 * Class: L.SuperMap.TileLayer
 * SuperMap iServer 的 REST 地图服务的图层(SuperMap iServer Java 6R 及以上分块动态 REST 图层)
 * 用法：
 *      L.superMap.TileLayer(url,{projection:"3857"}).addTo(map);
 */
require('../../base');
require('../../../Core/base');

TiledMapLayer = L.TileLayer.extend({

    options: {
        url: null,
        transparent: null,
        cacheEnabled: null,
        layersID: null, //如果有layersID，则是在使用专题图
        projection: null
    },

    initialize: function (url, options) {
        this.options.url = url;
        L.setOptions(this, options);
        this._initParams();
        L.stamp(this);
    },

    onAdd: function (map) {
        this._crs = this.options.crs || map.options.crs;
        L.TileLayer.prototype.onAdd.call(this, map);
    },

    getTileUrl: function (coords) {
        var x = coords.x;
        var y = coords.y;
        var zoom = coords.z;

        //使用ViewBounds出图
        var tileBounds = this._tileCoordsToBounds(coords),
            nw = this._crs.project(tileBounds.getNorthWest()),
            se = this._crs.project(tileBounds.getSouthEast()),
            left = nw.x,
            bottom = se.y,
            right = se.x,
            top = nw.y;

        var tileUrl = this._layerUrl + "&viewBounds=" + "{\"leftBottom\" : {\"x\":" + left + ",\"y\":" + bottom + "},\"rightTop\" : {\"x\":" + right + ",\"y\":" + top + "}}";
        tileUrl += "&scale=" + this._scales[zoom];
        var epsg = this.options.projection === "4326" ? 4326 : 3857;
        tileUrl += "&prjCoordSys={\"epsgCode\":" + epsg + "}";
        return tileUrl;
    },

    _initParams: function () {
        var options = this.options;
        if (!options.url) {
            return;
        }
        //如果有projection，并且只能是4326或者3857的地图。
        options.projection = (options.projection && options.projection === "4326") ? "4326" : "3857";
        this._layerUrl = this._initLayerUrl(options);
        this._scales = this._initScales(options.projection);
    },

    _initLayerUrl: function (options) {
        var layerUrl = options.url + "/image.png?redirect=false&width=256&height=256";

        //为url添加安全认证信息片段
        if (SuperMap.Credential && SuperMap.Credential.CREDENTIAL) {
            layerUrl += "&" + SuperMap.Credential.CREDENTIAL.getUrlParameters();
        }

        var transparent = (options.transparent !== undefined) ? options.transparent : true;
        layerUrl += "&transparent=" + transparent;

        var cacheEnabled = (options.cacheEnabled !== undefined) ? options.cacheEnabled : false;
        layerUrl += "&cacheEnabled=" + cacheEnabled;

        if (!options.layersID) {
            layerUrl += "&layersID=" + options.layersID;
        }

        layerUrl += "&projection=" + options.projection;
        return layerUrl;
    },

    _initScales: function (projection) {
        var resLen = 17, resStart = 0, dpi = 95.99999999999984, scales = [];
        if (projection === "3857") {
            for (var i = resStart; i <= resLen; i++) {
                var res3857 = 156543.0339 / Math.pow(2, i);
                var scale3857 = 0.0254 / dpi / res3857;
                scales.push(scale3857);
            }
        } else {
            for (var i = resStart; i <= resLen; i++) {
                var res4326 = 1.40625 / Math.pow(2, i);
                var scale4326 = 0.0254 * 360 / dpi / res4326 / Math.PI / 2 / 6378137;
                scales.push(scale4326);
            }
        }
        return scales;
    }
});

L.supermap.tiledMapLayer = function (url, options) {
    return new TiledMapLayer(url, options);
};

module.exports = L.supermap.tiledMapLayer;