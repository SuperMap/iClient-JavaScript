/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import SymbolHandler from './SymbolHandler';
import { FetchRequest } from "@supermap/iclient-common/util/FetchRequest";

/**
 * @function MapExtendSymbol
 * @description  扩展了 mapboxgl.Map 对图层相关的操作。
 * @private
 */
function MapExtendSymbol(){
  /**
   * 获取symbol管理
   * @param {*} map
   * @returns {object}
   */
  const getSymbolHandler = (map) => {
    if (!mapboxgl.Map.prototype.symbolHandler) {
      mapboxgl.Map.prototype.symbolHandler = new SymbolHandler(map);
    }
    return mapboxgl.Map.prototype.symbolHandler._update(map);
  }

  if (mapboxgl.Map.prototype.addLayerBySymbolBak === undefined) {
    mapboxgl.Map.prototype.addLayerBySymbolBak = mapboxgl.Map.prototype.addLayer;
    mapboxgl.Map.prototype.addLayer = function (layer, before) {
      if (layer.symbol) {
        getSymbolHandler(this).addLayer(layer, before);
        return this;
      }
      this.addLayerBySymbolBak(layer, before);
      return this;
    };
  }

  if (mapboxgl.Map.prototype.getLayerBySymbolBak === undefined) {
    mapboxgl.Map.prototype.getLayerBySymbolBak = mapboxgl.Map.prototype.getLayer;
    mapboxgl.Map.prototype.getLayer = function (id) {
      return getSymbolHandler(this).getLayer(id);
    };
  }

  if (mapboxgl.Map.prototype.moveLayerBySymbolBak === undefined) {
    mapboxgl.Map.prototype.moveLayerBySymbolBak = mapboxgl.Map.prototype.moveLayer;
    mapboxgl.Map.prototype.moveLayer = function (id, beforeId) {
      if (this.style.getLayer(id) && (!beforeId || this.style.getLayer(beforeId))) {
        return this.moveLayerBySymbolBak(id, beforeId);
      }
      getSymbolHandler(this).moveLayer(id, beforeId);
      return this._update(true);
    }
  }

  if (mapboxgl.Map.prototype.removeLayerBySymbolBak === undefined) {
    mapboxgl.Map.prototype.removeLayerBySymbolBak = mapboxgl.Map.prototype.removeLayer;
    mapboxgl.Map.prototype.removeLayer = function (id) {
      if (this.style.getLayer(id)) {
        return this.removeLayerBySymbolBak(id);
      }
      return getSymbolHandler(this).removeLayer(id);
    };
  }

  if (mapboxgl.Map.prototype.setLayoutPropertyBySymbolBak === undefined) {
    //目前扩展的overlayer，只支持显示或隐藏图层操作
    mapboxgl.Map.prototype.setLayoutPropertyBySymbolBak = mapboxgl.Map.prototype.setLayoutProperty;
    mapboxgl.Map.prototype.setLayoutProperty = function (layerID, name, value, options) {
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
  mapboxgl.Map.prototype.setSymbol = function (layerId, symbol) {
    getSymbolHandler(this).setSymbol(layerId, symbol);
  };

  /**
   * Layer新增symbol属性
   */
  if (!(mapboxgl.Map.prototype).setStyleBak) {
    (mapboxgl.Map.prototype).setStyleBak = mapboxgl.Map.prototype.setStyle;
    mapboxgl.Map.prototype.setStyle = function (style, options) {
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
   * @param {string} id
   * @param {function} callback
   */
  mapboxgl.Map.prototype.loadSymbol = async function (id, callback) {
    if (typeof id === 'string') {
      let symbolInfo = getSymbolHandler(this).getSymbolInfo(id);
      if (!symbolInfo) {
        const symbolResult = await getSymbol(id, this);
        if (!symbolResult) {
          callback({
            message: 'This symbol is not exists.'
          });
          return;
        }
        const { value, image } = symbolResult;
        symbolInfo = value;
        image && getSymbolHandler(this).addSymbolImageToMap(value, image);
      }
      callback(null, symbolInfo);
    } else {
      callback({
        message: 'Symbol id must be a string.'
      });
    }
  };

  /**
   * 添加符号
   * @param {string} id
   * @param {object} symbol
   */
  mapboxgl.Map.prototype.addSymbol = function (id, symbol) {
    getSymbolHandler(this).addSymbol(id, symbol);
  };

  /**
   * 判断符号是否存在
   * @param {string} id
   */
  mapboxgl.Map.prototype.hasSymbol = function (id) {
    if (!id) {
      this.fire('error', {
        error: new Error('Missing required symbol id')
      });
      return false;
    }

    return !!getSymbolHandler(this).getSymbolInfo(id);
  };

  /**
   * 删除符号
   * @param {string} id
   * @param {object} symbol
   */
  mapboxgl.Map.prototype.removeSymbol = function (id) {
    getSymbolHandler(this).removeSymbol(id);
  };

  mapboxgl.Map.prototype.getStyle = function () {
    if (this.style) {
      return getSymbolHandler(this).getStyle();
    }
  };

  mapboxgl.Map.prototype.setFilter = function (layerId, filter, options) {
    if (this.style.getLayer(layerId)) {
      this.style.setFilter(layerId, filter, options);
      return this._update(true);
    }
    getSymbolHandler(this).setFilter(layerId, filter, options);
    return this._update(true);
  }

  mapboxgl.Map.prototype.getFilter = function (layerId) {
    if (this.style.getLayer(layerId)) {
      return this.style.getFilter(layerId);
    }
    return getSymbolHandler(this).getFilter(layerId);
  }

  mapboxgl.Map.prototype.setLayerZoomRange = function (layerId, minzoom, maxzoom) {
    if (this.style.getLayer(layerId)) {
      this.style.setLayerZoomRange(layerId, minzoom, maxzoom);
      return this._update(true);
    }
    getSymbolHandler(this).setLayerZoomRange(layerId, minzoom, maxzoom);
    return this._update(true);
  }

  mapboxgl.Map.prototype.setPaintProperty = function (layerId, name, value, options) {
    if (this.style.getLayer(layerId)) {
      this.style.setPaintProperty(layerId, name, value, options);
      return this._update(true);
    }
    getSymbolHandler(this).setPaintProperty(layerId, name, value, options);
    return this._update(true);
  }

  mapboxgl.Map.prototype.getPaintProperty = function (layerId, name) {
    if (this.style.getLayer(layerId)) {
      return this.style.getPaintProperty(layerId, name);
    }
    return getSymbolHandler(this).getPaintProperty(layerId, name);
  }

  mapboxgl.Map.prototype.getLayoutProperty = function (layerId, name) {
    if (this.style.getLayer(layerId)) {
      return this.style.getLayoutProperty(layerId, name);
    }
    return getSymbolHandler(this).getLayoutProperty(layerId, name);
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
        return;
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

}
export default MapExtendSymbol
