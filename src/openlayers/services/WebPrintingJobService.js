/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../core/Util';
import { ServiceBase } from './ServiceBase';
import { WebPrintingService } from '@supermap/iclient-common/iServer/WebPrintingService';
import { SuperMap } from '@supermap/iclient-common/SuperMap';
import Point from 'ol/geom/Point';

/**
 * @class ol.supermap.WebPrintingJobService
 * @category  iServer WebPrintingJob
 * @version 10.1.0
 * @classdesc Web 打印服务类。
 *            提供：创建 Web 打印任务，获取 Web 打印任务内容，获取 Web 打印输出文档流，获取 Web 打印服务的布局模板信息。
 * @extends {ol.supermap.ServiceBase}
 * @param {string} url - 资源根地址。请求打印地图服务的 URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/webprinting/rest/webprinting/v1。
 * @param {Object} options - 服务交互时所需的可选参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 * new ol.supermap.WebPrintingJobService(url)
 * .createWebPrintingJob(param,function(result){
 *     //doSomething
 * })
 */
export class WebPrintingJobService extends ServiceBase {
    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.WebPrintingJobService.prototype.createWebPrintingJob
     * @description 创建 Web 打印任务。
     * @param {SuperMap.WebPrintingJobParameters} params - 打印的相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    createWebPrintingJob(params, callback) {
        if (!params) {
            return;
        }
        var me = this;
        var webPrintingService = new WebPrintingService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });

        webPrintingService.createWebPrintingJob(me._processParams(params));
    }

    /**
     * @function ol.supermap.WebPrintingJobService.prototype.getPrintingJob
     * @description 获取 Web 打印输出文档任务。
     * @param {String} jobId - Web 打印输入文档任务 Id。
     * @param {RequestCallback} callback - 回调函数。
     */
    getPrintingJob(jobId, callback) {
        var me = this;
        var webPrintingService = new WebPrintingService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });

        webPrintingService.getPrintingJob(jobId);
    }

    /**
     * @function ol.supermap.WebPrintingJobService.prototype.getPrintingJobResult
     * @description 获取 Web 打印任务的输出文档。
     * @param {String} jobId - Web 打印输入文档任务 Id。
     * @param {RequestCallback} callback - 回调函数。
     */
    getPrintingJobResult(jobId, callback) {
        var me = this;
        var webPrintingService = new WebPrintingService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });

        webPrintingService.getPrintingJobResult(jobId);
    }

    /**
     * @function ol.supermap.WebPrintingJobService.prototype.getLayoutTemplates
     * @description 查询 Web 打印服务所有可用的模板信息。
     * @param {RequestCallback} callback - 回调函数。
     */
    getLayoutTemplates(callback) {
        var me = this;
        var webPrintingService = new WebPrintingService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });

        webPrintingService.getLayoutTemplates();
    }

    _processParams(params) {
        if (params.layoutOptions && params.layoutOptions.littleMapOptions) {
            params.layoutOptions.littleMapOptions.center = this._toPointObject(
                params.layoutOptions.littleMapOptions.center
            );
        }
        if (params.exportOptions) {
            params.exportOptions.center = this._toPointObject(params.exportOptions.center);
        }
        return params;
    }

    _toPointObject(point) {
        if (Util.isArray(point)) {
            return {
                x: point[0],
                y: point[1]
            };
        } else if (point instanceof SuperMap.Geometry.Point || point instanceof Point) {
            return {
                x: point.x,
                y: point.y
            };
        }
        return point;
    }
}
