/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/Query/FilterParameter.js
 * @requires SuperMap/REST/ServerType/ServerGeometry.js
 * @requires SuperMap/REST/SpatialAnalyst/InterpolationAnalystParameters.js
 */

/**
 * Class: SuperMap.REST.InterpolationKrigingAnalystParameter
 * 克吕金插值分析参数类。 通过该类可以设置克吕金插值分析所需的参数。
 *
 * 克吕金（Kriging）法为地统计学上一种空间数据内插处理方法，主要的目的是利用各数据点间变异数（variance）的大小来推求某一未知点与各已知点的权重关系，再由各数据点的值和其与未知点的权重关系推求未知点的值。Kriging 法最大的特色不仅是提供一个最小估计误差的预测值，并且可明确的指出误差值的大小。一般而言，许多地质参数，如地形面，本身即具有连续性，故在一段距离内的任两点必有空间上的关系。反之，在一不规则面上的两点若相距甚远，则在统计意义上可视为互为独立 (stastically indepedent)。这种随距离而改变的空间上连续性，可用半变异图 (semivariogram) 来表现。
 *
 * 因此，若想由已知的散乱点来推求某一未知点的值，则可利用半变异图推求各已知点与未知点的空间关系，即以下四个参数。然后，由此空间参数推求半变异数，由各数据点间的半变异数可推求未知点与已知点间的权重关系，进而推求出未知点的值。
 *
 * · 块金值（nugget）：当采样点间距为0时，理论上半变异函数值为0，但时间上两采样点非常接近时半变异函数值并不为0，即产生了上图所示的块金效应，对应的半变异函数值为块金值。块金值可能由于测量误差或者空间变异产生。
 *
 * · 基台值（sill）：随着采样点间距的不断增大，半变异函数的值趋向一个稳定的常数，该常数成为基台值。到达基台值后，半变异函数的值不再随采样点间距而改变，即大于此间距的采样点不再具有空间相关性。
 *
 * · 偏基台值：基台值与块金值的差值。
 *
 * · 自相关阈值（range）：也称变程，是半变异函数值达到基台值时，采样点的间距。超过自相关阈值的采样点不再具有空间相关性，将不对预测结果产生影响。
 *
 * 由上述可知，半变异函数是克吕金插值的关键，因此选择合适的半变异函数模型非常重要，SuperMap提供了以下三种半变异函数模型：
 *
 * · 指数型（EXPONENTIAL）：适用于空间相关关系随样本间距的增加成指数递减的情况，其空间自相关关系在样本间距的无穷远处完全消失。
 *
 * · 球型（SPHERICAL）：适用于空间自相关关系随样本间距的增加而逐渐减少，直到超出一定的距离时空间自相关关系消失的情况。
 *
 * · 高斯型（GAUSSIAN）：适用于半变异函数值渐进地逼近基台值的情况。
 *
 * 半变异函数中，有一个关键参数即插值的字段值的期望（平均值），由于对于此参数的不同处理方法而衍生出了不同的Kriging方法。SuperMap的差值功能基于以下三种常用Kriging算法：
 *
 * １.　简单克吕金（Simple Kriging）：该方法假定用于插值的字段值的期望（平均值）已知的某一常数。
 *
 * ２.　普通克吕金（Kriging）：该方法假定用于插值的字段值的期望（平均值）未知且恒定。它利用一定的数学函数，通过对给定的空间点进行拟合来估算单元格的值，生成格网数据集。它不仅可以生成一个表面，还可以给出预测结果的精度或者确定性的度量。因此，此方法计算精度较高，常用于地学领域。
 *
 * ３.　泛克吕金（Universal Kriging）：该方法假定用于插值的字段值的期望（平均值）是未知的变量。在样点数据中存在某种主导趋势且该趋势可以通过某一个确定的函数或者多项式进行拟合的情况下，适用泛克吕金插值法。
 *
 * 克吕金法的优点是以空间统计学作为其坚实的理论基础，物理含义明确；不但能估计测定参数的空间变异分布，而且还可以估算参数的方差分布。克吕金法的缺点是计算步骤较烦琐，计算量大，且变异函数有时需要根据经验人为选定。
 *
 *
 * Inherits from:
 *  - <SuperMap.REST.InterpolationAnalystParameters>
 */

SuperMap.REST.InterpolationKrigingAnalystParameters = SuperMap.Class(SuperMap.REST.InterpolationAnalystParameters,{
    /**
     * APIProperty: type
     * {<SuperMap.REST.InterpolationAlgorithmType>} 克吕金插值的类型。必设参数
     * 具体如下：
     * {KRIGING} 普通克吕金插值法
     * {SimpleKriging} 简单克吕金插值法
     * {UniversalKriging} 泛克吕金插值法
     */
    type:null,

    /**
     * APIProperty: mean
     * {Number} 【简单克吕金】方式下，插值字段的平均值。
     * 即采样点插值字段值总和除以采样点数目。
     */
    mean:null,

    /**
     * APIProperty: angle
     * {Number} 克吕金算法中旋转角度值。默认值为0。
     * 此角度值指示了每个查找邻域相对于水平方向逆时针旋转的角度。
     */
    angle:0,

    /**
     * APIProperty: nugget
     * {Number} 克吕金算法中块金效应值。默认值为0。
     */
    nugget:0,

    /**
     * APIProperty: range
     * {Number} 克吕金算法中自相关阈值，单位与原数据集单位相同。默认值为0。
     */
    range:0,

    /**
     * APIProperty: sill
     * {Number} 克吕金算法中基台值。默认值为0。
     */
    sill:0,

    /**
     * APIProperty: variogramMode
     * {<SuperMap.REST.VariogramMode>} 克吕金插值时的半变函数类型.
     * 默认值为 SuperMap.REST.VariogramMode.SPHERICAL。
     * 用户所选择的半变函数类型会影响未知点的预测，特别是曲线在原点处的不同形状有重要意义。
     * 曲线在原点处越陡，则较近领域对该预测值的影响就越大，因此输出表面就会越不光滑。
     */
    variogramMode:SuperMap.REST.VariogramMode.SPHERICAL,

    /**
     * APIProperty: exponent
     * {<SuperMap.REST.Exponent>} 【泛克吕金】类型下，用于插值的样点数据中趋势面方程的阶数。
     * 默认值为 SuperMap.REST.Exponent.EXP1。
     */
    exponent:SuperMap.REST.Exponent.EXP1,

    /**
     * APIProperty: searchMode
     * {<SuperMap.REST.SearchMode>} 插值运算时，查找参与运算点的方式，有固定点数查找、定长查找、块查找。必设参数
     * 简单克吕金和泛克吕金不支持块查找。
     * 具体如下：
     * {KDTREE_FIXED_COUNT} 使用 KDTREE 的固定点数方式查找参与内插分析的点。
     * {KDTREE_FIXED_RADIUS} 使用 KDTREE 的定长方式查找参与内插分析的点。
     * {QUADTREE} 使用 QUADTREE 方式查找参与内插分析的点（块查找）。
     */
    searchMode:null,

    /**
     * APIProperty: expectedCount
     * {Number}
     * 【固定点数查找】方式下，设置待查找的点数，即参与差值运算的点数，默认值为12。
     * 【定长查找】方式下，设置查找的最小点数，默认值为12
     */
    expectedCount:12,

    /**
     * APIProperty: maxPointCountForInterpolation
     * {Number} 【块查找】方式下，最多参与插值的点数。默认值为200。
     * 仅用于普通克吕金插值，简单克吕金和泛克吕金不支持块查找。
     */
    maxPointCountForInterpolation:200,

    /**
     * APIProperty: maxPointCountInNode
     * {Number} 【块查找】方式下，设置单个块内最多参与运算点数。默认值为50。
     * 仅用于普通克吕金插值，简单克吕金和泛克吕金不支持块查找。
     */
    maxPointCountInNode:50,

    /**
     * Constructor: SuperMap.REST.InterpolationKrigingAnalystParameters
     * 克吕金插值分析参数类构造函数。
     *
     * 例如：
     * (start code)
     * var myInterpolationKrigingAnalystParameters = new SuperMap.REST.InterpolationKrigingAnalystParameters({
     *     dataset:"SamplesP@Interpolation",
     *     type: "KRIGING",
     *     angle: 0,
     *     mean: 5,
     *     nugget: 30,
     *     range: 50,
     *     sill: 300,
     *     variogramMode: "EXPONENTIAL",
     *     searchMode: "QUADTREE",
     *     maxPointCountForInterpolation: 20,
     *     maxPointCountInNode: 5,
     *     pixelFormat: "BIT16",
     *     zValueFieldName: "AVG_TMP",
     *     resolution: 30000,
     *     filterQueryParameter: {
     *         attributeFilter: ""
     *     },
     *     outputDatasetName: "myKriging"
     * });
     * (end)
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * type - {String} 克吕金插值的类型。必设参数。
     * mean - {Number} 【简单克吕金】类型下,插值字段的平均值。
     * angle - {Number} 克吕金算法中旋转角度值，默认值为0。
     * nugget - {Number} 克吕金算法中块金效应值，默认值为0。
     * range - {Number} 克吕金算法中自相关阈值，单位与原数据集单位相同，默认值为0。
     * sill - {Number} 克吕金算法中基台值，默认值为0。
     * variogramMode - {String} 克吕金插值时的半变函数类型，默认为球型（SPHERICAL）。
     * exponent - {String} 【泛克吕金】类型下，用于插值的样点数据中趋势面方程的阶数，可选值为exp1、exp2，默认值为exp1。
     * bounds - {<SuperMap.Bounds>} 插值分析的范围，用于确定结果栅格数据集的范围。
     * searchMode - {String} 插值运算时，查找参与运算点的方式，有固定点数查找、定长查找、块查找，必设参数。
     * expectedCount - {Number} 【固定点数查找】方式下，设置待查找的点数，默认值为12；【定长查找】方式下，设置查找的最小点数，默认值为12。
     * searchRadius - {Number} 【定长查找】方式下，设置参与运算点的查找范围，默认值为0。
     * maxPointCountForInterpolation - {Number} 【块查找】方式下，设置最多参与插值的点数，默认值为200。
     * maxPointCountInNode - {Number} 【块查找】方式下，设置单个块内最多参与运算点数，默认值为50。
     * zValueFieldName - {String} 存储用于进行插值分析的字段名称，插值分析不支持文本类型的字段。当插值分析类型(InterpolationAnalystType)为 dataset 时，必设参数。
     * zValueScale - {Number} 用于进行插值分析值的缩放比率，默认值为1。
     * resolution - {Number} 插值结果栅格数据集的分辨率，即一个像元所代表的实地距离，与点数据集单位相同。
     * filterQueryParameter - {<SuperMap.REST.FilterParameter>} 属性过滤条件。
     * outputDatasetName - {String} 插值分析结果数据集的名称，必设参数。
     * outputDatasourceName - {String} 插值分析结果数据源的名称。必设参数
     * pixelFormat - {String} 指定结果栅格数据集存储的像素格式。
     * dataset - {String} 要用来做插值分析的数据源中数据集的名称。该名称用形如”数据集名称@数据源别名”形式来表示。当插值分析类型(InterpolationAnalystType)为 dataset 时，必设参数。
     * inputPoints - {Array <SuperMap.Geometry.Point>} 用于做插值分析的离散点集合。当插值分析类型（InterpolationAnalystType）为 geometry 时，必设参数。
     */
    initialize: function (options) {
        SuperMap.REST.InterpolationAnalystParameters.prototype.initialize.apply(this, arguments);
        var me =this;
        me.type =null;
        me.mean =null;
        me.angle =0;
        me.nugget =0;
        me.range =0;
        me.sill =0;
        me.variogramMode ="SPHERICAL";
        me.exponent ="EXP1";
        me.searchMode =null;
        me.expectedCount =12;
        me.maxPointCountForInterpolation =200;
        me.maxPointCountInNode =50;
        if (options) {
            SuperMap.Util.extend(me, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.REST.ThiessenAnalystParameters.prototype.destroy.apply(this,arguments);
        var me = this;
        me.type =null;
        me.mean =null;
        me.angle =null;
        me.nugget =null;
        me.range =null;
        me.sill =null;
        me.variogramMode =null;
        me.exponent =null;
        me.searchMode =null;
        me.expectedCount =null;
        me.maxPointCountForInterpolation =null;
        me.maxPointCountInNode =null;
    },

    CLASS_NAME: "SuperMap.REST.InterpolationKrigingAnalystParameters"
});
