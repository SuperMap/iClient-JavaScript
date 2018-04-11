import ol from 'openlayers';

/**
 * @class ol.Graphic
 * @category  Visualization Graphic
 * @classdesc 高效率点图层点要素类
 * @param geometry - [ol.geom.Point]{@linkdoc-openlayers/ol.geom.Point} 几何对象
 * @param attributes - {Object} 要素属性
 * @extends ol.Object{@linkdoc-openlayers/ol.Object}
 */
export class Graphic extends ol.Object {

    constructor(geometry, attributes) {
        super();
        if (geometry instanceof ol.geom.Geometry) {
            this.geometry_ = geometry;
        }
        this.attributes_ = attributes;
        this.setStyle();
    }

    /**
     * @function ol.Graphic.prototype.clone
     * @description 克隆当前要素
     * @return {ol.Graphic} 克隆后的要素
     */
    clone() {
        var clone = new Graphic();
        clone.setId(this.id_);
        clone.setGeometry(this.geometry_);
        clone.setAttributes(this.attributes_);
        clone.setStyle(this.style_);
        return clone;
    }

    /**
     * @function ol.Graphic.prototype.getId
     * @description 获取当前ID
     * @return {string} id
     */
    getId() {
        return this.id_;
    }

    /**
     * @function ol.Graphic.prototype.setId
     * @description 设置当前要素ID
     * @param id -{string} 要素ID
     */

    setId(id) {
        this.id_ = id;
    }

    /**
     * @function ol.Graphic.prototype.getGeometry
     * @description 获取当前要素几何信息
     * @return [ol.geom.Point]{@linkdoc-openlayers/ol.geom.Point} 要素几何信息
     */
    getGeometry() {
        return this.geometry_;
    }

    /**
     * @function ol.Graphic.prototype.setGeometry
     * @description 设置当前要素几何信息
     * @param geometry -[ol.geom.Point]{@linkdoc-openlayers/ol.geom.Point} 要素几何信息
     */
    setGeometry(geometry) {
        this.geometry_ = geometry;
    }

    /**
     * @function ol.Graphic.prototype.setAttributes
     * @description 设置要素属性
     * @param attributes - {Object} 属性对象
     */
    setAttributes(attributes) {
        this.attributes_ = attributes;
    }

    /**
     * @function ol.Graphic.prototype.getAttributes
     * @description 获取要素属性
     * @return {Object} 要素属性
     */
    getAttributes() {
        return this.attributes_;
    }

    /**
     * @function ol.Graphic.prototype.getStyle
     * @description 获取样式
     * @return [ol.style.Image]{@linkdoc-openlayers/ol.style.Image} ol.style.Image子类样式对象
     */
    getStyle() {
        return this.style_;
    }

    /**
     * @function ol.Graphic.prototype.setStyle
     * @description 设置样式
     * @param style - [ol.style.Image]{@linkdoc-openlayers/ol.style.Image} 样式，ol.style.Image子类样式对象
     */
    setStyle(style) {
        this.style_ = style;
        this.styleFunction_ = !style ?
            undefined : ol.Graphic.createStyleFunction(new ol.style.Style({
                image: style
            }));
        this.changed();
    }

    /**
     * @function ol.Graphic.prototype.getStyleFunction
     * @description 获取样式函数
     * @return {Function} 样式函数
     */
    getStyleFunction() {
        return this.styleFunction_;
    }

    /**
     * @function ol.Graphic.createStyleFunction
     * @description  新建样式函数
     * @param obj - {Object} 对象参数
     */
    static createStyleFunction(obj) {
        var styleFunction;
        if (typeof obj === 'function') {
            if (obj.length == 2) {
                styleFunction = function (resolution) {
                    return (obj)(this, resolution);
                };
            } else {
                styleFunction = obj;
            }
        } else {
            var styles;
            if (Array.isArray(obj)) {
                styles = obj;
            } else {
                styles = [obj];
            }
            styleFunction = function () {
                return styles;
            };
        }
        return styleFunction;
    }

    /**
     * @function ol.Graphic.prototype.destroy
     * @description  清除参数值
     */
    destroy() {
        this.id_ = null;
        this.geometry_ = null;
        this.attributes_ = null;
        this.style_ = null;
    }
}

ol.Graphic = Graphic;