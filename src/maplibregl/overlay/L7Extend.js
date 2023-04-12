import * as L7 from '@antv/l7';
// import { ThreeLayer, ThreeRender } from '@antv/l7-three';
// import maplibregl from 'maplibre-gl';

// L7.ThreeLayer = ThreeLayer;
// L7.ThreeRender = ThreeRender;

// export function setScene() {
//   if (!maplibregl.Map.prototype.$scene && layer instanceof L7Layer) {
//     maplibregl.Map.prototype.$scene = getScene(this);
//   }
// }

export function getScene(map) {
  if (!map) {
    return null;
  }
  return new L7.Scene({
    id: map.getContainer().id,
    pickBufferScale: 1.0,
    isIClient: true,
    map: new L7.Mapbox({
      mapInstance: map
    })
  });
}
// const L7Layer = { ...L7, ThreeLayer, ThreeRender };
export default L7;
