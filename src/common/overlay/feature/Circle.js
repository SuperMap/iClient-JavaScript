/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.* This program are made available under the terms of the Apache License, Version 2.0* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import {ShapeParameters} from './ShapeParameters';

/**
 * @class  SuperMap.Feature.ShapeParameters.Circle
 * @classdesc 圆形参数对象。
 * @category Visualization Theme
 * @extends {SuperMap.Feature.ShapeParameters}
 */

export class Circle extends ShapeParameters {


    /**
     * @function SuperMap.Feature.ShapeParameters.Circle.prototype.constructor
     * @description 创建一个圆形参数对象。
     * @param {number} x - 圆心 x 坐标，必设参数。
     * @param {Number} y - 圆心 y 坐标，必设参数。
     * @param {Number} r - 圆半径，必设参数。
     * @returns {SuperMap.Feature.ShapeParameters.Circle} 圆形参数对象。
     */
    constructor(x, y, r) {
        super(x, y, r);
        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Circle.prototype.x
         * @description 圆心 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;

        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Circle.prototype.y
         * @description 圆心 y 坐标。
         */
        this.y =  !isNaN(y) ? y : 0;

        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Circle.prototype.r
         * @description 圆半径。
         */
        this.r =  !isNaN(r) ? r : 0;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Circle";

    }


    /**
     * @function SuperMap.Feature.ShapeParameters.Circle.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.r = null;
        super.destroy();
    }

}
SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.ShapeParameters.Circle = Circle;
