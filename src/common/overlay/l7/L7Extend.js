import * as L7 from '@antv/l7';
import { ThreeLayer } from '@antv/l7-three';

export function getL7Scene(map, type = 'Maplibre') {
  if (!map) {
    return null;
  }
  return new L7.Scene({
    id: map.getContainer().id,
    pickBufferScale: 1.0,
    isIClient: true,
    map: new L7[type]({
      mapInstance: map
    })
  });
}
export default L7;
export { ThreeLayer };
