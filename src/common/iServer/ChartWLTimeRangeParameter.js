/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { GetFeaturesParametersBase } from './GetFeaturesParametersBase';

/**
 * @class ChartWLTimeRangeParameter
 * @deprecatedclass SuperMap.ChartWLTimeRangeParameter
 * @category  iServer Map Chart
 * @classdesc 海图水深时间范围查询过滤参数类。
 * @param {Object} options - 参数。
 * @param {Object} options.dataSource - 数据源名称。
 * @param {FilterParameter} [options.dataset] - 数据集名称。
 * @param {string} [options.timeDataset] - 时间数据集名称。
 * @param {string} [options.idKey] - 关联字段。
 * @extends {GetFeaturesParametersBase}
 * @usage
 */
export class ChartWLTimeRangeParameter extends GetFeaturesParametersBase {
  constructor(options) {
    super(options);
    /**
     * @member {string} [ChartWLTimeRangeParameter.prototype.dataSource]
     * @description 数据源。
     */
    this.dataSource = null;

    /**
     * @member {FilterParameter} [ChartWLTimeRangeParameter.prototype.dataset]
     * @description 数据集。
     */
    this.dataset = 'S104Position4326';

    /**
     * @member {string} [ChartWLTimeRangeParameter.prototype.timeDataset]
     * @description 时间数据集名称。
     */
    this.timeDataset = 'S104Time';

    /**
     * @member {string} [ChartWLTimeRangeParameter.prototype.idKey]
     * @description 关联字段。
     */
    this.idKey = 'CELLID';

    Util.extend(this, options);

    this.CLASS_NAME = 'SuperMap.ChartWLTimeRangeParameter';
  }

  /**
   * @function ChartWLTimeRangeParameter.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  destroy() {
    var me = this;
    me.dataset = null;
    me.dataSource = null;
    me.timeDataset = null;
    me.idKey = null;
  }
}
