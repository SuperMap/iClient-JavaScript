/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class ChartWaterDepthParameter
 * @deprecatedclass SuperMap.ChartWaterDepthParameter
 * @category  iServer Map Chart
 * @classdesc 海图水深查询参数类
 * @param {Object} options - 参数。
 * @param {Object} options.dataSource - 数据源名称。
 * @param {number} options.X - 地理位置 X 轴。
 * @param {number} options.Y - 地理位置 Y 轴。
 * @usage
 */
export class ChartWaterDepthParameter {
  constructor(options) {
    /**
     * @member {string} [ChartWaterDepthParameter.prototype.dataSource]
     * @description 数据源名称。
     */
    this.dataSource = null;

    /**
     * @member {number} [ChartWaterDepthParameter.prototype.X]
     * @description 地理位置 X 轴
     */
    this.X = null;
  
    /**
     * @member {number} [ChartWaterDepthParameter.prototype.Y]
     * @description 地理位置 Y 轴
     */
    this.Y = null;

    Util.extend(this, options);

    this.CLASS_NAME = 'SuperMap.ChartWaterDepthParameter';
  }

  /**
   * @function ChartWaterDepthParameter.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  destroy() {
    var me = this;
    me.dataSource = null;
    me.X = null;
    me.Y = null;
  }
}
