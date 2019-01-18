/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import {Bounds} from '../Bounds';
import {Geometry} from '../Geometry';
import {Util} from '../Util';

/**
 * @class SuperMap.Geometry.Collection
 * @classdesc 几何对象集合类，存储在本地的 components 属性中（可作为参数传递给构造函数）。<br>
 *            随着新的几何图形添加到集合中，将不能被克隆，当移动几何图形时，需要指定参照物。<br>
 *            getArea 和 getLength 函数只能通过遍历存储几何对象的 components 数组，总计所有几何图形的面积和长度。
 * @category BaseTypes Geometry
 * @extends {SuperMap.Geometry}
 * @param {Array.<SuperMap.Geometry>} components - 几何对象数组。
 * @example
 * var point1 = new SuperMap.Geometry.Point(10,20);
 * var point2 = new SuperMap.Geometry.Point(30,40);
 * var col = new SuperMap.Geometry.Collection([point1,point2]);
 */
export class Collection extends Geometry {


    constructor(components) {
        super();

        /**
         * @description 存储几何对象的数组。
         * @member {Array.<SuperMap.Geometry>} SuperMap.Geometry.Collection.prototype.components
         */
        this.components = [];

        /**
         * @member {Array.<string>} SuperMap.Geometry.Collection.prototype.componentTypes
         * @description components 存储的的几何对象所支持的几何类型数组，为空表示类型不受限制。
         */
        this.componentTypes = null;
        if (components != null) {
            this.addComponents(components);
        }
        this.CLASS_NAME = "SuperMap.Geometry.Collection";
        this.geometryType = "Collection";
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.destroy
     * @description 销毁几何图形。
     */
    destroy() {
        this.components.length = 0;
        this.components = null;
        super.destroy();
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.clone
     * @description 克隆当前几何对象。
     * @returns {SuperMap.Geometry.Collection} 克隆的几何对象集合。
     */
    clone() {
        var geometry = new Collection();
        for (var i = 0, len = this.components.length; i < len; i++) {
            geometry.addComponent(this.components[i].clone());
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(geometry, this);

        return geometry;
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.getComponentsString
     * @description 获取 components 字符串。
     * @returns {string} components 字符串。
     */
    getComponentsString() {
        var strings = [];
        for (var i = 0, len = this.components.length; i < len; i++) {
            strings.push(this.components[i].toShortString());
        }
        return strings.join(",");
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.calculateBounds
     * @description 通过遍历数组重新计算边界，在遍历每一子项中时调用 extend 方法。
     */
    calculateBounds() {
        this.bounds = null;
        var bounds = new Bounds();
        var components = this.components;
        if (components) {
            for (var i = 0, len = components.length; i < len; i++) {
                bounds.extend(components[i].getBounds());
            }
        }
        // to preserve old behavior, we only set bounds if non-null
        // in the future, we could add bounds.isEmpty()
        if (bounds.left != null && bounds.bottom != null &&
            bounds.right != null && bounds.top != null) {
            this.setBounds(bounds);
        }
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.addComponents
     * @description 给几何图形对象添加元素。
     * @param {Array.<SuperMap.Geometry>} components - 几何对象组件。
     * @example
     * var collection = new SuperMap.Geometry.Collection();
     * collection.addComponents(new SuerpMap.Geometry.Point(10,10));
     */
    addComponents(components) {
        if (!(Util.isArray(components))) {
            components = [components];
        }
        for (var i = 0, len = components.length; i < len; i++) {
            this.addComponent(components[i]);
        }
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.addComponent
     * @description 添加一个几何对象到集合中。如果设置了 componentTypes 类型，则添加的几何对象必须是 componentTypes 中的类型。
     * @param {SuperMap.Geometry} component - 待添加的几何对象。
     * @param {int} [index] - 几何对象插入的位置。
     * @returns {boolean} 是否添加成功。
     */
    addComponent(component, index) {
        var added = false;
        if (component) {
            if (this.componentTypes == null ||
                (Util.indexOf(this.componentTypes,
                    component.CLASS_NAME) > -1)) {

                if (index != null && (index < this.components.length)) {
                    var components1 = this.components.slice(0, index);
                    var components2 = this.components.slice(index,
                        this.components.length);
                    components1.push(component);
                    this.components = components1.concat(components2);
                } else {
                    this.components.push(component);
                }
                component.parent = this;
                this.clearBounds();
                added = true;
            }
        }
        return added;
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.removeComponents
     * @description 清除几何对象。
     * @param {Array.<SuperMap.Geometry>} components - 需要清除的几何对象。
     * @returns {boolean} 元素是否被删除。
     */
    removeComponents(components) {
        var removed = false;

        if (!(Util.isArray(components))) {
            components = [components];
        }
        for (var i = components.length - 1; i >= 0; --i) {
            removed = this.removeComponent(components[i]) || removed;
        }
        return removed;
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.removeComponent
     * @description 从集合中移除一个几何对象。
     * @param {SuperMap.Geometry} component - 要移除的几何对象。
     * @returns {boolean} 几何对象是否移除成功。
     */
    removeComponent(component) {
        Util.removeItem(this.components, component);

        // clearBounds() so that it gets recalculated on the next call
        // to this.getBounds();
        this.clearBounds();
        return true;
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.getArea
     * @description 计算几何对象的面积。注意，这个方法在 {@link SuperMap.Geometry.Polygon} 类中需要重写。
     * @returns {number} 几何图形的面积，是几何对象中所有组成部分的面积之和。
     */
    getArea() {
        var area = 0.0;
        for (var i = 0, len = this.components.length; i < len; i++) {
            area += this.components[i].getArea();
        }
        return area;
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.equals
     * @description 判断两个几何图形是否相等。如果所有的 components 具有相同的坐标，则认为是相等的。
     * @param {SuperMap.Geometry} geometry - 需要判断的几何图形。
     * @returns {boolean} 输入的几何图形与当前几何图形是否相等。
     */
    equals(geometry) {
        var equivalent = true;
        if (!geometry || !geometry.CLASS_NAME ||
            (this.CLASS_NAME !== geometry.CLASS_NAME)) {
            equivalent = false;
        } else if (!(Util.isArray(geometry.components)) ||
            (geometry.components.length !== this.components.length)) {
            equivalent = false;
        } else {
            for (var i = 0, len = this.components.length; i < len; ++i) {
                if (!this.components[i].equals(geometry.components[i])) {
                    equivalent = false;
                    break;
                }
            }
        }
        return equivalent;
    }


    /**
     * @function SuperMap.Geometry.Collection.prototype.getVertices
     * @description 返回几何对象的所有结点的列表。
     * @param {boolean} [nodes] - 对于线来说，仅仅返回作为端点的顶点，如果设为 false，则返回非端点的顶点如果没有设置此参数，则返回所有顶点。
     * @returns {Array} 几何对象的顶点列表。
     */
    getVertices(nodes) {
        var vertices = [];
        for (var i = 0, len = this.components.length; i < len; ++i) {
            Array.prototype.push.apply(
                vertices, this.components[i].getVertices(nodes)
            );
        }
        return vertices;
    }

}

SuperMap.Geometry.Collection = Collection;