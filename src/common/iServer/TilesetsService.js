/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { Util } from '../commontypes/Util';
import { CommonServiceBase } from './CommonServiceBase';

/**
 * @class SuperMap.TilesetsService
 * @category  iServer Map Tilesets
 * @classdesc 切片列表信息查询服务类；即查询切片地图服务的切片列表，返回切片集名称、地图切片元数据信息、切片版本集信息。
 * @extends {SuperMap.CommonServiceBase}
 * @param {string} url - 地图服务地址。URL 应为：
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{服务名}/rest/maps/map；
 *                       例如: "http://localhost:8090/iserver/services/test/rest/maps/tianlocal"。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 事件监听器对象。有 processCompleted 属性可传入处理完成后的回调函数。processFailed 属性传入处理失败后的回调函数。
 * @param {SuperMap.DataFormat} [options.format=SuperMap.DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class TilesetsService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.TilesetsService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.TilesetsService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     */
    processAsync() {
        if (!this.url) {
            return;
        }
        var me = this;
        me.url = Util.urlPathAppend(me.url, 'tilesets');
        me.request({
            method: "GET",
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
}

SuperMap.TilesetsService = TilesetsService;