/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { CommonUtil } from '@supermap/iclient-common';
import { CommonServiceBase } from './CommonServiceBase';
import { EditFeatureAttachmentsParameters } from './EditFeatureAttachmentsParameters';

/**
 * @class EditFeatureAttachmentsService
 * @deprecatedclass SuperMap.EditFeatureAttachmentsService
 * @category  iServer Data Feature
 * @classdesc 数据服务中要素关联附件的添加、查询类。
 * @extends {CommonServiceBase}
 * @param {string} url - 服务端的数据服务资源地址。请求数据服务中数据集编辑服务，URL 应为：</br>
 * http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data。</br>
 * 例如：http://localhost:8090/iserver/services/data-world/rest/data
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 * var myService = new EditFeatureAttachmentsService(url, {eventListeners: {
 *     "processCompleted": editFeatureCompleted,
 *     "processFailed": editFeatureError
 *       }
 * };
 * @usage
 */

export class EditFeatureAttachmentsService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.EditFeatureAttachmentsService";
    }


    /**
     * @function EditFeatureAttachmentsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function EditFeatureAttachmentsService.prototype.isSupport
     * @description 验证服务是否支持开启要素功能。
     * @param {EditFeatureAttachmentsService} params - 查询参数。
     * @override
     */
    isSupport(params, callback) {
        let eventListeners = {
            processCompleted: callback,
            processFailed: callback
        }
        this.events.on(eventListeners)
        let me = this,
            url = me.url,
            dataSourceName = params.dataSourceName,
            dataSetName = params.dataSetName;
        url = CommonUtil.urlPathAppend(url, "datasources/" + dataSourceName + "/datasets/" + dataSetName)
        me.request({
            url,
            method: 'GET',
            scope: me,
            success: (result)=>{
                me.serviceProcessCompleted(result)
                this.events && this.events.un(eventListeners)
            },
            failure: ()=>{
                me.serviceProcessFailed()
                this.events && this.events.un(eventListeners)
            }
        });
    }

    /**
     * @function EditFeatureAttachmentsService.prototype.processAsync
     * @description 要素查询或添加，负责将客户端的要素文件传递到服务端。
     * @param {EditFeatureAttachmentsService} params - 编辑要素参数。
     */
    processAsync(params, callback) {
        if (!(params instanceof EditFeatureAttachmentsParameters)) {
            return;
        }
        let eventListeners = {
            processCompleted: callback,
            processFailed: callback
        }
        this.events.on(eventListeners)
        Util.extend(this, params)

        this.method = params.file ? "POST" : "GET"
        this.id = params.id

        if (params.dataSourceName === "World" && params.dataSetName === "Countries") {
            this.featurecode = "0-11"
        }
        let me = this
        me.url = Util.urlPathAppend(me.url, `feature/${me.featurecode}-${me.id}/attachments`)
        me.request({
            method: me.method,
            data: params.file,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function EditFeatureAttachmentsService.prototype.serviceProcessCompleted
     * @description 查询或添加完成，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */
    serviceProcessCompleted(result, options) {
        var me = this;
        result = Util.transformResult(result);
        me.events.triggerEvent("processCompleted", { result: result, options });
        this.events.un()
    }

    /**
     * @function EditFeatureAttachmentsService.prototype.serviceProcessCompleted
     * @description 查询或添加失败，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */
    serviceProcessFailed(result, options) {
        var me = this;
        result = Util.transformResult(result);
        me.events.triggerEvent("processFailed", { result: result, options });
    }
}