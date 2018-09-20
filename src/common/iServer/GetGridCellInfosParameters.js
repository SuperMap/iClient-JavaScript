/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.GetGridCellInfosParameters
 * @category iServer Data Grid
 * @classdesc 数据服务栅格查询参数类。
 * @param {Object} options - 参数。  
 * @param {string} options.datasetName - 数据集名称。 
 * @param {string} options.dataSourceName - 数据源名称。 
 * @param {number} options.X - 要查询的地理位置 X 轴。 
 * @param {number} options.Y - 要查询的地理位置 Y 轴。
 */
export class GetGridCellInfosParameters {


    constructor(options) {
        /**
         * @member {string} SuperMap.GetGridCellInfosParameters.prototype.datasetName
         * @description 数据集名称。
         */
        this.datasetName = null;

        /**
         * @member {string} SuperMap.GetGridCellInfosParameters.prototype.dataSourceName
         * @description 数据源名称。
         */
        this.dataSourceName = null;

        /**
         * @member {number} SuperMap.GetGridCellInfosParameters.prototype.X
         * @description 要查询的地理位置 X 轴。
         */
        this.X = null;

        /**
         * @member {number} SuperMap.GetGridCellInfosParameters.prototype.Y
         * @description 要查询的地理位置 Y 轴。
         */
        this.Y = null;
        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.GetGridCellInfosParameters";
    }


    /**
     * @function SuperMap.GetGridCellInfosParameters.prototype.destroy
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

SuperMap.GetGridCellInfosParameters = GetGridCellInfosParameters;
