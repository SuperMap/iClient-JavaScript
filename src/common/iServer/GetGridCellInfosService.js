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
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {CommonServiceBase}
 * @example
 * var myService = new GetGridCellInfosService(url);
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
         * @description 要查询的地理位置 X 坐标。
         */
        this.X = null;

        /**
         * @member {number} GetGridCellInfosService.prototype.Y
         * @description 要查询的地理位置 Y 坐标。
         */
        this.Y = null;
        if (options) {
            Util.extend(this, options);
        }
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
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(params, callback) {
        if (!(params instanceof GetGridCellInfosParameters)) {
            return;
        }
        Util.extend(this, params);
        var me = this;
        me.url = Util.urlPathAppend(me.url,`datasources/${me.dataSourceName}/datasets/${me.datasetName}`);
        return me.request({
          method: "GET",
          data: null,
          scope: me,
          success({result}) {
            callback && me.getDatasetInfoCompleted(result, callback);
          },
          failure: callback
        }).then(({result}) => {
          return me.getDatasetInfoCompleted(result);
        });
    }

    /**
     * @function GetGridCellInfosService.prototype.getDatasetInfoCompleted
     * @description 数据集查询完成，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getDatasetInfoCompleted(result, callback) {
        var me = this;
        result = Util.transformResult(result);
        me.datasetType = result.datasetInfo.type;
        return me.queryGridInfos(callback);
    }

    /**
     * @function GetGridCellInfosService.prototype.queryGridInfos
     * @description 执行服务，查询数据集栅格信息。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    queryGridInfos(callback) {
        var me = this;
        var url = Util.urlPathAppend(me.url, me.datasetType == 'GRID' ? 'gridValue' : 'imageValue');
        if (me.X != null && me.Y != null) {
            url = Util.urlAppend(url, `x=${me.X}&y=${me.Y}`);
        }
        return me.request({
          url,
          method: "GET",
          data: null,
          scope: me,
          success: callback,
          failure: callback
      });
    }
}
