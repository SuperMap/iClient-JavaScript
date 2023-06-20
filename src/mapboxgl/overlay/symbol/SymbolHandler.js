import { Util } from "@supermap/iclient-common/commontypes/Util";
import CompositeSymbolRender from "./CompositeSymbolRender";
import SingleSymbolRender from "./SingleSymbolRender";
import SymbolManager from "./SymbolManager";
import { getImageKey, isMapboxExpression, isMultiSymbol, validateSymbol } from "./SymbolUtil";

/**
 * 符号图层管理器
 * @returns {Object}
 * @private
 */
class SymbolHandler {
    #layerSymbols; // 图层与symbol的映射关系

    constructor(map) {
        this.map = map;
        this.symbolManager = new SymbolManager();
        this.singleSymbolRender = new SingleSymbolRender(map);
        this.compositeSymbolRender = new CompositeSymbolRender(map);
        this.#layerSymbols = {};
    }

    /**
     * 添加符号图层
     * @param {Object} layer
     * @param {string} before
     */
    addLayer(layer, before) {
        if (typeof layer.symbol === 'string') {
            const id = layer.symbol;
            if (id) {
                const symbol = this.symbolManager.getSymbol(id);
                if (!symbol) {
                    return this.map.fire('error', {
                        error: new Error(`Symbol "${id}" could not be loaded. Please make sure you have added the symbol with map.addSymbol().`)
                    });
                }
                this.setSymbolTolayer(layer.id, id);
                this.getSymbolRender(symbol).addLayer(layer, symbol, before);
            }
        } else if (isMapboxExpression(layer.symbol)) {
            this.setSymbolTolayer(layer.id, layer.symbol);
            this.addExpressionLayer(layer, before);
        }
    }

    /**
     * 更新图层上的symbol
     * @param {string} layerId
     * @param {string | array} symbol
     */
    setSymbol(layerId, symbol) {
        const layers = this.map.getStyle().layers;
        const layerIndex = layers.findIndex(l => l.id === layerId);
        if (layerIndex === -1) {
            return this.map.fire('error', {
                error: new Error(`Cannot set symbol "${symbol}" to non-existing layer "${layerId}".`)
            });
        }
        this.map.removeLayer(layerId);
        const beforeId = layers[layerIndex + 1]?.id;
        const before = beforeId && (this.map.style.getLayer(beforeId)?.id ?? this.getFirstLayerId(beforeId));
        const orginLayer = layers[layerIndex];
        this.addLayer({ ...orginLayer, paint: {}, layout: {
            visibility: orginLayer.layout?.visibility ?? 'visible'
        }, symbol }, before);
    }

    /**
     * 处理match表达式为多个图层
     * @param {object} layer
     * @returns {array}
     */
    getMatchLayers(layer) {
        const layers = [];
        const filter = ["all"];
        if (layer.filter) {
            filter.push(layer.filter);
        }
        const expression = layer.symbol.slice(2);
        expression.forEach((r, index) => {
            if (index % 2 === 1) {
                layers.push({
                    ...layer, "filter": [
                        ...filter,
                        [
                            "==",
                            layer.symbol[1][1],
                            expression[index - 1]
                        ]
                    ], symbol: r
                });
            } else if (index === expression.length - 1) {
                layers.unshift({ ...layer, symbol: r });
            }
        });
        return layers;
    }

    /**
     * 处理match表达式为多个图层
     * @param {object} layer
     * @returns {array}
     */
    getCaseLayers(layer) {
        const layers = [];
        const filter = ["all"];
        if (layer.filter) {
            filter.push(layer.filter);
        }
        const expression = layer.symbol.slice(1);
        expression.forEach((r, index) => {
            if (index % 2 === 1) {
                layers.push({
                    ...layer, "filter": [
                        ...filter,
                        expression[index - 1]
                    ], symbol: r
                });
            } else if (index === expression.length - 1) {
                layers.unshift({ ...layer, symbol: r });
            }
        });
        return layers;
    }

    /**
     * 将symbol表达式拆成filter
     * @param {object} layer
     * @param {string} before
     */
    addExpressionLayer(layer, before) {
        // symbol支持表达式的话，paint、layout不生效
        delete layer.paint;
        delete layer.layout;
        const rules = {
            match: this.getMatchLayers,
            case: this.getCaseLayers
        }
        const layers = rules[layer.symbol[0]]?.(layer);
        if (!layers) {
            return this.map.fire('error', {
                error: new Error(`This expressions not supported`)
            });
        }
        layers.forEach((l) => {
            l.id = Util.createUniqueID(`${layer.id}_`);
            this.compositeSymbolRender.addLayerId(layer.id, l.id);
            this.addLayer(l, before);
        });
    }

    /**
     * 通过symbol判断使用管理器
     * @param {object | array} symbol
     * @returns {SingleSymbolRender | CompositeSymbolRender}
     */
    getSymbolRender(symbol) {
        return isMultiSymbol(symbol) ? this.compositeSymbolRender : this.singleSymbolRender;
    }

    /**
     * 将Web符号中的image添加到地图上
     * @param {object} symbol
     * @param {object} image
     */
    addSymbolImageToMap(symbol, image) {
        const { type, name } = getImageKey(symbol);
        const id = symbol[type]?.[name];
        if (id && !this.map.hasImage(id)) {
            // 如果需要使用到image 的需要addImage
            this.map.addImage(id, image);
            // 为了解决sdf问题，需要把load后的image信息存下
            this.symbolManager.addImageInfo(id, image);
        }
    }

    /**
     * 给指定图层添加symbol
     * @param {string} id
     * @param {object} symbol
     */
    addSymbol(id, symbol) {
        if (this.symbolManager.getSymbol(id)) {
            return this.map.fire('error', {
                error: new Error('An symbol with this name already exists.')
            });
        }
        if (validateSymbol(symbol)) {
            this.symbolManager.addSymbol(id, symbol);
        } else {
            return this.map.fire('error', {
                error: new Error('Symbol is not supported expressions.')
            });
        }
    }

    /**
     * 设置layer 对应的 symbol属性值
     * @param {string} layerId
     * @param {string | array} symbol
     */
    setSymbolTolayer(layerId, symbol) {
        this.#layerSymbols[layerId] = symbol;
    }

    /**
     * 通过layerID获取symbol属性值
     * @param {string} layerId
     * @return {string | array} symbol
     */
    getSymbol(layerId) {
        return this.#layerSymbols[layerId];
    }

    /**
     * 判断是否有symbol
     * @return {boolean}
     */
    hasSymbol() {
        return Object.keys(this.#layerSymbols).length > 0;
    }

    /**
     * 删除symbol
     * @param {string} id
     */
    removeSymbol(id) {
        this.symbolManager.removeSymbol(id);
    }

    /**
     * 通过symbolId获取symbol内容
     * @param {string} symbolId
     */
    getSymbolInfo(symbolId) {
        return this.symbolManager.getSymbol(symbolId);
    }

    /**
     * 获取组合图层的子图层IDs
     * @param {string} layerId
     * @returns {array}
     */
    getLayerIds(layerId) {
        return this.compositeSymbolRender.getLayerIds(layerId);
    }

    /**
     * 获取子图层ID对应的组合图层
     * @param {string} layerId
     * @returns {string}
     */
    getLayerId(layerId) {
        return this.compositeSymbolRender.getLayerId(layerId);
    }

    /**
     * 删除图层ID
     * @param {string} layerId
     * @returns {string}
     */
    removeLayerId(layerId) {
        return this.compositeSymbolRender.removeLayerId(layerId);
    }

    /**
     * 获取指定ID的layer
     * @param {string} layerId
     * @returns {object}
     */
    getLayer(layerId) {
        const layer = this.map.getLayerBySymbolBak(layerId);
        const symbol = this.getSymbol(layerId);
        if (layer) {
            return symbol ? { ...layer, symbol } : layer;
        } else {
            const layerIds = this.getLayerIds(layerId);
            if (layerIds?.[0]) {
                const reallayer = this.map.getLayerBySymbolBak(layerIds[0]);
                return reallayer && { ...reallayer, symbol, id: layerId }
            }
        }
    }

    /**
     * 删除指定图层
     * @param {string} layerId
     */
    removeLayer(layerId) {
        const layerIds = this.getLayerIds(layerId);
        if (layerIds?.length > 0) {
            layerIds.forEach(id => this.map.style.removeLayer(id));
            this.removeLayerId(layerId);
        } else {
            this.map.style.removeLayer(layerId);
        }
    }

    /**
     * 获取style
     * @returns {object}
     */
    getStyle() {
        const style = this.map.style.serialize();
        if (this.hasSymbol()) {
            style.layers = style.layers.reduce((pre, layer) => {
                const compositeId = this.getLayerId(layer.id);
                if (compositeId) {
                    !pre.find(l => l.id === compositeId) && pre.push({ ...layer, symbol: this.getSymbol(compositeId), id: compositeId })
                } else if (this.getSymbol(layer.id)) {
                    pre.push({ ...layer, symbol: this.getSymbol(layer.id) })
                } else {
                    pre.push(layer);
                }
                return pre;
            }, []);
        }
        return style;
    }

    /**
     * 获取组合图层的子图层0 id
     * @param {string} layerId
     * @returns {string | undefined}
     */
    getFirstLayerId(layerId) {
        const layerIds = this.getLayerIds(layerId);
        return layerIds?.[0];
    }

    /**
     * 扩展map的moveLayer
     * @param {string} layerId
     * @param {string | undefined} beforeId
     */
    moveLayer(layerId, beforeId) {
        const layerIds = this.getLayerIds(layerId);
        const realBeforeId =  beforeId && (this.map.style.getLayer(beforeId)?.id ?? this.getFirstLayerId(beforeId));
        if (layerIds?.length > 0) {
            layerIds.forEach(id => this.map.style.moveLayer(id, realBeforeId));
        } else {
            this.map.style.moveLayer(layerId, realBeforeId);
        }
    }

    /**
     * 扩展map的setFilter
     * @param {string} layerId
     * @param {Array} filter
     * @param {object} options
     */
    setFilter(layerId, filter, options) {
        const symbol = this.getSymbol(layerId);
        if (isMapboxExpression(symbol)) {
            // 如果 symbol 是数据驱动，filter需要重新计算
            const realLayerId = this.getFirstLayerId(layerId);
            this.map.style.setFilter(realLayerId, filter, options);
            const symbol = this.getSymbol(layerId);
            this.setSymbol(layerId, symbol);
            return;
        }
        const layerIds = this.getLayerIds(layerId);
        if (layerIds?.length > 0) {
            layerIds.forEach(id => this.map.style.setFilter(id, filter, options));
        } else {
            this.map.style.setFilter(layerId, filter, options);
        }
    }

    /**
     * 扩展map的getFilter
     * @param {string} layerId
     * @returns {object}
     */
    getFilter(layerId) {
        const realLayerId = this.getFirstLayerId(layerId);
        if(this.map.style.getLayer(realLayerId)) {
            return this.map.style.getFilter(realLayerId);
        }
    }

    /**
     * 扩展map的setLayerZoomRange
     * @param {string} layerId
     * @param {number} minzoom
     * @param {number} maxzoom
     */
    setLayerZoomRange(layerId, minzoom, maxzoom) {
        const layerIds = this.getLayerIds(layerId);
        if (layerIds?.length > 0) {
            layerIds.forEach(id => this.map.style.setLayerZoomRange(id, minzoom, maxzoom));
        } else {
            this.map.style.setLayerZoomRange(layerId, minzoom, maxzoom);
        }
    }

    /**
     * 扩展map的setPaintProperty
     * @param {string} layerId
     * @param {string} name
     * @param {*} value
     * @param {object} options
     */
    setPaintProperty(layerId, name, value, options) {
        const layerIds = this.getLayerIds(layerId);
        if (layerIds?.length > 0) {
            layerIds.forEach(id => this.map.style.setPaintProperty(id, name, value, options));
        } else {
            this.map.style.setPaintProperty(layerId, name, value, options);
        }
    }

    /**
     * 扩展map的getPaintProperty
     * @param {string} layerId
     * @param {string} name
     * @returns {object}
     */
    getPaintProperty(layerId, name) {
        const realLayerId = this.getFirstLayerId(layerId);
        return this.map.style.getPaintProperty(realLayerId, name);
    }

    /**
     * 扩展map的setLayoutProperty
     * @param {string} layerId
     * @param {string} name
     * @param {*} value
     * @param {object} options
     */
    setLayoutProperty(layerId, name, value, options) {
        const layerIds = this.getLayerIds(layerId);
        if (layerIds?.length > 0) {
            layerIds.forEach(id => this.map.style.setLayoutProperty(id, name, value, options));
        } else {
            this.map.style.setLayoutProperty(layerId, name, value, options);
        }
    }

    /**
     * 扩展map的getLayoutProperty
     * @param {string} layerId
     * @param {string} name
     * @returns {object}
     */
    getLayoutProperty(layerId, name) {
        const realLayerId = this.getFirstLayerId(layerId);
        return this.map.style.getLayoutProperty(realLayerId, name);
    }
}

export default SymbolHandler;
