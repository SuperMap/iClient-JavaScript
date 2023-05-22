/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import { GetGridCellInfosService } from '@supermap/iclient-common/iServer/GetGridCellInfosService';

/**
 * @class GridCellInfosService
 * @category  iServer Data Grid
 * @classdesc 数据栅格查询服务。
 * @extends {ServiceBase}
 * @example
 * new GridCellInfosService(url)
 *  .getGridCellInfos(param,function(result){
 *     //doSomething
 * })
 * @param {string} url - 服务地址。请求地图服务，URL 应为：</br>
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}/tempLayersSet/{tempLayerID}/Rivers@World@@World。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class GridCellInfosService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
        this._gridCellQueryService = new GetGridCellInfosService(this.url, {
          proxy: this.options.proxy,
          withCredentials: this.options.withCredentials,
          crossOrigin: this.options.crossOrigin,
          headers: this.options.headers
      });
    }

    /**
     * @function GridCellInfosService.prototype.getGridCellInfos
     * @param {GetGridCellInfosParameters} params - 数据服务栅格查询参数类。
     * @param {RequestCallback} callback 回调函数。
     */
    getGridCellInfos(params, callback) {
      if (!params) {
        return null;
      }
      this._gridCellQueryService.processAsync(params, callback);
    }
}
