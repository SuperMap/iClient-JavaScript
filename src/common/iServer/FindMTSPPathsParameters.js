/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {TransportationAnalystParameter} from './TransportationAnalystParameter';

/**
 * @class FindMTSPPathsParameters
 * @deprecatedclass SuperMap.FindMTSPPathsParameters
 * @category iServer NetworkAnalyst MTSPPath
 * @classdesc 多旅行商分析参数类。
 * @param {Object} options - 参数。
 * @param {Array.<GeometryPoint|L.LatLng|L.Point|ol.geom.Point|mapboxgl.LngLat|mapboxgl.Point|Array.<number>>} options.centers - 配送中心集合。
 * @param {Array.<GeometryPoint|L.LatLng|L.Point|ol.geom.Point|mapboxgl.LngLat|mapboxgl.Point|Array.<number>>} options.nodes - 配送目标集合。
 * @param {boolean} [options.hasLeastTotalCost=false] - 配送模式是否为总花费最小方案。
 * @param {boolean} [options.isAnalyzeById=false] - 是否通过节点 ID 号来指定配送中心点和配送目的点，即通过坐标点指定。
 * @param {TransportationAnalystParameter} [options.parameter] - 交通网络分析通用参数。
 * @usage
 */
export class FindMTSPPathsParameters {


    constructor(options) {
        /**
         * @member {Array.<GeometryPoint|L.LatLng|L.Point|ol.geom.Point|mapboxgl.LngLat|mapboxgl.Point|Array.<number>>} FindMTSPPathsParameters.prototype.centers
         * @description 配送中心集合。
         *              当 FindMTSPPathsParameters.isAnalyzeById = false 时，centers 应为点的坐标数组；
         *              当 FindMTSPPathsParameters.isAnalyzeById = true 时，centers 应为点的 ID 数组。
         */
        this.centers = null;

        /**
         * @member {boolean} [FindMTSPPathsParameters.prototype.hasLeastTotalCost=false]
         * @description 配送模式是否为总花费最小方案。
         *              若为 true，则按照总花费最小的模式进行配送，此时可能会出现某几个配送中心点配送的花费较多而其他配送中心点的花费很少的情况。
         *              若为 false，则为局部最优，此方案会控制每个配送中心点的花费，使各个中心点花费相对平均，此时总花费不一定最小。
         */
        this.hasLeastTotalCost = false;

        /**
         * @member {boolean} [FindMTSPPathsParameters.prototype.isAnalyzeById=false]
         * @description 是否通过节点 ID 号来指定配送中心点和配送目的点，即通过坐标点指定。
         */
        this.isAnalyzeById = false;

        /**
         * @member {Array.<GeometryPoint|L.LatLng|L.Point|ol.geom.Point|mapboxgl.LngLat|mapboxgl.Point|Array.<number>>} FindMTSPPathsParameters.prototype.nodes
         * @description 配送目标集合。
         *              当 FindMTSPPathsParameters.isAnalyzeById = false 时，nodes 应为点的坐标数组；
         *              当 FindMTSPPathsParameters.isAnalyzeById = true 时，nodes 应为点的 ID 数组。
         */
        this.nodes = null;

        /**
         * @member {TransportationAnalystParameter} [FindMTSPPathsParameters.prototype.parameter]
         * @description 交通网络分析通用参数。
         *              通过本类可以设置障碍边、障碍点、权值字段信息的名称标识、转向权值字段等信息。
         *              TransportationAnalystParameter 类型，它虽然为可选参数，但是如果不设置其中的 resultSetting 字段，则返回结果空间信息等都为空。
         */
        this.parameter = new TransportationAnalystParameter();
        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.FindMTSPPathsParameters";
    }

    /**
     * @function FindMTSPPathsParameters.prototype.destroy
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

}
