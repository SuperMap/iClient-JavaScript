/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class EditFeatureAttachmentsParameters
 * @deprecatedclass SuperMap.EditFeatureAttachmentParameters
 * @category iServer Data Feature
 * @classdesc 附件添加、查看参数类。
 * @param {Object} options - 参数。
 * @param {Object} options.feature - 当前需要关联附件的要素。
 * @param {File} options.file - 添加要素内容。
 * @usage
 */
export class EditFeatureAttachmentsParameters {


    constructor(options) {
        /**
         * @member {string} EditFeatureAttachmentsParameters.prototype.dataSourceName
         * @description 当前需要创建或者是查看的要素的数据源。
         */
        this.dataSourceName = null;

        /**
         * @member {string} EditFeatureAttachmentsParameters.prototype.dataSetName
         * @description 当前需要创建或者是查看的要素的数据集。
         */
        this.dataSetName = null;

        /**
         * @member {Object} EditFeatureAttachmentsParameters.prototype.feature
         * @description 当前需要创建或者是查看的要素。
         */
        this.feature = null;

        /**
          * @member {string} EditFeatureAttachmentsParameters.prototype.file
          * @description 当前要素需要关联的附件。
          */
        this.file = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.EditFeatureAttachmentsParameters";
    }


    /**
     * @function EditFeatureAttachmentsParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.dataSourceName = null;
        me.dataSetName = null;
        me.feature = null;
        me.file = null;
    }

}
