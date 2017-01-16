/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/Query/FilterParameter.js
 * @requires SuperMap/REST/ServerType/ServerGeometry.js
 */

/**
 * Class: SuperMap.REST.AreaSolarRadiationParameters
 * 地区太阳辐射参数类。
 *
 */
SuperMap.REST.AreaSolarRadiationParameters = SuperMap.Class({

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
     * APIProperty: dayInterval
     * {Number} 计算时的天数间隔（设置的越小计算量越大并且计算结果更精确, 默认为5天，必须使用整数）
     */
    dayInterval: null,

    /**
     * APIProperty: deleteExistResultDataset
     * {Boolean} 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。
     */
    deleteExistResultDataset: false,

    /**
     * Constructor: SuperMap.REST.AreaSolarRadiationParameters
     * 地区太阳辐射参数构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * dataset - {String} 要用来做地区太阳辐射数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。（必设参数）。
     * targetDatasourceName - {String}  指定的存储结果数据集的数据源名称（必设参数）, 例如："Jingjin"。
     * totalGridName - {String} 指定地区太阳辐射总辐射量数据集的名称（必设参数）。
     * diffuseDatasetGridName - {String} 指定地区太阳辐射散射辐射量数据集的名称。
     * durationDatasetGridName - {String} 指定地区太阳辐射太阳直射持续时间数据集的名称。
     * directDatasetGridName - {String} 指定地区太阳辐射直射辐射量数据集的名称。
     * latitude - {Number} 待计算区域的纬度值。
     * timeMode - {String} 时间模式。可设置有“WITHINDAY”（单日）和“MULTIDAYS”（多日）；默认值为"MULTIDAYS";
     * dayStart - {Number} 起始日期（年内的第几天）。（必设参数）
     * dayEnd - {Number} 结束日期（年内的第几天）。（必设参数）
     * hourStart - {Number} 起始时间（一天中的第几个小时）。
     * hourEnd - {Number} 结束时间（一天中的第几个小时）。
     * transmittance - {Number} 太阳辐射穿过大气的透射率。
     * hourInterval - {Number} 计算时的小时间隔（设置的越小计算量越大并且计算结果更精确, 默认为0.5小时，如果修改此参数，必须使用整数）
     * dayInterval - {Number} 计算时的天数间隔（设置的越小计算量越大并且计算结果更精确, 默认为5天，必须使用整数）
     * deleteExistResultDataset - {Boolean} 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。
     */
    initialize: function (options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
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

    CLASS_NAME: "SuperMap.REST.AreaSolarRadiationParameters"
});

SuperMap.REST.AreaSolarRadiationParameters.toObject =  function(derrainCurvatureCalculationParameters, tempObj){
    var parameter = new Object();
    for (var name in derrainCurvatureCalculationParameters) {
        if(name !== "dataset"){
            if( name === "latitude" || name === "timeMode" || name === "dayStart"  || name === "dayEnd"  || name === "hourStart"  || name === "hourEnd"  || name === "transmittance" || name === "hourInterval" || name === "dayInterval"){
                parameter[name] = derrainCurvatureCalculationParameters[name];
            }
            else{
                tempObj[name] = derrainCurvatureCalculationParameters[name];
            }
        }
    }
    tempObj["parameter"] = parameter;
};