
import { CustomOverlayLayer } from '../overlay/Base';

export function createMapExtendExtending(product) { 
  const originMapProto = product.Map.prototype;
  return class MapExtend extends product.Map {
    constructor(options) {
      super(options);
      this.overlayLayersManager = {};
    }

    addLayer(layer, before) {
      if (layer.source || layer.type === 'custom' || layer.type === 'background') {
        originMapProto.addLayer.call(this, layer, before);
        // overlay文件夹下的图层基本都是自定义图层， 除去几个专题图
        if (layer.overlay && !this.overlayLayersManager[layer.id]) {
          this.overlayLayersManager[layer.id] = layer;
        }
        return this;
      }
      if (this.overlayLayersManager[layer.id] || this.style._layers[layer.id]) {
        this.fire('error', {
          error: new Error('A layer with this id already exists.')
        });
        return;
      }
      layer.onAdd && layer.onAdd(this);
      this.overlayLayersManager[layer.id] = layer;
      return this;
    }
    
    /**
     * @function listLayers
     * @category BaseTypes MapExtend
     * @version 11.2.0
     * @description 扩展mapboxgl.Map， 获取所有叠加图层;
     * @returns {Array} 图层数组。
     */
    listLayers() {
      const layerList = [];
      const originLayers = this.style._order || [];
      layerList.push(...originLayers);
      for (let key in this.overlayLayersManager) {
        const layer = this.overlayLayersManager[key];
        const layerId = layer.id;
        if (!layerList.includes(layerId)) {
          layerList.push(layerId);
        }
      }
      return layerList;
    }
    
    getLayer(id) {
      const overlayLayer = this.overlayLayersManager[id];
      if (overlayLayer) {
        return overlayLayer.getLayer ? overlayLayer.getLayer() : overlayLayer;
      }
      return this.style.getLayer(id);
    }
    
    moveLayer(id, beforeId) {
      if (this.overlayLayersManager[id]) {
        this.overlayLayersManager[id].moveLayer
          ? this.overlayLayersManager[id].moveLayer(id, beforeId)
          : this._moveToHandler(id, beforeId, product);
        return this;
      }
      if (this.style._layers[id]) {
        this.style.moveLayer(id, beforeId);
        this._update(true);
      }
      return this;
    }
    
    removeLayer(id) {
      if (this.overlayLayersManager[id]) {
      const layer = this.overlayLayersManager[id];
      delete this.overlayLayersManager[id];
        if (layer.type !== 'custom') {
          if (layer.removeFromMap) {
            layer.removeFromMap();
          }
        return this;
      }
      }
      this.style.removeLayer(id);
      this._update(true);
      return this;
    }
    
    // 目前扩展的 overlayer，只支持显示或隐藏图层操作
    setLayoutProperty(layerID, name, value) {
      const overlayLayer = this.overlayLayersManager[layerID];
      if (overlayLayer) {
        if (overlayLayer.setLayoutProperty) {
          overlayLayer.setLayoutProperty(name, value);
          this.style.fire('data', { dataType: 'style' });
        } else if (name === 'visibility' && overlayLayer.setVisibility) {
          overlayLayer.setVisibility(value === 'visible');
          this.style.fire('data', { dataType: 'style' });
        }
        return this;
      }
      this.style.setLayoutProperty(layerID, name, value);
      this._update(true);
      return this;
    }
    
    updateTransform(units, originX, originY, centerX, centerY, width, height) {
      this.transform.units = units;
      const mercatorZfromAltitude = this.mercatorZfromAltitude;
      product.MercatorCoordinate.fromLngLat = function (lngLatLike, altitude) {
        altitude = altitude || 0;
        const lngLat = product.LngLat.convert(lngLatLike);
        return new product.MercatorCoordinate(
          (lngLat.lng - originX) / width,
          (originY - lngLat.lat) / height,
          mercatorZfromAltitude(altitude, lngLat.lat)
        );
      };
      product.MercatorCoordinate.prototype.toLngLat = function () {
        return new product.LngLat(this.x * width + originX, originY - this.y * height);
      };
      this.customConvertPoint = window.URL.createObjectURL(
        new Blob(
          [
            'customConvertPoint = {projectX:function(x){return (x - ' +
              centerX +
              ') / ' +
              width +
              ' + 0.5},projectY:function(y){y = 0.5 - ((y - ' +
              centerY +
              ') / ' +
              height +
              ');return y < 0 ? 0 : y > 1 ? 1 : y;},toY:function(y){return (0.5-y)*' +
              height +
              '+' +
              centerY +
              ';}}'
          ],
          { type: 'text/javascript' }
        )
      );
    }
    
    getPaintProperty(layerId, name) {
      const overlayLayer = this.overlayLayersManager[layerId];
      if (overlayLayer) {
        if (overlayLayer.getPaintProperty) {
          return overlayLayer.getPaintProperty(name);
        }
        return;
      }
      return originMapProto.getPaintProperty.call(this, layerId, name);
    }
    
    getLayoutProperty(layerId, name) {
      const overlayLayer = this.overlayLayersManager[layerId];
      if (overlayLayer) {
        if (overlayLayer.getLayoutProperty) {
          return overlayLayer.getLayoutProperty(name);
        }
        return;
      }
      return originMapProto.getLayoutProperty.call(this, layerId, name);
    }
    
    getFilter(layerId, filter, options) {
      const overlayLayer = this.overlayLayersManager[layerId];
      if (overlayLayer) {
        if (overlayLayer.getFilter) {
          return overlayLayer.getFilter(filter, options);
        }
        return;
      }
      return originMapProto.getFilter.call(this, layerId, filter, options);
    }
    
    setFilter(layerId, filter, options) {
      const overlayLayer = this.overlayLayersManager[layerId];
      if (overlayLayer) {
        if (overlayLayer.setFilter) {
          overlayLayer.setFilter(filter, options);
        }
        return this;
      }
      return originMapProto.setFilter.call(this, layerId, filter, options);
    }

    on(type, layerId, listener) {
      return this._eventsModeHandler({ type, layerId, listener, mode: 'on' });
    }

    once(type, layerId, listener) {
      return this._eventsModeHandler({ type, layerId, listener, mode: 'once' });
    }

    off(type, layerId, listener) {
      return this._eventsModeHandler({ type, layerId, listener, mode: 'off' });
    }
    
    queryRenderedFeatures(geometry, options) {
      let overlayLayers = Object.keys(this.overlayLayersManager);
      let layersOnMap;
      if (options && options.layers) {
        overlayLayers = options.layers.filter(item => this.overlayLayersManager[item]);
        layersOnMap = options.layers.filter(item => !this.overlayLayersManager[item]);
      }
      const nextGeometry = geometry || [[0, 0], [this.transform.width, this.transform.height]];
      const nextOptions  = options || {};
      delete nextOptions.layers;
      const resultOnOverlayerLayers = overlayLayers.reduce((result, item) => {
        const overlayLayer = this.overlayLayersManager[item];
        if (overlayLayer.query && overlayLayer.queryRenderedFeatures) {
          overlayLayer.queryRenderedFeatures(nextGeometry, nextOptions, (features) => {
            result = result.concat(features);
          });
        }
        return result;
      }, []);
      const resultOnMapLayers = originMapProto.queryRenderedFeatures.call(this, geometry, { ...options, layers: layersOnMap });
      return resultOnMapLayers.concat(resultOnOverlayerLayers);
    }
    
    querySourceFeatures(sourceId, paramters) {
      const customOverlayerLayer = Object.values(this.overlayLayersManager).find(item => item.sourceId === sourceId && item instanceof CustomOverlayLayer);
      if (customOverlayerLayer) {
        if (customOverlayerLayer.query) {
          return customOverlayerLayer.querySourceFeatures(paramters);
        }
        return;
      }
      return originMapProto.querySourceFeatures.call(this, sourceId, paramters);
    }
    
    getSource(sourceId) {
      const customOverlayerLayer = Object.values(this.overlayLayersManager).find(item => item.sourceId === sourceId && item instanceof CustomOverlayLayer);
      if (customOverlayerLayer) {
        return customOverlayerLayer.getSource();
      }
      return originMapProto.getSource.call(this, sourceId);
    }
    
    removeSource(sourceId) {
      const customOverlayerLayer = Object.values(this.overlayLayersManager).find(item => item.sourceId === sourceId && item instanceof CustomOverlayLayer);
      if (customOverlayerLayer) {
        return customOverlayerLayer.removeSource();
      }
      return originMapProto.removeSource.call(this, sourceId);
    }
    
    isSourceLoaded(sourceId) {
      const customOverlayerLayer = Object.values(this.overlayLayersManager).find(item => item.sourceId === sourceId && item instanceof CustomOverlayLayer);
      if (customOverlayerLayer) {
        return customOverlayerLayer.isSourceLoaded();
      }
      return originMapProto.isSourceLoaded.call(this, sourceId);
    }

    _eventsModeHandler({ type, layerId, listener, mode }) {
      let layers = [];
      if (listener) {
        layers = layers.concat(layerId);
      }
      layers.forEach(id => {
        const overlayLayer = this.overlayLayersManager[id] || {};
        if (overlayLayer.interaction && overlayLayer[mode] && overlayLayer.events.includes(type)) {
          overlayLayer[mode](type, listener || layerId);
        }
      });
      const layerIdsOnMap = listener && layers.filter(id => !this.overlayLayersManager[id]);
      if (layerIdsOnMap && !layerIdsOnMap.length) {
        return this;
      }
      const nextLayerId = !layerIdsOnMap || typeof layerId === 'string' ? layerId : layerIdsOnMap;
      return originMapProto[mode].call(this, type, nextLayerId, listener);
    }

    /**
     * @description 将图层移动到某个图层之前。
     * @param {string} layerID -待插入的图层 ID。
     * @param {boolean} [beforeLayerID] - 是否将本图层插入到图层 ID 为 layerID 的图层之前(如果为 false 则将本图层插入到图层 ID 为 layerID 的图层之后)。
     * @private
     */
    _moveToHandler(layerID, beforeLayerID) {
      const layer = document.getElementById(layerID);
      let beforeLayer;
      if (beforeLayerID) {
        beforeLayer = document.getElementById(beforeLayerID);
        if (!beforeLayer) {
          product.Evented.prototype.fire('error', {
            error: new Error(`Layer with id "${beforeLayerID}" does not exist on this document.`)
          });
        }
      }
      if (layer) {
        if (beforeLayer) {
          beforeLayer.parentNode.insertBefore(layer, beforeLayer);
        } else {
          //当没有传入beforeLayerID ，则默认将图层移动到最上面
          layer.parentNode.appendChild(layer);
        }
      }
    }

  }
}
