require('../../core/Base');

L.supermap.Graphic = L.Class.extend({

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
    return new L.supermap.Graphic(options);
};
