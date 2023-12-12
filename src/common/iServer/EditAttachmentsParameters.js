/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import { Util } from '../commontypes/Util';
 import { AttachmentsParameters } from './AttachmentsParameters'
 import { EditType } from '../REST';
 /**
  * @class EditAttachmentsParameters
  * @deprecatedclass SuperMap.EditAttachmentsParameters
  * @category iServer Data Feature
  * @classdesc 附件添加、删除参数类。
  * @extends {AttachmentsParameters}
  * @version 11.2.0
  * @param {Object} options - 参数。
  * @param {string} options.dataSourceName - 数据源名称。
  * @param {string} options.datasetName - 数据集名称。
  * @param {string|number} options.featureId - 当前添加、删除附件的要素 ID。
  * @param {File|Blob} [options.file] - 要添加的附件。附件类型可以是图片、文档、视频等任何格式的文件。当EditType类型为ADD时，file是必填参数。
  * @param {Array.<string|number>} [options.IDs] - 附件ID集合。当EditType类型为DELETE时, IDs是必填参数。
  * @param {EditType} [options.editType = EditType.ADD] - 附件操作类型。ADD表示添加附件，DELETE表示删除附件。
  * @usage
  */
 export class EditAttachmentsParameters extends AttachmentsParameters {
 
 
     constructor(options) {
         super(options);
         /**
           * @member {File|Blob} [EditAttachmentsParameters.prototype.file]
           * @description 要添加的附件。附件类型可以是图片、文档、视频等任何格式的文件。当EditType类型为ADD时，file是必填参数。
           */
         this.file = null;

         /**
           * @member {Array.<string|number>} [EditAttachmentsParameters.prototype.IDs]
           * @description 附件ID集合。当EditType类型为DELETE时, IDs是必填参数。
           */
         this.IDs = null;
 
         /**
           * @member {EditType} [EditAttachmentsParameters.prototype.EditType = EditType.ADD]
           * @description 附件操作类型。ADD表示添加附件，DELETE表示删除附件。
           */
         this.editType = EditType.ADD;
         Util.extend(this, options);
 
         this.CLASS_NAME = "SuperMap.EditAttachmentsParameters";
     }
 
 
     /**
      * @function EditAttachmentsParameters.prototype.destroy
      * @description 释放资源，将引用资源的属性置空。
      */
     destroy() {
         var me = this;
         me.dataSourceName = null;
         me.dataSetName = null;
         me.featureId = null;
         me.file = null;
         me.IDs = null;
         me.editType = null;
     }
 
 }
 