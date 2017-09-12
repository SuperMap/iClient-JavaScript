import SuperMap from '../../SuperMap';
import Geometry from '../Geometry';
import Point from './Point';
import LineString from './LineString';
import Bounds from '../Bounds';
import Pixel from '../Pixel';
import LonLat from '../LonLat';
import {Util} from '../Util';

/**
 * @class SuperMap.Geometry.GeoText
 * @classdesc 文本标签类。
 * geometry 类型为 SuperMap.Geometry.GeoText 的要素在 Vector 中的展现由策略 {@link SuperMap.Strategy.GeoText} 控制
 * @extends {SuperMap.Geometry}
 * @param x {float} x-坐标，必设参数。
 * @param y {float} y-坐标，必设参数。
 * @param text {string} 标签中的文本内容，必设参数。
 * @example
 * (start code)
 * var geoText = new SuperMap.Geometry.GeoText(100, 35,"中华人民共和国");
 * var geotextFeature = new SuperMap.Feature.Vector(geoText);
 *
 * //新建一个策略并使用在矢量要素图层(vector)上。
 * var strategy = new SuperMap.Strategy.GeoText();
 * strategy.style = {
 *   fontColor:"#FF7F00",
 *   fontWeight:"bolder",
 *   fontSize:"14px",
 *   fill: true,
 *   fillColor: "#FFFFFF",
 *   fillOpacity: 1,
 *   stroke: true,
 *   strokeColor:"#8B7B8B"
 * };
 * (end)
 */
export default class GeoText extends Geometry {
    /**
     * @member SuperMap.Geometry.GeoText.prototype.x -{float}
     * @description 横坐标。
     */
    x = null;

    /**
     * @member SuperMap.Geometry.GeoText.prototype.y -{float}
     * @description 纵坐标。
     */
    y = null;

    /**
     * @member SuperMap.Geometry.GeoText.prototype.text -{string}
     * @description 标签中的文本内容。
     */
    text = null;

    /**
     * @member SuperMap.Geometry.GeoText.prototype.bsInfo -{Object}
     * @description 标签范围的基础信息，包含下面2个属性。
     *  * w: bounds 的宽；
     *  * h: bounds 的高度；

     */
    bsInfo = null;

    constructor(x, y, text) {
        super(x, y, text);

        this.bsInfo = {
            "h": null,
            "w": null
        };

        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.text = text.toString();
        this.element = document.createElement('span');
    }

    /**
     * @function SuperMap.Geometry.GeoText.prototype.destroy
     * @description 销毁文本标签类。
     */
    destroy() {
        super.destroy();
        this.x = null;
        this.y = null;
        this.text = null;
    }

    /**
     * @function SuperMap.Geometry.GeoText.prototype.clone
     * @description 克隆标签对象。
     * @returns {SuperMap.Geometry.GeoText} 克隆后的标签对象。
     */
    clone(obj) {
        if (obj == null) {
            obj = new GeoText(this.x, this.y, this.text);
        }
        Util.applyDefaults(obj, this);
        return obj;
    }

    /**
     * @function SuperMap.Geometry.GeoText.prototype.calculateBounds
     * @description 计算标签对象的范围。
     */
    calculateBounds() {
        this.bounds = new Bounds(this.x, this.y,
            this.x, this.y);
    }

    CLASS_NAME = "SuperMap.Geometry.GeoText"
}
SuperMap.Geometry.GeoText = GeoText;