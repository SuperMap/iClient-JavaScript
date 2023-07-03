/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import {GetGridCellInfosParameters} from './GetGridCellInfosParameters';

/**
 * @class GetGridCellInfosService
 * @deprecatedclass SuperMap.GetGridCellInfosService
 * @category iServer Data Grid
 * @classdesc 数据栅格查询服务，支持查询指定地理位置的栅格信息。
 * @param {string} url - 服务地址。例如: http://localhost:8090/iserver/services/data-jingjin/rest/data
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {CommonServiceBase}
 * @example
 * var myService = new GetGridCellInfosService(url, {eventListeners: {
 *     "processCompleted": queryCompleted,
 *     "processFailed": queryError
 *     }
 * });
 * @usage
 */
export class GetGridCellInfosService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {string} GetGridCellInfosService.prototype.datasetName
         * @description 数据集名称。
         */
        this.datasetName = null;

        /**
         * @member {string} GetGridCellInfosService.prototype.dataSourceName
         * @description 数据源名称。
         */
        this.dataSourceName = null;

        /**
         * @member {string} GetGridCellInfosService.prototype.datasetType
         * @description 数据集类型。
         */
        this.datasetType = null;

        /**
         * @member {number} GetGridCellInfosService.prototype.X
         * @description 要查询的地理位置X轴
         */
        this.X = null;

        /**
         * @member {number} GetGridCellInfosService.prototype.Y
         * @description 要查询的地理位置Y轴
         */
        this.Y = null;
        if (options) {
            Util.extend(this, options);
        }
        this.eventCount = 0;
        this.CLASS_NAME = "SuperMap.GetGridCellInfosService";
    }

    /**
     * @function GetGridCellInfosService.prototype.destroy
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
     * @function GetGridCellInfosService.prototype.processAsync
     * @description 执行服务，查询数据集信息。
     * @param {GetGridCellInfosParameters} params - 查询参数。
     */
    processAsync(params, callback) {
        if (!(params instanceof GetGridCellInfosParameters)) {
            return;
        }
        Util.extend(this, params);
        var me = this;
        me.url = Util.urlPathAppend(me.url,`datasources/${me.dataSourceName}/datasets/${me.datasetName}`);
        me.queryRequest(me.getDatasetInfoCompleted.bind(me), me.getDatasetInfoFailed.bind(me), callback);
    }

    /**
     * @function GetGridCellInfosService.prototype.queryRequest
     * @description 执行服务，查询。
     * @callback {function} successFun - 成功后执行的函数。
     * @callback {function} failedFunc - 失败后执行的函数。
     */
    queryRequest(successFun, failedFunc, callback) {
      let eventId = ++this.eventCount;
        let eventListeners = {
          scope: this,
          processCompleted: function(result) {
            if (eventId === result.result.eventId && callback) {
              delete result.result.eventId;
              callback(result);
            }
          },
          processFailed: function(result) {
            if ((eventId === result.error.eventId || eventId === result.eventId) && callback) {
              callback(result);
            }
          }
        }
        this.events.on(eventListeners);

        var me = this;
        me.request({
            method: "GET",
            data: null,
            scope: me,
            success(result, options) {
              result.eventId = eventId;
              successFun(result, options, callback);
            },
            failure(result, options) {
              if (result.error) {
                result.error.eventId = eventId;
              }
              result.eventId = eventId;
              failedFunc(result, options);
            }
        });
    }

    /**
     * @function GetGridCellInfosService.prototype.getDatasetInfoCompleted
     * @description 数据集查询完成，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */
    getDatasetInfoCompleted(result, options, callback) {
        var me = this;
        result = Util.transformResult(result);
        me.datasetType = result.datasetInfo.type;
        me.queryGridInfos(callback);
    }

    /**
     * @function GetGridCellInfosService.prototype.queryGridInfos
     * @description 执行服务，查询数据集栅格信息。
     */
    queryGridInfos(callback) {
        var me = this;
        me.url = Util.urlPathAppend(me.url, me.datasetType == 'GRID' ? 'gridValue' : 'imageValue');
        if (me.X != null && me.Y != null) {
            me.url = Util.urlAppend(me.url, `x=${me.X}&y=${me.Y}`);
        }
        me.queryRequest(me.serviceProcessCompleted.bind(me), me.serviceProcessFailed.bind(me), callback);
    }


    /**
     * @function GetGridCellInfosService.prototype.getDatasetInfoFailed
     * @description 数据集查询失败，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */
    getDatasetInfoFailed(result, options) {
        var me = this;
        me.serviceProcessFailed(result, options);
    }
}
