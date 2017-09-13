import SuperMap from '../../SuperMap';
import Point from './Point';
import Geometry from '../Geometry';
import {Util} from '../Util';

/**
 * @class SuperMap.Geometry.Collection
 * @classdesc 几何对象集合类，存储在本地的 components 属性中（可作为参数传递给构造函数）。
 *            随着新的几何图形添加到集合中，将不能被克隆，当移动几何图形时，需要指定参照物。
 *            getArea和getLength函数只能通过遍历存储几何对象的 components 数组，总计所有几何图形的面积和长度。
 *
 * @extends SuperMap.Geometry
 * @param components - {Array<SuperMap.Geometry>} 几何对象数组。
 * @example
 * var point1 = new SuperMap.Geometry.Point(10,20);
 * var point2 = new SuperMap.Geometry.Point(30,40);
 * var col = new SuperMap.Geometry.Collection([point1,point2]);
 */
export default class Collection extends Geometry {

    /**
     * @description 存储几何对象的数组。
     * @member SuperMap.Geometry.Collection.prototype.components - {Array<SuperMap.Geometry>}
     */
    components = null;

    /**
     * @description components存储的的几何对象所支持的几何类型数组,为空表示类型不受限制。
     * @member SuperMap.Geometry.Collection.prototype.componentTypes - {Array<string>}
     */
    componentTypes = null;

    constructor(components) {
        super();
        this.components = [];
        if (components != null) {
            this.addComponents(components);
        }
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
        var geometry = eval("new " + this.CLASS_NAME + "()");
        for (var i = 0, len = this.components.length; i < len; i++) {
            geometry.addComponent(this.components[i].clone());
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(geometry, this);

        return geometry;
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.getComponentsString
     * @description 获取components字符串。
     * @returns {string} components字符串。
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
        var bounds = new SuperMap.Bounds();
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
     * @param components - {Array<SuperMap.Geometry>} 几何对象组件。
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
     * @description 添加一个几何对象到集合中。如果设置了componentTypes类型，则添加的几何对象必须是componentTypes中的类型。
     * @param component - {SuperMap.Geometry} 待添加的几何对象。
     * @param index - {int} 几何对象插入的位置。
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
     * @param components - {Array<SuperMap.Geometry>} 需要清除的几何对象。
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
     * @description 从集合中移除一个几何对象
     * @param component - {SuperMap.Geometry} 要移除的几何对象
     * @returns {boolean} 几何对象是否移除成功
     */
    removeComponent(component) {
        Util.removeItem(this.components, component);

        // clearBounds() so that it gets recalculated on the next call
        // to this.getBounds();
        this.clearBounds();
        return true;
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.getLength
     * @description 计算几何对象长度。
     * @returns {number} 几何对象长度（所有几何对象长度总和）。
     */
    getLength() {
        var length = 0.0;
        for (var i = 0, len = this.components.length; i < len; i++) {
            length += this.components[i].getLength();
        }
        return length;
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.getArea
     * @description 计算几何对象的面积。注意，这个方法在 <SuperMap.Geometry.Polygon> 类中需要重写。
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
     * @function SuperMap.Geometry.Collection.prototype.getCentroid
     * @description 计算几何图形集合的质心。
     * @param weighted - {boolean} 执行getCentroid方法进行递归计算，返回此几何图形集合中的面积加权平均值。
     * @returns {SuperMap.Geometry.Point} 质心。
     */
    getCentroid(weighted) {
        if (!weighted) {
            return this.components.length && this.components[0].getCentroid();
        }
        var len = this.components.length;
        if (!len) {
            return false;
        }

        var areas = [];
        var centroids = [];
        var areaSum = 0;
        var minArea = Number.MAX_VALUE;
        var component;
        for (var i = 0; i < len; ++i) {
            component = this.components[i];
            var area = component.getArea();
            var centroid = component.getCentroid(true);
            if (isNaN(area) || isNaN(centroid.x) || isNaN(centroid.y)) {
                continue;
            }
            areas.push(area);
            areaSum += area;
            minArea = (area < minArea && area > 0) ? area : minArea;
            centroids.push(centroid);
        }
        len = areas.length;
        if (areaSum === 0) {
            // all the components in this collection have 0 area
            // probably a collection of points -- weight all the points the same
            for (var i = 0; i < len; ++i) {
                areas[i] = 1;
            }
            areaSum = areas.length;
        } else {
            // normalize all the areas where the smallest area will get
            // a value of 1
            for (var i = 0; i < len; ++i) {
                areas[i] /= minArea;
            }
            areaSum /= minArea;
        }

        var xSum = 0, ySum = 0, centroid, area;
        for (var i = 0; i < len; ++i) {
            centroid = centroids[i];
            area = areas[i];
            xSum += centroid.x * area;
            ySum += centroid.y * area;
        }

        return new Point(xSum / areaSum, ySum / areaSum);
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.move
     * @description  沿着x、y轴的正方向上按照给定的位移移动几何图形，move 不仅改变了几何图形的位置并且清理了边界缓存。
     * @param x -{number} x轴正方向上移动的距离。
     * @param y - {number} y轴正方向上移动的距离。
     */
    move(x, y) {
        for (var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].move(x, y);
        }
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.rotate
     * @description 围绕中心点旋转几何图形。
     * @param angle -{number} 旋转角的度数（沿着x轴正方向逆时针测量）。
     * @param origin - {SuperMap.Geometry.Point} 旋转中心点。
     */
    rotate(angle, origin) {
        for (var i = 0, len = this.components.length; i < len; ++i) {
            this.components[i].rotate(angle, origin);
        }
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.resize
     * @description  调整几何对象大小。
     * @param scale - {number} 几何图形缩放的比例系数，是几何图形维数的两倍。（如，对于线来说将以线2倍的长度拉长，对于多边形来说，将以面积的4倍变化）。
     * @param origin - {SuperMap.Geometry.Point} 调整大小选定的起始原点。
     * @param ratio - {number} 可选的x,y的比例，默认的比例为1。
     * @returns {SuperMap.Geometry} 几何图形。
     */
    resize(scale, origin, ratio) {
        for (var i = 0; i < this.components.length; ++i) {
            this.components[i].resize(scale, origin, ratio);
        }
        return this;
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.distanceTo
     * @description 计算两个几个图形间的最小距离（x-y平面坐标系下）。
     * @param geometry - {SuperMap.Geometry} 目标几何图形。
     * @param options - {Object} 距离计算需要设置的可选属性。有效的选项取决于特定的几何类型。<br>
     *        details - {boolean} 返回距离计算的细节。默认为false。<br>
     *        edge - {boolean} 计算一个几何图形到目标几何图形边缘的最近距离。默认为true。
     *                         如果设为true，一个几何图形完全包含在目标几何图形中时，调用distanceTo返回非零结果，
     *                         如果false，两个几何图形相交情况下调用distanceTo结果返回0，而且如果false，将不返距离值。
     * @returns {(number | Object)} 返回一个几何图形到目标几何图形的距离。
     */
    distanceTo(geometry, options) {
        var edge = !(options && options.edge === false);
        var details = edge && options && options.details;
        var result, best, distance;
        var min = Number.POSITIVE_INFINITY;
        for (var i = 0, len = this.components.length; i < len; ++i) {
            result = this.components[i].distanceTo(geometry, options);
            distance = details ? result.distance : result;
            if (distance < min) {
                min = distance;
                best = result;
                if (min == 0) {
                    break;
                }
            }
        }
        return best;
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.equals
     * @description 判断两个几何图形是否相等。如果所有的 components 具有相同的坐标，则认为是相等的。
     * @param geometry - {SuperMap.Geometry} 需要判断的几何图形。
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
     * @function SuperMap.Geometry.Collection.prototype.intersects
     * @description 判断输入的几何对象是否与当前几何对象相交。
     * @param geometry - {SuperMap.Geometry} 任意的几何类型。
     * @returns {boolean} 输入几何对象与当前几何对象相交。
     */
    intersects(geometry) {
        var intersect = false;
        for (var i = 0, len = this.components.length; i < len; ++i) {
            intersect = geometry.intersects(this.components[i]);
            if (intersect) {
                break;
            }
        }
        return intersect;
    }

    /**
     * @function SuperMap.Geometry.Collection.prototype.getVertices
     * @description 返回几何对象的所有结点的列表。
     * @param nodes - {boolean} 对于线来说，仅仅返回作为端点的顶点，如果设为false，则返回非端点的顶点如果没有设置此参数，则返回所有顶点。
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


    CLASS_NAME = "SuperMap.Geometry.Collection"
}
SuperMap.Geometry.Collection = Collection;