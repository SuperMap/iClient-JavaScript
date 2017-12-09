import {SuperMap} from '../SuperMap';
import {Util} from './Util';

/**
 * @class SuperMap.Feature
 * @classdesc 要素类组合了地理和属性，Feature 类同时具有 marker 和 lonlat 属性。
 * @param layer - {SuperMap.Layer} 图层。
 * @param lonlat - {SuperMap.LonLat} 经纬度。
 * @param data - {Object} 数据对象。
 */
export class Feature {


    constructor(layer, lonlat, data) {
        this.CLASS_NAME = "SuperMap.Feature";
        /**
         * @deprecated
         * @member SuperMap.Feature.prototype.layer - {SuperMap.Layer}
         * @description 图层。
         */
        this.layer = layer;

        /**
         * @member SuperMap.Feature.prototype.id - {string}
         * @description 要素id。
         */
        this.id = Util.createUniqueID(this.CLASS_NAME + "_");

        /**
         * @member SuperMap.Feature.prototype.lonlat - {SuperMap.LonLat}
         * @description 经纬度。
         *
         */
        this.lonlat = lonlat;

        /**
         * @member SuperMap.Feature.prototype.data - {Object}
         * @description 数据对象。
         */
        this.data = (data != null) ? data : {};

    }

    /**
     * @function SuperMap.Feature.prototype.destroy
     * @description 释放相关资源。
     */
    destroy() {
        this.id = null;
        this.lonlat = null;
        this.data = null;
    }
}

SuperMap.Feature = Feature;