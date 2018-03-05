import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {InterpolationRBFAnalystParameters} from './InterpolationRBFAnalystParameters';
import {InterpolationDensityAnalystParameters} from './InterpolationDensityAnalystParameters';
import {InterpolationIDWAnalystParameters} from './InterpolationIDWAnalystParameters';
import {InterpolationKrigingAnalystParameters} from './InterpolationKrigingAnalystParameters';
import {InterpolationAnalystParameters} from './InterpolationAnalystParameters';

/**
 * @class SuperMap.InterpolationAnalystService
 * @category  iServer SpatialAnalyst InterpolationAnalyst
 * @classdesc
 * 插值分析服务类
 * 插值分析可以将有限的采样点数据，通过插值算法对采样点周围的数值情况进行预测，可以掌握研究区域内数据的总体分布状况，从而使采样的离散点不仅仅反映其所在位置的数值情况，还可以反映区域的数值分布。目前SuperMap iServer的插值功能提供从点数据集插值得到栅格数据集的功能，支持以下常用的内插方法，包括：反距离加权插值、克吕金（Kriging）插值法、样条（径向基函数，Radial Basis Function）插值、点密度插值。
 * @param url - {string} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
 * @param options - {Object} 可选参数。如</br>
 *        eventListeners - {Object} 需要被注册的监听器对象。
 *
 * @extends SuperMap.SpatialAnalystBase
 * @example 例如：
 * (start code)
 * var myTInterpolationAnalystService = new SuperMap.InterpolationAnalystService(url);
 * myTInterpolationAnalystService.events.on({
     *     "processCompleted": processCompleted,
     *     "processFailed": processFailed
     *     }
 * );
 * (end)
 *
 */
export class InterpolationAnalystService extends SpatialAnalystBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member SuperMap.InterpolationAnalystService.prototype.mode -{string}
         * @description 插值分析类型。
         */

        this.mode = null;
        if (options) {
            Util.extend(this, options);
        }
    }

    /**
     * @function SuperMap.InterpolationAnalystService.prototype.destroy
     * @description 释放资源,将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        this.mode = null;
        this.CLASS_NAME = "SuperMap.InterpolationAnalystService";
    }

    /**
     * @function SuperMap.InterpolationAnalystService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param  parameter - {SuperMap.InterpolationAnalystParameters}
     */
    processAsync(parameter) {
        var parameterObject = {};
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end !== '/') {
            me.url += "/";
        }

        if (parameter instanceof InterpolationDensityAnalystParameters) {
            me.mode = "Density";
            if (parameter.InterpolationAnalystType === "geometry") {
                me.url += 'geometry/interpolation/density';
            } else {
                me.url += 'datasets/' + parameter.dataset + '/interpolation/density';
            }
        } else if (parameter instanceof InterpolationIDWAnalystParameters) {
            me.mode = "IDW";
            if (parameter.InterpolationAnalystType === "geometry") {
                me.url += 'geometry/interpolation/idw';
            } else {
                me.url += 'datasets/' + parameter.dataset + '/interpolation/idw';
            }
        } else if (parameter instanceof InterpolationRBFAnalystParameters) {
            me.mode = "RBF";
            if (parameter.InterpolationAnalystType === "geometry") {
                me.url += 'geometry/interpolation/rbf';
            } else {
                me.url += 'datasets/' + parameter.dataset + '/interpolation/rbf';
            }
        } else if (parameter instanceof InterpolationKrigingAnalystParameters) {
            me.mode = "Kriging";
            if (parameter.InterpolationAnalystType === "geometry") {
                me.url += 'geometry/interpolation/kriging';
            } else {
                me.url += 'datasets/' + parameter.dataset + '/interpolation/kriging';
            }
        }
        InterpolationAnalystParameters.toObject(parameter, parameterObject);
        var jsonParameters = Util.toJSON(parameterObject);
        me.url += '.json?returnContent=true';

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
}

SuperMap.InterpolationAnalystService = InterpolationAnalystService;