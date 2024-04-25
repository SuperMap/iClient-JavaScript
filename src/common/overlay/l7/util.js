export function getL7Scene(L7Scene, L7Map, map) {
  if (!map) {
    return null;
  }
  return new L7Scene({
    id: map.getContainer().id,
    pickBufferScale: 1.0,
    map: new L7Map({
      mapInstance: map
    })
  });
}
