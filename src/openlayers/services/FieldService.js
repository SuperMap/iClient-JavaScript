import ol from 'openlayers';
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import {GetFieldsService, FieldStatisticService} from '@supermap/iclient-common';

/**
 * @class ol.supermap.FieldService
 * @category  iServer Data Field
 * @classdesc 字段服务类
 * @example
 *      new ol.supermap.FieldService(url).getFields(function(result){
 *           //doSomething
 *      });
 * @param url - {string} 与客户端交互的服务地址。
 * @param options -{Object} 参数。
 * @extends ol.supermap.ServiceBase
 */
export class FieldService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.FieldService.prototype.getFields
     * @description 字段查询服务
     * @param params {SuperMap.FieldParameters} 字段信息查询参数类
     * @param callback - {function} 回调函数
     */
    getFields(params, callback) {
        var me = this;
        var getFieldsService = new GetFieldsService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            datasource: params.datasource,
            dataset: params.dataset
        });
        getFieldsService.processAsync();
    }

    /**
     * @function ol.supermap.FieldService.prototype.getFieldStatisticsInfo
     * @description 字段统计服务
     * @param params -{SuperMap.FieldStatisticsParameters} 查询所需参数类。
     * @param callback -{function} 回调函数
     */
    getFieldStatisticsInfo(params, callback) {
        var me = this,
            fieldName = params.fieldName,
            modes = params.statisticMode;
        if (modes && !Util.isArray(modes)) {
            modes = [modes];
        }
        me.currentStatisticResult = {fieldName: fieldName};
        me._statisticsCallback = callback;
        //针对每种统计方式分别进行请求
        for (var mode in modes) {
            me.currentStatisticResult[modes[mode]] = null;
            me._fieldStatisticRequest(params.datasource, params.dataset, fieldName, modes[mode]);
        }
    }

    _fieldStatisticRequest(datasource, dataset, fieldName, statisticMode) {
        var me = this;
        var statisticService = new FieldStatisticService(me.url, {
            eventListeners: {
                scope: me,
                processCompleted: me._processCompleted,
                processFailed: me._statisticsCallback
            },
            datasource: datasource,
            dataset: dataset,
            field: fieldName,
            statisticMode: statisticMode
        });
        statisticService.processAsync();
    }

    _processCompleted(fieldStatisticResult) {
        var me = this;
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
ol.supermap.FieldService = FieldService;