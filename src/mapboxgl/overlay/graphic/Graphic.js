import mapboxgl from 'mapbox-gl';
import '../../core/Base';
import {Util} from "../../core/Util";


/**
 * @class mapboxgl.supermap.Graphic
 * @classdesc 高效率点图层点要素类。
 * @category Visualization Graphic
 * @param lngLat - {Object|Array<number>} 坐标。格式：经纬度数组或包含{lng,lat}格式对象
 * @param {Object} style - 图形参数。</br>
 * @param {Array} style.color - 点颜色，目前只支持rgba数组
 * @param {Object} style.radius - 点半径
 * @param {Object} properties - 额外属性信息
 * @example
 *  var graphic = new mapboxgl.supermap.Graphic(
 *          {
 *              lng:116,
 *              lat:39
 *          },{
 *              color:[255,0,0],
 *              radius:30
 *          }
 *  });
 */
export class Graphic {
    constructor(lngLat, style, properties) {

        this.lngLat = Util.isArray(lngLat) ? {lng: lngLat[0], lat: lngLat[1]} : lngLat;
        this.style = Util.extend({}, style);
        this.properties = properties;
    }

    /**
     * @function mapboxgl.supermap.Graphic.prototype.getLngLat
     * @description 获取经纬度坐标
     * @return {Object} 经纬度坐标,数据格式{lng,lat}
     */
    getLngLat() {
        return this.lngLat;
    }

    /**
     * @function mapboxgl.supermap.Graphic.prototype.setLngLat
     * @description 设置经纬度坐标
     * @param lngLat -{Object} 经纬度坐标,数据格式{lng,lat}
     */
    setLngLat(lngLat) {
        this.lngLat = Util.isArray(lngLat) ? {lng: lngLat[0], lat: lngLat[1]} : lngLat;
    }

    /**
     * @function mapboxgl.supermap.Graphic.prototype.setStyle
     * @description 设置点样式
     * @param style -{Object} 样式选项
     * @param {Array} style.color - 颜色
     * @param {number} style.radius - 半径
     */
    setStyle(style) {
        this.style = Util.extend(this.style, style);
    }

    /**
     * @function mapboxgl.supermap.Graphic.prototype.getStyle
     * @description 获取样式
     * @return {Object} 点样式
     */
    getStyle() {
        return this.style;
    }

    /**
     * @function mapboxgl.supermap.Graphic.prototype.setProperties
     * @description 设置额外属性信息
     * @param properties -{Object} 额外属性信息
     */
    setProperties(properties) {
        this.properties = Util.extend({}, this.properties, properties);
    }

    /**
     * @function mapboxgl.supermap.Graphic.prototype.setProperties
     * @description 获取额外属性信息
     * @return {Object} 额外属性信息
     */
    getProperties() {
        return this.properties;
    }
}

mapboxgl.supermap.Graphic = Graphic;
