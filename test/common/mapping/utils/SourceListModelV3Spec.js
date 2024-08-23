import { SourceListModelV3 } from '../../../../src/common/mapping/utils/SourceListModelV3';
import { isL7Layer } from '../../../../src/common/mapping/utils/L7LayerUtil';
import '../../../resources/WebMapV3.js';

describe('SourceListV3', () => {
  const layers = [
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
    const mapInfo = JSON.parse(apstudioWebMap_layerData);
    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo,
      mapResourceInfo: JSON.parse(msProjectINfo_layerData),
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => ({})
      }
    });
    const appreciableLayers = sourceListModel.getLayers();
    const selfAppreciableLayers = sourceListModel.getSelfLayers();
    expect(appreciableLayers.length).toBe(mapInfo.metadata.layerCatalog.length + 3);
    expect(selfAppreciableLayers.length).toBe(mapInfo.metadata.layerCatalog.length);
    const extraLayers = appreciableLayers.slice(mapInfo.metadata.layerCatalog.length);
    expect(extraLayers[1].title).toBe('test-source');
    expect(extraLayers[1].renderLayers).toEqual(['test-id', 'test-id-label']);
    expect(extraLayers[2].title).toBe('graticuleLayer_1723443238046_line');
    expect(extraLayers[2].renderLayers).toEqual(['graticuleLayer_1723443238046_line', 'graticuleLayer_1723443238046']);
    done();
  });

  it('getSourceList without group', (done) => {
    const mapInfo = JSON.parse(apstudioWebMap_layerData);
    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo,
      mapResourceInfo: JSON.parse(msProjectINfo_layerData),
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => ({})
      }
    });
    const layerList = sourceListModel.getSourceList();
    expect(layerList.length).toBe(mapInfo.metadata.layerCatalog.length + 3);
    done();
  });

  it('getSourceList with group', (done) => {
    const mapInfo = JSON.parse(mapstudioWebMap_group);
    const sourceListModel = new SourceListModelV3({
      map,
      mapInfo,
      mapResourceInfo: {},
      legendList: [],
      l7LayerUtil: {
        isL7Layer,
        getL7MarkerLayers: () => ({})
      }
    });
    const layerList = sourceListModel.getSourceList();
    expect(layerList.length).toBe(mapInfo.metadata.layerCatalog.length + 3);
    done();
  });
});
