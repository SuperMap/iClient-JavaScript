/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import maplibregl from 'maplibre-gl';
import { Util } from '../core/Util';
import { ServiceBase } from './ServiceBase';
import { Point as GeometryPoint } from '@supermap/iclient-common/commontypes/geometry/Point';
import { WebPrintingService } from '@supermap/iclient-common/iServer/WebPrintingService';
/**
 * @class WebPrintingJobService
 * @category  iServer WebPrintingJob
 * @version 10.1.0
 * @classdesc Web 打印服务类。
 *            提供：创建 Web 打印任务，获取 Web 打印任务内容，获取 Web 打印输出文档流，获取 Web 打印服务的布局模板信息。
 * @extends {ServiceBase}
 * @param {string} url - 资源根地址。请求打印地图服务的 URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/webprinting/rest/webprinting/v1。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 * new WebPrintingJobService(url)
 * .createWebPrintingJob(param,function(result){
 *     //doSomething
 * })
 * @usage
 */
export class WebPrintingJobService extends ServiceBase {
    constructor(url, options) {
        super(url, options);
        this._webPrintingService = new WebPrintingService(url, options);
    }

    /**
     * @function WebPrintingJobService.prototype.createWebPrintingJob
     * @description 创建 Web 打印任务。
     * @param {WebPrintingJobParameters} params - Web 打印参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    createWebPrintingJob(params, callback) {
      this._webPrintingService.createWebPrintingJob(params, callback);
    }

    /**
     * @function WebPrintingJobService.prototype.getPrintingJob
     * @description 获取 Web 打印输出文档任务。
     * @param {string} jobId - Web 打印输入文档任务 ID。
     * @param {RequestCallback} callback - 回调函数。
     */
    getPrintingJob(jobId, callback) {
      this._webPrintingService.getPrintingJob(jobId, callback);
    }

    /**
     * @function WebPrintingJobService.prototype.getPrintingJobResult
     * @description 获取 Web 打印任务的输出文档。
     * @param {string} jobId - Web 打印输入文档任务 ID。
     * @param {RequestCallback} callback - 回调函数。
     */
    getPrintingJobResult(jobId, callback) {
      this._webPrintingService.getPrintingJobResult(jobId, callback);
    }

    /**
     * @function WebPrintingJobService.prototype.getLayoutTemplates
     * @description 查询 Web 打印服务所有可用的模板信息。
     * @param {RequestCallback} callback - 回调函数。
     */
    getLayoutTemplates(callback) {
      this._webPrintingService.getLayoutTemplates(callback);
    }

    _processParams(params) {
        if (params.layoutOptions && params.layoutOptions.littleMapOptions) {
            params.layoutOptions.littleMapOptions.center = this._toPointObject(params.layoutOptions.littleMapOptions.center);
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
        } else if (point instanceof GeometryPoint || point instanceof maplibregl.Point) {
            return {
                x: point.x,
                y: point.y
            };
        } else if (point instanceof maplibregl.LngLat) {
            return {
                x: point.lng,
                y: point.lat
            };
        }
        return point;
    }
}
