/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';

/**
 * @class ChartFeatureInfoSpecsService
 * @deprecatedclass SuperMap.ChartFeatureInfoSpecsService
 * @category  iServer Map Chart
 * @classdesc 海图物标信息服务类，通过该服务类可以查询到服务端支持的所有海图物标信息。
 *            用户可以通过两种方式获取查询结果：
 *            一种是通过监听 ChartFeatureInfoSpecsEvent.PROCESS_COMPLETE 事件；
 *            另一种是使用 AsyncResponder 类实现异步处理。
 * @extends {CommonServiceBase}
 * @param {string} url - 地图（特指海图）服务地址。
 *        如："http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图"。
 *        发送请求格式类似于："http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图/chartFeatureInfoSpecs.json"。
 * @param {Object} options - 参数。
 * @param {DataFormat} [options.format] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式，参数格式为"ISERVER","GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class ChartFeatureInfoSpecsService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.ChartFeatureInfoSpecsService";
    }

    /**
     * @function ChartFeatureInfoSpecsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }

    /**
     * @function ChartFeatureInfoSpecsService.prototype.processAsync
     * @description 根据地图（特指海图）服务地址与服务端完成异步通讯，获取物标信息。
     *              当查询物标信息成功时，将触发 ChartFeatureInfoSpecsEvent.PROCESS_COMPLETE
     *              事件。用可以通过户两种方式获取图层信息:
     *              1. 通过 AsyncResponder 类获取（推荐使用）；
     *              2. 通过监听 ChartFeatureInfoSpecsEvent.PROCESS_COMPLETE 事件获取。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(callback) {
        var me = this, method = "GET";
        if (!me.isTempLayers) {
            Util.urlPathAppend(me.url,'chartFeatureInfoSpecs');
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
