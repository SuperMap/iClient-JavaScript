const epsgDefine = {
  epsgCodes: {
    'EPSG:3857':
      'PROJCS["WGS 84 / Pseudo-Mercator",GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]],PROJECTION["Mercator_Auxiliary_Sphere"],PARAMETER["central_meridian",0],PARAMETER["scale_factor",1],PARAMETER["false_easting",0],PARAMETER["false_northing",0],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AXIS["X",EAST],AXIS["Y",NORTH],EXTENSION["PROJ4","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"],AUTHORITY["EPSG","3857"]]',
    'EPSG:4326':
      'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],AXIS["Easting", "EAST"],AXIS["Northing", "NORTH"],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]',
    'EPSG:4490':
      'GEOGCS["China Geodetic Coordinate System 2000", DATUM["China 2000", SPHEROID["CGCS2000", 6378137.0, 298.257222101, AUTHORITY["EPSG","1024"]], AUTHORITY["EPSG","1043"]], PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], UNIT["degree", 0.017453292519943295], AXIS["Geodetic latitude", NORTH], AXIS["Geodetic longitude", EAST], AUTHORITY["EPSG","4490"]]'
  },
  registerProjection(epsgKey, epsgValue) {
    if (Object.prototype.toString.call(arguments[0]) === '[object Object]' && arguments.length === 1) {
      this.epsgCodes = Object.assign({}, this.epsgCodes, arguments[0]);
    } else if (epsgKey && epsgValue) {
      this.epsgCodes[epsgKey] = epsgValue;
    }
  },
  getProjection(epsgKey) {
    return this.epsgCodes[epsgKey];
  },
  getAllProjections() {
    return this.epsgCodes;
  }
};

function toEpsgCode(wkt) {
  if (typeof wkt !== 'string') {
    return '';
  } else if (wkt.indexOf('EPSG') === 0) {
    return wkt;
  } else {
    let lastAuthority = wkt.lastIndexOf('AUTHORITY') + 10;
    let endString = wkt.indexOf(']', lastAuthority) - 1;
    if (lastAuthority > 0 && endString > 0) {
      return `EPSG:${wkt
        .substring(lastAuthority, endString)
        .split(',')[1]
        .substr(1)}`;
    } else {
      return '';
    }
  }
}

export { epsgDefine, toEpsgCode };
