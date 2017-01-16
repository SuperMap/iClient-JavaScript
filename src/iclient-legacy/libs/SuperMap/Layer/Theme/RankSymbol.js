/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Layer/Theme/Graph.js
 */

/**
 * Class: SuperMap.Layer.RankSymbol
 * 符号专题图图层。
 *
 * 符号专题图通过为每个要素绘制符号大小来反映其对应的专题值的大小；它只能表示单个个字段属性信息。
 * 符号专题图多用于具有相关数量特征的地图上，比如表示不同地区粮食产量、GDP、人口等。
 * 即通过制作一个符号专题图，就可以清晰展示各个区域相关Value的分布差异等。目前提供的统计图类型有：圆（Circle）
 *
 * SuperMap iClient for JavaScript 的库文件不包含图表类文件，在使用客户端统计专题图时需要单独引入所需的符号类文件。
 * SuperMap iClient for JavaScript 产品包中提供的图表类文件所在目录是："产品包根目录/examples/js/graph/Circle"。
 *
 * Inherits from:
 *  - <SuperMap.Layer.Graph>
 */
// 目前提供的符号图形有：圆形（后续进行扩展 心形 五角星 多角心 图片等）。
SuperMap.Layer.RankSymbol = SuperMap.Class(SuperMap.Layer.Graph, {

    /**
     * APIProperty: symbolSetting
     * {Object} 图表配置对象，必设属性。symbolSetting 对象的可设属性根据图表类型的不同具有较大差异，
     * 各类型图表的 symbolSetting 对象可设属性请参考图表模型类的注释中对 symbolSetting 对象可设属性的描述。
     *
     * 所有图表类型的 symbolSetting 对象通常都具有以下 5 个基础可设属性：
     *
     * Symbolizer properties:
     * codomain - {Array{Number}} 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。
     * XOffset - {Number}  专题要素（图形）在 X 方向上的偏移值，单位像素。
     * YOffset - {Number}  专题要素（图形）在 Y 方向上的偏移值，单位像素。
     * dataViewBoxParameter - {Array{Number}} 数据视图框 dataViewBox 参数，
     * 它是指图形框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值，长度为 4 的一维数组。
     * decimalNumber - {Number} 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
     */
    symbolSetting: null,

    /**
     * APIProperty: themeField
     * {String} 指定用于符号制作的属性字段名称。此属性字段是用户数据（feature） attributes 中包含的字段，
     * 且字段对应的值的类型必须是数值型（Number）。必设属性。
     */
    themeField: null,

    /**
     * Property: symbolType
     * {String} 符号类型。目前可用："Circle"。
     */
    symbolType: null,

    /**
     * Constructor: SuperMap.Layer.RankSymbol
     * 构造函数，创建一个统计专题图层。
     *
     * (code)
     * var RankSymbolLayer = new SuperMap.Layer.RankSymbol("RankSymbolLayer", "Circle");
     * (end)
     *
     * Parameters:
     * name - {String} 此图层的图层名，必设参数。
     * symbolType - {String} 图表类型，必设参数，目前支持："Circle"。
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Layer.RankSymbol>} 专题图。
     */
    initialize: function(name, symbolType, options) {
        SuperMap.Layer.Graph.prototype.initialize.apply(this, arguments);
        this.symbolType = symbolType;
        this.symbolSetting = {};
    },

    /**
     * APIMethod: destroy
     * 销毁图层，释放资源。调用此函数后，图层对象的所有属性将被字为空。
     *
     * (code)
     * var RankSymbolLayer = new SuperMap.Layer.RankSymbol("RankSymbolLayer", "Circle");
     * RankSymbolLayer.destroy();
     * (end)
     */
    destroy: function() {
        this.symbolType = null;
        this.symbolSetting = null;
        this.themeField = null;
        SuperMap.Layer.Graph.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: setChartsType
     * 设置符号类型，此函数可动态改变图表类型。
     * 在调用此函数前请通过 symbolSetting 为新类型的图表做相关配置。
     *
     * (code)
     * var RankSymbolLayer = new SuperMap.Layer.RankSymbol("RankSymbolLayer", "Circle");
     * RankSymbolLayer.setSymbolType("Circle");
     * (end)
     *
     * Parameters:
     * SymbolType - {String} 图表类型，目前支持："Circle"。
     */
    setSymbolType: function(symbolType) {
        this.symbolType = symbolType;
        this.redraw();
    },


    /**
     * Method: createThematicFeature
     * 创建专题要素（图形）
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} 用于创建专题要素的数据（矢量要素）。
     *
     * Returns:
     * {Object} 专题要素对象。创建失败返回 false。
     */
    createThematicFeature: function(feature){
        var thematicFeature;

        // 检查图形创建条件并创建图形
        if(SuperMap.Feature.Theme[this.symbolType] && this.themeField && this.symbolSetting){
            thematicFeature = new SuperMap.Feature.Theme[this.symbolType](feature, this, [this.themeField], this.symbolSetting);
        }

        // thematicFeature 是否创建成功
        if(!thematicFeature) return false;

        // 对专题要素执行图形装载
        thematicFeature.assembleShapes();

        return thematicFeature;
    },

    CLASS_NAME: "SuperMap.Layer.RankSymbol"
});
