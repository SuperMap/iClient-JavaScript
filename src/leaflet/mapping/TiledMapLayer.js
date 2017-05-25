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
        url: null,
        serverType: SuperMap.ServerType.ISERVER,
        transparent: null,
        cacheEnabled: null,
        layersID: null, //如果有layersID，则是在使用专题图
        crs: null,
        attribution: ' with <a href="http://icltest.supermapol.com/">SuperMap iClient</a>'
    },

    initialize: function (url, options) {
        this.options.url = url;
        L.TileLayer.prototype.initialize.apply(this, arguments);
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

        var layerUrl = options.url + "/image.png?redirect=false";

        layerUrl = this._appendCredential(layerUrl);

        if (options.layersID) {
            layerUrl += "&layersID=" + options.layersID;
        }

        var transparent = (options.transparent) ? options.transparent : false;
        layerUrl += "&transparent=" + transparent;

        var cacheEnabled = (options.cacheEnabled) ? options.cacheEnabled : true;
        layerUrl += "&cacheEnabled=" + cacheEnabled;

        var tileSize = this.options.tileSize;
        layerUrl += "&width=" + tileSize + "&height=" + tileSize;

        return layerUrl;
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