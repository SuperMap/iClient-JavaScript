var L = require("leaflet");
var DataFlowService = require("../services/DataFlowService");

/**
*@class DataFlowLayer
 */
var DataFlowLayer = L.GeoJSON.extend({
    options: {
        geometry: null,
        prjCoordSys: null,
        excludeField: null,
    },
    initialize: function (url, options) {
        options = options || {};
        var me = this;
        if (options.style && !options.pointToLayer) {
            me.options.pointToLayer = function (geojson, latlng) {
                return L.circleMarker(latlng, me.options.style);
            }
        }
        L.Util.setOptions(me, options);
        me._layers = {};
        L.stamp(me);
        me.url = url;

    },
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
    onRemove: function (map) {
        this.dataService.unSubscribe();
    },
    setPrjCoordSys: function (prjCoordSys) {
        this.dataService.setPrjCoordSys(prjCoordSys);
        this.options.prjCoordSys = prjCoordSys;
        return this;
    },
    setExcludeField: function (excludeField) {
        this.dataService.setExcludeField(excludeField);
        this.options.excludeField = excludeField;
        return this;
    },
    setGeometry: function (geometry) {
        this.dataService.setGeometry(geometry);
        this.options.geometry = geometry;
        return this;
    },
    _onMessageSuccessed: function (msg) {
        this.clearLayers();
        this.addData(msg.featureResult);
        this.fire("dataUpdated", {layer: this, data: msg.featureResult});

    }
});
L.supermap.dataFlowLayer = function (url, options) {
    return new DataFlowLayer(url, options);
};
module.exports = DataFlowLayer;