/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {TransferPreference, TransferTactic} from '../REST';

/**
 * @class TransferSolutionParameters
 * @deprecatedclass SuperMap.TransferSolutionParameters
 * @category  iServer TrafficTransferAnalyst TransferSolutions
 * @classdesc 交通换乘方案查询参数类。此类用于设置交通换乘方案查询的查询方式、交通换乘策略类型、
 * 乘车偏好、避让路线和站点、优先路线和站点、出行时间、步行与公交的消耗权重比等参数。
 * @param {Object} options - 参数。
 * @param {Array.<GeometryPoint|L.Point|L.LatLng|ol.geom.Point|mapboxgl.LngLat|Array.<number>|number>} options.points - 两种查询方式：按照公交站点的起止 ID 进行查询和按照起止点的坐标进行查询。
 * @param {number} [options.solutionCount=6] - 乘车方案的数量。
 * @param {TransferTactic} [options.transferTactic=TransferTactic.LESS_TIME] - 交通换乘策略类型，包括时间最短、距离最短、最少换乘、最少步行四种选择。
 * @param {TransferPreference} [options.transferPreference=TransferPreference.NONE] - 乘车偏好枚举。
 * @param {number} [options.walkingRatio=10] - 步行与公交的消耗权重比。
 * @param {Array.<number>} [options.evadeLines] - 避让路线的 ID。
 * @param {Array.<number>} [options.evadeStops] - 避让站点的 ID。
 * @param {Array.<number>} [options.priorLines] - 优先路线的 ID。
 * @param {Array.<number>} [options.priorStops] - 优先站点的 ID。
 * @param {string} [options.travelTime] - 出行的时间。
 * @usage
 */
export class TransferSolutionParameters {

    constructor(options) {
        options = options || {};
        /**
         *  @member {number} [TransferSolutionParameters.prototype.solutionCount=6]
         *  @description 乘车方案的数量。
         */
        this.solutionCount = 6;
        /**
         * @member {TransferPreference} [TransferSolutionParameters.prototype.transferPreference=TransferPreference.NONE]
         *  @description 乘车偏好枚举。
         */
        this.transferPreference = TransferPreference.NONE;

        /**
         *  @member {TransferTactic} [TransferSolutionParameters.prototype.transferTactic=TransferTactic|TransferTactic.LESS_TIME]
         *  @description 交通换乘策略类型，包括时间最短、距离最短、最少换乘、最少步行四种选择。
         */
        this.transferTactic = TransferTactic.LESS_TIME;

        /**
         *  @member {number} [TransferSolutionParameters.prototype.walkingRatio=10]
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
         *  @member {Array.<GeometryPoint|L.Point|L.LatLng|ol.geom.Point|mapboxgl.LngLat|Array.<number>|number>} TransferSolutionParameters.prototype.points
         *  @description 两种查询方式：</br>
         *           1. 按照公交站点的起止 ID 进行查询，则 points 参数的类型为 int[]，形如：[起点 ID、终点 ID]，公交站点的 ID 对应服务提供者配置中的站点 ID 字段；<br>
         *           2. 按照起止点的坐标进行查询，则 points 参数的类型为 Point2D[]，形如：[{"x":44,"y":39},{"x":45,"y":40}]。
         */
        this.points = false;

        /**
         * @member {Array.<number>} [TransferSolutionParameters.prototype.evadeLinesnull]
         * @description 避让路线 ID 集合。<br>
         * 如果设置某些线路避让线路，则进行换乘分析时不会使用这些线路，例如，设置123路为避让线路，进行公交换乘分析，
         * 即使乘坐该线路可以到达目的地，换乘方案中也不会包含乘坐该线路的方案。<br>
         * 注意：如果将某线路同时设置为优先或者避让的线路，系统将以避让线路来处理。
         * */
        this.evadeLines = null;

        /**
         * @member {Array.<number>} [TransferSolutionParameters.prototype.evadeStops=TransferLine]
         * @description 避让站点 ID 集合。<br>
         * 如果设置某些线路避让站点，则进行换乘分析方案中不会包含这些站点，例如，设置天安门西站为避让站点，
         * 那么公交换乘方案中就不会包含该站点，也就是不会在该站点换乘或下车。<br>
         * 注意：如果将某站点同时设置为优先或者避让的站点，系统将以避让站点来处理。另外，避让的站点必须是线路上的站点，
         * 例如，某站点在位置上位于某条线路上，但在关系表中不存在二者的对应关系，那么设置该站点为避让站点是无效的，
         * 换乘分析的结果中仍有可能包含该站点。
         * */
        this.evadeStops = null;

        /**
         * @member {Array.<number>} [TransferSolutionParameters.prototype.priorLines]
         * @description 优先路线 ID 集合。<br>
         * 如果设置某些线路为优先线路，则进行换乘分析时会优先考虑这些线路，但最优换乘方案是由多个参数共同决定的，因此并不一定会包含这些线路。
         * */
        this.priorLines = null;

        /**
         * @member {Array.<number>} [TransferSolutionParameters.prototype.priorStops]
         * @description 优先站点 ID 集合。<br>
         * 如果设置某些线路为优先站点，则进行换乘分析时会优先考虑这些站点，但最优换乘方案是由多个参数共同决定的，
         * 因此并不一定会包含这些站点。另外，优先的站点必须是线路上的站点，例如，某站点在位置上位于某条线路上，
         * 但在关系表中不存在二者的对应关系，那么设置该站点为优先站点是无效的，换乘分析时可能不会包含通过该站点的线路。
         * */
        this.priorStops = null;

        /**
         * @member {string} TransferSolutionParameters.prototype.travelTime
         * @description 出行的时间；格式是："小时:分钟"，如："08:30"。如果设置了该参数，在分析时，则会考虑线路的首末班车时间的限制，即在返回的结果中会提示公交的首末班发车时间。
         */
        this.travelTime = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.TransferSolutionParameters";
    }

    /**
     * @function TransferSolutionParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        Util.reset(this);
    }


    /**
     * @function TransferSolutionParameters.toJsonParameters
     * @description 将 {@link TransferSolutionParameters} 对象参数转换为 JSON 字符串。
     * @param {TransferSolutionParameters} params - 交通换乘参数。
     * @returns {string} 转化后的 JSON 字符串。
     */
    static toJson(params) {
        if (params) {
            return Util.toJSON(params);
        }
    }

}

