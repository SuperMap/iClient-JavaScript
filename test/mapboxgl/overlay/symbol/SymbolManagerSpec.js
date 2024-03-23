import SymbolManager from '../../../../src/mapboxgl/overlay/symbol/SymbolManager'

describe('mapboxgl_SymbolManager', () => {

    it('addSymbol', () => {
      const symbolId = 'user-star';
      var symbolManager = new SymbolManager();
      const symbol = {
        "paint": {
          "line-width": 1.13,
          "line-color": "rgba(0, 0, 0, 1.00)",
          "line-dasharray": [15.05, 3.35, 15.05, 5.02, 5.02, 5.02]
        },
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        }
      };
      symbolManager.addSymbol(symbolId, symbol);
      const result = symbolManager.getSymbol(symbolId);
      expect(result).toEqual(symbol);

      symbolManager.removeSymbol(symbolId);
      const result2 = symbolManager.getSymbol(symbolId);
      expect(result2).toEqual(undefined);
    });

    it('getSymbol', () => {
      var symbolManager = new SymbolManager();
      const result = symbolManager.getSymbol();
      expect(result).toEqual(undefined);
    });

    it('addImageInfo', () => {
      var symbolManager = new SymbolManager();
      const imageId = 'star';
      const image = 'data:image/png;base64,iVBORw0KGgoAAAA'
      symbolManager.addImageInfo(imageId, image);

      const result = symbolManager.getImageInfo(imageId);
      expect(result).toEqual(image);
    });

    it('getImageInfo', () => {
      var symbolManager = new SymbolManager();
      const iamgeId = 'star'
      const result = symbolManager.getImageInfo(iamgeId);
      expect(result).toEqual(undefined);
    });
});
