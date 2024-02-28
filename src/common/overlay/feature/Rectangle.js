/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ShapeParameters} from './ShapeParameters';

/**
 * @class  ShapeParametersRectangle
 * @aliasclass Feature.ShapeParameters.Rectangle
 * @deprecatedclass SuperMap.Feature.ShapeParameters.Rectangle
 * @category Visualization Theme
 * @classdesc 矩形参数对象。
 * @extends {ShapeParameters}
 * @param {number} x - 矩形 x 坐标。
 * @param {number} y - 矩形 y 坐标。
 * @param {number} width - 矩形 width 宽度。
 * @param {number} height - 矩形 height 高度。
 * @usage
 */

export class Rectangle extends ShapeParameters {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        /**
         * @member {number} ShapeParametersRectangle.prototype.x
         * @description 左上角 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;

        /**
         * @member {number} ShapeParametersRectangle.prototype.y
         * @description 左上角 y 坐标。
         */
        this.y = !isNaN(x) ? y : 0;

        /**
         * @member {number} ShapeParametersRectangle.prototype.width
         * @description 宽度。
         */
        this.width = !isNaN(width) ? width : 0;

        /**
         * @member {number} ShapeParametersRectangle.prototype.height
         * @description 高度。
         */
        this.height = !isNaN(height) ? height : 0;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Rectangle";
    }


    /**
     * @function ShapeParametersRectangle.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;

        super.destroy();
    }

}
