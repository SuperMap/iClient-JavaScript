import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';

/**
 * @class SuperMap.MapService
 * @category  iServer Map
 * @classdesc 地图信息服务类。
 * @extends SuperMap.CommonServiceBase
 * @example
 * var myMapService = new SuperMap.MapService(url, {
 * eventListeners:{
 *     "processCompleted": MapServiceCompleted,
 *       "processFailed": MapServiceFailed
 *       }
 * });
 *
 * @param url - {string} 服务的访问地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
 * @param options - {Object} 可选参数 。如：<br>
 *        eventListeners - {Object} 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        format -{SuperMap.DataFormat} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
 */
export class MapService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member  SuperMap.MapService.prototype.projection -{string}
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
                    me.url += "?prjCoordSys={\"epsgCode\":" + arr[1] + "}";
                }
                if (arr.length === 1) {
                    me.url += "?prjCoordSys={\"epsgCode\":" + arr[0] + "}";
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
     * @function  SuperMap.MapService.prototype.processAsync
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
     * result - {Object} 服务器返回的结果对象。
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

SuperMap.MapService = MapService;
