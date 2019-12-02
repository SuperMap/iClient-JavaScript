/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {SuperMap} from '../SuperMap';
 import {Util} from '../commontypes/Util';
 import {IPortalServiceBase} from './iPortalServiceBase';
 
 /**
  * @class SuperMap.iPortalScene
  * @classdesc iPortal 场景服务类。
  * @category iPortal/Online
  * @param {string} sceneUrl - 场景地址。
  * @param {Object} [params] - 服务参数。
  * @extends {SuperMap.iPortalServiceBase}
  *
  */
 export class IPortalScene extends IPortalServiceBase {
 
 
     constructor(sceneUrl, params) {
         super(sceneUrl);
         params = params || {};
         this.authorizeSetting = [];
         this.content = null;
         this.createTime = 0;
         this.description = "";
         this.id = 0;
         this.layers = [];
         this.name  = "";
         this.nickname = "";
         this.tags = [];
         this.thumbnail = "";
         this.title = "";
         this.updateTime = 0;
         this.url = "";
         this.userName = "";
         this.visitCount = 0;
         Util.extend(this, params);
         this.sceneUrl = sceneUrl;
         // if (this.id) {
         //     this.sceneUrl = sceneUrl + "/" + this.id;
         // }
     }
 
     /**
      * @function SuperMap.iPortalScene.prototype.load
      * @description 加载场景信息。
      * @returns {Promise} 返回 Promise 对象。如果成功，Promise 没有返回值，请求返回结果自动填充到该类的属性中；如果失败，Promise 返回值包含错误信息。
      */
     load() {
         var me = this;
         return me.request("GET", me.sceneUrl + ".json")
             .then(function (sceneInfo) {
                 if (sceneInfo.error) {
                     return sceneInfo;
                 }
                 for (var key in sceneInfo) {
                     me[key] = sceneInfo[key];
                 }
             });
     }
 
     /**
      * @function SuperMap.iPortalScene.prototype.update
      * @description 更新场景参数。
      * @returns {Promise} 返回包含更新操作状态的 Promise 对象。
      */
     update() {
         var sceneUpdateParam = {
             authorizeSetting: this.authorizeSetting,
             name:this.name,
             tags:this.tags,
             description: this.description,
             thumbnail:this.thumbnail
         };
         var options = {
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         };
         return this.request("PUT", this.sceneUrl, JSON.stringify(sceneUpdateParam), options);
     }
 
 }
 
 SuperMap.iPortalScene = IPortalScene;
 
 