/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.CreateDatasetParameters
 * @category iServer Data Dataset
 * @classdesc 数据集创建参数类。
 * @param {Object} options - 参数。 
 * @param {string} options.datasourceName - 数据源名称，此为必选参数。
 * @param {string} options.datasetName - 数据集名称，此为必选参数。
 * @param {DatasetType} options.datasetType - 数据集类型。目前支持创建的出聚集类型有：点、线、面、文本、复合（CAD）和属性数据集。
 */
export class CreateDatasetParameters {

    constructor(options) {
        if (!options) {
            return;
        }

        /**
         * @member {string} SuperMap.CreateDatasetParameters.prototype.datasourceName
         * @description 数据源名称，此为必选参数。
         */
        this.datasourceName = null;

        /**
         * @member {string} SuperMap.CreateDatasetParameters.prototype.datasetName
         * @description 数据集名称，此为必选参数。
         */
        this.datasetName = null;

        /**
         * @member {DatasetType} SuperMap.CreateDatasetParameters.prototype.datasetType
         * @description 数据集类型。目前支持创建的出聚集类型有：点、线、面、文本、复合（CAD）和属性数据集。
         */
        this.datasetType = null;
        
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.CreateDatasetParameters";
    }
    /**
     * @function SuperMap.CreateDatasetParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.datasourceName = null;
        me.datasetName = null;
        me.datasetType = null;
    }
}

SuperMap.CreateDatasetParameters = CreateDatasetParameters;
