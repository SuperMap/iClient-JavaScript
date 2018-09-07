/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {TransportationAnalystParameter} from './TransportationAnalystParameter';

/**
 * @class SuperMap.FindTSPPathsParameters
 * @category iServer NetworkAnalyst TSPPath
 * @classdesc 旅行商分析参数类。
 * 旅行商分析是路径分析的一种，它从起点开始（默认为用户指定的第一点）查找能够遍历所有途经点且花费最小的路径。
 * 旅行商分析也可以指定到达的终点，这时查找从起点能够遍历所有途经点最后到达终点，且花费最小的路径。
 * 旅行商分析和最佳路径分析都是在网络中寻找遍历所有站点的最经济的路径，区别是在遍历网络所有站点的过程中对结点访问顺序不同
 * 最佳路径分析必须按照指定顺序对站点进行访问，而旅行商分析是无序的路径分析。
 * @param {Object} options - 参数。 
 * @param {boolean} [options.endNodeAssigned=false] - 是否指定终止点，将指定的途经点的最后一个点作为终止点。true 表示指定终止点，则旅行商必须最后一个访问终止点。 
 * @param {boolean} [options.isAnalyzeById=false] - 是否通过节点 ID 号来指定配送中心点和配送目的点。 
 * @param {Array.<(SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point|number)>} options.nodes - 配送目标集合。 
 * @param {SuperMap.TransportationAnalystParameter} [options.parameter] - 交通网络分析通用参数。 
 */
export class FindTSPPathsParameters {


    constructor(options) {
        /**
         * @member {boolean} [SuperMap.FindTSPPathsParameters.prototype.endNodeAssigned=false]
         * @description 是否指定终止点，将指定的途经点的最后一个点作为终止点。
         *              true 表示指定终止点，则旅行商必须最后一个访问终止点。
         */
        this.endNodeAssigned = false;

        /**
         * @member {boolean} [SuperMap.FindTSPPathsParameters.prototype.isAnalyzeById=false]
         * @description 是否通过节点 ID 号来指定途经点。
         */
        this.isAnalyzeById = false;

        /**
         * @member {Array.<SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point|number>} SuperMap.FindTSPPathsParameters.prototype.nodes
         * @description 旅行商分析途经点数组。
         *              当 SuperMap.FindTSPPathsParameters.isAnalyzeById = false 时，nodes 应为点的坐标数组；
         *              当 SuperMap.FindTSPPathsParameters.isAnalyzeById = true 时，nodes 应为点的 ID 数组。
         */
        this.nodes = null;

        /**
         * @member {SuperMap.TransportationAnalystParameter} [SuperMap.FindTSPPathsParameters.prototype.parameter]
         * @description 交通网络分析通用参数。通过本类可以设置障碍边、障碍点、权值字段信息的名称标识、转向权值字段等信息。
         *              SuperMap.TransportationAnalystParameter 类型，它虽然为可选参数，但是如果不设置其中的 resultSetting
         *              字段，则返回结果空间信息等都为空。
         */
        this.parameter = new TransportationAnalystParameter();
        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.FindTSPPathsParameters";
    }

    /**
     * @function SuperMap.FindTSPPathsParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.endNodeAssigned = null;
        me.isAnalyzeById = null;
        me.nodes = null;
        if (me.parameter) {
            me.parameter.destroy();
            me.parameter = null;
        }
    }

}

SuperMap.FindTSPPathsParameters = FindTSPPathsParameters;