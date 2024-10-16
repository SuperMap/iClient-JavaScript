/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reservceTypeed.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import {GeoJSON} from '../format/GeoJSON';
import { NetworkAnalystServiceBase } from './NetworkAnalystServiceBase';
import { ConnectedEdgesAnalystParameters } from './ConnectedEdgesAnalystParameters';
 
 /**
  * @class ConnectedEdgesAnalystService
  * @deprecatedclass SuperMap.ConnectedEdgesAnalystService
  * @category iServer NetworkAnalyst UpstreamCirticalFaclilities
  * @classdesc 连通性分析服务类，查找与给定结点或者弧段相连通的弧段。
  * @version 11.1.1
  * @extends NetworkAnalystServiceBase
  * @param {string} url - 服务地址。请求网络分析服务，URL应为：
  *                       http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
  *                       例如: "http://localhost:8090/iserver/services/test/rest/networkanalyst/WaterNet@FacilityNet";
  * @param {Object} options - 参数。
  * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
  * @param {Object} [options.headers] - 请求头。
  * @usage
  */
 export class ConnectedEdgesAnalystService extends NetworkAnalystServiceBase {
 
     constructor(url, options) {
         super(url, options);
         this.CLASS_NAME = "SuperMap.ConnectedEdgesAnalystService";
     }

 
     /**
      * @function ConnectedEdgesAnalystService.prototype.destroy
      * @override
      */
     destroy() {
         super.destroy();
     }
 
 
     /**
      * @function ConnectedEdgesAnalystService.prototype.processAsync
      * @description 负责将客户端的查询参数传递到服务端。
      * @param {ConnectedEdgesAnalystParameters} params - 上游/下游追踪分析参数类。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @returns {Promise} Promise 对象。
      */
     processAsync(params, callback) {
         if (!(params instanceof ConnectedEdgesAnalystParameters)) {
             return;
         }
         var me = this,
             jsonObject;
         me.url = Util.urlPathAppend(me.url, 'connectededges');
 
         jsonObject = {
            connected: params.connected,
            returnFeatures: params.returnFeatures
         };
         if (params.edgeIDs !== null && params.nodeIDs !== null) {
             return;
         }
         if (params.edgeIDs === null && params.nodeIDs === null) {
             return;
         }
         if (params.edgeIDs !== null) {
             jsonObject.edgeIDs = params.edgeIDs;
         } else {
             jsonObject.nodeIDs = params.nodeIDs;
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
 