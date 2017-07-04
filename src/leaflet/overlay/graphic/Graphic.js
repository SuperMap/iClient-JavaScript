require('../../core/Base');
var L = require("leaflet");

var Graphic = L.Class.extend({

    initialize: function (options) {
        options = options || {};
        this._latlng = L.latLng(options._latlng.lat, options._latlng.lng);
        this._canvas = options._canvas;
    },

    setLatlng: function (latlng) {
        this._latlng = latlng;
    },

    setCanvas: function (canvas) {
        this._canvas = canvas;
    },

    getLatLng: function () {
        return this._latlng;
    },

    getCanvas: function () {
        return this._canvas;
    }

});

L.supermap.graphic = function (options) {
    return new Graphic(options);
};
module.exports = Graphic;