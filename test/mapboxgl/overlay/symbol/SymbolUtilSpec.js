var {
  isMultiSymbol,
  getImageKey,
  getSymbolType,
  isMapboxExpression,
  validateStyleKey,
  validateSymbol
} = require("../../../../src/mapboxgl/overlay/symbol/SymbolUtil");

describe('SymbolUtilSpec', () => {
  it('isMultiSymbol', () => {
    var res = isMultiSymbol([]);
    expect(res).toBeFalsy();
  });

  it('getSymbolType', () => {
    var symbol = {
      paint: {
        "line-width": 1
      }
    };
    var res = getSymbolType(symbol);
    expect(res === 'line').toBeTruthy();
  });

  it('getImageKey', () => {
    var symbol = {
      paint: {
        "line-width": 1
      }
    };
    var res = getImageKey(symbol);
    expect(res.name).toEqual('line-pattern');
  });

  it('isMapboxExpression', () => {
    var res1 = isMapboxExpression([
      "all",
      [
        "==",
        "$type",
        "LineString"
      ]
    ]);
    expect(res1).toEqual(true);
    var res2 = isMapboxExpression([]);
    expect(res2).toEqual(false);
  });

  it('validateStyleKey', () => {
    var res = validateStyleKey([
      "all",
      [
        "==",
        "$type",
        "LineString"
      ]
    ]);
    expect(res).toBeFalsy();
  });
  it('validateSymbol', () => {
    var symbol = {
      paint: {
        "line-width": 1
      }
    };
    var res = validateSymbol(symbol);
    expect(res).toBeTruthy();
  });

});
