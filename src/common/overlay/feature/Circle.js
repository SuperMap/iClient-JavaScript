/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ShapeParameters} from './ShapeParameters';

/**
 * @class FeatureCircle
 * @aliasclass Feature.ShapeParameters.Circle
 * @deprecatedclass SuperMap.Feature.ShapeParameters.Circle
 * @classdesc 圆形参数对象。
 * @category Visualization Theme
 * @extends {ShapeParameters}
 * @usage
 * @private
 */

export class Circle extends ShapeParameters {


    /**
     * @function FeatureCircle.prototype.constructor
     * @description 创建一个圆形参数对象。
     * @param {number} x - 圆心 x 坐标，必设参数。
     * @param {number} y - 圆心 y 坐标，必设参数。
     * @param {number} r - 圆半径，必设参数。
     * @returns {FeatureCircle} 圆形参数对象。
     */
    constructor(x, y, r) {
        super(x, y, r);
        /**
         * @member {number} FeatureCircle.prototype.x
         * @description 圆心 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;

        /**
         * @member {number} FeatureCircle.prototype.y
         * @description 圆心 y 坐标。
         */
        this.y =  !isNaN(y) ? y : 0;

        /**
         * @member {number} FeatureCircle.prototype.r
         * @description 圆半径。
         */
        this.r =  !isNaN(r) ? r : 0;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Circle";

    }


    /**
     * @function FeatureCircle.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.r = null;
        super.destroy();
    }

}
