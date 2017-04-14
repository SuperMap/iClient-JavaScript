/**
 *将iServer tileFeature转换为类似VT标准的格式
 */
require("../../base");
require("./VectorFeatureType");
L.supermap.TileFeatureProcessor = {
    processTileFeature: function (recordSets) {
        if (!recordSets || recordSets.length < 1) {
            return null;
        }
        //如果iServer支持了tileFeature geojson表述则不需要此步骤
        recordSets = this.convertToGeoJSON(recordSets);
        //类似VT标准的数据格式,并为每个要素添加一个layerName字段
        for (var i = 0; i < recordSets.length; i++) {
            var recordset = recordSets[i];
            for (var j = 0; j < recordset.features.length; j++) {
                var feature = recordset.features[j];
                feature = this.convertToVectorLayerFeature(feature);
                feature.layerName = recordset.layerName;
                recordset.features[j] = feature;
            }
            recordset.extent = 256;
            delete recordset.fieldTypes;
            delete recordset.fields;
        }
        return recordSets;
    },

    convertToVectorLayerFeature: function (feature) {
        if (!feature.geometry) {
            return;
        }
        var newFeature = {};

        var geom = feature.geometry,
            type = geom.type,
            coords = geom.coordinates,
            tags = feature.properties,
            i, j, rings, projectedRing;


        if (type === 'Point') {
            newFeature = (tags && tags.texts) ?
                this.createFeature(tags, L.supermap.VectorFeatureType.TEXT, [coords]) :
                this.createFeature(tags, L.supermap.VectorFeatureType.POINT, [coords]);
        } else if (type === 'MultiPoint') {
            newFeature = this.createFeature(tags, L.supermap.VectorFeatureType.POINT, coords);
        } else if (type === 'LineString') {
            newFeature = this.createFeature(tags, L.supermap.VectorFeatureType.LINE, [coords]);
        } else if (type === 'MultiLineString' || type === 'Polygon') {
            rings = [];
            for (i = 0; i < coords.length; i++) {
                projectedRing = coords[i];
                if (type === 'Polygon') projectedRing.outer = (i === 0);
                rings.push(projectedRing);
            }
            var featureType = (type === 'Polygon') ? L.supermap.VectorFeatureType.REGION : L.supermap.VectorFeatureType.LINE;
            newFeature = this.createFeature(tags, featureType, rings);
        } else if (type === 'MultiPolygon') {
            rings = [];
            for (i = 0; i < coords.length; i++) {
                for (j = 0; j < coords[i].length; j++) {
                    projectedRing = coords[i][j];
                    projectedRing.outer = (j === 0);
                    rings.push(projectedRing);
                }
            }
            newFeature = this.createFeature(tags, L.supermap.VectorFeatureType.REGION, rings);
        } else {
            throw new Error('不合法的GeoJSON对象');
        }
        return newFeature;
    },


    createFeature: function (properties, type, geometry) {
        return {
            type: type,
            geometry: geometry,
            properties: properties
        }
    },

    convertToGeoJSON: function (recordsets) {
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
            recordset.features = L.Util.toGeoJSON(recordset.features).features;
        }
        return recordsets;
    }
};

module.exports = L.supermap.TileFeatureProcessor;