export function isString(str) {
  return typeof str === 'string' && str.constructor === String;
}

export function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
