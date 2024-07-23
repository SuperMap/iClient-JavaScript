/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class CreateDatasetParameters
 * @deprecatedclass SuperMap.CreateDatasetParameters
 * @category iServer Data Dataset
 * @classdesc 数据集创建参数类。此类用于设置创建的数据集的名称、类型以及数据集所在的数据源等参数，
 * 可创建的数据集类型包括：点、线、面、文本、复合（CAD）和纯属性数据集。
 * @param {Object} options - 参数。
 * @param {string} options.datasourceName - 数据源名称，此为必设参数。
 * @param {string} options.datasetName - 数据集名称，此为必设参数。
 * @param {string} options.datasetType - 数据集类型。目前支持创建的数据集类型有：点、线、面、文本、复合（CAD）和属性数据集。
 * @usage
 */
export class CreateDatasetParameters {

    constructor(options) {
        if (!options) {
            return;
        }

        /**
         * @member {string} CreateDatasetParameters.prototype.datasourceName
         * @description 数据源名称，此为必设参数。
         */
         this.datasourceName = null;

        /**
         * @member {string} CreateDatasetParameters.prototype.datasetName
         * @description 数据集名称，此为必设参数。
         */
         this.datasetName = null;

        /**
         * @member {string} CreateDatasetParameters.prototype.datasetType
         * @description 数据集类型。目前支持创建的数据集类型有：点、线、面、文本、复合（CAD）和属性数据集。
         */
        this.datasetType = null;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.CreateDatasetParameters";
    }
    /**
     * @function CreateDatasetParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.datasourceName = null;
        me.datasetName = null;
        me.datasetType = null;
    }
}

