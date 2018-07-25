import ol from 'openlayers';

/**
 * @class ol.Graphic
 * @category  Visualization Graphic
 * @classdesc 高效率点图层点要素类。
 * @param {ol.geom.Point} geometry - 几何对象。
 * @param {Object} [attributes] - 要素属性。
 * @extends {ol.Object}
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
     * @description 克隆当前要素。
     * @returns {ol.Graphic} 克隆后的要素。
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
     * @description 获取当前 ID。
     * @returns {string} id
     */
    getId() {
        return this.id_;
    }

    /**
     * @function ol.Graphic.prototype.setId
     * @description 设置当前要素 ID。
     * @param {string} id - 要素 ID。 
     */

    setId(id) {
        this.id_ = id;
    }

    /**
     * @function ol.Graphic.prototype.getGeometry
     * @description 获取当前要素几何信息。
     * @returns {ol.geom.Point} 要素几何信息。
     */
    getGeometry() {
        return this.geometry_;
    }

    /**
     * @function ol.Graphic.prototype.setGeometry
     * @description 设置当前要素几何信息。
     * @param {ol.geom.Point} geometry - 要素几何信息。
     */
    setGeometry(geometry) {
        this.geometry_ = geometry;
    }

    /**
     * @function ol.Graphic.prototype.setAttributes
     * @description 设置要素属性。
     * @param {Object} attributes - 属性对象。
     */
    setAttributes(attributes) {
        this.attributes_ = attributes;
    }

    /**
     * @function ol.Graphic.prototype.getAttributes
     * @description 获取要素属性。
     * @returns {Object} 要素属性。
     */
    getAttributes() {
        return this.attributes_;
    }

    /**
     * @function ol.Graphic.prototype.getStyle
     * @description 获取样式。
     * @returns {ol.style.Image} ol.style.Image 子类样式对象。
     */
    getStyle() {
        return this.style_;
    }

    /**
     * @function ol.Graphic.prototype.setStyle
     * @description 设置样式。
     * @param {ol.style.Image} style - 样式，ol.style.Image 子类样式对象。
     */
    setStyle(style) {
        if (!this.style && !style) {
            return;
        }
        this.style_ = style;
        this.styleFunction_ = !style ?
            undefined : ol.Graphic.createStyleFunction(new ol.style.Style({
                image: style
            }));
        this.changed();
    }

    /**
     * @function ol.Graphic.prototype.getStyleFunction
     * @description 获取样式函数。
     * @returns {Function} 样式函数。
     */
    getStyleFunction() {
        return this.styleFunction_;
    }

    /**
     * @function ol.Graphic.createStyleFunction
     * @description  新建样式函数。
     * @param {Object} obj - 对象参数。
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
     * @description  清除参数值。
     */
    destroy() {
        this.id_ = null;
        this.geometry_ = null;
        this.attributes_ = null;
        this.style_ = null;
    }
}

ol.Graphic = Graphic;