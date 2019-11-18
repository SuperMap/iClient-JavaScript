/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {DataFormat} from '../REST';
import {CommonServiceBase} from './CommonServiceBase';

/**
 * @class SuperMap.NetworkAnalystServiceBase
 * @category iServer NetworkAnalyst
 * @classdesc 网络分析服务基类。
 * @description 网络分析服务基类。
 * @extends {SuperMap.CommonServiceBase}
 * @param {string} url - 网络分析服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class NetworkAnalystServiceBase extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        /**
         * @member {SuperMap.DataFormat} [SuperMap.NetworkAnalystServiceBase.prototype.format=SuperMap.DataFormat.GEOJSON]
         * @description 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式，参数格式为 "ISERVER","GEOJSON"
         */
        this.format = DataFormat.GEOJSON;

        this.CLASS_NAME = "SuperMap.NetworkAnalystServiceBase";
    }

    /**
     * @function SuperMap.NetworkAnalystServiceBase.prototype.destroy
     * @description 释放资源，将引用的资源属性置空。
     */
    destroy() {
        super.destroy();
        this.format = null;
    }

    /**
     * @function SuperMap.NetworkAnalystServiceBase.prototype.serviceProcessCompleted
     * @description 分析完成，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */
    serviceProcessCompleted(result) {
        var me = this, analystResult;
        result = Util.transformResult(result);
        if (result && me.format === DataFormat.GEOJSON && typeof me.toGeoJSONResult === 'function') {
            analystResult = me.toGeoJSONResult(result);
        }
        if (!analystResult) {
            analystResult = result;
        }
        me.events.triggerEvent("processCompleted", {result: analystResult});
    }

    /**
     * @function SuperMap.NetworkAnalystServiceBase.prototype.toGeoJSONResult
     * @description 将含有 geometry 的数据转换为 GeoJSON 格式。只处理结果中的路由，由子类实现。
     * @param {Object} result - 服务器返回的结果对象。
     * @returns {GeoJSONObject} GeoJSON 对象。
     */
    toGeoJSONResult(result) { // eslint-disable-line no-unused-vars
        return null;
    }
}

SuperMap.NetworkAnalystServiceBase = NetworkAnalystServiceBase;