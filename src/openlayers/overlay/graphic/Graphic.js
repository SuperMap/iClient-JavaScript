import ol from 'openlayers';

/**
 * @class ol.Graphic
 * @category  Visualization Graphic
 * @classdesc 高效率点图层点要素类。
 * @param geometry - {Object} 几何对象
 * @extends ol.Object{@linkdoc-openlayers/ol.Object}
 */
export class Graphic extends ol.Object {

    constructor(geometry) {
        super();
        if (geometry instanceof ol.geom.Geometry) {
            this.geometry_ = geometry;
        }
        this.setStyle();
    }

    /**
     * @function ol.Graphic.prototype.clone
     * @description 复制当前信息
     */
    clone() {
        var clone = new Graphic();
        clone.setId(this.id_);
        clone.setGeometry(this.geometry_);
        clone.setStyle(this.style_);
        return clone;
    }

    /**
     * @function ol.Graphic.prototype.getId
     * @description 获取当前ID
     */
    getId() {
        return this.id_;
    }

    /**
     * @function ol.Graphic.prototype.setId
     * @description 设置当前ID
     */
    setId(id) {
        this.id_ = id;
    }

    /**
     * @function ol.Graphic.prototype.getGeometry
     * @description 获取当前几何信息
     */
    getGeometry() {
        return this.geometry_;
    }

    /**
     * @function ol.Graphic.prototype.setGeometry
     * @description 设置当前几何信息
     * @param geometry -{Object} 几何参数
     */
    setGeometry(geometry) {
        this.geometry_ = geometry;
    }

    /**
     * @function ol.Graphic.prototype.getStyle
     * @description 获取样式
     */
    getStyle() {
        return this.style_;
    }

    /**
     * @function ol.Graphic.prototype.setStyle
     * @description 设置样式
     * @param style - {Object} 样式参数
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
        this.style_ = null;
    }
}

ol.Graphic = Graphic;