/**
 * Class: TileLayer
 * SuperMap iServer 的 REST 地图服务的图层(SuperMap iServer Java 6R 及以上分块动态 REST 图层)
 * 用法：
 *      L.superMap.TileLayer(url,{CRS:L.CRS.EPSG4326}).addTo(map);
 */
require('../../base');
require('../../../Core/base');

TiledMapLayer = L.TileLayer.extend({

    options: {
        url: null,
        transparent: null,
        cacheEnabled: null,
        layersID: null, //如果有layersID，则是在使用专题图
        crs: null
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
        var x = coords.x, y = coords.y, zoom = coords.z;
        //使用ViewBounds出图
        var tileBounds = this._tileCoordsToBounds(coords),
            nw = this._crs.project(tileBounds.getNorthWest()),
            se = this._crs.project(tileBounds.getSouthEast());
        var tileUrl = this._layerUrl + "&viewBounds=" + "{\"leftBottom\" : {\"x\":" + nw.x + ",\"y\":" + se.y + "},\"rightTop\" : {\"x\":" + se.x + ",\"y\":" + nw.y + "}}";

        var crs = this._crs, scale = crs.scale(zoom);
        tileUrl += "&scale=" + scale;
        return tileUrl;
    },

    _initParams: function () {
        var options = this.options;
        if (!options.url) {
            return;
        }
        this._layerUrl = this._initLayerUrl(options);
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

        return layerUrl;
    }
});

L.supermap.tiledMapLayer = function (url, options) {
    return new TiledMapLayer(url, options);
};

module.exports = L.supermap.tiledMapLayer;