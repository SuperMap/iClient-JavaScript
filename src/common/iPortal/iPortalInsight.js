/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {SuperMap} from '../SuperMap';
 import {Util} from '../commontypes/Util';
 import {IPortalServiceBase} from './iPortalServiceBase';
 
 /**
  * @class SuperMap.iPortalInsight
  * @classdesc iPortal 洞察服务类。
  * @category iPortal/Online
  * @param {string} insightUrl - 洞察地址。
  * @param {Object} [params] - 服务参数。
  * @extends {SuperMap.iPortalServiceBase}
  *
  */
 export class IPortalInsight extends IPortalServiceBase {
 
 
     constructor(insightUrl, params) {
         super(insightUrl);
         params = params || {};
         this.authorizeSetting = [];
         this.name = "";
         this.checkStatus = "";
         this.createTime = 0;
         this.description = "";
         this.id = 0;
         this.nickname = "";
         this.tags = [];
         this.thumbnail = "";
         this.updateTime = 0;
         this.userName = "";
         this.visitCount = 0;
         Util.extend(this, params);
         this.insightUrl = insightUrl;
     }
 
     /**
      * @function SuperMap.iPortalInsight.prototype.load
      * @description 加载洞察信息。
      * @returns {Promise} 返回 Promise 对象。如果成功，Promise 没有返回值，请求返回结果自动填充到该类的属性中；如果失败，Promise 返回值包含错误信息。
      */
     load() {
         var me = this;
         return me.request("GET", me.insightUrl + ".json")
             .then(function (insightInfo) {
                 if (insightInfo.error) {
                     return insightInfo;
                 }
                 for (var key in insightInfo) {
                     me[key] = insightInfo[key];
                 }
             });
     }
 
     /**
      * @function SuperMap.iPortalInsight.prototype.update
      * @description 更新洞察参数。
      * @returns {Promise} 返回包含更新操作状态的 Promise 对象。
      */
     update() {
         var insightUpdateParam = {
            authorizeSetting: this.authorizeSetting,
            description: this.description,
            tags: this.tags,
            thumbnail: this.thumbnail,
            name:this.name
         };
         var options = {
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         };
         return this.request("PUT", this.insightUrl, JSON.stringify(insightUpdateParam), options);
     }
 
 }
 
 SuperMap.iPortalInsight = IPortalInsight;
 
 