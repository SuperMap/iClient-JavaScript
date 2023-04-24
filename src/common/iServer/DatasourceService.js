/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';

/**
 * @class DatasourceService
 * @deprecatedclass SuperMap.DatasourceService
 * @category iServer Data Datasource
 * @classdesc 数据源查询服务。
 * @param {string} url - 服务地址。如访问World Data服务，只需将url设为：http://localhost:8090/iserver/services/data-world/rest/data 即可。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {string} options.datasource - 要查询的数据集所在的数据源名称。
 * @param {string} options.dataset - 要查询的数据集名称。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {CommonServiceBase}
 * @usage
 */

export class DatasourceService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        if (options) {
            Util.extend(this, options);
        }
        this.eventCount = 0;
        this.CLASS_NAME = "SuperMap.DatasourceService";
    }


    /**
     * @function DatasourceService.prototype.destroy
     * @override
     */
    destroy() {
        this.eventCount = 0;
        super.destroy();
    }


    /**
     * @function DatasourceService.prototype.getDatasourceService
     * @description 获取指定数据源信息。
     */
    getDatasourceService(datasourceName, callback) {
        let url = Util.urlPathAppend(this.url,`datasources/name/${datasourceName}`);
        this.processAsync(url, "GET", callback);
    }

    /**
     * @function DatasourceService.prototype.getDatasourcesService
     * @description 获取所有数据源信息。
     */
    getDatasourcesService(callback) {
        let url = Util.urlPathAppend(this.url,`datasources`);
        this.processAsync(url, "GET", callback);
    }
    /**
     * @function DatasourceService.prototype.setDatasourceService
     * @description 更新数据源信息。
     */
    setDatasourceService(params, callback) {
        if (!params) {
            return;
        }
        const url = Util.urlPathAppend(this.url,`datasources/name/${params.datasourceName}`);
        this.processAsync(url, "PUT", callback, params);
    }

    processAsync(url, method, callback, params) {
      let eventId = ++this.eventCount;
      let eventListeners = {
        scope: this,
        processCompleted: function(result) {
          if (eventId === result.result.eventId) {
            callback(result);
          }
        },
        processFailed: callback
      }
      this.events.on(eventListeners);
       var me = this;
       let requestConfig = {
          url,
          method,
          scope: me,
          success(result) {
            result.eventId = eventId;
            this.serviceProcessCompleted(result);
          },
          failure(result) {
            result.eventId = eventId;
            this.serviceProcessFailed(result);
          }
        }
        params && (requestConfig.data = Util.toJSON(params));
        me.request(requestConfig);
    }
}
