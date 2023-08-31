/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { GetFieldsService } from './GetFieldsService';
import { FieldStatisticService } from './FieldStatisticService';
import { FieldStatisticsParameters } from './FieldStatisticsParameters';

/**
 * @class FieldService
 * @category  iServer Data Field
 * @classdesc 字段服务类。
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
export class FieldService {
    constructor(url, options) {
      this.url = url;
      this.options = options || {};
    }

    /**
     * @function FieldService.prototype.getFields
     * @description 字段查询服务。
     * @param {FieldParameters} params - 字段信息查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getFields(params, callback) {
        var me = this;
        var getFieldsService = new GetFieldsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            datasource: params.datasource,
            dataset: params.dataset
        });
        return getFieldsService.processAsync(callback);
    }

    /**
     * @function FieldService.prototype.getFieldStatisticsInfo
     * @description 字段统计服务。
     * @param {FieldStatisticsParameters} params - 字段统计信息查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     */
    getFieldStatisticsInfo(params, callback) {
      if (!(params instanceof FieldStatisticsParameters)) {
        return;
      }
        var me = this,
            fieldName = params.fieldName,
            modes = params.statisticMode;
        if (modes && !Array.isArray(modes)) {
          modes = [modes];
        }
        me.currentStatisticResult = {fieldName: fieldName};
        me._statisticsCallback = callback;
        //针对每种统计方式分别进行请求
        modes.forEach(mode => {
            me.currentStatisticResult[mode] = null;
            me._fieldStatisticRequest(params.datasource, params.dataset, fieldName, mode);
        })
    }

    _fieldStatisticRequest(datasource, dataset, fieldName, statisticMode) {
        var me = this;
        var statisticService = new FieldStatisticService(me.url, {
            datasource: datasource,
            dataset: dataset,
            field: fieldName,
            statisticMode: statisticMode,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers
        });
        statisticService.processAsync(me._processCompleted.bind(me));
    }

    _processCompleted(fieldStatisticResult) {
        var me = this;
        if (fieldStatisticResult.error) {
          me._statisticsCallback(fieldStatisticResult);
          return;
        }
        var getAll = true,
            result = fieldStatisticResult.result;
        if (this.currentStatisticResult) {
            if (null == me.currentStatisticResult[result.mode]) {
                this.currentStatisticResult[result.mode] = result.result;
            }
        }
        for (var mode in me.currentStatisticResult) {
            if (null == me.currentStatisticResult[mode]) {
                getAll = false;
                break;
            }
        }
        if (getAll) {
            me._statisticsCallback({result: me.currentStatisticResult});
        }
    }
}
