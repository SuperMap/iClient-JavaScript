/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {Util} from '../commontypes/Util';

 /**
  * @class TraceAnalystParameters
  * @deprecatedclass SuperMap.TraceAnalystParameters
  * @category iServer NetworkAnalyst TraceAnalystService
  * @classdesc 上游/下游追踪分析参数类。此类用于设置追踪分析的分析类型、需查找上游设施的弧段或结点 ID、不确定流向是否有效等参数，
  * 还可对分析结果以及是否返回结果要素的详细描述信息进行设置。<br>
  * 上游/下游追踪分析指追踪给定的分析结点/弧段到上游或者下游所流经的所有弧段。
  * @version 11.1.1
  * @param {Object} options - 参数。
  * @param {number} options.traceType - 分析类型，只能是 0 (上游追踪分析) 或者是 1 (下游追踪分析)。
  * @param {number} [options.edgeID] - 【与 nodeID 必填一项】需查找上游设施的弧段 ID。
  * @param {number} [options.nodeID] - 【与 edgeID 必填一项】需查找上游设施的结点 ID。
  * @param {string} [options.weightName] - 权重字段。
  * @param {boolean} [options.returnFeatures=true] - 是否返回结果要素的详细描述信息。若为 false，只返回结果要素的 ID 集合。
  * @param {boolean} [options.isUncertainDirectionValid=true] - 指定不确定流向是否有效。true 表示不确定流向有效，遇到不确定流向时分析继续进行；false 表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
  * @param {boolean} [options.withIndex=true] - 当使用 FlatGeobuf 表述时该参数可选。表示返回的表述为 FlatGeobuf 的结果是否包含空间索引，默认为 true。
  * @usage
  */
 export class TraceAnalystParameters {
 
 
     constructor(options) {
         /**
          * @member {number} [TraceAnalystParameters.prototype.edgeID]
          * @description 指定的弧段 ID，edgeID 与 nodeID 必须指定一个。
          */
         this.edgeID = null;
 
         /**
          * @member {number} [TraceAnalystParameters.prototype.nodeID]
          * @description 指定的结点 ID，edgeID 与 nodeID 必须指定一个。
          */
         this.nodeID = null;
 
         /**
          * @member {string} [TraceAnalystParameters.prototype.weightName]
          * @description 权重字段。
          */
         this.weightName = null;

         /**
          * @member {boolean} [TraceAnalystParameters.prototype.returnFeatures=true]
          * @description 是否返回结果要素的详细描述信息。若为 false，只返回结果要素的 ID 集合。
          */
         this.returnFeatures = true;
 
         /**
          * @member {boolean} [TraceAnalystParameters.prototype.isUncertainDirectionValid=false]
          * @description 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；
          *              指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
          */
         this.isUncertainDirectionValid = true;
 
         /**
          * @member {number} TraceAnalystParameters.prototype.traceType
          * @description 分析类型，只能是 0 (上游追踪分析) 或者是 1（下游追踪分析）。
          */
         this.traceType = null;

         /**
          * @member {boolean} TraceAnalystParameters.prototype.withIndex
          * @description 当使用 FlatGeobuf 表述时该参数可选。表示返回的表述为 FlatGeobuf 的结果是否包含空间索引，默认为 true。
          */
         this.withIndex = null;
         Util.extend(this, options);
         this.CLASS_NAME = "SuperMap.TraceAnalystParameters";
     }
 
 
     /**
      * @function TraceAnalystParameters.prototype.destroy
      * @description 释放资源，将引用资源的属性置空。
      */
     destroy() {
         var me = this;
         me.edgeID = null;
         me.nodeID = null;
         me.weightName = null;
         me.returnFeatures = null;
         me.isUncertainDirectionValid = null;
         me.type = null;
         me.withIndex = null;
     }
 
 }
 