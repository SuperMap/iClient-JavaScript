/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class AreaSolarRadiationParameters
 * @deprecatedclass SuperMap.AreaSolarRadiationParameters
 * @category iServer SpatialAnalyst SolarRadiationAnalyst
 * @classdesc 地区太阳辐射参数类。
 * @param {Object} options - 参数。
 * @param {string} options.dataset - 要用来做地区太阳辐射数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"的形式来表示，例如：JingjinTerrain@Jingjin。
 * @param {string} options.targetDatasourceName - 指定的存储结果数据集的数据源名称, 例如："Jingjin"。
 * @param {string} options.totalGridName - 指定地区太阳辐射总辐射量数据集的名称。
 * @param {string} options.diffuseDatasetGridName - 指定地区太阳辐射散射辐射量数据集的名称。
 * @param {string} options.durationDatasetGridName - 指定地区太阳辐射太阳直射持续时间数据集的名称。
 * @param {string} options.directDatasetGridName - 指定地区太阳辐射直射辐射量数据集的名称。
 * @param {number} options.latitude - 待计算区域的纬度值。
 * @param {string} [options.timeMode = 'MULTIDAYS'] - 时间模式。可选值"WITHINDAY"（单日）或"MULTIDAYS"（多日）。
 * @param {number} options.dayStart - 起始日期（年内的第几天）。
 * @param {number} options.dayEnd - 结束日期（年内的第几天）。
 * @param {number} [options.hourStart] - 起始时间（一天中的第几个小时）。
 * @param {number} [options.hourEnd] - 结束时间（一天中的第几个小时）。
 * @param {number} [options.transmittance] - 太阳辐射穿过大气的透射率。
 * @param {number} [options.hourInterval=0.5] - 计算时的小时间隔（设置的越小计算量越大并且计算结果更精确，如果修改此参数，必须使用整数）。
 * @param {number} [options.dayInterval=5] - 计算时的天数间隔（设置的越小计算量越大并且计算结果更精确，必须使用整数）。
 * @param {boolean} [options.deleteExistResultDataset=false] - 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
 * @usage
 */
export class AreaSolarRadiationParameters {

    constructor(options) {
        /**
         *  @member {string} AreaSolarRadiationParameters.prototype.dataset
         *  @description 要用来做地区太阳辐射数据源中数据集的名称。该名称用形如“数据集名称@数据源别名”形式来表示，例如：JingjinTerrain@Jingjin。注：地区太阳辐射数据必须为栅格数据集。
         */
        this.dataset = null;

        /**
         * @member {string} AreaSolarRadiationParameters.prototype.targetDatasourceName
         * @description 指定的存储结果数据集的数据源名称，例如："Jingjin"。
         */
        this.targetDatasourceName = null;

        /**
         * @member {string} AreaSolarRadiationParameters.prototype.totalGridName
         * @description 指定地区太阳辐射总辐射量数据集的名称。
         */
        this.totalGridName = null;

        /**
         * @member {string} AreaSolarRadiationParameters.prototype.diffuseDatasetGridName
         * @description 指定地区太阳辐射散射辐射量数据集的名称。
         */
        this.diffuseDatasetGridName = null;

        /**
         * @member {string} AreaSolarRadiationParameters.prototype.durationDatasetGridName
         * @description  指定地区太阳辐射太阳直射持续时间数据集的名称。
         */
        this.durationDatasetGridName = null;

        /**
         * @member {string} AreaSolarRadiationParameters.prototype.directDatasetGridName
         * @description 指定地区太阳辐射直射辐射量数据集的名称。
         */
        this.directDatasetGridName = null;

        /**
         * @member {number} AreaSolarRadiationParameters.prototype.latitude
         * @description 待计算区域的纬度值。
         */
        this.latitude = null;

        /**
         *  @member {string} [AreaSolarRadiationParameters.prototype.timeMode='MULTIDAYS']
         *  @description 时间模式。可选值"WITHINDAY"（单日）或"MULTIDAYS"（多日）。
         */
        this.timeMode = "MULTIDAYS";

        /**
         *  @member {number} AreaSolarRadiationParameters.prototype.dayStart
         *  @description 起始日期（年内的第几天）。
         */
        this.dayStart = null;

        /**
         *  @member {number} AreaSolarRadiationParameters.prototype.dayEnd
         * @description 结束日期（年内的第几天）。
         */
        this.dayEnd = null;

        /**
         * @member {number} [AreaSolarRadiationParameters.prototype.hourStart]
         * @description 起始时间（一天中的第几个小时）。
         */
        this.hourStart = null;

        /**
         * @member {number} [AreaSolarRadiationParameters.prototype.hourEnd]
         * @description 结束时间（一天中的第几个小时）。
         */
        this.hourEnd = null;

        /**
         * @member {number} [AreaSolarRadiationParameters.prototype.transmittance]
         * @description 太阳辐射穿过大气的透射率。
         */
        this.transmittance = null;

        /**
         *  @member {number} [AreaSolarRadiationParameters.prototype.hourInterval=0.5]
         *  @description 计算时的小时间隔（设置的越小计算量越大并且计算结果更精确, 如果修改此参数，必须使用整数）
         */
        this.hourInterval = null;

        /**
         * @member {number} [AreaSolarRadiationParameters.prototype.dayInterval=5]
         * @description 计算时的天数间隔（设置的越小计算量越大并且计算结果更精确, 必须使用整数）
         */
        this.dayInterval = null;

        /**
         * @member {boolean} [AreaSolarRadiationParameters.prototype.deleteExistResultDataset=false]
         * @description 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
         */
        this.deleteExistResultDataset = false;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.AreaSolarRadiationParameters";
    }

    /**
     * @function AreaSolarRadiationParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.dataset = null;
        me.zFactor = 1.0;
        me.averageCurvatureName = null;
        me.profileCurvatureName = null;
        me.planCurvatureName = null;
        me.deleteExistResultDataset = true;
    }

    /**
     * @function AreaSolarRadiationParameters.toObject
     * @param {AreaSolarRadiationParameters} param - 地区太阳辐射参数类。
     * @param {AreaSolarRadiationParameters} tempObj - 地区太阳辐射参数对象。
     * @returns {Object} JSON对象。
     * @description 将AreaSolarRadiationParameters对象转换成JSON对象。
     */
    static toObject(param, tempObj) {
        var parameter = {};
        for (var name in param) {
            if (name !== "dataset") {
                var name1 = (name === "latitude" || name === "timeMode" || name === "dayStart");
                var name2 = (name === "dayEnd" || name === "hourStart" || name === "hourEnd");
                var name3 = (name === "transmittance" || name === "hourInterval" || name === "dayInterval");
                if (name1 || name2 || name3) {
                    parameter[name] = param[name];
                } else {
                    tempObj[name] = param[name];
                }
            }
        }
        tempObj["parameter"] = parameter;
    }
}
