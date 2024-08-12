import { SourceListModel } from '../../../../src/common/mapping/utils/SourceListModelV2';

describe('SourceListV2', () => {
  const layers = [
    {
      id: 'CHINA_DARK',
      type: 'raster',
      source: 'CHINA_DARK',
      minzoom: 0,
      maxzoom: 12
    },
    {
      id: 'test-id',
      type: 'raster',
      source: 'test-source',
      minzoom: 0,
      maxzoom: 12
    },
    {
      id: 'test-id-label',
      type: 'raster',
      source: 'test-source',
      minzoom: 0,
      maxzoom: 12,
      metadata: { parentLayerId: 'test-source' }
    },
    {
      id: 'tracklayer-1-line',
      type: 'line',
      source: 'tracklayer-1-line',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#065726',
        'line-width': 5,
        'line-opacity': 0.8
      }
    },
    {
      id: 'tdt-search-line',
      type: 'line',
      source: 'tdt-search-line',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#065726',
        'line-width': 5,
        'line-opacity': 0.8
      }
    },
    {
      id: 'tdt-route-line',
      type: 'line',
      source: 'tdt-route-line',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#065726',
        'line-width': 5,
        'line-opacity': 0.8
      }
    },
    {
      id: 'smmeasure',
      type: 'line',
      source: 'smmeasure',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#065726',
        'line-width': 5,
        'line-opacity': 0.8
      }
    },

    {
      id: 'mapbox-gl-draw',
      type: 'line',
      source: 'mapbox-gl-draw',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#065726',
        'line-width': 5,
        'line-opacity': 0.8
      }
    },
    {
      id: 'mapbox-gl-draw-line',
      type: 'line',
      source: 'mapbox-gl-draw',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#065726',
        'line-width': 5,
        'line-opacity': 0.8
      }
    },
    {
      id: 'background',
      type: 'background',
      layout: {
        visibility: 'visible'
      },
      paint: {
        'background-color': '#065726',
        'background-opacity': 0.5
      }
    },
    {
      id: 'test-SM-highlight',
      type: 'line',
      source: 'mapbox-gl-draw',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#065726',
        'line-width': 5,
        'line-opacity': 0.8
      }
    },
    {
      id: 'graticuleLayer_1723443238046_line',
      type: 'line',
      source: 'graticuleLayer_1723443238046_line',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        visibility: 'visible'
      },
      paint: {
        'line-color': '#15eec2',
        'line-width': 2,
        'line-offset': 0,
        'line-translate-anchor': 'viewport',
        'line-dasharray': [0.5, 4]
      }
    }
  ];
  const map = {
    getStyle() {
      return {
        layers
      };
    },
    getSource() {
      return {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      };
    },
    getLayer(id) {
      return layers.find((layer) => layer.id === id);
    },
    overlayLayersManager: {
      graticuleLayer_1723443238046: {
        id: 'graticuleLayer_1723443238046',
        overlay: true,
        renderingMode: '3d',
        type: 'custom',
        visible: true,
        sourceId: 'graticuleLayer_1723443238046_line'
      }
    }
  };

  it('getLayers', (done) => {
    const sourceListModel = new SourceListModel({ map });
    const appreciableLayers = sourceListModel.getLayers();
    const selfAppreciableLayers = sourceListModel.getSelfLayers();
    expect(appreciableLayers.length).toBe(3);
    expect(appreciableLayers[1].title).toBe('test-source');
    expect(appreciableLayers[1].renderLayers).toEqual(['test-id', 'test-id-label']);
    expect(appreciableLayers[2].title).toBe('graticuleLayer_1723443238046_line');
    expect(appreciableLayers[2].renderLayers).toEqual(['graticuleLayer_1723443238046_line', 'graticuleLayer_1723443238046']);
    expect(selfAppreciableLayers.length).toBe(0);
    done();
  });

  it('getSelfLayers', (done) => {
    const sourceListModel = new SourceListModel({
      map,
      layers: [
        {
          name: 'GraticuleLayer',
          id: 'graticuleLayer_1723443238046',
          visible: true,
          renderLayers: ['graticuleLayer_1723443238046', 'graticuleLayer_1723443238046_line']
        }
      ]
    });
    const appreciableLayers = sourceListModel.getLayers();
    const selfAppreciableLayers = sourceListModel.getSelfLayers(appreciableLayers);
    expect(appreciableLayers.length).toBe(3);
    expect(selfAppreciableLayers.length).toBe(1);
    expect(selfAppreciableLayers[0].title).toBe('GraticuleLayer');
    expect(selfAppreciableLayers[0].renderLayers).toEqual([
      'graticuleLayer_1723443238046',
      'graticuleLayer_1723443238046_line'
    ]);
    done();
  });

  it('getSourceList', (done) => {
    const sourceListModel = new SourceListModel({ map });
    const appreciableLayers = sourceListModel.getSourceList();
    expect(appreciableLayers.length).toBe(3);
    done();
  })
});
