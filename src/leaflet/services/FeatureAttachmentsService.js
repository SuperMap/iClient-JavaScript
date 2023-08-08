/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { ServiceBase } from './ServiceBase';
import { EditFeatureAttachmentsService } from "@supermap/iclient-common/iServer/EditFeatureAttachmentsService";
/**
/**
 * @class FeatureAttachmentsService
 * @category  iServer Data Feature
 * @classdesc 要素关联附件服务。
 * @modulecategory Services
 * @extends {ServiceBase}
 * @example
 *      //首先获取服务是否支持关联附件功能
  *      new EditFeatureAttachmentsService(url)
  *      .attachmentsSupport(param,function(result){
  *           //doSomething
  *      })
  *     //支持情况下获取元素关联附件
  *     new EditFeatureAttachmentsService(url)
  *      .featureAttachments(param,function(result){
  *           //doSomething
  *      })
 * @param {string} url - 服务地址。请求地图服务，URL 应为：
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/data/datasources/{数据源}/datasets/{数据集}。（附件功能是否可用）
  *                       http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/data/feature/{feature ID}/attachments.json。（获取或添加附件）
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export var FeatureAttachmentsService = ServiceBase.extend({
    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
        this._editFAService = new EditFeatureAttachmentsService(this.url, {
            proxy: this.options.proxy,
            withCredentials: this.options.withCredentials,
            crossOrigin: this.options.crossOrigin,
            headers: this.options.headers
        });
    },

    /**
     * @function FeatureAttachmentsService.prototype.attachmentsSupport
     * @param {EditFeatureAttachmentsParameters} params - 查看附件功能是否可用
     * @param {RequestCallback} callback - 回调函数。
     */
    attachmentsSupport: function (params, callback) {
        if (!params) {
            return null;
        }
        this._editFAService.isSupport(params, callback);
    },

    /**
     * @function FeatureAttachmentsService.prototype.getGridCellInfos
     * @param {EditFeatureAttachmentsParameters} params - 附件添加、查看参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    featureAttachments: function (params, callback) {
        if (!params) {
            return null;
        }
        this._editFAService.processAsync(params, callback);
    }

})
export var featureAttachmentsService = function (url, options) {
    return new FeatureAttachmentsService(url, options);
};

