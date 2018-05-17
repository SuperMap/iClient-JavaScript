import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {TransferPreference, TransferTactic} from '../REST';

/**
 * @class SuperMap.TransferSolutionParameters
 * @category  iServer TrafficTransferAnalyst TransferSolutions
 * @classdesc 交通换乘方案查询参数类。
 * @param {Object} options - 参数。</br>
 * @param {number} [options.solutionCount=6] - 乘车方案的数量。</br>
 * @param {SuperMap.TransferTactic} options.transferTactic - 交通换乘策略类型，包括时间最短、距离最短、最少换乘、最少步行四种选择。</br>
 * @param {SuperMap.TransferPreference} options.transferPreference - 乘车偏好枚举。</br>
 * @param {number} [options.walkingRatio=10] - 步行与公交的消耗权重比。</br>
 * @param {Array.<(SuperMap.Geometry.Point|L.Point|L.LatLng|ol.geom.Point|number)>} options.points - 两种查询方式：按照公交站点的起止ID进行查询和按照起止点的坐标进行查询。</br>
 * @param {Array.<number>} [options.evadeLines=null] - 避让路线的ID。</br>
 * @param {Array.<number>} [options.evadeStops=null] - 避让站点的ID。</br>
 * @param {Array.<number>} [options.priorLines=null] - 优先路线的ID。</br>
 * @param {Array.<number>} [options.priorStops=null] - 优先站点的ID。</br>
 * @param {string} options.travelTime - 出行的时间。</br>
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
         * @member {SuperMap.TransferPreference} [SuperMap.TransferSolutionParameters.prototype.transferPreference=TransferPreference|SuperMap.TransferPreference.NONE]
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
         *  方案1：坐车10公里，走路1公里；</br>
         *  方案2：坐车15公里，走路0.5公里；</br>
         *        1. 假设权重比为15：
         *           •方案1的总消耗为：10 + 1*15 = 25
         *           •方案2的总消耗为：15 + 0.5*15 = 22.5
         *           此时方案2消耗更低。
         *        2. 假设权重比为2：
         *           •方案1的总消耗为：10+1*2 = 12
         *           •方案2的总消耗为：15+0.5*2 = 17
         *           此时方案1消耗更低。
         */

        this.walkingRatio = null;

        /**
         *  @member {Array.<(SuperMap.Geometry.Point|L.Point|L.LatLng|ol.geom.Point|string)>} SuperMap.TransferSolutionParameters.prototype.points
         *  @description 两种查询方式：
         *           1. 按照公交站点的起止ID进行查询，则points参数的类型为int[]，形如：[起点ID、终点ID]，公交站点的ID对应服务提供者配置中的站点ID字段；
         *           2. 按照起止点的坐标进行查询，则points参数的类型为Point2D[]，形如：[{"x":44,"y":39},{"x":45,"y":40}]。
         */
        this.points = false;

        /**
         * @member {Array.<number>} SuperMap.TransferSolutionParameters.prototype.evadeLines
         * @description 避让路线ID。
         * */
        this.evadeLines = null;

        /**
         * @member {Array.<number>} SuperMap.TransferSolutionParameters.prototype.evadeStops
         * @description 避让站点ID。
         * */
        this.evadeStops = null;

        /**
         * @member {Array.<number>} SuperMap.TransferSolutionParameters.prototype.priorLines
         * @description 优先路线ID。
         * */
        this.priorLines = null;

        /**
         * @member {Array.<number>} SuperMap.TransferSolutionParameters.prototype.priorStops
         * @description 优先站点ID。
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
     * @description 将 <SuperMap.TransferSolutionParameters> 对象参数转换为 json 字符串。
     * @param {SuperMap.TransferSolutionParameters} params - 交通换乘参数。
     * @returns {string} 转化后的 json字符串。
     */
    static toJson(params) {
        if (params) {
            return Util.toJSON(params);
        }
    }

}

SuperMap.TransferSolutionParameters = TransferSolutionParameters;
