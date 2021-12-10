/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class SetDatasourceParameters
 * @deprecatedclass SuperMap.SetDatasourceParameters
 * @category iServer Data Datasource
 * @classdesc 数据源信息查询参数类。
 * @param {Object} options - 参数。
 * @param {string} options.datasourceName - 数据源名称。
 * @param {string} options.description - 数据源描述信息。
 * @param {string} options.coordUnit - 坐标单位。
 * @param {string} options.distanceUnit - 距离单位。
 * @usage
 */
export class SetDatasourceParameters {

    constructor(options) {
        if (!options) {
            return;
        }

        /**
         * @member {string} SetDatasourceParameters.prototype.datasourceName
         * @description 数据源名称。
         */
        this.datasourceName = null;

        /**
         * @member {string} SetDatasourceParameters.prototype.description
         * @description 数据源描述信息。
         */
        this.description = null;

        /**
         * @member {string} SetDatasourceParameters.prototype.coordUnit
         * @description 坐标单位。
         */
        this.coordUnit = null;

        /**
         * @member {string} SetDatasourceParameters.prototype.distanceUnit
         * @description 距离单位。
         */
        this.distanceUnit = null;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.SetDatasourceParameters";
    }

    /**
     * @function SetDatasourceParameters.prototype.destroy
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

