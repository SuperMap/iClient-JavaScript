import {
  flipImageVertically,
  isMapVersionGreaterThan,
  isSameRasterLayer
} from '../../../../src/common/mapping/utils/util';

describe('util', () => {
  describe('flipImageVertically', () => {
    it('flips RGBA rows in a typed array', () => {
      const pixels = new Uint8Array([
        1, 2, 3, 4, 5, 6, 7, 8,
        9, 10, 11, 12, 13, 14, 15, 16
      ]);

      expect(flipImageVertically(pixels, 2, 2)).toEqual(new Uint8Array([
        9, 10, 11, 12, 13, 14, 15, 16,
        1, 2, 3, 4, 5, 6, 7, 8
      ]));
    });

    it('accepts ImageData-like objects and a single-row image', () => {
      const pixels = new Uint8ClampedArray([1, 2, 3, 4, 5, 6, 7, 8]);
      const result = flipImageVertically({ data: pixels }, 2, 1);

      expect(result).toEqual(new Uint8Array(pixels));
    });
  });

  describe('isMapVersionGreaterThan', () => {
    it('compares numeric version components', () => {
      expect(isMapVersionGreaterThan('3.3.8', '3.3.7')).toBe(true);
      expect(isMapVersionGreaterThan('3.3.10', '3.3.7')).toBe(true);
      expect(isMapVersionGreaterThan('3.4.0', '3.3.7')).toBe(true);
      expect(isMapVersionGreaterThan('4.0.0', '3.3.7')).toBe(true);
      expect(isMapVersionGreaterThan('3.3.7', '3.3.7')).toBe(false);
      expect(isMapVersionGreaterThan('3.3.6', '3.3.7')).toBe(false);
    });

    it('returns false when either version is absent or not a string', () => {
      expect(isMapVersionGreaterThan(undefined, '3.3.7')).toBe(false);
      expect(isMapVersionGreaterThan('3.3.8', undefined)).toBe(false);
    });
  });

  it('isSameRasterLayer', (done) => {
    let res = isSameRasterLayer(
      { type: 'raster', tiles: ['http:17.0.0.1:8190/iserver/rest/maps/China'] },
      { type: 'raster', tiles: ['http:17.0.0.1:8190/iserver/rest/maps/ChinaDark'] }
    );
    expect(res).toBeFalse();
    let res1 = isSameRasterLayer(
      { type: 'raster', tiles: ['http:17.0.0.1:8190/iserver/map-China100/rest/maps/China'] },
      { type: 'raster', tiles: ['http:17.0.0.1:8190/iserver/map-China100/rest/maps/China/tileImage.png?a=1234'] }
    );
    expect(res1).toBeTruthy();
    let res12 = isSameRasterLayer(
      { type: 'raster', tiles: ['http:17.0.0.1:8190/iserver/map-China100/rest/maps/China'] },
      { type: 'raster', tiles: ['http:17.0.0.1:8190/iserver/map-China100/rest/maps/China?a=1234'] }
    );
    expect(res12).toBeTruthy();
    let res3 = isSameRasterLayer(
      { type: 'raster', tiles: ['http:17.0.0.1:8190/iserver/map-China100/rest/maps/China?a=1234'] },
      { type: 'raster', tiles: ['http:17.0.0.1:8190/iserver/map-China100/rest/maps/China/tileImage.png?a=1234'] }
    );
    expect(res3).toBeTruthy();
    done();
  });
});
