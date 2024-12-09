import mapboxgl from 'mapbox-gl';

export class CRSManager {
  constructor(proj4) {
    this.proj4 = proj4;
    this.builtInEPSG = ['EPSG:3857', 'EPSG:4326'];
  }

  isSameProjection(map, epsgCode) {
    return map.getCRS().epsgCode === epsgCode;
  }

  getProj4() {
    return this.proj4 || mapboxgl.proj4;
  }

  getCRS(epsgCode) {
    return mapboxgl.CRS.get(epsgCode);
  }

  registerCRS({ name, wkt, extent, unit }, autoRegister = true) {
    let crs = mapboxgl.CRS.get(name);
    if (!crs) {
      crs = new mapboxgl.CRS(name, wkt, extent, unit || extent[2] > 180 ? 'meter' : 'degree');
      autoRegister && mapboxgl.CRS.set(crs);
    }
    if (this.proj4 && !this.builtInEPSG.includes(name)) {
      this.proj4.defs(name, crs.getWKT());
    }
    return crs;
  }
}
