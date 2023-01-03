import '../../libs/deck.gl/5.1.3/deck.gl';
import { CloverShape } from '../../../src/openlayers/overlay/graphic/CloverShape';
import { HitCloverShape } from '../../../src/openlayers/overlay/graphic/HitCloverShape';

import { Graphic as GraphicObj } from '../../../src/openlayers/overlay/graphic/Graphic';

import { Graphic as GraphicSource } from '../../../src/openlayers/overlay/Graphic.js';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import Map from 'ol/Map';
import View from 'ol/View';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Point from 'ol/geom/Point';
import ImageLayer from 'ol/layer/Image';
import RegularShape from 'ol/style/RegularShape';
import { unByKey } from 'ol/Observable';

var url = 'http://supermapiserver:8090/iserver/services/map-china400/rest/maps/China_4326';
describe('openlayers_GraphicLayer', () => {
  var originalTimeout;
  var testDiv, map, graphicLayer;
  var coors = [
    [-35.16, 38.05],
    [-36.16, 39.05],
    [-36.16, 40.05],
    [-37.16, 40.05],
    [-38.16, 39.05]
  ];
  var escapedJson =
    '{"viewBounds":{"top":66.5212729371629,"left":-66.52127293716292,"bottom":-66.52127293716293,"leftBottom":{"x":-66.52127293716292,"y":-66.52127293716293},"right":66.52127293716292,"rightTop":{"x":66.52127293716292,"y":66.5212729371629}},"viewer":{"leftTop":{"x":0,"y":0},"top":0,"left":0,"bottom":256,"rightBottom":{"x":256,"y":256},"width":256,"right":256,"height":256},"distanceUnit":"METER","minVisibleTextSize":0.1,"coordUnit":"DEGREE","scale":4.573415833095347E-9,"description":"","paintBackground":true,"maxVisibleTextSize":1000,"maxVisibleVertex":3600000,"clipRegionEnabled":false,"antialias":true,"textOrientationFixed":false,"angle":0,"prjCoordSys":{"distanceUnit":"METER","projectionParam":null,"epsgCode":4326,"coordUnit":"DEGREE","name":"Longitude / Latitude Coordinate System---GCS_WGS_1984","projection":null,"type":"PCS_EARTH_LONGITUDE_LATITUDE","coordSystem":{"datum":{"name":"D_WGS_1984","type":"DATUM_WGS_1984","spheroid":{"flatten":0.00335281066474748,"name":"WGS_1984","axis":6378137,"type":"SPHEROID_WGS_1984"}},"unit":"DEGREE","spatialRefType":"SPATIALREF_EARTH_LONGITUDE_LATITUDE","name":"GCS_WGS_1984","type":"GCS_WGS_1984","primeMeridian":{"longitudeValue":0,"name":"Greenwich","type":"PRIMEMERIDIAN_GREENWICH"}}},"minScale":0,"markerAngleFixed":false,"overlapDisplayedOptions":{"allowPointWithTextDisplay":true,"horizontalOverlappedSpaceSize":0,"allowPointOverlap":false,"allowThemeGraduatedSymbolOverlap":false,"verticalOverlappedSpaceSize":0,"allowTextOverlap":false,"allowThemeGraphOverlap":false,"allowTextAndPointOverlap":false},"visibleScales":[1.6901635716026555E-9,3.3803271432053056E-9,6.760654286410611E-9,1.3521308572821242E-8,2.7042617145642484E-8,5.408523429128511E-8,1.0817046858256998E-7,2.1634093716513974E-7,4.3268187433028044E-7,8.653637486605571E-7,1.7307274973211203E-6,3.4614549946422405E-6,6.9229099892844565E-6],"visibleScalesEnabled":false,"customEntireBoundsEnabled":false,"clipRegion":{"center":null,"parts":null,"style":null,"prjCoordSys":null,"id":0,"type":"REGION","partTopo":null,"points":null},"maxScale":1.0E12,"customParams":"","center":{"x":0,"y":-1.4210854715202004E-14},"dynamicPrjCoordSyses":[{"distanceUnit":null,"projectionParam":null,"epsgCode":0,"coordUnit":null,"name":null,"projection":null,"type":"PCS_ALL","coordSystem":null}],"colorMode":"DEFAULT","textAngleFixed":false,"overlapDisplayed":false,"userToken":{"userID":""},"cacheEnabled":true,"dynamicProjection":true,"autoAvoidEffectEnabled":true,"customEntireBounds":null,"name":"China_4326","bounds":{"top":85.05112877980648,"left":-180,"bottom":-85.0511287798065,"leftBottom":{"x":-180,"y":-85.0511287798065},"right":180,"rightTop":{"x":180,"y":85.05112877980648}},"backgroundStyle":{"fillGradientOffsetRatioX":0,"markerSize":2.4,"fillForeColor":{"red":255,"green":255,"blue":255,"alpha":255},"fillGradientOffsetRatioY":0,"markerWidth":0,"markerAngle":0,"fillSymbolID":0,"lineColor":{"red":0,"green":0,"blue":0,"alpha":255},"markerSymbolID":0,"lineWidth":0.1,"markerHeight":0,"fillOpaqueRate":100,"fillBackOpaque":true,"fillBackColor":{"red":255,"green":255,"blue":255,"alpha":255},"fillGradientMode":"NONE","lineSymbolID":0,"fillGradientAngle":0}}';
  beforeAll(() => {
    testDiv = window.document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.styleFloat = 'left';
    testDiv.style.marginLeft = '8px';
    testDiv.style.marginTop = '50px';
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    window.document.body.appendChild(testDiv);
  });
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    map.removeLayer(graphicLayer);
    graphicLayer = null;
    map = null;
  });
  afterAll(() => {
    document.body.removeChild(testDiv);
  });
  it('constructor_canvas', (done) => {
    spyOn(FetchRequest, 'commit').and.callFake(() => {
      return Promise.resolve(new Response(escapedJson));
    });
    var count = 5; //矢量点的个数
    var graphics = [];
    map = new Map({
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
      }),
      renderer: ['canvas']
    });
    map.once('postrender', function () {
      var randomCircleStyles = new CircleStyle({
        radius: 5,
        fill: new Fill({
          color: '#000000'
        }),
        stroke: new Stroke({
          color: '#000000'
        })
      });
      for (var j = 0; j < count; ++j) {
        graphics[j] = new GraphicObj(new Point(coors[j]));
        graphics[j].setStyle(randomCircleStyles);
      }
      var clone = graphics[0].clone();
      expect(clone.getId()).toEqual(graphics[0].getId());
      expect(clone.getGeometry()).toEqual(graphics[0].getGeometry());
      expect(clone.getStyle()).toEqual(graphics[0].getStyle());
      clone.destroy();
      graphicLayer = new ImageLayer({
        source: new GraphicSource({
          graphics: graphics,
          map: map,
          highLightStyle: new CircleStyle({
            radius: 5,
            fill: new Fill({
              color: '#000000'
            }),
            stroke: new Stroke({
              color: '#000000'
            })
          })
        })
      });
      map.addLayer(graphicLayer);
      var a = new GraphicSource({
        graphics: graphics,
        map: map
      })._forEachFeatureAtCoordinate(coors[1], 1, (result) => {
        expect(result).not.toBeNull();
      });
      done();
    });
  });

  xit('constructor_webgl', (done) => {
    spyOn(FetchRequest, 'commit').and.callFake(() => {
      return Promise.resolve(new Response(escapedJson));
    });
    var count = 5; //矢量点的个数
    var graphics = [];
    map = new Map({
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
      }),
      renderer: ['webgl']
    });
    var randomCircleStyles = new RegularShape({
      radius: 5,
      fill: new Fill({
        color: '#000000'
      }),
      stroke: new Stroke({
        color: '#000000'
      }),
      points: 3
    });
    for (var j = 0; j < count; ++j) {
      graphics[j] = new GraphicObj(new Point(coors[j]));
      graphics[j].setStyle(randomCircleStyles);
    }
    graphicLayer = new ImageLayer({
      source: new GraphicSource({
        graphics: graphics,
        map: map,
        highLightStyle: new RegularShape({
          radius: 5,
          fill: new Fill({
            color: '#000000'
          }),
          stroke: new Stroke({
            color: '#000000'
          }),
          points: 3
        })
      })
    });
    map.addLayer(graphicLayer);
    done();
  });

  it('CloverShape', (done) => {
    spyOn(FetchRequest, 'commit').and.callFake(() => {
      return Promise.resolve(new Response(escapedJson));
    });
    var count = 5; //矢量点的个数
    var graphics = [];
    map = new Map({
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
      })
    });
    map.once('postrender', function () {
      var cloverShapeStyle = new CloverShape({
        radius: 20,
        angle: 30,
        count: 3,
        stroke: new Stroke({
          color: 'rgba(0,166,0,1)'
        }),
        fill: new Fill({
          color: 'rgba(0,166,0,1)'
        })
      });
      expect(cloverShapeStyle.getCount()).toEqual(3);
      for (var j = 0; j < count; ++j) {
        graphics[j] = new GraphicObj(new Point(coors[j]));
        graphics[j].setStyle(cloverShapeStyle);
      }
      var hitCloverShape = new HitCloverShape({
        radius: 20,
        angle: 30,
        stroke: new Stroke({
          color: 'rgba(255,166,0,1)'
        }),
        fill: new Fill({
          color: 'rgba(255,166,0,1)'
        }),
        sAngle: 30,
        eAngle: 60
      });
      expect(hitCloverShape.getSAngle()).toEqual(30);
      expect(hitCloverShape.getEAngle()).toEqual(60);
      graphicLayer = new ImageLayer({
        source: new GraphicSource({
          graphics: graphics,
          map: map,
          onclick: (result) => {
            console.log(result);
          },
          highLightStyle: hitCloverShape
        })
      });
      map.addLayer(graphicLayer);
      var resolution = 1;
      graphicLayer.getSource()._forEachFeatureAtCoordinate(coors[2], resolution, (result) => {
        expect(result).not.toBeNull();
      });
      graphicLayer.getSource()._forEachFeatureAtCoordinate(coors[1], resolution, (result) => {
        expect(result).not.toBeNull();
      });
      graphicLayer.getSource()._forEachFeatureAtCoordinate([-126.16, 39.05], resolution, (result) => {
        expect(result).not.toBeNull();
      });

      let pixel = map.getPixelFromCoordinate([-36.16, 39.05]);
      map.forEachFeatureAtPixel(pixel, (graphic, layer) => {
        expect(graphic).not.toBeNull();
        expect(layer).toEqual(graphicLayer);
      });
      done();
    });
  });

  it('addGraphics', (done) => {
    let graphics = [];
    map = new Map({
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
      }),
      renderer: ['canvas']
    });
    for (let j = 0; j < coors.length; ++j) {
      graphics[j] = new GraphicObj(new Point(coors[j]));
      graphics[j].setId(j);
      graphics[j].setAttributes({
        name: 'graphic_' + j
      });
    }
    const graphicLayer = new ImageLayer({
      source: new GraphicSource({
        graphics: graphics,
        map: map
      })
    });
    map.addLayer(graphicLayer);
    const key = graphicLayer.on('postrender', function () {
      if (graphicLayer.getSource().renderer) {
        unByKey(key);
        const graphicSource = graphicLayer.getSource();
        graphicSource.addGraphics(graphics);
        expect(graphicSource.graphics.length).toEqual(10);
        graphicLayer.getSource()._forEachFeatureAtCoordinate([-35.16, 38.05], 1, (result) => {
          expect(result).not.toBeNull();
        });

        let pixel = map.getPixelFromCoordinate([-35.16, 38.05]);
        map.forEachFeatureAtPixel(pixel, (graphic, layer) => {
          expect(graphic).toBe(graphics[0]);
          expect(layer).toBe(graphicLayer);
        });
        done();
      }
    });
  });

  it('getGraphicBy add getGraphicById', (done) => {
    let graphics = [];
    map = new Map({
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
      }),
      renderer: ['canvas']
    });
    for (let j = 0; j < coors.length; ++j) {
      graphics[j] = new GraphicObj(new Point(coors[j]));
      graphics[j].setId(j);
      graphics[j].setAttributes({
        name: 'graphic_' + j
      });
    }
    const graphicLayer = new ImageLayer({
      source: new GraphicSource({
        graphics: graphics,
        map: map
      })
    });
    map.addLayer(graphicLayer);
    const key = graphicLayer.on('postrender', function () {
      if (graphicLayer.getSource().renderer) {
        unByKey(key);
        const graphic = graphicLayer.getSource().getGraphicBy('id', 1);
        expect(graphic).not.toBeNull();
        expect(graphic.getId()).toEqual(1);

        const graphic1 = graphicLayer.getSource().getGraphicById(1);
        expect(graphic1.getId()).toEqual(1);

        // map.removeLayer(graphicLayer);
        done();
      }
    });
  });
  it('getGraphicsByAttribute', (done) => {
    let graphics = [];
    map = new Map({
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
      }),
      renderer: ['canvas']
    });
    for (let j = 0; j < coors.length; ++j) {
      graphics[j] = new GraphicObj(new Point(coors[j]));
      graphics[j].setId(j);
      graphics[j].setAttributes({
        name: 'graphic_' + j
      });
    }
    const graphicLayer = new ImageLayer({
      source: new GraphicSource({
        graphics: graphics,
        map: map
      })
    });
    map.addLayer(graphicLayer);
    const key = graphicLayer.on('postrender', function () {
      if (graphicLayer.getSource().renderer) {
        unByKey(key);
        const graphic = graphicLayer.getSource().getGraphicsByAttribute('name', 'graphic_1');
        expect(graphic).not.toBeNull();
        expect(graphic[0].getAttributes().name).toBe('graphic_1');
        // map.removeLayer(graphicLayer);
        done();
      }
    });
  });

  it('removeGraphics', (done) => {
    let graphics = [];
    map = new Map({
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
      }),
      renderer: ['canvas']
    });
    for (let j = 0; j < coors.length; ++j) {
      graphics[j] = new GraphicObj(new Point(coors[j]));
      graphics[j].setId(j);
      graphics[j].setAttributes({
        name: 'graphic_' + j
      });
    }
    const graphicLayer = new ImageLayer({
      source: new GraphicSource({
        graphics: graphics,
        map: map
      })
    });
    map.addLayer(graphicLayer);
    const key = graphicLayer.on('postrender', function () {
      if (graphicLayer.getSource().renderer) {
        unByKey(key);
        const graphicSource = graphicLayer.getSource();
        //删除单个
        let deleteGraphic = graphics[0];
        expect(graphicSource.graphics.length).toEqual(5);
        graphicSource.removeGraphics(deleteGraphic);
        expect(graphicSource.graphics.length).toEqual(4);

        //多个
        deleteGraphic = [graphics[1], graphics[2]];
        graphicSource.removeGraphics(deleteGraphic);
        expect(graphicSource.graphics.length).toEqual(2);

        //默认
        graphicSource.removeGraphics();
        expect(graphicSource.graphics.length).toEqual(0);
        done();
      }
    });
  });
  it('getLayerState', (done) => {
    let graphics = [];
    map = new Map({
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
      }),
      renderer: ['canvas']
    });
    for (let j = 0; j < coors.length; ++j) {
      graphics[j] = new GraphicObj(new Point(coors[j]));
      graphics[j].setId(j);
      graphics[j].setAttributes({
        name: 'graphic_' + j
      });
    }
    const graphicLayer = new ImageLayer({
      source: new GraphicSource({
        graphics: graphics,
        map: map,
        color: 'red'
      })
    });
    map.addLayer(graphicLayer);
    const key = graphicLayer.on('postrender', function () {
      if (graphicLayer.getSource().renderer) {
        unByKey(key);
        const state = graphicLayer.getSource().getLayerState();
        expect(state).not.toBeNull();
        expect(state.color).toEqual('red');
        done();
      }
    });
  });

  it('setGraphics', (done) => {
    let graphics = [];
    map = new Map({
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
      }),
      renderer: ['canvas']
    });
    for (let j = 0; j < coors.length; ++j) {
      graphics[j] = new GraphicObj(new Point(coors[j]));
      graphics[j].setId(j);
      graphics[j].setAttributes({
        name: 'graphic_' + j
      });
    }
    const graphicLayer = new ImageLayer({
      source: new GraphicSource({
        graphics: graphics,
        map: map
      })
    });
    map.addLayer(graphicLayer);
    const key = graphicLayer.on('postrender', function () {
      if (graphicLayer.getSource().renderer) {
        unByKey(key);
        graphicLayer.getSource().clear();
        expect(graphicLayer.getSource().graphics.length).toEqual(0);
        let graphics = [];
        for (let j = 0; j < coors.length; ++j) {
          graphics[j] = new GraphicObj(new Point(coors[j]));
          graphics[j].setId(j);
          graphics[j].setAttributes({
            name: 'graphic_' + j
          });
        }

        graphicLayer.getSource().setGraphics(graphics);
        expect(graphicLayer.getSource().graphics.length).toEqual(5);
        done();
      }
    });
  });

  it('setStyle', (done) => {
    let graphics = [];
    map = new Map({
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
      }),
      renderer: ['canvas']
    });
    for (let j = 0; j < coors.length; ++j) {
      graphics[j] = new GraphicObj(new Point(coors[j]));
      graphics[j].setId(j);
      graphics[j].setAttributes({
        name: 'graphic_' + j
      });
    }
    const graphicLayer = new ImageLayer({
      source: new GraphicSource({
        graphics: graphics,
        map: map,
        color: 'red'
      })
    });
    map.addLayer(graphicLayer);
    const key = graphicLayer.on('postrender', function () {
      if (graphicLayer.getSource().renderer) {
        unByKey(key);
        expect(graphicLayer.getSource().color).toEqual('red');
        graphicLayer.getSource().setStyle({
          color: 'blue'
        });
        expect(graphicLayer.getSource().color).toEqual('blue');
        done();
      }
    });
  });

  it('clear', (done) => {
    let graphics = [];
    map = new Map({
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
      }),
      renderer: ['canvas']
    });
    for (let j = 0; j < coors.length; ++j) {
      graphics[j] = new GraphicObj(new Point(coors[j]));
      graphics[j].setId(j);
      graphics[j].setAttributes({
        name: 'graphic_' + j
      });
    }
    const graphicLayer = new ImageLayer({
      source: new GraphicSource({
        graphics: graphics,
        map: map
      })
    });
    map.addLayer(graphicLayer);
    const key = graphicLayer.on('postrender', function () {
      if (graphicLayer.getSource().renderer) {
        unByKey(key);
        const graphicSource = graphicLayer.getSource();
        graphicSource.clear();
        expect(graphicSource.graphics.length).toEqual(0);
        done();
      }
    });
  });

  it('forEachFeatureAtCoordinate_ICL_1047', (done) => {
    //三叶草的生成坐标
    var coordinate = [[50.154958667070076, -0.89592969754775]];
    let graphics = [];
    map = new Map({
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
      }),
      renderer: ['canvas']
    });
    for (let j = 0; j < coordinate.length; ++j) {
      graphics[j] = new GraphicObj(new Point(coordinate[j]));
    }
    graphicLayer = new ImageLayer({
      source: new GraphicSource({
        graphics: graphics,
        map: map,
        highLightStyle: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: '#000000'
          }),
          stroke: new Stroke({
            color: '#000000'
          })
        })
      })
    });
    map.addLayer(graphicLayer);
    var cloverShapeStyle = new CloverShape({
      radius: 20,
      angle: 30,
      count: 1,
      stroke: new Stroke({
        color: 'rgba(0,166,0,1)',
        width: 1
      }),
      fill: new Fill({
        color: 'rgba(0,166,0,1)'
      })
    });
    const key = graphicLayer.on('postrender', function () {
      if (graphicLayer.getSource().renderer) {
        unByKey(key);
        var resgraphics = graphicLayer.getSource();
        for (let j = 0; j < resgraphics.length; ++j) {
          resgraphics[j].setStyle(cloverShapeStyle);
          var resolution = 1;
          var evtPixel = [-35.16, 38.05];
          //1、当鼠标点击在三叶草叶子内时,得到要素,调用高亮函数
          var innerCoors = [25.576171875, -27.158203125];
          var callback = function (a, b) {
            expect(b).toNotBe(null);
            expect(a.coordinate).toBe([25.576171875, -27.158203125]);
          };
          graphicLayer.getSource()._forEachFeatureAtCoordinate(innerCoors, resolution, callback, evtPixel);
          spyOn(graphicLayer, '_highLight');
          expect(graphicLayer.getSource()._highLight).toHaveBeenCalled();
          //2、当鼠标点击在三叶草外时, 关闭高亮，返回undefined
          var outerCoors = [27.685546875, -26.015625];
          var re = graphicLayer.getSource()._forEachFeatureAtCoordinate(outerCoors, resolution, callback, evtPixel);
          spyOn(graphicLayer, '_highLightClose');
          expect(graphicLayer.getSource()._highLightClose).toHaveBeenCalled();
          expect(re).toBe(undefined);
        }
        done();
      }
    });
  });

  it('onCLick', (done) => {
    map = new Map({
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
      }),
      renderer: ['canvas']
    });
    var graphics = [new GraphicObj(new Point([0, 0]))];
    var graphicStyle = {
      color: [0, 255, 128, 255],
      highlightColor: [255, 0, 0, 255],
      radius: 20
    };
    graphicLayer = new ImageLayer({
      source: new GraphicSource({
        render: 'webgl',
        graphics: graphics,
        color: graphicStyle.color,
        highlightColor: graphicStyle.highlightColor,
        radius: graphicStyle.radius,
        map: map,
        onClick: function (graphic) {
          if (graphic) {
            graphic.lngLat;
          }
        }
      })
    });
    map.addLayer(graphicLayer);
    const key = graphicLayer.on('postrender', function () {
      const source = graphicLayer.getSource();
      if (source.renderer) {
        unByKey(key);
        source._forEachFeatureAtCoordinate([0, 0], 1, (result) => {
          expect(result).not.toBeNull();
        });
        const res = source.findGraphicByPixel({ pixel: [0, 0] }, source);
        expect(res).toBeUndefined();
        const res1 = source.getDeckglArguments(source, { pixel: [0, 0] }, graphics[0]);
        expect(res1).not.toBeNull();
        let pixel = map.getPixelFromCoordinate([0, 0]);
        map.forEachFeatureAtPixel(pixel, (graphic, layer) => {
          expect(graphic).toBe(graphics[0]);
          expect(layer).toBe(graphicLayer);
        });
        done();
      }
    });
  });
});
