// // import '../core/Base';
// import L7 from './L7Extend';

// window.L7 = L7;

// function L7Layer(type, options) {
//   const layer = new L7[type](options);
//   layer.type = 'custom';
//   let scene;
//   let globalMap;
//   layer.getScene = function () {
//     return scene;
//   };

//   layer.onAdd = function (map) {
//     globalMap = map;
//     scene = map.$l7scene;
//     console.log('onAdd--------', layer.id, scene);
//     if (scene) {
//       Promise.resolve({}).then(() => {
//         scene.addLayer(layer);
//       });
//     }
//   };
//   layer.onRemove = function () {
//     console.log('onRemove--------');
//     layer && layer.stopAnimate();
//     scene && scene.removeLayer(layer);
//     globalMap = null;
//     scene = null;
//   };
//   console.log(layer.render);

//   layer.render = function () {
//     if (scene && scene.getLayer(layer.id)) {
//       console.log('render matrix--------', layer.id);
//       scene.layerService.renderLayer(layer.id);
//       if (layer.aniamateStatus) {
//         console.log('aniamateStatus', layer.id);
//         scene.layerService.startAnimate(layer.id);
//         globalMap.triggerRepaint();
//       }
//     } else {
//       scene.addLayer(layer);
//     }
//   };
//   return layer;
// }

// export { L7Layer };
