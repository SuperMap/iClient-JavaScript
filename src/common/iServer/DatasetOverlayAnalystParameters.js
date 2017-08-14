import  SuperMap from '../SuperMap';
import DataReturnOption from './DataReturnOption';
import FilterParameter from './FilterParameter';
import OverlayAnalystParameters from './OverlayAnalystParameters';
/**
 * @class SuperMap.DatasetOverlayAnalystParameters
 * @classdesc 数据集叠加分析参数类。
 * @param options - {Object} 可选参数。如：</br>
 *        operateDataset - {String} 叠加分析中操作数据集的名称。必设字段。</br>
 *        operateDatasetFields - {Array(String} 叠加分析中操作数据集保留在结果数据集中的字段名列表。</br>
 *        operateDatasetFilter - {SuperMap.FilterParameter} 设置操作数据集中空间对象过滤条件。</br>
 *        operateRegions - {Array(<SuperMap.Geometry>)} 操作区域。设置了操作区域后，仅对该区域内的对象进行分析。</br>
 *        sourceDataset - {String} 叠加分析中源数据集的名称。必设字段。</br>
 *        sourceDatasetFields - {Array(String} 叠加分析中源数据集保留在结果数据集中的字段名列表。</br>
 *        sourceDatasetFilter - {SuperMap.FilterParameter} 设置源数据集中空间对象过滤条件。</br>
 *        tolerance - {Integer} 容限。</br>
 *        operation - {SuperMap.OverlayOperationType} 叠加操作枚举值。</br>
 *        resultSetting - {SuperMap.DataReturnOption} 结果返回设置类。</br>
 * @extends SuperMap.GetFeaturesParametersBase
 */
export default  class DatasetOverlayAnalystParameters extends OverlayAnalystParameters {

    /**
     * @member SuperMap.DatasetOverlayAnalystParameters.prototype.operateDataset -{String}
     * @description 叠加分析中操作数据集的名称。
     */
    operateDataset = null;

    /**
     * @member SuperMap.DatasetOverlayAnalystParameters.prototype.operateDatasetFields -{Array(String)}
     * @description 叠加分析中操作数据集保留在结果数据集中的字段名列表。
     */
    operateDatasetFields = null;

    /**
     * @member SuperMap.DatasetOverlayAnalystParameters.prototype.operateDatasetFilter -{SuperMap.FilterParameter}
     * @description 设置操作数据集中空间对象过滤条件。
     */
    operateDatasetFilter = null;

    /**
     * @member SuperMap.DatasetOverlayAnalystParameters.prototype.operateRegions -{Array(SuperMap.Geometry)}
     * @description 操作面对象集合，表示与这些面对象进行叠加分析。
     * 与 operateDataset 参数互斥，冲突时以operateDataset 为准。
     */
    operateRegions = null;


    /**
     * @member SuperMap.DatasetOverlayAnalystParameters.prototype.sourceDataset -{String}
     * @description 叠加分析中源数据集的名称。必设字段。
     */
    sourceDataset = null;


    /**
     * @member SuperMap.DatasetOverlayAnalystParameters.prototype.sourceDatasetFields -{Array(String)}
     * @description 叠加分析中源数据集保留在结果数据集中的字段名列表。
     */
    sourceDatasetFields = null;


    /**
     * @member SuperMap.DatasetOverlayAnalystParameters.prototype.filterQueryParameter -{SuperMap.FilterParameter}
     * @description 设置源数据集中空间对象过滤条件。
     */
    sourceDatasetFilter = null;

    /**
     * @member SuperMap.DatasetOverlayAnalystParameters.prototype.tolerance -{Integer}
     * @description 容限。
     */
    tolerance = 0;

    /**
     * @member SuperMap.DatasetOverlayAnalystParameters.prototype.resultSetting -{SuperMap.DataReturnOption}
     * @description 结果返回设置类。
     */
    resultSetting = null;


    constructor(options) {
        super(options);
        var me = this;
        me.operateDatasetFields = [];
        me.operateDatasetFilter = new FilterParameter();
        me.operateRegions = [];
        me.sourceDatasetFields = [];
        me.sourceDatasetFilter = new FilterParameter();
        me.resultSetting = new DataReturnOption();
        if (!options) {
            return this;
        }
        SuperMap.Util.extend(this, options);
    }


    /**
     * @function SuperMap.DatasetOverlayAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();

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
    }

    static toObject(datasetOverlayAnalystParameters, tempObj) {
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

    CLASS_NAME = "SuperMap.DatasetOverlayAnalystParameters"
}

SuperMap.DatasetOverlayAnalystParameters = DatasetOverlayAnalystParameters;