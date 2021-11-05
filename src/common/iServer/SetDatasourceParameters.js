/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.SetDatasourceParameters
 * @category iServer Data Datasource
 * @classdesc 数据源信息查询参数类。
 * @param {Object} options - 参数。 
 * @param {string} options.datasourceName - 数据源名称。
 * @param {string} options.description - 数据源描述信息。
 * @param {Unit} options.coordUnit - 坐标单位。
 * @param {Unit} options.distanceUnit - 距离单位。
 */
export class SetDatasourceParameters {

    constructor(options) {
        if (!options) {
            return;
        }

        /**
         * @member {string} SuperMap.SetDatasourceParameters.prototype.datasourceName
         * @description 数据源名称。
         */
        this.datasourceName = null;

        /**
         * @member {string} SuperMap.SetDatasourceParameters.prototype.description
         * @description 数据源描述信息。
         */
        this.description = null;

        /**
         * @member {Unit} SuperMap.SetDatasourceParameters.prototype.coordUnit
         * @description 坐标单位。
         */
        this.coordUnit = null;

        /**
         * @member {Unit} SuperMap.SetDatasourceParameters.prototype.distanceUnit
         * @description 距离单位。
         */
        this.distanceUnit = null;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.SetDatasourceParameters";
    }

    /**
     * @function SuperMap.SetDatasourceParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.datasourceName = null;
        me.description = null;
        me.coordUnit = null;
        me.distanceUnit = null;
    }

}

