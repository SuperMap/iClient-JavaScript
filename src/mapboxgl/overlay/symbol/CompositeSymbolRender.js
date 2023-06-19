import { Util } from "@supermap/iclient-common/commontypes/Util";
import SingleSymbolRender from "./SingleSymbolRender";

/**
 * 符号图层管理器
 * @returns {Object}
 * @private
 */
class CompositeSymbolRender {
    constructor(map) {
        this.map = map;
        this.singleSymbol = new SingleSymbolRender(map);
        this.layerIds = {};
    }

    /**
     * 符号转换成图层
     * @param {*} layer 
     * @param {*} before 
     * @returns {undefined}
     */
    addLayer(layer, symbol, before) {
        symbol.forEach((style) => {
            const id = Util.createUniqueID(`${layer.id}_`);
            this.singleSymbol.addLayer({ ...layer, id }, style, before);
            this.addLayerId(layer.id, id);
        })
    }

    /**
     * 添加图层
     * @param {string} id 
     * @param {string} childId 
     */
    addLayerId(id, childId) {
        if (!this.layerIds[id]) {
            this.layerIds[id] = [];
        }
        !this.layerIds[id].includes(childId) && this.layerIds[id].push(childId);
    }

    /**
     * 删除图层
     * @param {string} id 
     */
    removeLayerId(id) {
        delete this.layerIds[id];
    }

    /**
     * 获取图层
     * @param {string} id 
     * @returns {Array}
     */
    getLayerIds(id) {
        return this.layerIds[id];
    }

    /**
     * 获取组合图层ID
     * @param {string} childId 
     * @returns {string}
     */
    getLayerId(childId) {
        for (const id in this.layerIds) {
            if (this.layerIds[id].find(i => i === childId)) {
                return id;
            }
        }
    }
}

export default CompositeSymbolRender;