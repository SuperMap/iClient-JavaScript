/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class TransferPathParameters
 * @deprecatedclass SuperMap.TransferPathParameters
 * @category  iServer TrafficTransferAnalyst TransferPath
 * @classdesc 交通换乘线路查询参数类。此类用于设置换乘分段内可乘车的路线集合、换乘路线查询方式等参数。
 * @param {Object} options - 参数。
 * @param {Array.<TransferLine>} options.transferLines - 本换乘分段内可乘车的路线集合。
 * @param {Array.<GeometryPoint|L.Point|L.LatLng|ol.geom.Point|mapboxgl.LngLat|Array.<number>|number>} options.points - 两种查询方式：按照公交站点的起止 ID 进行查询和按照起止点的坐标进行查询。
 * @usage
 */
export class TransferPathParameters {

    constructor(options) {
        options = options || {};
        /**
         * @member {Array.<TransferLine>} TransferPathParameters.prototype.transferLines
         * @description 本换乘分段内可乘车的路线集合，通过交通换乘方案查询得到。
         */
        this.transferLines = null;


        /**
         *  @member {Array.<GeometryPoint|L.Point|L.LatLng|ol.geom.Point|mapboxgl.LngLat|Array.<number>|number>} TransferPathParameters.prototype.points
         *  @description 两种查询方式：<br>
         *           1. 按照公交站点的起止 ID 进行查询，则 points 参数的类型为 int[]，形如：[起点 ID、终点 ID]，公交站点的 ID 对应服务提供者配置中的站点 ID 字段；<br>
         *           2. 按照起止点的坐标进行查询，则 points 参数的类型为 Point2D[]，形如：[{"x":44,"y":39},{"x":45,"y":40}]。
         */
        this.points = null;

        Util.extend(this, options);

       this.CLASS_NAME = "SuperMap.TransferPathParameters";
    }

    /**
     * @function TransferPathParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        Util.reset(this);
    }

    /**
     * @function TransferPathParameters.toJson
     * @description 将 {@link TransferPathParameters} 对象参数转换为 JSON 字符串。
     * @param {TransferPathParameters} params - 交通换乘参数。
     * @returns {string} 转化后的 JSON 字符串。
     */
    static toJson(params) {
        if (params) {
            return Util.toJSON(params);
        }
    }

}
