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
  * @usage
  */
 export class ChartSetting {
 
     constructor(options) {
         /**
          * @member {string} [options.chartType]
          * @description 海图显示类型，S57、S100。
          */
         this.chartType = null;


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
     }
 }
 