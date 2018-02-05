import L from "leaflet";
import '../core/Base';
import {FeatureTheme} from '@supermap/iclient-common';
import {GraphThemeLayer} from './GraphThemeLayer';

/**
 * @class L.supermap.rankSymbolThemeLayer
 * @classdesc 符号专题图图层。
 * @category Visualization Theme
 * @description 符号专题图通过为每个要素绘制符号大小来反映其对应的专题值的大小；它只能表示单个个字段属性信息。
 *            符号专题图多用于具有相关数量特征的地图上，比如表示不同地区粮食产量、GDP、人口等。
 *            即通过制作一个符号专题图，就可以清晰展示各个区域相关Value的分布差异等。
 *           目前提供的符号图形有：圆形（后续进行扩展 心形 五角星 多角心 图片等）
 * @extends L.supermap.GraphThemeLayer
 * @param name - {string} 专题图层名
 * @param symbolType - {SuperMap.ChartType} 必设参数，目前支持："Circle"。
 * @param options - {Object} 可选参数<br>
 *          symbolType<SuperMap.ChartType>，必设参数，目前支持："Circle"。<br>
 *          symbolSetting:各类型图表的 symbolSetting 对象可设属性请参考图表模型类的注释中对 symbolSetting 对象可设属性的描述。
 *              所有图表类型的 symbolSetting 对象通常都具有以下 5 个基础可设属性：
 *  * codomain - {Array{number}} 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。
 *  * XOffset - {number}  专题要素（图形）在 X 方向上的偏移值，单位像素。
 *  * YOffset - {number}  专题要素（图形）在 Y 方向上的偏移值，单位像素。
 *  * dataViewBoxParameter - {Array{number}} 数据视图框 dataViewBox 参数，
 *  它是指图形框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值，长度为 4 的一维数组。
 *  * decimalNumber - {number}数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
 */
export var RankSymbolThemeLayer = GraphThemeLayer.extend({

    initialize: function (name, symbolType, options) {// eslint-disable-line no-unused-vars
        GraphThemeLayer.prototype.initialize.apply(this, arguments);
        this.symbolType = symbolType;
        this.symbolSetting = {};
    },

    /**
     * @function L.supermap.rankSymbolThemeLayer.prototype.setSymbolType
     * @description 设置符号类型，此函数可动态改变图表类型。在调用此函数前请通过 symbolSetting 为新类型的图表做相关配置。
     * @param symbolType - {SuperMap.ChartType} 目前支持："Circle"。 //todo 这里怎么又是supermap的类型
     */
    setSymbolType: function (symbolType) {
        this.symbolType = symbolType;
        this.redraw();
    },

    /**
     * @function L.supermap.rankSymbolThemeLayer.prototype.createThematicFeature
     * @description 创建专题要素（图形）
     * @param feature  - {SuperMap.Feature.Vector} 要创建的专题图形要素
     * @return {SuperMap.Feature.Theme} 专题图形
     */
    createThematicFeature: function (feature) {
        var me = this;
        var thematicFeature;
        // 检查图形创建条件并创建图形
        if (FeatureTheme[me.symbolType] && me.themeField && me.symbolSetting) {
            thematicFeature = new FeatureTheme[me.symbolType](feature, me, [me.themeField], me.symbolSetting);
        }

        // thematicFeature 是否创建成功
        if (!thematicFeature) {
            return false;
        }

        // 对专题要素执行图形装载
        thematicFeature.assembleShapes();

        return thematicFeature;
    }

});

export var rankSymbolThemeLayer = function (name, symbolType, options) {
    return new RankSymbolThemeLayer(name, symbolType, options);
};

L.supermap.rankSymbolThemeLayer = rankSymbolThemeLayer;