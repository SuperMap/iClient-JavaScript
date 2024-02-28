/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class GetGridCellInfosParameters
 * @deprecatedclass SuperMap.GetGridCellInfosParameters
 * @category iServer Data Grid
 * @classdesc 数据服务栅格查询参数类。此类用于设置进行栅格查询的数据源、数据集和栅格所在的地理位置。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名称。
 * @param {string} options.dataSourceName - 数据源名称。
 * @param {number} options.X - 地理位置 X 轴。
 * @param {number} options.Y - 地理位置 Y 轴。
 * @param {Array | Object} options.bounds - 查询范围。单对象栅格查询、多对象栅格查询、单对象影像查询、多对象影像查询时有效。
 * 单对象查询时，bounds为对象。多对象查询时，bounds为数组。
 * @usage
 */
export class GetGridCellInfosParameters {


    constructor(options) {
        /**
         * @member {string} GetGridCellInfosParameters.prototype.datasetName
         * @description 数据集名称。
         */
        this.datasetName = null;

        /**
         * @member {string} GetGridCellInfosParameters.prototype.dataSourceName
         * @description 数据源名称。
         */
        this.dataSourceName = null;

        /**
         * @member {number} GetGridCellInfosParameters.prototype.X
         * @description 要查询的地理位置 X 坐标。
         */
        this.X = null;

        /**
         * @member {number} GetGridCellInfosParameters.prototype.Y
         * @description 要查询的地理位置 Y 坐标。
         */
        this.Y = null;

        /**
          * @member {Array | Object} GetGridCellInfosParameters.prototype.bounds
          * @example
          * 矩形范围范例：{
          * "leftBottom":{"x":112.351881,"y":34.663401},
          * "rightTop":{"x":113.361881,"y":35.673401}
          * }
          * 多点范例多点范例：[
          * {"point":{"x": 112.361881,"y": 34.673401}},
          * {"point":{"x": 107.669629,"y": 32.888868}}
          * ]
          * @description 要查询的地理范围。
          */
        this.bounds = null;
        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.GetGridCellInfosParameters";
    }


    /**
     * @function GetGridCellInfosParameters.prototype.destroy
     * @description 释放资源，将引用的资源属性置空。
     */
    destroy() {
        var me = this;
        me.datasetName = null;
        me.dataSourceName = null;
        me.X = null;
        me.Y = null;
    }


}

