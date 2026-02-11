/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {Util} from '../commontypes/Util';
 
 /**
  * @class ChartSetting
  * @deprecatedclass SuperMap.ChartSetting
  * @category iServer Map Chart
  * @classdesc 海图显示参数设置类，用于管理海图显示环境，包括海图的显示模式、显示类型名称、颜色模式、安全水深线等各种显示风格。更多内容介绍请参考[海图显示]{@link https://help.supermap.com/iDesktop/zh/tutorial/Chart/Visualization/ChartDisplaySetting}。
  * @version 11.2.0
  * @param {Object} options - 参数。
  * @param {string} [options.chartType] - 海图显示类型，S57、S100。
  * @param {number} [options.safetyContour=30.0] - 安全等深线。单位以 depthUnit 设置的水深单位为准。
  * @param {number} [options.shallowContour=2.0] - 浅水等深线。单位以 depthUnit 设置的水深单位为准。
  * @param {number} [options.deepContour=30.0] - 深水等深线。单位以 depthUnit 设置的水深单位为准。
  * @param {number} [options.safetyDepth=30.0] - 安全水深值。单位以 depthUnit 设置的水深单位为准。
  * @usage
  */
 export class ChartSetting {
 
     constructor(options) {
         /**
          * @member {string} [options.chartType]
          * @description 海图显示类型，S57、S100。
          */
         this.chartType = null;

         /**
          * @member {number} [options.safetyContour]
          * @description 安全等深线。单位以 depthUnit 设置的水深单位为准。
          */
         this.safetyContour = 30.0;

         /**
          * @member {number} [options.safetyContour]
          * @description 安全等深线。
          */
         this.safetyContour = 30.0;

         /**
          * @member {number} [options.shallowContour]
          * @description 浅水等深线。
          */
         this.shallowContour = 2.0;

         /**
          * @member {number} [options.deepContour]
          * @description 深水等深线。
          */
         this.deepContour = 30.0;

         /**
          * @member {number} [options.safetyDepth]
          * @description 安全水深值
          */
         this.safetyDepth = 30.0;

         if (options) {
             Util.extend(this, options);
         }
         this.CLASS_NAME = "SuperMap.ChartSetting";
     }
 
 
     /**
      * @function ChartSetting.prototype.destroy
      * @description 释放资源，将引用资源的属性置空。
      */
     destroy() {
      this.chartType = null;
      this.safetyContour = null;
      this.shallowContour = null;
      this.deepContour = null;
      this.safetyDepth = null;
     }
 }
 