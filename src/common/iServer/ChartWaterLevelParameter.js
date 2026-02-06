/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { GetFeaturesParametersBase } from './GetFeaturesParametersBase';

/**
 * @class ChartWaterLevelParameter
 * @deprecatedclass SuperMap.ChartWaterLevelParameter
 * @category  iServer Map Chart
 * @classdesc 海图水深查询参数类
 * @param {Object} options - 参数。
 * @param {string} options.dataSource - 数据源名称。
 * @param {string} [options.dataset] - 数据集名称。
 * @param {string} [options.waterLevelDataset] - 水位数据集名称。
 * @param {string} [options.timeDataset] - 时间数据集名称。
 * @param {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} options.bounds - 查询范围。
 * @param {string} [options.timeIdKey] - 关联水位和时间数据集的标识字段。
 * @extends {GetFeaturesParametersBase}
 * @usage
 */
export class ChartWaterLevelParameter extends GetFeaturesParametersBase {
  constructor(options) {
    super(options);
    /**
     * @member {string} [ChartWaterLevelParameter.prototype.dataSource]
     * @description 数据源名称。
     */
    this.dataSource = null;

    /**
     * @member {string} [ChartWaterLevelParameter.prototype.dataset]
     * @description 数据集名称。
     */
    this.dataset = 'S104Position4326';

    /**
     * @member {string} [ChartWaterLevelParameter.prototype.waterLevelDataset]
     * @description 水位数据集名称。
     */
    this.waterLevelDataset = 'S104WaterLevel';

    /**
     * @member {string} [ChartWaterLevelParameter.prototype.timeDataset]
     * @description 时间数据集名称。
     */
    this.timeDataset = 'S104Time';

    /**
     * @member {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} ChartWaterLevelParameter.prototype.bounds
     * @description 查询范围。
     */
    this.bounds = null;

    /**
     * @member {string} [ChartWaterLevelParameter.prototype.timeIdKey]
     * @description 关联水位和时间数据集的标识字段。
     */
    this.timeIdKey = 'TIMEID';

    Util.extend(this, options);

    this.CLASS_NAME = 'SuperMap.ChartWaterLevelParameter';
  }

  /**
   * @function ChartWaterLevelParameter.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  destroy() {
    var me = this;
    me.dataSource = null;
    me.dataset = null;
    me.waterLevelDataset = null;
    me.timeDataset = null;
    me.bounds = null;
    me.timeIdKey = null;
  }
}
