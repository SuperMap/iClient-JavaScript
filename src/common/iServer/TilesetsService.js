/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { CommonServiceBase } from './CommonServiceBase';

/**
 * @class TilesetsService
 * @deprecatedclass SuperMap.TilesetsService
 * @category  iServer Map Tilesets
 * @classdesc 切片列表信息查询服务类；即查询切片地图服务的切片列表，返回切片集名称、地图切片元数据信息、切片版本集信息。
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。URL 应为：
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{服务名}/rest/maps/map；
 *                       例如: "http://localhost:8090/iserver/services/test/rest/maps/tianlocal"。
 * @param {Object} options - 参数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
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
     * @function TilesetsService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(callback) {
        if (!this.url) {
            return;
        }
        var me = this;
        me.url = Util.urlPathAppend(me.url, 'tilesets');
        return me.request({
            method: "GET",
            scope: me,
            success: callback,
            failure: callback
        });
    }
}
