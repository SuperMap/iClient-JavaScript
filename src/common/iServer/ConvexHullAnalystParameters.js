/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {Util} from '../commontypes/Util';
 
 /**
  * @class ConvexHullAnalystParameters
  * @deprecatedclass SuperMap.ConvexHullAnalystParameters
  * @constructs ConvexHullAnalystParameters
  * @category iServer SpatialAnalyst ConvexHullAnalyst
  * @classdesc 凸包计算参数类。该类提供了凸包计算中的源模型对象、凸包结果设置等参数。
  * @version 11.1.1
  * @param {Object} options - 参数。
  * @param {Object} options.model - 源模型对象，即凸包计算中被操作的模型对象。
  * @param {Object} [options.resultSetting] - 凸包计算结果设置，即模型对象凸包结果设置。
  * @usage
  */
 
 export class ConvexHullAnalystParameters {
 
     constructor(options) {
         /**
          * @member {Object} ConvexHullAnalystParameters.prototype.model
          * @description 源模型对象，即凸包计算中被操作的模型对象。
          */
         this.model = null;

         /**
          * @member {Object} [ConvexHullAnalystParameters.prototype.resultSetting]
          * @description 凸包计算结果设置，即模型对象凸包结果设置。
          */
         this.resultSetting = null;
         
         if (options) {
             Util.extend(this, options);
         }
         this.CLASS_NAME = "SuperMap.ConvexHullAnalystParameters";
     }
 
     /**
      * @function ConvexHullAnalystParameters.prototype.destroy
      * @override
      */
     destroy() {
        var me = this;
        me.model = null;
        me.resultSetting = null;
     }
 
 }
 