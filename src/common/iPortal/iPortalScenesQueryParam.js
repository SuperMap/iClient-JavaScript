/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {SuperMap} from '../SuperMap';
 import {Util} from '../commontypes/Util';
 
 /**
  * @class SuperMap.iPortalScenesQueryParam
  * @classdesc iPortal 地图资源查询参数。
  * @category iPortal/Online
  * @param {Object} params - iPortal 地图资源查询具体参数。
  *
  */
 export class IPortalScenesQueryParam {
 
     constructor(params) {
         params = params || {};
         this.tags = null;
         this.userNames = null;
         this.orderBy = null;
         this.orderType = null;
         this.keywords = null;
         this.currentPage = null;
         this.pageSize = null;
         this.dirIds = null;
         this.isNotInDir = false;
         this.filterFields = null;
         this.createStart = null;
         this.createEnd = null;
         Util.extend(this, params);
     }
 
 }
 
 SuperMap.iPortalScenesQueryParam = IPortalScenesQueryParam;
 
 