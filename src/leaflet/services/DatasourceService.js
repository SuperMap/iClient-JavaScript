    /* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import '../core/Base';
 import { ServiceBase } from './ServiceBase';
 import { DatasourceService as CommonDatasourceService } from '@supermap/iclient-common/iServer/DatasourceService';
 import { SetDatasourceParameters } from '@supermap/iclient-common/iServer/SetDatasourceParameters';
/**
 * @class  DatasourceService
 * @deprecatedclassinstance L.supermap.datasourceService
 * @classdesc 数据源服务类。
 * @category iServer Data Datasource
 * @extends {ServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export var DatasourceService = ServiceBase.extend({

    initialize: function (url,options) {
        ServiceBase.prototype.initialize.call(this, url, options);
        this._datasourceService = new CommonDatasourceService(this.url, {
          proxy: this.proxy,
          withCredentials: this.withCredentials,
          crossOrigin: this.crossOrigin,
          headers: this.headers
        });
    },

    /**
     * @function DatasourceService.prototype.getDatasources
     * @description 数据源集查询服务。
     * @example
     *   new DatasourceService(url).getDatasources(function(result){
     *     //doSomething
     *   });
     * @param {RequestCallback} callback - 回调函数。
     */
    getDatasources: function (callback) {
        this._datasourceService.getDatasourcesService(callback);
    },

    /**
     * @function DatasourceService.prototype.getDatasource
     * @description 数据源信息查询服务。
     * @example
     *   new DatasourceService(url).getDatasource(datasourceName,function(result){
     *     //doSomething
     *   });
     * @param datasourceName - 数据源名称。
     * @param {RequestCallback} callback - 回调函数。
     */
    getDatasource: function (datasourceName, callback) {
      if (!datasourceName) {
        return;
      }
      this._datasourceService.getDatasourceService(datasourceName, callback);
    },

    /**
     * @function DatasourceService.prototype.setDatasource
     * @description 数据源信息设置服务。可实现更改当前数据源信息。
     * @example
     *   new DatasourceService(url).setDatasource(params, function(result){
     *     //doSomething
     *   });
     * @param {SetDatasourceParameters} params - 数据源信息设置参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    setDatasource: function(params, callback) {
      if (!(params instanceof SetDatasourceParameters)) {
        return;
      }
      const datasourceParams = {
          description: params.description,
          coordUnit: params.coordUnit,
          distanceUnit: params.distanceUnit,
          datasourceName: params.datasourceName
      };
      this._datasourceService.setDatasourceService(datasourceParams, callback);
    }
});

export var datasourceService = function (url, options) {
  return new DatasourceService(url, options);
};
