/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import BaseObject from 'ol/Object';
import Geometry from 'ol/geom/Geometry';
import Style from 'ol/style/Style';

/**
 * @class OverlayGraphic
 * @browsernamespace ol
 * @aliasclass Graphic
 * @category  Visualization Graphic
 * @classdesc 高效率点图层点要素类。
 * @modulecategory Overlay
 * @param {ol.geom.Point} geometry - 几何对象。
 * @param {Object} [attributes] - 要素属性。
 * @extends {ol.Object}
 * @usage
 */
export class Graphic extends BaseObject {

    constructor(geometry, attributes) {
        super();
        if (geometry instanceof Geometry) {
            this.geometry_ = geometry;
        }
        this.attributes = attributes;
        this.setStyle();
    }

    /**
     * @function OverlayGraphic.prototype.clone
     * @description 克隆当前要素。
     * @returns {OverlayGraphic} 克隆后的要素。
     */
    clone() {
        var clone = new Graphic();
        clone.setId(this.id);
        clone.setGeometry(this.geometry_);
        clone.setAttributes(this.attributes);
        clone.setStyle(this.style_);
        return clone;
    }

    /**
     * @function OverlayGraphic.prototype.getId
     * @description 获取当前 ID。
     * @returns {string} ID。
     */
    getId() {
        return this.id;
    }

    /**
     * @function OverlayGraphic.prototype.setId
     * @description 设置当前要素 ID。
     * @param {string} id - 要素 ID。
     */
    setId(id) {
        this.id = id;
    }

    /**
     * @function OverlayGraphic.prototype.getGeometry
     * @description 获取当前要素几何信息。
     * @returns {ol.geom.Point} 要素几何信息。
     */
    getGeometry() {
        return this.geometry_;
    }

    /**
     * @function OverlayGraphic.prototype.setGeometry
     * @description 设置当前要素几何信息。
     * @param {ol.geom.Point} geometry - 要素几何信息。
     */
    setGeometry(geometry) {
        this.geometry_ = geometry;
    }

    /**
     * @function OverlayGraphic.prototype.setAttributes
     * @description 设置要素属性。
     * @param {Object} attributes - 属性对象。
     */
    setAttributes(attributes) {
        this.attributes = attributes;
    }

    /**
     * @function OverlayGraphic.prototype.getAttributes
     * @description 获取要素属性。
     * @returns {Object} 要素属性。
     */
    getAttributes() {
        return this.attributes;
    }

    /**
     * @function OverlayGraphic.prototype.getStyle
     * @description 获取样式。
     * @returns {ol.style.Image} ol.style.Image 子类样式对象。
     */
    getStyle() {
        return this.style_;
    }

    /**
     * @function OverlayGraphic.prototype.setStyle
     * @description 设置样式。
     * @param {ol.style.Image} style - 样式，ol/style/Image 子类样式对象。
     */
    setStyle(style) {
        if (!this.style && !style) {
            return;
        }
        this.style_ = style;
        this.styleFunction_ = !style ?
            undefined : Graphic.createStyleFunction(new Style({
                image: style
            }));
        this.changed();
    }

    /**
     * @function OverlayGraphic.prototype.getStyleFunction
     * @description 获取样式函数。
     * @returns {function} 样式函数。
     */
    getStyleFunction() {
        return this.styleFunction_;
    }

    /**
     * @function OverlayGraphic.createStyleFunction
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
     * @function OverlayGraphic.prototype.destroy
     * @description  清除参数值。
     */
    destroy() {
        this.id = null;
        this.geometry_ = null;
        this.attributes = null;
        this.style_ = null;
    }
}
