require('../core/Base');
var DataFlowService = require("../services/DataFlowService");
var ol = require('openlayers/dist/ol-debug');

/**
 *@class ol.source.DataFlow
 */
ol.source.DataFlow = function (opt_options) {
    var options = opt_options ? opt_options : {};
    // if (options.style && !options.pointToLayer) {
    //     me.options.pointToLayer = function (geojson, latlng) {
    //         return L.circleMarker(latlng, me.options.style);
    //     }
    // }
    ol.source.Vector.call(this, {
        attributions: options.attributions || new ol.Attribution({
            html: '© 2017 百度 MapV with <a href="http://iclient.supermapol.com/">SuperMap iClient</a>'
        }),
        ws:options.ws,
        geometry: options.geometry,
        prjCoordSys: options.prjCoordSys,
        excludeField: options.excludeField,
    });
    this.dataService = new DataFlowService(options.ws, {
        geometry: options.geometry,
        prjCoordSys: options.prjCoordSys,
        excludeField: options.excludeField
    }).initSubscribe();
    var me = this;
    me.dataService.on('subscribeSocketConnected', function (e) {
        me.dispatchEvent({type:"subscribeSuccessed",value:e})
    });
    me.dataService.on('messageSuccessed', function (msg) {
        me._onMessageSuccessed(msg);
    });
    me.dataService.on('setFilterParamSuccessed', function (msg) {
        me.dispatchEvent({type:"setFilterParamSuccessed",value:msg})
    });
};
ol.inherits(ol.source.DataFlow, ol.source.Vector);


// onRemove: function (map) {
//     this.dataService.unSubscribe();
// },
ol.source.DataFlow.prototype.setPrjCoordSys = function (prjCoordSys) {
    this.dataService.setPrjCoordSys(prjCoordSys);
    this.prjCoordSys = prjCoordSys;
    return this;
};
ol.source.DataFlow.prototype.setExcludeField = function (excludeField) {
    this.dataService.setExcludeField(excludeField);
    this.excludeField = excludeField;
    return this;
};
ol.source.DataFlow.prototype.setGeometry = function (geometry) {
    this.dataService.setGeometry(geometry);
    this.geometry = geometry;
    return this;
};
ol.source.DataFlow.prototype._onMessageSuccessed = function (msg) {
    this.clear();
    this.addFeature((new  ol.format.GeoJSON()).readFeature(msg.value.featureResult));
    this.dispatchEvent({type:"dataUpdated",value:{source: this, data: msg.featureResult}})
};

module.exports = ol.source.DataFlow;