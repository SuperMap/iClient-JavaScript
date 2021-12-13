/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ShapeParameters} from './ShapeParameters';

/**
 * @class  FeaturePolygon
 * @aliasclass Feature.ShapeParameters.Polygon
 * @deprecatedclass SuperMap.Feature.ShapeParameters.Polygon
 * @category Visualization Theme
 * @classdesc 面参数对象。
 * @extends {ShapeParameters}
 * @param {Array} pointList - 横坐标。
 * @usage
 */

export class Polygon extends ShapeParameters {
    constructor(pointList) {
        super(pointList);
        /**
         * @member {Array} FeaturePolygon.prototype.pointList
         * @description 面要素节点数组，二维数组。
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

        /**
         * @member {Array} FeaturePolygon.prototype.holePolygonPointLists
         * @description 岛洞面多边形顶点数组（三维数组）
         */
        this.holePolygonPointLists = null;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Polygon";
    }

    /**
     * @function FeaturePolygon.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.pointList = null;
        this.holePolygonPointLists = null;
        super.destroy();
    }
}
