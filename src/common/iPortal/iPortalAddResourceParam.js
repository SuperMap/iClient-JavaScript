/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {Util} from '../commontypes/Util';

 /**
  * @class IPortalAddResourceParam
  * @aliasclass iPortalAddResourceParam
  * @deprecatedclass SuperMap.iPortalAddResourceParam
  * @classdesc iPortal 添加资源参数。
  * @version 10.0.1
  * @category iPortal/Online Resources ResourcesShare
  * @param {Object} params - 可选参数。
  * @param {string} [params.rootUrl] - 服务地址。
  * @param {Array} [params.tags] - 标签。
  * @param {IPortalShareEntity} [params.entities] - 资源的实体共享参数
  * @usage
  */
 export class IPortalAddResourceParam {

     constructor(params) {
         params = params || {};
         this.rootUrl = "";
         this.tags = [];
         this.entities = [];
         Util.extend(this, params);
     }
 }

