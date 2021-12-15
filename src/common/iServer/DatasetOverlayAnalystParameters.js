/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {DataReturnOption} from './DataReturnOption';
import {FilterParameter} from './FilterParameter';
import {OverlayAnalystParameters} from './OverlayAnalystParameters';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class DatasetOverlayAnalystParameters
 * @deprecatedclass SuperMap.DatasetOverlayAnalystParameters
 * @category  iServer SpatialAnalyst OverlayAnalyst
 * @classdesc 数据集叠加分析参数类。
 * @param {Object} options - 参数。
 * @param {string} options.operateDataset -数据集名称。
 * @param {string} options.sourceDataset - 源数据集名称。
 * @param {Array.<string>} [options.operateDatasetFields] - 叠加分析中操作数据集保留在结果数据集中的字段名列表。
 * @param {FilterParameter} [options.operateDatasetFilter] - 设置操作数据集中空间对象过滤条件。
 * @param {Array.<GeometryPolygon|L.Polygon|ol.geom.Polygon>} [options.operateRegions] - 操作面对象集合，表示与这些面对象进行叠加分析。与 operateDataset 参数互斥，冲突时以 operateDataset 为准。
 * @param {Array.<string>} [options.sourceDatasetFields] - 叠加分析中源数据集保留在结果数据集中的字段名列表。
 * @param {FilterParameter} [options.sourceDatasetFilter] - 设置源数据集中空间对象过滤条件。
 * @param {number} [options.tolerance=0] - 容限。
 * @param {OverlayOperationType} options.operation - 叠加操作枚举值。
 * @param {DataReturnOption} [options.resultSetting] - 结果返回设置类。
 * @extends {GetFeaturesParametersBase}
 * @usage
 */
export class DatasetOverlayAnalystParameters extends OverlayAnalystParameters {


    constructor(options) {
        super(options);
        /**
         * @member {string} DatasetOverlayAnalystParameters.prototype.operateDataset
         * @description 叠加分析中操作数据集的名称。
         */
        this.operateDataset = null;

        /**
         * @member {Array.<string>} [DatasetOverlayAnalystParameters.prototype.operateDatasetFields]
         * @description 叠加分析中操作数据集保留在结果数据集中的字段名列表。
         */
        this.operateDatasetFields = [];

        /**
         * @member {FilterParameter} DatasetOverlayAnalystParameters.prototype.operateDatasetFilter
         * @description 设置操作数据集中空间对象过滤条件。
         */
        this.operateDatasetFilter = new FilterParameter();

        /**
         * @member {Array.<GeometryPolygon|L.Polygon|ol.geom.Polygon>} [DatasetOverlayAnalystParameters.prototype.operateRegions]
         * @description 操作面对象集合，表示与这些面对象进行叠加分析。与 operateDataset 参数互斥，冲突时以 operateDataset 为准。
         */
        this.operateRegions = [];


        /**
         * @member {string} DatasetOverlayAnalystParameters.prototype.sourceDataset
         * @description 叠加分析中源数据集的名称。
         */
        this.sourceDataset = null;


        /**
         * @member {Array.<string>} [DatasetOverlayAnalystParameters.prototype.sourceDatasetFields]
         * @description 叠加分析中源数据集保留在结果数据集中的字段名列表。
         */
        this.sourceDatasetFields = [];


        /**
         * @member {FilterParameter} [DatasetOverlayAnalystParameters.prototype.filterQueryParameter]
         * @description 设置源数据集中空间对象过滤条件。
         */
        this.sourceDatasetFilter = new FilterParameter();

        /**
         * @member {number} [DatasetOverlayAnalystParameters.prototype.tolerance=0]
         * @description 容限。
         */
        this.tolerance = 0;

        /**
         * @member {DataReturnOption} [DatasetOverlayAnalystParameters.prototype.resultSetting]
         * @description 结果返回设置类。
         */
        this.resultSetting = new DataReturnOption();

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.DatasetOverlayAnalystParameters";
    }


    /**
     * @function DatasetOverlayAnalystParameters.prototype.destroy
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
     * @function DatasetOverlayAnalystParameters.toObject
     * @param {DatasetOverlayAnalystParameters} datasetOverlayAnalystParameters - 数据集叠加分析参数类。
     * @param {DatasetOverlayAnalystParameters} tempObj - 数据集叠加分析参数对象。
     * @description 将数据集叠加分析参数类转换为 JSON 对象。
     * @returns {Object} JSON 对象。
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
