import ol from 'openlayers/dist/ol-debug';
import SuperMap from '../../common/SuperMap';
import Graph from './theme/graph';

/**
 * @class ol.source.RankSymbol
 * @classdesc 等级符号专题图图层源。
 * @param name - {string} 专题图层名
 * @param symbolType -{string} 标志类型
 * @param opt_options -{Object} 参数
 * @extends ol.source.Graph
 */
export default class RankSymbol extends Graph {

    constructor(name, symbolType, opt_options) {
        super(name, symbolType, opt_options);
        this.symbolType = symbolType;
        this.symbolSetting = opt_options.symbolSetting;
        this.themeField = opt_options.themeField;
        this.features = opt_options.features;

        var features = this.features;
        if (!(SuperMap.Util.isArray(features))) {
            features = [features];
        }
        var event = {features: features};
        var ret = this.dispatchEvent({type: 'beforefeaturesadded', value: event});
        if (ret === false) {
            return;
        }
        features = event.features;
        var toFeatures = [];
        var featuresFailAdded = [];
        for (var i = 0, len = features.length; i < len; i++) {
            toFeatures.push(this.toiClientFeature(features[i]));
        }
        this.features = toFeatures;
        var succeed = featuresFailAdded.length == 0 ? true : false;
        this.dispatchEvent({type: 'featuresadded', value: {features: featuresFailAdded, succeed: succeed}});
    }

    /**
     * @function ol.source.RankSymbol.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.symbolType = null;
        this.symbolSetting = null;
        this.themeField = null;
        SuperMap.Layer.Graph.prototype.destroy.apply(this, arguments);
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