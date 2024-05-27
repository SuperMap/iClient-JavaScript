/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import maplibregl from 'maplibre-gl';

/**
  * @function MapExtend
  * @description 扩展 maplibregl.Map。
  * @private
  */
 export var MapExtend = (function () {
   maplibregl.Map = class Map extends maplibregl.Map {
      constructor(options) {
        super(options);
        this.overlayLayersManager = {};
      }
   }
   if (maplibregl.Map.prototype.addLayerBak === undefined) {
     maplibregl.Map.prototype.addLayerBak = maplibregl.Map.prototype.addLayer;
     maplibregl.Map.prototype.addLayer = function (layer, before) {
       if (layer.source || layer.type === 'custom' || layer.type === 'background') {
         this.addLayerBak(layer, before);
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
       addLayer(layer, this);
       this.overlayLayersManager[layer.id] = layer;
       return this;
     };
   }
    /**
       * @function listLayers
       * @category BaseTypes MapExtend
       * @version 11.2.0
       * @description 扩展mapboxgl.Map， 获取所有叠加图层;
       * @returns {Array} 图层数组。
       */
    maplibregl.Map.prototype.listLayers = function () {
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
    };
  
 
   maplibregl.Map.prototype.getLayer = function (id) {
     if (this.overlayLayersManager[id]) {
       return this.overlayLayersManager[id];
     }
     return this.style.getLayer(id);
   };
 
   maplibregl.Map.prototype.moveLayer = function (id, beforeId) {
     if (this.overlayLayersManager[id]) {
       this.overlayLayersManager[id].moveLayer
         ? this.overlayLayersManager[id].moveLayer(id, beforeId)
         : moveLayer(id, beforeId);
       return this;
     }
     if (this.style._layers[id]) {
       this.style.moveLayer(id, beforeId);
       this._update(true);
       return this;
     }
   };
 
   maplibregl.Map.prototype.removeLayer = function (id) {
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
   };
 
   //目前扩展的overlayer，只支持显示或隐藏图层操作
   maplibregl.Map.prototype.setLayoutProperty = function (layerID, name, value) {
     if (this.overlayLayersManager[layerID]) {
       if (name === 'visibility') {
         if (value === 'visible') {
           value = true;
         } else {
           value = false;
         }
         setVisibility(this.overlayLayersManager[layerID], value);
         this.style.fire('data', { dataType: 'style' });
       }
       return this;
     }
     this.style.setLayoutProperty(layerID, name, value);
     this._update(true);
     return this;
   };
   maplibregl.Map.prototype.updateTransform = function (units, originX, originY, centerX, centerY, width, height) {
     this.transform.units = units;
     var mercatorZfromAltitude = this.mercatorZfromAltitude;
     maplibregl.MercatorCoordinate.fromLngLat = function (lngLatLike, altitude) {
       altitude = altitude || 0;
       const lngLat = maplibregl.LngLat.convert(lngLatLike);
       return new maplibregl.MercatorCoordinate(
         (lngLat.lng - originX) / width,
         (originY - lngLat.lat) / height,
         mercatorZfromAltitude(altitude, lngLat.lat)
       );
     };
     maplibregl.MercatorCoordinate.prototype.toLngLat = function () {
       return new maplibregl.LngLat(this.x * width + originX, originY - this.y * height);
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
   };
 
   function addLayer(layer, map) {
     layer.onAdd && layer.onAdd(map);
   }
 
   /**
    * @function MapExtend.prototype.setVisibility
    * @description  设置图层可见性，设置图层的隐藏，显示，重绘的相应的可见标记。
    * @param {boolean} [visibility] - 是否显示图层（当前地图的 resolution 在最大最小 resolution 之间）。
    */
   function setVisibility(layer, visibility) {
     layer.setVisibility && layer.setVisibility(visibility);
   }
 
   /**
    * @function MapExtend.prototype.moveTo
    * @description 将图层移动到某个图层之前。
    * @param {string} layerID -待插入的图层 ID。
    * @param {boolean} [beforeLayerID] - 是否将本图层插入到图层 ID 为 layerID 的图层之前(如果为 false 则将本图层插入到图层 ID 为 layerID 的图层之后)。
    */
   function moveLayer(layerID, beforeLayerID) {
     var layer = document.getElementById(layerID);
     // var beforeLayer;
     if (beforeLayerID) {
       var beforeLayer = document.getElementById(beforeLayerID);
       if (!beforeLayer) {
         maplibregl.Evented.prototype.fire('error', {
           error: new Error(`Layer with id "${beforeLayerID}" does not exist on this document.`)
         });
       }
     }
     if (layer && beforeLayer) {
       beforeLayer.parentNode.insertBefore(layer, beforeLayer);
     } else {
       //当没有传入beforeLayerID ，则默认将图层移动到最上面
       layer.parentNode.appendChild(layer);
     }
   }
 })();
