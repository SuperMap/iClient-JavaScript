/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {InterpolationRBFAnalystParameters} from './InterpolationRBFAnalystParameters';
import {InterpolationDensityAnalystParameters} from './InterpolationDensityAnalystParameters';
import {InterpolationIDWAnalystParameters} from './InterpolationIDWAnalystParameters';
import {InterpolationKrigingAnalystParameters} from './InterpolationKrigingAnalystParameters';
import {InterpolationAnalystParameters} from './InterpolationAnalystParameters';

/**
 * @class InterpolationAnalystService
 * @deprecatedclass SuperMap.InterpolationAnalystService
 * @category iServer SpatialAnalyst InterpolationAnalyst
 * @classdesc 插值分析服务类。
 * 插值分析可以将有限的采样点数据，通过插值算法对采样点周围的数值情况进行预测，可以掌握研究区域内数据的总体分布状况，从而使采样的离散点不仅仅反映其所在位置的数值情况，
 * 还可以反映区域的数值分布。目前 SuperMap iServer 的插值功能提供从点数据集插值得到栅格数据集的功能，支持以下常用的内插方法，
 * 包括：点密度插值、反距离加权插值、克吕金插值法、样条（径向基函数）插值。<br>
 * 
 * 点密度插值:对点数据集进行插值后，可以得到反映源数据集数据点分布密度的栅格数据集。点密度插值字段的含义为每个插值点在插值过程中的权重。<br>
 * 反距离加权插值（Inverse Distance Weighted ，IDW）：通过计算附近区域离散点群的平均值来估算单元格的值，生成栅格数据集。这是一种简单有效的数据内插方法，运算速度相对较快。反距离加权算法假设离预测点越近的值对预测点的影响越大，即预测某点的值时，其周围点的权值与距离预测点的距离成反比。<br>
 * 克吕金插值（Kriging）：地统计学中的一种空间数据内插处理方法，主要的目的是利用各数据点间变异数（variance）的大小来推求某一未知点与各已知点的权重关系，再由各数据点的值和其与未知点的权重关系推求未知点的值。<br>
 * 样条插值（径向基函数插值，Radial Basis Function）：使用径向基函数进行曲面逼近的一种方法。该方法假设变化是平滑的，它有两个特点： 1、表面必须精确通过采样点； 2、表面必须有最小曲率。样条插值在利用大量采样点创建有视觉要求的平滑表面方面具有优势，但难以对误差进行估计，如样点在较短的水平距离内表面值发生急剧变化，或存在测量误差及具有不确定性时，不适合使用此算法。
 * @param {string} url - 服务地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {SpatialAnalystBase}
 * @example 例如：
 * (start code)
 * var myTInterpolationAnalystService = new InterpolationAnalystService(url);
 * (end)
 * @usage
 */
export class InterpolationAnalystService extends SpatialAnalystBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {string} InterpolationAnalystService.prototype.mode
         * @description 插值分析类型。
         */

        this.mode = null;
        if (options) {
            Util.extend(this, options);
        }
    }

    /**
     * @function InterpolationAnalystService.prototype.destroy
     * @description 释放资源,将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        this.mode = null;
        this.CLASS_NAME = "SuperMap.InterpolationAnalystService";
    }

    /**
     * @function InterpolationAnalystService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {InterpolationDensityAnalystParameters|InterpolationIDWAnalystParameters|InterpolationRBFAnalystParameters|InterpolationKrigingAnalystParameters} parameter - 插值分析参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(parameter, callback) {
        var parameterObject = {};
        var me = this;

        if (parameter instanceof InterpolationDensityAnalystParameters) {
            me.mode = 'Density';
            if (parameter.InterpolationAnalystType === 'geometry') {
                me.url = Util.urlPathAppend(me.url, 'geometry/interpolation/density');
            } else {
                me.url = Util.urlPathAppend(me.url, 'datasets/' + parameter.dataset + '/interpolation/density');
            }
        } else if (parameter instanceof InterpolationIDWAnalystParameters) {
            me.mode = 'IDW';
            if (parameter.InterpolationAnalystType === 'geometry') {
                me.url = Util.urlPathAppend(me.url, 'geometry/interpolation/idw');
            } else {
                me.url = Util.urlPathAppend(me.url, 'datasets/' + parameter.dataset + '/interpolation/idw');
            }
        } else if (parameter instanceof InterpolationRBFAnalystParameters) {
            me.mode = 'RBF';
            if (parameter.InterpolationAnalystType === 'geometry') {
                me.url = Util.urlPathAppend(me.url, 'geometry/interpolation/rbf');
            } else {
                me.url = Util.urlPathAppend(me.url, 'datasets/' + parameter.dataset + '/interpolation/rbf');
            }
        } else if (parameter instanceof InterpolationKrigingAnalystParameters) {
            me.mode = 'Kriging';
            if (parameter.InterpolationAnalystType === 'geometry') {
                me.url = Util.urlPathAppend(me.url, 'geometry/interpolation/kriging');
            } else {
                me.url = Util.urlPathAppend(me.url, 'datasets/' + parameter.dataset + '/interpolation/kriging');
            }
        }
        InterpolationAnalystParameters.toObject(parameter, parameterObject);
        var jsonParameters = Util.toJSON(parameterObject);
        me.url = Util.urlAppend(me.url, 'returnContent=true');

        return me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: callback,
            failure: callback
        });
    }
}
