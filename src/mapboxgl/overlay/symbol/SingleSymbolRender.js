/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
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
        if(layer.layout && layer.layout.visibility === 'none') {
            Object.assign(layer.layout, {visibility: 'visible'});
        }
        layer.paint && Object.assign(symbol.paint ?? {}, layer.paint);
        layer.layout && Object.assign(symbol.layout ?? {}, layer.layout);
        this.map.addLayerBySymbolBak({ ...layer, ...symbol }, before);
    }
}

export default SingleSymbolRender;
