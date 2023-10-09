/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../../core/Base';
import {Util} from "../../core/Util";


/**
 * @class Graphic
 * @classdesc 高效率点图层点要素类。高效率点图层中的点要素，支持获取或修改点要素的属性、样式、几何信息。
 * @category  Visualization Graphic
 * @param {(Object|Array.<number>)} lngLat - 坐标。格式：经纬度数组或包含 {lng,lat} 格式对象。
 * @param {Object} style - 图形参数。
 * @param {Array.<number>} [style.color] - 点颜色。目前只支持 rgba 数组。
 * @param {Object} [style.radius] - 点半径。
 * @param {Object} [attributes] - 属性信息。
 * @example
 * var graphic = new Graphic(
 *    {
 *         lng:116,
 *         lat:39
 *    },{
 *         color:[255,0,0],
 *         radius:30
 *    }
 * });
 * @usage
 */
export class Graphic {
    constructor(lngLat, style, attributes) {

        this.lngLat = Util.isArray(lngLat) ? {lng: lngLat[0], lat: lngLat[1]} : lngLat;
        this.style = Util.extend({}, style);
        this.attributes = attributes;
    }
    /**
     * @function Graphic.prototype.getId
     * @description 获取当前 ID。
     * @returns {string} ID。
     */
    getId() {
        return this.id;
    }

    /**
     * @function Graphic.prototype.setId
     * @description 设置当前要素 ID。
     * @param {string} id - 要素 ID。
     */

    setId(id) {
        this.id = id;
    }

    /**
     * @function Graphic.prototype.getLngLat
     * @description 获取经纬度坐标。
     * @returns {Object} 经纬度坐标，数据格式{lng,lat}。
     */
    getLngLat() {
        return this.lngLat;
    }

    /**
     * @function Graphic.prototype.setLngLat
     * @description 设置经纬度坐标。
     * @param {Object} lngLat - 经纬度坐标，数据格式{lng,lat}。
     */
    setLngLat(lngLat) {
        this.lngLat = Util.isArray(lngLat) ? {lng: lngLat[0], lat: lngLat[1]} : lngLat;
    }

    /**
     * @function Graphic.prototype.setStyle
     * @description 设置点样式。
     * @param {Object} style -样式选项。
     * @param {Array} [style.color] - 颜色。
     * @param {number} [style.radius] - 半径。
     */
    setStyle(style) {
        this.style = Util.extend(this.style, style);
    }

    /**
     * @function Graphic.prototype.getStyle
     * @description 获取样式。
     * @returns {Object} 点样式。
     */
    getStyle() {
        return this.style;
    }

    /**
     * @function Graphic.prototype.setAttributes
     * @description 设置属性信息。
     * @param {Object} [attributes] - 属性信息。
     */
    setAttributes(attributes) {
        this.attributes = Util.extend({}, this.attributes, attributes);
    }

    /**
     * @function Graphic.prototype.getAttributes
     * @description 获取属性信息。
     * @returns {Object} 属性信息。
     */
    getAttributes() {
        return this.attributes;
    }
}

