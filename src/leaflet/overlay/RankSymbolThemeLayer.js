/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import { Theme as FeatureTheme } from '@supermap/iclient-common/overlay/feature/Theme';
import {
    GraphThemeLayer
} from './GraphThemeLayer';

/**
 * @class RankSymbolThemeLayer
 * @deprecatedclassinstance L.supermap.rankSymbolThemeLayer
 * @classdesc 符号专题图图层。
 * @category Visualization Theme
 * @description 符号专题图通过为每个要素绘制符号大小来反映其对应的专题值的大小；它只能表示单个字段属性信息。
 * 符号专题图多用于具有相关数量特征的地图上，比如表示不同地区粮食产量、GDP、人口等。
 * 即通过制作一个符号专题图，就可以清晰展示各个区域相关 Value 的分布差异等。
 * 目前提供的符号图形有：圆形（后续进行扩展、心形、五角星、多角心、图片等）。
 * @extends {GraphThemeLayer}
 * @param {string} name - 专题图层名。
 * @param {ChartType} symbolType - 符号类型。目前支持：'Circle'。
 * @param {Object} options - 参数。
 * @param {boolean} [options.isOverLay=true] - 是否进行压盖处理，如果设为 true，表示在图表绘制过程中隐藏对已存在的图表产生压盖的图表。
 * @param {string} options.themeFields - 指定创建专题图字段。 
 * @param {boolean} [options.alwaysMapCRS=false] - 要素坐标是否和地图坐标系一致，要素默认是经纬度坐标。
 * @param {string} [options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {number} [options.opacity=1] - 图层透明度。
 * @param {array} [options.TFEvents] - 专题要素事件临时存储。 
 * @param {string} [options.attribution='Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' title='SuperMap iServer' target='_blank'>SuperMap iServer</a></span>'] - 版权描述信息。
 * @usage
 */
export var RankSymbolThemeLayer = GraphThemeLayer.extend({

    /** 
     * @member {Object} RankSymbolThemeLayer.prototype.symbolSetting
     * @description 符号 Circle 配置对象。
     * @property {array} codomain - 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限。  
     * @property {number} [maxR] - 圆形的最大半径。 
     * @property {number} [minR] - 圆形的最小半径。 
     * @property {string} [fillColor] - 圆形的填充色，如：fillColor: "#FFB980"。 
     * @property {Object} [circleStyle] - 圆形的基础 style，此参数控制圆形基础样式，优先级低于 circleStyleByFields 和 circleStyleByCodomain。 
     * @property {number} [decimalNumber] - 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。 
     * @property {Object} [circleHoverStyle] - 圆形 hover 状态时的样式，circleHoverAble 为 true 时有效。 
     * @property {boolean} [circleHoverAble=true] - 是否允许圆形使用 hover 状态。同时设置 circleHoverAble 和 circleClickAble 为 false，可以直接屏蔽图形对专题图层事件的响应。 
     * @property {boolean} [circleClickAble=true] - 是否允许圆形被点击。同时设置 circleHoverAble 和 circleClickAble 为 false，可以直接屏蔽图形对专题图层事件的响应。
     */

    initialize: function (name, symbolType, options) { // eslint-disable-line no-unused-vars
        GraphThemeLayer.prototype.initialize.apply(this, arguments);
        this.symbolType = symbolType;
        this.symbolSetting = {};
    },

    /**
     * @function RankSymbolThemeLayer.prototype.setSymbolType
     * @description 设置符号类型，此函数可动态改变图表类型。在调用此函数前请通过 symbolSetting 为新类型的图表做相关配置。
     * @param {ChartType} symbolType - 目前支持：'Circle'。 
     * 
     */
    //todo 这里怎么又是supermap的类型
    setSymbolType: function (symbolType) {
        this.symbolType = symbolType;
        this.redraw();
    },

    /**
     * @function RankSymbolThemeLayer.prototype.createThematicFeature
     * @description 创建专题要素（图形）。
     * @param {FeatureVector} feature - 要创建的专题图形要素。
     * @returns {FeatureTheme} 专题图形。
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
