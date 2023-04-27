/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {Bounds} from '../commontypes/Bounds';

/**
 * @class DatasetInfo
 * @deprecatedclass SuperMap.DatasetInfo
 * @category  iServer Data Dataset
 * @classdesc 数据集信息类。
 * 数据集一般为存储在一起的相关数据的集合；根据数据类型的不同，分为矢量数据集、栅格数据集（griddataset）和
 * 影像数据集（image dataset），以及为了处理特定问题而设计的数据集，如拓扑数据集，网络数据集等。
 * 数据集是 GIS 数据组织的最小单位。其中矢量数据集是由同种类型空间要素组成的集合，
 * 所以也可以称为要素集。根据要素的空间特征的不同，矢量数据集又分为点数据集，
 * 线数据集，面数据集等，各矢量数据集是空间特征和性质相同的数据组织起来的集合。
 * 目前版本支持的数据集主要有点数据集，线数据集，面数据集，文本数据集，复合数据集（CAD 数据集）、
 * 网络数据集，栅格数据集（grid dataset）和影像数据集（image dataset）。
 * @param {Object} options - 参数。
 * @param {Bounds} [options.bounds] - 数据集范围。
 * @param {string} [options.dataSourceName] - 数据源名称。
 * @param {string} [options.description] - 数据集的描述信息。
 * @param {string} [options.encodeType] - 数据集存储时的压缩编码方式。
 * @param {boolean} [options.isReadOnly] - 数据集是否为只读。
 * @param {string} options.name - 数据集名称。
 * @param {Object} [options.prjCoordSys] - 数据集的投影信息。如：prjCoordSys={"epsgCode":3857}。
 * @param {string} [options.tableName] - 表名。
 * @param {string} options.type - 数据集类型。主要有点数据集，线数据集，面数据集，文本数据集，复合数据集（CAD 数据集）、网络数据集，栅格数据集（grid dataset）和影像数据集（image dataset）。
 * @usage
 */
export class DatasetInfo {


    constructor(options) {
        options = options || {};

        /**
         * @member {Bounds} [DatasetInfo.prototype.bounds]
         * @description 数据集范围，该字段只读。
         */
        this.bounds = null;

        /**
         * @member {string} [DatasetInfo.prototype.dataSourceName]
         * @description 数据源名称，该字段只读。
         */
        this.dataSourceName = null;

        /**
         * @member {string} [DatasetInfo.prototype.description]
         * @description 数据集的描述信息。
         */
        this.description = null;

        /**
         * @member {string} [DatasetInfo.prototype.encodeType]
         * @description 数据集存储时的压缩编码方式，该字段只读。
         */
        this.encodeType = null;

        /**
         * @member {boolean} [DatasetInfo.prototype.isReadOnly]
         * @description 数据集是否为只读。
         */
        this.isReadOnly = null;

        /**
         * @member {string} DatasetInfo.prototype.name
         * @description 数据集名称，该字段必须且只读。
         */
        this.name = null;

        /**
         * @member {Object} [DatasetInfo.prototype.prjCoordSys]
         * @description 数据集的投影信息。
         */
        this.prjCoordSys = null;

        /**
         * @member {string} [DatasetInfo.prototype.tableName]
         * @description 表名，该字段只读。
         */
        this.tableName = null;

        /**
         * @member {string} DatasetInfo.prototype.type
         * @description 数据集类型，该字段必设。主要有点数据集，线数据集，面数据集，文本数据集，复合数据集（CAD 数据集）、网络数据集，栅格数据集（grid dataset）和影像数据集（image dataset）。
         */
        this.type = null;

        Util.extend(this, options);

        var b = this.bounds;
        if (b) {
            this.bounds = new Bounds(b.leftBottom.x, b.leftBottom.y, b.rightTop.x, b.rightTop.y);
        }
        this.CLASS_NAME = "SuperMap.DatasetInfo";
    }

    /**
     * @function DatasetInfo.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        Util.reset(this);
    }

    /**
     * @function DatasetInfo.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @returns {Object} JSON 对象。
     */
    toServerJSONObject() {
        var dataObj = {};
        dataObj = Util.copyAttributes(dataObj, this);
        if (dataObj.bounds) {
            if (dataObj.bounds.toServerJSONObject) {
                dataObj.bounds = dataObj.bounds.toServerJSONObject();
            }
        }
        return dataObj;
    }
}
