import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {TransferPreference, TransferTactic} from '../REST';

/**
 * @class SuperMap.TransferSolutionParameters
 * @category  iServer TrafficTransferAnalyst TransferSolutions
 * @classdesc 交通换乘方案查询参数类。
 * @param options - {Object} 参数。如:</br>
 *        solutionCount - {boolean} 乘车方案的数量。默认为6。</br>
 *        transferTactic - {{@link SuperMap.TransferTactic}} 交通换乘策略类型，
 *                      包括时间最短、距离最短、最少换乘、最少步行四种选择。</br>
 *        transferPreference - {{@link SuperMap.TransferPreference}} 乘车偏好枚举。</br>
 *        walkingRatio - {Array<number>} 步行与公交的消耗权重比，默认值为 10。</br>
 *        points - {Array<Object>|Array<number>} 两种查询方式：按照公交站点的起止ID进行查询和按照起止点的坐标进行查询。</br>
 *                  点类型可以是：SuperMap.Geometry.Point|L.Point|L.LatLng|ol.geom.Point。</br>
 *        evadeLines - {Array<number>} 避让路线的ID，默认为null。</br>
 *        evadeStops - {Array<number>} 避让站点的ID，默认为null。</br>
 *        priorLines - {Array<number>} 优先路线的ID，默认为null。</br>
 *        priorStops - {Array<number>} 优先站点的ID，默认为null。</br>
 *        travelTime - {string} 出行的时间。</br>
 */
export class TransferSolutionParameters {

    constructor(options) {
        options = options || {};
        /**
         *  @member SuperMap.TransferSolutionParameters.prototype.solutionCount -{number}
         *  @description 乘车方案的数量。默认为6。
         */
        this.solutionCount = 6;
        /**
         * @member SuperMap.TransferSolutionParameters.prototype.transferPreference -{SuperMap.TransferPreference}
         *  @description 乘车偏好枚举。默认为{@link TransferPreference|SuperMap.TransferPreference.NONE}
         */
        this.transferPreference = TransferPreference.NONE;

        /**
         *  @member SuperMap.TransferSolutionParameters.prototype.transferTactic - {SuperMap.TransferTactic}
         *  @description 交通换乘策略类型，包括时间最短、距离最短、最少换乘、最少步行四种选择。默认为{@link TransferTactic|SuperMap.TransferTactic.LESS_TIME}
         */
        this.transferTactic = TransferTactic.LESS_TIME;

        /**
         *  @member SuperMap.TransferSolutionParameters.prototype.walkingRatio - {number}
         *  @description 步行与公交的消耗权重比，默认值为 10。此值越大，则步行因素对于方案选择的影响越大。例如：</br>
         * 例如现在有两种换乘方案（在仅考虑消耗因素的情况下）：</br>
         * 方案1：坐车10公里，走路1公里；</br>
         * 方案2：坐车15公里，走路0.5公里；</br>
         *      1. 假设权重比为15：
         *          •方案1的总消耗为：10 + 1*15 = 25
         *          •方案2的总消耗为：15 + 0.5*15 = 22.5
         *          此时方案2消耗更低。
         *      2. 假设权重比为2：
         *          •方案1的总消耗为：10+1*2 = 12
         *          •方案2的总消耗为：15+0.5*2 = 17
         *          此时方案1消耗更低。
         */

        this.walkingRatio = null;

        /**
         *  @member SuperMap.TransferSolutionParameters.prototype.points - {Array<string>|{Array<Object>}
         *  @description 点类型可以是：SuperMap.Geometry.Point|L.Point|L.LatLng|ol.geom.Point。</br>
         *  两种查询方式：
         *           1. 按照公交站点的起止ID进行查询，则points参数的类型为int[]，形如：[起点ID、终点ID]，公交站点的ID对应服务提供者配置中的站点ID字段；
         *           2. 按照起止点的坐标进行查询，则points参数的类型为Point2D[]，形如：[{"x":44,"y":39},{"x":45,"y":40}]。
         */
        this.points = false;

        /**
         * @member SuperMap.TransferSolutionParameters.prototype.evadeLines -{Array<number>}
         * @description 避让路线ID。
         * */
        this.evadeLines = null;

        /**
         * @member SuperMap.TransferSolutionParameters.prototype.evadeStops -{Array<number>}
         * @description 避让站点ID。
         * */
        this.evadeStops = null;

        /**
         * @member SuperMap.TransferSolutionParameters.prototype.priorLines -{Array<number>}
         * @description 优先路线ID。
         * */
        this.priorLines = null;

        /**
         * @member SuperMap.TransferSolutionParameters.prototype.priorStops -{Array<number>}
         * @description 优先站点ID。
         * */
        this.priorStops = null;

        /**
         * @member SuperMap.TransferSolutionParameters.prototype.travelTime -{string}
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
     * @param  params - {SuperMap.TransferSolutionParameters} 交通换乘参数。
     * @return {string} 转化后的 json字符串。
     */
    static toJson(params) {
        if (params) {
            return Util.toJSON(params);
        }
    }

}

SuperMap.TransferSolutionParameters = TransferSolutionParameters;
