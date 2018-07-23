import L from "leaflet";
import {CommonUtil} from '@supermap/iclient-common';

/**
 * @function L.Util.transform
 * @description 将要素转换为指定坐标。
 * @param {(L.Marker|L.CircleMarker|L.Polyline|L.Polygon|L.Rectangle|L.LatLngBounds|L.Bounds|Object)} feature - 待转要素包括 Leaflet Vector Layers
 *              的 {@link L.Marker}|{@link L.CircleMarker}|{@link L.Polyline}|{@link L.Polygon}|{@link L.Rectangle}|{@link L.LatLngBounds}|{@link L.Bounds} 类型和 GeoJOSN 规范数据类型。
 * @param {L.Proj.CRS} [sourceCRS=L.CRS.EPSG4326] - 要素转换源坐标系。
 * @param {L.Proj.CRS} targetCRS - 要素转换目标坐标系。
 * @return {Object} 返回 GeoJOSN 规范数据类型。
 */
export var transform = function (feature, sourceCRS = L.CRS.EPSG4326, targetCRS) {
    let selfFeatures = null;
    let selfCallback = null;
    //将数据统一为 geojson 格式处理：
    if (["FeatureCollection", "Feature", "Geometry"].indexOf(feature.type) === -1) {
        if (feature.toGeoJSON) {
            feature = feature.toGeoJSON();
        } else if (feature instanceof L.LatLngBounds) {
            feature = L.rectangle(feature).toGeoJSON();
        } else if (feature instanceof L.Bounds) {
            feature = L.rectangle([[feature.getTopLeft().x, feature.getTopLeft().y],
                [feature.getBottomRight().x, feature.getBottomRight().y]]).toGeoJSON();
        } else {
            throw new Error("This tool only supports data conversion in geojson format or Vector Layers of Leaflet.")
        }
    }

    //geojson 几种数据类型及处理形式
    const parseCoords = {
        "point": function (array) {
            return selfCallback(array);
        },

        "multipoint": function (array) {
            return parseCoords["linestring"].apply(this, [array])
        },

        "linestring": function (array) {
            let points = [];
            let p = null;
            for (let i = 0, len = array.length; i < len; ++i) {
                try {
                    p = parseCoords["point"].apply(this, [array[i]]);
                } catch (err) {
                    throw err;
                }
                points.push(p);
            }
            return points;
        },

        "multilinestring": function (array) {
            return parseCoords["polygon"].apply(this, [array]);
        },

        "polygon": function (array) {
            let rings = [];
            let l;
            for (let i = 0, len = array.length; i < len; ++i) {
                try {
                    l = parseCoords["linestring"].apply(this, [array[i]]);
                } catch (err) {
                    throw err;
                }
                rings.push(l);
            }
            return rings;
        },
        "multipolygon": function (array) {
            let polys = [];
            let p = null;
            for (let i = 0, len = array.length; i < len; ++i) {
                try {
                    p = parseCoords["polygon"].apply(this, [array[i]]);
                } catch (err) {
                    throw err;
                }
                polys.push(p);
            }
            return polys;
        }

    };

    //返回结果：
    return featureTransform(feature, _transformCoordinates);

    function featureTransform(feature, callback) {
        selfFeatures = feature;
        selfCallback = callback;
        //分离处理：
        if (feature.type === "Feature") {
            selfFeatures = _prepareFeatuers(feature);
        } else if (feature.type === "FeatureCollection") {
            let featureResults = [];
            for (let i = 0; i < feature.features.length; ++i) {
                try {
                    featureResults.push(_prepareFeatuers(feature.features[i]));
                } catch (err) {
                    featureResults = null;
                }
            }
            selfFeatures.features = featureResults;
        }

        return selfFeatures;
    }

    function _prepareFeatuers(feature) {
        const geometry = feature.geometry;
        if (!(CommonUtil.isArray(geometry.coordinates))) {
            throw "Geometry must have coordinates array: " + geometry;
        }
        if (!parseCoords[geometry.type.toLowerCase()]) {
            throw "Unsupported geometry type: " + geometry.type;
        }
        try {
            geometry.coordinates = parseCoords[geometry.type.toLowerCase()].apply(
                this, [geometry.coordinates]
            );
        } catch (err) {
            throw err;
        }
        feature.geometry = geometry;
        return feature;
    }

    function _transformCoordinates(coordinates) {
        //判断code 是投影坐标还是地理坐标
        var point = sourceCRS.unproject({x: coordinates[0], y: coordinates[1]});
        const transform = targetCRS.project(point);
        return [transform.x, transform.y];
    }

};

L.Util.transform = transform;