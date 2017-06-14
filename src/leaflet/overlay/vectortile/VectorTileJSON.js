/**
 * iServer 矢量瓦片json表述出图
 */

require("../../core/Base");
require("./VectorFeatureType");
require("./VectorTileFormat");
var L = require("leaflet");
var Util = require("../../core/Util");
var SuperMap = require('../../../common/SuperMap');

var VectorTileJSON = L.Class.extend({
    initialize: function (url) {
        this.url = url;
    },

    getTile: function () {
        var me = this;
        return SuperMap.Request.get(me.url, null, {
            timeout: 10000
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            return me._processRecordSets(json, me);
        });
    },

    _processRecordSets: function (records, scope) {
        var recordsets = records.recordsets;
        // 如果iServer支持了tileFeature geojson表述则不需要此步骤
        recordsets = scope._convertToGeoJSON(recordsets);
        if (!recordsets) {
            return null;
        }

        //类似VT标准的数据格式,并为每个要素添加一个layerName字段
        for (var i = 0; i < recordsets.length; i++) {
            var recordset = recordsets[i];
            for (var j = 0; j < recordset.features.length; j++) {
                var feature = recordset.features[j];
                feature = scope._convertToVectorLayerFeature(feature, scope);
                feature.layerName = recordset.layerName;
                recordset.features[j] = feature;
            }
            recordset.extent = 256;
            delete recordset.fieldTypes;
            delete recordset.fields;
        }
        return recordsets;
    },

    _convertToVectorLayerFeature: function (feature, scope) {
        if (!feature.geometry) {
            return;
        }
        var newFeature = {};

        var geom = feature.geometry,
            type = geom.type,
            coords = geom.coordinates,
            tags = feature.properties,
            id = tags.id,
            i, j, rings, projectedRing;


        if (type === 'Point') {
            newFeature = (tags && tags.texts) ?
                scope._createFeature(id, L.supermap.VectorFeatureType.TEXT, [coords], tags) :
                scope._createFeature(id, L.supermap.VectorFeatureType.POINT, [coords], tags);
        }
        else if (type === 'MultiPoint') {
            newFeature = scope._createFeature(id, L.supermap.VectorFeatureType.POINT, coords, tags);
        }
        else if (type === 'LineString') {
            newFeature = scope._createFeature(id, L.supermap.VectorFeatureType.LINE, [coords], tags);
        }
        else if (type === 'MultiLineString' || type === 'Polygon') {
            rings = [];
            for (i = 0; i < coords.length; i++) {
                projectedRing = coords[i];
                if (type === 'Polygon') projectedRing.outer = (i === 0);
                rings.push(projectedRing);
            }
            var featureType = (type === 'Polygon') ?
                L.supermap.VectorFeatureType.REGION :
                L.supermap.VectorFeatureType.LINE;
            newFeature = scope._createFeature(id, featureType, rings, tags);
        }
        else if (type === 'MultiPolygon') {
            rings = [];
            for (i = 0; i < coords.length; i++) {
                for (j = 0; j < coords[i].length; j++) {
                    projectedRing = coords[i][j];
                    projectedRing.outer = (j === 0);
                    rings.push(projectedRing);
                }
            }
            newFeature = scope._createFeature(id, L.supermap.VectorFeatureType.REGION, rings, tags);
        } else {
            throw new Error('不合法的GeoJSON对象');
        }
        return newFeature;
    },

    _convertToGeoJSON: function (recordsets) {
        for (var i = 0; i < recordsets.length; i++) {
            var recordset = recordsets[i];
            for (var j = 0; j < recordset.features.length; j++) {
                var feature = recordset.features[j];
                var points = [];
                var startIndex = 0;

                for (var k = 0; k < feature.geometry.parts.length; k++) {
                    var partPointsLength = feature.geometry.parts[k] * 2;
                    for (var l = 0, index = startIndex; l < partPointsLength; l += 2, index += 2) {
                        var x = feature.geometry.points[index];
                        var y = feature.geometry.points[index + 1];
                        points.push({x: x, y: y});
                    }
                    startIndex += partPointsLength;
                }
                feature.geometry.points = points;
            }
            recordset.features = Util.toGeoJSON(recordset.features).features;
        }
        return recordsets;
    },

    _createFeature: function (id, type, geometry, properties) {
        return {
            id: id,
            type: type,
            geometry: geometry,
            properties: properties
        }
    }

});

L.supermap.vectorTileJSON = function (url) {
    return new VectorTileJSON(url);
};

module.exports = VectorTileJSON;