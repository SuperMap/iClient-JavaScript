// /* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
//  * This program are made available under the terms of the Apache License, Version 2.0
//  * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
// import maplibregl from 'maplibre-gl';
// import { getScene } from '../overlay/L7Extend';
// /**
//  * @function MapExtend
//  * @description  扩展了 maplibregl.Map 对图层相关的操作。
//  * @private
//  */
// // class MapExtend extends maplibregl.Map {
// //   constructor(...args) {
// //     super(...args);
// //     if (!this.$scene) {
// //       this.$scene = getScene(this);
// //     }
// //   }
// // }
// export var MapExtend = (function () {
//   if (maplibregl.Map.prototype.addLayerBak === undefined) {
//     maplibregl.Map.prototype.addLayerBak = maplibregl.Map.prototype.addLayer;
//     maplibregl.Map.prototype.addLayer = function (layer, before) {
//       if (!maplibregl.Map.prototype.$scene && layer.hasOwnProperty('l7layer')) {
//         maplibregl.Map.prototype.$scene = getScene(this);
//       }
//       if (layer.source || layer.type === 'custom' || layer.type === 'background') {
//         this.addLayerBak(layer, before);
//         return this;
//       }
//       addLayer(layer, this);
//       return this;
//     };
//   }
//   function addLayer(layer, map) {
//     layer.onAdd && layer.onAdd(map);
//   }
// })();
