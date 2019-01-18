/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import {LineString} from './LineString';

/**
 * @class  SuperMap.Geometry.LinearRing
 * @classdesc 几何对象线环类，是一个特殊的封闭的线串，在每次 addPoint/removePoint 之后会通过添加一个点（此点是复制的第一个点得到的）
 * 作为最后的一个点来自动关闭线环。
 * @category BaseTypes Geometry
 * @extends {SuperMap.Geometry.LineString}
 * @param {Array.<SuperMap.Geometry.Point>} points - 组成线性环的点。
 * @example
 * var points = [new SuperMap.Geometry.Point(4933.319287022352, -3337.3849141502124),
 *      new SuperMap.Geometry.Point(4960.9674060199022, -3349.3316322355736),
 *      new SuperMap.Geometry.Point(5006.0235999418364, -3358.8890067038628),
 *      new SuperMap.Geometry.Point(5075.3145648369318, -3378.0037556404409),
 *      new SuperMap.Geometry.Point(5305.19551436013, -3376.9669111768926)],
 * var linearRing = new SuperMap.Geometry.LinearRing(points);
 */
export class LinearRing extends LineString {


    constructor(points) {
        super(points);
        /**
         * @member {Array.<string>} [SuperMap.Geometry.LinearRing.prototype.componentTypes=["SuperMap.Geometry.Point"]]
         * @description components 存储的的几何对象所支持的几何类型数组,为空表示类型不受限制。
         * @readonly
         */
        this.componentTypes = ["SuperMap.Geometry.Point"];
        this.CLASS_NAME = "SuperMap.Geometry.LinearRing";
        this.geometryType = "LinearRing";
    }

    /**
     * @function SuperMap.Geometry.LinearRing.prototype.addComponent
     * @description 添加一个点到几何图形数组中，如果这个点将要被添加到组件数组的末端，并且与数组中已经存在的最后一个点相同，
     * 重复的点是不能被添加的。这将影响未关闭环的关闭。
     * 这个方法可以通过将非空索引（组件数组的下标）作为第二个参数重写。
     * @param {SuperMap.Geometry.Point} point - 点对象。
     * @param {integer} [index] - 插入组件数组的下标。
     * @returns {boolean} 点对象是否添加成功。
     */
    addComponent(point, index) {
        var added = false;

        //remove last point
        var lastPoint = this.components.pop();

        // given an index, add the point
        // without an index only add non-duplicate points
        if (index != null || !point.equals(lastPoint)) {
            added = super.addComponent.apply(this, arguments);
        }

        //append copy of first point
        var firstPoint = this.components[0];
        super.addComponent.apply(this, [firstPoint]);

        return added;
    }

    /**
     * @function SuperMap.Geometry.LinearRing.prototype.removeComponent
     * @description 从几何组件中删除一个点。
     * @param {SuperMap.Geometry.Point} point - 点对象。
     * @returns {boolean} 点对象是否删除。
     */
    removeComponent(point) { // eslint-disable-line no-unused-vars
        var removed = this.components && (this.components.length > 3);
        if (removed) {
            //remove last point
            this.components.pop();

            //remove our point
            super.removeComponent.apply(this, arguments);
            //append copy of first point
            var firstPoint = this.components[0];
            super.addComponent.apply(this, [firstPoint]);
        }
        return removed;
    }

    /**
     * @function SuperMap.Geometry.LinearRing.prototype.getArea
     * @description 获得当前几何对象区域大小，如果是沿顺时针方向的环则是正值，否则为负值。
     * @returns {float} 环的面积。
     */
    getArea() {
        var area = 0.0;
        if (this.components && (this.components.length > 2)) {
            var sum = 0.0;
            for (var i = 0, len = this.components.length; i < len - 1; i++) {
                var b = this.components[i];
                var c = this.components[i + 1];
                sum += (b.x + c.x) * (c.y - b.y);
            }
            area = -sum / 2.0;
        }
        return area;
    }

    /**
     * @function SuperMap.Geometry.LinearRing.prototype.getVertices
     * @description 返回几何图形的所有点的列表。
     * @param {boolean} [nodes] - 对于线来说，仅仅返回作为端点的顶点，如果设为 false ，则返回非端点的顶点，如果没有设置此参数，则返回所有顶点。
     * @returns {Array} 几何对象所有点的列表。
     */
    getVertices(nodes) {
        return (nodes === true) ? [] : this.components.slice(0, this.components.length - 1);
    }


}

SuperMap.Geometry.LinearRing = LinearRing;