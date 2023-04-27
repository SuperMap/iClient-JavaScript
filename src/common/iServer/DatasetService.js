/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';

/**
 * @class DatasetService
 * @deprecatedclass SuperMap.DatasetService
 * @category iServer Data Dataset
 * @classdesc 数据集查询服务。
 * @param {string} url - 服务的访问地址。如访问World Data服务，只需将url设为：http://localhost:8090/iserver/services/data-world/rest/data 即可。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {string}options.datasource - 数据源名称。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class DatasetService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        if(!options){
            return;
        }
        /**
         * @member {string} DatasetService.prototype.datasource
         * @description 要查询的数据集所在的数据源名称。
         */
        this.datasource = null;

        /**
         *  @member {string} DatasetService.prototype.dataset
         *  @description 要查询的数据集名称。
         */
        this.dataset = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.DatasetService";
    }

    /**
     * @function DatasetService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.datasource = null;
        me.dataset = null;
    }

    /**
     * @function DatasetService.prototype.getDatasetsService
     * @description 执行服务，查询数据集服务。
     */
    getDatasetsService(params) {
        var me = this;
        me.url = Util.urlPathAppend(me.url,`datasources/name/${params}/datasets`);
        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function DatasetService.prototype.getDatasetService
     * @description 执行服务，查询数据集信息服务。
     */
    getDatasetService(datasourceName, datasetName) {
        var me = this;
        me.url = Util.urlPathAppend(me.url,`datasources/name/${datasourceName}/datasets/name/${datasetName}`);
        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function DatasetService.prototype.setDatasetService
     * @description 执行服务，更改数据集信息服务。
     */
    setDatasetService(params) {
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

     /**
     * @function DatasetService.prototype.deleteDatasetService
     * @description 执行服务，删除数据集信息服务。
     */
    deleteDatasetService() {
        var me = this;
        me.request({
            method: "DELETE",
            data: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}
