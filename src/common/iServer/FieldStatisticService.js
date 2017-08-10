import SuperMap from '../SuperMap';
import {StatisticMode} from '../REST';
import CommonServiceBase from './CommonServiceBase';
import FieldStatisticsParameters from './FieldStatisticsParameters';

/**
 * @class SuperMap.FieldStatisticService
 * @classdesc 字段查询统计服务类。用来完成对指定数据集指定字段的查询统计分析，即求平均值，最大值等。
 * @extends SuperMap.CommonServiceBase
 * @param url - {String} 服务的访问地址。如访问World Map服务，只需将url设为:http://localhost:8090/iserver/services/data-world/rest/data 即可。
 * @param options - {Object} 参数。
 * eventListeners - {Object} 需要被注册的监听器对象。</br>
 * datasource - {String} 数据集所在的数据源名称。</br>
 * dataset - {String} 数据集名称。</br>
 * field - {String} 查询统计的目标字段名称。</br>
 * statisticMode - {StatisticMode} 字段查询统计的方法类型。</br>
 * @example
 * (start code)
 * var myService = new SuperMap.FieldStatisticService(url, {eventListeners: {
     *     "processCompleted": fieldStatisticCompleted,
     *     "processFailed": fieldStatisticError
     *     }，
     *     datasource: "World",
     *     dataset: "Countries",
     *     field: "SmID",
     *     statisticMode: StatisticMode.AVERAGE
     * };
 * (end)
 */


export default  class FieldStatisticService extends CommonServiceBase {

    /**
     * @member SuperMap.FieldStatisticService.prototype.datasource -{String}
     * @description 数据集所在的数据源名称。
     */
    datasource = null;


    /**
     * @member SuperMap.FieldStatisticService.prototype.dataset -{String}
     * @description 数据集名称。
     */
    dataset = null;

    /**
     * @member SuperMap.FieldStatisticService.prototype.field -{String}
     * @description 查询统计的目标字段名称。
     */
    field = null;

    /**
     * @member SuperMap.FieldStatisticService.prototype.statisticMode -{String}
     * @description 字段查询统计的方法类型。
     */
    statisticMode = null;

    /*
     * @function SuperMap.FieldStatisticService.prototype.constructor
     * @param url - {string}
     * @param options - {Object} 参数。
     */

    constructor(url, options) {
        super(url, options);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }


    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
        var me = this;
        me.datasource = null;
        me.dataset = null;
        me.field = null;
        me.statisticMode = null;
    }


    /**
     * @function SuperMap.FieldStatisticService.prototype.processAsync
     * @description 执行服务，进行指定字段的查询统计。
     */
    processAsync() {
        var me = this,
            end = me.url.substr(me.url.length - 1, 1),
            fieldStatisticURL = "datasources/" + me.datasource + "/datasets/" + me.dataset + "/fields/" + me.field + "/" + me.statisticMode;
        if (me.isInTheSameDomain) {
            me.url += (end == "/") ? fieldStatisticURL + ".json?" : "/" + fieldStatisticURL + ".json?";
        } else {
            me.url += (end == "/") ? fieldStatisticURL + ".jsonp?" : "/" + fieldStatisticURL + ".jsonp?";
        }

        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }


    CLASS_NAME = "SuperMap.FieldStatisticService"
}

SuperMap.FieldStatisticService = FieldStatisticService;