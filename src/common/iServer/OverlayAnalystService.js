import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {DatasetOverlayAnalystParameters} from './DatasetOverlayAnalystParameters';
import {GeometryOverlayAnalystParameters} from './GeometryOverlayAnalystParameters';

/**
 * @class SuperMap.OverlayAnalystService
 * @category  iServer SpatialAnalyst OverlayAnalyst
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

export class OverlayAnalystService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);

        /**
         * @member SuperMap.OverlayAnalystService.prototype.mode -{string}
         * @description 叠加分析类型
         */
        this.mode = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.OverlayAnalystService";
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
        if (end !== '/') {
            me.url += "/";
        }

        if (parameter instanceof DatasetOverlayAnalystParameters) {
            me.mode = "datasets";
            me.url += 'datasets/' + parameter.sourceDataset + '/overlay.json?returnContent=true';
            DatasetOverlayAnalystParameters.toObject(parameter, parameterObject);
        } else if (parameter instanceof GeometryOverlayAnalystParameters) {
            me.mode = "geometry";
            //支持传入多个几何要素进行叠加分析
            if(parameter.operateGeometries && parameter.sourceGeometries){
                me.url += 'geometry/overlay/batch.json?returnContent=true&ignoreAnalystParam=true';
            }else {
                me.url += 'geometry/overlay.json?returnContent=true';
            }
            GeometryOverlayAnalystParameters.toObject(parameter, parameterObject);
        }

        var jsonParameters = Util.toJSON(parameterObject);
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
}

SuperMap.OverlayAnalystService = OverlayAnalystService;