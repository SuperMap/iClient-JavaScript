/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reservceTypeed.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import { Util } from '../commontypes/Util';
 import {GeoJSON} from '../format/GeoJSON';
 import { NetworkAnalystServiceBase } from './NetworkAnalystServiceBase';
 import { TraceAnalystParameters } from './TraceAnalystParameters';
 
 /**
  * @class TraceAnalystService
  * @deprecatedclass SuperMap.TraceAnalystService
  * @category iServer NetworkAnalyst TraceAnalystService
  * @classdesc 上游/下游 追踪分析服务类；即查找给定弧段或节点的上游/下游弧段和结点。
  * @extends NetworkAnalystServiceBase
  * @param {string} url - 服务地址。请求网络分析服务，URL应为：
  *                       http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
  *                       例如: "http://localhost:8090/iserver/services/test/rest/networkanalyst/WaterNet@FacilityNet";
  * @param {Object} options - 参数。
  * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
  * @param {Object} [options.headers] - 请求头。
  * @usage
  */
 export class TraceAnalystService extends NetworkAnalystServiceBase {
 
     constructor(url, options) {
         super(url, options);
         this.CLASS_NAME = "SuperMap.TraceAnalystService";
     }

 
     /**
      * @function TraceAnalystService.prototype.destroy
      * @override
      */
     destroy() {
         super.destroy();
     }
 
 
     /**
      * @function TraceAnalystService.prototype.processAsync
      * @description 负责将客户端的查询参数传递到服务端。
      * @param {TraceAnalystParameters} params - 上游/下游追踪分析参数类。
      */
     processAsync(params, callback) {
         if (!(params instanceof TraceAnalystParameters)) {
             return;
         }
         var me = this,
             jsonObject;
         //URL 通过参数类型来判断是 上游 还是下游 追踪分析
         if (params.traceType === 0) {
             me.url = Util.urlPathAppend(me.url, 'traceup');
         } else if (params.traceType === 1) {
             me.url = Util.urlPathAppend(me.url, 'tracedown');
         } else {
             return;
         }
 
         jsonObject = {
            weightName: params.weightName,
            isUncertainDirectionValid: params.isUncertainDirectionValid,
            returnFeatures: params.returnFeatures
         };
 
         if (params.edgeID !== null && params.nodeID !== null) {
             return;
         }
         if (params.edgeID === null && params.nodeID === null) {
             return;
         }
         if (params.edgeID !== null) {
             jsonObject.edgeID = params.edgeID;
         } else {
             jsonObject.nodeID = params.nodeID;
         }
 
         return me.request({
             method: "GET",
             params: jsonObject,
             scope: me,
             success: callback,
             failure: callback
         });
     }

      /**
     * @function FindClosestFacilitiesService.prototype.toGeoJSONResult
     * @description 将含有 geometry 的数据转换为 GeoJSON 格式。
     * @param {Object} result - 服务器返回的结果对象。
     */
    toGeoJSONResult(result) {
      if (!result) {
        return null;
      }
      var geoJSONFormat = new GeoJSON();
      if (result.edgesFeatures) {
        result.edgesFeatures = geoJSONFormat.toGeoJSON(result.edgesFeatures);
      }
      if (result.nodesFeatures) {
        result.nodesFeatures = geoJSONFormat.toGeoJSON(result.nodesFeatures);
      }
      return result;
    }
 
 }
 