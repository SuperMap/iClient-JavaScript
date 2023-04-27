/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {RouteLocatorParameters} from './RouteLocatorParameters';

/**
 * @class RouteLocatorService
 * @deprecatedclass SuperMap.RouteLocatorService
 * @category iServer SpatialAnalyst RouteLocator
 * @classdesc 路由对象定位空间对象的服务类。
 * @extends {SpatialAnalystBase}
 * @param {string} url -服务地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example 实例化该类如下例所示：
 * (start code)
 * var routeLocatorParameters_point = new RouteLocatorParameters({
     *   "sourceRoute":{
     *       "type":"LINEM",
     *       "parts":[4],
     *       "points":[
     *           {
     *               "measure":0,
     *               "y":-6674.466867067764,
     *               "x":3817.3527876130133
     *           },
     *           {
     *               "measure":199.57954019411724,
     *               "y":-6670.830929417594,
     *               "x":3617.806369901496
     *          },
     *           {
     *               "measure":609.3656478634477,
     *               "y":-6877.837541432356,
     *               "x":3264.1498746678444
     *           },
     *           {
     *               "measure":936.0174126282958,
     *               "y":-7038.687780615184,
     *               "x":2979.846206068903
     *           }
     *       ]
     *   },
     *   "type":"POINT",
     *   "measure":10,
     *   "offset":3,
     *   "isIgnoreGap":true
     * });
     * var routeLocatorService = new RouteLocatorService(spatialAnalystURL, {
     *     eventListeners:{
     *         processCompleted:routeLocatorCompleted,
     *         processFailed:routeLocatorFailded
     *     }
     * );
     * routeLocatorService.processAsync(routeLocatorParameters_point);
     *
     *  //执行
     * function routeLocatorCompleted(){todo}
     * function routeLocatorFailded(){todo}
     * (end)
     * @usage
     */
export class RouteLocatorService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.RouteLocatorService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function RouteLocatorService.prototype.processAsync
     * @description 负责将客户端的基于路由对象计算指定点 M 值操作的参数传递到服务端。
     * @param {RouteLocatorParameters} params - 路由对象定位空间对象的参数类。
     */
    processAsync(params) {
        if (!(params instanceof RouteLocatorParameters)) {
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
     * @function RouteLocatorService.prototype.processAsync
     * @description 将参数转化为 JSON 字符串。
     * @param {RouteLocatorParameters} params - 路由对象定位空间对象的参数类。
     * @returns {Object} 转化后的JSON字符串。
     */
    getJsonParameters(params) {
        var jsonParameters, jsonStr = "geometry/routelocator", me = this;

        if (params.dataset) {
            jsonStr = "datasets/" + params.dataset + "/linearreferencing/routelocator";
            params.sourceRoute = null;
        }
        me.url = Util.urlPathAppend(me.url, jsonStr);
        me.url = Util.urlAppend(me.url, 'returnContent=true');
        jsonParameters = Util.toJSON(params);
        return jsonParameters;
    }

}

