/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ServiceBase} from './ServiceBase';
import '../core/Base';
import { GetGridCellInfosService } from '@supermap/iclient-common/iServer/GetGridCellInfosService';

/**
 * @class GridCellInfosService
 * @deprecatedclassinstance L.supermap.gridCellInfosService
 * @classdesc 数据栅格查询服务类。此类用于设置查询某一地理位置所对应栅格单元信息的相关参数，包括：栅格值、栅格行、栅格列等。
 * @category  iServer Data Grid
 * @modulecategory Services
 * @extends {ServiceBase}
 * @example
 *      new GridCellInfosService(url)
 *      .getGridCellInfos(param,function(result){
 *           //doSomething
 *      })
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export var GridCellInfosService = ServiceBase.extend({

    initialize: function (url, options) {
      ServiceBase.prototype.initialize.call(this, url, options);
      this._gridCellQueryService = new GetGridCellInfosService(this.url, {
        proxy: this.options.proxy,
        withCredentials: this.options.withCredentials,
        crossOrigin: this.options.crossOrigin,
        headers: this.options.headers
      });
    },

    /**
     * @function GridCellInfosService.prototype.getGridCellInfos
     * @description 获取某一地理位置所对应的栅格单元信息。
     * @param {GetGridCellInfosParameters} params - 数据服务栅格查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getGridCellInfos: function (params, callback) {
      if (!params) {
        return null;
      }
      return this._gridCellQueryService.processAsync(params, callback);
    }
});
export var gridCellInfosService = function (url, options) {
    return new GridCellInfosService(url, options);
};
