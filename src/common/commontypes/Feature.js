import SuperMap from '../SuperMap';
import {Util} from './Util';

/**
 * @class SuperMap.Feature
 * @classdesc 要素类组合了地理和属性，Feature 类同时具有 marker 和 lonlat 属性。
 * @param layer - {SuperMap.Layer} 图层。
 * @param lonlat - {SuperMap.LonLat} 经纬度。
 * @param data - {Object} 数据对象。
 */
export default class Feature {

    /**
     * @deprecated
     * @member SuperMap.Feature.prototype.layer -{SuperMap.Layer}
     * @description layer
     */
    layer = null;

    /**
     * @member SuperMap.Feature.prototype.id -{String}
     * @description id
     */
    id = null;

    /**
     * @member SuperMap.Feature.prototype.lonlat -{SuperMap.LonLat}
     * @description lonlat
     *
     */
    lonlat = null;

    /**
     * @member SuperMap.Feature.prototype.data -{Object}
     * @description data
     */
    data = null;

    constructor(layer, lonlat, data) {
        this.layer = layer;
        this.lonlat = lonlat;
        this.data = (data != null) ? data : {};
        this.id = Util.createUniqueID(this.CLASS_NAME + "_");
    }

    /**
     * @function SuperMap.Feature.prototype.destroy
     * @description nullify references to prevent circular references and memory leaks
     */
    destroy() {

        this.id = null;
        this.lonlat = null;
        this.data = null;
    }

    CLASS_NAME = "SuperMap.Feature"
}
SuperMap.Feature = Feature;