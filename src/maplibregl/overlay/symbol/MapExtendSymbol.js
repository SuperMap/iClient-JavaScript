/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import maplibregl from 'maplibre-gl';
 import SymbolHandler from './SymbolHandler';
import { FetchRequest } from "@supermap/iclient-common/util/FetchRequest";
import { Util } from '@supermap/iclient-common/commontypes/Util';

/**
 * @function MapExtendSymbol
 * @description  扩展了 maplibregl.Map 对图层相关的操作。
 * @private
 */
function MapExtendSymbol(){
  /**
   * 获取symbol管理
   * @param {*} map
   * @returns {object}
   */
  const getSymbolHandler = (map) => {
    if (!maplibregl.Map.prototype.symbolHandler) {
      maplibregl.Map.prototype.symbolHandler = new SymbolHandler(map);
    }
    return maplibregl.Map.prototype.symbolHandler._update(map);
  }

  if (maplibregl.Map.prototype.addLayerBySymbolBak === undefined) {
    maplibregl.Map.prototype.addLayerBySymbolBak = maplibregl.Map.prototype.addLayer;
    maplibregl.Map.prototype.addLayer = function (layer, before) {
      const symbolHandler = getSymbolHandler(this);
      if(symbolHandler.getLayerIds(layer.id).length > 0) {
        this.fire('error', {
          error: new Error('A layer with this id already exists.')
        });
        return;
      }
      if (layer.symbol) {
        symbolHandler.addLayer(layer, before);
        return this;
      }
      this.addLayerBySymbolBak(layer, before);
      return this;
    };
  }

  if (maplibregl.Map.prototype.getLayerBySymbolBak === undefined) {
    maplibregl.Map.prototype.getLayerBySymbolBak = maplibregl.Map.prototype.getLayer;
    maplibregl.Map.prototype.getLayer = function (id) {
      return getSymbolHandler(this).getLayer(id);
    };
  }

  if (maplibregl.Map.prototype.moveLayerBySymbolBak === undefined) {
    maplibregl.Map.prototype.moveLayerBySymbolBak = maplibregl.Map.prototype.moveLayer;
    maplibregl.Map.prototype.moveLayer = function (id, beforeId) {
      if (this.style.getLayer(id) && (!beforeId || this.style.getLayer(beforeId))) {
        return this.moveLayerBySymbolBak(id, beforeId);
      }
      getSymbolHandler(this).moveLayer(id, beforeId);
      return this._update(true);
    }
  }

  if (maplibregl.Map.prototype.removeLayerBySymbolBak === undefined) {
    maplibregl.Map.prototype.removeLayerBySymbolBak = maplibregl.Map.prototype.removeLayer;
    maplibregl.Map.prototype.removeLayer = function (id) {
      if (this.style.getLayer(id)) {
        return this.removeLayerBySymbolBak(id);
      }
      return getSymbolHandler(this).removeLayer(id);
    };
  }

  if (maplibregl.Map.prototype.setLayoutPropertyBySymbolBak === undefined) {
    //目前扩展的overlayer，只支持显示或隐藏图层操作
    maplibregl.Map.prototype.setLayoutPropertyBySymbolBak = maplibregl.Map.prototype.setLayoutProperty;
    maplibregl.Map.prototype.setLayoutProperty = function (layerID, name, value, options) {
      if (this.overlayLayersManager[layerID] || this.style.getLayer(layerID)) {
        return this.setLayoutPropertyBySymbolBak(layerID, name, value, options);
      }
      getSymbolHandler(this).setLayoutProperty(layerID, name, value, options);
      return this._update(true);
    };
  }

  /**
   * 指定图层设置符号
   * @param {string} layerId
   * @param {string | array} symbol
   */
  maplibregl.Map.prototype.setSymbol = function (layerId, symbol) {
    getSymbolHandler(this).setSymbol(layerId, symbol);
  };

  /**
   * Layer新增symbol属性
   */
  if (!(maplibregl.Map.prototype).setStyleBak) {
    (maplibregl.Map.prototype).setStyleBak = maplibregl.Map.prototype.setStyle;
    maplibregl.Map.prototype.setStyle = function (style, options) {
      this.setStyleBak(style, options);
      this.style && this.style.once('style.load', () => {
        const symbolLayers = style.layers.filter(l => l.symbol);
        symbolLayers.forEach((l) => {
          this.setSymbol(l.id, l.symbol);
        });
      });
      return this;
    }
  }

  /**
   * 加载Web符号
   * @param {string | string[]} id
   * @param {function} callback
   */
   maplibregl.Map.prototype.loadSymbol = async function (id, callback) {
    if (typeof id === 'string') {
      const symbolInfo = await loadSymbol(id, this);
      let message = null;
      if(!symbolInfo) {
        message = `Symbol ${id} is not exists`;
      }
      callback(message, symbolInfo);
    } else if (Util.isArray(id)) {
      const promises = id.map(i => loadSymbol(i, this));
      const symbolInfo = await Promise.all(promises);
      let message = null;
      const errorIds = id.filter((_i, index) => !symbolInfo[index]);
      if(errorIds.length > 0){
        message = `Symbol ${errorIds.join(',')} is not exists`;
      }
      callback(message, symbolInfo);
    } else {
      callback({
        message: 'Symbol id must be a string or string[].'
      });
    }
  };

  /**
   * 添加符号
   * @param {string} id
   * @param {object} symbol
   */
  maplibregl.Map.prototype.addSymbol = function (id, symbol) {
    getSymbolHandler(this).addSymbol(id, symbol);
  };

  /**
   * 获取符号信息
   * @param {string} id
   */
  maplibregl.Map.prototype.getSymbol = function (id) {
    return getSymbolHandler(this).getSymbol(id);
  };

  /**
   * 判断符号是否存在
   * @param {string} id
   */
  maplibregl.Map.prototype.hasSymbol = function (id) {
    if (!id) {
      this.fire('error', {
        error: new Error('Missing required symbol id')
      });
      return false;
    }

    return !!this.getSymbol(id);
  };

  /**
   * 删除符号
   * @param {string} id
   */
  maplibregl.Map.prototype.removeSymbol = function (id) {
    getSymbolHandler(this).removeSymbol(id);
  };
  
  /**
   * 更新符号
   * @param {string} id
   * @param {object} symbol
   */
  maplibregl.Map.prototype.updateSymbol = function (id, symbol) {
    getSymbolHandler(this).updateSymbol(id, symbol);
  };

  /**
   * 设置symbol属性值
   * @param {string} id 
   * @param {number} index 
   * @param {string} name 
   * @param {any} value
   */
  maplibregl.Map.prototype.setSymbolProperty = function (id, index, name, value) {
    getSymbolHandler(this).setSymbolProperty(id, index, name, value);
  };

  /**
   * 获取symbol的属性值
   * @param {string} id 
   * @param {number} index 
   * @param {string} name 
   * @returns {any}
   */
  maplibregl.Map.prototype.getSymbolProperty = function (id, index, name) {
    return getSymbolHandler(this).getSymbolProperty(id, index, name);
  };

  maplibregl.Map.prototype.getStyle = function () {
    if (this.style) {
      return getSymbolHandler(this).getStyle();
    }
  };

  maplibregl.Map.prototype.setFilter = function (layerId, filter, options) {
    if (this.style.getLayer(layerId)) {
      this.style.setFilter(layerId, filter, options);
      return this._update(true);
    }
    getSymbolHandler(this).setFilter(layerId, filter, options);
    return this._update(true);
  };

  maplibregl.Map.prototype.getFilter = function (layerId) {
    if (this.style.getLayer(layerId)) {
      return this.style.getFilter(layerId);
    }
    return getSymbolHandler(this).getFilter(layerId);
  };

  maplibregl.Map.prototype.setLayerZoomRange = function (layerId, minzoom, maxzoom) {
    if (this.style.getLayer(layerId)) {
      this.style.setLayerZoomRange(layerId, minzoom, maxzoom);
      return this._update(true);
    }
    getSymbolHandler(this).setLayerZoomRange(layerId, minzoom, maxzoom);
    return this._update(true);
  };

  maplibregl.Map.prototype.setPaintProperty = function (layerId, name, value, options) {
    if (this.style.getLayer(layerId)) {
      this.style.setPaintProperty(layerId, name, value, options);
      return this._update(true);
    }
    getSymbolHandler(this).setPaintProperty(layerId, name, value, options);
    return this._update(true);
  };

  maplibregl.Map.prototype.getPaintProperty = function (layerId, name) {
    if (this.style.getLayer(layerId)) {
      return this.style.getPaintProperty(layerId, name);
    }
    return getSymbolHandler(this).getPaintProperty(layerId, name);
  };

  maplibregl.Map.prototype.getLayoutProperty = function (layerId, name) {
    if (this.style.getLayer(layerId)) {
      return this.style.getLayoutProperty(layerId, name);
    }
    return getSymbolHandler(this).getLayoutProperty(layerId, name);
  };
  
  if (maplibregl.Map.prototype.onBak === undefined) {
    maplibregl.Map.prototype.onBak = maplibregl.Map.prototype.on;
    maplibregl.Map.prototype.on = function (type, layerId, listener) {
      if (listener === undefined || this.style.getLayer(layerId)) {
        return this.onBak(type, layerId, listener);
      }
      const layerIds = getSymbolHandler(this).getLayerIds(layerId);
      layerIds.forEach(id => this.onBak(type, id, listener));
      return this;
    };
  }
  
  if (maplibregl.Map.prototype.onceBak === undefined) {
    maplibregl.Map.prototype.onceBak = maplibregl.Map.prototype.once;
    maplibregl.Map.prototype.once = function (type, layerId, listener) {
      if (listener === undefined || this.style.getLayer(layerId)) {
        return this.onceBak(type, layerId, listener);
      }
      const layerIds = getSymbolHandler(this).getLayerIds(layerId);
      layerIds.forEach(id => this.onceBak(type, id, listener));
      return this;
    };
  }
  
  if (maplibregl.Map.prototype.offBak === undefined) {
    maplibregl.Map.prototype.offBak = maplibregl.Map.prototype.off;
    maplibregl.Map.prototype.off = function (type, layerId, listener) {
      if (listener === undefined || this.style.getLayer(layerId)) {
        return this.offBak(type, layerId, listener);
      }
      const layerIds = getSymbolHandler(this).getLayerIds(layerId);
      layerIds.forEach(id => this.offBak(type, id, listener));
      return this;
    };
  }

  /**
   * @function WebSymbol.prototype.getSymbol
   * @param {string} id - 符号ID。
   * @description 获取符号信息。
   * @returns {object} 符号信息。
   * @private
   */
  async function getSymbol(id, map) {
    let url = `${map.basePath}/${id}/${id}`;
    if (process.env.NODE_ENV === 'development') {
      url = `../../dist/resources/symbols/${id}/${id}`;
    }

    const value = await FetchRequest.get(`${url}.json`).then(response => {
      if (!response.ok) {
        return null;
      }
      return response.json();
    })
      .catch(() => null);
    if (!value) {
      return null;
    }
    const paint = value.paint || {};
    const layout = value.layout || {};
    const hasImage = paint['fill-pattern'] || paint['line-pattern'] || layout['icon-image'];
    const image = hasImage && await new Promise((resolve) => {
      const image = new Image();
      image.src = `${url}.png`;
      image.onload = (content) => {
        resolve(content ? image : null);
      };
      image.onerror = () => {
        resolve(null);
      };
    });
    return {
      value,
      image
    }
  }

  /**
   * 加载单个Web符号
   * @param {string} id 
   * @param {Mapboxgl.Map} map 
   * @returns {object} symbol对象
   */
   function loadSymbol(id, map) {
    return getSymbol(id, map).then((symbolResult) => {
      if (!symbolResult) {
        return null;
      }
      const { value, image } = symbolResult;
      image && getSymbolHandler(map).addSymbolImageToMap(value, image);
      return value;
    })
  }
}
export default MapExtendSymbol
