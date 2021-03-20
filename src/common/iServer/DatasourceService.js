/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';

/**
 * @class SuperMap.DatasourceService
 * @category iServer Data Datasource
 * @classdesc 数据源查询服务。
 * @param {string} url - 服务的访问地址。如访问World Data服务，只需将url设为：http://localhost:8090/iserver/services/data-world/rest/data 即可。
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。
 * @param {SuperMap.DataFormat} [options.format=SuperMap.DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {string}options.datasource - 要查询的数据集所在的数据源名称。</br>
 * @param {string}options.dataset - 要查询的数据集名称。</br>
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {SuperMap.CommonServiceBase}
 */

export class DatasourceService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.DatasourceService";
    }


    /**
     * @function SuperMap.DatasourceService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }


    /**
     * @function SuperMap.DatasourceService.prototype.getDatasourceService
     * @description 执行服务，查询数据源信息。
     */
    getDatasourceService(datasourceName) {
        var me = this;
        me.url = Util.urlPathAppend(me.url,`datasources/name/${datasourceName}`);
        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function SuperMap.DatasourceService.prototype.getDatasourcesService
     * @description 执行服务，查询数据源信息。
     */
    getDatasourcesService() {
        var me = this;
        me.url = Util.urlPathAppend(me.url,`datasources`);
        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
    /**
     * @function SuperMap.DatasourceService.prototype.setDatasourceService
     * @description 执行服务，查询数据源信息。
     */
    setDatasourceService(params) {
        if (!params) {
            return;
        }
        var me = this;
        var jsonParamsStr = Util.toJSON(params);
        me.request({
            method: "PUT",
            data: jsonParamsStr,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
}

SuperMap.DatasourceService = DatasourceService;