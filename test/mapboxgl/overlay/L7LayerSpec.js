import mapboxgl from 'mapbox-gl';
import mbglmap from '../../tool/mock_mapboxgl_map';
import * as L7 from '../../../src/mapboxgl/overlay/L7/l7-render';
import * as mockL7 from '../../tool/mock_l7';
import { L7Layer } from '../../../src/mapboxgl/overlay/L7Layer';

var url = GlobeParameter.ChinaURL + '/zxyTileImage.png?z={z}&x={x}&y={y}';

describe('mapboxgl L7Layer', () => {
  var originalTimeout;
  var testDiv, map, getL7Scene, setLayoutProperty, removeLayer;
  var data = [
    {
      id: '5011000000404',
      name: '铁路新村(华池路)',
      longitude: 121.4316962,
      latitude: 31.26082325,
      unit_price: 71469.4,
      count: 2,
      v: 100
    }
  ];
  beforeAll((done) => {
    getL7Scene = mapboxgl.Map.prototype.getL7Scene;
    setLayoutProperty = mapboxgl.Map.prototype.setLayoutProperty;
    removeLayer = mapboxgl.Map.prototype.removeLayer;
    mbglmap.prototype.getL7Scene = getL7Scene;
    mbglmap.prototype.setLayoutProperty = setLayoutProperty;

    spyOn(mapboxgl, 'Map').and.callFake(mbglmap);

    spyOn(L7, 'PointLayer').and.callFake(mockL7.PointLayer);
    spyOn(L7, 'GeometryLayer').and.callFake(mockL7.GeometryLayer);
    spyOn(L7, 'HeatmapLayer').and.callFake(mockL7.HeatmapLayer);

    spyOn(L7, 'Scene').and.callFake(mockL7.Scene);
    spyOn(L7, 'Mapbox').and.callFake(mockL7.Mapbox);
    testDiv = window.document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.styleFloat = 'left';
    testDiv.style.marginLeft = '8px';
    testDiv.style.marginTop = '50px';
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    window.document.body.appendChild(testDiv);
    map = new mapboxgl.Map({
      container: testDiv,
      style: {
        version: 8,
        sources: {
          'raster-tiles': {
            type: 'raster',
            tiles: [url],
            tileSize: 256
          }
        },
        layers: [
          {
            id: 'simple-tiles',
            type: 'raster',
            source: 'raster-tiles',
            minzoom: 0,
            maxzoom: 22
          }
        ]
      },
      center: [112, 37.94],
      zoom: 13
    });
    map.removeLayer = removeLayer;
    map.style.removeLayer = () => {};
    map.on('load', function () {
      done();
    });
  });
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  afterAll(() => {
    document.body.removeChild(testDiv);
    map = null;
  });

  it('getL7Scene', (done) => {
    map.getL7Scene().then((scene) => {
      expect(scene).not.toBeNull();
      map.$l7scene = null;
      done();
    });
  });

  it('getL7Scene1', (done) => {
    var layer = new L7Layer({ type: 'PointLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude'
        }
      })
      .shape('circle')
      .active(true)
      .animate(true)
      .size(56)
      .color('#4cfd47');
    map.getL7Scene().then((scene) => {
      expect(scene).not.toBeNull();
      map.$l7scene = null;
      done();
    });
  });

  it('PointLayer', (done) => {
    var layer = new L7Layer({ type: 'PointLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude'
        }
      })
      .shape('name', [
        'circle',
        'triangle',
        'square',
        'pentagon',
        'hexagon',
        'octogon',
        'hexagram',
        'rhombus',
        'vesica'
      ])
      .size('unit_price', [10, 25])
      .active(true)
      .color('name', ['#5B8FF9', '#5CCEA1', '#5D7092', '#F6BD16', '#E86452'])
      .style({
        opacity: 0.3,
        strokeWidth: 2
      });
    map.addLayer(layer);
    expect(map.$l7scene).not.toBeUndefined();
    expect(l7Layer).not.toBeNull();
    expect(layer.type).toBe('custom');
    map.removeLayer(layer.id);
    done();
  });

  it('PointLayer animate', (done) => {
    var layer = new L7Layer({ type: 'PointLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude'
        }
      })
      .shape('circle')
      .active(true)
      .animate(true)
      .size(56)
      .color('#4cfd47');
    map.addLayer(layer);
    expect(l7Layer).not.toBeNull();
    expect(layer.type).toBe('custom');
    map.removeLayer(layer.id);
    done();
  });

  it('GeometryLayer spriteAnimate', (done) => {
    var layer = new L7Layer({ type: 'GeometryLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .shape('sprite')
      .size(10)
      .style({
        heightfixed: true,
        mapTexture: '../../resources/img/sprite.png', // snow
        center: [120, 30],
        spriteCount: 60,
        spriteRadius: 10,
        spriteTop: 2500000
      });
    map.addLayer(layer);
    expect(l7Layer).not.toBeNull();
    expect(layer.type).toBe('custom');
    map.removeLayer(layer.id);
    done();
  });

  it('PointLayer rerender', (done) => {
    var layer = new L7Layer({ type: 'PointLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude'
        }
      })
      .shape('circle')
      .active(true)
      .animate(true)
      .size(56)
      .color('#4cfd47');
    map.addLayer(layer);
    expect(l7Layer).not.toBeNull();
    expect(layer.type).toBe('custom');
    layer.reRender();
    done();
  });

  it('PointLayer removeLayer', (done) => {
    var layer = new L7Layer({ type: 'PointLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude'
        }
      })
      .shape('circle')
      .active(true)
      .animate(true)
      .size(56)
      .color('#4cfd47');
    map.addLayer(layer);
    expect(l7Layer).not.toBeNull();
    expect(layer.type).toBe('custom');
    map.removeLayer(layer.id);
    done();
  });

  it('PointLayer setVisibility', (done) => {
    var layer = new L7Layer({ type: 'PointLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude'
        }
      })
      .shape('circle')
      .active(true)
      .size(56)
      .color('#4cfd47');
    map.addLayer(layer);
    map.style.fire = () => {};
    map.style.setLayoutProperty = () => {};

    map.overlayLayersManager = { [layer.id]: layer };
    expect(l7Layer).not.toBeNull();
    map.setLayoutProperty = setLayoutProperty;

    spyOn(l7Layer, 'show');
    spyOn(l7Layer, 'hide');
    spyOn(map.style, 'setLayoutProperty');

    map.setLayoutProperty(layer.id, 'visibility', 'hidden');
    expect(l7Layer.hide).toHaveBeenCalled();
    expect(map.style.setLayoutProperty).toHaveBeenCalled();
    expect(layer.animateStatus).toBeFalsy();

    map.setLayoutProperty(layer.id, 'visibility', 'visible');
    expect(l7Layer.show).toHaveBeenCalled();
    expect(map.style.setLayoutProperty).toHaveBeenCalled();
    expect(layer.animateStatus).toBeFalsy();

    done();
  });
  it('PointLayer setVisibility animate', (done) => {
    var layer = new L7Layer({ type: 'PointLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude'
        }
      })
      .shape('circle')
      .active(true)
      .animate(true)
      .size(56)
      .color('#4cfd47');
    map.addLayer(layer);
    map.style.fire = () => {};
    map.style.setLayoutProperty = () => {};

    map.overlayLayersManager = { [layer.id]: layer };
    expect(l7Layer).not.toBeNull();
    map.setLayoutProperty = setLayoutProperty;

    spyOn(l7Layer, 'show');
    spyOn(l7Layer, 'hide');
    spyOn(map.style, 'setLayoutProperty');
    expect(layer.animateStatus).toBeTruthy();

    map.setLayoutProperty(layer.id, 'visibility', 'none');
    expect(l7Layer.hide).toHaveBeenCalled();
    expect(map.style.setLayoutProperty).toHaveBeenCalled();
    expect(layer.animateStatus).toBeFalsy();

    map.setLayoutProperty(layer.id, 'visibility', 'visible');
    expect(l7Layer.show).toHaveBeenCalled();
    expect(map.style.setLayoutProperty).toHaveBeenCalled();

    done();
  });
  it('HeatmapLayer grid updateSource', (done) => {
    var layer = new L7Layer({ type: 'HeatmapLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude'
        },
        transforms: [
          {
            type: 'grid',
            size: 2000000,
            field: 'v',
            method: 'sum'
          }
        ]
      })
      .shape('circle')
      .active(true)
      .animate(true)
      .size(56)
      .color('#4cfd47');
    map.addLayer(layer);
    spyOn(layer, 'reRender');
    l7Layer.setData(data, {
      parser: {
        type: 'json',
        x: 'j',
        y: 'w'
      },
      transforms: [
        {
          type: 'grid',
          size: 200000,
          field: 'v',
          method: 'sum'
        }
      ]
    });
    expect(l7Layer).not.toBeNull();
    expect(layer.reRender).toHaveBeenCalled();
    done();
  });

  it('mvt layer', (done) => {
    var layer = new L7Layer({ type: 'PointLayer' });
    var l7Layer = layer.getL7Layer();
    l7Layer
      .source('http://localhost:8190/zhejiang.mbtiles/{z}/{x}/{y}.pbf', {
        parser: {
          type: 'mvt',
          tileSize: 256,
          zoomOffset: 0,
          maxZoom: 9,
          extent: [-180, -85.051129, 179, 85.051129]
        }
      })
      .shape('circle')
      .color('#4cfd47');
    map.addLayer(layer);
    map.style.fire = () => {};
    map.style.setLayoutProperty = () => {};

    map.overlayLayersManager = { [layer.id]: layer };
    expect(layer.sourceId).toBe(layer.id);
    const layerSource = layer.getSource(layer.id);
    expect(layerSource.type).toBe('vector');
    let features;
    const result = {
      cb: function (data) {
        features = data;
      }
    };
    spyOn(result, 'cb').and.callThrough();
    layer.queryRenderedFeatures([0, 0], {}, result.cb);
    expect(result.cb.calls.count()).toBe(1);
    expect(features).not.toBeUndefined();
    expect(layer.querySourceFeatures().length).toBeGreaterThan(0);

    layer = new L7Layer({ type: 'PointLayer', options: { layerID: 'empty-test' } });
    l7Layer = layer.getL7Layer();
    l7Layer
      .source('http://localhost:8190/zhejiang.mbtiles/{z}/{x}/{y}.pbf', {
        parser: {
          type: 'mvt',
          tileSize: 256,
          zoomOffset: 0,
          maxZoom: 9,
          extent: [-180, -85.051129, 179, 85.051129]
        }
      })
      .shape('circle')
      .color('#4cfd47');
    map.addLayer(layer);

    map.overlayLayersManager = { [layer.id]: layer };
    l7Layer.rawConfig.name = 'empty-test';
    expect(layer.querySourceFeatures().length).toBe(0);
    done();
  });

  it('extend custom overlayLayer base', (done) => {
    const paint = {
      'point-extrusion-width': 12,
      'point-extrusion-height': 20,
      'point-extrusion-opacity': 0.9,
      'point-extrusion-length': 12,
      'point-extrusion-color': '#EE4D5A'
    };
    const layout = {
      visibility: 'visible',
      'point-extrusion-shape': 'cylinder'
    };
    const filter = ['all', ['<=', 'smpid', 6]];
    const options = { paint, minZoom: 0, maxZoom: 20, layout, filter };
    const layer = new L7Layer({ type: 'PointLayer', options });
    const l7Layer = layer.getL7Layer();
    const geoData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            city: '北京',
            spmid: 1
          },
          geometry: {
            type: 'Point',
            coordinates: [100.0, 0.0]
          }
        }
      ]
    };
    l7Layer.source(geoData).shape('circle').color('#4cfd47');
    map.addLayer(layer);
    map.style.fire = () => {};
    map.overlayLayersManager = { [layer.id]: layer };
    const layerOnMap = layer.getLayer(layer.id);
    expect(layerOnMap.minzoom).toBe(options.minzoom);
    expect(layerOnMap.maxzoom).toBe(options.maxzoom);
    expect(layerOnMap.paint).toEqual(options.paint);
    expect(layerOnMap.layout.visibility).toBeTruthy();
    expect(layerOnMap.filter).toEqual(filter);
    spyOn(map, 'triggerRepaint');
    layerOnMap.reRender();
    expect(map.triggerRepaint).toHaveBeenCalled();
    const activeFeature = { properties: { name: 'test' } };
    layerOnMap.setSelectedDatas(activeFeature);
    expect(layer.selectedDatas).toEqual([activeFeature]);
    layer.setSelectedDatas([]);
    expect(layer.getPaintProperty('point-extrusion-width')).toBe(paint['point-extrusion-width']);
    expect(layer.getLayoutProperty('point-extrusion-shape')).toBe(layout['point-extrusion-shape']);
    const layerFilter = layer.getFilter();
    expect(layerFilter.field).toEqual(['smpid']);
    expect(layerFilter.values).toBeTruthy();
    spyOn(l7Layer, 'filter').and.callThrough();
    layer.setFilter(null);
    expect(l7Layer.filter.calls.count()).toBe(1);
    layer.setFilter(filter);
    expect(l7Layer.filter.calls.count()).toBe(2);
    layer.setFilter(layerFilter);
    expect(l7Layer.filter.calls.count()).toBe(3);
    expect(layer.sourceId).toBe(layer.id);
    const layerSource = layer.getSource(layer.id);
    expect(layerSource.type).toBe('geojson');
    expect(layerSource.hasOwnProperty('_data')).toBeTruthy();
    expect(layerSource.getData).toBeTruthy();
    expect(layerSource.setData).toBeTruthy();
    const sourceData = layer.querySourceFeatures();
    expect(sourceData.length).toEqual(geoData.features.length);
    expect(layer.selectedDatas).toEqual([]);
    layer.setSelectedDatas(geoData.features);
    expect(layer.selectedDatas.length).toEqual(geoData.features.length);
    expect(layerFilter.values('北京')).toBeFalsy();
    layer.setSelectedDatas([]);
    layer.l7layer.rawConfig.filter = ['all', ['==', '$type', 'LineString']];
    const nextLayerFilter = layer.getFilter();
    expect(nextLayerFilter.field).toEqual([]);
    expect(nextLayerFilter.values('1')).toBeTruthy();
    spyOn(l7Layer, 'on');
    spyOn(l7Layer, 'once');
    spyOn(l7Layer, 'off');
    const cb = () => {};
    layer.on('mouseover', cb);
    layer.once('mouseover', cb);
    layer.off('mouseover', cb);
    layer.on('mouseleave', cb);
    layer.once('mouseleave', cb);
    layer.off('mouseleave', cb);
    layer.on('click', cb);
    layer.once('click', cb);
    layer.off('click', cb);
    expect(l7Layer.on).toHaveBeenCalledTimes(3);
    expect(l7Layer.once).toHaveBeenCalledTimes(3);
    expect(l7Layer.off).toHaveBeenCalledTimes(3);
    done();
  });
});
