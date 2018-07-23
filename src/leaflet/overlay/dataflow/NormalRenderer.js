import L from "leaflet";
import '../../core/Base';

/**
 * @class NormalRenderer
 * @classdesc 数据流图层普通渲染器。
 * @category  iServer DataFlow
 * @extends {L.GeoJSON}
 * @param {string} url - 数据流图层服务地址
 * @param {Object} options - 设置图层参数。
 * @param {Object} [options.geometry] - GeoJSON 几何对象。
 * @param {Object} [options.prjCoordSys] - 投影坐标对象。
 * @param {string} [options.excludeField] - 排除字段。
 * @param {string} [options.idField='id'] - 要素属性中表示唯一标识的字段。
 */
export var NormalRenderer = L.GeoJSON.extend({

    initialize: function (url, options) {
        options = options || {};
        if (options.style && !options.pointToLayer) {
            options.pointToLayer = function (geojson, latlng) {
                return L.circleMarker(latlng, options.style());
            }
        }
        L.Util.setOptions(this, options);
        this._layers = {};
        L.stamp(this);
        this.url = url;
        this.idCache = {};
    },

    onMessageSuccessed: function (msg) {
        const geojson = msg.featureResult;
        const geoID = msg.featureResult.properties[this.options.idField];
        let layer = null;
        if (geoID !== undefined && this.idCache[geoID]) {
            layer = this.getLayer(this.idCache[geoID]);
            this._updateLayerData(layer, geojson);
        } else {
            layer = L.GeoJSON.geometryToLayer(geojson, this.options);
            layer.feature = L.GeoJSON.asFeature(geojson);
            this.addLayer(layer);
            if (geoID !== undefined) {
                this.idCache[geoID] = this.getLayerId(layer);
            }
        }
        if (this.options.onEachFeature) {
            this.options.onEachFeature(geojson, layer);
        }
    },
    _updateLayerData: function (layer, geojson) {
        if (geojson.properties) {
            layer.feature.properties = geojson.properties;
        }
        var latlngs = [];
        switch (geojson.geometry.type) {
            case 'Point':
                latlngs = L.GeoJSON.coordsToLatLng(geojson.geometry.coordinates);
                layer.setLatLng(latlngs);
                break;
            case 'LineString':
                latlngs = L.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates, 0);
                layer.setLatLngs(latlngs);
                break;
            case 'MultiLineString':
            case 'Polygon':
                latlngs = L.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates, 1);
                layer.setLatLngs(latlngs);
                break;
            case 'MultiPolygon':
                latlngs = L.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates, 2);
                layer.setLatLngs(latlngs);
                break;
        }
    }
});