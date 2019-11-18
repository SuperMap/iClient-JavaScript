/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import "../core/Base";
import {
    WMTSLayer
} from "./TileLayer.WMTS";
import Attributions from '../core/Attributions'

/**
 * @class L.supermap.tiandituTileLayer
 * @classdesc 天地图图层类。
 * @category ThirdPartyMap
 * @extends L.supermap.wmtsLayer
 * @param {Object} options - 切片图层参数。
 * @param {string} [options.url='http://t{s}.tianditu.gov.cn/{layer}_{proj}/wmts?'] - 地图地址。
 * @param {string} options.key - 天地图服务密钥。详见{@link http://lbs.tianditu.gov.cn/server/MapService.html}
 * @param {string} [options.layerType='vec'] - 图层类型。(vec:矢量图层，img:影像图层，ter:地形图层)
 * @param {string} [options.style='default'] - 图层风格。
 * @param {string} [options.format='tiles'] - 格式。
 * @param {boolean} [options.isLabel=false] - 是否是标注图层。
 * @param {Array.<number>} [options.subdomains=[0, 1, 2, 3, 4, 5, 6, 7]] - 子域名数组。
 * @param {string} [options.attribution='Map Data <a href='http://www.tianditu.gov.cn' target='_blank'><img style='background-color:transparent;bottom:2px;opacity:1;' src='http://api.tianditu.gov.cn/img/map/logo.png' width='53px' height='22px' opacity='0'></a>'] - 版权信息
 */
export var TiandituTileLayer = WMTSLayer.extend({

    layerLabelMap: {
        "vec": "cva",
        "ter": "cta",
        "img": "cia"
    },
    layerZoomMap: {
        "vec": 18,
        "ter": 14,
        "img": 18
    },
    options: {
        layerType: "vec", //(vec:矢量图层，vec:矢量标签图层，img:影像图层,cia:影像标签图层，ter:地形,cta:地形标签图层)
        isLabel: false,
        attribution: Attributions.Tianditu.attribution,
        url: "http://t{s}.tianditu.gov.cn/{layer}_{proj}/wmts?",
        zoomOffset: 1,
        key: "",
        dpi: 96,
        style: "default",
        format: "tiles",
        subdomains: [0, 1, 2, 3, 4, 5, 6, 7]
    },

    initialize: function (options) {
        options = options || {};
        L.setOptions(this, options);
        this.options.layer = this.options.isLabel ? this.layerLabelMap[this.options.layerType] : this.options.layerType;
        this.options.maxZoom = this.layerZoomMap[this.options.layerType] - 1;
        WMTSLayer.prototype.initialize.call(this, this.options.url, this.options);
        L.stamp(this);
    },
    onAdd: function (map) {
        this.options.tilematrixSet = map.options.crs.code === "EPSG:4326" ? "c" : "w";
        if (this.options.key) {
            this._url = `${this._url}tk=${this.options.key}`;
        }
        this._url = this._url.replace("{layer}", this.options.layer).replace("{proj}", this.options.tilematrixSet);
        WMTSLayer.prototype.onAdd.call(this, map);
    }
});
export var tiandituTileLayer = function (options) {
    return new TiandituTileLayer(options);
};

L.supermap.tiandituTileLayer = tiandituTileLayer;