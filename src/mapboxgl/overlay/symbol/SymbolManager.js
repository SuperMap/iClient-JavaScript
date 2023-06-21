/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
class SymbolManager {
    symbols;// addSymbol接口添加的symbol信息
    images; // 在loadImage的时候存下image

    constructor() {
        this.symbols = {};
        this.images = {};
    }

    addSymbol(id, symbol) {
        this.symbols[id] = symbol;
    }

    getSymbol(id) {
        return this.symbols[id] && JSON.parse(JSON.stringify(this.symbols[id]));
    }

    removeSymbol(id) {
        delete this.symbols[id];
    }

    addImageInfo(id, image) {
        this.images[id] = image;
    }

    getImageInfo(id) {
        return this.images[id];
    }
}

export default SymbolManager;

