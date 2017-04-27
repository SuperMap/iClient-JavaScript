/**
 * Class: SuperMap.DatasetOverlayAnalystParameters
 * 数据集叠加分析参数类
 *
 * Inherits from:
 *  - <SuperMap.OverlayAnalystParameters>
 */
require('../REST');
require('./OverlayAnalystParameters');
var SuperMap = require('../SuperMap');
var DataReturnOption = require('./DataReturnOption');
var FilterParameter = require('./FilterParameter');
SuperMap.DatasetOverlayAnalystParameters = SuperMap.Class(SuperMap.OverlayAnalystParameters, {

    /**
     * APIProperty: operateDataset
     * {String} 叠加分析中操作数据集的名称。
     */
    operateDataset: null,

    /**
     * APIProperty: operateDatasetFields
     * {Array(String} 叠加分析中操作数据集保留在结果数据集中的字段名列表。
     */
    operateDatasetFields: null,

    /**
     * APIProperty: operateDatasetFilter
     * {<SuperMap.FilterParameter>} 设置操作数据集中空间对象过滤条件。
     */
    operateDatasetFilter: null,

    /**
     * APIProperty: operateRegions
     * {Array(<SuperMap.Geometry>)}操作面对象集合，表示与这些面对象进行叠加分析。
     * 与 operateDataset 参数互斥，冲突时以operateDataset 为准。
     */
    operateRegions: null,


    /**
     * APIProperty: sourceDataset
     * {String} 叠加分析中源数据集的名称。必设字段。
     */
    sourceDataset: null,


    /**
     * APIProperty: sourceDatasetFields
     * {Array(String} 叠加分析中源数据集保留在结果数据集中的字段名列表。
     */
    sourceDatasetFields: null,


    /**
     * APIProperty: filterQueryParameter
     * {<SuperMap.FilterParameter>} 设置源数据集中空间对象过滤条件。
     */
    sourceDatasetFilter: null,


    /**
     * APIProperty: tolerance
     * {Integer} 容限。
     */
    tolerance: 0,

    /**
     * APIProperty: resultSetting
     * {<SuperMap.DataReturnOption>} 结果返回设置类。
     */
    resultSetting: null,

    /**
     * Constructor: DatasetOverlayAnalystParameters
     * 数据集叠加分析参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * operateDataset - {String} 叠加分析中操作数据集的名称。必设字段。
     * operateDatasetFields - {Array(String} 叠加分析中操作数据集保留在结果数据集中的字段名列表。
     * operateDatasetFilter - {<SuperMap.FilterParameter>} 设置操作数据集中空间对象过滤条件。
     * operateRegions - {Array(<SuperMap.Geometry>)} 操作区域。设置了操作区域后，仅对该区域内的对象进行分析。
     * sourceDataset - {String} 叠加分析中源数据集的名称。必设字段。
     * sourceDatasetFields - {Array(String} 叠加分析中源数据集保留在结果数据集中的字段名列表。
     * sourceDatasetFilter - {<SuperMap.FilterParameter>} 设置源数据集中空间对象过滤条件。
     * tolerance - {Integer} 容限。
     * operation - {<SuperMap.OverlayOperationType>} 叠加操作枚举值。
     * resultSetting - {<SuperMap.DataReturnOption>} 结果返回设置类。
     */
    initialize: function (options) {
        var me = this;
        me.operateDatasetFields = [];
        me.operateDatasetFilter = new FilterParameter();
        me.operateRegions = [];
        me.sourceDatasetFields = [];
        me.sourceDatasetFilter = new FilterParameter();
        me.resultSetting = new DataReturnOption();

        SuperMap.OverlayAnalystParameters.prototype.initialize.apply(this, arguments);
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
        SuperMap.OverlayAnalystParameters.prototype.destroy.apply(this, arguments);

        var me = this;
        me.operateDataset = null;
        me.operateDatasetFields = null;
        if (me.operateDatasetFilter) {
            me.operateDatasetFilter.destroy();
            me.operateDatasetFilter = null;
        }
        if (me.operateRegions) {
            for (var i = 0, opRegions = me.operateRegions, len = opRegions.length; i < len; i++) {
                opRegions[i].destroy();
            }
            me.operateRegions = null;
        }
        me.sourceDataset = null;
        me.sourceDatasetFields = null;
        if (me.sourceDatasetFilter) {
            me.sourceDatasetFilter.destroy();
            me.sourceDatasetFilter = null;
        }
        me.tolerance = null;
        if (me.resultSetting) {
            me.resultSetting.destroy();
            me.resultSetting = null;
        }
    },

    CLASS_NAME: "SuperMap.DatasetOverlayAnalystParameters"
});

SuperMap.DatasetOverlayAnalystParameters.toObject = function (datasetOverlayAnalystParameters, tempObj) {
    for (var name in datasetOverlayAnalystParameters) {
        if (name === "sourceDataset") {
        }
        else if (name === "operateRegions") {
            tempObj.operateRegions = [];
            var ors = datasetOverlayAnalystParameters.operateRegions;
            for (var index in ors) {
                if (ors.hasOwnProperty(index)) {    //icl542
                    tempObj.operateRegions[index] = SuperMap.REST.ServerGeometry.fromGeometry(ors[index]);
                }
            }
        }
        else if (name === "resultSetting") {
            tempObj.dataReturnOption = datasetOverlayAnalystParameters.resultSetting;
        }
        else {
            tempObj[name] = datasetOverlayAnalystParameters[name];
        }
    }
};

module.exports = SuperMap.DatasetOverlayAnalystParameters;