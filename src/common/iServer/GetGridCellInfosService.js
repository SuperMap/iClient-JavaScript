/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import {GetGridCellInfosParameters} from './GetGridCellInfosParameters';

/**
 * @class SuperMap.GetGridCellInfosService
 * @category iServer Data Grid
 * @classdesc 数据栅格查询服务，支持查询指定地理位置的栅格信息。
 * @param {string} url - 查询服务地址。例如: http://localhost:8090/iserver/services/data-jingjin/rest/data
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务器类型，iServer|iPortal|Online。 
 * @param {SuperMap.DataFormat} [options.format=SuperMap.DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {SuperMap.CommonServiceBase}
 * @example
 * var myService = new SuperMap.GetGridCellInfosService(url, {eventListeners: {
 *     "processCompleted": queryCompleted,
 *     "processFailed": queryError
 *     }
 * });
 *
 */
export class GetGridCellInfosService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {string} SuperMap.GetGridCellInfosService.prototype.datasetName
         * @description 数据集名称。
         */
        this.datasetName = null;

        /**
         * @member {string} SuperMap.GetGridCellInfosService.prototype.dataSourceName
         * @description 数据源名称。
         */
        this.dataSourceName = null;

        /**
         * @member {string} SuperMap.GetGridCellInfosService.prototype.datasetType
         * @description 数据集类型。
         */
        this.datasetType = null;

        /**
         * @member {number} SuperMap.GetGridCellInfosService.prototype.X
         * @description 要查询的地理位置X轴
         */
        this.X = null;

        /**
         * @member {number} SuperMap.GetGridCellInfosService.prototype.Y
         * @description 要查询的地理位置Y轴
         */
        this.Y = null;
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.GetGridCellInfosService";
    }

    /**
     * @function SuperMap.GetGridCellInfosService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.X = null;
        me.Y = null;
        me.datasetName = null;
        me.dataSourceName = null;
        me.datasetType = null;
    }

    /**
     * @function SuperMap.GetGridCellInfosService.prototype.processAsync
     * @description 执行服务，查询数据集信息。
     * @param {SuperMap.GetGridCellInfosParameters} params - 查询参数。
     */
    processAsync(params) {
        if (!(params instanceof GetGridCellInfosParameters)) {
            return;
        }
        Util.extend(this, params);
        var me = this;
        var end = me.url.substr(me.url.length - 1, 1);
        me.url += (end == "/") ? ("datasources/" + me.dataSourceName + "/datasets/" + me.datasetName + ".json") :
            ("/datasources/" + me.dataSourceName + "/datasets/" + me.datasetName + ".json");

        me.queryRequest(me.getDatasetInfoCompleted, me.getDatasetInfoFailed);
    }

    /**
     * @function SuperMap.GetGridCellInfosService.prototype.queryRequest
     * @description 执行服务，查询。
     * @callback {function} successFun - 成功后执行的函数。
     * @callback {function} failedFunc - 失败后执行的函数。
     */
    queryRequest(successFun, failedFunc) {
        var me = this;
        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: successFun,
            failure: failedFunc
        });
    }

    /**
     * @function SuperMap.GetGridCellInfosService.prototype.getDatasetInfoCompleted
     * @description 数据集查询完成，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */
    getDatasetInfoCompleted(result) {
        var me = this;
        result = Util.transformResult(result);
        me.datasetType = result.datasetInfo.type;
        me.queryGridInfos();
    }

    /**
     * @function SuperMap.GetGridCellInfosService.prototype.queryGridInfos
     * @description 执行服务，查询数据集栅格信息信息。
     */
    queryGridInfos() {
        var me = this,
            re = /\.json/,
            index = re.exec(me.url).index,
            urlBack = me.url.substring(index),
            urlFront = me.url.substring(0, me.url.length - urlBack.length);
        if (me.datasetType == "GRID") {
            me.url = urlFront + "/gridValue" + urlBack;
        } else {
            me.url = urlFront + "/imageValue" + urlBack;
        }

        if (me.X != null && me.Y != null) {
            me.url += '?x=' + me.X + '&y=' + me.Y;
        }
        me.queryRequest(me.serviceProcessCompleted, me.serviceProcessFailed);
    }


    /**
     * @function SuperMap.GetGridCellInfosService.prototype.getDatasetInfoFailed
     * @description 数据集查询失败，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */
    getDatasetInfoFailed(result) {
        var me = this;
        me.serviceProcessFailed(result);
    }
}

SuperMap.GetGridCellInfosService = GetGridCellInfosService;