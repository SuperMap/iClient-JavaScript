/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import "../core/Base";
import Attributions from '../core/Attributions'

/**
 * @class L.supermap.cloudTileLayer
 * @classdesc 超图云服务图层。
 * @category ThirdPartyMap
 * @extends {L.TileLayer}
 * @param {string} [url='http://t2.dituhui.com/FileService/image?map={mapName}&type={type}&x={x}&y={y}&z={z}'] - 服务地址。
 * @param {Object} options - 图层可选参数。
 * @param {string} [options.type='web'] - type。
 * @param {number} [options.minZoom=3] - 最小缩放级别。
 * @param {number} [options.maxZoom=18] - 最大缩放级别。
 * @param {string} [options.mapName='quanguo'] - 地图名称。
 * @param {string} [options.attribution='Map Data ©2014 SuperMap - GS(2014)6070号-data©Navinfo'] - 版权信息。
 */
export var CloudTileLayer = L.TileLayer.extend({

    defaultURL: 'http://t2.dituhui.com/FileService/image',

    options: {
        /**
         * @member {string} [L.supermap.cloudTileLayer.prototype.options='quanguo']
         * @description 地图名称。
         */
        mapName: "quanguo",
        /**
         * @member {string} L.supermap.cloudTileLayer.prototype.type
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
     * @function L.supermap.cloudTileLayer.prototype.getTileUrl
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

L.supermap.cloudTileLayer = cloudTileLayer;