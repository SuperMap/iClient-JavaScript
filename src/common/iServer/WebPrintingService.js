/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
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
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。
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
     */
    createWebPrintingJob(params) {
        if (!params) {
            return;
        }
        if (params.layoutOptions) {
            if (params.layoutOptions.legendOptions) {
                !params.layoutOptions.legendOptions.title && (params.layoutOptions.legendOptions.title = '');
                params.layoutOptions.legendOptions.picAsBase64 =
                    params.layoutOptions.legendOptions.picAsBase64 &&
                    params.layoutOptions.legendOptions.picAsBase64.replace(/^data:.+;base64,/, '');
                if (
                    params.layoutOptions.legendOptions.customItems &&
                    params.layoutOptions.legendOptions.customItems.hasOwnProperty('picAsBase64')
                ) {
                    params.layoutOptions.legendOptions.customItems.picAsBase64 = params.layoutOptions.legendOptions.customItems.picAsBase64.replace(
                        /^data:.+;base64,/,
                        ''
                    );
                }
            }
        }
        var me = this;
        me.request({
            url: me._processUrl('jobs'),
            method: 'POST',
            data: Util.toJSON(params),
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function WebPrintingService.prototype.getPrintingJob
     * @description 获取 Web 打印输出文档任务。
     * @param {String} jobId - Web 打印任务 ID
     */
    getPrintingJob(jobId) {
        var me = this;
        var url = me._processUrl(`jobs/${jobId}`);
        me.request({
            url,
            method: 'GET',
            scope: me,
            success: function (result) {
                me.rollingProcess(result, url);
            },
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function WebPrintingService.prototype.getPrintingJobResult
     * @description 获取 Web 打印任务的输出文档。
     * @param {String} jobId - Web 打印输入文档任务 ID。
     */
    getPrintingJobResult(jobId) {
        var me = this;
        me.request({
            url: me._processUrl(`jobs/${jobId}/result`),
            method: 'GET',
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function WebPrintingService.prototype.getLayoutTemplates
     * @description 查询 Web 打印服务所有可用的模板信息。
     */
    getLayoutTemplates() {
        var me = this;
        me.request({
            url: me._processUrl('layouts'),
            method: 'GET',
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function WebPrintingService.prototype.rollingProcess
     * @description 轮询查询 Web 打印任务。
     * @param {Object} result - 服务器返回的结果对象。
     */
    rollingProcess(result, url) {
        var me = this;
        if (!result) {
            return;
        }
        var id = setInterval(function () {
            me.request({
                url,
                method: 'GET',
                scope: me,
                success: function (result) {
                    switch (result.status) {
                        case 'FINISHED':
                            clearInterval(id);
                            me.serviceProcessCompleted(result);
                            break;
                        case 'ERROR':
                            clearInterval(id);
                            me.serviceProcessFailed(result);
                            break;
                        case 'RUNNING':
                            me.events.triggerEvent('processRunning', result);
                            break;
                    }
                },
                failure: me.serviceProcessFailed
            });
        }, 1000);
    }

    _processUrl(appendContent) {
        if (appendContent) {
            return Util.urlPathAppend(this.url, appendContent);
        }
        return this.url;
    }
}

