/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {MinDistanceAnalystParameters} from './MinDistanceAnalystParameters';
import {ServerGeometry} from './ServerGeometry';


/**
 * @class GeometryMinDistanceAnalystParameters
 * @deprecatedclass SuperMap.GeometryMinDistanceAnalystParameters
 * @category iServer SpatialAnalyst MinDistanceAnalyst
 * @classdesc 几何对象最近距离分析参数类。
 * @version 11.1.1
 * @param {Object} options - 参数。
 * @param {Array.<Geometry>} options.inputGeometries - 被计算几何对象集合，目前只支持二维点对象
 * @param {string} options.referenceDatasetName - 参考数据集的名称。可以是二维点、线、面数据集或二维网络数据集
 * @param {FilterParameter} [options.referenceFilterQueryParameter=null] - 对参考数据集中的要素进行过滤的属性过滤条件。不设置时默认为 null，即以参考数据集中的所有要素为参考要素进行计算。
 * @param {boolean} [options.createResultDataset] - 是否创建结果数据集。
 * @param {string} [options.resultDatasetName] - 结果数据集名称。
 * @param {string} [options.resultDatasourceName] - 结果数据集所在数据源的名称。
 * @param {number} options.minDistance - 指定的查询范围的最小距离。取值范围为大于或等于 0。单位与被计算记录集所属数据集的单位相同。
 * @param {number} options.maxDistance - 指定的查询范围的最大距离。取值范围为大于 0 的值及 -1。当设置为 -1 时，表示不限制最大距离。单位与被计算记录集所属数据集的单位相同。
 * @extends {MinDistanceAnalystParameters}
 * @usage
 */
export class GeometryMinDistanceAnalystParameters extends MinDistanceAnalystParameters{

    constructor(options) {
        super(options);
        /**
         * @member {Array.<Geometry>} GeometryMinDistanceAnalystParameters.prototype.inputGeometries
         * @description 被计算几何对象集合，目前只支持二维点对象
         */
        this.inputGeometries = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.GeometryMinDistanceAnalystParameters";
    }

    /**
     * @function GeometryMinDistanceAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
        me.inputGeometries = null;
    }
    
    /**
     * @function GeometryMinDistanceAnalystParameters.toObject
     * @param {GeometryMinDistanceAnalystParameters} geometryMinDistanceAnalystParameters - 几何对象最近距离分析参数类。
     * @param {GeometryMinDistanceAnalystParameters} tempObj - 几何对象最近距离分析参数对象。
     * @description 将几何对象最近距离分析参数对象转换为 JSON 对象。
     * @returns {Object} JSON 对象。
     */
    static toObject(geometryMinDistanceAnalystParameters, tempObj) {
        for (var name in geometryMinDistanceAnalystParameters) {
            if (name === "inputGeometries" && geometryMinDistanceAnalystParameters.inputGeometries) {
                var inputGeometries = [];
                for (var i = 0; i < geometryMinDistanceAnalystParameters.inputGeometries.length; i++) {
                    inputGeometries.push(ServerGeometry.fromGeometry(geometryMinDistanceAnalystParameters.inputGeometries[i]));
                }
                tempObj.inputGeometries = inputGeometries;

            } else {
                tempObj[name] = geometryMinDistanceAnalystParameters[name];
            }
        }
    }
}
