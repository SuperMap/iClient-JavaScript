/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {RouteCalculateMeasureParameters} from './RouteCalculateMeasureParameters';

/**
 * @class SuperMap.RouteCalculateMeasureService
 * @category  iServer SpatialAnalyst RouteCalculateMeasure
 * @classdesc 基于路由对象计算指定点 M 值操作的服务类。
 *            该类负责将客户设置的计算指定点的 M 值参数传递给服务端，并接收服务端返回的
 *            指定点的 M 值。通过该类支持的事件的监听函数参数获取。
 * @extends {SuperMap.SpatialAnalystBase}
 * @param {string} url - 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example 实例化该类如下例所示：
 * (start code)
 * var parameters = new SuperMap.RouteCalculateMeasureParameters({
     *     "sourceRoute":{
     *         "type":"LINEM",
     *        "parts":[4],
     *         "points":[
     *             {
     *                 "measure":0,
     *                 "y":-6674.466867067764,
     *                 "x":3817.3527876130133
     *             },
     *             {
     *                 "measure":199.57954019411724,
     *                 "y":-6670.830929417594,
     *                 "x":3617.806369901496
     *             },
     *             {
     *                 "measure":609.3656478634477,
     *                "y":-6877.837541432356,
     *                 "x":3264.1498746678444
     *             },
     *             {
     *                 "measure":936.0174126282958,
     *                 "y":-7038.687780615184,
     *                 "x":2979.846206068903
     *             }
     *         ]
     *     },
     *     "tolerance":1,
     *     "point":{
     *         "x":3330.7754269417,
     *         "y":-6838.8394457216
     *     },
     *     "isIgnoreGap":false
     * });
 *
 * var routeCalculateMeasureService = new SuperMap.RouteCalculateMeasureService(spatialAnalystURL, {
     *     eventListeners:{
     *         processCompleted:calculateCompleted,
     *         processFailed:calculateFailded
     *     }
     * );
     * routeCalculateMeasureService.processAsync(parameters);
     *
     *  //执行
     * function calculateCompleted(){todo}
     * function calculateFailded(){todo}
     * (end)
     *
     */
export class RouteCalculateMeasureService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.RouteCalculateMeasureService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.RouteCalculateMeasureService.prototype.processAsync
     * @description 负责将客户端的基于路由对象计算指定点 M 值操作的参数传递到服务端。
     * @param {SuperMap.RouteCalculateMeasureParameters} params - 基于路由对象计算指定点 M 值操作的参数类。
     */
    processAsync(params) {
        if (!(params instanceof RouteCalculateMeasureParameters)) {
            return;
        }
        var me = this, jsonParameters;

        jsonParameters = me.getJsonParameters(params);

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function SuperMap.RouteCalculateMeasureService.prototype.getJsonParameters
     * @description 将参数转化为 JSON 字符串。
     * @param {SuperMap.RouteCalculateMeasureParameters} params - 基于路由对象计算指定点 M 值操作的参数类。
     * @returns {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters(params) {
        var jsonParameters, jsonStr = "geometry/calculatemeasure", me = this, end;
        end = me.url.substr(me.url.length - 1, 1);
        me.url += (end === "/") ? jsonStr + ".json" : "/" + jsonStr + ".json";
        me.url += "?returnContent=true";
        jsonParameters = Util.toJSON(params);
        return jsonParameters;
    }

}

SuperMap.RouteCalculateMeasureService = RouteCalculateMeasureService;
