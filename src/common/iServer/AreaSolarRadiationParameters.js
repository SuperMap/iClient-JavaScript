import SuperMap from '../SuperMap';
/**
 * @class SuperMap.AreaSolarRadiationParameters
 * @classdesc 地区太阳辐射参数类。
 * @param options -{Object} 参数。
 */
export default  class AreaSolarRadiationParameters {

    /**
     *  @member SuperMap.AreaSolarRadiationParameters.prototype.dataset -{String}
     *  @description  要用来做地区太阳辐射数据源中数据集的名称。
     * 该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin （必设参数）。
     *
     * 注：地区太阳辐射数据必须为栅格数据集。
     */
    dataset = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.targetDatasourceName -{String}
     * @description 指定的存储结果数据集的数据源名称（必设参数）； 例如："Jingjin"。
     */
    targetDatasourceName = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.totalGridName -{String}
     * @description 指定地区太阳辐射总辐射量数据集的名称（必设参数）。
     */
    totalGridName = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.diffuseDatasetGridName -{String}
     * @description 指定地区太阳辐射散射辐射量数据集的名称。
     */
    diffuseDatasetGridName = null;

    /**
     *  @member SuperMap.AreaSolarRadiationParameters.prototype.durationDatasetGridName -{String}
     * @description  指定地区太阳辐射太阳直射持续时间数据集的名称。
     */
    durationDatasetGridName = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.durationDatasetGridName -{String}
     * @description 指定地区太阳辐射直射辐射量数据集的名称。
     */
    directDatasetGridName = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.latitude -{Number}
     * @description 待计算区域的纬度值。
     */
    latitude = null;

    /**
     *  @member SuperMap.AreaSolarRadiationParameters.prototype.timeMode -{String}
     *  @description 时间模式。可设置有“WITHINDAY”（单日）和“MULTIDAYS”（多日）；默认值为"MULTIDAYS";
     */
    timeMode = "MULTIDAYS";

    /**
     *  @member SuperMap.AreaSolarRadiationParameters.prototype.dayStart -{Number}
     *  @description 起始日期（年内的第几天）。（必设参数）
     */
    dayStart = null;

    /**
     *  @member SuperMap.AreaSolarRadiationParameters.prototype.dayEnd -{Number}
     * @description 结束日期（年内的第几天）。（必设参数）
     */
    dayEnd = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.hourStart -{Number}
     * @description 起始时间（一天中的第几个小时）。
     */
    hourStart = null;

    /**
     *  @member SuperMap.AreaSolarRadiationParameters.prototype.hourEnd -{Number}
     * @description 结束时间（一天中的第几个小时）。
     */
    hourEnd = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.transmittance -{Number}
     * @description 太阳辐射穿过大气的透射率。
     */
    transmittance = null;

    /**
     *  @member SuperMap.AreaSolarRadiationParameters.prototype.hourInterval -{Number}
     *  @description 计算时的小时间隔（设置的越小计算量越大并且计算结果更精确, 默认为0.5小时，如果修改此参数，必须使用整数）
     */
    hourInterval = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.dayInterval -{Number}
     * @description 计算时的天数间隔（设置的越小计算量越大并且计算结果更精确, 默认为5天，必须使用整数）
     */
    dayInterval = null;

    /**
     * @member SuperMap.AreaSolarRadiationParameters.prototype.deleteExistResultDataset -{Boolean}
     * @description 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。
     */
    deleteExistResultDataset = false;

    /*
     * @method SuperMap.AreaSolarRadiationParameters.prototype.constructor
     * @param options - {Object} 可選参数。如</br>
     *        dataset - {String} 要用来做地区太阳辐射数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。（必设参数）。
     *        targetDatasourceName - {String}  指定的存储结果数据集的数据源名称（必设参数）, 例如："Jingjin"。</br>
     *        totalGridName - {String} 指定地区太阳辐射总辐射量数据集的名称（必设参数）。</br>
     *        diffuseDatasetGridName - {String} 指定地区太阳辐射散射辐射量数据集的名称。</br>
     *        durationDatasetGridName - {String} 指定地区太阳辐射太阳直射持续时间数据集的名称。</br>
     *        directDatasetGridName - {String} 指定地区太阳辐射直射辐射量数据集的名称。</br>
     *        latitude - {Number} 待计算区域的纬度值。</br>
     *        timeMode - {String} 时间模式。可设置有“WITHINDAY”（单日）和“MULTIDAYS”（多日）；默认值为"MULTIDAYS";</br>
     *        dayStart - {Number} 起始日期（年内的第几天）。（必设参数）</br>
     *        dayEnd - {Number} 结束日期（年内的第几天）。（必设参数）</br>
     *        hourStart - {Number} 起始时间（一天中的第几个小时）。</br>
     *        hourEnd - {Number} 结束时间（一天中的第几个小时）。</br>
     *        transmittance - {Number} 太阳辐射穿过大气的透射率。</br>
     *        hourInterval - {Number} 计算时的小时间隔（设置的越小计算量越大并且计算结果更精确, 默认为0.5小时，如果修改此参数，必须使用整数）</br>
     *         dayInterval - {Number} 计算时的天数间隔（设置的越小计算量越大并且计算结果更精确, 默认为5天，必须使用整数）</br>
     *         deleteExistResultDataset - {Boolean} 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。</br>
     */
    constructor(options) {
        if (!options) {
            return this;
        }
        SuperMap.Util.extend(this, options);
    }

    /**
     * @method SuperMap.AreaSolarRadiationParameters.prototype.destroy
     * 释放资源，将引用资源的属性置空。
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

    static  toObject(derrainCurvatureCalculationParameters, tempObj) {
        var parameter = {};
        for (var name in derrainCurvatureCalculationParameters) {
            if (name !== "dataset") {
                var name1 = (name === "latitude" || name === "timeMode" || name === "dayStart");
                var name2 = (name === "dayEnd" || name === "hourStart" || name === "hourEnd");
                var name3 = (name === "transmittance" || name === "hourInterval" || name === "dayInterval");
                if (name1 || name2 || name3) {
                    parameter[name] = derrainCurvatureCalculationParameters[name];
                }
                else {
                    tempObj[name] = derrainCurvatureCalculationParameters[name];
                }
            }
        }
        tempObj["parameter"] = parameter;
    }

    CLASS_NAME = "SuperMap.AreaSolarRadiationParameters";
}

SuperMap.AreaSolarRadiationParameters = AreaSolarRadiationParameters;