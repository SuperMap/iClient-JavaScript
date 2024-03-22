/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { CommonServiceBase } from './CommonServiceBase';

/**
 * @class WebPrintingService
 * @deprecatedclass SuperMap.WebPrintingService
 * @category iServer WebPrintingJob
 * @version 10.1.0
 * @classdesc 打印地图服务基类。
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。请求打印地图服务的 URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/webprinting/rest/webprinting/v1。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class WebPrintingService extends CommonServiceBase {
  constructor(url, options) {
    super(url, options);

    if (options) {
      Util.extend(this, options);
    }
    this.templates = [];
    this.CLASS_NAME = 'SuperMap.WebPrintingService';
    if (!this.url) {
      return;
    }
  }

  /**
   * @function WebPrintingService.prototype.destroy
   * @description 释放资源，将引用资源的属性置空。
   */
  destroy() {
    super.destroy();
  }

  /**
   * @function WebPrintingService.prototype.createWebPrintingJob
   * @description 创建 Web 打印任务。
   * @param {WebPrintingJobParameters} params - Web 打印的请求参数。
   * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
   * @returns {Promise} Promise 对象。
   */
  async createWebPrintingJob(params, callback) {
    if (!params) {
      return;
    }
    await this._processParams(params);
    return this.processAsync('jobs', 'POST', callback, params);
  }

  /**
   * @function WebPrintingService.prototype.getPrintingJob
   * @description 获取 Web 打印输出文档任务, 轮询获取打印状态，只有当状态为完成或失败才返回结果。
   * @param {string} jobId - Web 打印任务 ID
   * @param {RequestCallback} callback - 回调函数。
   */
  getPrintingJob(jobId, callback) {
    var me = this;
    me.rollingProcess(me._processUrl(`jobs/${jobId}`), callback);
  }

  /**
   * @function WebPrintingService.prototype.getPrintingJobResult
   * @description 获取 Web 打印任务的输出文档。
   * @param {string} jobId -  Web 打印输出文档任务 ID。
   * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
   * @returns {Promise} Promise 对象。
   */
  getPrintingJobResult(jobId, callback) {
    return this.processAsync(`jobs/${jobId}/result`, 'GET', callback);
  }

  /**
   * @function WebPrintingService.prototype.getLayoutTemplates
   * @description 查询 Web 打印服务所有可用的模板信息。
   * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
   * @returns {Promise} Promise 对象。
   */
  getLayoutTemplates(callback) {
    return this.processAsync('layouts', 'GET', callback);
  }

  /**
   * @function WebPrintingService.prototype.rollingProcess
   * @description 轮询查询 Web 打印任务。
   * @param {Object} result - 服务器返回的结果对象。
   */
  rollingProcess(url, callback) {
    var me = this;
    this.id && clearInterval(this.id);
    this.id = setInterval(function () {
      me.request({
        url,
        method: 'GET',
        scope: me,
        success: callback,
        failure: callback
      });
    }, 1000);
  }

  processAsync(url, method, callback, params) {
    var me = this;
    let requestConfig = {
      url: me._processUrl(url),
      method,
      scope: me,
      success: callback,
      failure: callback
    };
    params && (requestConfig.data = Util.toJSON(params));
    return me.request(requestConfig);
  }

  transformResult(result, options) {
    result = Util.transformResult(result);
    if (result.status === 'FINISHED' || result.status === 'ERROR') {
      clearInterval(this.id);
    } else if (result.status === 'RUNNING') {
      options.success = false;
    }
    return { result, options };
  }

  _processUrl(appendContent) {
    if (appendContent) {
      return Util.urlPathAppend(this.url, appendContent);
    }
    return this.url;
  }

  async _processParams(params) {
    if (!params.layoutOptions) {
      return;
    }
    const { legendOptions, templateName } = params.layoutOptions;
    if (legendOptions) {
      !params.layoutOptions.legendOptions.title && (params.layoutOptions.legendOptions.title = '');
      params.layoutOptions.legendOptions.picAsBase64 =
        params.layoutOptions.legendOptions.picAsBase64 &&
        params.layoutOptions.legendOptions.picAsBase64.replace(/^data:.+;base64,/, '');
      if (
        params.layoutOptions.legendOptions.customItems &&
        params.layoutOptions.legendOptions.customItems.hasOwnProperty('picAsBase64')
      ) {
        params.layoutOptions.legendOptions.customItems.picAsBase64 =
          params.layoutOptions.legendOptions.customItems.picAsBase64.replace(/^data:.+;base64,/, '');
      }
    }
    if (!this.templates.length) {
      const res = await this.getLayoutTemplates();
      this.templates = res.result;
    }
    const matchTemplate = this.templates.find((item) => item.templateName === templateName);
    //根据模板判断哪些参数需要传递
    const {
      hasCopyright,
      hasSubtitle,
      hasAuthor,
      hasScaleBar,
      hasTitle,
      hasTime,
      hasSummaryText,
      hasLittleMap,
      hasNorthArrow,
      hasLegend
    } = matchTemplate.layoutOptions;
    const layoutOptions = params.layoutOptions;
    if (!hasTitle) {
      delete params.layoutOptions.title;
    } else if (layoutOptions.title === void 0) {
      params.layoutOptions.title = null;
    }
    if (!hasSubtitle) {
      delete params.layoutOptions.subTitle;
    } else if (layoutOptions.subTitle === void 0) {
      params.layoutOptions.subTitle = null;
    }
    if (!hasAuthor) {
      delete params.layoutOptions.author;
    } else if (layoutOptions.author === void 0) {
      params.layoutOptions.author = null;
    }
    if (!hasCopyright) {
      delete params.layoutOptions.copyright;
    } else if (layoutOptions.copyright === void 0) {
      params.layoutOptions.copyright = null;
    }
    if (!hasSummaryText || !layoutOptions.summaryText) {
      delete params.layoutOptions.summaryText;
    }
    if (!hasTime || !layoutOptions.time) {
      delete params.layoutOptions.time;
    }
    if (!hasLittleMap || !layoutOptions.littleMapOptions) {
      delete params.layoutOptions.littleMapOptions;
    }
    if (!hasScaleBar || !layoutOptions.scaleBarOptions) {
      delete params.layoutOptions.scaleBarOptions;
    }
    if (!hasNorthArrow || !layoutOptions.northArrowOptions) {
      delete params.layoutOptions.northArrowOptions;
    }
    if (!hasLegend || !layoutOptions.legendOptions) {
      delete params.layoutOptions.legendOptions;
    }
  }
}
