/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';

/**
 * @class SuperMap.GetFieldsService
 * @category iServer Data Field
 * @classdesc 字段查询服务，支持查询指定数据集的中所有属性字段（field）的集合。
 * @param {string} url - 服务的访问地址。如访问World Map服务，只需将url设为：http://localhost:8090/iserver/services/data-world/rest/data 即可。
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。
 * @param {SuperMap.ServerType} options.serverType - 服务器类型，iServer|iPortal|Online。
 * @param {SuperMap.DataFormat} options.format - 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
 * @param {string}options.datasource - 要查询的数据集所在的数据源名称。</br>
 * @param {string}options.dataset - 要查询的数据集名称。</br>
 * @extends {SuperMap.CommonServiceBase}
 * @example
 * var myService = new SuperMap.GetFieldsService(url, {eventListeners: {
 *     "processCompleted": getFieldsCompleted,
 *     "processFailed": getFieldsError
 *     },
 *     datasource: "World",
 *     dataset: "Countries"
 * };
 *
 */
export class GetFieldsService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {string} SuperMap.GetFieldsService.prototype.datasource
         * @description 要查询的数据集所在的数据源名称。
         */
        this.datasource = null;

        /**
         *  @member {string} SuperMap.GetFieldsService.prototype.dataset
         *  @description 要查询的数据集名称。
         */
        this.dataset = null;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.GetFieldsService";
    }


    /**
     * @function SuperMap.GetFieldsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.datasource = null;
        me.dataset = null;
    }


    /**
     * @function SuperMap.GetFieldsService.prototype.processAsync
     * @description 执行服务，查询指定数据集的字段信息。
     */
    processAsync() {
        var me = this,
            end = me.url.substr(me.url.length - 1, 1),
            datasetURL = "datasources/" + me.datasource + "/datasets/" + me.dataset;
        me.url += (end == "/") ? datasetURL + "/fields.json?" : "/" + datasetURL + "/fields.json?";

        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
}

SuperMap.GetFieldsService = GetFieldsService;