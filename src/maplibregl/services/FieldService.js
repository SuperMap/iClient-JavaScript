/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ServiceBase} from './ServiceBase';
import { FieldService as CommonFieldService } from '@supermapgis/iclient-common/iServer/FieldService';

/**
 * @class FieldService
 * @category  iServer Data Field
 * @classdesc 字段服务类。
 * @version 11.1.0
 * @modulecategory Services
 * @example
 * new FieldService(url).getFields(function(result){
 *     //doSomething
 * });
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {ServiceBase}
 * @usage
 */
export class FieldService extends ServiceBase {
    constructor(url, options) {
        super(url, options);
        this._fieldService = new CommonFieldService(url, options);
    }

    /**
     * @function FieldService.prototype.getFields
     * @description 字段查询服务。
     * @param {FieldParameters} params - 字段信息查询参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getFields(params, callback) {
        return this._fieldService.getFields(params, callback);
    }

    /**
     * @function FieldService.prototype.getFieldStatisticsInfo
     * @description 字段统计服务。
     * @param {FieldStatisticsParameters} params - 字段统计信息查询参数类。
     * @param {RequestCallback} callback 回调函数。
     * @returns {Promise} Promise 对象。
     */
    getFieldStatisticsInfo(params, callback) {
        return this._fieldService.getFieldStatisticsInfo(params, callback);
    }
}
