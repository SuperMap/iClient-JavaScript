/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {CommonServiceBase} from './CommonServiceBase';
import {Util} from '../commontypes/Util';
import './FieldStatisticsParameters';

/**
 * @class FieldStatisticService
 * @deprecatedclass SuperMap.FieldStatisticService
 * @category iServer Data Field
 * @classdesc 字段查询统计服务类。用来完成对指定数据集指定字段的查询统计分析，即求平均值，最大值等。
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。如访问 World Map 服务，只需将 url 设为：http://localhost:8090/iserver/services/data-world/rest/data 即可。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 事件监听器对象。有 processCompleted 属性可传入处理完成后的回调函数。processFailed 属性传入处理失败后的回调函数。
 * @param {DataFormat} [options.format] - 查询结果返回格式，目前支持 iServerJSON 和GeoJSON 两种格式。参数格式为 "ISERVER","GEOJSON"。
 * @param {string} options.datasource - 数据集所在的数据源名称。
 * @param {string} options.dataset - 数据集名称。
 * @param {string} options.field - 查询统计的目标字段名称。
 * @param {StatisticMode} options.statisticMode - 字段查询统计的方法类型。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 * var myService = new FieldStatisticService(url, {eventListeners: {
 *     "processCompleted": fieldStatisticCompleted,
 *     "processFailed": fieldStatisticError
 *     }，
 *     datasource: "World",
 *     dataset: "Countries",
 *     field: "SmID",
 *     statisticMode: StatisticMode.AVERAGE
 * };
 * @usage
 */


export class FieldStatisticService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {string} FieldStatisticService.prototype.datasource
         * @description 数据集所在的数据源名称。
         */
        this.datasource = null;


        /**
         * @member {string} FieldStatisticService.prototype.dataset
         * @description 数据集名称。
         */
        this.dataset = null;

        /**
         * @member {string} FieldStatisticService.prototype.field
         * @description 查询统计的目标字段名称。
         */
        this.field = null;

        /**
         * @member {StatisticMode} FieldStatisticService.prototype.statisticMode
         * @description 字段查询统计的方法类型。
         */
        this.statisticMode = null;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.FieldStatisticService";
    }


    /**
     * @function FieldStatisticService.prototype.destroy
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
     * @function FieldStatisticService.prototype.processAsync
     * @description 执行服务，进行指定字段的查询统计。
     */
    processAsync() {
        var me = this,
            fieldStatisticURL = "datasources/" + me.datasource + "/datasets/" + me.dataset + "/fields/" + me.field + "/" + me.statisticMode;
        me.url = Util.urlPathAppend(me.url, fieldStatisticURL);

        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}
