/**
 *SuperMapLeaflet基础模块
 * 1、定义命名空间
 * 2、提供必要的转换工具
 */
L.supermap = L.supermap || {};
require('../Core/format/GeoJSON');
require('./NonEarthCRS');

L.Util.toGeoJSON = function (feature) {
    if (!feature) {
        return feature;
    }
    var result, format = new SuperMap.Format.GeoJSON();
    if (feature.geometry) {
        result = JSON.parse(format.write(feature.geometry));
    } else {
        result = JSON.parse(format.write(feature));
    }
    return result;
};

L.Util.toSuperMapGeometry = function (geometry) {
    if (!geometry) {
        return geometry;
    }
    var result, format = new SuperMap.Format.GeoJSON();
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
            });
        }
    }

    return (serverResult && serverResult.geometry) ? serverResult.geometry : serverResult;

};

L.Util.Csv2GeoJSON = function (csv, options) {
    var defaultOptions = {
        titles: ['lon', 'lat'],
        latitudeTitle: 'lat',
        longitudeTitle: 'lon',
        fieldSeparator: ',',
        lineSeparator: '\n',
        deleteDoubleQuotes: true,
        firstLineTitles: false
    };
    options = options || defaultOptions;
    var _propertiesNames = []
    if (typeof csv === 'string') {
        var titulos = options.titles;
        if (options.firstLineTitles) {
            csv = csv.split(options.lineSeparator);
            if (csv.length < 2) return;
            titulos = csv[0];
            csv.splice(0, 1);
            csv = csv.join(options.lineSeparator);
            titulos = titulos.trim().split(options.fieldSeparator);
            for (var i = 0; i < titulos.length; i++) {
                titulos[i] = _deleteDoubleQuotes(titulos[i]);
            }
            options.titles = titulos;
        }
        for (var i = 0; i < titulos.length; i++) {
            var prop = titulos[i].toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '_');
            if (prop == '' || prop == '_') prop = 'prop-' + i;
            _propertiesNames[i] = prop;
        }
        csv = _csv2json(csv);
    }
    return csv;

    function _deleteDoubleQuotes(cadena) {
        if (options.deleteDoubleQuotes) cadena = cadena.trim().replace(/^"/, "").replace(/"$/, "");
        return cadena;
    };

    function _csv2json(csv) {
        var json = {};
        json["type"] = "FeatureCollection";
        json["features"] = [];
        var titulos = options.titles;
        csv = csv.split(options.lineSeparator);
        for (var num_linea = 0; num_linea < csv.length; num_linea++) {
            var campos = csv[num_linea].trim().split(options.fieldSeparator)
                , lng = parseFloat(campos[titulos.indexOf(options.longitudeTitle)])
                , lat = parseFloat(campos[titulos.indexOf(options.latitudeTitle)]);
            if (campos.length == titulos.length && lng < 180 && lng > -180 && lat < 90 && lat > -90) {
                var feature = {};
                feature["type"] = "Feature";
                feature["geometry"] = {};
                feature["properties"] = {};
                feature["geometry"]["type"] = "Point";
                feature["geometry"]["coordinates"] = [lng, lat];
                for (var i = 0; i < titulos.length; i++) {
                    if (titulos[i] != options.latitudeTitle && titulos[i] != options.longitudeTitle) {
                        feature["properties"][_propertiesNames[i]] = _deleteDoubleQuotes(campos[i]);
                    }
                }
                json["features"].push(feature);
            }
        }
        return json;
    };
};