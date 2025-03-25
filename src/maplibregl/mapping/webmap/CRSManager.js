import maplibregl from 'maplibre-gl';

export class CRSManager {
  constructor(proj4) {
    this.proj4 = proj4;
    this.builtInEPSG = ['EPSG:3857', 'EPSG:4326'];
  }

  isSameProjection(map, epsgCode) {
    return map.getCRS().epsgCode === epsgCode;
  }

  getProj4() {
    return this.proj4 || maplibregl.proj4;
  }

  getCRS(epsgCode) {
    return maplibregl.CRS.get(epsgCode);
  }

  registerCRS({ name, wkt, extent, unit }, autoRegister = true) {
    let crs = maplibregl.CRS.get(name);
    if (!crs) {
      crs = new maplibregl.CRS(name, wkt, extent, unit || extent[2] > 180 ? 'meter' : 'degree');
      autoRegister && maplibregl.CRS.set(crs);
    }
    if (this.proj4 && !this.builtInEPSG.includes(name)) {
      this.proj4.defs(name, crs.getWKT());
    }
    return crs;
  }
}
