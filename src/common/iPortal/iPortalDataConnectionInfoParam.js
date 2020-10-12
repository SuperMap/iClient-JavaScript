/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {SuperMap} from '../SuperMap';
 import {Util} from '../commontypes/Util';
  
 /**
  * @class SuperMap.iPortalDataConnectionInfoParam
  * @classdesc iPortal HBASE数据源连接信息类。
  * @version 10.0.1
  * @category iPortal/Online
  * @param {Object} params - iPortal HBASE数据源连接信息类具体参数。
  * @param {string} params.dataBase - 数据源连接的数据库名。
  * @param {string} params.server - 服务地址。
  */
 export class IPortalDataConnectionInfoParam {
 
     constructor(params) {
        params = params || {};
        this.dataBase = "";
        this.server = "";
        Util.extend(this, params);
     }
 }
 SuperMap.iPortalDataConnectionInfoParam = IPortalDataConnectionInfoParam;
  
  