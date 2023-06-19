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

    getImageInfoByLayerId(layerId) {
        return this.getImageInfo(this.getSymbolByLayerId(layerId)?.image);
    }
}

export default SymbolManager;

