/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { ShapeParameters } from './ShapeParameters';

/**
 * @class  ShapeParametersPoint
 * @aliasclass Feature.ShapeParameters.Point
 * @deprecatedclass SuperMap.Feature.ShapeParameters.Point
 * @category Visualization Theme
 * @classdesc 点参数对象。
 * @extends {ShapeParameters}
 * @param {number} x - 点 x 坐标。
 * @param {number} y - 点 y 坐标。
 * @usage
 */

export class Point extends ShapeParameters {
    constructor(x, y) {
        super(x, y);
        /**
         * @member {number}  ShapeParametersPoint.prototype.x
         * @description 点 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;

        /**
         * @member {number}  ShapeParametersPoint.prototype.y
         * @description 点 y 坐标。
         */
        this.y = !isNaN(y) ? y : 0;

        /**
         * @member {number}  ShapeParametersPoint.prototype.r
         * @description 点的半径。
         */
        this.r = 6;


        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Point";
    }


    /**
     * @function ShapeParametersPoint.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.r = null;

        super.destroy();
    }

}
