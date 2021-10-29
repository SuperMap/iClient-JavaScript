/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { CommonServiceBase } from './CommonServiceBase';

/**
 * @class MapService
 * @deprecatedclass SuperMap.MapService
 * @category iServer Map
 * @classdesc 地图信息服务类。
 * @extends {CommonServiceBase}
 * @example
 * var myMapService = new MapService(url, {
 * eventListeners:{
 *     "processCompleted": MapServiceCompleted,
 *       "processFailed": MapServiceFailed
 *       }
 * });
 *
 * @param {string} url - 服务地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 事件监听器对象。有 processCompleted 属性可传入处理完成后的回调函数。processFailed 属性传入处理失败后的回调函数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class MapService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {string} MapService.prototype.projection
         * @description 根据投影参数获取地图状态信息。如"EPSG:4326"
         */
        this.projection = null;

        this.CLASS_NAME = "SuperMap.MapService";
        if (options) {
            Util.extend(this, options);
        }
        var me = this;

        if (me.projection) {
            var arr = me.projection.split(":");
            if (arr instanceof Array) {
                if (arr.length === 2) {
                    me.url = Util.urlAppend(me.url,`prjCoordSys=${encodeURIComponent(`{\"epsgCode\":"${arr[1]}"}`)}`)
                }
                if (arr.length === 1) {
                    me.url = Util.urlAppend(me.url,`prjCoordSys=${encodeURIComponent(`{\"epsgCode\":"${arr[0]}"}`)}`)
                }
            }
        }
    }

    /**
     * @function  destroy
     * @description 释放资源，将引用的资源属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
        if (me.events) {
            me.events.un(me.eventListeners);
            me.events.listeners = null;
            me.events.destroy();
            me.events = null;
            me.eventListeners = null;
        }
    }

    /**
     * @function  MapService.prototype.processAsync
     * @description 负责将客户端的设置的参数传递到服务端，与服务端完成异步通讯。
     */
    processAsync() {
        var me = this;
        me.request({
            method: "GET",
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /*
     * Method: getMapStatusCompleted
     * 获取地图状态完成，执行此方法。
     *
     * Parameters:
     * {Object} result - 服务器返回的结果对象。
     */
    serviceProcessCompleted(result) {
        var me = this;
        result = Util.transformResult(result);
        var codeStatus = (result.code >= 200 && result.code < 300) || result.code == 0 || result.code === 304;
        var isCodeValid = result.code && codeStatus;
        if (!result.code || isCodeValid) {
            me.events && me.events.triggerEvent("processCompleted", {result: result});
        } else {
            ////在没有token是返回的是200，但是其实是没有权限，所以这里也应该是触发失败事件
            me.events.triggerEvent("processFailed", {error: result});
        }
    }

}

