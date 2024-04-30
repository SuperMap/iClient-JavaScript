/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import { ThemeService as CommonThemeService } from '@supermap/iclient-common/iServer/ThemeService';

/**
 * @class ThemeService
 * @category  iServer Map Theme
 * @classdesc 专题图服务类。地图学中将突出而深入地表示一种或几种要素或现象，即集中表示一个主题内容的地图称为专题地图。在 SuperMap 中，专题图是地图图层的符号化显示，即用各种图形渲染风格（大小，颜色，线型，填充等）来图形化地表现专题要素的某方面特征。该类可用于获取专题图的信息。
 * @extends {ServiceBase}
 * @example
 * new ThemeService(url,{
 *      projection:projection
 * }).getThemeInfo(params,function(result){
 *      //doSomething
 * });
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class ThemeService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
        this._themeService = new CommonThemeService(this.url, {
          proxy: this.options.proxy,
          withCredentials: this.options.withCredentials,
          crossOrigin:this.options.crossOrigin,
          headers:this.options.headers
        });
    }

    /**
     * @function ThemeService.prototype.getThemeInfo
     * @description 获取专题图信息。
     * @param {ThemeParameters} params - 专题图参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getThemeInfo(params, callback) {
      return this._themeService.processAsync(params, callback);
    }
}
