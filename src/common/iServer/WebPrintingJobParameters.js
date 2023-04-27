/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { WebPrintingJobContent } from './WebPrintingJobContent';
import { WebPrintingJobLayoutOptions } from './WebPrintingJobLayoutOptions';
import { WebPrintingJobExportOptions } from './WebPrintingJobExportOptions';

/**
 * @class WebPrintingJobParameters
 * @deprecatedclass SuperMap.WebPrintingJobParameters
 * @category iServer WebPrintingJob
 * @version 10.1.0
 * @classdesc Web 打印参数类。
 * @param {Object} options - 参数。
 * @param {WebPrintingJobContent} options.content - Web 打印的内容类。
 * @param {WebPrintingJobLayoutOptions} options.layoutOptions - Web 打印的布局类，包含各种布局元素的设置。
 * @param {WebPrintingJobExportOptions} options.exportOptions - Web 打印的输出类，包含 DPI、页面大小等。
 * @usage
 */
export class WebPrintingJobParameters {
    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {WebPrintingJobContent} WebPrintingJobParameters.prototype.content
         * @description Web 打印的内容类。
         */
        this.content = null;

        /**
         * @member {WebPrintingJobLayoutOptions} WebPrintingJobParameters.prototype.layoutOptions
         * @description Web 打印的布局类，包含各种布局元素的设置。
         */
        this.layoutOptions = null;

        /**
         * @member {WebPrintingJobExportOptions} WebPrintingJobParameters.prototype.exportOptions
         * @description Web 打印的输出类，包含 DPI、页面大小等。
         */
        this.exportOptions = null;

        Util.extend(this, options);

        this.CLASS_NAME = 'SuperMap.WebPrintingJobParameters';
    }

    /**
     * @function WebPrintingJobParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        if (this.content instanceof WebPrintingJobContent) {
            this.content.destroy();
            this.content = null;
        }
        if (this.layoutOptions instanceof WebPrintingJobLayoutOptions) {
            this.layoutOptions.destroy();
            this.layoutOptions = null;
        }
        if (this.exportOptions instanceof WebPrintingJobExportOptions) {
            this.exportOptions.destroy();
            this.exportOptions = null;
        }
    }
}

