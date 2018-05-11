import {SuperMap} from '../SuperMap';
import {CommonServiceBase} from './CommonServiceBase';
import {Util} from '../commontypes/Util';
import './FieldStatisticsParameters';

/**
 * @class SuperMap.FieldStatisticService
 * @category iServer Data Field
 * @classdesc 字段查询统计服务类。用来完成对指定数据集指定字段的查询统计分析，即求平均值，最大值等。
 * @extends {SuperMap.CommonServiceBase}
 * @param {string} url - 服务的访问地址。如访问World Map服务，只需将url设为：http://localhost:8090/iserver/services/data-world/rest/data 即可。
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 * @param {SuperMap.ServerType} options.serverType - 服务器类型，iServer|iPortal|Online。<br>
 * @param {SuperMap.DataFormat} options.format - 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
 * @param {string} options.datasource - 数据集所在的数据源名称。</br>
 * @param {string} options.dataset - 数据集名称。</br>
 * @param {string} options.field - 查询统计的目标字段名称。</br>
 * @param {SuperMap.StatisticMode} options.statisticMode - 字段查询统计的方法类型。</br>
 * @example
 * var myService = new SuperMap.FieldStatisticService(url, {eventListeners: {
 *     "processCompleted": fieldStatisticCompleted,
 *     "processFailed": fieldStatisticError
 *     }，
 *     datasource: "World",
 *     dataset: "Countries",
 *     field: "SmID",
 *     statisticMode: StatisticMode.AVERAGE
 * };
 */


export class FieldStatisticService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {string} SuperMap.FieldStatisticService.prototype.datasource
         * @description 数据集所在的数据源名称。
         */
        this.datasource = null;


        /**
         * @member {string} SuperMap.FieldStatisticService.prototype.dataset
         * @description 数据集名称。
         */
        this.dataset = null;

        /**
         * @member {string} SuperMap.FieldStatisticService.prototype.field
         * @description 查询统计的目标字段名称。
         */
        this.field = null;

        /**
         * @member {SuperMap.StatisticMode} SuperMap.FieldStatisticService.prototype.statisticMode
         * @description 字段查询统计的方法类型。
         */
        this.statisticMode = null;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.FieldStatisticService";
    }


    /**
     * @function SuperMap.FieldStatisticService.prototype.destroy
     * @override
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
        me.url += (end == "/") ? fieldStatisticURL + ".json?" : "/" + fieldStatisticURL + ".json?";

        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}

SuperMap.FieldStatisticService = FieldStatisticService;