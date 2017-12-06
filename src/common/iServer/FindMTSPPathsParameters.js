import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {TransportationAnalystParameter} from './TransportationAnalystParameter';

/**
 * @class SuperMap.FindMTSPPathsParameters
 * @classdesc 多旅行商分析参数类
 * @param options - {Object} 可选参数。如:<br>
 *        centers - {Array<Object>|Array<number>} 配送中心集合，必设字段。点坐标类型可以是SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。<br>
 *        hasLeastTotalCost - {boolean} 配送模式是否为总花费最小方案。默认为 false。<br>
 *        isAnalyzeById - {boolean} 是否通过节点 ID 号来指定配送中心点和配送目的点，默认为 false，即通过坐标点指定。<br>
 *        nodes - {Array<{SuperMap.Point}|number>} 配送目标集合，必设字段。点坐标类型可以是SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。<br>
 *        parameter - {@link SuperMap.TransportationAnalystParameter} 交通网络分析通用参数。
 */
export class FindMTSPPathsParameters {

    /**
     * @member SuperMap.FindMTSPPathsParameters.prototype.centers - {Array<Object>|Array<number>}
     * @description 配送中心集合，必设字段。
     *              点坐标类型可以是SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。
     *              当 SuperMap.FindMTSPPathsParameters.isAnalyzeById = false 时，centers 应为点的坐标数组；
     *              当 SuperMap.FindMTSPPathsParameters.isAnalyzeById = true 时，centers 应为点的 ID 数组。
     */
    centers = null;

    /**
     * @member SuperMap.FindMTSPPathsParameters.prototype.hasLeastTotalCost - {boolean}
     * @description 配送模式是否为总花费最小方案。默认为 false。
     *              若为 true，则按照总花费最小的模式进行配送，此时可能会出现某几个配送中心点配送的花费较多而其他配送中心点的花费很少的情况。
     *              若为 false，则为局部最优，此方案会控制每个配送中心点的花费，使各个中心点花费相对平均，此时总花费不一定最小。
     */
    hasLeastTotalCost = false;

    /**
     * @member SuperMap.FindMTSPPathsParameters.prototype.isAnalyzeById - {boolean}
     * @description 是否通过节点 ID 号来指定配送中心点和配送目的点，默认为 false，即通过坐标点指定。
     */
    isAnalyzeById = false;

    /**
     * @member SuperMap.FindMTSPPathsParameters.prototype.nodes - {Array<Object>|Array<number>}
     * @description 配送目标集合，必设字段。
     *              点坐标类型可以是SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。
     *              当 SuperMap.FindMTSPPathsParameters.isAnalyzeById = false 时，nodes 应为点的坐标数组；
     *              当 SuperMap.FindMTSPPathsParameters.isAnalyzeById = true 时，nodes 应为点的 ID 数组。
     */
    nodes = null;

    /**
     * @member SuperMap.FindMTSPPathsParameters.prototype.parameter - {SuperMap.TransportationAnalystParameter}
     * @description 交通网络分析通用参数。
     *              通过本类可以设置障碍边、障碍点、权值字段信息的名称标识、转向权值字段等信息。
     *              SuperMap.TransportationAnalystParameter 类型，它虽然为可选参数，但是如果不设置其中的 resultSetting 字段，则返回结果空间信息等都为空。
     */
    parameter = null;

    constructor(options) {
        var me = this;
        me.parameter = new TransportationAnalystParameter();
        if (!options) {
            return;
        }
        Util.extend(this, options);
    }

    /**
     * @function SuperMap.FindMTSPPathsParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.centers = null;
        me.hasLeastTotalCost = null;
        me.isAnalyzeById = null;
        me.nodes = null;
        me.maxWeight = null;
        if (me.parameter) {
            me.parameter.destroy();
            me.parameter = null;
        }
    }

    CLASS_NAME = "SuperMap.FindMTSPPathsParameters"
}

SuperMap.FindMTSPPathsParameters = FindMTSPPathsParameters;