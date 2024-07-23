/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {DatasetThiessenAnalystParameters} from './DatasetThiessenAnalystParameters';
import {GeometryThiessenAnalystParameters} from './GeometryThiessenAnalystParameters';
import { DataFormat } from '../REST';
/**
 * @class ThiessenAnalystService
 * @deprecatedclass SuperMap.ThiessenAnalystService
 * @category iServer SpatialAnalyst ThiessenPolygonAnalyst
 * @classdesc 泰森多边形分析服务类。泰森多边形又称为 Voronoi 图，是由一组连接两邻点直线的垂直平分线组成的连续多边形组成。
 * 泰森多边形可用于定性分析、统计分析、邻近分析等，通过创建泰森多边形创建的多边形要素可对可用空间进行划分并将其分配给最近的点要素。
 * 泰森多边形有时会用于替代插值操作，以便将一组样本测量值概化到最接近他们的区域。使用泰森多边形可将取自一组气候测量仪的测量值概化到周围区域，还可为一组店铺快速建立服务区模型等。例如：<br>
 * 1.可用离散点的性质来描述泰森多边形区域的性质；<br>
 * 2.可用离散点的数据来计算泰森多边形区域的数据；<br>
 * 3.判断一个离散点与其它哪些离散点相邻时，可根据泰森多边形直接得出，且若泰森多边形是 n 边形，则就与 n 个离散点相邻；<br>
 * 4.当某一数据点落入某一泰森多边形中时，它与相应的离散点最邻近，无需计算距离。
 * 
 * 该类负责将客户设置的泰森多边形分析参数传递给服务端，并接收服务端返回的分析结果数据。
 * 泰森多边形分析结果通过该类支持的事件的监听函数参数获取。
 * 泰森多边形分析的参数支持两种，当参数为 {@link DatasetThiessenAnalystParameters} 类型
 * 时，执行数据集泰森多边形分析，当参数为 {@link GeometryThiessenAnalystParameters} 类型时，
 * 执行几何对象泰森多边形分析。
 * @param {string} url - 服务地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {SpatialAnalystBase}
 * @example 例如：
 * (start code)
 * var myThiessenAnalystService = new ThiessenAnalystService(url);
 * (end)
 * @usage
 */
export class ThiessenAnalystService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);
        /**
         * @member {string} ThiessenAnalystService.prototype.mode
         * @description 缓冲区分析类型
         */
        this.mode = null;
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.ThiessenAnalystService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
        this.mode = null;
    }

    /**
     * @function ThiessenAnalystService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {DatasetThiessenAnalystParameters|GeometryThiessenAnalystParameters} parameter - 泰森多边形分析参数基类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(parameter, callback) {
        var parameterObject = {};
        var me = this;
        if (parameter instanceof DatasetThiessenAnalystParameters) {
            me.mode = "datasets";
            me.url = Util.urlPathAppend(me.url, 'datasets/' + parameter.dataset + '/thiessenpolygon');
            DatasetThiessenAnalystParameters.toObject(parameter, parameterObject);
        } else if (parameter instanceof GeometryThiessenAnalystParameters) {
            me.mode = "geometry";
            me.url = Util.urlPathAppend(me.url, 'geometry/thiessenpolygon');
            GeometryThiessenAnalystParameters.toObject(parameter, parameterObject);
        }

        var jsonParameters = Util.toJSON(parameterObject);
        this.returnContent = true;
        return me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: callback,
            failure: callback
        });
    }

    dataFormat() {
      return [DataFormat.GEOJSON, DataFormat.ISERVER, DataFormat.FGB];
    }
}
