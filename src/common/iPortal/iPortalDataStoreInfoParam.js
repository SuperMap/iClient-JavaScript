/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {SuperMap} from '../SuperMap';
 import {Util} from '../commontypes/Util';
  
 /**
  * @class SuperMap.iPortalDataStoreInfoParam
  * @classdesc iPortal 注册一个HBASE HDFS数据存储类。
  * @version 10.0.1
  * @category iPortal/Online
  * @param {Object} params - iPortal 注册一个HBASE HDFS数据存储类具体参数。
  * @param {string} params.type - 大数据文件共享类型和空间数据库类型，包括大数据文件共享HDFS 目录(HDFS)和空间数据库HBASE
  * @param {string} params.url - HDFS数据存储目录地址
  * @param {SuperMap.iPortalDataConnectionInfoParam} [params.connectionInfo] - HBASE空间数据库服务的连接信息
  */
 export class IPortalDataStoreInfoParam {
 
     constructor(params) {
        params = params || {};
        this.type = "";
        this.url = "";
        this.connectionInfo = {};
        Util.extend(this, params);
     }
 }
 SuperMap.iPortalDataStoreInfoParam = IPortalDataStoreInfoParam;
  
  