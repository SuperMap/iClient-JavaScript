/**
 * 单个符号
 * @returns {Object}
 * @private
 */
class SingleSymbolRender {
    constructor(map) {
        this.map = map;
    }

    /**
     * 符号转换成图层
     * @param {*} layer
     * @param {*} before
     */
    addLayer(layer, symbol, before) {
        delete symbol.layout?.visibility;
        layer.paint && Object.assign(symbol.paint ?? {}, layer.paint);
        layer.layout && Object.assign(symbol.layout ?? {}, layer.layout);
        this.map.addLayerBySymbolBak({ ...layer, ...symbol }, before);
    }
}

export default SingleSymbolRender;
