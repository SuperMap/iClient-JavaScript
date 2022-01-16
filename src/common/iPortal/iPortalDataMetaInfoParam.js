/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {Util} from '../commontypes/Util';

 /**
  * @class IPortalDataMetaInfoParam
  * @aliasclass iPortalDataMetaInfoParam
  * @deprecatedclass SuperMap.iPortalDataMetaInfoParam
  * @classdesc iPortal 上传数据/注册数据元信息所需的参数。
  * @version 10.0.1
  * @category iPortal/Online
  * @param {Object} params - 参数。
  * @param {string} params.xField - X 坐标字段
  * @param {string} params.yField - Y 坐标字段
  * @param {number} params.xIndex - x所在列（关系型存储下CSV或EXCEL数据时必填）
  * @param {number} params.yIndex - y所在列（关系型存储下CSV或EXCEL数据时必填）
  * @param {Array.<string>} [params.fieldTypes] - 设置字段类型（关系型存储下CSV或EXCEL数据时可选填）。默认类型为：WTEXT。该参数按照CSV文件字段顺序从左到右依次设置，其中默认字段类型可省略不设置。例如，CSV文件中有10个字段，如果只需设定第1，2，4个字段，可设置为['a','b',,'c']。
  * @param {string} params.separator - 分隔符（关系型存储下CSV数据时必填）
  * @param {boolean} params.firstRowIsHead - 是否带表头（关系型存储下CSV数据时必填）
  * @param {boolean} params.url - HDFS注册目录地址
  * @param {IPortalDataStoreInfoParam} params.dataStoreInfo - 注册数据时的数据存储信息
  * @usage
  */
 export class IPortalDataMetaInfoParam {

     constructor(params) {
        params = params || {};
        this.xField = "";
        this.yField = "";
        this.fileEncoding = "UTF-8";

        this.xIndex = 1;
        this.yIndex = 1;
        this.fieldTypes = [];
        this.separator = "";
        this.firstRowIsHead = true;

        this.url = "";
        this.dataStoreInfo = {};
        Util.extend(this, params);
     }
 }

