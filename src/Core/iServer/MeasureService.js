/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.MeasureService
 * 量算服务类。
 * 该类负责将量算参数传递到服务端，并获取服务端返回的量算结果。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('./ServiceBase');
require('./MeasureParameters');
SuperMap.REST.MeasureService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * APIProperty: measureMode
     * {<MeasureMode>} 量算模式，包括距离量算模式和面积量算模式。默认值为：MeasureMode.DISTANCE 。
     */
    measureMode: MeasureMode.DISTANCE,

    /**
     * Constructor: SuperMap.REST.MeasureService
     * 量算服务类构造函数。
     *
     * 例如：
     * (start code)
     * var myMeasuerService = new SuperMap.REST.MeasureService(url, {
     *      measureMode: MeasureMode.DISTANCE,
     *      eventListeners:{
     *          "processCompleted": measureCompleted
     *      }
     * });
     * (end)
     *
     * Parameters:
     * url - {String} 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     * measureMode - {<MeasureMode>} 量算模式，包括距离量算模式和面积量算模式。
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用的资源属性置空。
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        me.measureMode = null;
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的量算参数传递到服务端。
     *
     * Parameters:
     * params - {<MeasureParameters>} 量算参数。
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
        if (me.measureMode === MeasureMode.AREA) {
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

    CLASS_NAME: "SuperMap.REST.MeasureService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.MeasureService(url, options);
};