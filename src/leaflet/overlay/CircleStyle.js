require('../core/Base');

L.supermap.CircleStyle = L.Class.extend({

    options: {
        stroke: true,
        color: '#3388ff',
        weight: 1,
        opacity: 1,
        lineCap: 'round',
        lineJoin: 'round',
        fill: false,
        fillColor: null,
        fillOpacity: 0.2,
        fillRule: 'evenodd',
        radius: 3
    },

    initialize: function (options) {
        options = options || {};
        L.Util.setOptions(this, options);
        this._canvas = document.createElement('canvas');
        this._canvas.width = 2 * (this.options.radius + this.options.weight);
        this._canvas.height = 2 * (this.options.radius + this.options.weight);
        this._ctx = this._canvas.getContext('2d');
        this._initStyle();
    },

    getCanvas: function () {
        return this._canvas;
    },

    _initStyle: function () {
        this._ctx.beginPath();
        this._ctx.arc(this._canvas.width / 2, this._canvas.height / 2, this.options.radius, 0, Math.PI * 2);
        this._fillStroke();
    },

    _fillStroke: function () {
        var options = this.options;
        if (options.fill) {
            this._ctx.globalAlpha = options.fillOpacity;
            this._ctx.fillStyle = options.fillColor || options.color;
            this._ctx.fill(options.fillRule || 'evenodd');
        }
        if (options.stroke && options.weight !== 0) {
            this._ctx.globalAlpha = options.opacity;
            this._ctx.lineWidth = options.weight;
            this._ctx.strokeStyle = options.color;
            this._ctx.lineCap = options.lineCap;
            this._ctx.lineJoin = options.lineJoin;
            this._ctx.stroke();
        }
    }

});

L.supermap.circleStyle = function (options) {
    return new L.supermap.CircleStyle(options);
};
