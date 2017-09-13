import SuperMap from '../SuperMap';
import TransportationAnalystParameter from './TransportationAnalystParameter';

/**
 * @class SuperMap.FindPathParameters
 * @classdesc 最佳路径分析参数类。最佳路径是在网络数据集中指定一些结点，按照顺序访问结点从而求解起止点之间阻抗最小的路径。
 *              例如如果要顺序访问1、2、3、4四个结点，则需要分别找到1、2结点间的最佳路径 R1—2，2、3间的最佳路径 R2—3和3、4结点间的最佳路径 R3—4，
 *              顺序访问1、2、3、4四个结点的最佳路径就是 R= R1—2 + R2—3 + R3—4。
 *              阻抗就是指从一点到另一点的耗费，在实际应用中我们可以将距离、时间、花费等作为阻抗条件。
 *              阻抗最小也就可以理解为从一点到另一点距离最短、时间最少、花费最低等。当两点间距离最短时为最短路径，它是最佳路径问题的一个特例。
 *              阻抗值通过 SuperMap.TransportationAnalystParameter.weightFieldName 设置。
 *              计算最佳路径除了受阻抗影响外，还受转向字段的影响。转向值通过 SuperMap.TransportationAnalystParameter.turnWeightField 设置。
 *
 * @param options - {Object} 可选参数。如:<br>
 *        isAnalyzeById - {boolean} 是否通过节点 ID 指定路径分析的结点。<br>
 *        hasLeastEdgeCount - {boolean} 是否按照弧段数最少的进行最佳路径分析。<br>
 *        nodes - {Array<Object>|Array<number>} 最佳路径分析经过的结点或设施点数组，必设字段。该字段至少包含两个点。<br>
 *                        点坐标类型可以是SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。<br>
 *        parameter - {@link SuperMap.TransportationAnalystParameter} 交通网络分析通用参数。
 */
export default class FindPathParameters {

    /**
     * @member SuperMap.FindPathParameters.prototype.isAnalyzeById - {boolean}
     * @description 是否通过节点 ID 指定路径分析的结点，默认为 false。
     *              指定路径分析经过的结点或设施点有两种方式：输入结点 ID 号或直接输入点坐标。
     *              当该字段为 true 时，表示通过结点 ID 指定途经点，即 SuperMap.FindPathParameters.nodes = [ID1,ID2,...]；
     *              反之表示通过结点坐标指定途经点，即 SuperMap.FindPathParameters.nodes = [{x1,y1},{x2,y2},...] 。
     */
    isAnalyzeById = false;

    /**
     * @member SuperMap.FindPathParameters.prototype.hasLeastEdgeCount - {boolean}
     * @description 是否按照弧段数最少的进行最佳路径分析。
     *               true 表示按照弧段数最少进行分析，返回弧段数最少的路径中一个阻抗最小的最佳路径；
     *               false表示直接返回阻抗最小的路径，而不考虑弧段的多少。
     */
    hasLeastEdgeCount = null;

    /**
     * @member SuperMap.FindPathParameters.prototype.nodes -{Array<Object>|Array<number>}
     * @description 最佳路径分析经过的结点或设施点数组，必设字段。该字段至少包含两个点。
     *              点坐标类型可以是SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。
     *              当 SuperMap.FindPathParameters.isAnalyzeById = false 时，nodes 应为点的坐标数组；
     *              当 SuperMap.FindPathParameters.isAnalyzeById = true 时，nodes 应为点的 ID 数组。
     */
    nodes = null;

    /**
     * @member SuperMap.FindPathParameters.prototype.parameter - {SuperMap.TransportationAnalystParameter}
     * @description 交通网络分析通用参数。
     */
    parameter = null;

    constructor(options) {
        var me = this;
        me.parameter = new TransportationAnalystParameter();
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }


    /**
     * @function SuperMap.FindPathParameters.prototype.destroy
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

    CLASS_NAME = "SuperMap.FindPathParameters"
}

SuperMap.FindPathParameters = FindPathParameters;