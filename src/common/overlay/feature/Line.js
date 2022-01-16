/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ShapeParameters} from './ShapeParameters';

/**
 * @class  ShapeParametersLine
 * @aliasclass Feature.ShapeParameters.Line
 * @deprecatedclass SuperMap.Feature.ShapeParameters.Line
 * @category Visualization Theme
 * @classdesc 线参数对象。
 * @extends {ShapeParameters}
 * @param {Array} pointList - 线要素节点数组，二维数组。
 * @usage
 */
export class Line extends ShapeParameters {
    constructor(pointList) {
        super(pointList);
        /**
         * @member {Array} ShapeParametersLine.prototype.pointList
         * @description 线要素节点数组，二维数组。
         * 数组形如：
         * (start code)
         *  [
         *  [10, 20],         //节点
         *  [30, 40],
         *  [25, 30]         //最后一个节点和第一个节点不必相同，绘制时自动封闭
         *   ]
         * (end)
         */
        this.pointList = pointList;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Line";

    }

    /**
     * @function ShapeParametersLine.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.pointList = null;
        super.destroy();
    }

}
