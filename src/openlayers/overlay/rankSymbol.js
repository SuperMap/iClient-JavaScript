import SuperMap from '../../common/SuperMap';
import Graph from './theme/graph';

export default class RankSymbol extends Graph {

    constructor(name, symbolType, opt_options) {
        super(name, symbolType, opt_options);
        this.symbolSetting = {};
        this.themeField = null;
        this.symbolType = symbolType;
    }

    destroy() {
        this.symbolType = null;
        this.symbolSetting = null;
        this.themeField = null;
        SuperMap.Layer.Graph.prototype.destroy.apply(this, arguments);
    }

    setSymbolType(symbolType) {
        this.symbolType = symbolType;
        this.redraw();
    }

    createThematicFeature(feature) {
        var thematicFeature;
        // 检查图形创建条件并创建图形
        if (SuperMap.Feature.Theme[this.symbolType] && this.themeField && this.symbolSetting) {
            thematicFeature = new SuperMap.Feature.Theme[this.symbolType](feature, this, [this.themeField], this.symbolSetting);
        }
        // thematicFeature 是否创建成功
        if (!thematicFeature) return false;
        // 对专题要素执行图形装载
        thematicFeature.assembleShapes();
        return thematicFeature;
    };

    canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) {
        return Graph.prototype.canvasFunctionInternal_.apply(this, arguments);
    }
}

ol.source.RankSymbol = RankSymbol;