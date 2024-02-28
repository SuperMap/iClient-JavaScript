/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import { Util } from '../commontypes/Util';

 /**
  * @class AttachmentsParameters
  * @deprecatedclass SuperMap.AttachmentsParameters
  * @category iServer Data Feature
  * @classdesc 附件查询参数类。
  * @version 11.2.0
  * @param {Object} options - 参数。
  * @param {string} options.dataSourceName - 数据源名称。
  * @param {string} options.datasetName - 数据集名称。
  * @param {string|number} options.featureId - 当前查询附件的要素 ID。
  * @usage
  */
 export class AttachmentsParameters {
 
 
     constructor(options) {
         /**
          * @member {string} AttachmentsParameters.prototype.dataSourceName
          * @description 数据源名称。
          */
         this.dataSourceName = null;
 
         /**
          * @member {string} AttachmentsParameters.prototype.dataSetName
          * @description 数据集名称。
          */
         this.dataSetName = null;
 
         /**
          * @member {string|number} AttachmentsParameters.prototype.featureId
          * @description 当前查询附件的要素 ID。
          */
         this.featureId = null;
         Util.extend(this, options);
 
         this.CLASS_NAME = "SuperMap.AttachmentsParameters";
     }
 
 
     /**
      * @function AttachmentsParameters.prototype.destroy
      * @description 释放资源，将引用资源的属性置空。
      */
     destroy() {
         var me = this;
         me.dataSourceName = null;
         me.dataSetName = null;
         me.featureId = null;
     }
 
 }
 