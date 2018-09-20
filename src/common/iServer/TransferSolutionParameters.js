/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {TransferPreference, TransferTactic} from '../REST';

/**
 * @class SuperMap.TransferSolutionParameters
 * @category  iServer TrafficTransferAnalyst TransferSolutions
 * @classdesc 交通换乘方案查询参数类。
 * @param {Object} options - 参数。
 * @param {Array.<(SuperMap.Geometry.Point|L.Point|L.LatLng|ol.geom.Point|number)>} options.points - 两种查询方式：按照公交站点的起止ID进行查询和按照起止点的坐标进行查询。
 * @param {number} [options.solutionCount=6] - 乘车方案的数量。
 * @param {SuperMap.TransferTactic} [options.transferTactic=SuperMap.TransferTactic.LESS_TIME] - 交通换乘策略类型，包括时间最短、距离最短、最少换乘、最少步行四种选择。
 * @param {SuperMap.TransferPreference} [options.transferPreference=SuperMap.TransferPreference.NONE] - 乘车偏好枚举。
 * @param {number} [options.walkingRatio=10] - 步行与公交的消耗权重比。
 * @param {Array.<number>} [options.evadeLines] - 避让路线的 ID。
 * @param {Array.<number>} [options.evadeStops] - 避让站点的 ID。
 * @param {Array.<number>} [options.priorLines] - 优先路线的 ID。
 * @param {Array.<number>} [options.priorStops] - 优先站点的 ID。
 * @param {string} [options.travelTime] - 出行的时间。
 */
export class TransferSolutionParameters {

    constructor(options) {
        options = options || {};
        /**
         *  @member {number} [SuperMap.TransferSolutionParameters.prototype.solutionCount=6]
         *  @description 乘车方案的数量。
         */
        this.solutionCount = 6;
        /**
         * @member {SuperMap.TransferPreference} [SuperMap.TransferSolutionParameters.prototype.transferPreference=SuperMap.TransferPreference.NONE]
         *  @description 乘车偏好枚举。
         */
        this.transferPreference = TransferPreference.NONE;

        /**
         *  @member {SuperMap.TransferTactic} [SuperMap.TransferSolutionParameters.prototype.transferTactic=TransferTactic|SuperMap.TransferTactic.LESS_TIME]
         *  @description 交通换乘策略类型，包括时间最短、距离最短、最少换乘、最少步行四种选择。
         */
        this.transferTactic = TransferTactic.LESS_TIME;

        /**
         *  @member {number} [SuperMap.TransferSolutionParameters.prototype.walkingRatio=10]
         *  @description 步行与公交的消耗权重比。此值越大，则步行因素对于方案选择的影响越大。例如：</br>
         *  例如现在有两种换乘方案（在仅考虑消耗因素的情况下）：</br>
         *  方案1：坐车 10 公里，走路 1 公里；</br>
         *  方案2：坐车 15 公里，走路 0.5 公里；</br>
         *  1. 假设权重比为 15：</br>
         *     •方案 1 的总消耗为：10 + 1*15 = 25</br>
         *     •方案 2 的总消耗为：15 + 0.5*15 = 22.5</br>
         *  此时方案 2 消耗更低。</br>
         *  2. 假设权重比为2：</br>
         *     •方案 1 的总消耗为：10+1*2 = 12</br>
         *     •方案 2 的总消耗为：15+0.5*2 = 17</br>
         *  此时方案 1 消耗更低。</br>
         */

        this.walkingRatio = null;

        /**
         *  @member {Array.<(SuperMap.Geometry.Point|L.Point|L.LatLng|ol.geom.Point|string)>} SuperMap.TransferSolutionParameters.prototype.points
         *  @description 两种查询方式：</br>
         *           1. 按照公交站点的起止 ID 进行查询，则 points 参数的类型为 int[]，形如：[起点 ID、终点 ID]，公交站点的 ID 对应服务提供者配置中的站点 ID 字段；
         *           2. 按照起止点的坐标进行查询，则 points 参数的类型为 Point2D[]，形如：[{"x":44,"y":39},{"x":45,"y":40}]。
         */
        this.points = false;

        /**
         * @member {Array.<number>} [SuperMap.TransferSolutionParameters.prototype.evadeLinesnull]
         * @description 避让路线 ID。
         * */
        this.evadeLines = null;

        /**
         * @member {Array.<number>} [SuperMap.TransferSolutionParameters.prototype.evadeStops=TransferLine]
         * @description 避让站点 ID。
         * */
        this.evadeStops = null;

        /**
         * @member {Array.<number>} [SuperMap.TransferSolutionParameters.prototype.priorLines]
         * @description 优先路线 ID。
         * */
        this.priorLines = null;

        /**
         * @member {Array.<number>} [SuperMap.TransferSolutionParameters.prototype.priorStops]
         * @description 优先站点 ID。
         * */
        this.priorStops = null;

        /**
         * @member {string} SuperMap.TransferSolutionParameters.prototype.travelTime
         * @description 出行的时间； 格式是："小时:分钟"，如："08:30"。如果设置了该参数，在分析时，则会考虑线路的首末班车时间的限制，即在返回的结果中会提示公交的首末班发车时间。
         */
        this.travelTime = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.TransferSolutionParameters";
    }

    /**
     * @function SuperMap.TransferSolutionParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        Util.reset(this);
    }


    /**
     * @function SuperMap.TransferSolutionParameters.toJsonParameters
     * @description 将 {@link SuperMap.TransferSolutionParameters} 对象参数转换为 JSON 字符串。
     * @param {SuperMap.TransferSolutionParameters} params - 交通换乘参数。
     * @returns {string} 转化后的 JSON 字符串。
     */
    static toJson(params) {
        if (params) {
            return Util.toJSON(params);
        }
    }

}

SuperMap.TransferSolutionParameters = TransferSolutionParameters;
