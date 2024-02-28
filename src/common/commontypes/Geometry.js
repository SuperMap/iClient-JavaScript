/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
// import {WKT} from '../format/WKT';
// import {Vector} from './Vector';
import {Util} from './Util';

/**
 * @class Geometry
 * @deprecatedclass SuperMap.Geometry
 * @category BaseTypes Geometry
 * @classdesc 几何对象类，描述地理对象的几何图形。
 * @usage
 */
export class Geometry {


    constructor() {
        this.CLASS_NAME = "SuperMap.Geometry";
        /**
         * @member {string} Geometry.prototype.id
         * @description  几何对象的唯一标识符。
         *
         */
        this.id = Util.createUniqueID(this.CLASS_NAME + "_");

        /**
         * @member {Geometry} Geometry.prototype.parent
         * @description 父类几何对象。
         */
        this.parent = null;

        /**
         * @member {Bounds} Geometry.prototype.bounds
         * @description 几何对象的范围。
         *
         */
        this.bounds = null;

        /**
         * @member {number} Geometry.prototype.SRID
         * @description 投影坐标参数。通过该参数，服务器判断几何对象的坐标参考系是否与数据集相同，如果不同，则在数据入库前进行投影变换。
         * @example
         * var geometry= new Geometry();
         * geometry. SRID=4326;
         *
         */
        this.SRID = null;
    }


    /**
     * @function Geometry.prototype.destroy
     * @description 解构 Geometry 类，释放资源。
     */
    destroy() {
        this.id = null;
        this.bounds = null;
        this.SRID = null;
    }


    /**
     * @function Geometry.prototype.clone
     * @description 克隆几何图形。克隆的几何图形不设置非标准的属性。
     * @returns {Geometry} 克隆的几何图形。
     */
    clone() {
        return new Geometry();
    }


    /**
     * @function Geometry.prototype.setBounds
     * @description 设置几何对象的边界。
     * @param {Bounds} bounds - 范围。
     */
    setBounds(bounds) {
        if (bounds) {
            this.bounds = bounds.clone();
        }
    }


    /**
     * @function Geometry.prototype.clearBounds
     * @description 清除几何对象的边界。
     * 如果该对象有父类，也会清除父类几何对象的边界。
     */
    clearBounds() {
        this.bounds = null;
        if (this.parent) {
            this.parent.clearBounds();
        }
    }


    /**
     * @function Geometry.prototype.extendBounds
     * @description 扩展现有边界以包含新边界。如果尚未设置几何边界，则设置新边界。
     * @param {Bounds} newBounds - 几何对象的边界。
     */
    extendBounds(newBounds) {
        var bounds = this.getBounds();
        if (!bounds) {
            this.setBounds(newBounds);
        } else {
            this.bounds.extend(newBounds);
        }
    }


    /**
     * @function Geometry.prototype.getBounds
     * @description 获得几何图形的边界。如果没有设置边界，可通过计算获得。
     * @returns {Bounds} 几何对象的边界。
     */
    getBounds() {
        if (this.bounds == null) {
            this.calculateBounds();
        }
        return this.bounds;
    }


    /**
     * @function Geometry.prototype.calculateBounds
     * @description 重新计算几何图形的边界（需要在子类中实现此方法）。
     */
    calculateBounds() {
        //
        // This should be overridden by subclasses.
        //
    }

    /**
     * @function Geometry.prototype.getVertices
     * @description 返回几何图形的所有顶点的列表（需要在子类中实现此方法）。
     * @param {boolean} [nodes] - 如果是 true，线则只返回线的末端点，如果 false，仅仅返回顶点，如果没有设置，则返回顶点。
     * @returns {Array} 几何图形的顶点列表。
     */
    getVertices(nodes) { // eslint-disable-line no-unused-vars
    }

    /**
     * @function Geometry.prototype.getArea
     * @description 计算几何对象的面积 ，此方法需要在子类中定义。
     * @returns {number} 计算后的对象面积。
     */
    getArea() {
        //to be overridden by geometries that actually have an area
        //
        return 0.0;
    }


    // /**
    //  * @function Geometry.prototype.toString
    //  * @description 返回geometry对象的字符串表述，需要引入{@link WKTFormat}。此方法只能在子类实现，在父类使用会报错。
    //  * @returns {string} geometry对象的字符串表述(Well-Known Text)
    //  */
    // toString() {
    // var string;
    // if (WKT) {
    //     var wkt = new WKT();
    //     string = wkt.write(new Vector(this));
    // } else {
    //     string = Object.prototype.toString.call(this);
    // }
    // return string;
    // }
}
