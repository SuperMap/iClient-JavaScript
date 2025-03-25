
import '../../core/Base';
import mapboxgl from 'mapbox-gl';

export default class MapManager extends mapboxgl.Map {
  loadImage(url, callback) {
    return new Promise((resolve) => {
      super.loadImage(url, function(err, image) {
        callback(err, image);
        resolve(image);
      });
    });
  }
}