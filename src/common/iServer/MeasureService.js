/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { CommonServiceBase } from './CommonServiceBase';
import { MeasureParameters } from './MeasureParameters';
import { ServerGeometry } from './ServerGeometry';
import { MeasureMode } from '../REST';

/**
 * @class MeasureService
 * @deprecatedclass SuperMap.MeasureService
 * @category iServer Map Measure
 * @classdesc 量算服务类。
 *            该类负责将量算参数传递到服务端，并获取服务端返回的量算结果。
 * @extends {CommonServiceBase}
 * @example
 * var myMeasuerService = new MeasureService(url, {
 *      measureMode: MeasureMode.DISTANCE,
 *      eventListeners:{
 *          "processCompleted": measureCompleted
 *      }
 * });
 * @param {string} url - 服务地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 事件监听器对象。有 processCompleted 属性可传入处理完成后的回调函数。processFailed 属性传入处理失败后的回调函数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @param {MeasureMode} options.measureMode - 量算模式，包括距离量算模式和面积量算模式。
 * @usage
 */
export class MeasureService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {MeasureMode} [MeasureService.prototype.measureMode=MeasureMode.DISTANCE]
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
     * @function MeasureService.prototype.processAsync
     * @description 负责将客户端的量算参数传递到服务端。
     * @param {MeasureParameters} params - 量算参数。
     */
    processAsync(params) {
        if (!(params instanceof MeasureParameters)) {
            return;
        }
        var me = this,
            geometry = params.geometry,
            pointsCount = 0,
            point2ds = null;
        if (!geometry) {
            return;
        }
        me.url = Util.urlPathAppend(me.url, me.measureMode === MeasureMode.AREA ? 'area' : 'distance');
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
                "prjCoordSys": prjCoordSysTemp,
                "distanceMode": params.distanceMode || 'Geodesic'
            };
        } else {
            paramsTemp = {"point2Ds": Util.toJSON(point2ds), "unit": params.unit, "distanceMode": params.distanceMode || 'Geodesic'};
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
