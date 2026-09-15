/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import "../core/Base";
import Attributions from '../core/Attributions'

/**
 * @class CloudTileLayer
 * @deprecatedclassinstance L.supermap.cloudTileLayer
 * @classdesc 超图云服务图层类。
 * @category ThirdPartyMap
 * @modulecategory Mapping
 * @extends {L.TileLayer}
 * @param {string} [url='http://t2.dituhui.com/FileService/image?map={mapName}&type={type}&x={x}&y={y}&z={z}'] - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.type='web'] - type。
 * @param {number} [options.minZoom=3] - 最小缩放级别。
 * @param {number} [options.maxZoom=18] - 最大缩放级别。
 * @param {string} [options.mapName='quanguo'] - 地图名称。
 * @param {number} [options.bufferTiles=0] - 视野外预加载的瓦片圈数。默认 0 表示不预加载；为 1 时上下左右各多加载一圈，可减少平移时的空白块。
 * @param {boolean} [options.tileCache=false] - 是否启用客户端瓦片缓存。开启后缩放时优先使用已缓存瓦片填充，可避免放大、缩小、平移时的空白块。默认不启用。
 * @param {number} [options.tileCacheZoomRange=5] - tileCache 为 true 时生效。缓存瓦片相对当前视野的缩放范围倍数。缓存上限为视野瓦片数 × tileCacheZoomRange。默认值为 5。
 * @param {number} [options.maxOverzooming=8] - 缩放时保留父级（更低级别）瓦片的深度，用于放大过程中的占位填充。
 * @param {number} [options.maxUnderzooming=3] - 缩放时保留子级（更高级别）瓦片的深度，用于缩小过程中的占位填充。
 * @param {string} [options.attribution='Map Data ©2014 SuperMap - GS(2014)6070号-data©Navinfo'] - 版权描述信息。
 * @usage
 */
export var CloudTileLayer = L.TileLayer.extend({

    defaultURL: 'http://t2.dituhui.com/FileService/image',

    options: {
        /**
         * @member {string} [CloudTileLayer.prototype.options='quanguo']
         * @description 地图名称。
         */
        mapName: "quanguo",
        /**
         * @member {string} CloudTileLayer.prototype.type
         * @description 地图投影。
         */
        type: "web",
        minZoom: 3,
        maxZoom: 18,
        attribution: Attributions.Cloud.attribution
    },

    initialize: function (url, options) {
        L.setOptions(this, options);
        var cloudURL = url || this.defaultURL;
        this._url = cloudURL + "?map=" + this.options.mapName + "&type=" + this.options.type;
        L.stamp(this);
    },

    /**
     * @function CloudTileLayer.prototype.getTileUrl
     * @description 获取切片地址。
     * @param {Object} coords - 行列号。
     * @returns {string} 切片地址。
     */
    getTileUrl: function (coords) {
        var layerUrl = this._url;
        var tileUrl = layerUrl + "&x=" + coords.x + "&y=" + coords.y + "&z=" + coords.z;
        //支持代理
        if (this.options.tileProxy) {
            tileUrl = this.options.tileProxy + encodeURIComponent(tileUrl);
        }
        return tileUrl;
    }
});
export var cloudTileLayer = function (url, options) {
    return new CloudTileLayer(url, options);
};
