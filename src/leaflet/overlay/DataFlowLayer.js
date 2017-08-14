import L from "leaflet";
import {DataFlowService} from "../services/DataFlowService";

/**
 * @class L.supermap.dataFlowLayer
 * @classdesc 数据流图层
 * @extends L.GeoJSON
 * @param url - {String} 数据流图层服务地址
 * @param options - {object} 设置图层参数。如：<>
 */
export var DataFlowLayer = L.GeoJSON.extend({

    /**
     * @member L.supermap.DataFlowLayer.prototype.options
     * @description 图层设置参数
     */
    options: {
        geometry: null,
        prjCoordSys: null,
        excludeField: null,
        idField: "id"
    },

    initialize: function (url, options) {
        options = options || {};
        var me = this;
        if (options.style && !options.pointToLayer) {
            options.pointToLayer = function (geojson, latlng) {
                return L.circleMarker(latlng, options.style());
            }
        }
        L.Util.setOptions(me, options);
        me._layers = {};
        L.stamp(me);
        me.url = url;
        this.idCache = {};
    },

    /**
     * @function L.supermap.DataFlowLayer.prototype.onAdd
     * @description 添加地图
     * @param map - {L.map} 待添加的地图
     */
    onAdd: function (map) {
        var me = this;
        me.dataService = new DataFlowService(this.url, {
            geometry: this.options.geometry,
            prjCoordSys: this.options.prjCoordSys,
            excludeField: this.options.excludeField
        }).initSubscribe();
        me.dataService.on('subscribeSocketConnected', function (e) {
            me.fire("subscribeSuccessed", e);
        });
        me.dataService.on('messageSuccessed', function (msg) {
            me._onMessageSuccessed(msg);
        });
        me.dataService.on('setFilterParamSuccessed', function (msg) {
            me.fire("setFilterParamSuccessed", msg);
        });
    },

    /**
     * @function L.supermap.DataFlowLayer.prototype.onRemove
     * @description 删除指定地图
     * @param map - {L.map} 待删除的地图
     */
    onRemove: function (map) {
        this.dataService.unSubscribe();
    },

    /**
     * @function L.supermap.DataFlowLayer.prototype.setPrjCoordSys
     * @description 设置地图投影坐标系统
     * @param prjCoordSys - {Object} 投影坐标系统
     */
    setPrjCoordSys: function (prjCoordSys) {
        this.dataService.setPrjCoordSys(prjCoordSys);
        this.options.prjCoordSys = prjCoordSys;
        return this;
    },

    /**
     * @function L.supermap.DataFlowLayer.prototype.setExcludeField
     * @description 设置唯一字段
     * @param excludeField - {String} 唯一字段
     */
    setExcludeField: function (excludeField) {
        this.dataService.setExcludeField(excludeField);
        this.options.excludeField = excludeField;
        return this;
    },

    /**
     * @function L.supermap.DataFlowLayer.prototype.setGeometry
     * @description 设置集合要素
     * @param geometry - {L.Geometry} 待设置的几何要素
     */
    setGeometry: function (geometry) {
        this.dataService.setGeometry(geometry);
        this.options.geometry = geometry;
        return this;
    },

    _onMessageSuccessed: function (msg) {
        var geojson = msg.featureResult;
        var geoID = msg.featureResult.properties[this.options.idField];
        var layer = null;
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
        this.fire("dataUpdated", {layer: this, updateLayer: layer, data: msg.featureResult});
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
                latlngs = L.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates, 1);
                layer.setLatLngs(latlngs);
                break;
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
export var dataFlowLayer = function (url, options) {
    return new DataFlowLayer(url, options);
};
L.supermap.dataFlowLayer = dataFlowLayer;