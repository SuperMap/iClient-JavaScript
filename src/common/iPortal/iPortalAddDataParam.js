/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {Util} from '../commontypes/Util';

 /**
  * @class IPortalAddDataParam
 * @deprecatedclass SuperMap.iPortalAddDataParam
  * @classdesc iPortal 上传/注册数据所需的参数。
  * @version 10.0.1
  * @category iPortal/Online
  * @param {Object} params - iPortal 上传/注册数据所需的具体参数。
  * @param {string} params.fileName - 文件名称
  * @param {DataItemType} params.type - 数据类型。
  * @param {Array} [params.tags] - 数据的标签
  * @param {IPortalDataMetaInfoParam} [params.dataMetaInfo] - 数据元信息
  * @usage
  */
 export class IPortalAddDataParam {

     constructor(params) {
        params = params || {};
        this.fileName = "";
        this.type = "";
        this.tags = [];
        this.dataMetaInfo = {};
        Util.extend(this, params);
     }
 }

