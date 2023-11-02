/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';

/**
 * @class ChartAcronymClassifyService
 * @deprecatedclass SuperMap.ChartAcronymClassifyService
 * @category  iServer Map Chart
 * @classdesc  该地图支持的所有海图产品规范物标分组信息类。用于描述各产品规范的物标的分组基本信息，包括物标的分组名称、分组包含的物标等
 * @extends {CommonServiceBase}
 * @param {string} url - 地图（特指海图）服务地址。
 *        如："http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图"。
 *        发送请求格式类似于："http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图/chartAcronymClassify.json"。
 * @param {Object} options - 参数。
 * @param {DataFormat} [options.format] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式，参数格式为"ISERVER","GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class ChartAcronymClassifyService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.ChartAcronymClassifyService";
    }

    /**
     * @function ChartAcronymClassifyService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }

    /**
     * @function ChartAcronymClassifyService.prototype.processAsync
     * @description 根据地图（特指海图）服务地址与服务端完成异步通讯，获取该地图支持的所有海图产品规范物标分组信息
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(callback) {
        var me = this, method = "GET";
        if (!me.isTempLayers) {
          me.url = Util.urlPathAppend(me.url,'chartAcronymClassify');
        }
        return me.request({
            method: method,
            params: null,
            scope: me,
            success: callback,
            failure: callback
        });
    }
}
