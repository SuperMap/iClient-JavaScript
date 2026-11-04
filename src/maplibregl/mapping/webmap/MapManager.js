import '../../core/Base';
import * as maplibregl from 'maplibre-gl';

export default class MapManager extends maplibregl.Map {
  loadImage(url, callback) {
    return super.loadImage(url).then((image) => {
      callback(null, image.data);
      return image.data;
    });
  }
}