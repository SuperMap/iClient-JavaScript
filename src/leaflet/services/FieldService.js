/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import { FieldService as CommonFieldService } from '@supermap/iclient-common/iServer/FieldService';

/**
 * @class  FieldService
 * @deprecatedclassinstance L.supermap.fieldService
 * @classdesc 字段服务类。
 * @category iServer Data Field
 * @extends {ServiceBase}
 * @example
 *   new FieldService(url).getFields(function(result){
 *     //doSomething
 *   });
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export var FieldService = ServiceBase.extend({

    initialize: function (url,options) {
        ServiceBase.prototype.initialize.call(this, url,options);
        this._fieldService = new CommonFieldService(url, options);
    },

    /**
     * @function FieldService.prototype.getFields
     * @description 字段查询服务。
     * @param {FieldParameters} params - 字段信息查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    getFields: function (params, callback) {
      this._fieldService.getFields(params, callback);
    },

    /**
     * @function FieldService.prototype.getFieldStatisticsInfo
     * @description 字段统计服务。
     * @param {FieldStatisticsParameters} params - 字段统计信息查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    getFieldStatisticsInfo: function (params, callback) {
      this._fieldService.getFieldStatisticsInfo(params, callback);
    }
});
export var fieldService = function (url, options) {
    return new FieldService(url, options);
};
