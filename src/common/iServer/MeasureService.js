import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import {MeasureParameters} from './MeasureParameters';
import {ServerGeometry} from './ServerGeometry';
import {MeasureMode} from '../REST';

/**
 * @class SuperMap.MeasureService
 * @category  iServer Map Measure
 * @classdesc 量算服务类。
 *              该类负责将量算参数传递到服务端，并获取服务端返回的量算结果。
 * @extends SuperMap.CommonServiceBase
 * @example
 * var myMeasuerService = new SuperMap.MeasureService(url, {
 *      measureMode: SuperMap.MeasureMode.DISTANCE,
 *      eventListeners:{
 *          "processCompleted": measureCompleted
 *      }
 * });
 * @param url - {string} 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *        eventListeners - {Object} 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        format -{SuperMap.DataFormat} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。<br>
 *        measureMode - {MeasureMode} 量算模式，包括距离量算模式和面积量算模式。
 */
export class MeasureService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member SuperMap.MeasureService.prototype.measureMode -{SuperMap.MeasureMode}
         * @description 量算模式，包括距离量算模式和面积量算模式。默认值为：MeasureMode.DISTANCE 。
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
     * @param params - {SuperMap.MeasureParameters} 量算参数。
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