import { olExtends } from '../../../../src/openlayers/overlay/vectortile/olExtends.js';
import { LineString } from 'ol/geom';
import { Util } from '../../../../src/openlayers/core/Util';

describe('olExtends', () => {
  let originalOl;
  let originalGetOlVersion;
  let originalLineStringGetFlatMidpoint;

  beforeEach(() => {
    originalOl = window.ol;
    originalGetOlVersion = Util.getOlVersion;
    originalLineStringGetFlatMidpoint = LineString.prototype.getFlatMidpoint;
    
    // 删除可能存在的原型方法
    delete LineString.prototype.getFlatMidpoint;
    
    window.ol = {
      format: {
        MVT: {
          prototype: {}
        }
      },
      render: {
        canvas: {
          Replay: {
            prototype: {}
          },
          Instruction: {
            SET_FILL_STYLE: 'setFillStyle'
          }
        }
      },
      geom: {
        flat: {
          textpath: {},
          orient: {
            linearRingIsClockwise: jasmine.createSpy('linearRingIsClockwise').and.returnValue(true)
          }
        },
        GeometryType: {
          POINT: 'Point',
          LINE_STRING: 'LineString',
          POLYGON: 'Polygon',
          MULTI_POINT: 'MultiPoint',
          MULTI_LINE_STRING: 'MultiLineString'
        },
        GeometryLayout: {
          XY: 'XY'
        }
      },
      layer: {
        VectorTile: {
          prototype: {}
        }
      },
      renderer: {
        canvas: {
          VectorTileLayer: {
            prototype: {}
          }
        }
      },
      proj: {
        Units: {
          TILE_PIXELS: 'tile-pixels'
        },
        Projection: function(options) {
          this.code_ = options.code;
          this.units_ = options.units;
        }
      },
      math: {
        lerp: jasmine.createSpy('lerp').and.callFake((a, b, t) => a + (b - a) * t)
      }
    };
  });

  afterEach(() => {
    window.ol = originalOl;
    Util.getOlVersion = originalGetOlVersion;
    LineString.prototype.getFlatMidpoint = originalLineStringGetFlatMidpoint;
  });

  it('should add getFlatMidpoint method to LineString prototype if it does not exist', () => {
    expect(LineString.prototype.getFlatMidpoint).toBeUndefined();
    olExtends();
    expect(LineString.prototype.getFlatMidpoint).toBeDefined();
  });

  it('should modify ol.format.MVT and ol.render.canvas.Replay methods when OpenLayers version is 4', () => {
    spyOn(Util, 'getOlVersion').and.returnValue('4');
    const targetMap = {
      getView: () => ({
        getProjection: () => ({
          getExtent: () => [0, 0, 100, 100]
        })
      })
    };

    olExtends(targetMap);

    expect(window.ol.format.MVT.prototype.readProjection).toBeDefined();
    expect(window.ol.render.canvas.Replay.prototype.applyFill).toBeDefined();
  });

  it('should not modify ol.format.MVT and ol.render.canvas.Replay methods when OpenLayers version is not 4', () => {
    spyOn(Util, 'getOlVersion').and.returnValue('6');
    olExtends();

    expect(window.ol.format.MVT.prototype.readProjection).toBeUndefined();
    expect(window.ol.render.canvas.Replay.prototype.applyFill).toBeUndefined();
  });

  it('should add ol.geom.flat.textpath.lineString method', () => {
    spyOn(Util, 'getOlVersion').and.returnValue('4');
    olExtends();
    expect(window.ol.geom.flat.textpath.lineString).toBeDefined();
  });

  it('should add setFastRender and postCompose methods to VectorTileLayer and VectorTileRenderer', () => {
    spyOn(Util, 'getOlVersion').and.returnValue('4');
    const targetMap = {
      getView: () => ({
        getProjection: () => ({
          getExtent: () => [0, 0, 100, 100]
        })
      })
    };

    olExtends(targetMap);

    expect(window.ol.layer.VectorTile.prototype.setFastRender).toBeDefined();
    expect(window.ol.renderer.canvas.VectorTileLayer.prototype.postCompose).toBeDefined();
  });
});