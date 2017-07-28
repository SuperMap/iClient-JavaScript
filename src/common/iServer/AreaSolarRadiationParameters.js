
var SuperMap = require('../SuperMap');
SuperMap.AreaSolarRadiationParameters = SuperMap.Class({
    /**
     * @class SuperMap.AreaSolarRadiationParameters
     * @constructs SuperMap.AreaSolarRadiationParameters
     * @classdesc
     * 地区太阳辐射参数类。
     * @api
     */

    /**
     * APIProperty: dataset
     * {String} 要用来做地区太阳辐射数据源中数据集的名称。
     * 该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin （必设参数）。
     *
     * 注：地区太阳辐射数据必须为栅格数据集。
     */
    dataset: null,

    /**
     * APIProperty: targetDatasourceName
     *
     * {String}  指定的存储结果数据集的数据源名称（必设参数）； 例如："Jingjin"。
     */
    targetDatasourceName: null,

    /**
     * APIProperty: totalGridName
     * {String} 指定地区太阳辐射总辐射量数据集的名称（必设参数）。
     */
    totalGridName: null,

    /**
     * APIProperty: diffuseDatasetGridName
     * {String} 指定地区太阳辐射散射辐射量数据集的名称。
     */
    diffuseDatasetGridName: null,

    /**
     * APIProperty: durationDatasetGridName
     * {String} 指定地区太阳辐射太阳直射持续时间数据集的名称。
     */
    durationDatasetGridName: null,

    /**
     * APIProperty: directDatasetGridName
     * {String} 指定地区太阳辐射直射辐射量数据集的名称。
     */
    directDatasetGridName: null,

    /**
     * APIProperty: latitude
     * {Number} 待计算区域的纬度值。
     */
    latitude: null,

    /**
     * APIProperty: timeMode
     * {String} 时间模式。可设置有“WITHINDAY”（单日）和“MULTIDAYS”（多日）；默认值为"MULTIDAYS";
     */
    timeMode: "MULTIDAYS",

    /**
     * APIProperty: dayStart
     * {Number} 起始日期（年内的第几天）。（必设参数）
     */
    dayStart: null,

    /**
     * APIProperty: dayEnd
     * {Number} 结束日期（年内的第几天）。（必设参数）
     */
    dayEnd: null,

    /**
     * APIProperty: hourStart
     * {Number} 起始时间（一天中的第几个小时）。
     */
    hourStart: null,

    /**
     * APIProperty: hourEnd
     * {Number} 结束时间（一天中的第几个小时）。
     */
    hourEnd: null,

    /**
     * APIProperty: transmittance
     * {Number} 太阳辐射穿过大气的透射率。
     */
    transmittance: null,

    /**
     * APIProperty: hourInterval
     * {Number} 计算时的小时间隔（设置的越小计算量越大并且计算结果更精确, 默认为0.5小时，如果修改此参数，必须使用整数）
     */
    hourInterval: null,

    /**
     * APIProperty: dayInterval {Number} 计算时的天数间隔（设置的越小计算量越大并且计算结果更精确, 默认为5天，必须使用整数）
     */
    dayInterval: null,

    /**
     * APIProperty: deleteExistResultDataset
     * {Boolean} 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。
     */
    deleteExistResultDataset: false,

    /**
     * @method SuperMap.AreaSolarRadiationParameters.initialize
     * @param options - {Object} 参数。
     *
     * Allowed options properties:</br>
     * dataset - {String} 要用来做地区太阳辐射数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。（必设参数）。
     * targetDatasourceName - {String}  指定的存储结果数据集的数据源名称（必设参数）, 例如："Jingjin"。</br>
     * totalGridName - {String} 指定地区太阳辐射总辐射量数据集的名称（必设参数）。</br>
     * diffuseDatasetGridName - {String} 指定地区太阳辐射散射辐射量数据集的名称。</br>
     * durationDatasetGridName - {String} 指定地区太阳辐射太阳直射持续时间数据集的名称。</br>
     * directDatasetGridName - {String} 指定地区太阳辐射直射辐射量数据集的名称。</br>
     * latitude - {Number} 待计算区域的纬度值。</br>
     * timeMode - {String} 时间模式。可设置有“WITHINDAY”（单日）和“MULTIDAYS”（多日）；默认值为"MULTIDAYS";</br>
     * dayStart - {Number} 起始日期（年内的第几天）。（必设参数）</br>
     * dayEnd - {Number} 结束日期（年内的第几天）。（必设参数）</br>
     * hourStart - {Number} 起始时间（一天中的第几个小时）。</br>
     * hourEnd - {Number} 结束时间（一天中的第几个小时）。</br>
     * transmittance - {Number} 太阳辐射穿过大气的透射率。</br>
     * hourInterval - {Number} 计算时的小时间隔（设置的越小计算量越大并且计算结果更精确, 默认为0.5小时，如果修改此参数，必须使用整数）</br>
     * dayInterval - {Number} 计算时的天数间隔（设置的越小计算量越大并且计算结果更精确, 默认为5天，必须使用整数）</br>
     * deleteExistResultDataset - {Boolean} 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。</br>
     */
    initialize: function (options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.dataset = null;
        me.zFactor = 1.0;
        me.averageCurvatureName = null;
        me.profileCurvatureName = null;
        me.planCurvatureName = null;
        me.deleteExistResultDataset = true;
    },

    CLASS_NAME: "SuperMap.AreaSolarRadiationParameters"
});

SuperMap.AreaSolarRadiationParameters.toObject = function (derrainCurvatureCalculationParameters, tempObj) {
    var parameter = {};
    for (var name in derrainCurvatureCalculationParameters) {
        if (name !== "dataset") {
            var name1 = (name === "latitude" || name === "timeMode" || name === "dayStart");
            var name2 = (name === "dayEnd" || name === "hourStart" || name === "hourEnd");
            var name3 = (name === "transmittance" || name === "hourInterval" || name === "dayInterval");
            if (name1 || name2 || name3)  {
                parameter[name] = derrainCurvatureCalculationParameters[name];
            }
            else {
                tempObj[name] = derrainCurvatureCalculationParameters[name];
            }
        }
    }
    tempObj["parameter"] = parameter;
};

module.exports = SuperMap.AreaSolarRadiationParameters;