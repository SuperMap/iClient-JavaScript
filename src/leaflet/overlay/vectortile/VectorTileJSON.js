import L from "leaflet";
import {VectorFeatureType} from "./VectorFeatureType";
import * as Util from "../../core/Util";
import {FetchRequest} from '@supermap/iclient-common';

/**
 * @class L.supermap.VectorTileJSON
 * @classdesc iServer 矢量瓦片json表述出图
 * @category Visualization VectorTile
 * @private
 * @extends {L.Class}
 * @param {string} url - 矢量瓦片json表述服务地址
 */
export var VectorTileJSON = L.Class.extend({

    initialize: function (url) {
        this.url = url;
    },

    /**
     * @function L.supermap.VectorTileJSON.prototype.getTile
     * @description 获取瓦片
     * @return {Promise} 返回包含矢量瓦片信息(js对象)的Promise对象
     */
    getTile: function () {
        var me = this;
        return FetchRequest.get(me.url, null, {
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
                scope._createFeature(id, VectorFeatureType.TEXT, [coords], tags) :
                scope._createFeature(id, VectorFeatureType.POINT, [coords], tags);
        } else if (type === 'MultiPoint') {
            newFeature = scope._createFeature(id, VectorFeatureType.POINT, coords, tags);
        } else if (type === 'LineString') {
            newFeature = scope._createFeature(id, VectorFeatureType.LINE, [coords], tags);
        } else if (type === 'MultiLineString' || type === 'Polygon') {
            rings = [];
            for (i = 0; i < coords.length; i++) {
                projectedRing = coords[i];
                if (type === 'Polygon') {
                    projectedRing.outer = (i === 0);
                }
                rings.push(projectedRing);
            }
            var featureType = (type === 'Polygon') ?
                VectorFeatureType.REGION :
                VectorFeatureType.LINE;
            newFeature = scope._createFeature(id, featureType, rings, tags);
        } else if (type === 'MultiPolygon') {
            rings = [];
            for (i = 0; i < coords.length; i++) {
                for (j = 0; j < coords[i].length; j++) {
                    projectedRing = coords[i][j];
                    projectedRing.outer = (j === 0);
                    rings.push(projectedRing);
                }
            }
            newFeature = scope._createFeature(id, VectorFeatureType.REGION, rings, tags);
        } else {
            throw new Error('Illegal GeoJSON object');
        }
        return newFeature;
    },

    _convertToGeoJSON: function (recordsets) {
        if (!recordsets) {
            return;
        }
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