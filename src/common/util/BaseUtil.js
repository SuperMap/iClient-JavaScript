export function isString(str) {
  return typeof str === 'string' && str.constructor === String;
}

export function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function isValidLatlng(coord) {
  return isArray(coord) && coord.length === 2 && coord[0] >= -180 && coord[0] <= 180 && coord[1] >= -90 && coord[1] <= 90;
}

export function featureCoordValid(feature) {
  if (feature && feature.geometry && feature.geometry.type) {
    const type = feature.geometry.type;
    if (type === 'Point') {
      return isValidLatlng(feature.geometry.coordinates);
    } else if (type === 'LineString') {
      return isValidLatlng(feature.geometry.coordinates[0]);
    } else if (type === 'Polygon' || type === 'MultiLineString') {
      return isValidLatlng(feature.geometry.coordinates[0][0]);
    }
  }
}