/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import {Graph} from './GraphThemeLayer';
import { Theme as FeatureTheme } from '@supermap/iclient-common/overlay/feature/Theme';

/**
 * @class RankSymbolThemeLayer
 * @category  Visualization Theme
 * @classdesc 等级符号专题图层。
 * @param {string} name - 图层名。
 * @param {string} symbolType - 符号类型。
 * @param {Object} opt_options - 参数。
 * @param {string} [opt_options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {boolean} [opt_options.loadWhileAnimating=true] - 是否实时重绘。
 * @param {mapboxgl.Map} opt_options.map - 当前 mapboxgl map 对象。
 * @param {number} [opt_options.opacity=1] - 图层透明度。
 * @param {string} opt_options.themeFields - 指定创建专题图字段。
 * @param {boolean} [opt_options.isOverLay=true] - 是否进行压盖处理，如果设为 true，图表绘制过程中将隐藏对已在图层中绘制的图表产生压盖的图表。
 * @param {string} [opt_options.chartsType] - 图表类型。目前可用："Bar", "Line", "Pie"。
 * @param {Object} [opt_options.symbolSetting] - 各类型图表的 symbolSetting 对象可设属性请参考具体图表模型类的注释中对 symbolSetting 对象可设属性的描述。symbolSetting 对象通常都具有以下 5 个基础可设属性:
 * @param {number} [opt_options.symbolSetting.width] - 专题要素（图表）宽度。
 * @param {number} [opt_options.symbolSetting.height] - 专题要素（图表）高度。
 * @param {Array.<number>} opt_options.symbolSetting.codomain - 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限。
 * @param {number} [opt_options.symbolSetting.XOffset] - 专题要素（图表）在 X 方向上的偏移值，单位像素。
 * @param {number} [opt_options.symbolSetting.YOffset] - 专题要素（图表）在 Y 方向上的偏移值，单位像素。
 * @param {Array.<number>} opt_options.symbolSetting.dataViewBoxParameter - 数据视图框 dataViewBox 参数，它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值，长度为 4 的一维数组。
 * @param {number} opt_options.symbolSetting.decimalNumber - 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
 * @extends {GraphThemeLayer}
 * @usage
 */
export class RankSymbol extends Graph {

    constructor(name, symbolType, opt_options) {
        super(name, symbolType, opt_options);
        this.symbolType = symbolType;
        this.symbolSetting = opt_options.symbolSetting;
        this.themeField = opt_options.themeField;
    }

    /**
     * @function RankSymbolThemeLayer.prototype.setSymbolType
     * @description 设置标志符号。
     * @param {string} [symbolType] - 符号类型。
     */
    setSymbolType(symbolType) {
        this.symbolType = symbolType;
        this.redraw();
    }

    /**
     * @function RankSymbolThemeLayer.prototype.createThematicFeature
     * @description 创建专题图形要素。
     * @param {Object} feature - 要创建的专题图形要素。
     */
    createThematicFeature(feature) {
        var thematicFeature;
        // 检查图形创建条件并创建图形
        if (FeatureTheme[this.symbolType] && this.themeField && this.symbolSetting) {
            thematicFeature = new FeatureTheme[this.symbolType](feature, this, [this.themeField], this.symbolSetting);
        }
        // thematicFeature 是否创建成功
        if (!thematicFeature) {
            return false;
        }
        // 对专题要素执行图形装载
        thematicFeature.assembleShapes();
        return thematicFeature;
    }

}
