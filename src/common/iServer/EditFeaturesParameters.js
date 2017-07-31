require('../REST');
var SuperMap = require('../SuperMap');
SuperMap.EditFeaturesParameters = SuperMap.Class({
    /**
     * @class SuperMap.EditFeaturesParameters
     * @constructs SuperMap.EditFeaturesParameters
     * @classdesc
     * 数据服务中数据集添加、修改、删除参数类。
     * @api
     */

    /**
     * APIProperty: dataSourceName
     * {String} 当前需要创建或者是修改的要素的数据源
     */
    dataSourceName: null,
    /**
     * APIProperty: dataSetName
     * {String} 当前需要创建或者是修改的要素的数据集。
     */
    dataSetName: null,
    /**
     * APIProperty: features
     * {Array<SuperMap.Feature.Vector|GeoJSON Feature>} 当前需要创建或者是修改的要素集。
     */
    features: null,

    /**
     * APIProperty: editType
     * {EditType} 要素集更新类型(add、update、delete)，默认为 SuperMap.EditType.ADD.
     */
    editType: SuperMap.EditType.ADD,

    /**
     * APIProperty: IDs
     * {Array(String) 或 Array(Integer)} 执行删除时要素集ID集合。
     */
    IDs: null,

    /**
     * APIProperty: returnContent
     * {Boolean} 要素添加时，isUseBatch 不传或传为 false 的情况下有效。
     *           true 表示直接返回新创建的要素的 ID 数组;false 表示返回创建的 featureResult 资源的 URI。默认不传时为 false。
     */
    returnContent: false,

    /**
     * APIProperty: isUseBatch
     * {Boolean} 是否使用批量添加要素功能，要素添加时有效。
     *           批量添加能够提高要素编辑效率。
     *           true 表示批量添加；false 表示不使用批量添加。默认不传时为 false。
     */
    isUseBatch: false,

    /**
     * @method SuperMap.EditFeaturesParameters.initialize
     * @description 数据服务中数据集添加、修改、删除参数类构造函数。
     * @param options - {Object} 参数。
     *
     * Allowed options properties:</br>
     * features - {Array(Object)} 当前需要创建或者是修改的要素集。</br>
     * returnContent - {Boolean} 是返回创建要素的ID数组还是返回featureResult资源的URI。</br>
     * editType - {SuperMap.EditType} POST动作类型(ADD、UPDATE、DELETE)，默认为 SuperMap.EditType.ADD。</br>
     * IDs - {Array(String) 或 Array(Integer)} 删除要素时的要素的ID数组。</br>
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
        me.dataSourceName = null;
        me.dataSetName = null;
        me.features = null;
        me.editType = null;
        me.IDs = null;
        me.returnContent = null;
    },

    CLASS_NAME: "SuperMap.EditFeaturesParameters"
});
/**
 * @method SuperMap.EditFeaturesParameters.toJsonParameters
 * @description 将 <EditFeaturesParameters> 对象参数转换为 json 字符串。
 * @param params - {SuperMap.EditFeaturesParameters} 地物编辑参数。
 * return {String} 转化后的 json字符串。
 */
SuperMap.EditFeaturesParameters.toJsonParameters = function (params) {
    var geometry,
        feature,
        len,
        features,
        editType = params.editType;

    if (editType === SuperMap.EditType.DELETE) {
        if (params.IDs === null) return;

        features = {ids: params.IDs};
    } else {
        if (params.features === null) return;

        len = params.features.length;
        features = [];
        for (var i = 0; i < len; i++) {
            feature = params.features[i];
            feature.geometry = SuperMap.REST.ServerGeometry.fromGeometry(feature.geometry);
            features.push(feature);
        }
    }

    return SuperMap.Util.toJSON(features);
};
module.exports = SuperMap.EditFeaturesParameters;