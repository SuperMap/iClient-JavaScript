import L from "leaflet";
import {GeoJSON as GeoJSONFormat, Unit} from '@supermap/iclient-common';

export var supermap_callbacks = {};
L.Util.supermap_callbacks = supermap_callbacks;
export var toGeoJSON = function (feature) {
    if (!feature) {
        return feature;
    }
    return JSON.parse(new GeoJSONFormat().write(feature));
};
export var toSuperMapGeometry = function (geometry) {
    if (!geometry) {
        return geometry;
    }
    var result, format = new GeoJSONFormat();
    if (["FeatureCollection", "Feature", "Geometry"].indexOf(geometry.type) != -1) {
        result = format.read(geometry, geometry.type);
    } else if (typeof geometry.toGeoJSON === "function") {
        var geojson = geometry.toGeoJSON();
        result = (geojson) ? format.read(geojson, geojson.type) : geometry;
    }

    var serverResult = result;
    if (L.Util.isArray(result)) {
        if (result.length === 1) {
            serverResult = result[0];
        } else if (result.length > 1) {
            serverResult = [];
            result.map(function (item) {
                serverResult.push(item.geometry);
                return item;
            });
        }
    }

    return (serverResult && serverResult.geometry) ? serverResult.geometry : serverResult;

};

export var getMeterPerMapUnit = function (mapUnit) {
    var earchRadiusInMeters = 6378137;
    var meterPerMapUnit;
    if (mapUnit === Unit.METER) {
        meterPerMapUnit = 1;
    } else if (mapUnit === Unit.DEGREE) {
        // 每度表示多少米。
        meterPerMapUnit = Math.PI * 2 * earchRadiusInMeters / 360;
    } else if (mapUnit === Unit.KILOMETER) {
        meterPerMapUnit = 1.0E-3;
    } else if (mapUnit === Unit.INCH) {
        meterPerMapUnit = 1 / 2.5399999918E-2;
    } else if (mapUnit === Unit.FOOT) {
        meterPerMapUnit = 0.3048;
    } else {
        return meterPerMapUnit;
    }
    return meterPerMapUnit;
};

export var resolutionToScale = function (resolution, dpi, mapUnit) {
    var inchPerMeter = 1 / 0.0254;
    // 地球半径。
    var meterPerMapUnit = getMeterPerMapUnit(mapUnit);
    var scale = resolution * dpi * inchPerMeter * meterPerMapUnit;
    scale = 1 / scale;
    return scale;
};
export var scaleToResolution = function (scale, dpi, mapUnit) {
    var inchPerMeter = 1 / 0.0254;
    var meterPerMapUnitValue = getMeterPerMapUnit(mapUnit);
    var resolution = scale * dpi * inchPerMeter * meterPerMapUnitValue;
    resolution = 1 / resolution;
    return resolution;
};

export var GetResolutionFromScaleDpi = function (scale, dpi, coordUnit, datumAxis) {
    var resolution = null,
        ratio = 10000;
    //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || "";
    if (scale > 0 && dpi > 0) {
        scale = L.Util.NormalizeScale(scale);
        if (coordUnit.toLowerCase() === "degree" || coordUnit.toLowerCase() === "degrees" || coordUnit.toLowerCase() === "dd") {
            //scale = SuperMap.Util.normalizeScale(scale);
            resolution = 0.0254 * ratio / dpi / scale / ((Math.PI * 2 * datumAxis) / 360) / ratio;
            return resolution;
        } else {
            resolution = 0.0254 * ratio / dpi / scale / ratio;
            return resolution;
        }
    }
    return -1;
};
export var NormalizeScale = function (scale) {
    return (scale > 1.0) ? (1.0 / scale) : scale;
};

L.Util.toGeoJSON = toGeoJSON;
L.Util.toSuperMapGeometry = toSuperMapGeometry;
L.Util.resolutionToScale = resolutionToScale;
L.Util.scaleToResolution = scaleToResolution;
L.Util.getMeterPerMapUnit = getMeterPerMapUnit;
L.Util.GetResolutionFromScaleDpi = GetResolutionFromScaleDpi;
L.Util.NormalizeScale = NormalizeScale;