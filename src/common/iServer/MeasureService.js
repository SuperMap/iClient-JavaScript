/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import {MeasureParameters} from './MeasureParameters';
import {ServerGeometry} from './ServerGeometry';
import {MeasureMode} from '../REST';

/**
 * @class SuperMap.MeasureService
 * @category iServer Map Measure
 * @classdesc 量算服务类。
 *            该类负责将量算参数传递到服务端，并获取服务端返回的量算结果。
 * @extends {SuperMap.CommonServiceBase}
 * @example
 * var myMeasuerService = new SuperMap.MeasureService(url, {
 *      measureMode: SuperMap.MeasureMode.DISTANCE,
 *      eventListeners:{
 *          "processCompleted": measureCompleted
 *      }
 * });
 * @param {string} url - 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 事件监听器对象。有 processCompleted 属性可传入处理完成后的回调函数。processFailed 属性传入处理失败后的回调函数。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务器类型，ISERVER|IPORTAL|ONLINE。 
 * @param {SuperMap.DataFormat} [options.format=SuperMap.DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @param {MeasureMode} options.measureMode - 量算模式，包括距离量算模式和面积量算模式。
 */
export class MeasureService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {SuperMap.MeasureMode} [SuperMap.MeasureService.prototype.measureMode=MeasureMode.DISTANCE]
         * @description 量算模式，包括距离量算模式和面积量算模式。
         */
        this.measureMode = MeasureMode.DISTANCE;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.MeasureService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.measureMode = null;
    }

    /**
     * @function SuperMap.MeasureService.prototype.processAsync
     * @description 负责将客户端的量算参数传递到服务端。
     * @param {SuperMap.MeasureParameters} params - 量算参数。
     */
    processAsync(params) {
        if (!(params instanceof MeasureParameters)) {
            return;
        }
        var me = this,
            geometry = params.geometry,
            pointsCount = 0,
            point2ds = null,
            end = null;
        if (!geometry) {
            return;
        }
        end = me.url.substr(me.url.length - 1, 1);
        if (me.measureMode === MeasureMode.AREA) {
            me.url += ((end === "/") ? "area.json?" : "/area.json?");
        } else {
            me.url += ((end === "/") ? "distance.json?" : "/distance.json?");
        }
        var serverGeometry = ServerGeometry.fromGeometry(geometry);
        if (!serverGeometry) {
            return;
        }
        pointsCount = serverGeometry.parts[0];
        point2ds = serverGeometry.points.splice(0, pointsCount);

        var prjCoordSysTemp, prjCodeTemp, paramsTemp;
        if (params.prjCoordSys) {
            if (typeof (params.prjCoordSys) === "object") {
                prjCodeTemp = params.prjCoordSys.projCode;
                prjCoordSysTemp = '{"epsgCode"' + prjCodeTemp.substring(prjCodeTemp.indexOf(":"), prjCodeTemp.length) + "}";
            } else if (typeof (params.prjCoordSys) === "string") {
                prjCoordSysTemp = '{"epsgCode"' + params.prjCoordSys.substring(params.prjCoordSys.indexOf(":"), params.prjCoordSys.length) + "}";
            }
            paramsTemp = {
                "point2Ds": Util.toJSON(point2ds),
                "unit": params.unit,
                "prjCoordSys": prjCoordSysTemp
            };
        } else {
            paramsTemp = {"point2Ds": Util.toJSON(point2ds), "unit": params.unit};
        }

        me.request({
            method: "GET",
            params: paramsTemp,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });

    }

}

SuperMap.MeasureService = MeasureService;