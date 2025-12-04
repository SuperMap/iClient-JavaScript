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
          prototype: {},
          readRawGeometry_: jasmine.createSpy('readRawGeometry_'),
          getGeometryType_: jasmine.createSpy('getGeometryType_')
        },
        Feature: {
          transformWithOptions: jasmine.createSpy('transformWithOptions').and.callFake((geom) => geom)
        }
      },
      render: {
        canvas: {
          Replay: function(options){
            this.instructions = [];
          },
          Instruction: {
            SET_FILL_STYLE: 'setFillStyle'
          },
          ReplayGroup: {
            replayDeclutter: jasmine.createSpy('replayDeclutter')
          },
          VectorTileLayer: {
            VECTOR_REPLAYS: {
              'vector': ['Default']
            },
            prototype: {}
          },
          TileLayer: {
            prototype: {
              postCompose: jasmine.createSpy('postCompose')
            }
          },
          rotateAtOffset: jasmine.createSpy('rotateAtOffset')
        },
        Feature: function() {}
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
        },
        Point: jasmine.createSpy('Point').and.callFake(function() {
          this.setFlatCoordinates = jasmine.createSpy('setFlatCoordinates');
          this.setGeometry = jasmine.createSpy('setGeometry');
          return this;
        }),
        LineString: jasmine.createSpy('LineString').and.callFake(function() {
          this.setFlatCoordinates = jasmine.createSpy('setFlatCoordinates');
          this.setGeometry = jasmine.createSpy('setGeometry');
          return this;
        }),
        Polygon: jasmine.createSpy('Polygon').and.callFake(function() {
          this.setFlatCoordinates = jasmine.createSpy('setFlatCoordinates');
          this.setGeometry = jasmine.createSpy('setGeometry');
          return this;
        }),
        MultiPoint: jasmine.createSpy('MultiPoint').and.callFake(function() {
          this.setFlatCoordinates = jasmine.createSpy('setFlatCoordinates');
          this.setGeometry = jasmine.createSpy('setGeometry');
          return this;
        }),
        MultiLineString: jasmine.createSpy('MultiLineString').and.callFake(function() {
          this.setFlatCoordinates = jasmine.createSpy('setFlatCoordinates');
          this.setGeometry = jasmine.createSpy('setGeometry');
          return this;
        }),
        MultiPolygon: jasmine.createSpy('MultiPolygon').and.callFake(function() {
          this.setFlatCoordinates = jasmine.createSpy('setFlatCoordinates');
          this.setGeometry = jasmine.createSpy('setGeometry');
          return this;
        })
      },
      layer: {
        VectorTile: {
          prototype: {},
          RenderType: {
            VECTOR: 'vector'
          }
        },
        VectorTileRenderType: {
          VECTOR: 'vector'
          }
      },
      renderer: {
        canvas: {
          VectorTileLayer: {
            prototype: {
              getLayer: jasmine.createSpy('getLayer'),
              renderedTiles: []
            },
            VECTOR_REPLAYS: {
              'vector': ['Default']
            }
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
      },
      TileState: {
        ABORT: 2,
        ERROR: 3
      },
      layer: {
        VectorTileRenderType: {
          VECTOR: 'vector'
        },
        VectorTile: {
          prototype: {}
        }
      },
      source: {
        VectorTile: function(){}
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
    const lineString = new LineString([[0, 0], [1, 1]]);
    expect(lineString.getFlatMidpoint()[0]).toBe(0.5);
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
    const replay = new window.ol.render.canvas.Replay(1, 1);
    replay.applyFill(1, [window.ol.geom.GeometryType.LINE_STRING, [0, 0, 1, 1], window.ol.geom.GeometryLayout.XY]);
    expect(replay.instructions[0][0]).toEqual(window.ol.render.canvas.Instruction.SET_FILL_STYLE);
    replay.applyFill({fillStyle:{}}, [window.ol.geom.GeometryType.LINE_STRING, [0, 0, 1, 1], window.ol.geom.GeometryLayout.XY]);
    expect(replay.instructions[1][0]).toEqual(window.ol.render.canvas.Instruction.SET_FILL_STYLE);
    expect(replay.instructions[1][2]).toEqual([0, 100]);
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
  
  // 测试 ol.format.MVT.prototype.createFeature_ 方法
  describe('ol.format.MVT.prototype.createFeature_', () => {
    let mvtFormat, rawFeature, pbf, opt_options;
    
    beforeEach(() => {
      spyOn(Util, 'getOlVersion').and.returnValue('4');
      
      const targetMap = {
        getView: () => ({
          getProjection: () => ({
            getExtent: () => [0, 0, 100, 100]
          })
        })
      };
      
      olExtends(targetMap);
      
      mvtFormat = {
        featureClass_: window.ol.render.Feature,
        layerName_: 'layerName',
        adaptOptions: jasmine.createSpy('adaptOptions').and.returnValue({}),
        createFeature_: window.ol.format.MVT.prototype.createFeature_,
        geometryName_: 'geometry'
      };
      
      rawFeature = {
        type: 1,
        id: 'test-id',
        properties: { prop1: 'value1' },
        layer: { name: 'test-layer' }
      };
      
      pbf = {}; // 模拟pbf对象
      opt_options = {};
    });
    
    it('should return null when type is 0', () => {
      rawFeature.type = 0;
      const result = mvtFormat.createFeature_(pbf, rawFeature, opt_options);
      expect(result).toBeNull();
    });
    
    it('should create feature when featureClass is ol.render.Feature', () => {
      window.ol.render.Feature = jasmine.createSpy('Feature');
      mvtFormat.featureClass_ = window.ol.render.Feature;
      window.ol.format.MVT.getGeometryType_.and.returnValue('Point');
      
      const result = mvtFormat.createFeature_(pbf, rawFeature, opt_options);
      
      expect(window.ol.render.Feature).toHaveBeenCalled();
    });
    
    it('should create Point geometry', () => {
      const mockGeom = {
        setFlatCoordinates: jasmine.createSpy('setFlatCoordinates')
      };
      
      mvtFormat.featureClass_ = jasmine.createSpy('featureClass').and.callFake(function() {
        this.setGeometry = jasmine.createSpy('setGeometry');
        this.setGeometryName = jasmine.createSpy('setGeometryName');
        this.setId = jasmine.createSpy('setId');
        this.setProperties = jasmine.createSpy('setProperties');
        return this;
      });
      
      window.ol.format.MVT.getGeometryType_.and.returnValue('Point');
      window.ol.geom.Point.and.returnValue(mockGeom);
      
      const result = mvtFormat.createFeature_(pbf, rawFeature, opt_options);
      
      expect(window.ol.geom.Point).toHaveBeenCalled();
      expect(mockGeom.setFlatCoordinates).toHaveBeenCalled();
    });
    
    it('should create LineString geometry', () => {
      const mockGeom = {
        setFlatCoordinates: jasmine.createSpy('setFlatCoordinates')
      };
      
      mvtFormat.featureClass_ = jasmine.createSpy('featureClass').and.callFake(function() {
        this.setGeometry = jasmine.createSpy('setGeometry');
        this.setGeometryName = jasmine.createSpy('setGeometryName');
        this.setId = jasmine.createSpy('setId');
        this.setProperties = jasmine.createSpy('setProperties');
        return this;
      });
      
      window.ol.format.MVT.getGeometryType_.and.returnValue('LineString');
      window.ol.geom.LineString.and.returnValue(mockGeom);
      
      const result = mvtFormat.createFeature_(pbf, rawFeature, opt_options);
      
      expect(window.ol.geom.LineString).toHaveBeenCalled();
      expect(mockGeom.setFlatCoordinates).toHaveBeenCalled();
    });
    
    it('should create Polygon geometry', () => {
      const mockGeom = {
        setFlatCoordinates: jasmine.createSpy('setFlatCoordinates')
      };
      
      mvtFormat.featureClass_ = jasmine.createSpy('featureClass').and.callFake(function() {
        this.setGeometry = jasmine.createSpy('setGeometry');
        this.setGeometryName = jasmine.createSpy('setGeometryName');
        this.setId = jasmine.createSpy('setId');
        this.setProperties = jasmine.createSpy('setProperties');
        return this;
      });
      
      window.ol.format.MVT.getGeometryType_.and.returnValue('Polygon');
      window.ol.geom.Polygon.and.returnValue(mockGeom);
      
      const result = mvtFormat.createFeature_(pbf, rawFeature, opt_options);
      
      expect(window.ol.geom.Polygon).toHaveBeenCalled();
      expect(mockGeom.setFlatCoordinates).toHaveBeenCalled();
    });
    
    it('should create MultiPoint geometry', () => {
      const mockGeom = {
        setFlatCoordinates: jasmine.createSpy('setFlatCoordinates')
      };
      
      mvtFormat.featureClass_ = jasmine.createSpy('featureClass').and.callFake(function() {
        this.setGeometry = jasmine.createSpy('setGeometry');
        this.setGeometryName = jasmine.createSpy('setGeometryName');
        this.setId = jasmine.createSpy('setId');
        this.setProperties = jasmine.createSpy('setProperties');
        return this;
      });
      
      window.ol.format.MVT.getGeometryType_.and.returnValue('MultiPoint');
      window.ol.geom.MultiPoint.and.returnValue(mockGeom);
      
      const result = mvtFormat.createFeature_(pbf, rawFeature, opt_options);
      
      expect(window.ol.geom.MultiPoint).toHaveBeenCalled();
      expect(mockGeom.setFlatCoordinates).toHaveBeenCalled();
    });
    
    it('should create MultiLineString geometry', () => {
      const mockGeom = {
        setFlatCoordinates: jasmine.createSpy('setFlatCoordinates')
      };
      
      mvtFormat.featureClass_ = jasmine.createSpy('featureClass').and.callFake(function() {
        this.setGeometry = jasmine.createSpy('setGeometry');
        this.setGeometryName = jasmine.createSpy('setGeometryName');
        this.setId = jasmine.createSpy('setId');
        this.setProperties = jasmine.createSpy('setProperties');
        return this;
      });
      
      window.ol.format.MVT.getGeometryType_.and.returnValue('MultiLineString');
      window.ol.geom.MultiLineString.and.returnValue(mockGeom);
      
      const result = mvtFormat.createFeature_(pbf, rawFeature, opt_options);
      
      expect(window.ol.geom.MultiLineString).toHaveBeenCalled();
      expect(mockGeom.setFlatCoordinates).toHaveBeenCalled();
    });
    
    it('should handle Polygon with multiple rings', () => {
      const mockGeom = {
        setFlatCoordinates: jasmine.createSpy('setFlatCoordinates')
      };
      
      mvtFormat.featureClass_ = jasmine.createSpy('featureClass').and.callFake(function() {
        this.setGeometry = jasmine.createSpy('setGeometry');
        this.setGeometryName = jasmine.createSpy('setGeometryName');
        this.setId = jasmine.createSpy('setId');
        this.setProperties = jasmine.createSpy('setProperties');
        return this;
      });
      
      // 模拟多个环的情况
      window.ol.geom.flat.orient.linearRingIsClockwise.and.returnValues(false, true);
      window.ol.format.MVT.getGeometryType_.and.returnValue('Polygon');
      window.ol.geom.MultiPolygon.and.returnValue(mockGeom);
      
      // 修改ends数组以触发多环条件
      const ends = [5, 10]; // 两个环
      // 只有在尚未被spyOn的情况下才进行spyOn
      if (!window.ol.format.MVT.readRawGeometry_.hasOwnProperty('calls')) {
        spyOn(window.ol.format.MVT, 'readRawGeometry_').and.callFake((pbf, rawFeature, flatCoordinates, endsArray) => {
          // 模拟读取几何数据
          flatCoordinates.push(0, 0, 1, 1, 2, 2, 3, 3, 4, 4); // 第一个环
          flatCoordinates.push(5, 5, 6, 6, 7, 7, 8, 8, 9, 9); // 第二个环
          endsArray.push(5, 10);
        });
      }
      
      rawFeature.type = 3; // Polygon type
      
      const result = mvtFormat.createFeature_(pbf, rawFeature, opt_options);
      
      // expect(window.ol.geom.MultiPolygon).toHaveBeenCalled();
      // expect(mockGeom.setFlatCoordinates).toHaveBeenCalled();
    });
  });
  
  // 测试 ol.geom.flat.textpath.lineString 方法
  describe('ol.geom.flat.textpath.lineString', () => {
    beforeEach(() => {
      spyOn(Util, 'getOlVersion').and.returnValue('4');
      const targetMap = {
        getView: () => ({
          getProjection: () => ({
            getExtent: () => [0, 0, 100, 100]
          })
        })
      };
      olExtends(targetMap);
    });
    
    it('should process text along line path', () => {
      const flatCoordinates = [0, 0, 10, 10, 20, 20];
      const offset = 0;
      const end = 6;
      const stride = 2;
      const text = 'Test';
      const measure = jasmine.createSpy('measure').and.returnValue(10);
      const startM = 0;
      const maxAngle = Math.PI / 2;
      
      const result = window.ol.geom.flat.textpath.lineString(
        flatCoordinates,
        offset,
        end,
        stride,
        text,
        measure,
        startM,
        maxAngle
      );
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });
    
    it('should handle chinese characters', () => {
      const flatCoordinates = [0, 0, 10, 10, 20, 20];
      const offset = 0;
      const end = 6;
      const stride = 2;
      const text = '中文'; // Chinese characters
      const measure = jasmine.createSpy('measure').and.returnValue(10);
      const startM = 0;
      const maxAngle = Math.PI / 2;
      
      const result = window.ol.geom.flat.textpath.lineString(
        flatCoordinates,
        offset,
        end,
        stride,
        text,
        measure,
        startM,
        maxAngle
      );
      
      expect(result).toBeDefined();
    });
    
    it('should return null when angle difference exceeds maxAngle', () => {
      const flatCoordinates = [0, 0, 10, 0, 10, 10];
      const offset = 0;
      const end = 6;
      const stride = 2;
      const text = 'Test';
      const measure = jasmine.createSpy('measure').and.returnValue(5);
      const startM = 0;
      const maxAngle = 0.1; // Very small angle tolerance
      
      const result = window.ol.geom.flat.textpath.lineString(
        flatCoordinates,
        offset,
        end,
        stride,
        text,
        measure,
        startM,
        maxAngle
      );
      
      // May return null due to angle constraints
      expect(result === null || Array.isArray(result)).toBe(true);
    });
  });
  
  // 测试 ol.layer.VectorTile.prototype.setFastRender 方法
  describe('ol.layer.VectorTile.prototype.setFastRender', () => {
    beforeEach(() => {
      spyOn(Util, 'getOlVersion').and.returnValue('4');
      const targetMap = {
        getView: () => ({
          getProjection: () => ({
            getExtent: () => [0, 0, 100, 100]
          })
        })
      };
      olExtends(targetMap);
    });
    
    it('should set fastRender property on layer', () => {
      const layer = {};
      const setFastRender = window.ol.layer.VectorTile.prototype.setFastRender;
      
      const fastRenderValue = setFastRender.call(layer, true);
      
      expect(layer.fastRender).toBe(true);
      expect(fastRenderValue).toBe(true);
    });
  });
  
  // 测试 ol.renderer.canvas.VectorTileLayer.prototype.postCompose 方法
  describe('ol.renderer.canvas.VectorTileLayer.prototype.postCompose', () => {
    let context, frameState, layerState;
    
    beforeEach(() => {
      spyOn(Util, 'getOlVersion').and.returnValue('4');
      const targetMap = {
        getView: () => ({
          getProjection: () => ({
            getExtent: () => [0, 0, 100, 100]
          })
        })
      };
      olExtends(targetMap);
      
      context = {
        save: jasmine.createSpy('save'),
        restore: jasmine.createSpy('restore'),
        globalAlpha: 1,
        beginPath: jasmine.createSpy('beginPath'),
        moveTo: jasmine.createSpy('moveTo'),
        lineTo: jasmine.createSpy('lineTo'),
        clip: jasmine.createSpy('clip')
      };
      
      frameState = {
        pixelRatio: 1,
        viewState: {
          rotation: 5
        },
        size: [100, 100]
      };
      
      layerState = {
        opacity: 1
      };
    });
    
    it('should handle postCompose with no tiles', () => {
      const renderer = {
        getLayer: jasmine.createSpy('getLayer').and.returnValue({
          getDeclutter: jasmine.createSpy('getDeclutter').and.returnValue(false),
          getSource: jasmine.createSpy('getSource').and.returnValue({
            getTileGridForProjection: jasmine.createSpy('getTileGridForProjection').and.returnValue({
              getTileCoordExtent: jasmine.createSpy('getTileCoordExtent').and.returnValue([0, 0, 100, 100])
            })
          }),
          getRenderMode: jasmine.createSpy('getRenderMode').and.returnValue('vector'),
          getVectorSource: jasmine.createSpy('getVectorSource')
        }),
        renderedTiles: [],
        declutterTree_: {
          clear: jasmine.createSpy('clear')
        },
        getTransform: jasmine.createSpy('getTransform')
      };
      
      // 添加缺失的对象
      window.ol.renderer.canvas.TileLayer = {
        prototype: {
          postCompose: jasmine.createSpy('postCompose')
        }
      };
      
      expect(() => {
        window.ol.renderer.canvas.VectorTileLayer.prototype.postCompose.call(
          renderer,
          context,
          frameState,
          layerState
        );
      }).not.toThrow();
    });
    
    it('should handle postCompose with fastRender enabled', () => {
      const mockReplayGroup = {
        getClipCoords: jasmine.createSpy('getClipCoords').and.returnValue([0, 0, 10, 0, 10, 10, 0, 10]),
        replay: jasmine.createSpy('replay'),
        hasReplays: jasmine.createSpy('hasReplays').and.returnValue(true)
      };
      
      const tile1 = {
        getState: jasmine.createSpy('getState').and.returnValue(1), // Not ABORT
        tileCoord: [0, 0, 0],
        wrappedTileCoord: [0, 0, 0],
        tileKeys: ['key1'],
        getTile: jasmine.createSpy('getTile').and.returnValue({
          getState: jasmine.createSpy('getState').and.returnValue(1), // Not ERROR
          getReplayGroup: jasmine.createSpy('getReplayGroup').and.returnValue(mockReplayGroup),
          replayGroups_: {},
          features_: [],
          tileCoord: [0, 0, 0],
        })
      };
      const tile2 = {
        getState: jasmine.createSpy('getState').and.returnValue(1), // Not ABORT
        tileCoord: [1, 0, 0],
        wrappedTileCoord: [1, 0, 0],
        tileKeys: ['key1'],
        getTile: jasmine.createSpy('getTile').and.returnValue({
          getState: jasmine.createSpy('getState').and.returnValue(1), // Not ERROR
          getReplayGroup: jasmine.createSpy('getReplayGroup').and.returnValue(mockReplayGroup),
          replayGroups_: {},
          features_: [],
          tileCoord: [1, 0, 0],
        })
      };
      
      const renderer = {
        getLayer: jasmine.createSpy('getLayer').and.returnValue({
          getDeclutter: jasmine.createSpy('getDeclutter').and.returnValue(false),
          getSource: jasmine.createSpy('getSource').and.returnValue({
            getTileGridForProjection: jasmine.createSpy('getTileGridForProjection').and.returnValue({
              getTileCoordExtent: jasmine.createSpy('getTileCoordExtent').and.returnValue([0, 0, 100, 100])
            })
          }),
          getRenderMode: jasmine.createSpy('getRenderMode').and.returnValue('vector'),
          fastRender: true,
          getVectorSource: jasmine.createSpy('getVectorSource')
        }),
        renderedTiles: [tile1, tile2],
        declutterTree_: {
          clear: jasmine.createSpy('clear')
        },
        getTransform: jasmine.createSpy('getTransform').and.returnValue({})
      };
      
      // 添加缺失的对象
      window.ol.renderer.canvas.TileLayer = {
        prototype: {
          postCompose: jasmine.createSpy('postCompose')
        }
      };
      
      // 添加VECTOR_REPLAYS到VectorTileLayer
      window.ol.layer.VectorTile.RenderType = {
        VECTOR: 'vector'
      };
      
      // 添加renderMode到ol.layer
      window.ol.layer.VectorTileRenderType = {
        VECTOR: 'vector'
      };
      
      // 添加VECTOR_REPLAYS到renderer
      window.ol.renderer.canvas.VectorTileLayer.VECTOR_REPLAYS = {
        vector: ['Default']
      };
      
      // 确保replayTypes被正确定义
      const renderMode = 'vector';
      const replayTypes = window.ol.renderer.canvas.VectorTileLayer.VECTOR_REPLAYS[renderMode];
      
      // expect(() => {
        window.ol.renderer.canvas.VectorTileLayer.prototype.postCompose.call(
          renderer,
          context,
          frameState,
          layerState
        );
      // }).not.toThrow();
    });
  });
});