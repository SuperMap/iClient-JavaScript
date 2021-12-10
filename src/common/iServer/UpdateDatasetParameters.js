/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class UpdateDatasetParameters
 * @deprecatedclass SuperMap.UpdateDatasetParameters
 * @category iServer Data Dataset
 * @classdesc 数据集信息更改参数类。
 * @param {Object} options - 参数。
 * @param {String} options.datasourceName - 数据源名称(必选)。
 * @param {String} options.datasetName - 数据集名称(必选)。
 * @param {boolean} options.isFileCache - 是否使用文件形式的缓存。仅对数据库型数据源中的矢量数据集有效。。
 * @param {String} options.description - 数据集描述信息。
 * @param {String} options.prjCoordSys - 投影坐标系。
 * @param {Object} options.charset - 矢量数据集的字符集。当数据集类型为矢量数据集时，可以传递此参数。如果用户传递空值，则编码方式保持不变。
 * @param {Array} options.palette - 影像数据的颜色调色板。当数据集类型为影像数据集时，可以传递此参数。
 * @param {Array.<string>} options.noValue - 栅格数据集中没有数据的像元的栅格值。当数据集类型为栅格数据集时，可以传递此参数。
 * @usage
 */
export class UpdateDatasetParameters {

    constructor(options) {
        if (!options) {
            return;
        }

        /**
         * @member {string} UpdateDatasetParameters.prototype.datasourceName
         * @description 数据源名称。
         */
        this.datasourceName = null;

        /**
         * @member {string} UpdateDatasetParameters.prototype.datasetName
         * @description 数据集名称。
         */
        this.datasetName = null;

        /**
         * @member {boolean} UpdateDatasetParameters.prototype.isFileCache
         * @description 是否使用文件形式的缓存。仅对数据库型数据源中的矢量数据集有效。。
         */
        this.isFileCache = null;

        /**
         * @member {String} UpdateDatasetParameters.prototype.description
         * @description 数据集描述信息。
         */
        this.description = null;

        /**
         * @member {String} UpdateDatasetParameters.prototype.prjCoordSys
         * @description 投影坐标系。
         */
        this.prjCoordSys = null;

        /**
         * @member {Object} UpdateDatasetParameters.prototype.charset
         * @description 矢量数据集的字符集。
         */
        this.charset = null;

        /**
         * @member {Array} UpdateDatasetParameters.prototype.palette
         * @description 影像数据的颜色调色板。
         */
        this.palette = null;

        /**
         * @member {Array.<string>} UpdateDatasetParameters.prototype.noValue
         * @description 栅格数据集中没有数据的像元的栅格值。
         */
        this.noValue = null;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.UpdateDatasetParameters";
    }

    /**
     * @function UpdateDatasetParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.datasourceName = null;
        me.datasetName = null;
        me.isFileCache = null;
        me.prjCoordSys = null;
        me.charset = null;
        me.palette = null;
        me.noValue = null;
    }

}

