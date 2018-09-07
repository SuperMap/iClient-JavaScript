/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import './TransferLine';

/**
 * @class SuperMap.TransferPathParameters
 * @category  iServer TrafficTransferAnalyst TransferPaths
 * @classdesc 交通换乘线路查询参数类。
 * @param {Object} options - 参数。
 * @param {Array.<SuperMap.TransferLine>} options.transferLines - 本换乘分段内可乘车的路线集合。
 * @param {Array.<(string|SuperMap.Geometry.Point|L.Point|L.LatLng|ol.geom.Point)>} options.points - 两种查询方式：按照公交站点的起止 ID 进行查询和按照起止点的坐标进行查询。
 *
 */
export class TransferPathParameters {

    constructor(options) {
        options = options || {};
        /**
         * @member {Array.<SuperMap.TransferLine>} SuperMap.TransferPathParameters.prototype.transferLines
         * @description 本换乘分段内可乘车的路线集合，通过交通换乘方案查询得到。
         */
        this.transferLines = null;


        /**
         *  @member {Array.<(string|SuperMap.Geometry.Point|L.Point|L.LatLng|ol.geom.Point)>} SuperMap.TransferPathParameters.prototype.points
         *  @description 两种查询方式：<br>
         *           1. 按照公交站点的起止ID进行查询，则 points 参数的类型为 int[]，形如：[起点ID、终点ID]，公交站点的 ID 对应服务提供者配置中的站点 ID 字段；
         *           2. 按照起止点的坐标进行查询，则 points 参数的类型为 Point2D[]，形如：[{"x":44,"y":39},{"x":45,"y":40}]。
         */
        this.points = null;

        Util.extend(this, options);

       this.CLASS_NAME = "SuperMap.TransferPathParameters";
    }

    /**
     * @function SuperMap.TransferPathParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        Util.reset(this);
    }

    /**
     * @function SuperMap.TransferPathParameters.toJson
     * @description 将 {@link SuperMap.TransferPathParameters} 对象参数转换为 JSON 字符串。
     * @param {SuperMap.TransferPathParameters} params - 交通换乘参数。
     * @returns {string} 转化后的 JSON 字符串。
     */
    static toJson(params) {
        if (params) {
            return Util.toJSON(params);
        }
    }

}

SuperMap.TransferPathParameters = TransferPathParameters;