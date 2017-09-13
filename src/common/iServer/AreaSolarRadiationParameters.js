import SuperMap from '../SuperMap';

/**
 * @class SuperMap.AreaSolarRadiationParameters
 * @classdesc 地区太阳辐射参数类。
 * @param options -{Object} 可选参数。如:</br>
 *        dataset - {string} 要用来做地区太阳辐射数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"的形式来表示，例如：JingjinTerrain@Jingjin。（必设参数）。</br>
 *        targetDatasourceName - {string}  指定的存储结果数据集的数据源名称（必设参数）, 例如："Jingjin"。</br>
 *        totalGridName - {string} 指定地区太阳辐射总辐射量数据集的名称（必设参数）。</br>
 *        diffuseDatasetGridName - {string} 指定地区太阳辐射散射辐射量数据集的名称。</br>
 *        durationDatasetGridName - {string} 指定地区太阳辐射太阳直射持续时间数据集的名称。</br>
 *        directDatasetGridName - {string} 指定地区太阳辐射直射辐射量数据集的名称。</br>
 *        latitude - {number} 待计算区域的纬度值。</br>
 *        timeMode - {string} 时间模式。可选值"WITHINDAY"（单日）或"MULTIDAYS"（多日），默认值为"MULTIDAYS"。</br>
 *        dayStart - {number} 起始日期（年内的第几天）。（必设参数）</br>
 *        dayEnd - {number} 结束日期（年内的第几天）。（必设参数）</br>
 *        hourStart - {number} 起始时间（一天中的第几个小时）。</br>
 *        hourEnd - {number} 结束时间（一天中的第几个小时）。</br>
 *        transmittance - {number} 太阳辐射穿过大气的透射率。</br>
 *        hourInterval - {number} 计算时的小时间隔（设置的越小计算量越大并且计算结果更精确, 默认为0.5小时，如果修改此参数，必须使用整数）</br>
 *        dayInterval - {number} 计算时的天数间隔（设置的越小计算量越大并且计算结果更精确, 默认为5天，必须使用整数）</br>
 *        deleteExistResultDataset - {boolean} 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。
 */
export default class AreaSolarRadiationParameters {

    /**
     *  @member SuperMap.AreaSolarRadiationParameters.prototype.dataset - {string}
     *  @description  要用来做地区太阳辐射数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin （必设参数）。注：地区太阳辐射数据必须为栅格数据集。
     */
    dataset = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.targetDatasourceName - {string}
     * @description 指定的存储结果数据集的数据源名称（必设参数），例如："Jingjin"。
     */
    targetDatasourceName = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.totalGridName - {string}
     * @description 指定地区太阳辐射总辐射量数据集的名称（必设参数）。
     */
    totalGridName = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.diffuseDatasetGridName - {string}
     * @description 指定地区太阳辐射散射辐射量数据集的名称。
     */
    diffuseDatasetGridName = null;

    /**
     *  @member SuperMap.AreaSolarRadiationParameters.prototype.durationDatasetGridName - {string}
     * @description  指定地区太阳辐射太阳直射持续时间数据集的名称。
     */
    durationDatasetGridName = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.durationDatasetGridName - {string}
     * @description 指定地区太阳辐射直射辐射量数据集的名称。
     */
    directDatasetGridName = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.latitude - {number}
     * @description 待计算区域的纬度值。
     */
    latitude = null;

    /**
     *  @member SuperMap.AreaSolarRadiationParameters.prototype.timeMode - {string}
     *  @description 时间模式。可选值"WITHINDAY"（单日）或"MULTIDAYS"（多日），默认值为"MULTIDAYS";
     */
    timeMode = "MULTIDAYS";

    /**
     *  @member SuperMap.AreaSolarRadiationParameters.prototype.dayStart - {number}
     *  @description 起始日期（年内的第几天）。（必设参数）
     */
    dayStart = null;

    /**
     *  @member SuperMap.AreaSolarRadiationParameters.prototype.dayEnd - {number}
     * @description 结束日期（年内的第几天）。（必设参数）
     */
    dayEnd = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.hourStart - {number}
     * @description 起始时间（一天中的第几个小时）。
     */
    hourStart = null;

    /**
     *  @member SuperMap.AreaSolarRadiationParameters.prototype.hourEnd - {number}
     * @description 结束时间（一天中的第几个小时）。
     */
    hourEnd = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.transmittance - {number}
     * @description 太阳辐射穿过大气的透射率。
     */
    transmittance = null;

    /**
     *  @member SuperMap.AreaSolarRadiationParameters.prototype.hourInterval - {number}
     *  @description 计算时的小时间隔（设置的越小计算量越大并且计算结果更精确, 默认为0.5小时，如果修改此参数，必须使用整数）
     */
    hourInterval = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.dayInterval - {number}
     * @description 计算时的天数间隔（设置的越小计算量越大并且计算结果更精确, 默认为5天，必须使用整数）
     */
    dayInterval = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.deleteExistResultDataset - {boolean}
     * @description 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。
     */
    deleteExistResultDataset = false;

    constructor(options) {
        if (!options) {
            return this;
        }
        SuperMap.Util.extend(this, options);
    }

    /**
     * @function SuperMap.AreaSolarRadiationParameters.prototype.destroy
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
     * @function SuperMap.AreaSolarRadiationParameters.toObject
     * @param param - {SuperMap.AreaSolarRadiationParameters} 地区太阳辐射参数类。
     * @param tempObj - {SuperMap.AreaSolarRadiationParameters} 地区太阳辐射参数对象。
     * @return {object} JSON对象。
     * @description 将SuperMap.AreaSolarRadiationParameters对象转换成JSON对象。
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
                }
                else {
                    tempObj[name] = param[name];
                }
            }
        }
        tempObj["parameter"] = parameter;
    }

    CLASS_NAME = "SuperMap.AreaSolarRadiationParameters";
}

SuperMap.AreaSolarRadiationParameters = AreaSolarRadiationParameters;