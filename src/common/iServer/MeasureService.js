/*
 * Class: SuperMap.MeasureService
 * 量算服务类。
 * 该类负责将量算参数传递到服务端，并获取服务端返回的量算结果。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('../REST');
require('./ServiceBase');
require('./MeasureParameters');
var SuperMap = require('../SuperMap');
/**
 * @class SuperMap.MeasureService
 * @description 量算服务类。
 * 该类负责将量算参数传递到服务端，并获取服务端返回的量算结果。
 * @augments SuperMap.ServiceBase
 * @example
 * (start code)
 * var myMeasuerService = new SuperMap.MeasureService(url, {
 *      measureMode: SuperMap.MeasureMode.DISTANCE,
 *      eventListeners:{
 *          "processCompleted": measureCompleted
 *      }
 * });
 * (end)
 * @param url - {String} 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 *         measureMode - {<MeasureMode>} 量算模式，包括距离量算模式和面积量算模式。
 */
SuperMap.MeasureService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * @member SuperMap.MeasureService.measureMode -{SuperMap.MeasureMode}
     * @description 量算模式，包括距离量算模式和面积量算模式。默认值为：MeasureMode.DISTANCE 。
     */
    measureMode: SuperMap.MeasureMode.DISTANCE,

    /**
     * @function SuperMap.MeasureService.initialize
     * @description 量算服务类构造函数。
     * @param url - {String} 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
     * @param options - {Object} 交互服务时所需可选参数。如：<br>
     *         eventListeners - {Object} 需要被注册的监听器对象。
     *         measureMode - {<MeasureMode>} 量算模式，包括距离量算模式和面积量算模式。
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * @inheritDoc
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        me.measureMode = null;
    },

    /**
     * @function SuperMap.MeasureService.processAsync
     * @description 负责将客户端的量算参数传递到服务端。
     * @param params - {SuperMap.MeasureParameters} 量算参数。
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this,
            geometry = params.geometry,
            pointsCount = 0,
            point2ds = null,
            urlParameters = null,
            end = null;
        if (!geometry) {
            return;
        }
        end = me.url.substr(me.url.length - 1, 1);
        if (me.measureMode === SuperMap.MeasureMode.AREA) {
            if (me.isInTheSameDomain) {
                me.url += ((end === "/") ? "area.json?" : "/area.json?");
            }
            else {
                me.url += ((end === "/") ? "area.jsonp?" : "/area.jsonp?");
            }
        } else {
            if (me.isInTheSameDomain) {
                me.url += ((end === "/") ? "distance.json?" : "/distance.json?");
            }
            else {
                me.url += ((end === "/") ? "distance.jsonp?" : "/distance.jsonp?");
            }
        }
        var serverGeometry = SuperMap.REST.ServerGeometry.fromGeometry(geometry);
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
            }
            else if (typeof (params.prjCoordSys) === "string") {
                prjCoordSysTemp = '{"epsgCode"' + params.prjCoordSys.substring(params.prjCoordSys.indexOf(":"), params.prjCoordSys.length) + "}";
            }
            paramsTemp = {"point2Ds": SuperMap.Util.toJSON(point2ds), "unit": params.unit, "prjCoordSys": prjCoordSysTemp};
        }
        else {
            paramsTemp = {"point2Ds": SuperMap.Util.toJSON(point2ds), "unit": params.unit};
        }

        me.request({
            method: "GET",
            params: paramsTemp,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });

    },

    CLASS_NAME: "SuperMap.MeasureService"
});

module.exports = SuperMap.MeasureService;