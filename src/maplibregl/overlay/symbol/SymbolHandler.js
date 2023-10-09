/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from "@supermap/iclient-common/commontypes/Util";
import CompositeSymbolRender from "./CompositeSymbolRender";
import SingleSymbolRender from "./SingleSymbolRender";
import SymbolManager from "./SymbolManager";
import { getImageKey, isMapboxExpression, isMultiSymbol, isPaintKey, validateSymbol } from "./SymbolUtil";

/**
 * 符号图层管理器。
 * @returns {Object}
 * @private
 */
class SymbolHandler {

    constructor(map) {
        this.map = map;
        this.symbolManager = new SymbolManager();
        this.singleSymbolRender = new SingleSymbolRender(map);
        this.compositeSymbolRender = new CompositeSymbolRender(map);
        this._layerSymbols = {};// 图层与symbol的映射关系
    }

    _update(map) {
        this.map = map;
        return this;
    }

    /**
     * 添加符号图层。
     * @param {Object} layer
     * @param {string} before
     */
    addLayer(layer, before) {
        if (typeof layer.symbol === 'string') {
            const id = layer.symbol;
            if (id) {
                const symbol = this.getSymbol(id);
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
     * 更新图层上的 symbol。
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
        const beforeId = layers[layerIndex + 1] && layers[layerIndex + 1].id;
        const layer = beforeId && this.map.style.getLayer(beforeId);
        const before = (layer && layer.id) || (beforeId && this.getFirstLayerId(beforeId));
        const orginLayer = layers[layerIndex];
        this.addLayer({ ...orginLayer, paint: {}, layout: {
            visibility: (orginLayer.layout && orginLayer.layout.visibility) || 'visible'
        }, symbol }, before);
    }

    /**
     * 处理 match 表达式为多个图层。
     * @param {object} layer
     * @returns {array}
     */
    getMatchLayers(layer) {
        const layers = [];
        const filter = ["all"];
        if (layer.filter) {
            filter.push(layer.filter);
        }
        const defaultFilter = [];
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
                defaultFilter.push([
                    "!=",
                    layer.symbol[1][1],
                    expression[index - 1]
                ]);
            } else if (index === expression.length - 1) {
                layers.unshift({ ...layer, "filter": [
                    ...filter,
                    ...defaultFilter
                ], symbol: r });
            }
        });
        return layers;
    }

    /**
     * 处理 match 表达式为多个图层。
     * @param {object} layer
     * @returns {array}
     */
    getCaseLayers(layer) {
        const layers = [];
        const filter = ["all"];
        if (layer.filter) {
            filter.push(layer.filter);
        }
        const defaultFilter = [];
        const expression = layer.symbol.slice(1);
        expression.forEach((r, index) => {
            if (index % 2 === 1) {
                layers.push({
                    ...layer, "filter": [
                        ...filter,
                        expression[index - 1]
                    ], symbol: r
                });
                defaultFilter.push(['!', expression[index - 1]])
            } else if (index === expression.length - 1) {
                layers.unshift({ ...layer, "filter": [
                    ...filter,
                    ...defaultFilter
                ], symbol: r });
            }
        });
        return layers;
    }

    /**
     * 将 symbol 表达式拆成 filter。
     * @param {object} layer
     * @param {string} before
     */
    addExpressionLayer(layer, before) {
        const rules = {
            match: this.getMatchLayers,
            case: this.getCaseLayers
        }
        const getLayersFn = rules[layer.symbol[0]];
        const layers = getLayersFn && getLayersFn(layer);
        if (!layers) {
            return this.map.fire('error', {
                error: new Error(`This expressions not supported`)
            });
        }
        layers.forEach((l) => {
            l.id = Util.createUniqueID(`${layer.id}_compositeLayer_`);
            this.compositeSymbolRender.addLayerId(layer.id, l.id);
            this.addLayer(l, before);
        });
    }

    /**
     * 通过 symbol 判断使用管理器。
     * @param {object | array} symbol
     * @returns {SingleSymbolRender | CompositeSymbolRender}
     */
    getSymbolRender(symbol) {
        return isMultiSymbol(symbol) ? this.compositeSymbolRender : this.singleSymbolRender;
    }

    /**
     * 将 Web 符号中的 image 添加到地图上。
     * @param {object} symbol
     * @param {object} image
     */
    addSymbolImageToMap(symbol, image) {
        const { type, name } = getImageKey(symbol);
        const id = symbol[type] && symbol[type][name];
        if (id && !this.map.hasImage(id)) {
            // 如果需要使用到 image 的需要 addImage
            this.map.addImage(id, image);
            // 为了解决 sdf 问题，需要把 load 后的 image 信息存下
            this.symbolManager.addImageInfo(id, image);
        }
    }

    /**
     * 给指定图层添加 symbol。
     * @param {string} id
     * @param {object} symbol
     */
    addSymbol(id, symbol) {
        if (this.getSymbol(id)) {
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
     * 设置 layer 对应的 symbol 属性值。
     * @param {string} layerId
     * @param {string | array} symbol
     */
    setSymbolTolayer(layerId, symbol) {
        this._layerSymbols[layerId] = symbol;
    }

    /**
     * 通过 layerID 获取 symbol 属性值。
     * @param {string} layerId
     * @return {string | array} symbol
     */
    getLayerSymbol(layerId) {
        return this._layerSymbols[layerId];
    }

    /**
     * 判断是否有 symbol。
     * @return {boolean}
     */
    hasSymbol() {
        return Object.keys(this._layerSymbols).length > 0;
    }

    /**
     * 删除 symbol。
     * @param {string} id
     */
    removeSymbol(id) {
        this.symbolManager.removeSymbol(id);
    }

    /**
     * 通过 symbolId 获取 symbol 内容。
     * @param {string} symbolId
     */
    getSymbol(symbolId) {
        return this.symbolManager.getSymbol(symbolId);
    }

    /**
     * 获取组合图层的子图层 IDs。
     * @param {string} layerId
     * @returns {array}
     */
    getLayerIds(layerId) {
        return this.compositeSymbolRender.getLayerIds(layerId) || [];
    }

    /**
     * 获取子图层 ID 对应的组合图层。
     * @param {string} layerId
     * @returns {string}
     */
    getLayerId(layerId) {
        return this.compositeSymbolRender.getLayerId(layerId);
    }

    /**
     * 删除图层 ID。
     * @param {string} layerId
     * @returns {string}
     */
    removeLayerId(layerId) {
        return this.compositeSymbolRender.removeLayerId(layerId);
    }

    /**
     * 获取指定 ID 的 layer。
     * @param {string} layerId
     * @returns {object}
     */
    getLayer(layerId) {
        const layer = this.map.getLayerBySymbolBak(layerId);
        const symbol = this.getLayerSymbol(layerId);
        if (layer) {
            return symbol ? { ...layer, symbol } : layer;
        } else {
            const layerIds = this.getLayerIds(layerId);
            if (layerIds[0]) {
                const reallayer = this.map.getLayerBySymbolBak(layerIds[0]);
                return reallayer && { ...reallayer, symbol, id: layerId }
            }
        }
    }

    /**
     * 删除指定图层。
     * @param {string} layerId
     */
    removeLayer(layerId) {
        const layerIds = this.getLayerIds(layerId);
        if (layerIds.length > 0) {
            layerIds.forEach(id => this.map.style.removeLayer(id));
            this.removeLayerId(layerId);
        } else {
            this.map.style.removeLayer(layerId);
        }
    }

    /**
     * 获取 style。
     * @returns {object}
     */
    getStyle() {
        const style = this.map.style.serialize();
        if (this.hasSymbol()) {
            style.layers = style.layers.reduce((pre, layer) => {
                const compositeId = this.getLayerId(layer.id);
                if (compositeId) {
                    !pre.find(l => l.id === compositeId) && pre.push({ ...layer, symbol: this.getLayerSymbol(compositeId), id: compositeId })
                } else if (this.getLayerSymbol(layer.id)) {
                    pre.push({ ...layer, symbol: this.getLayerSymbol(layer.id) })
                } else {
                    pre.push(layer);
                }
                return pre;
            }, []);
        }
        return style;
    }

    /**
     * 获取组合图层的子图层 ID。
     * @param {string} layerId
     * @returns {string | undefined}
     */
    getFirstLayerId(layerId) {
        const layerIds = this.getLayerIds(layerId);
        return layerIds[0];
    }

    /**
     * 扩展 map 的 moveLayer。
     * @param {string} layerId
     * @param {string | undefined} beforeId
     */
    moveLayer(layerId, beforeId) {
        const layerIds = this.getLayerIds(layerId);
        const layer = beforeId && this.map.style.getLayer(beforeId);
        const realBeforeId = (layer && layer.id) || (beforeId && this.getFirstLayerId(beforeId));
        if (layerIds.length > 0) {
            layerIds.forEach(id => this.map.style.moveLayer(id, realBeforeId));
        } else {
            this.map.style.moveLayer(layerId, realBeforeId);
        }
    }

    /**
     * 扩展 map 的。setFilter。
     * @param {string} layerId
     * @param {Array} filter
     * @param {object} options
     */
    setFilter(layerId, filter, options) {
        const symbol = this.getLayerSymbol(layerId);
        if (isMapboxExpression(symbol)) {
            // 如果 symbol 是数据驱动，filter需要重新计算
            const realLayerId = this.getFirstLayerId(layerId);
            this.map.style.setFilter(realLayerId, filter, options);
            const symbol = this.getLayerSymbol(layerId);
            this.setSymbol(layerId, symbol);
            return;
        }
        const layerIds = this.getLayerIds(layerId);
        if (layerIds.length > 0) {
            layerIds.forEach(id => this.map.style.setFilter(id, filter, options));
        } else {
            this.map.style.setFilter(layerId, filter, options);
        }
    }

    /**
     * 扩展 map 的 getFilter。
     * @param {string} layerId
     * @returns {object}
     */
    getFilter(layerId) {
        const realLayerId = this.getFirstLayerId(layerId);
        if (this.map.style.getLayer(realLayerId)) {
            return this.map.style.getFilter(realLayerId);
        }
    }

    /**
     * 扩展 map 的 setLayerZoomRange。
     * @param {string} layerId
     * @param {number} minzoom
     * @param {number} maxzoom
     */
    setLayerZoomRange(layerId, minzoom, maxzoom) {
        const layerIds = this.getLayerIds(layerId);
        if (layerIds.length > 0) {
            layerIds.forEach(id => this.map.style.setLayerZoomRange(id, minzoom, maxzoom));
        } else {
            this.map.style.setLayerZoomRange(layerId, minzoom, maxzoom);
        }
    }

    /**
     * 扩展 map 的 setPaintProperty。
     * @param {string} layerId
     * @param {string} name
     * @param {*} value
     * @param {object} options
     */
    setPaintProperty(layerId, name, value, options) {
        const layerIds = this.getLayerIds(layerId);
        if (layerIds.length > 0) {
            layerIds.forEach(id => this.map.style.setPaintProperty(id, name, value, options));
        } else {
            this.map.style.setPaintProperty(layerId, name, value, options);
        }
    }

    /**
     * 扩展 map 的 getPaintProperty。
     * @param {string} layerId
     * @param {string} name
     * @returns {object}
     */
    getPaintProperty(layerId, name) {
        const realLayerId = this.getFirstLayerId(layerId);
        return this.map.style.getPaintProperty(realLayerId, name);
    }

    /**
     * 扩展 map 的 setLayoutProperty。
     * @param {string} layerId
     * @param {string} name
     * @param {*} value
     * @param {object} options
     */
    setLayoutProperty(layerId, name, value, options) {
        const layerIds = this.getLayerIds(layerId);
        if (layerIds.length > 0) {
            layerIds.forEach(id => this.map.style.setLayoutProperty(id, name, value, options));
        } else {
            this.map.style.setLayoutProperty(layerId, name, value, options);
        }
    }

    /**
     * 扩展 map 的 getLayoutProperty。
     * @param {string} layerId
     * @param {string} name
     * @returns {object}
     */
    getLayoutProperty(layerId, name) {
        const realLayerId = this.getFirstLayerId(layerId);
        return this.map.style.getLayoutProperty(realLayerId, name);
    }

    /**
     * 遍历 this._layerSymbols，更新使用到symbolId的图层。
     * @param {string} symbolId 
     */
    updateLayerSymbol(symbolId) {
        Object.keys(this._layerSymbols).forEach(layerId => {
            const symbol = this._layerSymbols[layerId];
            if (symbol.includes(symbolId)) {
                this.setSymbol(layerId, symbol);
            }
        })
    }

    /**
     * 更新符号。
     * @param {string} symbolId 
     * @param {object | array} symbol 
     */
    updateSymbol(symbolId, symbol) {
        // symbol不存在
        if (!this.getSymbol(symbolId)) {
            return this.map.fire('error', {
                error: new Error(`Symbol "${symbolId}" could not be loaded. Please make sure you have added the symbol with map.addSymbol().`)
            });
        }
        if (validateSymbol(symbol)) {
            // 更新symbol
            this.symbolManager.addSymbol(symbolId, symbol);
            this.updateLayerSymbol(symbolId);
        } else {
            return this.map.fire('error', {
                error: new Error('Symbol is not supported expressions.')
            });
        }
    }

    /**
     * 设置 symbol 属性值。
     * @param {string} symbolId 
     * @param {number} symbolIndex 
     * @param {string} name 
     * @param {any} value
     */
    setSymbolProperty(symbolId, symbolIndex, name, value) {
        const symbol = this.getSymbol(symbolId);
        // symbol 不存在
        if (!symbol) {
            return this.map.fire('error', {
                error: new Error(`Symbol "${symbolId}" could not be loaded. Please make sure you have added the symbol with map.addSymbol().`)
            });
        }
        // value 不支持表达式
        if (isMapboxExpression(value)) {
            return this.map.fire('error', {
                error: new Error('Symbol value is not supported expressions.')
            });
        }
        const paintOrLayout = isPaintKey(name) ? 'paint' : 'layout';
        if (symbol.length > 0) {
            const symbolChild = symbol[symbolIndex];
            if (!symbolChild) {
                return this.map.fire('error', {
                    error: new Error(`symbol[${symbolIndex}] does not exist.`)
                });
            }
            if (!symbolChild[paintOrLayout]) {
                symbolChild[paintOrLayout] = {};
            }
            Object.assign(symbolChild[paintOrLayout], { [name]: value });
        } else {
            if (!symbol[paintOrLayout]) {
                symbol[paintOrLayout] = {};
            }
            Object.assign(symbol[paintOrLayout], { [name]: value });
        }
        // 更新 symbol
        this.symbolManager.addSymbol(symbolId, symbol);
        this.updateLayerSymbol(symbolId);
    }

    /**
     * 获取 symbol 的属性值
     * @param {string} symbolId 
     * @param {number} symbolIndex 
     * @param {string} name 
     * @returns {any}
     */
    getSymbolProperty(symbolId, symbolIndex, name) {
        const symbol = this.getSymbol(symbolId);
        // symbol 不存在
        if (!symbol) {
            this.map.fire('error', {
                error: new Error(`Symbol "${symbolId}" could not be loaded. Please make sure you have added the symbol with map.addSymbol().`)
            });
            return;
        }
        const paintOrLayout = isPaintKey(name) ? 'paint' : 'layout';
        if (symbol.length > 0) {
            return symbol[symbolIndex] && symbol[symbolIndex][paintOrLayout] && symbol[symbolIndex][paintOrLayout][name];
        } else {
            return symbol[paintOrLayout] && symbol[paintOrLayout][name];
        }
    }
}

export default SymbolHandler;
