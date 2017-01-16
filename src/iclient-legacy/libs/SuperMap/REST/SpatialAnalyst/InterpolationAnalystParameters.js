/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/Query/FilterParameter.js
 * @requires SuperMap/REST/ServerType/ServerGeometry.js
 */


/**
 * Class: SuperMap.REST.InterpolationAnalystParameters
 * 差值分析参数类
 *
 */
SuperMap.REST.InterpolationAnalystParameters = SuperMap.Class({

    /**
     * APIProperty: bounds
     * {<SuperMap.Bounds>} 插值分析的范围，用于确定结果栅格数据集的范围。
     * 如果缺省，则默认为原数据集的范围。鉴于此插值方法为内插方法，原数据集的范围内的插值结果才相对有参考价值，
     * 因此建议此参数不大于原数据集范围。
     */
    bounds:null,

    /**
     * APIProperty: searchRadius
     * {Number} 查找半径，即参与运算点的查找范围，与点数据集单位相同，默认值为0。
     * 计算某个位置的Z 值时，会以该位置为圆心，以查找范围的值为半径，落在这个范围内的采样点都将参与运算。
     * 该值需要根据待插值点数据的分布状况和点数据集范围进行设置。
     */
    searchRadius:0,

    /**
     * APIProperty: zValueFieldName
     * {String} 数据集插值分析中，用于指定进行插值分析的目标字段名，插值分析不支持文本类型的字段。
     * 含义为每个插值点在插值过程中的权重，可以将所有点此字段值设置为1，即所有点在整体插值中权重相同。
     * 当插值分析类型(InterpolationAnalystType)为 dataset 时，必设参数。
     */
    zValueFieldName:null,

    /**
     * APIProperty: zValueScale
     * {Number} 用于进行插值分析值的缩放比率，默认值为1。
     * 参加插值分析的值将乘以该参数值后再进行插值，也就是对进行插值分析的值进行统一的扩大或缩小。
     */
    zValueScale:1,

    /**
     * APIProperty: resolution
     * {Number} 插值结果栅格数据集的分辨率，即一个像元所代表的实地距离，与点数据集单位相同。
     * 该值不能超过待分析数据集的范围边长。
     * 且该值设置时，应该考虑点数据集范围大小来取值，一般为结果栅格行列值（即结果栅格数据集范围除以分辨率），在500以内可以较好地体现密度走势。
     */
    resolution:null,

    /**
     * APIProperty: filterQueryParameter
     * {<SuperMap.REST.FilterParameter>} 过滤条件，
     *对分析数据集中的点进行过滤，不设置时默认为null，即对数据集中的所有点进行分析。
     */
    filterQueryParameter:null,

    /**
     * APIProperty: outputDatasetName
     * {String} 插值分析结果数据集的名称。必设参数
     */
    outputDatasetName:null,

    /**
     * APIProperty: outputDatasourceName
     * {String} 插值分析结果数据源的名称。必设参数
     */
    outputDatasourceName:null,

    /**
     * APIProperty: pixelFormat
     * {<SuperMap.REST.PixelFormat>} 指定结果栅格数据集存储的像素格式。
     * 默认值为 SuperMap.REST.PixelFormat.BIT16。
     * 支持存储的像素格式有 BIT16、BIT32、DOUBLE、SINGLE、UBIT1、UBIT4、UBIT8、UBIT24、UBIT32。
     */
    pixelFormat:SuperMap.REST.PixelFormat.BIT16,

    /**
     * APIProperty: dataset
     * {String}用来做插值分析的数据源中数据集的名称，该名称用形如"数据集名称@数据源别名"形式来表示。
     * 当插值分析类型(InterpolationAnalystType)为 dataset 时，必设参数。
     */
    dataset:null,

    /**
     * APIProperty: inputPoints
     * {Array <SuperMap.Geometry.Point>} 用于做插值分析的离散点（离散点包括Z值）集合。
     * 当插值分析类型（InterpolationAnalystType）为 geometry 时，此参数为必设参数。
	 * 通过离散点直接进行插值分析不需要指定输入数据集inputDatasourceName，inputDatasetName以及zValueFieldName。
     */
    inputPoints:null,

    /**
     * APIProperty: InterpolationAnalystType
     * {String} 插值分析类型。差值分析包括数据集插值分析和几何插值分析两类，
     * “dataset”表示对数据集进行插值分析，“geometry”表示对离散点数组进行插值分析，默认值为“dataset”。
     */
    InterpolationAnalystType: "dataset",

    /**
     * APIProperty: clipParam
     * {<SuperMap.REST.ClipParameter>}  对插值分析结果进行裁剪的参数。
     */
    clipParam:null,

    /**
     * Constructor: SuperMap.REST.InterpolationAnalystParameters
     * 插值分析参数基类构造函数。不能用于实例化插值分析参数。
     * 使用其具体子类（如点密度差值分析参数类）实例化对应的插值分析参数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * bounds - {<SuperMap.Bounds>} 插值分析的范围，用于确定结果栅格数据集的范围。
     * searchRadius - {Number} 查找半径，即参与运算点的查找范围，与点数据集单位相同。
     * zValueFieldName - {String} 存储用于进行插值分析的字段名称，插值分析不支持文本类型的字段。
     * zValueScale - {Number} 用于进行插值分析值的缩放比率，默认为1。
     * resolution - {Number} 插值结果栅格数据集的分辨率，即一个像元所代表的实地距离，与点数据集单位相同。
     * filterQueryParameter - {<SuperMap.REST.FilterParameter>} 属性过滤条件。
     * outputDatasetName - {String} 插值分析结果数据集的名称。
     * outputDatasourceName - {String} 插值分析结果数据源的名称。
     * pixelFormat - {<SuperMap.REST.PixelFormat>} 指定结果栅格数据集存储的像素格式。
     * dataset - {String} 用于做插值分析的数据源中数据集的名称。
     * inputPoints - {Array <SuperMap.Geometry.Point>} 用于做插值分析的离散点集合。
     * InterpolationAnalystType - {String} 插值分析类型（dataset或geometry），默认为dataset 。
     */
    initialize: function (options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.bounds = null;
        me.searchRadius = null;
        me.zValueFieldName = null;
        me.zValueScale = null;

        me.resolution = null;
        me.filterQueryParameter = null;
        me.outputDatasetName = null;
        me.pixelFormat = null;
    },

    CLASS_NAME: "SuperMap.REST.InterpolationAnalystParameters"
});

SuperMap.REST.InterpolationAnalystParameters.toObject =  function(interpolationAnalystParameters, tempObj){
    for (var name in interpolationAnalystParameters) {
        if (name === "inputPoints" && interpolationAnalystParameters.InterpolationAnalystType === "geometry") {
            var objs = [];
            for (var i = 0; i < interpolationAnalystParameters.inputPoints.length; i++) {
                var item = interpolationAnalystParameters.inputPoints[i];
                var obj = {
                    x:item.x,
                    y:item.y,
                    z:item.tag
                };
                objs.push(obj);
            }
            tempObj[name] = objs;
        } else {
            tempObj[name] = interpolationAnalystParameters[name];
        }
    }
};