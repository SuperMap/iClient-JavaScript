import Util from '../core/Util';
import ServiceBase from './ServiceBase';
import CommonMeasureService from '../../common/iServer/MeasureService';
/**
 * @class ol.supermap.MeasureService
 * @description 距离测量服务
 * @augments ol.supermap.ServiceBase
 * @param url - {String} 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 *         measureMode - {MeasureMode} 量算模式，包括距离量算模式和面积量算模式。
 */
export default class MeasureService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.MeasureService.measureDistance
     * @description 测距
     * @param params -{MeasureParameters} 测量相关参数类
     * @param callback - {function} 回调函数
     */
    measureDistance(params, callback) {
        this.measure(params, 'DISTANCE', callback);
    }

    /**
     * @function ol.supermap.MeasureService.measureArea
     * @description 测面积
     * @param params -{MeasureParameters} 测量相关参数类
     * @param callback - {function} 回调函数
     */
    measureArea(params, callback) {
        this.measure(params, 'AREA', callback);
    }

    measure(params, type, callback) {
        var me = this;
        var measureService = new CommonMeasureService(me.url, {
            serverType: me.options.serverType,
            measureMode: type,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        measureService.processAsync(me._processParam(params));
        return me;
    }

    _processParam(params) {
        if (params && params.geometry) {
            params.geometry = Util.toSuperMapGeometry(JSON.parse((new ol.format.GeoJSON()).writeGeometry(params.geometry)));
        }
        return params;
    }
}
ol.supermap.MeasureService = MeasureService;