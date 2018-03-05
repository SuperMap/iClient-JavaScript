import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {DataReturnOption} from './DataReturnOption';
import {FilterParameter} from './FilterParameter';
import {OverlayAnalystParameters} from './OverlayAnalystParameters';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class SuperMap.DatasetOverlayAnalystParameters
 * @category  iServer SpatialAnalyst OverlayAnalyst
 * @classdesc 数据集叠加分析参数类。
 * @param options - {Object} 可选参数。如：</br>
 *        operateDataset - {string} 叠加分析中操作数据集的名称。必设字段。</br>
 *        operateDatasetFields - {Array<string>} 叠加分析中操作数据集保留在结果数据集中的字段名列表。</br>
 *        operateDatasetFilter - {{@link SuperMap.FilterParameter}} 设置操作数据集中空间对象过滤条件。</br>
 *        operateRegions - {Array<Object>} 操作区域。设置了操作区域后，仅对该区域内的对象进行分析。面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|ol.geom.Polygon。</br>
 *        sourceDataset - {string} 叠加分析中源数据集的名称。必设字段。</br>
 *        sourceDatasetFields - {Array<string>} 叠加分析中源数据集保留在结果数据集中的字段名列表。</br>
 *        sourceDatasetFilter - {{@link SuperMap.FilterParameter}} 设置源数据集中空间对象过滤条件。</br>
 *        tolerance - {integer} 容限。</br>
 *        operation -  {{@link SuperMap.OverlayOperationType}} 叠加操作枚举值。</br>
 *        resultSetting - {{@link SuperMap.DataReturnOption}} 结果返回设置类。</br>
 * @extends SuperMap.GetFeaturesParametersBase
 */
export class DatasetOverlayAnalystParameters extends OverlayAnalystParameters {


    constructor(options) {
        super(options);
        /**
         * @member SuperMap.DatasetOverlayAnalystParameters.prototype.operateDataset -{string}
         * @description 叠加分析中操作数据集的名称。
         */
        this.operateDataset = null;

        /**
         * @member SuperMap.DatasetOverlayAnalystParameters.prototype.operateDatasetFields -{Array<string>}
         * @description 叠加分析中操作数据集保留在结果数据集中的字段名列表。
         */
        this.operateDatasetFields = [];

        /**
         * @member SuperMap.DatasetOverlayAnalystParameters.prototype.operateDatasetFilter -{SuperMap.FilterParameter}
         * @description 设置操作数据集中空间对象过滤条件。
         */
        this.operateDatasetFilter = new FilterParameter();

        /**
         * @member SuperMap.DatasetOverlayAnalystParameters.prototype.operateRegions
         * @description 操作面对象集合，表示与这些面对象进行叠加分析。<br>
         * 面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|ol.geom.Polygon。<br>
         * 与 operateDataset 参数互斥，冲突时以operateDataset 为准。
         */
        this.operateRegions = [];


        /**
         * @member SuperMap.DatasetOverlayAnalystParameters.prototype.sourceDataset -{string}
         * @description 叠加分析中源数据集的名称。必设字段。
         */
        this.sourceDataset = null;


        /**
         * @member SuperMap.DatasetOverlayAnalystParameters.prototype.sourceDatasetFields -{Array<string>}
         * @description 叠加分析中源数据集保留在结果数据集中的字段名列表。
         */
        this.sourceDatasetFields = [];


        /**
         * @member SuperMap.DatasetOverlayAnalystParameters.prototype.filterQueryParameter -{SuperMap.FilterParameter}
         * @description 设置源数据集中空间对象过滤条件。
         */
        this.sourceDatasetFilter = new FilterParameter();

        /**
         * @member SuperMap.DatasetOverlayAnalystParameters.prototype.tolerance -{Integer}
         * @description 容限。
         */
        this.tolerance = 0;

        /**
         * @member SuperMap.DatasetOverlayAnalystParameters.prototype.resultSetting -{SuperMap.DataReturnOption}
         * @description 结果返回设置类。
         */
        this.resultSetting = new DataReturnOption();

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.DatasetOverlayAnalystParameters";
    }


    /**
     * @function SuperMap.DatasetOverlayAnalystParameters.prototype.destroy
     * @override
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

    /**
     * @function SuperMap.DatasetOverlayAnalystParameters.toObject
     * @param datasetOverlayAnalystParameters -{SuperMap.DatasetOverlayAnalystParameters} 数据集叠加分析参数类。
     * @param tempObj - {SuperMap.DatasetOverlayAnalystParameters} 数据集叠加分析参数对象。
     * @description  将数据集叠加分析参数类转换为JSON对象。
     * @return {Object} JSON对象。
     */
    static toObject(datasetOverlayAnalystParameters, tempObj) {
        for (var name in datasetOverlayAnalystParameters) {
            if (name === "sourceDataset") {
                continue;
            } else if (name === "operateRegions") {
                tempObj.operateRegions = [];
                var ors = datasetOverlayAnalystParameters.operateRegions;
                for (var index in ors) {
                    if (ors.hasOwnProperty(index)) {    //icl542
                        tempObj.operateRegions[index] = ServerGeometry.fromGeometry(ors[index]);
                    }
                }
            } else if (name === "resultSetting") {
                tempObj.dataReturnOption = datasetOverlayAnalystParameters.resultSetting;
            } else {
                tempObj[name] = datasetOverlayAnalystParameters[name];
            }
        }
    }


}

SuperMap.DatasetOverlayAnalystParameters = DatasetOverlayAnalystParameters;