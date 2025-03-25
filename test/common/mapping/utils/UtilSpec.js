import { isSameRasterLayer } from '../../../../src/common/mapping/utils/util';

describe('util', () => {
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
