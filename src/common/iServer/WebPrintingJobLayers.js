/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import { SuperMap } from '../SuperMap';
 import { Util } from '../commontypes/Util';

 /**
  * @class SuperMap.WebPrintingJobLayers
  * @classdesc 将图例添加到布局的业务图层参数类。
  * @category iServer WebPrintingJob
  * @param {Object} option - 初始化参数。
  * @param {string} [option.name] - 表示图层 name 的字符串。此 name 必须唯一，并且必须与定义业务图层的 LegendOptions_layers 元素中的图层 name 匹配。
  */
 export class WebPrintingJobLayers {
     constructor(option) {
         /**
          * @member {string} SuperMap.WebPrintingJobLayers.prototype.name
          * @description  图层 name。
          */
         this.name = null;
         /**
          * @member {string} SuperMap.WebPrintingJobLayers.prototype.layerType
          * @description  图层 type。
          */
         this.layerType = null;
         /**
          * @member {string} SuperMap.WebPrintingJobLayers.prototype.url
          * @description  图层 url。
          */
         this.url = null;

         this.CLASS_NAME = 'SuperMap.WebPrintingJobLayers';
         Util.extend(this, option);
     }

     /**
      * @function SuperMap.WebPrintingJobLayers.prototype.toJSON
      * @description 将 SuperMap.WebPrintingJobLayers 对象转化为 JSON 字符串。
      * @returns {string} 返回转换后的 JSON 字符串。
      */
     destroy() {
         this.name = null;
         this.layerType = null;
         this.url = null;
     }
 }

 SuperMap.WebPrintingJobLayers = WebPrintingJobLayers;
