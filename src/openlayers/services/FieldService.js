import ol from 'openlayers/dist/ol-debug';
import Util from '../core/Util';
import ServiceBase from './ServiceBase';
import GetFieldsService from '../../common/iServer/GetFieldsService';
import FieldStatisticService from '../../common/iServer/FieldStatisticService';
/**
 * @class ol.supermap.FieldService
 * @constructs ol.supermap.FieldService
 * @classdesc
 * 字段服务类
 * @example 用法：
 *      new ol.supermap.FieldService(url).getFields(function(result){
 *           //doSomething
 *      });
 * @api
 */
export default class FieldService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
        this.options.dataSourceName = options.dataSourceName;
        this.options.dataSetName = options.dataSetName;
    }

    /**
     * @method ol.supermap.FieldService.prototype.getFields
     * @description 字段查询服务
     * @param callback
     */
    getFields(callback) {
        var me = this;
        var getFieldsService = new GetFieldsService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            datasource: me.options.dataSourceName,
            dataset: me.options.dataSetName
        });
        getFieldsService.processAsync();
        return me;
    }

    /**
     * @method ol.supermap.FieldService.prototype.getFieldStatisticsInfo
     * @description 字段统计服务
     * @param params {SuperMap.FieldStatisticsParameters}
     * @param callback
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
            me._fieldStatisticRequest(fieldName, modes[mode]);
        }
        return me;
    }

    _fieldStatisticRequest(fieldName, statisticMode) {
        var me = this;
        var statisticService = new FieldStatisticService(me.url, {
            eventListeners: {
                scope: me,
                processCompleted: me._processCompleted,
                processFailed: me._statisticsCallback
            },
            datasource: me.options.dataSourceName,
            dataset: me.options.dataSetName,
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