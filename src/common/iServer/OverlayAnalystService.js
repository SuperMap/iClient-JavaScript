import SuperMap from '../SuperMap';
import SpatialAnalystBase from './SpatialAnalystBase';
import DatasetOverlayAnalystParameters from './DatasetOverlayAnalystParameters';
import GeometryOverlayAnalystParameters from './GeometryOverlayAnalystParameters';
/**
 * @class SuperMap.OverlayAnalystService
 * @classdesc
 * 叠加分析服务类
 * 该类负责将客户设置的叠加分析参数传递给服务端，并接收服务端返回的叠加分析结果数据。
 * 叠加分析结果通过该类支持的事件的监听函数参数获取
 * @param url - {string} 服务的访问地址。如http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
 * @param options - {Object} 可选参数。如:</br>
 *        eventListeners - {Object} 需要被注册的监听器对象。
 * @extends SuperMap.CommonServiceBase
 * @example 例如：
 * (start code)
 * var myOverlayAnalystService = new SuperMap.OverlayAnalystService(url, {
     *     eventListeners: {
     *	       "processCompleted": OverlayCompleted,
     *		   "processFailed": OverlayFailed
     *		   }
     * });
 * (end)
 */

export default  class OverlayAnalystService extends SpatialAnalystBase {

    /**
     * @member SuperMap.OverlayAnalystService.prototype.mode -{string}
     * @description 叠加分析类型
     */
    mode = null;

    constructor(url, options) {
        super(url, options);
        var me = this;
        if (options) {
            SuperMap.Util.extend(me, options);
        }
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
        this.mode = null;
    }

    /**
     * @function SuperMap.OverlayAnalystService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param parameter - {SuperMap.OverlayAnalystParameters}
     */
    processAsync(parameter) {
        var parameterObject = {};
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end === '/') {

        } else {
            me.url += "/";
        }

        if (parameter instanceof DatasetOverlayAnalystParameters) {
            me.mode = "datasets";
            me.url += 'datasets/' + parameter.sourceDataset + '/overlay';
            DatasetOverlayAnalystParameters.toObject(parameter, parameterObject);
        }
        else if (parameter instanceof GeometryOverlayAnalystParameters) {
            me.mode = "geometry";
            me.url += 'geometry/overlay';
            GeometryOverlayAnalystParameters.toObject(parameter, parameterObject);
        }

        var jsonParameters = SuperMap.Util.toJSON(parameterObject);
        me.url += '.json?returnContent=true';
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    CLASS_NAME = "SuperMap.OverlayAnalystService"
}

SuperMap.OverlayAnalystService = OverlayAnalystService;