/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {Util} from '../commontypes/Util';
 import {SpatialAnalystBase} from './SpatialAnalystBase';
//  import {ConvexHullAnalystParameters} from './ConvexHullAnalystParameters';
 
 /**
  * @class ConvexHullAnalystService
  * @deprecatedclass SuperMap.ConvexHullAnalystService
  * @category  iServer SpatialAnalyst ConvexHullAnalyst
  * @classdesc 凸包运算服务类
  * @version 11.1.1
  * @param {string} url - 服务地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst。
  * @param {Object} options - 参数。
  * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
  * @param {Object} [options.headers] - 请求头。
  * @extends {SpatialAnalystBase}
  * @usage
  */
 export class ConvexHullAnalystService extends SpatialAnalystBase {
 
     constructor(url, options) {
         super(url, options);

         if (options) {
             Util.extend(this, options);
         }
         this.CLASS_NAME = "SuperMap.ConvexHullAnalystService";
     }
 
     /**
      * @override
      */
     destroy() {
         super.destroy();
         this.mode = null;
     }
 
     /**
      * @function ConvexHullAnalystService.prototype.processAsync
      * @description 负责将客户端的查询参数传递到服务端。
      * @param {ConvexHullAnalystParameters} parameter - 凸包运算参数基类。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @returns {Promise} Promise 对象。
      */
     processAsync(parameter, callback) {
         var me = this;
         me.url = Util.urlPathAppend(me.url, 'geometry/3d/convexhull');
 
         var jsonParameters = Util.toJSON(parameter);
         me.url = Util.urlAppend(me.url, 'returnContent=true');
         return me.request({
             method: "POST",
             data: jsonParameters,
             scope: me,
             success: callback,
             failure: callback
         });
     }
 }
 