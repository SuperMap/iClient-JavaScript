/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import { Util } from '../commontypes/Util';

 /**
  * @class WebPrintingJobLayers
  * @deprecatedclass SuperMap.WebPrintingJobLayers
  * @classdesc 将图例添加到布局的业务图层参数类。
  * @version 10.1.0
  * @category iServer WebPrintingJob
  * @param {Object} option - 参数。
  * @param {string} option.name - 图层 name 的字符串。此 name 必须唯一，并且必须与定义业务图层的 LegendOptions_layers 元素中的图层 name 匹配。
  * @usage
  */
 export class WebPrintingJobLayers {
     constructor(option) {
         /**
          * @member {string} WebPrintingJobLayers.prototype.name
          * @description  图层 name。
          */
         this.name = null;
         /**
          * @member {string} WebPrintingJobLayers.prototype.layerType
          * @description  图层 type。
          */
         this.layerType = null;
         /**
          * @member {string} WebPrintingJobLayers.prototype.url
          * @description  图层 URL。
          */
         this.url = null;

         this.CLASS_NAME = 'SuperMap.WebPrintingJobLayers';
         Util.extend(this, option);
     }

     /**
     * @function WebPrintingJobLayers.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
     destroy() {
         this.name = null;
         this.layerType = null;
         this.url = null;
     }
 }

