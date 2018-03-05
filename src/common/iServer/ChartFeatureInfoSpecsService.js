import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';

/**
 * @class SuperMap.ChartFeatureInfoSpecsService
 * @category  iServer Map Chart
 * @classdesc 海图物标信息服务类，通过该服务类可以查询到服务端支持的所有海图物标信息。<br>
 *              用户可以通过两种方式获取查询结果：<br>
 *              一种是通过监听 ChartFeatureInfoSpecsEvent.PROCESS_COMPLETE 事件；<br>
 *              另一种是使用 AsyncResponder 类实现异步处理。
 * @extends SuperMap.CommonServiceBase
 * @param url - {string} 地图（特指海图）服务地址。<br>
 *        如："http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图"。<br>
 *        发送请求格式类似于："http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图/chartFeatureInfoSpecs.json"
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *        eventListeners - {Object} 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        format -{SuperMap.DataFormat} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
 */
export class ChartFeatureInfoSpecsService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.ChartFeatureInfoSpecsService";
    }

    /**
     * @function SuperMap.ChartFeatureInfoSpecsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }

    /**
     * @function SuperMap.ChartFeatureInfoSpecsService.prototype.processAsync
     * @description 根据地图（特指海图）服务地址与服务端完成异步通讯，获取物标信息。<br>
     *               当查询物标信息成功时，将触发 ChartFeatureInfoSpecsEvent.PROCESS_COMPLETE <br>
     *               事件。用可以通过户两种方式获取图层信息: <br>
     *                 1. 通过 AsyncResponder 类获取（推荐使用）；<br>
     *                 2. 通过监听 ChartFeatureInfoSpecsEvent.PROCESS_COMPLETE 事件获取。
     */
    processAsync() {
        var me = this, method = "GET",
            end = me.url.substr(me.url.length - 1, 1);
        if (!me.isTempLayers) {
            me.url += (end === "/") ? '' : '/';
            me.url += "chartFeatureInfoSpecs.json?";
        } else {
            me.url += ".json?";
        }
        me.request({
            method: method,
            params: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
}

SuperMap.ChartFeatureInfoSpecsService = ChartFeatureInfoSpecsService;