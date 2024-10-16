/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ThiessenAnalystParameters} from './ThiessenAnalystParameters';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class DatasetThiessenAnalystParameters
 * @deprecatedclass SuperMap.DatasetThiessenAnalystParameters
 * @category iServer SpatialAnalyst ThiessenAnalyst
 * @classdesc 数据集泰森多边形分析参数类。
 * @param {Object} options - 参数。
 * @param {(GeometryPolygon|L.Polygon|ol.geom.Polygon|GeoJSONObject)} [options.clipRegion] - 结果数据裁剪区域，可以为 null，表示不对结果进行裁剪。
 * @param {boolean} [options.createResultDataset] - 是否返回结果数据集。如果为 true，则必须设置属性 resultDatasetName 和 resultDatasourceName。
 * @param {string} [options.dataset] - 数据集名称待分析的数据集名称，请使用 "datasetName@datasourceName" 格式来表示。
 * @param {FilterParameter} [options.filterQueryParameter] - 过滤参数类，即对数据集中的所有点进行分析。
 * @param {string} [options.resultDatasetName] - 指定结果数据集名称。
 * @param {boolean} [options.resultDatasourceName] - 指定结果数据集所在数据源。
 * @param {boolean} [options.returnResultRegion] - 是否返回分析得到的多边形面数组。
 * @extends {ThiessenAnalystParameters}
 * @usage
 */
export class DatasetThiessenAnalystParameters extends ThiessenAnalystParameters {


    constructor(options) {
        super(options);
        /**
         * @member {FilterParameter} [DatasetThiessenAnalystParameters.prototype.filterQueryParameter]
         * @description 过滤条件，对待分析数据集中的点进行过滤，即对数据集中的所有点进行分析。
         * @example
         *  var filterQueryParameter = new FilterParameter({
         *   name: "Countries@World",
         *   attributeFilter: "SmID>100"
         *  });
         */
        this.filterQueryParameter = null;

        /**
         * @member {string} DatasetThiessenAnalystParameters.prototype.dataset
         * @description 数据集名称待分析的数据集名称，请使用 "datasetName@datasourceName" 格式来表示。
         */
        this.dataset = null;

        if (options) {
            Util.extend(this, options);
        }


        this.CLASS_NAME = "SuperMap.DatasetThiessenAnalystParameters";
    }

    /**
     * @function DatasetThiessenAnalystParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        if (me.filterQueryParameter) {
            me.filterQueryParameter.destroy();
            me.filterQueryParameter = null;
        }
    }

    /**
     * @function DatasetThiessenAnalystParameters.toObject
     * @param {DatasetThiessenAnalystParameters} datasetThiessenAnalystParameters - 泰森多边形分析服务参数类。
     * @param {DatasetThiessenAnalystParameters} tempObj - 泰森多边形分析服务参数对象。
     * @description 将泰森多边形分析服务参数对象转换为 JSON 对象。
     * @returns JSON 对象。
     */
    static toObject(datasetThiessenAnalystParameters, tempObj) {
        for (var name in datasetThiessenAnalystParameters) {
            if (name === "clipRegion") {
                tempObj.clipRegion = ServerGeometry.fromGeometry(datasetThiessenAnalystParameters.clipRegion);
            } else {
                tempObj[name] = datasetThiessenAnalystParameters[name];
            }
        }
    }

}

