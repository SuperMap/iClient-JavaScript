/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {TransportationAnalystParameter} from './TransportationAnalystParameter';

/**
 * @class FindPathParameters
 * @deprecatedclass SuperMap.FindPathParameters
 * @category  iServer NetworkAnalyst Path
 * @classdesc 最佳路径分析参数类。最佳路径是在网络数据集中指定一些结点，按照顺序访问结点从而求解起止点之间阻抗最小的路径。
 * 例如如果要顺序访问 1、2、3、4 四个结点，则需要分别找到1、2结点间的最佳路径 R1—2，2、3 间的最佳路径 R2—3 和 3、4 结点间的最佳路径 R3—4，
 * 顺序访问 1、2、3、4 四个结点的最佳路径就是 R = R1—2 + R2—3 + R3—4。
 * 阻抗就是指从一点到另一点的耗费，在实际应用中我们可以将距离、时间、花费等作为阻抗条件。
 * 阻抗最小也就可以理解为从一点到另一点距离最短、时间最少、花费最低等。当两点间距离最短时为最短路径，它是最佳路径问题的一个特例。
 * 阻抗值通过 TransportationAnalystParameter.weightFieldName 设置。
 * 计算最佳路径除了受阻抗影响外，还受转向字段的影响。转向值通过 {@link TransportationAnalystParameter#turnWeightField} 设置。
 *
 * @param {Object} options - 参数。
 * @param {Array.<GeometryPoint|L.LatLng|L.Point|ol.geom.Point|number>} options.nodes - 最佳路径分析经过的结点或设施点数组。该字段至少包含两个点。
 * @param {boolean} [options.isAnalyzeById=false] - 是否通过节点 ID 指定路径分析的结点。
 * @param {boolean} [options.hasLeastEdgeCount=false] - 是否按照弧段数最少的进行最佳路径分析。
 * @param {TransportationAnalystParameter} [options.parameter] - 交通网络分析通用参数。
 * @usage
 */
export class FindPathParameters {

    constructor(options) {

        /**
         * @member {boolean} [FindPathParameters.prototype.isAnalyzeById=false]
         * @description 是否通过节点 ID 指定路径分析的结点。
         *              指定路径分析经过的结点或设施点有两种方式：输入结点 ID 号或直接输入点坐标。
         *              当该字段为 true 时，表示通过结点 ID 指定途经点，即 FindPathParameters.nodes = [ID1,ID2,...]；
         *              反之表示通过结点坐标指定途经点，即 FindPathParameters.nodes = [{x1,y1},{x2,y2},...] 。
         */
        this.isAnalyzeById = false;

        /**
         * @member {boolean} [FindPathParameters.prototype.hasLeastEdgeCount=false]
         * @description 是否按照弧段数最少的进行最佳路径分析。
         *              true 表示按照弧段数最少进行分析，返回弧段数最少的路径中一个阻抗最小的最佳路径；
         *              false 表示直接返回阻抗最小的路径，而不考虑弧段的多少。
         */
        this.hasLeastEdgeCount = null;

        /**
         * @member {Array.<GeometryPoint|L.LatLng|L.Point|ol.geom.Point|number>} FindPathParameters.prototype.nodes
         * @description 最佳路径分析经过的结点或设施点数组，必设字段。该字段至少包含两个点。
         *              当 FindPathParameters.isAnalyzeById = false 时，nodes 应为点的坐标数组；
         *              当 FindPathParameters.isAnalyzeById = true 时，nodes 应为点的 ID 数组。
         */
        this.nodes = null;

        /**
         * @member {TransportationAnalystParameter} FindPathParameters.prototype.parameter
         * @description 交通网络分析通用参数。
         */
        this.parameter = new TransportationAnalystParameter();
        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.FindPathParameters";
    }


    /**
     * @function FindPathParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.isAnalyzeById = null;
        me.hasLeastEdgeCount = null;
        me.nodes = null;
        if (me.parameter) {
            me.parameter.destroy();
            me.parameter = null;
        }
    }

}
