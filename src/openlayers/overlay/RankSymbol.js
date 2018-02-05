import ol from 'openlayers';
import {FeatureTheme} from '@supermap/iclient-common';
import {Graph} from './Graph';

/**
 * @class ol.source.RankSymbol
 * @category  Visualization Theme
 * @classdesc 等级符号专题图图层源。
 * @param name - {string} 专题图层名
 * @param symbolType -{string} 标志类型
 * @param opt_options -{Object} 参数
 * @extends ol.source.Graph
 */
export class RankSymbol extends Graph {

    constructor(name, symbolType, opt_options) {
        super(name, symbolType, opt_options);
        this.symbolType = symbolType;
        this.symbolSetting = opt_options.symbolSetting;
        this.themeField = opt_options.themeField;
    }

    /**
     * @function ol.source.RankSymbol.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.symbolType = null;
        this.symbolSetting = null;
        this.themeField = null;
        Graph.prototype.destroy.apply(this, arguments);
    }

    /**
     * @function ol.source.RankSymbol.prototype.setSymbolType
     * @description 设置标志符号
     * @param symbolType -{string} 符号类型
     */
    setSymbolType(symbolType) {
        this.symbolType = symbolType;
        this.redraw();
    }

    /**
     * @private
     * @function ol.source.RankSymbol.prototype.createThematicFeature
     * @description 创建专题图形要素
     * @param feature -{Object} 要创建的专题图形要素
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

    canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
        return Graph.prototype.canvasFunctionInternal_.apply(this, arguments);
    }
}

ol.source.RankSymbol = RankSymbol;